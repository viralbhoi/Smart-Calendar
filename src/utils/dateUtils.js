import {
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    addDays,
    isSameMonth,
    isToday,
    format,
} from "date-fns";

export function generateCalendar(month) {
    const start = startOfWeek(startOfMonth(month));
    const end = endOfWeek(endOfMonth(month));

    const days = [];
    let day = start;

    while (day <= end) {
        days.push(day);
        day = addDays(day, 1);
    }

    return days;
}

export { isSameMonth, isToday, format };

export function isInRange(date, start, end) {
    if (!start || !end) return false;
    return date >= start && date <= end;
}

export function isSameDay(date1, date2) {
    if (!date1 || !date2) return false;
    return format(date1, "yyyy-MM-dd") === format(date2, "yyyy-MM-dd");
}