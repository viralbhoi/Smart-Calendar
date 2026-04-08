import { motion, AnimatePresence } from "framer-motion";
import { useCalendarStore } from "../../store/useCalendarStore";
import { format, isSameDay } from "date-fns";
import { X, Trash2, Calendar as CalendarIcon, Save } from "lucide-react";
import { useState, useEffect } from "react";

const EVENT_COLORS = [
    "bg-emerald-400",
    "bg-violet-400",
    "bg-sky-400",
    "bg-rose-400",
    "bg-amber-400",
    "bg-indigo-400",
];

export const EventModal = () => {
    const {
        modalState,
        closeModal,
        clearSelection,
        events,
        saveEvent,
        deleteEvent,
        selectionStart,
        selectionEnd,
    } = useCalendarStore();

    const [title, setTitle] = useState("");
    const [selectedColor, setSelectedColor] = useState(EVENT_COLORS[0]);

    useEffect(() => {
        if (modalState.isOpen && modalState.mode === "create") {
            setTitle("");
            setSelectedColor(EVENT_COLORS[0]);
        }
    }, [modalState.isOpen, modalState.mode]);

    const handleClose = () => {
        closeModal();
        if (modalState.mode === "create") clearSelection();
    };

    const handleSave = () => {
        if (title.trim()) {
            saveEvent(title, selectedColor);
            handleClose();
        }
    };

    if (!modalState.isOpen) return null;

    let event = null;
    let startDate = selectionStart;
    let endDate = selectionEnd;
    let displayColor = selectedColor;

    if (modalState.mode === "view") {
        event = events.find((e) => e.id === modalState.eventId);
        if (!event) return null;
        startDate = new Date(event.start);
        endDate = new Date(event.end);
        displayColor = event.color;
    }

    const isSingleDayCreate =
        modalState.mode === "create" &&
        startDate &&
        endDate &&
        isSameDay(startDate, endDate);

    const existingDayEvents = isSingleDayCreate
        ? events.filter(
              (e) =>
                  isSameDay(new Date(e.start), startDate) &&
                  isSameDay(new Date(e.end), startDate),
          )
        : [];

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleClose}
                className="absolute inset-0 bg-black/20 z-50 backdrop-blur-sm rounded-3xl"
            />

            <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none p-6">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden pointer-events-auto border border-gray-100"
                >
                    <div className={`h-3 w-full ${displayColor}`} />

                    <div className="p-6">
                        <div className="flex justify-between items-start mb-4 gap-4">
                            {modalState.mode === "create" ? (
                                <h3 className="text-xl font-bold text-gray-800 leading-tight">
                                    {isSingleDayCreate
                                        ? format(startDate, "MMMM do")
                                        : "New Event"}
                                </h3>
                            ) : (
                                <h3 className="text-xl font-bold text-gray-800 wrap-break-word leading-tight">
                                    {event.title}
                                </h3>
                            )}
                            <button
                                onClick={handleClose}
                                className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 p-1.5 rounded-full transition-colors shrink-0 -mt-1 -mr-1"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {modalState.mode === "view" && (
                            <div className="flex items-center gap-3 text-gray-500 bg-gray-50 p-3 rounded-lg border border-gray-100 mb-6">
                                <div
                                    className={`p-2 rounded-md bg-white shadow-sm ${displayColor.replace("bg-", "text-")}`}
                                >
                                    <CalendarIcon size={20} />
                                </div>
                                <div className="text-sm font-medium">
                                    <p className="text-gray-800">
                                        {format(startDate, "EEEE, MMMM do")}
                                    </p>
                                    <p className="text-gray-500 mt-0.5">
                                        to {format(endDate, "EEEE, MMMM do")}
                                    </p>
                                </div>
                            </div>
                        )}

                        {isSingleDayCreate && existingDayEvents.length > 0 && (
                            <div className="mb-5 flex flex-col gap-2">
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                                    Saved Notes
                                </h4>
                                {existingDayEvents.map((e) => (
                                    <div
                                        key={e.id}
                                        className="flex justify-between items-center bg-gray-50 p-2.5 rounded-lg border border-gray-100"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`w-2 h-2 rounded-full ${e.color}`}
                                            />
                                            <span className="text-sm font-medium text-gray-700">
                                                {e.title}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => deleteEvent(e.id)}
                                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {modalState.mode === "create" && (
                            <>
                                {!isSingleDayCreate && (
                                    <p className="text-sm font-medium text-blue-600 mb-4 bg-blue-50 p-2 rounded-lg text-center">
                                        {format(startDate, "MMM do")} -{" "}
                                        {format(endDate, "MMM do")}
                                    </p>
                                )}
                                <textarea
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    onKeyDown={(e) =>
                                        e.key === "Enter" &&
                                        !e.shiftKey &&
                                        (e.preventDefault(), handleSave())
                                    }
                                    placeholder="Add a new note or event..."
                                    className="w-full text-base px-3 py-3 border border-gray-200 rounded-lg outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all bg-gray-50 focus:bg-white resize-none mb-4"
                                    rows={2}
                                    autoFocus
                                />
                                <div className="flex flex-col md:flex-row justify-between items-center pt-2">
                                    <div className="flex gap-2">
                                        {EVENT_COLORS.map((color) => (
                                            <button
                                                key={color}
                                                onClick={() =>
                                                    setSelectedColor(color)
                                                }
                                                className={`w-6 h-6 rounded-full ${color} transition-transform ${selectedColor === color ? "ring-2 ring-offset-2 ring-gray-400 scale-110 shadow-sm" : "hover:scale-110"}`}
                                            />
                                        ))}
                                    </div>
                                    <button
                                        onClick={handleSave}
                                        disabled={!title.trim()}
                                        className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold shadow-sm hover:bg-blue-700 disabled:opacity-50 transition-colors md:mt-0 mt-3"
                                    >
                                        <Save size={16} /> Save
                                    </button>
                                </div>
                            </>
                        )}

                        {modalState.mode === "view" && (
                            <div className="flex justify-end pt-2 border-t border-gray-100">
                                <button
                                    onClick={() => deleteEvent(event.id)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 font-semibold transition-colors w-full justify-center"
                                >
                                    <Trash2 size={18} /> Delete Event
                                </button>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
