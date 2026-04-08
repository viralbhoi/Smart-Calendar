import { motion, AnimatePresence } from "framer-motion";
import { useCalendarStore } from "../../store/useCalendarStore";
import { useCalendarGrid } from "../../hooks/useCalendarGrid.js";
import { MONTH_CONFIG } from "../../config/months";

import { CalendarHeader } from "./CalendarHeader";
import { CalendarGrid } from "./CalendarGrid";
import { NotesSidebar } from "./NotesSidebar";
import { EventModal } from "./EventModal";
import { MobileAgenda } from "./MobileAgenda";

const fullPageFlipVariants = {
    enter: (direction) => {
        if (direction > 0) {
            return { rotateX: 0, opacity: 1, zIndex: 0 };
        } else {
            return {
                rotateX: 95,
                opacity: 1,
                zIndex: 20,
                boxShadow: "0px 40px 50px rgba(0,0,0,0.2)",
            };
        }
    },
    center: (direction) => ({
        rotateX: 0,
        opacity: 1,
        zIndex: direction > 0 ? 0 : 20,
        boxShadow: "0px 10px 20px rgba(0,0,0,0.05)",
        transition: { type: "spring", stiffness: 55, damping: 17, mass: 1.5 },
    }),
    exit: (direction) => {
        if (direction > 0) {
            return {
                rotateX: 95,
                opacity: 0,
                zIndex: 20,
                boxShadow: "0px 40px 50px rgba(0,0,0,0.2)",
                transition: { duration: 0.5, ease: "easeIn" },
            };
        } else {
            return {
                rotateX: 0,
                opacity: 1,
                zIndex: 0,
                transition: { duration: 0.5 },
            };
        }
    },
};

export const Calendar = () => {
    const {
        currentDate,
        direction,
        selectionStart,
        selectionEnd,
        setSelection,
    } = useCalendarStore();

    const days = useCalendarGrid(currentDate);
    const theme = MONTH_CONFIG[currentDate.getMonth()];
    const year = currentDate.getFullYear();

    return (
        <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-7xl h-137.5 sm:h-142.5 lg:h-162.5 mx-auto flex rounded-3xl shadow-2xl bg-white overflow-hidden border border-gray-100 perspective-[1500px]">
            <div className="absolute inset-0 bg-white" />

            <AnimatePresence
                initial={false}
                custom={direction}
                mode="popLayout"
            >
                <motion.div
                    key={currentDate.toISOString()}
                    custom={direction}
                    variants={fullPageFlipVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    style={{ transformOrigin: "top center" }}
                    className="absolute inset-0 flex flex-col bg-white overflow-hidden z-10 rounded-3xl"
                >
                    <CalendarHeader theme={theme} year={year} />

                    <div className="flex flex-1 overflow-hidden">
                        <div className="flex-1 lg:flex-2 flex flex-col bg-white relative">
                            <CalendarGrid
                                days={days}
                                currentDate={currentDate}
                                selectionStart={selectionStart}
                                selectionEnd={selectionEnd}
                                theme={theme}
                                setSelection={setSelection}
                            />
                        </div>

                        <div className="hidden lg:flex flex-1 bg-slate-50 border-l border-gray-100 overflow-hidden">
                            <NotesSidebar />
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            <EventModal />

            <MobileAgenda />
        </div>
    );
};
