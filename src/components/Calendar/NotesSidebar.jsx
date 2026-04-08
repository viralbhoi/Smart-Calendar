import { useCalendarStore } from "../../store/useCalendarStore";
import { format, isSameMonth, isSameDay } from "date-fns";

export const NotesSidebar = () => {
    const { events, currentDate, setHoveredEvent, openModal } =
        useCalendarStore();

    const monthEvents = events.filter((e) => {
        const start = new Date(e.start);
        const end = new Date(e.end);
        const isThisMonth =
            isSameMonth(start, currentDate) || isSameMonth(end, currentDate);
        const isMultiDay = !isSameDay(start, end); 

        return isThisMonth && isMultiDay;
    });

    return (
        <div className="w-full h-full p-6 flex flex-col overflow-y-auto">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                Scheduled Events
            </h3>

            <div className="flex flex-col gap-3">
                {monthEvents.map((event) => (
                    <div
                        key={event.id}
                        onClick={() => openModal("view", event.id)}
                        onMouseEnter={() => setHoveredEvent(event.id)}
                        onMouseLeave={() => setHoveredEvent(null)}
                        className="group relative bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300 cursor-pointer overflow-hidden"
                    >
                        <div
                            className={`absolute left-0 top-0 bottom-0 w-1.5 ${event.color}`}
                        />
                        <div className="pl-2">
                            <p className="font-semibold text-gray-800 wrap-break-word">
                                {event.title}
                            </p>
                            <p className="text-xs text-gray-400 mt-1 font-medium">
                                {format(new Date(event.start), "MMM do")}
                                {` - ${format(new Date(event.end), "MMM do")}`}
                            </p>
                        </div>
                    </div>
                ))}

                {monthEvents.length === 0 && (
                    <div className="text-center mt-10">
                        <p className="text-sm text-gray-400">
                            No multi-day events.
                        </p>
                        <p className="text-xs text-gray-300 mt-1 italic">
                            Single-day notes appear on the grid.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
