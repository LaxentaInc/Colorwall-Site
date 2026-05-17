"use client";

import { useTheme } from "@/app/contexts/ThemeContext";
import { Footer } from "@/app/components/Footer";
import { Github, ExternalLink, Code2, Globe, Heart } from "lucide-react";

// ─── project data ─────────────────────────────────────────────────────────────

const PROJECTS = [
    {
        name: "ColorWall",
        tags: ["Rust", "Tauri"],
        description:
            "8K live wallpaper & desktop customization engine for Windows 10/11 — shaders, particles, store, library — all in 10mb. 0/72 on VirusTotal.",
        href: "https://colorwall.xyz",
        github: "https://github.com/Colorwall",
    },
    {
        name: "MTS Migrator",
        tags: ["TypeScript"],
        description:
            "full code migrator of a javascript project to typescript with type inference and patching with ast! contribute if one can.",
        href: "https://www.npmjs.com/package/mts-migrator",
        github: "https://github.com/LaxentaInc/Magikk-Typescript-Migrator",
    },
    {
        name: "periodicwm",
        tags: ["C++", "X11", "Xlib"],
        description:
            "custom X11 window manager + DE built from scratch. collab with a friend (boo he gave up, we suck at c++).",
        github: "https://github.com/periodicbrake63",
        collab: "@periodicbrake63",
    },
];

const TECH_STACK = [
    { name: "Rust", icon: "rust" },
    { name: "TypeScript", icon: "ts" },
    { name: "JavaScript", icon: "js" },
    { name: "React", icon: "react" },
    { name: "Next.js", icon: "nextjs" },
    { name: "Vite", icon: "vite" },
    { name: "Tauri", icon: "tauri" },
    { name: "Electron", icon: "electron" },
    { name: "MongoDB", icon: "mongodb" },
    { name: "Kotlin", icon: "kotlin" },
    { name: "Node.js", icon: "nodejs" },
    { name: "Git", icon: "git" },
    { name: "GitHub", icon: "github" },
    { name: "VS Code", icon: "vscode" },
];

const LINKS = {
    github: "https://github.com/LaxentaInc",
    discord: "https://discord.gg/cHVwPkBC7p",
    website: "https://colorwall.xyz",
    org: "https://github.com/Colorwall",
};

// ─── page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div className={`min-h-screen [font-family:'DM_Sans',sans-serif] ${isDark ? "bg-[#080809] text-zinc-100" : "bg-slate-50 text-zinc-900"}`}>
            <main className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 pt-28 pb-28">
                <div className="mb-20">
                    <div className="flex items-center gap-3 mb-7">
                        <span className="relative flex h-2 w-2">
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
                        </span>
                        <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-cyan-400">
                            About · The Team
                        </span>
                        <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-cyan-500/40 to-transparent" />
                    </div>

                    <h1 className={`text-[clamp(2.5rem,6vw,5rem)] font-black tracking-[-0.04em] leading-[0.9] mb-6 ${isDark ? "text-white" : "text-zinc-900"}`}>
                        Built by one
                        <br />
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
                            stubborn dev.
                        </span>
                    </h1>

                    <p className={`text-base max-w-xl leading-relaxed ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                        ColorWall is a project by <strong className={isDark ? "text-white" : "text-zinc-800"}>Uh... me! cz my dev friends have even worse adhd so they never helped much</strong> I am an 18-year-old hobbyist  
                        developer (since 15) who wanted to make something cooler than my ex's ArchiveTune (kotlin music player).
                        Every line of code is written with love, well kinda i guess? ngl more out of coping from life and so many breakups, ehh ignore it
                    </p>
                </div>


           <div className="mb-12 rounded-2xl overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="https://github.com/user-attachments/assets/fd8574e6-3f1c-4386-9a81-0332f43f8bce"
                        alt="LaxentaInc Banner"
                        className="w-full h-auto object-cover rounded-2xl"
                        loading="eager"
                    />
                </div>
                {/* ══════════ developer card ══════════ */}
                <div className={`rounded-2xl border overflow-hidden mb-20 ${isDark ? "border-white/8 bg-white/[0.02]" : "border-zinc-200 bg-white"}`}>
                    <div className="p-6 sm:p-8">
                        <div className="flex flex-col sm:flex-row gap-6 items-start">
                            {/* avatar */}
                            <div className={`w-20 h-20 rounded-2xl border flex-shrink-0 overflow-hidden ${isDark ? "border-white/10" : "border-zinc-200"}`}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="https://github.com/LaxentaInc.png"
                                    alt="Oliver Laxenta"
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 flex-wrap">
                                    <h2 className={`text-xl font-black tracking-tight ${isDark ? "text-white" : "text-zinc-900"}`}>
                                        Oliver Laxenta
                                    </h2>
                                    <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${isDark ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400" : "bg-cyan-50 border-cyan-200 text-cyan-600"}`}>
                                        Developer
                                    </span>
                                </div>

                                <p className={`text-[13px] mt-1 ${isDark ? "text-zinc-500" : "text-zinc-500"}`}>
                                    @LaxentaInc · Laxenta Inc
                                </p>

                                <p className={`text-sm mt-3 leading-relaxed ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                                    Nunca te amé, pero lo estaba intentando. Well i am not spainish but the quote is for a specific someone who is
                                </p>

                                <div className="flex items-center gap-3 mt-4 flex-wrap">
                                    <a
                                        href={LINKS.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-3 py-1.5 rounded-lg transition-colors ${isDark ? "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900"}`}
                                    >
                                        <Github className="w-3.5 h-3.5" />
                                        GitHub
                                    </a>
                                    <a
                                        href={LINKS.org}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-3 py-1.5 rounded-lg transition-colors ${isDark ? "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900"}`}
                                    >
                                        <Code2 className="w-3.5 h-3.5" />
                                        Colorwall Org
                                    </a>
                                    <a
                                        href={LINKS.discord}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-3 py-1.5 rounded-lg transition-colors ${isDark ? "bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20" : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"}`}
                                    >
                                        <Globe className="w-3.5 h-3.5" />
                                        Discord
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ══════════ what is colorwall ══════════ */}
                <div className="mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <div className={`h-px flex-1 bg-gradient-to-r to-transparent ${isDark ? "from-white/10" : "from-black/10"}`} />
                        <span className={`text-[10px] font-mono uppercase tracking-widest ${isDark ? "text-zinc-600" : "text-zinc-500"}`}>
                            What is ColorWall
                        </span>
                        <div className={`h-px flex-1 bg-gradient-to-l to-transparent ${isDark ? "from-white/10" : "from-black/10"}`} />
                    </div>

                    <div className={`rounded-2xl border p-6 sm:p-8 ${isDark ? "border-white/8 bg-white/[0.02]" : "border-zinc-200 bg-white"}`}>
                        <p className={`text-sm leading-[1.8] ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                            <strong className={isDark ? "text-white" : "text-zinc-800"}>ColorWall</strong> is a free, open-source desktop customization engine
                            for Windows 10 and 11. built with <strong className={isDark ? "text-white" : "text-zinc-800"}>Rust + Tauri</strong>, it
                            delivers 8K video wallpapers, real-time D3D11 shader effects, particle systems, audio-reactive visuals, desktop widgets,
                            and taskbar customization — all in a ~10MB package with near-zero CPU overhead.
                        </p>
                        <p className={`text-sm leading-[1.8] mt-4 ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                            it comes with a built-in store aggregating wallpapers from 8+ sources, a local library with offline-first design,
                            and a node-based studio editor for creating custom scene compositions. no accounts, no subscriptions, no telemetry.
                            0/72 on VirusTotal. just a wallpaper engine that respects you.
                        </p>
                    </div>
                </div>

                {/* ══════════ projects ══════════ */}
                <div className="mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <div className={`h-px flex-1 bg-gradient-to-r to-transparent ${isDark ? "from-white/10" : "from-black/10"}`} />
                        <span className={`text-[10px] font-mono uppercase tracking-widest ${isDark ? "text-zinc-600" : "text-zinc-500"}`}>
                            Projects
                        </span>
                        <div className={`h-px flex-1 bg-gradient-to-l to-transparent ${isDark ? "from-white/10" : "from-black/10"}`} />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {PROJECTS.map((project) => (
                            <a
                                key={project.name}
                                href={project.github || project.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`block rounded-xl border p-5 transition-all duration-200 group cursor-pointer hover:-translate-y-0.5 ${isDark ? "border-white/8 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/12" : "border-zinc-200 bg-white hover:bg-zinc-50 hover:shadow-md"}`}
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    <h3 className={`text-sm font-bold tracking-tight ${isDark ? "text-white" : "text-zinc-900"}`}>
                                        {project.name}
                                    </h3>
                                    {project.collab && (
                                        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${isDark ? "bg-white/5 text-zinc-500" : "bg-zinc-100 text-zinc-500"}`}>
                                            {project.collab}
                                        </span>
                                    )}
                                    <ExternalLink className={`w-3 h-3 ml-auto opacity-0 group-hover:opacity-50 transition-opacity ${isDark ? "text-white" : "text-zinc-400"}`} />
                                </div>

                                <div className="flex flex-wrap gap-1.5 mb-3">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${isDark ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" : "bg-cyan-50 text-cyan-600 border border-cyan-200"}`}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <p className={`text-[12px] leading-relaxed mb-3 ${isDark ? "text-zinc-500" : "text-zinc-500"}`}>
                                    {project.description}
                                </p>

                                {/* secondary links — stop propagation so they work independently */}
                                <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`inline-flex items-center gap-1 text-[10px] font-mono transition-colors relative z-10 ${isDark ? "text-zinc-500 hover:text-white" : "text-zinc-400 hover:text-zinc-800"}`}
                                        >
                                            <Github className="w-3 h-3" />
                                            Source
                                        </a>
                                    )}
                                    {project.href && (
                                        <a
                                            href={project.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`inline-flex items-center gap-1 text-[10px] font-mono transition-colors relative z-10 ${isDark ? "text-cyan-500/60 hover:text-cyan-400" : "text-cyan-600/60 hover:text-cyan-600"}`}
                                        >
                                            <ExternalLink className="w-3 h-3" />
                                            Visit
                                        </a>
                                    )}
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

                {/* ══════════ stack & stats — combined layout ══════════ */}
                <div className="mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <div className={`h-px flex-1 bg-gradient-to-r to-transparent ${isDark ? "from-white/10" : "from-black/10"}`} />
                        <span className={`text-[10px] font-mono uppercase tracking-widest ${isDark ? "text-zinc-600" : "text-zinc-500"}`}>
                            Stack & Stats
                        </span>
                        <div className={`h-px flex-1 bg-gradient-to-l to-transparent ${isDark ? "from-white/10" : "from-black/10"}`} />
                    </div>

                    <div className="grid gap-4 lg:grid-cols-2">
                        {/* tech stack card */}
                        <div className={`rounded-2xl border p-6 ${isDark ? "border-white/8 bg-white/[0.02]" : "border-zinc-200 bg-white"}`}>
                            <h3 className={`text-[11px] font-mono font-bold uppercase tracking-[0.15em] mb-5 ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>
                                Technologies
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {TECH_STACK.map((tech) => (
                                    <div
                                        key={tech.name}
                                        className={`inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-[11px] font-medium transition-colors ${isDark ? "border-white/8 bg-white/[0.02] text-zinc-400 hover:bg-white/[0.05] hover:text-white" : "border-zinc-200 bg-zinc-50 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800"}`}
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={`https://skillicons.dev/icons?i=${tech.icon}`} alt={tech.name} className="w-4 h-4" loading="lazy" />
                                        {tech.name}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* stats card */}
                        <div className={`rounded-2xl border p-6 ${isDark ? "border-white/8 bg-white/[0.02]" : "border-zinc-200 bg-white"}`}>
                            <h3 className={`text-[11px] font-mono font-bold uppercase tracking-[0.15em] mb-5 ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>
                                GitHub
                            </h3>
                            <div className="flex flex-col gap-3">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="https://awesome-github-stats.azurewebsites.net/user-stats/LaxentaInc?theme=dark&cardType=level" alt="GitHub Stats" className="w-full max-h-[160px] object-contain rounded-lg" loading="lazy" />
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="https://github-readme-streak-stats-steel-pi.vercel.app/?user=LaxentaInc&private=true&theme=dark&hide_border=false&date_format=j%20M%5B%20Y%5D&mode=weekly" alt="GitHub Streak Weekly" className="w-full max-h-[160px] object-contain rounded-lg" loading="lazy" />
                            </div>
                        </div>
                    </div>

                    {/* full-width streak below */}
                    <div className="mt-4 flex justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="https://streak-stats.demolab.com?user=LaxentaInc&hide_border=true&background=0d1117&stroke=1e2530&ring=00b4d8&fire=00b4d8&currStreakLabel=00b4d8&sideNums=e0eaff&sideLabels=8ca0c0&dates=8ca0c0&currStreakNum=e0eaff" alt="GitHub Streak" className="rounded-xl max-w-full" loading="lazy" />
                    </div>
                </div>

                {/* ══════════ bottom ══════════ */}
                <div className="text-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://raw.githubusercontent.com/innng/innng/master/assets/kyubey.gif" width={32} alt="kyubey" className="mx-auto mb-3" />
                    <p className={`text-sm italic font-medium mb-2 ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
                        WELL mai real repos are private :c i promise i do stuff
                    </p>
                    <a href="https://colorwall.xyz" target="_blank" rel="noopener noreferrer"
                        className={`text-xs font-mono transition-colors ${isDark ? "text-cyan-500/60 hover:text-cyan-400" : "text-cyan-600/60 hover:text-cyan-600"}`}>
                        https://colorwall.xyz — check it out if you want &lt;.3
                    </a>
                    <p className={`text-xs font-mono flex items-center justify-center gap-1.5 mt-4 ${isDark ? "text-zinc-600" : "text-zinc-400"}`}>
                        made with <Heart className="w-3 h-3 text-rose-500" /> by laxenta inc
                    </p>
                </div>

            </main>

            <Footer theme={theme as "dark" | "light"} />
        </div>
    );
}
