"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ScrollText, Shield } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/app/components/Footer";
import { useTheme } from "@/app/contexts/ThemeContext";

export default function PrivacyPage() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const bgColor = isDark ? "bg-[#0a0a0a]" : "bg-white";
    const textColor = isDark ? "text-white" : "text-black";
    const mutedText = isDark ? "text-white/60" : "text-black/60";
    const borderColor = isDark ? "border-white/10" : "border-black/10";
    const proseClass = isDark ? "prose-invert" : "";

    return (
        <div className={`min-h-screen ${bgColor} ${textColor} font-sans selection:bg-blue-500/30`}>
            <div className="h-16" /> {/* Spacer for fixed navbar */}

            <main className="pt-20 pb-20 px-6">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500">
                                <Shield size={32} />
                            </div>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-black mb-6">Privacy Policy</h1>
                        <p className={`text-lg ${mutedText}`}>
                            Your privacy is critically important to us. As an open-source project (AGPL-3.0), our code is public and auditable.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className={`prose prose-lg ${proseClass} max-w-none space-y-8`}
                    >
                        <section>
                            <h3>1. Data Collection</h3>
                            <p>
                                We don't ask you for personal information unless we truly need it. ColorWall is designed to be privacy-first.
                                We do not collect:
                            </p>
                            <ul>
                                <li>Your files or wallpapers (they stay local)</li>
                                <li>Your usage habits</li>
                                <li>Your hardware serial numbers</li>
                            </ul>
                        </section>

                        <section>
                            <h3>2. Network Communication</h3>
                            <p>
                                The application connects to standard wallpaper APIs (like Wallhaven, Konachan) only when you search for wallpapers.
                                These requests are direct from your computer to their servers. We do not proxy or intercept this traffic.
                            </p>
                        </section>

                        <section>
                            <h3>3. Local Storage</h3>
                            <p>
                                All your configurations, playlists, and imported wallpapers are stored locally on your device in your AppData folder.
                                Deleting the application removes this data (unless you choose to keep it).
                            </p>
                        </section>

                        <section>
                            <h3>4. Updates</h3>
                            <p>
                                The app checks GitHub Releases for new updates. This is a read-only check to see if a newer version tag exists.
                            </p>
                        </section>

                        <div className={`p-6 rounded-2xl border ${borderColor} ${isDark ? "bg-white/5" : "bg-black/5"}`}>
                            <p className="text-sm m-0 font-mono opacity-70">
                                Last Updated: February 12, 2026 <br />
                                Contact: help.colorwall@gmail.com
                            </p>
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer theme={theme} />
        </div>
    );
}
