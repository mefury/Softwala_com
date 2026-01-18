import React, { useState, useEffect } from "react";

export const TimeWidget: React.FC = () => {
    const [time, setTime] = useState({ hour: "00", minute: "00" });
    const [dates, setDates] = useState({ gregory: "", bangla: "", hijri: "" });

    useEffect(() => {
        const updateAll = () => {
            const now = new Date();

            // 1. Time
            setTime({
                hour: now.getHours().toString().padStart(2, "0"),
                minute: now.getMinutes().toString().padStart(2, "0"),
            });

            // 2. English (Gregorian)
            setDates(prev => ({
                ...prev,
                gregory: now.toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                })
            }));

            // 3. Hijri (Manual mapping to avoid mobile labeling bugs)
            const hijriMonths = [
                "Muharram", "Safar", "Rabi' I", "Rabi' II", "Jumada I", "Jumada II",
                "Rajab", "Sha'ban", "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"
            ];
            const hijriFormatter = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura-nu-latn", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
            });
            const hParts = hijriFormatter.formatToParts(now);
            const hDay = hParts.find(p => p.type === 'day')?.value;
            const hMonth = hParts.find(p => p.type === 'month')?.value;
            const hYear = hParts.find(p => p.type === 'year')?.value;

            if (hDay && hMonth && hYear) {
                const mIndex = parseInt(hMonth) - 1;
                setDates(prev => ({
                    ...prev,
                    hijri: `${hDay} ${hijriMonths[mIndex]} ${hYear}`
                }));
            }

            // 4. Bangla (Revised Bangladesh Calendar Logic)
            setDates(prev => ({ ...prev, bangla: getBanglaDate(now) }));
        };

        updateAll();
        const interval = setInterval(updateAll, 1000); // Update every second for precise minute flips
        return () => clearInterval(interval);
    }, []);

    // Helper for Revised Bangla Calendar (Bangladesh)
    // 1st Baishakh starts on April 14
    const getBanglaDate = (date: Date) => {
        const months = [
            "Baishakh", "Jyaistha", "Ashar", "Sraban", "Bhadra", "Ashwin",
            "Kartik", "Agrahayan", "Poush", "Magh", "Falgun", "Chaitra"
        ];

        const isLeapYear = (y: number) => (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);

        // Month lengths for Revised Bangla Calendar (Bangladesh)
        // Baishakh to Bhadra: 31 days (6 months)
        // Ashwin to Chaitra: 30 days (6 months)
        // Falgun becomes 31 days in leap year
        const getMonthDays = (y: number) => {
            const days = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 30];
            if (isLeapYear(y)) days[10] = 31; // Falgun
            return days;
        };

        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();

        // Calculate day of year
        const start = new Date(year, 0, 0);
        const diff = (date.getTime() - start.getTime()) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);

        // April 14 is the 104th day (105 in leap year)
        const baishakh1Day = isLeapYear(year) ? 105 : 104;

        let banglaYear, dayOffset;
        if (dayOfYear < baishakh1Day) {
            banglaYear = year - 594;
            const prevYearDays = isLeapYear(year - 1) ? 366 : 365;
            const prevBaishakh1 = isLeapYear(year - 1) ? 105 : 104;
            dayOffset = (prevYearDays - prevBaishakh1 + 1) + dayOfYear;
        } else {
            banglaYear = year - 593;
            dayOffset = dayOfYear - baishakh1Day + 1;
        }

        const monthDays = getMonthDays(year);
        let m = 0;
        let d = dayOffset;
        while (m < 11 && d > monthDays[m]) {
            d -= monthDays[m];
            m++;
        }

        return `${d} ${months[m]} ${banglaYear}`;
    };

    return (
        <div className="w-full aspect-square bg-white/5 backdrop-blur-xl rounded-3xl p-4 border border-white/10 shadow-xl flex flex-col items-center justify-center gap-1.5 overflow-hidden">
            {/* Horizontal Clock */}
            <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold tracking-tight text-white">
                    {time.hour}
                </span>
                <span className="text-3xl font-bold tracking-tight text-blue-400/90">
                    :
                </span>
                <span className="text-3xl font-bold tracking-tight text-white">
                    {time.minute}
                </span>
            </div>

            {/* Date Stack */}
            <div className="flex flex-col items-center space-y-0.5">
                <span className="text-[12px] font-semibold text-white tracking-tight leading-tight text-center">
                    {dates.gregory}
                </span>
                <span className="text-[11px] font-medium text-white/90 leading-tight text-center">
                    {dates.bangla}
                </span>
                <span className="text-[11px] font-medium text-white/70 leading-tight text-center">
                    {dates.hijri}
                </span>
            </div>
        </div>
    );
};
