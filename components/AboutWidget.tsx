import React from "react";

export const AboutWidget: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="w-full aspect-square bg-zinc-900 rounded-3xl border border-white/10 shadow-xl relative overflow-hidden group active:scale-95 transition-transform"
        >
            {/* Profile Image as Background */}
            <img
                src="/Profile.png"
                alt="About Us"
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-500"
            />

            {/* Bottom Text Overlay */}
            <div className="absolute inset-x-0 bottom-0 pt-8 pb-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <span className="text-[12px] font-bold text-white uppercase tracking-[0.2em]">
                    About Us
                </span>
            </div>
        </button>
    );
};
