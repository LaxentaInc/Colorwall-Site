"use client";

import React from "react";
import { motion } from "framer-motion";
import { ScrollText } from "lucide-react";
import { Footer } from "@/app/components/Footer";
import { useTheme } from "@/app/contexts/ThemeContext";

export default function TermsPage() {
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
                            <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-500">
                                <ScrollText size={32} />
                            </div>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-black mb-6">Terms of Service</h1>
                        <p className={`text-lg ${mutedText}`}>
                            By downloading and using ColorWall, you agree to the following terms.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className={`prose prose-lg ${proseClass} max-w-none space-y-8`}
                    >
                        <section>
                            <h3>1. Strict Copyleft License (AGPL-3.0)</h3>
                            <p>
                                ColorWall is released under the <strong>GNU Affero General Public License v3.0 (AGPL-3.0)</strong>. This is an aggressive copyleft license designed to ensure the software remains free and open.
                            </p>
                            <ul className="list-disc pl-5 space-y-2 mt-4 text-sm opacity-90">
                                <li><strong>No Proprietary Forks:</strong> If you modify this software and distribute it (or host it over a network), you <strong>MUST</strong> release your source code under the same AGPL-3.0 license.</li>
                                <li><strong>Attribution Required:</strong> You must strictly preserve all copyright notices and credit the original authors.</li>
                                <li><strong>Source Disclosure:</strong> You cannot distribute the binary without providing access to the source code.</li>
                            </ul>
                            <div className="mt-4">
                                <a href="/agpl-3.0.txt" target="_blank" className="font-bold text-blue-500 hover:underline">Read Full Legal Text &rarr;</a>
                            </div>
                        </section>

                        <section>
                            <h3>2. Commercial Usage Restrictions</h3>
                            <p>
                                While you can use this software for commercial purposes, you <strong>CANNOT</strong> sell it as a proprietary "black box" product.
                                Any commercial derivative work must also be Open Source (AGPL-3.0) and allow users to download the source code for free.
                                Effectively, you cannot "resell" this free software without competing with the free source itself.
                            </p>
                        </section>

                        <section>
                            <h3>3. Liability</h3>
                            <p>
                                ColorWall and its contributors are not liable for any damages arising from the use of this software, including
                                but not limited to data loss, hardware issues (though we try our best!), or lost profits.
                            </p>
                        </section>

                        <div className={`p-6 rounded-2xl border ${borderColor} ${isDark ? "bg-white/5" : "bg-black/5"}`}>
                            <p className="text-sm m-0 font-mono opacity-70">
                                Last Updated: February 12, 2026
                            </p>
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer theme={theme} />
        </div>
    );
}
