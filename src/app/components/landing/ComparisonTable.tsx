"use client";

import { motion } from "framer-motion";
import { GradientHeading } from "./GradientHeading";
import { Check, X, Minus } from "lucide-react";

export const ComparisonTable = ({ theme }: { theme: "dark" | "light" }) => {
    const isDark = theme === "dark";

    const features = [
        { label: "Price", cw: "Free", we: "$3.99", lv: "Free" },
        { label: "CPU (4K Video)", cw: "1.3%", we: "1.2%", lv: "0.8%" },
        { label: "GPU (4K Video)", cw: "22.9%", we: "74%", lv: "83.8%" },
        { label: "Rendering Engine", cw: "DirectX 11", we: "DirectX / Web", lv: "CefSharp" },
        { label: "Scene Editor", cw: "Yes", we: "Yes", lv: "None" },
        { label: "Audio Reactivity", cw: "Native", we: "Native", lv: "Base Level" },
        { label: "HTML Widgets", cw: "Native", we: "Third-party", lv: "Limited" },
        { label: "Taskbar Effects", cw: "Acrylic / Blur", we: "Slightly Advanced", lv: "Yes" },
        { label: "Open Source", cw: "Closed Source", we: "Closed Source", lv: "Yes (GPL-3)" },
    ];

    const renderValue = (val: string, isCw: boolean) => {
        if (val === "Yes" || val.includes("Built-in") || val.includes("Native")) {
            return (
                <div className={`flex items-center justify-center gap-2 whitespace-nowrap ${isCw ? "text-emerald-400 font-bold" : (isDark ? "text-emerald-400/80" : "text-emerald-600")}`}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                        <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" fill="currentColor" fillOpacity="0.15"/>
                        <path d="M7.75 12L10.58 14.83L16.25 9.17004" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{val}</span>
                </div>
            );
        }
        if (val === "No" || val === "None") {
            return (
                <div className={`flex items-center justify-center gap-2 whitespace-nowrap ${isDark ? "text-red-400/70" : "text-red-500/80"}`}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                        <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" fill="currentColor" fillOpacity="0.1"/>
                        <path d="M9.17004 14.83L14.83 9.17004M14.83 14.83L9.17004 9.17004" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{val}</span>
                </div>
            );
        }
        if (val.includes("Third-party") || val.includes("Limited") || val.includes("Basic")) {
            return (
                <div className={`flex items-center justify-center gap-2 whitespace-nowrap ${isDark ? "text-amber-400/80" : "text-amber-600"}`}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                        <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" fill="currentColor" fillOpacity="0.1"/>
                        <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{val}</span>
                </div>
            );
        }
        
        // Default text
        return <span className={`whitespace-nowrap ${isCw ? (isDark ? "text-blue-400 font-bold" : "text-blue-600 font-bold") : (isDark ? "text-white/60" : "text-black/60")}`}>{val}</span>;
    };

    return (
        <section className="py-32 px-4 sm:px-8 relative overflow-hidden">
            {/* Background Glow */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] blur-[120px] rounded-full opacity-10 pointer-events-none ${isDark ? "bg-blue-600" : "bg-blue-400"}`} />

            <div className="max-w-5xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center mb-16"
                >
                    <p className={`text-xs font-mono uppercase tracking-[0.2em] mb-4
                        ${theme === "dark" ? "text-emerald-400" : "text-emerald-600"}`}>
                        how it compares
                    </p>
                    <GradientHeading
                        text="Built differently."
                        theme={theme}
                        className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight"
                    />
                    <p className={`text-sm font-medium mt-6 max-w-2xl mx-auto ${isDark ? "text-white/50" : "text-black/60"}`}>
                        Performance benchmarks represent a single snapshot on an i3-4th Gen with Intel(R) HD 4600 Graphics running a 4K 60FPS video.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="relative"
                >
                    <div className="w-full overflow-x-auto pb-6 -mx-4 px-4 sm:mx-0 sm:px-0">
                        <table className="w-full min-w-[800px] border-collapse">
                            <thead>
                                <tr>
                                    <th className="w-1/4 p-6 text-left" />
                                    <th className="w-1/3 p-0 align-bottom">
                                        <div className={`mx-0 sm:mx-2 p-8 rounded-t-2xl border-t border-x relative
                                            ${isDark ? "bg-blue-500/10 border-blue-500/30" : "bg-blue-50 border-blue-200"}`}>
                                            <div className="flex flex-col items-center gap-3">
                                                <img src="/colorwall.png" alt="ColorWall" className="w-10 h-10 object-contain" />
                                                <span className={`text-xl font-bold tracking-tight ${isDark ? "text-white" : "text-black"}`}>ColorWall</span>
                                            </div>
                                        </div>
                                    </th>
                                    <th className={`w-1/5 p-6 align-bottom pb-8 text-center font-bold text-lg ${isDark ? "text-white/60" : "text-black/60"}`}>Wallpaper Engine</th>
                                    <th className={`w-1/5 p-6 align-bottom pb-8 text-center font-bold text-lg ${isDark ? "text-white/60" : "text-black/60"}`}>Lively</th>
                                </tr>
                            </thead>
                            <tbody>
                                {features.map((feature, i) => (
                                    <tr key={feature.label} className="group">
                                        <td className={`p-5 font-mono text-sm tracking-wide border-y transition-colors
                                            ${isDark ? "border-white/5 text-white/80 group-hover:bg-white/[0.02]" : "border-black/5 text-black/80 group-hover:bg-black/[0.02]"}`}>
                                            {feature.label}
                                        </td>
                                        <td className="p-0 border-y-0">
                                            <div className={`mx-0 sm:mx-2 px-8 py-5 text-center transition-colors h-full flex flex-col justify-center
                                                ${isDark 
                                                    ? "bg-blue-500/10 border-x border-blue-500/30 group-hover:bg-blue-500/20" 
                                                    : "bg-blue-50 border-x border-blue-200 group-hover:bg-blue-100/50"}
                                                ${i === features.length - 1 ? "rounded-b-2xl border-b pb-8" : "border-b border-b-blue-500/20"}`}>
                                                {renderValue(feature.cw, true)}
                                            </div>
                                        </td>
                                        <td className={`p-5 text-center border-y transition-colors
                                            ${isDark ? "border-white/5 group-hover:bg-white/[0.02]" : "border-black/5 group-hover:bg-black/[0.02]"}`}>
                                            {renderValue(feature.we, false)}
                                        </td>
                                        <td className={`p-5 text-center border-y transition-colors
                                            ${isDark ? "border-white/5 group-hover:bg-white/[0.02]" : "border-black/5 group-hover:bg-black/[0.02]"}`}>
                                            {renderValue(feature.lv, false)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
