import { motion, AnimatePresence } from "framer-motion";
import { useCalendarStore } from "../../store/useCalendarStore";
import { format, isSameMonth, isSameDay } from "date-fns";
import { X } from "lucide-react";

export const MobileAgenda = () => {
    const {
        isMobileAgendaOpen,
        toggleMobileAgenda,
        events,
        currentDate,
        openModal,
    } = useCalendarStore();

    const monthEvents = events.filter((e) => {
        const start = new Date(e.start);
        const end = new Date(e.end);
        const isThisMonth =
            isSameMonth(start, currentDate) || isSameMonth(end, currentDate);
        const isMultiDay = !isSameDay(start, end);
        return isThisMonth && isMultiDay;
    });

    return (
        <AnimatePresence>
            {isMobileAgendaOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleMobileAgenda}
                        className="absolute inset-0 bg-black/20 z-30 backdrop-blur-sm lg:hidden rounded-3xl"
                    />

                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{
                            type: "spring",
                            damping: 25,
                            stiffness: 200,
                        }}
                        className="absolute bottom-0 left-0 right-0 h-2/3 bg-slate-50 z-40 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex flex-col overflow-hidden lg:hidden"
                    >
                        <div className="px-6 py-4 flex justify-between items-center bg-white border-b border-gray-100 shrink-0">
                            <h3 className="font-bold text-gray-800 text-lg">
                                Month Agenda
                            </h3>
                            <button
                                onClick={toggleMobileAgenda}
                                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-3">
                            {monthEvents.map((event) => (
                                <div
                                    key={event.id}
                                    onClick={() => openModal("view", event.id)}
                                    className="relative bg-white p-4 rounded-xl border border-gray-100 shadow-sm active:scale-95 transition-transform overflow-hidden cursor-pointer"
                                >
                                    <div
                                        className={`absolute left-0 top-0 bottom-0 w-1.5 ${event.color}`}
                                    />
                                    <div className="pl-2">
                                        <p className="font-semibold text-gray-800 wrap-break-word">
                                            {event.title}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1 font-medium">
                                            {format(
                                                new Date(event.start),
                                                "MMM do",
                                            )}{" "}
                                            -{" "}
                                            {format(
                                                new Date(event.end),
                                                "MMM do",
                                            )}
                                        </p>
                                    </div>
                                </div>
                            ))}

                            {monthEvents.length === 0 && (
                                <div className="text-center mt-10">
                                    <p className="text-sm text-gray-400">
                                        No multi-day events.
                                    </p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
