import { create } from "zustand";
import { persist } from "zustand/middleware";
import { isSameDay } from "date-fns";

export const useCalendarStore = create(
    persist(
        (set, get) => ({
            currentDate: new Date(),
            direction: 0,

            selectionStart: null,
            selectionEnd: null,
            hoverDate: null,

            events: [],

            modalState: { isOpen: false, mode: "create", eventId: null },
            hoveredEventId: null,

            
            isMobileAgendaOpen: false,
            toggleMobileAgenda: () =>
                set((state) => ({
                    isMobileAgendaOpen: !state.isMobileAgendaOpen,
                })),

            setHoveredEvent: (id) => set({ hoveredEventId: id }),

            openModal: (mode, eventId = null) =>
                set({
                    modalState: { isOpen: true, mode, eventId },
                }),

            closeModal: () =>
                set({
                    modalState: {
                        isOpen: false,
                        mode: "create",
                        eventId: null,
                    },
                }),

            deleteEvent: (id) =>
                set((state) => ({
                    events: state.events.filter((event) => event.id !== id),
                    modalState: {
                        isOpen: false,
                        mode: "create",
                        eventId: null,
                    },
                })),

            nextMonth: () =>
                set((state) => {
                    const currentMonth = state.currentDate.getMonth();
                    const lockedYear = state.currentDate.getFullYear();
                    const nextDate =
                        currentMonth === 11
                            ? new Date(lockedYear, 0, 1)
                            : new Date(lockedYear, currentMonth + 1, 1);
                    return { currentDate: nextDate, direction: 1 };
                }),

            prevMonth: () =>
                set((state) => {
                    const currentMonth = state.currentDate.getMonth();
                    const lockedYear = state.currentDate.getFullYear();
                    const prevDate =
                        currentMonth === 0
                            ? new Date(lockedYear, 11, 1)
                            : new Date(lockedYear, currentMonth - 1, 1);
                    return { currentDate: prevDate, direction: -1 };
                }),

            setSelection: (date) =>
                set((state) => {
                    if (
                        !state.selectionStart ||
                        (state.selectionStart && state.selectionEnd) ||
                        date < state.selectionStart
                    ) {
                        return {
                            selectionStart: date,
                            selectionEnd: null,
                            hoverDate: null,
                        };
                    }
                    return {
                        selectionEnd: date,
                        hoverDate: null,
                        modalState: {
                            isOpen: true,
                            mode: "create",
                            eventId: null,
                        },
                    };
                }),

            setHoverDate: (date) => set({ hoverDate: date }),

            saveEvent: (
                title,
                colorClass,
                overrideStart = null,
                overrideEnd = null,
            ) =>
                set((state) => {
                    const start = overrideStart || state.selectionStart;
                    const end = overrideEnd || state.selectionEnd || start;

                    if (!title.trim() || !start) return state;

                    
                    const randomString = Math.random()
                        .toString(36)
                        .substring(2, 8);

                    const newEvent = {
                        
                        id: `${Date.now()}-${randomString}`,
                        title,
                        start: start.toISOString(),
                        end: end.toISOString(),
                        color: colorClass,
                    };

                    return {
                        events: [...state.events, newEvent],
                        selectionStart: null,
                        selectionEnd: null,
                    };
                }),

            clearSelection: () =>
                set({
                    selectionStart: null,
                    selectionEnd: null,
                    hoverDate: null,
                }),
        }),
        {
            name: "premium-calendar-data",
            partialize: (state) => ({ events: state.events }),
        },
    ),
);
