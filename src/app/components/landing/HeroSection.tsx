"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import Image from "next/image";
import Link from "next/link";
import { Download, FileText, MessageCircle, Monitor, Cpu, Github } from "lucide-react";
import { ScrollArrow } from "./ScrollArrow";

export const HeroSection = ({ theme }: { theme?: "dark" | "light" }) => {
    const { scrollYProgress } = useScroll();
    const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.95]);

    return (
        <motion.section
            style={{ scale: heroScale }}
            className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 bg-black text-white"
        >
            {/* video bg */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    // @ts-expect-error React types don't officially support fetchPriority natively on video elements yet in this TS version
                    fetchPriority="high"
                    className="w-full h-full object-cover opacity-65"
                >
                    <source src="/videos/myCutekoiiii.webm" type="video/webm" />
                </video>

                {/* gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-white/30" />
            </div>

            <div className="relative z-10 text-center flex flex-col items-center space-y-8 max-w-5xl">
                {/* logo */}
                <div className="relative w-full flex justify-center items-center">
                    <Image
                        src="/LxColorWall.png"
                        alt="ColorWall"
                        width={800}
                        height={300}
                        className="w-[280px] sm:w-[400px] md:w-[600px] lg:w-[750px] h-auto object-contain drop-shadow-2xl"
                        priority
                        fetchPriority="high"
                    />
                </div>

                <h2 className="text-sm sm:text-base font-mono font-semibold tracking-widest uppercase opacity-90 mb-1 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    Live Wallpaper <span className="text-blue-500">&</span> Desktop Customization Engine
                </h2>

                {/* typewriter */}
                <div className="text-sm sm:text-lg md:text-xl font-mono text-white/90 font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                    <Typewriter
                        words={[
                            "< A community-driven alternative to Wallpaper Engine />",
                            "< Made in Rust + Tauri · ~5MB app />",
                            "< Insane performance · Lower GPU usage · Hardware decoded />",
                            "< Multiple wallpaper sources · One unified store · Free forever />",
                            "< Tired of paying for animated wallpapers? Same. />",
                        ]}
                        loop={0}
                        cursor
                        cursorStyle="_"
                        typeSpeed={45}
                        deleteSpeed={25}
                        delaySpeed={2200}
                    />
                </div>

                {/* CTA row */}
                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                    {/* download */}
                    <Link
                        href="/download"
                        className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 hover:-translate-y-0.5 bg-white text-black hover:shadow-[0_8px_30px_rgba(255,255,255,0.15)]"
                    >
                        <Download size={18} />
                        Download Now
                        <span className="text-xs px-2 py-0.5 rounded-md ml-1 bg-black/10 text-black/60">
                            Win 10/11
                        </span>
                    </Link>

                    {/* changelog */}
                    <Link
                        href="/changelog"
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 hover:-translate-y-0.5 border border-white/20 text-white bg-black/30 backdrop-blur-md hover:border-white/40 hover:bg-black/50"
                    >
                        <FileText size={16} />
                        Changelog
                    </Link>

                    {/* discord */}
                    <a
                        href="https://discord.gg/cHVwPkBC7p"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 hover:-translate-y-0.5 border border-white/20 text-white bg-black/30 backdrop-blur-md hover:border-indigo-400/50 hover:bg-indigo-500/20 hover:text-indigo-300"
                    >
                        <i className="fa-brands fa-discord text-base"></i>
                        Discord
                    </a>
                </div>

                {/* platform tags */}
                <div className="flex items-center gap-3 text-xs font-mono pt-2 text-white font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    <span className="flex items-center gap-1.5"><Cpu size={12} /> Rust + Tauri</span>
                    <span>·</span>
                    <span className="flex items-center gap-1.5"><Monitor size={12} /> Windows 10/11</span>
                    <span>·</span>
                    <span className="flex items-center gap-1.5"><Github size={12} /> AGPL-3</span>
                </div>
            </div>

            <ScrollArrow theme="dark" />
        </motion.section>
    );
};