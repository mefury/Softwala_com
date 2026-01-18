import React from "react";
import { Launcher } from "./Launcher";

export const MobileUI: React.FC<{ isMobile?: boolean }> = ({ isMobile }) => {
    return (
        <div className="flex h-full flex-col bg-zinc-950 text-white font-sans selection:bg-blue-500/30 overflow-hidden no-scrollbar">
            <Launcher isMobile={isMobile} />
        </div>
    );
};
