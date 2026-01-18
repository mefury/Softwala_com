import React from "react";
import { MegaphoneIcon } from "@heroicons/react/24/solid";

export const NoticeWidget: React.FC = () => {
    return (
        <div className="w-full aspect-square bg-white/5 backdrop-blur-xl rounded-3xl p-4 border border-white/10 shadow-xl flex flex-col items-start gap-1.5 overflow-hidden">
            <div className="flex items-center gap-1.5 text-amber-400/90">
                <MegaphoneIcon className="h-4 w-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Notice</span>
            </div>
            <div className="flex-1 flex flex-col justify-center">
                <p className="text-[13px] font-medium text-white/90 leading-snug line-clamp-4">
                    We are building premium apps for you. Stay tuned for updates!
                </p>
            </div>
        </div>
    );
};
