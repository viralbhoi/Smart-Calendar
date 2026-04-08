import { CalendarDay } from "./CalendarDay";

export const CalendarGrid = ({
    days,
    currentDate,
    selectionStart,
    selectionEnd,
    theme,
    setSelection,
}) => {
    return (
        <div className="flex-1 relative bg-white">
            {/* Static Weekday Row */}
            <div className="grid grid-cols-7 gap-1 px-4 py-3 bg-white border-b border-gray-100">
                {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(
                    (day) => (
                        <div
                            key={day}
                            className="text-center text-[10px] font-bold text-gray-400 tracking-wider"
                        >
                            {day}
                        </div>
                    ),
                )}
            </div>

            {/* The Grid */}
            <div className="grid grid-cols-7 gap-y-2 gap-x-1 p-4 items-start bg-white">
                {days.map((day) => (
                    <CalendarDay
                        key={day.toISOString()}
                        day={day}
                        currentDate={currentDate}
                        selectionStart={selectionStart}
                        selectionEnd={selectionEnd}
                        theme={theme}
                        onSelect={setSelection}
                    />
                ))}
            </div>
        </div>
    );
};
