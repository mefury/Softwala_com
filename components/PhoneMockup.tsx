import React, { useState, useEffect } from "react";
import { WifiIcon, Battery100Icon } from "@heroicons/react/24/solid";

interface PhoneMockupProps {
    children: React.ReactNode;
}

const StatusBar: React.FC = () => {
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(
                now.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                })
            );
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute top-0 z-[60] flex w-full items-center justify-between px-8 pt-3 pb-3 text-white">
            {/* Time */}
            <span className="text-[13px] font-semibold tracking-tight">{time}</span>

            {/* Status Icons */}
            <div className="flex items-center gap-2 opacity-90">
                {/* Custom Cellular Signal Bars */}
                <div className="flex items-end gap-[1px] h-[10px] mb-[1px]">
                    <div className="w-[2px] h-[30%] bg-white rounded-[0.5px]"></div>
                    <div className="w-[2px] h-[50%] bg-white rounded-[0.5px]"></div>
                    <div className="w-[2px] h-[75%] bg-white rounded-[0.5px]"></div>
                    <div className="w-[2px] h-[100%] bg-white/40 rounded-[0.5px]"></div>
                </div>
                <WifiIcon className="h-3.5 w-3.5" />
                <div className="relative flex items-center">
                    <Battery100Icon className="h-5 w-5" />
                </div>
            </div>
        </div>
    );
};

const NavigationBar: React.FC = () => {
    return (
        <div className="absolute bottom-0 z-[60] flex h-8 w-full items-center justify-center p-2">
            <div className="h-1 w-24 rounded-full bg-white/40 shadow-sm transition-colors hover:bg-white/60" />
        </div>
    );
};

export const PhoneMockup: React.FC<PhoneMockupProps> = ({ children }) => {
    return (
        <div className="relative mx-auto h-[880px] w-[400px] transition-all duration-700 ease-in-out">
            {/* S25 Ultra Titanium Frame */}
            <div className="absolute inset-0 rounded-[2.8rem] border-[10px] border-[#222] bg-[#111] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5),0_30px_60px_-30px_rgba(0,0,0,0.6)] backdrop-blur-xl">
                {/* Subtle Titanium Texture/Shine */}
                <div className="absolute inset-0 rounded-[2.3rem] bg-gradient-to-tr from-white/5 via-transparent to-white/10 opacity-50" />

                {/* Antenna lines */}
                <div className="absolute top-10 -left-1 h-3 w-1 bg-[#333]" />
                <div className="absolute top-10 -right-1 h-3 w-1 bg-[#333]" />
                <div className="absolute bottom-10 -left-1 h-3 w-1 bg-[#333]" />
                <div className="absolute bottom-10 -right-1 h-3 w-1 bg-[#333]" />

                {/* Buttons */}
                <div className="absolute top-32 -right-[12px] h-14 w-[4px] rounded-l-md bg-[#222] border-l border-white/10 shadow-sm" />
                <div className="absolute top-52 -right-[12px] h-24 w-[4px] rounded-l-md bg-[#222] border-l border-white/10 shadow-sm" />

                {/* Screen */}
                <div className="absolute inset-[2px] overflow-hidden bg-black rounded-[2.2rem]">
                    {/* StatusBar */}
                    <StatusBar />

                    {/* Punch-hole camera */}
                    <div className="absolute top-4 left-1/2 z-[70] h-5 w-5 -translate-x-1/2 rounded-full border-2 border-white/5 bg-black shadow-inner" />

                    {/* Content Wrapper */}
                    <div className="h-full w-full overflow-y-auto no-scrollbar scroll-smooth">
                        {children}
                    </div>

                    {/* NavigationBar (Gesture Bar) */}
                    <NavigationBar />

                    {/* Screen Glass Reflection */}
                    <div className="pointer-events-none absolute inset-0 z-40 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-30" />
                </div>
            </div>

            {/* Bottom Speaker & Port Area Shadow */}
            <div className="absolute bottom-0 left-1/2 -z-10 h-10 w-[80%] -translate-x-1/2 bg-black/40 blur-2xl opacity-50" />
        </div>
    );
};
