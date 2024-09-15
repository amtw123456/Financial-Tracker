package com.api.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.Date;

@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int transactionId;
    private int transactionUserId;
    private int transactionAmount;
    private Date dateTimePosted;
    private String expenseCategory;
    private String transactionType;
    private String transactionDescription;

    // Getters and Setters

    public int getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(int transactionId) {
        this.transactionId = transactionId;
    }

    public int getTransactionUserId() {
        return transactionUserId;
    }

    public void setTransactionUserId(int transactionUserId) {
        this.transactionUserId = transactionUserId;
    }

    public int getTransactionAmount() {
        return transactionAmount;
    }

    public void setTransactionAmount(int transactionAmount) {
        this.transactionAmount = transactionAmount;
    }

    public Date getDateTimePosted() {
        return dateTimePosted;
    }

    public void setDateTimePosted(Date dateTimePosted) {
        this.dateTimePosted = dateTimePosted;
    }

    public String getExpenseCategory() {
        return expenseCategory;
    }

    public void setExpenseCategory(String expenseCategory) {
        this.expenseCategory = expenseCategory;
    }

    public String getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }

    public String getTransactionDescription() {
        return transactionDescription;
    }

    public void setTransactionDescription(String transactionDescription) {
        this.transactionDescription = transactionDescription;
    }

    @Override
    public String toString() {
        return "Transaction{" +
                "transactionId=" + transactionId +
                ", transactionUserId=" + transactionUserId +
                ", transactionAmount=" + transactionAmount +
                ", dateTimePosted=" + dateTimePosted +
                ", expenseCategory='" + expenseCategory + '\'' +
                ", transactionType='" + transactionType + '\'' +
                ", transactionDescription='" + transactionDescription + '\'' +
                '}';
    }

}
