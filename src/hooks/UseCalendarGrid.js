import {
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
} from "date-fns";
import { useMemo } from "react";

export const useCalendarGrid = (currentDate) => {
    const days = useMemo(() => {
        const monthStart = startOfMonth(currentDate);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);
        return eachDayOfInterval({
            start: startDate,
            end: endDate,
        });
    }, [currentDate]);

    return days;
};
