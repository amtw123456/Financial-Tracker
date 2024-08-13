import { DateRangePicker } from "@nextui-org/react";

export default function Transactions() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {/* transactions */}
            <DateRangePicker
                label="Stay duration"
                className="max-w-xs"
            />
        </main>
    );
}
