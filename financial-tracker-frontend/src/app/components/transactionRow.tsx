type TransactionRowProps = {
    date: string;
    description: string;
    category: string;
    amount: number;
};

export default function TransactionRow({ date, description, category, amount }: TransactionRowProps) {
    return (
        <div className="flex flex-row border-t w-full">
            <span className="w-1/5 text-lg font-medium border-r ml-2">{date}</span>
            <span className="w-2/5 text-lg font-medium border-r ml-2">{description}</span>
            <span className="w-1/5 text-lg font-medium border-r ml-2">{category}</span>
            <span className="w-1/5 text-lg font-medium ml-2">{amount.toFixed(2)}</span>
        </div>
    );
}
