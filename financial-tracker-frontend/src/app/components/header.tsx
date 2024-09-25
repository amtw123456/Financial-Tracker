import { DatePicker } from "@nextui-org/react";
import { now, getLocalTimeZone } from "@internationalized/date";

export default function Header() {
    console.log(getLocalTimeZone());
    return (
        <div className="flex items-center justify-between p-2 h-16 bg-white border-b border-gray-200">
            <div className="pl-5">
                Dashboard
            </div>
            <div className="flex items-center space-x-5 pr-5">
                <div className="relative inline-block text-left">
                    <DatePicker
                        className="max-w-[284px]"
                        granularity="day"
                        labelPlacement={"outside-left"}
                        label={"Start Date"}
                        defaultValue={
                            now(getLocalTimeZone()).subtract({ weeks: 1 })
                        }

                        onChange={(newDate) => {
                            // Handle date change
                        }}
                    />

                </div>
                <div>to</div>
                <div>
                    <DatePicker
                        className="max-w-[284px]"
                        granularity="day"
                        labelPlacement={"outside-left"}
                        defaultValue={now(getLocalTimeZone())}
                        label={"End Date"}
                    />
                </div>
            </div>

        </div>

    )
}