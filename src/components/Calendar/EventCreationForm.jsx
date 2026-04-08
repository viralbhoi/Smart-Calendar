import { useState } from "react";
import { useCalendarStore } from "../../store/useCalendarStore";

const EVENT_COLORS = [
    "bg-emerald-400",
    "bg-violet-400",
    "bg-sky-400",
    "bg-rose-400",
    "bg-amber-400",
    "bg-indigo-400",
];

export const EventCreationForm = () => {
    const [title, setTitle] = useState("");
    const [selectedColor, setSelectedColor] = useState(EVENT_COLORS[0]);
    const saveEvent = useCalendarStore((state) => state.saveEvent);

    const handleSave = () => {
        if (title.trim()) {
            saveEvent(title, selectedColor);
            setTitle(""); // clear input
        }
    };

    return (
        <div className="flex flex-col gap-2 mt-1 animate-in fade-in zoom-in duration-200">
            <input
                type="text"
                placeholder="Event name (e.g. Vacation)..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
                className="w-full text-sm px-3 py-2 border border-gray-200 rounded-lg outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all bg-gray-50 focus:bg-white"
                autoFocus
            />
            <div className="flex justify-between items-center mt-1">
                <div className="flex gap-2">
                    {EVENT_COLORS.map((color) => (
                        <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`w-5 h-5 rounded-full ${color} transition-transform ${selectedColor === color ? "ring-2 ring-offset-2 ring-gray-400 scale-110" : "hover:scale-110"}`}
                        />
                    ))}
                </div>
                <button
                    onClick={handleSave}
                    disabled={!title.trim()}
                    className="text-xs font-semibold bg-blue-600 text-white px-4 py-1.5 rounded-md shadow-sm disabled:opacity-50 hover:bg-blue-700 active:scale-95 transition-all"
                >
                    Save
                </button>
            </div>
        </div>
    );
};
