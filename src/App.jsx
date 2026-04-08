import { Calendar } from "./components/Calendar";
import { useCalendarStore } from "./store/useCalendarStore";
import { ChevronLeft, ChevronRight, List } from "lucide-react";
import { WallClock } from "./components/WallClock/WallClock";

function App() {
    const { nextMonth, prevMonth, toggleMobileAgenda } = useCalendarStore();

    return (
        <div
            className="h-dvh w-screen overflow-hidden bg-cover bg-bottom bg-no-repeat flex flex-col items-center justify-center p-4 sm:p-8 font-sans selection:bg-blue-200 relative"
            style={{ backgroundImage: "url('/bg.png')" }}
        >
            <div className="hidden md:block absolute top-8 right-8 md:right-12 z-20">
                <WallClock />
            </div>

            <div className="z-10 drop-shadow-2xl lg:w-3/8 md:4/8 w-full flex justify-center mt-2 md:mt-0">
                <Calendar />
            </div>

            <div className="mt-6 md:absolute md:bottom-10 flex gap-6 z-20 w-full justify-center opacity-100 md:opacity-30 md:hover:opacity-100 transition-opacity duration-300">
                <button
                    onClick={prevMonth}
                    aria-label="Previous Month"
                    className="group flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-white/60 backdrop-blur-md rounded-full shadow-lg hover:bg-white/90 transition-all duration-300 hover:-translate-x-1 border border-white/50 text-gray-700"
                >
                    <ChevronLeft
                        size={24}
                        className="transition-transform group-active:scale-90"
                    />
                </button>

                <button
                    onClick={toggleMobileAgenda}
                    aria-label="Open Agenda"
                    className="md:hidden group flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-white/60 backdrop-blur-md rounded-full shadow-lg hover:bg-white/90 transition-all duration-300 border border-white/50 text-gray-700"
                >
                    <List
                        size={24}
                        className="transition-transform group-active:scale-90"
                    />
                </button>

                <button
                    onClick={nextMonth}
                    aria-label="Next Month"
                    className="group flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-white/60 backdrop-blur-md rounded-full shadow-lg hover:bg-white/90 transition-all duration-300 hover:translate-x-1 border border-white/50 text-gray-700"
                >
                    <ChevronRight
                        size={24}
                        className="transition-transform group-active:scale-90"
                    />
                </button>
            </div>
        </div>
    );
}

export default App;
