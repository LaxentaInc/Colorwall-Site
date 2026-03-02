"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Download, Github } from "lucide-react";
import { Footer } from "@/app/components/Footer";
import { useTheme } from "@/app/contexts/ThemeContext";

export default function ChangelogPage() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const bgColor = isDark ? "bg-[#0a0a0a]" : "bg-white";
    const textColor = isDark ? "text-white" : "text-black";
    const mutedText = isDark ? "text-white/60" : "text-black/60";
    const borderColor = isDark ? "border-white/10" : "border-black/10";
    const codeBg = isDark ? "bg-white/5" : "bg-black/5";

    return (
        <div className={`min-h-screen ${bgColor} ${textColor} font-sans selection:bg-blue-500/30`}>
            {/* Minimal Header */}
            {/* Header removed for global navbar */}

            <main className="pt-28 pb-20 px-6">
                <div className="max-w-2xl mx-auto">

                    {/* Page Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-16"
                    >
                        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
                            Changelog
                        </h1>
                        <p className={`text-lg ${mutedText} mb-8`}>
                            Stay up to date with the latest releases, performance improvements, and bug fixes.
                        </p>

                        <a
                            href="https://github.com/colorwall/colorwall/releases/latest"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl
                                ${isDark ? "bg-white text-black hover:shadow-white/10" : "bg-black text-white hover:shadow-black/10"}`}
                        >
                            <Github size={18} />
                            View Releases
                        </a>
                    </motion.div>

                    {/* Latest Release Heading */}
                    <div className="mb-16 border-l-2 border-blue-500 pl-6">
                        <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-3xl font-bold tracking-tight">v3.6.5</h2>
                            <span className={`text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 font-mono`}>
                                LATEST
                            </span>
                        </div>
                        <p className={`text-sm opacity-50 font-mono mb-4`}>FEBRUARY 12, 2026</p>
                        <p className={`text-lg leading-relaxed ${mutedText}`}>
                            Performance improvements, UI unmount fixes, and better multi-monitor (EnumDisplay) handling.
                        </p>
                    </div>

                    {/* v2.2.1 - The Major Architecture Change */}
                    <div className="mb-12 border-l-2 border-emerald-500/40 pl-6 opacity-90">
                        <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-xl font-bold tracking-tight">v2.2.1 - Biggest Patch</h2>
                            <span className={`text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-mono`}>
                                MAJOR
                            </span>
                        </div>
                        <p className={`text-sm opacity-50 font-mono mb-4`}>DECEMBER 28, 2025</p>

                        <div className="space-y-6">
                            <p className={`${mutedText}`}>
                                This was the last major breaking change. Future updates will focus purely on performance and stability.
                            </p>

                            <div>
                                <h3 className="font-bold text-sm uppercase tracking-wide opacity-70 mb-2">Fixed: Desktop Crashes</h3>
                                <ul className={`list-disc list-inside space-y-1 ${mutedText} text-sm`}>
                                    <li>Fixed explorer.exe hangs when dragging files over video wallpapers.</li>
                                    <li>Resolved severe desktop corruption on Windows 11 24H2.</li>
                                    <li>Fixed DWM (Desktop Window Manager) restarting to recover from Deadlocks.</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-bold text-sm uppercase tracking-wide opacity-70 mb-2">Technical Changes</h3>
                                <ul className={`list-disc list-inside space-y-1 ${mutedText} text-sm`}>
                                    <li><strong>Dual Process Architecture</strong>: Separated UI and Wallpaper Player into two distinct processes.</li>
                                    <li><strong>Independent Message Loop</strong>: The wallpaper window now handles events separately from Tauri's UI thread.</li>
                                    <li><strong>Injection Logic</strong>: Rewrote window parenting logic (Progman/WorkerW) for better stability across Windows versions.</li>
                                </ul>
                            </div>

                            <div className={`p-4 rounded-lg bg-current/5 border border-current/10 font-mono text-xs ${mutedText}`}>
                                So i had to refractor the whole code, compile it as a diff binary for windows and then have my main app communicate and use it as the player.
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer theme={theme} />
        </div>
    );
}
