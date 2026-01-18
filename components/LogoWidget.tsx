import React from "react";

export const LogoWidget: React.FC = () => {
    return (
        <div className="w-full aspect-square bg-white/5 backdrop-blur-xl rounded-3xl p-4 border border-white/10 shadow-xl flex flex-col items-center justify-center overflow-hidden">
            <span className="text-[11px] font-medium text-white/100 uppercase tracking-[0.2em] mb-1.5">
                Welcome to
            </span>
            <img src="/logo.svg" alt="Softwala" className="h-5 w-auto" />
            <div className="mt-2.5 flex flex-col items-center">
                <p className="text-[12px] font-medium text-white/80 leading-tight text-center max-w-[120px]">
                    Explore our apps and learn about us
                </p>
            </div>
        </div>
    );
};
