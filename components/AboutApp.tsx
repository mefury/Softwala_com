import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface AboutAppProps {
    onClose: () => void;
}

export const AboutApp: React.FC<AboutAppProps> = ({ onClose }) => {
    return (
        <div className="absolute inset-0 z-[100] bg-zinc-950 flex flex-col animate-in slide-in-from-bottom duration-500 ease-out">
            {/* AppBar */}
            <div className="flex items-center justify-between px-6 pt-12 pb-4 bg-zinc-900/50 backdrop-blur-md border-b border-white/5">
                <h2 className="text-lg font-bold text-white tracking-tight">About Softwala</h2>
                <button
                    onClick={onClose}
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
                >
                    <XMarkIcon className="h-6 w-6" />
                </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto no-scrollbar">
                {/* Hero Profile Image */}
                <div className="relative w-full aspect-square max-h-[400px]">
                    <img
                        src="/Profile.png"
                        alt="Habibur Rahman"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
                </div>

                {/* Bio Content */}
                <div className="px-8 pb-12 -mt-12 relative z-10">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold text-white tracking-tight">Habibur Rahman</h3>
                            <p className="text-blue-400 font-medium tracking-wide uppercase text-xs">Founder • Engineer • Researcher</p>
                        </div>

                        <div className="space-y-4 text-zinc-300 leading-relaxed text-[15px]">
                            <p>
                                I'm Habibur Rahman, <span className="text-white font-semibold">Founder of softwala</span>. I build apps and software solutions designed to help you be more productive and simplify your daily life. Based in Bangladesh, my process usually starts with deep research—finding problems that software can solve, or taking existing tools and making them truly better.
                            </p>

                            <p>
                                My goal is to build <span className="italic">with</span> the community. I listen to your problems and craft solutions that resonate. In this age of AI, making something "work" is easy, but making something with a <span className="text-white font-medium italic underline decoration-blue-500/50 underline-offset-4">soul</span> , something that actually clicks and feels right requires careful planning, research, and an engineer's heart.
                            </p>

                            <p>
                                I’m here to provide simple, useful applications that don't just exist, but actually help you thrive. Let's build something great together.
                            </p>
                        </div>

                        {/* Social Follow Buttons */}
                        <div className="flex flex-col gap-3 pt-2">
                            <a
                                href="https://x.com/meefury"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 px-6 py-3 bg-white text-black rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-white/5"
                            >
                                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
                                </svg>
                                Follow on X
                            </a>
                            <a
                                href="https://www.facebook.com/hrj.dev"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 px-6 py-3 bg-[#1877F2] text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-[#1877F2]/20"
                            >
                                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                                Follow on Facebook
                            </a>
                        </div>

                        {/* Social Links / Footer subtle */}
                        <div className="pt-8 border-t border-white/5">
                            <div className="flex flex-col gap-1 opacity-40">
                                <p className="text-[10px] uppercase tracking-widest font-bold">Location</p>
                                <p className="text-xs">Dhaka, Bangladesh</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
