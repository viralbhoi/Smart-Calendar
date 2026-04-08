import {
    isSameDay,
    isWithinInterval,
    isSameMonth,
    isToday,
    startOfDay,
} from "date-fns";
import { useCalendarStore } from "../../store/useCalendarStore";

export const CalendarDay = ({ day, currentDate, theme, onSelect }) => {
    const {
        selectionStart,
        selectionEnd,
        hoverDate,
        setHoverDate,
        events,
        hoveredEventId, 
    } = useCalendarStore();

    const normalizedDay = startOfDay(day);
    const isCurrentMonth = isSameMonth(normalizedDay, currentDate);

    
    const isStart = selectionStart
        ? isSameDay(normalizedDay, selectionStart)
        : false;
    const isEnd = selectionEnd ? isSameDay(normalizedDay, selectionEnd) : false;
    const isBetween =
        selectionStart && selectionEnd
            ? isWithinInterval(normalizedDay, {
                  start: selectionStart,
                  end: selectionEnd,
              })
            : false;

    
    const isGhostBetween =
        selectionStart &&
        !selectionEnd &&
        hoverDate &&
        normalizedDay > selectionStart
            ? isWithinInterval(normalizedDay, {
                  start: selectionStart,
                  end: hoverDate,
              })
            : false;

    
    const dayEvents = events.filter((e) => {
        const eStart = startOfDay(new Date(e.start));
        const eEnd = startOfDay(new Date(e.end));
        return (
            isSameDay(normalizedDay, eStart) ||
            isSameDay(normalizedDay, eEnd) ||
            isWithinInterval(normalizedDay, { start: eStart, end: eEnd })
        );
    });

    
    const isHoveredEvent =
        hoveredEventId && dayEvents.some((e) => e.id === hoveredEventId);

    // ----------------------------------------------------
    // Build the Dynamic Tailwind Classes
    // ----------------------------------------------------
    let bgClass = "bg-transparent hover:bg-gray-50";
    let textClass = isCurrentMonth ? "text-gray-700" : "text-gray-300";
    let roundedClass = "rounded-lg";
    let glowClass = "";

    if (isHoveredEvent) {
        // Find the specific color of the hovered event to match the glow ring
        const activeEvent = dayEvents.find((e) => e.id === hoveredEventId);
        const ringColor = activeEvent
            ? activeEvent.color.replace("bg-", "ring-")
            : "ring-gray-50";

        // The GLOW effect: Pops out, adds a shadow, and rings it with the event color
        glowClass = `scale-105 z-30 shadow-sm ${ringColor} transition-all duration-100`;
        textClass = "text-gray-900 font-bold";
        bgClass = "bg-white";
    } else if (isStart) {
        bgClass = `${theme.color} shadow-md`;
        textClass = "text-white font-bold";
        roundedClass =
            selectionEnd || (hoverDate && hoverDate > selectionStart)
                ? "rounded-l-lg rounded-r-none"
                : "rounded-lg";
    } else if (isEnd) {
        bgClass = `${theme.color} shadow-md`;
        textClass = "text-white font-bold";
        roundedClass = "rounded-r-lg rounded-l-none";
    } else if (isBetween) {
        bgClass = `${theme.color} opacity-20`;
        textClass = "text-gray-900 font-medium";
        roundedClass = "rounded-none";
    } else if (isGhostBetween) {
        bgClass = "bg-gray-100 border-y border-gray-200";
        roundedClass = "rounded-none";
    }

    const isCurrentDayRing =
        isToday(normalizedDay) &&
        !isStart &&
        !isEnd &&
        !isBetween &&
        !isHoveredEvent;

    return (
        <button
            onClick={() => onSelect(normalizedDay)}
            onMouseEnter={() => setHoverDate(normalizedDay)}
            className={`
                relative h-12 w-full flex flex-col items-center justify-start pt-2 text-sm transition-all duration-50
                ${bgClass} ${textClass} ${roundedClass} ${glowClass}
                ${isCurrentDayRing ? `ring-2 ring-inset ${theme.color.replace("bg-", "ring-")}` : ""}
                ${!isCurrentMonth && !isBetween && !isStart && !isEnd && !isHoveredEvent ? "opacity-40" : ""}
            `}
        >
            <span>{day.getDate()}</span>

            
            <div className="absolute bottom-1 w-full px-1 flex flex-col gap-0.5 items-center">
                {dayEvents.slice(0, 3).map((event) => (
                    <div
                        key={event.id}
                        className={`h-1 w-full max-w-5 rounded-full ${event.color} opacity-80`}
                    />
                ))}
                
                {dayEvents.length > 3 && (
                    <div className="h-0.5 w-0.5 rounded-full bg-gray-400 mt-px" />
                )}
            </div>
        </button>
    );
};
