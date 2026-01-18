import React, { useState } from "react";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";

import { TimeWidget } from "./TimeWidget";
import { LogoWidget } from "./LogoWidget";
import { AboutWidget } from "./AboutWidget";
import { NoticeWidget } from "./NoticeWidget";
import { AboutApp } from "./AboutApp";
import { SnakeGameApp } from "./SnakeGameApp";
import { TetrisGameApp } from "./TetrisGameApp";

// Custom Premium Facebook Icon
// ... (rest of the icons)

// Custom Premium Facebook Icon
const FacebookIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[1.625rem] w-[1.625rem]">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
);

// Custom Premium YouTube Icon
const YoutubeIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[1.625rem] w-[1.625rem]">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
);

interface LauncherProps {
    isMobile?: boolean;
}

export const Launcher: React.FC<LauncherProps> = ({ isMobile }) => {
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [activeApp, setActiveApp] = useState<string | null>(null);
    const [showYoutubeToast, setShowYoutubeToast] = useState(false);

    const appIcons = [
        { id: "contact", icon: PhoneIcon, label: "Phone", color: "bg-green-500", value: "01830333786", url: "tel:01830333786" },
        { id: "email", icon: EnvelopeIcon, label: "Email", color: "bg-indigo-600", value: "getsoftwala@gmail.com", url: "mailto:getsoftwala@gmail.com" },
        { id: "facebook", icon: FacebookIcon, label: "Facebook", color: "bg-[#1877F2]", url: "https://www.facebook.com/softwala/" },
        { id: "youtube", icon: YoutubeIcon, label: "YouTube", color: "bg-[#FF0000]", url: "#" },
    ];

    const handleAction = (e: React.MouseEvent, app: typeof appIcons[0]) => {
        // Handle Coming Soon for YouTube
        if (app.id === "youtube") {
            e.preventDefault();
            setShowYoutubeToast(true);
            setTimeout(() => setShowYoutubeToast(false), 2000);
            return;
        }

        // If it's a specialty contact icon and we are on desktop
        if ((app.id === "contact" || app.id === "email") && !isMobile) {
            e.preventDefault();
            if (app.value) {
                navigator.clipboard.writeText(app.value);
                setCopiedId(app.id);
                setTimeout(() => setCopiedId(null), 2000);
            }
        }
    };

    return (
        <div
            className="relative h-full w-full bg-cover bg-center overflow-hidden flex flex-col"
            style={{ backgroundImage: "url('/bg.jpg')" }}
        >
            {/* Overlay Apps */}
            {activeApp === 'about' && <AboutApp onClose={() => setActiveApp(null)} />}
            {activeApp === 'snake' && <SnakeGameApp onClose={() => setActiveApp(null)} />}
            {activeApp === 'tetris' && <TetrisGameApp onClose={() => setActiveApp(null)} />}

            {/* Top Widget Area */}
            <div className="pt-14 pb-8 px-4 overflow-y-auto no-scrollbar">
                {/* 2x2 Widget Grid */}
                <div className="grid grid-cols-2 gap-3 w-full max-w-[400px] mx-auto mb-10">
                    <LogoWidget />
                    <TimeWidget />
                    <AboutWidget onClick={() => setActiveApp('about')} />
                    <NoticeWidget />
                </div>

                {/* App Grid Section */}
                <div className="max-w-[400px] mx-auto px-2">
                    <div className="grid grid-cols-4 gap-y-6 gap-x-4">
                        <button
                            onClick={() => setActiveApp('snake')}
                            className="flex flex-col items-center gap-2 group active:scale-95 transition-all"
                        >
                            <div className="h-14 w-14 rounded-2xl bg-zinc-800/50 backdrop-blur-md border border-white/10 overflow-hidden shadow-lg group-hover:border-white/20 transition-colors">
                                <img src="/snake.png" alt="Snake" className="w-full h-full object-cover" />
                            </div>
                            <span className="text-[11px] font-medium text-white/80 tracking-wide">Snake</span>
                        </button>

                        <button
                            onClick={() => setActiveApp('tetris')}
                            className="flex flex-col items-center gap-2 group active:scale-95 transition-all"
                        >
                            <div className="h-14 w-14 rounded-2xl bg-zinc-800/50 backdrop-blur-md border border-white/10 overflow-hidden shadow-lg group-hover:border-white/20 transition-colors">
                                <img src="/tetris.png" alt="Tetris" className="w-full h-full object-cover" />
                            </div>
                            <span className="text-[11px] font-medium text-white/80 tracking-wide">Tetris</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main App Grid Area (Empty for now) */}
            <div className="flex-1" />

            {/* Bottom App Dock */}
            <div className="px-4 pb-8">
                <div className="flex justify-between items-center px-2">
                    {appIcons.map((app) => (
                        <a
                            key={app.id}
                            href={app.id === "contact" || app.id === "email" ? (isMobile ? app.url : "#") : app.url}
                            onClick={(e) => handleAction(e, app)}
                            target={app.id !== "contact" && app.id !== "email" ? "_blank" : undefined}
                            rel="noopener noreferrer"
                            className={`group relative flex h-14 w-14 items-center justify-center rounded-2xl ${app.color} shadow-lg transition-transform active:scale-95`}
                        >
                            <app.icon className={`${app.id === 'contact' || app.id === 'email' ? 'h-6 w-6' : 'h-7 w-7'} text-white transition-opacity ${copiedId === app.id ? 'opacity-0' : 'opacity-100'}`} />

                            {/* Copied Feedback Overlay */}
                            {copiedId === app.id && (
                                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white uppercase tracking-tighter animate-in fade-in zoom-in duration-200">
                                    Copied!
                                </span>
                            )}

                            {/* App Label Tooltip (Optional) */}
                            <span className="absolute -top-10 scale-0 rounded-lg bg-black/80 px-2 py-1 text-[10px] text-white transition-all group-hover:scale-100">
                                {copiedId === app.id ? 'Copied to Clipboard' : app.label}
                            </span>
                        </a>
                    ))}
                </div>
            </div>

            {/* Coming Soon Toast */}
            {showYoutubeToast && (
                <div className="fixed bottom-32 left-1/2 -translate-x-1/2 z-[200] animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="bg-zinc-900/90 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-sm font-bold text-white tracking-wide uppercase">YouTube Coming Soon</span>
                    </div>
                </div>
            )}
        </div>
    );
};
