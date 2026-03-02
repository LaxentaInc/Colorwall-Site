"use client";

import { FaWindows, FaGithub, FaDiscord, FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const Footer = ({ theme }: { theme: "dark" | "light" }) => {
    const isDark = theme === "dark";

    const footerLinks = [
        {
            title: "Product",
            links: [
                { name: "Download", href: "/download" },
                { name: "Changelog", href: "/changelog" }
            ]
        },
        {
            title: "Community",
            links: [
                { name: "Discord", href: "https://discord.gg/cHVwPkBC7p" },
                { name: "GitHub", href: "https://github.com/colorwall/colorwall" },
                { name: "Issues", href: "https://github.com/colorwall/colorwall/issues" }
            ]
        },
        {
            title: "Legal",
            links: [
                { name: "Privacy", href: "/privacy" },
                { name: "Terms", href: "/terms" }
            ]
        }
    ];

    return (
        <footer className={`relative border-t w-full mt-24 overflow-hidden ${isDark ? "border-white/5 bg-[#050505]" : "border-black/5 bg-slate-50"} py-16 sm:py-24`}>
            {/* Optional grid background pattern */}
            <div className={`absolute inset-0 pointer-events-none ${isDark ? "opacity-10" : "opacity-[0.03]"}`}
                style={{
                    backgroundImage: `linear-gradient(${isDark ? 'white' : 'black'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? 'white' : 'black'} 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                    maskImage: 'radial-gradient(ellipse at top, black 20%, transparent 80%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at top, black 20%, transparent 80%)'
                }}
            />

            <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-12">

                    {/* Left Column: Logo & Get ColorWall */}
                    <div className="flex flex-col gap-6 w-full lg:w-1/4 max-w-sm">
                        <div className="relative h-14 sm:h-16 w-fit mb-2">
                            <img
                                src="/LxColorWall.png"
                                alt="ColorWall Logo"
                                className="object-contain w-auto h-full object-left pointer-events-none select-none"
                            />
                        </div>
                        <p className={`text-[15px] leading-relaxed font-medium ${isDark ? "text-white/50" : "text-black/60"}`}>
                            The next-generation wallpaper engine built for performance and aesthetics.
                        </p>


                    </div>

                    {/* Middle Column: Links Grid */}
                    <div className="flex-1 max-w-2xl grid grid-cols-2 sm:grid-cols-3 gap-10">
                        {footerLinks.map((section) => (
                            <div key={section.title} className="flex flex-col gap-5">
                                <h3 className={`font-bold text-[13px] tracking-widest uppercase ${isDark ? "text-[#8a8f98]" : "text-[#737a87]"}`}>
                                    {section.title}
                                </h3>
                                <div className="flex flex-col gap-3">
                                    {section.links.map((link) => (
                                        <a
                                            key={link.name}
                                            href={link.href}
                                            className={`text-[14px] font-medium transition-colors hover:text-[#00A4FF] w-fit
                                                ${isDark ? "text-white/70" : "text-[#4b5563]"}`}
                                        >
                                            {link.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Column: Connect */}
                    <div className="flex flex-col gap-5 lg:w-[320px]">
                        <h3 className={`font-bold text-[18px] ${isDark ? "text-white" : "text-black"}`}>
                            Connect
                        </h3>

                        <a
                            href="mailto:help.colorwall@gmail.com"
                            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-colors w-fit
                                ${isDark
                                    ? "border-white/10 bg-[#0a0a0a] hover:bg-[#151515]"
                                    : "border-black/10 bg-white hover:bg-gray-50"}`}
                        >
                            <FaEnvelope size={16} className={isDark ? "text-white/60" : "text-black/60"} />
                            <span className={`text-[15px] font-medium font-mono ${isDark ? "text-white/80" : "text-black/80"}`}>
                                help.colorwall@gmail.com
                            </span>
                        </a>

                        <div className="flex items-center gap-3 mt-1">
                            <a
                                href="https://github.com/colorwall/colorwall"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center justify-center p-3.5 rounded-xl border transition-colors
                                    ${isDark
                                        ? "border-white/10 bg-[#0a0a0a] hover:bg-[#151515] text-white/80 hover:text-white"
                                        : "border-black/10 bg-white hover:bg-gray-50 text-black/80 hover:text-black"}`}
                            >
                                <FaGithub size={22} />
                            </a>
                            <a
                                href="https://discord.gg/cHVwPkBC7p"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center justify-center p-3.5 rounded-xl border transition-colors
                                    ${isDark
                                        ? "border-white/10 bg-[#0a0a0a] hover:bg-[#151515] text-white/80 hover:text-white"
                                        : "border-black/10 bg-white hover:bg-gray-50 text-black/80 hover:text-black"}`}
                            >
                                <FaDiscord size={22} />
                            </a>
                            <a
                                href="https://x.com/colorwall_xyz"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center justify-center p-3.5 rounded-xl border transition-colors
                                    ${isDark
                                        ? "border-white/10 bg-[#0a0a0a] hover:bg-[#151515] text-white/80 hover:text-white"
                                        : "border-black/10 bg-white hover:bg-gray-50 text-black/80 hover:text-black"}`}
                            >
                                <FaXTwitter size={22} />
                            </a>

                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
};
