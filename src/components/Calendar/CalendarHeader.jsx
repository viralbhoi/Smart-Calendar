export const CalendarHeader = ({ theme, year }) => (
    <div className="relative w-full h-40 sm:h-48 lg:h-56 z-10 overflow-hidden shrink-0">
        <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
            style={{ backgroundImage: `url(${theme.img})` }}
        />
        <div
            className={`absolute inset-0 opacity-90 ${theme.color}`}
            style={{ clipPath: "polygon(0 40%, 100% 0, 100% 100%, 0% 100%)" }}
        />

        <div className="absolute bottom-4 sm:bottom-6 left-6 sm:left-8 z-20">
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight drop-shadow-md">
                {theme.name.toUpperCase()}
            </h2>
            <p className="text-lg sm:text-xl font-medium text-white/80 drop-shadow-sm mt-0 sm:mt-1">
                {year}
            </p>
        </div>
    </div>
);
