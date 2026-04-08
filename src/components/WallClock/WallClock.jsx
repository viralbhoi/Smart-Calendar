import { useEffect, useState } from "react";

export const WallClock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        let animationFrameId;
        const tick = () => {
            setTime(new Date());
            animationFrameId = requestAnimationFrame(tick);
        };
        animationFrameId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    // Calculate exact sub-second milliseconds for the smooth sweep
    const milliseconds = time.getMilliseconds();
    const seconds = time.getSeconds() + milliseconds / 1000;
    const minutes = time.getMinutes() + seconds / 60;
    const hours = (time.getHours() % 12) + minutes / 60;

    const secondDegrees = seconds * 6;
    const minuteDegrees = minutes * 6;
    const hourDegrees = hours * 30;

    return (
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-white/50 bg-linear-to-br from-white/50 to-white/10 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.15)] relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 rounded-full shadow-[inset_0_4px_15px_rgba(0,0,0,0.05)] border border-white/30" />

            {[...Array(12)].map((_, i) => (
                <div
                    key={i}
                    className="absolute inset-0 flex justify-center"
                    style={{ transform: `rotate(${i * 30}deg)` }}
                >
                    <div
                        className={`rounded-full mt-2 md:mt-3 opacity-60 ${
                            i % 3 === 0
                                ? "w-0.5 h-3 bg-slate-600"
                                : "w-[1.5px] h-1.5 bg-slate-400"
                        }`}
                    />
                </div>
            ))}

            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 flex justify-center drop-shadow-sm"
                    style={{ transform: `rotate(${hourDegrees}deg)` }}
                >
                    <div className="w-0.75 md:w-1 h-8 md:h-10 bg-slate-800 rounded-full mt-7 md:mt-9" />
                </div>

                <div
                    className="absolute inset-0 flex justify-center drop-shadow-sm"
                    style={{ transform: `rotate(${minuteDegrees}deg)` }}
                >
                    <div className="w-0.5 md:w-[2.5px] h-11 md:h-14 bg-slate-700 rounded-full mt-4 md:mt-5" />
                </div>

                <div
                    className="absolute inset-0 flex justify-center drop-shadow-md"
                    style={{ transform: `rotate(${secondDegrees}deg)` }}
                >
                    <div className="relative w-[1.5px] h-16 md:h-20 bg-rose-500 rounded-full mt-2 md:mt-2" />
                </div>

                {/* The Center Pin Assembly (Layered metallic look) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-slate-800 shadow-md flex items-center justify-center z-10">
                    <div className="w-1 h-1 rounded-full bg-slate-200" />
                </div>
            </div>
        </div>
    );
};
