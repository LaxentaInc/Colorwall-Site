"use client";

import { motion } from "framer-motion";
import { FaDiscord } from "react-icons/fa";
import { GradientHeading } from "./GradientHeading";

export const BottomCTA = ({ theme }: { theme: "dark" | "light" }) => {
    const isDark = theme === "dark";

    return (
        <section className="py-24 px-4 sm:px-8 relative w-full flex justify-center overflow-hidden">
            {/* Optional subtle grid background */}
            <div className={`absolute inset-0 pointer-events-none ${isDark ? "opacity-10" : "opacity-[0.03]"}`}
                style={{
                    backgroundImage: `linear-gradient(${isDark ? 'white' : 'black'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? 'white' : 'black'} 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                    maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
                }}
            />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative z-10 max-w-4xl mx-auto text-center space-y-5 flex flex-col items-center"
            >
                <h3 className="text-[#00A4FF] font-bold tracking-[0.15em] text-[12px] uppercase mb-1">
                    Join our community
                </h3>

                <GradientHeading
                    as="h2"
                    text={
                        <>
                            Be part of the <span className="text-[#00A4FF] drop-shadow-sm filter-none">Colorwall</span> community
                        </>
                    }
                    theme={theme}
                    className="text-4xl sm:text-5xl md:text-[50px] font-black tracking-tight leading-[1.1]"
                />

                <p className={`text-[15px] sm:text-[17px] leading-relaxed max-w-md mx-auto pt-3 pb-6 ${isDark ? "text-white/60" : "text-black/60"}`}>
                    Join our thriving community of enthusiasts.<br />
                    Connect, share, and stay updated.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                        href="/download"
                      
                        rel="noopener noreferrer"
                        className={`inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full font-bold text-[15px] transition-all duration-300 hover:scale-105 
                            ${isDark
                                ? "bg-[#18181b] text-white hover:bg-[#27272a] border border-white/5"
                                : "bg-gray-100 text-black hover:bg-gray-200 border border-black/5"}`}
                    >
                        Download
                    </a>
                    <a
                        href="https://discord.gg/cHVwPkBC7p"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-full font-bold text-[15px] transition-all duration-300 hover:scale-105 bg-[#5865F2] text-white shadow-[0_0_20px_rgba(88,101,242,0.3)] hover:shadow-[0_0_30px_rgba(88,101,242,0.5)]"
                    >
                        <FaDiscord size={20} />
                        Join Discord
                    </a>


                </div>
            </motion.div>
        </section>
    );
};
