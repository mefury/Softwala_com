"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { PhoneMockup } from "@/components/PhoneMockup";
import { MobileUI } from "@/components/MobileUI";

export default function Home() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      // Switch to mockup as soon as the screen is wider than a phone (~500px)
      const mobile = window.innerWidth <= 500;
      setIsMobile(mobile);

      if (!mobile) {
        // galaxy s25 ultra dimensions
        const mockupWidth = 400;
        const mockupHeight = 880;
        const padding = 60; // minimum padding around the phone

        const availableWidth = window.innerWidth - padding;
        const availableHeight = window.innerHeight - padding;

        const widthScale = availableWidth / mockupWidth;
        const heightScale = availableHeight / mockupHeight;

        // Use the smaller scale to ensure it fits both width and height
        const newScale = Math.min(1, widthScale, heightScale);
        setScale(newScale);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Avoid hydration mismatch
  if (isMobile === null) return <div className="min-h-screen bg-black" />;

  return (
    <div className="min-h-screen bg-zinc-950 overflow-hidden">
      {isMobile ? (
        /* Mobile View: Direct UI */
        <div className="h-[100dvh] w-full relative bg-zinc-950">
          <MobileUI isMobile={isMobile} />
          <div className="absolute bottom-2 w-full text-center z-50">
            <p className="text-[9px] text-white font-medium tracking-widest uppercase drop-shadow-sm">
              © 2026 Softwala • Crafted with Passion
            </p>
          </div>
        </div>
      ) : (
        /* Desktop View: Mockup */
        <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black">
          {/* Dot-Grid Background Pattern */}
          <div
            className={cn(
              "absolute inset-0",
              "[background-size:20px_20px]",
              "[background-image:radial-gradient(#404040_1px,transparent_1px)]"
            )}
          />

          {/* Radial mask for spotlight effect */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] z-10"></div>

          {/* Full Viewport Logo Background - Desktop Only */}
          <div className="absolute inset-0 flex items-center justify-center p-12 opacity-[0.4] pointer-events-none select-none z-[15]">
            <img
              src="/logo.svg"
              alt=""
              className="w-full h-full object-contain filter grayscale"
            />
          </div>

          <div
            className="z-20 transition-transform duration-300 ease-out will-change-transform"
            style={{ transform: `scale(${scale})` }}
          >
            <div
              className="animate-in fade-in slide-in-from-bottom-32 duration-[2500ms] ease-out fill-mode-backwards"
              style={{ animationDelay: '800ms' }}
            >
              <PhoneMockup>
                <MobileUI isMobile={false} />
              </PhoneMockup>
            </div>
          </div>

          {/* Copyright & Logo for Desktop - Positioned at the bottom right */}
          <div className="absolute bottom-2 right-4 z-20 flex flex-col items-end gap-1.5 backdrop-blur-sm px-2 py-1 rounded-lg">
            <img src="/logo.svg" alt="Softwala" className="w-auto" />
            <p className="text-[9px] text-white/50 font-medium tracking-widest uppercase drop-shadow-sm border-t border-white/10 pt-1">
              © 2026 Softwala • Crafted with Passion
            </p>
          </div>

          {/* Legal Links - Positioned at the bottom left */}
          <div className="absolute bottom-2 left-4 z-20 flex flex-col items-start gap-1.5 backdrop-blur-sm px-2 py-1 rounded-lg">
            <div className="flex gap-4 text-[10px] text-white/60 font-medium tracking-wider uppercase">
              <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms-conditions" className="hover:text-white transition-colors">Terms & Conditions</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
