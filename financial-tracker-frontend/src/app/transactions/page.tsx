import { DateRangePicker } from "@nextui-org/react";

export default function Transactions() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {/* transactions */}
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                <DateRangePicker
                    variant={"bordered"}
                    label="Stay duration"
                    className="max-w-xs"
                />
            </div>

        </main>
    );
}
