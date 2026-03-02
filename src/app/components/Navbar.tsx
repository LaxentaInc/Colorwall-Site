"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/app/contexts/ThemeContext";
import { Github, MessageCircle, Moon, Sun, Home, Download, FileText, Menu, X } from "lucide-react";

export const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const pathname = usePathname();
    const isDark = theme === "dark";
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Auto-hide logic
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show if scrolling UP or at the very top
            if (currentScrollY < lastScrollY || currentScrollY < 50) {
                setIsVisible(true);
            } else {
                // Hide if scrolling DOWN and not at top
                setIsVisible(false);
                setIsMobileMenuOpen(false); // Close menu on scroll down
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const navLinks = [
        { name: "Home", href: "/", icon: Home },
        { name: "Download", href: "/download", icon: Download },
        { name: "Changelog", href: "/changelog", icon: FileText },
        { name: "Discussions", href: "https://github.com/orgs/Colorwall/discussions", icon: MessageCircle },
    ];

    return (
        <motion.div
            className={`fixed top-4 z-[100] transition-all duration-300 ${isMobileMenuOpen ? 'w-[calc(100%-2rem)] max-w-7xl left-1/2 -translate-x-1/2' : 'right-4 md:left-1/2 md:w-[calc(100%-2rem)] md:max-w-7xl md:-translate-x-1/2 md:right-auto'}`}
            initial={{ y: -100, opacity: 0 }}
            animate={{
                y: isVisible || isHovered ? 0 : -100,
                opacity: isVisible || isHovered ? 1 : 0
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={`transition-all duration-300 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] border
                ${isMobileMenuOpen ? "px-4 py-4 rounded-2xl w-full" : "px-2 py-2 sm:px-6 md:py-0 md:h-16 rounded-full md:rounded-2xl w-auto md:w-full"} 
                ${isDark
                    ? "bg-[#161618]/90 border-white/10 shadow-black/50"
                    : "bg-white/90 border-black/10"}`}
            >
                <div className={`flex items-center h-[48px] sm:h-auto md:h-full ${isMobileMenuOpen ? 'justify-between w-full' : 'justify-center md:justify-between w-auto md:w-full'}`}>

                    {/* Left: Logo / Brand (Hidden on Mobile when Closed) */}
                    <div className={`flex-1 flex justify-start ${isMobileMenuOpen ? 'flex' : 'hidden md:flex'}`}>
                        <Link
                            href="/"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center transition-opacity hover:opacity-80"
                        >
                            <img src="/colorwall.png" alt="ColorWall Logo" className="object-contain h-8 sm:h-10" />
                        </Link>
                    </div>

                    {/* Desktop: Center Nav Links */}
                    <nav className="hidden md:flex shrink-0 items-center gap-2 sm:gap-4">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            const isExternal = link.href.startsWith("http");
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    target={isExternal ? "_blank" : undefined}
                                    rel={isExternal ? "noopener noreferrer" : undefined}
                                    className={`px-3 py-2 sm:px-4 rounded-xl transition-all duration-300 flex items-center gap-2 group
                                        ${isActive
                                            ? (isDark ? "bg-white/10 text-white shadow-sm" : "bg-black/5 text-black")
                                            : (isDark ? "text-white/85 hover:text-white hover:bg-white/10" : "text-black/70 hover:text-black hover:bg-black/5")}`}
                                >
                                    <link.icon size={18} className="transition-opacity group-hover:opacity-100" />
                                    <span className="text-sm font-medium transition-opacity group-hover:opacity-100">
                                        {link.name}
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Desktop: Right Socials & Settings */}
                    <div className="hidden md:flex flex-1 justify-end items-center gap-1 sm:gap-2">
                        <a href="https://github.com/colorwall/colorwall" target="_blank" rel="noopener noreferrer" className={`p-2 rounded-xl transition-all duration-300 flex items-center justify-center ${isDark ? "text-white/85 hover:text-white hover:bg-white/10" : "text-black/70 hover:text-black hover:bg-black/5"}`} title="GitHub">
                            <i className="fa-brands fa-github text-[20px]"></i>
                        </a>
                        <a href="https://discord.gg/cHVwPkBC7p" target="_blank" rel="noopener noreferrer" className={`p-2 rounded-xl transition-all duration-300 flex items-center justify-center ${isDark ? "text-white/85 hover:text-[#5865F2] hover:bg-[#5865F2]/10" : "text-black/70 hover:text-[#5865F2] hover:bg-[#5865F2]/10"}`} title="Discord">
                            <i className="fa-brands fa-discord text-[20px]"></i>
                        </a>
                        <a href="https://x.com/colorwall_xyz" target="_blank" rel="noopener noreferrer" className={`p-2 rounded-xl transition-all duration-300 flex items-center justify-center ${isDark ? "text-white/85 hover:text-white hover:bg-white/10" : "text-black/70 hover:text-black hover:bg-black/5"}`} title="X">
                            <i className="fa-brands fa-x-twitter text-[20px]"></i>
                        </a>
                        <div className={`w-[1px] h-6 mx-2 ${isDark ? "bg-white/10" : "bg-black/10"}`} />
                        <button onClick={toggleTheme} className={`p-2 rounded-xl transition-all duration-300 ${isDark ? "text-yellow-400 hover:bg-yellow-400/10" : "text-slate-600 hover:bg-slate-200"}`} title="Toggle Theme">
                            {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </div>

                    {/* Mobile: Pill Controls (Theme Toggle & Menu) */}
                    <div className={`md:hidden flex items-center gap-1 ${isMobileMenuOpen ? 'flex-1 justify-end' : ''}`}>
                        <button
                            onClick={toggleTheme}
                            className={`p-2.5 rounded-full transition-all duration-300 ${isDark ? "text-yellow-400 hover:bg-yellow-400/10" : "text-slate-600 hover:bg-slate-200"}`}
                        >
                            {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`p-2.5 rounded-full transition-all duration-300 ${isDark ? "text-white bg-white/10 hover:bg-white/20" : "text-black bg-black/5 hover:bg-black/10"}`}
                        >
                            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown Menu Expanded Content */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="md:hidden overflow-hidden flex flex-col pt-4 gap-2 border-t mt-2"
                            style={{ borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }}
                        >
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                const isExternal = link.href.startsWith("http");
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        target={isExternal ? "_blank" : undefined}
                                        rel={isExternal ? "noopener noreferrer" : undefined}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3
                                            ${isActive
                                                ? (isDark ? "bg-white/10 text-white" : "bg-black/5 text-black")
                                                : (isDark ? "text-white/85 hover:text-white hover:bg-white/10" : "text-black/70 hover:text-black hover:bg-black/5")}`}
                                    >
                                        <link.icon size={20} />
                                        <span className="font-medium text-base">{link.name}</span>
                                    </Link>
                                );
                            })}

                            {/* Socials on Mobile */}
                            <div className="flex items-center gap-4 px-4 py-3">
                                <a href="https://github.com/colorwall/colorwall" target="_blank" rel="noopener noreferrer" className={`text-2xl ${isDark ? "text-white/85 hover:text-white" : "text-black/70 hover:text-black"}`}>
                                    <i className="fa-brands fa-github"></i>
                                </a>
                                <a href="https://discord.gg/cHVwPkBC7p" target="_blank" rel="noopener noreferrer" className={`text-2xl ${isDark ? "text-white/85 hover:text-[#5865F2]" : "text-black/70 hover:text-[#5865F2]"}`}>
                                    <i className="fa-brands fa-discord"></i>
                                </a>
                                <a href="https://x.com/colorwall_xyz" target="_blank" rel="noopener noreferrer" className={`text-2xl ${isDark ? "text-white/85 hover:text-white" : "text-black/70 hover:text-black"}`}>
                                    <i className="fa-brands fa-x-twitter"></i>
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};
