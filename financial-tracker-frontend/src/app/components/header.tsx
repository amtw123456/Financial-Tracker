import { DatePicker, DateValue } from "@nextui-org/react";

interface HeaderProps {
    startDate: DateValue;
    endDate: DateValue;
    onStartDateChange: (newDate: DateValue) => void;
    onEndDateChange: (newDate: DateValue) => void;
}

export default function Header({
    startDate,
    endDate,
    onStartDateChange,
    onEndDateChange,
}: HeaderProps) {
    return (
        <div className="flex items-center justify-between p-2 h-16 bg-white border-b border-gray-200">
            <div className="hidden md:block pl-5">Dashboard</div>
            <div className="flex items-center space-x-5 pr-5">
                <div className="relative inline-block text-left">
                    <DatePicker
                        className="max-w-[284px]"
                        granularity="day"
                        labelPlacement={"outside-left"}
                        label={"Start Date"}
                        value={startDate} // Use startDate prop here
                        onChange={onStartDateChange} // Use onStartDateChange prop to handle change
                    />
                </div>
                <div>to</div>
                <div>
                    <DatePicker
                        className="max-w-[284px]"
                        granularity="day"
                        labelPlacement={"outside-left"}
                        label={"End Date"}
                        value={endDate} // Use endDate prop here
                        onChange={onEndDateChange} // Use onEndDateChange prop to handle change
                    />
                </div>
            </div>
        </div>
    );
}
