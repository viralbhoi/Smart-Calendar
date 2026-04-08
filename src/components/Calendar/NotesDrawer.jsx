import { motion, AnimatePresence } from "framer-motion";
import { useCalendarStore } from "../../store/useCalendarStore";
import { format, isSameDay } from "date-fns";
import { X, Save, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

const EVENT_COLORS = [
    "bg-emerald-400",
    "bg-violet-400",
    "bg-sky-400",
    "bg-rose-400",
    "bg-amber-400",
    "bg-indigo-400",
];

export const NotesDrawer = ({ theme }) => {
    const {
        isNotesDrawerOpen,
        closeDrawer,
        selectedSingleDay,
        saveEvent,
        deleteEvent,
        events,
    } = useCalendarStore();

    const [title, setTitle] = useState("");
    const [selectedColor, setSelectedColor] = useState(EVENT_COLORS[0]);
    const [existingEventId, setExistingEventId] = useState(null);

    // Look for an existing single-day event when the drawer opens
    useEffect(() => {
        if (selectedSingleDay) {
            const existing = events.find(
                (e) =>
                    isSameDay(new Date(e.start), selectedSingleDay) &&
                    isSameDay(new Date(e.end), selectedSingleDay),
            );

            if (existing) {
                setTitle(existing.title);
                setSelectedColor(existing.color);
                setExistingEventId(existing.id);
            } else {
                setTitle("");
                setSelectedColor(EVENT_COLORS[0]);
                setExistingEventId(null);
            }
        }
    }, [selectedSingleDay, events, isNotesDrawerOpen]);

    const handleSave = () => {
        if (selectedSingleDay && title.trim()) {
            if (existingEventId) {
                deleteEvent(existingEventId);
            }
            saveEvent(
                title,
                selectedColor,
                selectedSingleDay,
                selectedSingleDay,
            );
            closeDrawer();
        }
    };

    const handleDelete = () => {
        if (existingEventId) {
            deleteEvent(existingEventId);
            closeDrawer();
        }
    };

    if (!selectedSingleDay) return null;

    const headerText = format(selectedSingleDay, "EEEE, MMMM do");

    return (
        <AnimatePresence>
            {isNotesDrawerOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeDrawer}
                        className="absolute inset-0 bg-black/10 z-40 backdrop-blur-[2px] rounded-3xl"
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
                        className="absolute bottom-0 left-0 right-0 h-2/3 bg-white z-50 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex flex-col overflow-hidden"
                    >
                        <div
                            className={`px-6 py-4 flex justify-between items-center text-white ${theme.color}`}
                        >
                            <h3 className="font-semibold text-lg">
                                {headerText}
                            </h3>
                            <button
                                onClick={closeDrawer}
                                className="p-1 hover:bg-white/20 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="px-6 py-4 flex gap-3 bg-gray-50 border-b border-gray-100">
                            {EVENT_COLORS.map((color) => (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={`w-8 h-8 rounded-full ${color} transition-transform ${selectedColor === color ? "ring-2 ring-offset-2 ring-gray-400 scale-110 shadow-md" : "hover:scale-110 shadow-sm"}`}
                                />
                            ))}
                        </div>

                        <div className="flex-1 p-6 bg-white">
                            
                            <textarea
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSave();
                                    }
                                }}
                                placeholder="Event title or note..."
                                className="w-full h-full text-2xl font-medium resize-none bg-transparent outline-none text-gray-700 placeholder:text-gray-300"
                                autoFocus
                            />
                        </div>

                        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                            
                            {existingEventId ? (
                                <button
                                    onClick={handleDelete}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-full text-red-500 hover:bg-red-50 font-medium transition-colors"
                                >
                                    <Trash2 size={18} />
                                    Delete
                                </button>
                            ) : (
                                <div /> 
                            )}

                            <button
                                onClick={handleSave}
                                disabled={!title.trim()}
                                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-white font-medium shadow-md hover:shadow-lg disabled:opacity-50 transition-all active:scale-95 ${theme.color}`}
                            >
                                <Save size={18} />
                                Save
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
