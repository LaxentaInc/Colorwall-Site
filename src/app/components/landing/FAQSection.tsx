"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { GradientHeading } from "./GradientHeading";

export const FAQSection = ({ theme }: { theme: "dark" | "light" }) => {
    const isDark = theme === "dark";
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        {
            question: "Is ColorWall completely free?",
            answer: "The website version of ColorWall remains completely free. However, future releases on platforms like the Microsoft Store, Epic Games Store, and Steam will be paid versions to help support the project's development."
        },
        {
            question: "Does it affect gaming performance?",
            answer: "ColorWall automatically pauses when you run full-screen applications or games, ensuring zero impact on your gaming performance."
        },
        {
            question: "Can I create my own wallpapers?",
            answer: "Absolutely! ColorWall supports custom video wallpapers and interactive web-based wallpapers. You can easily import your own files."
        },
        {
            question: "Which Windows versions are supported?",
            answer: "Currently, ColorWall supports Windows 10 and Windows 11 (64-bit versions). Support for other operating systems is planned for the future."
        }
    ];

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-24 px-4 sm:px-8 relative w-full flex justify-center overflow-hidden">
            <div className={`absolute inset-0 pointer-events-none ${isDark ? "opacity-10" : "opacity-[0.03]"}`}
                style={{
                    backgroundImage: `linear-gradient(${isDark ? 'white' : 'black'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? 'white' : 'black'} 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                    maskImage: 'radial-gradient(ellipse at center, black 10%, transparent 80%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at center, black 10%, transparent 80%)'
                }}
            />

            <div className="max-w-3xl w-full relative z-10 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h3 className="text-[#00A4FF] font-bold tracking-widest text-sm uppercase mb-3">FAQ</h3>
                    <GradientHeading
                        as="h2"
                        text="Frequently asked questions"
                        theme={theme}
                        className="text-4xl md:text-5xl font-black tracking-tight leading-[1.1]"
                    />
                </motion.div>

                <div className="w-full flex flex-col gap-4">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                key={index}
                                className={`rounded-xl border overflow-hidden transition-colors duration-300 ${isDark
                                    ? "bg-[#0f0f12] border-white/10 hover:border-white/20"
                                    : "bg-white border-black/10 hover:border-black/20"
                                    }`}
                            >
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full flex items-center justify-between p-5 text-left transition-colors"
                                >
                                    <span className={`font-bold text-lg ${isDark ? "text-white" : "text-black"}`}>
                                        {faq.question}
                                    </span>
                                    <ChevronDown
                                        className={`shrink-0 transition-transform duration-300 ${isDark ? "text-white/50" : "text-black/50"} ${isOpen ? "rotate-180" : ""}`}
                                        size={20}
                                    />
                                </button>
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <div className={`px-5 pb-5 text-base leading-relaxed ${isDark ? "text-white/70" : "text-black/70"}`}>
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
