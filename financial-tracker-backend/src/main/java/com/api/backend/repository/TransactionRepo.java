package com.api.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.api.backend.model.Transaction;

import jakarta.transaction.Transactional;
import java.util.Date;

@Repository
public interface TransactionRepo extends JpaRepository<Transaction, Integer> {

    List<Transaction> findAllByTransactionUserId(int userId);

    Transaction findByTransactionId(int transactionId);

    @Query("SELECT t FROM Transaction t WHERE t.transactionId IN :transactionIds")
    List<Transaction> findAllByTransactionId(@Param("transactionIds") List<Integer> transactionIds);

    @Modifying
    @Transactional
    @Query("DELETE FROM Transaction t WHERE t.transactionId IN :transactionIds")
    void deleteAllByTransactionId(@Param("transactionIds") List<Integer> transactionIds);

    @Query("SELECT t FROM Transaction t WHERE t.dateTimePosted >= :startDate AND t.dateTimePosted < :endDate ORDER BY t.transactionId ASC")
    List<Transaction> findByDateTimePostedBetween(
            @Param("userId") Integer userId,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate);

    @Query("SELECT t.expenseCategory, SUM(t.transactionAmount) FROM Transaction t WHERE t.transactionUserId = :userId AND t.dateTimePosted >= :startDate AND t.dateTimePosted <= :endDate AND t.transactionType = 'Expense' GROUP BY t.expenseCategory")
    List<Object[]> findTransactionSumsByCategoryAndDateRange(
            @Param("userId") Integer userId,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate);

    @Query(value = """
                            WITH latest_transaction_month AS (
                SELECT date_trunc('month', MAX(t.date_time_posted)) AS latest_month
                FROM transactions t
            ),
            months AS (
                SELECT
                    date_trunc('month', generate_series) AS month_start,
                    (date_trunc('month', generate_series) + interval '1 month - 1 day') AS month_end
                FROM latest_transaction_month,
                generate_series(
                    latest_month - interval '5 months',   -- 6 months ago from the latest month
                    latest_month,                         -- Latest month
                    '1 month'::interval                   -- Interval of 1 month
                ) AS generate_series
            )
            SELECT
                TO_CHAR(months.month_end, 'YYYY-MM') AS year_month,
                COALESCE(SUM(CASE WHEN t.transaction_type = 'Expense' THEN t.transaction_amount ELSE 0 END), 0) AS total_expense,
                COALESCE(SUM(CASE WHEN t.transaction_type = 'Income' THEN t.transaction_amount ELSE 0 END), 0) AS total_income
            FROM months
            LEFT JOIN transactions t
                ON t.date_time_posted >= months.month_start
                AND t.date_time_posted <= months.month_end
                AND t.transaction_user_id = :userId  -- Filter by user ID
            GROUP BY year_month
            ORDER BY year_month;

                        """, nativeQuery = true)
    List<Object[]> getLastSixMonthsTransactionSummary(int userId);

    @Query(value = """
                            WITH last_14_days AS (
                SELECT
                    CURRENT_DATE - INTERVAL '1 day' * generate_series(0, 13) AS transaction_date -- Generates the last 14 days including today
            )
            SELECT
                l.transaction_date,
                COALESCE(SUM(CASE WHEN t.transaction_type = 'Expense' THEN t.transaction_amount ELSE 0 END), 0) AS total_expense,
                COALESCE(SUM(CASE WHEN t.transaction_type = 'Income' THEN t.transaction_amount ELSE 0 END), 0) AS total_income
            FROM last_14_days l
            LEFT JOIN transactions t ON t.date_time_posted::date = l.transaction_date AND t.transaction_user_id = :userId  -- Filter by user ID
            GROUP BY l.transaction_date
            ORDER BY l.transaction_date;
                        """, nativeQuery = true)
    List<Object[]> getLast14DaysExpenses(int userId);
}
