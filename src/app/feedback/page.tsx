import { getDb } from '@/lib/mongodb';
import { MessageSquare, Monitor, Globe, Zap, Users } from 'lucide-react';
import { FeedbackForm } from '../components/FeedbackForm';

export const dynamic   = 'force-dynamic';
export const revalidate = 60;

// ─── Types ────────────────────────────────────────────────────────────────────

interface FeedbackItem {
    id:        string;
    username:  string;
    text:      string;
    images:    string[];
    source:    'App' | 'Web';
    createdAt: Date;
}

interface FeedbackGroup {
    username: string;
    source:   'App' | 'Web';
    items:    FeedbackItem[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

async function getFeedback(): Promise<FeedbackItem[]> {
    try {
        const db   = await getDb();
        const docs = await db.collection('feedback')
            .find()
            .sort({ createdAt: -1 })
            .limit(100)
            .toArray();

        return docs.map(doc => ({
            id:        doc._id.toString(),
            username:  doc.username ?? 'Anonymous',
            text:      doc.text     ?? '',
            images:    doc.images   ?? [],
            source:    (doc.source === 'App' ? 'App' : 'Web') as 'App' | 'Web',
            createdAt: doc.createdAt,
        }));
    } catch (e) {
        console.error(e);
        return [];
    }
}

/**
 * Collapse consecutive submissions from the same username into groups.
 * One group = one card on screen.
 */
function groupFeedback(items: FeedbackItem[]): FeedbackGroup[] {
    const groups: FeedbackGroup[] = [];
    for (const item of items) {
        const last = groups[groups.length - 1];
        if (last && last.username === item.username && last.source === item.source) {
            last.items.push(item);
        } else {
            groups.push({ username: item.username, source: item.source, items: [item] });
        }
    }
    return groups;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getUserColor(name: string) {
    const palette = [
        { bg: 'from-violet-500/20 to-indigo-500/20',  border: 'border-violet-500/30',  text: 'text-violet-300',  dot: 'bg-violet-400',  accent: '#8b5cf6' },
        { bg: 'from-cyan-500/20 to-sky-500/20',       border: 'border-cyan-500/30',    text: 'text-cyan-300',    dot: 'bg-cyan-400',    accent: '#06b6d4' },
        { bg: 'from-emerald-500/20 to-teal-500/20',   border: 'border-emerald-500/30', text: 'text-emerald-300', dot: 'bg-emerald-400', accent: '#10b981' },
        { bg: 'from-amber-500/20 to-orange-500/20',   border: 'border-amber-500/30',   text: 'text-amber-300',   dot: 'bg-amber-400',   accent: '#f59e0b' },
        { bg: 'from-rose-500/20 to-pink-500/20',      border: 'border-rose-500/30',    text: 'text-rose-300',    dot: 'bg-rose-400',    accent: '#f43f5e' },
        { bg: 'from-fuchsia-500/20 to-purple-500/20', border: 'border-fuchsia-500/30', text: 'text-fuchsia-300', dot: 'bg-fuchsia-400', accent: '#d946ef' },
    ];
    const hash = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    return palette[hash % palette.length];
}

function timeAgo(date: Date): string {
    const diff = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    if (diff < 60)     return `${diff}s ago`;
    if (diff < 3600)   return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400)  return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
    return new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

// ─── Sub-components ────────────────────────────────────────────────────────────

/** Web submission — warm card, chat-bubble feel */
function WebCard({ group, index }: { group: FeedbackGroup; index: number }) {
    const color    = getUserColor(group.username);
    const initials = group.username.slice(0, 2).toUpperCase();
    const first    = group.items[0];

    return (
        <div
            className="break-inside-avoid mb-5 group relative rounded-2xl border border-white/8 bg-[#0d0d0f]/90 backdrop-blur-xl overflow-hidden hover:border-white/14 transition-all duration-300"
        >
            {/* Hover glow */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br ${color.bg} rounded-2xl`} />
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${color.accent}60, transparent)` }} />

            <div className="relative z-10 p-6">
                {/* User row */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${color.bg} border ${color.border} flex items-center justify-center flex-shrink-0`}>
                            <span className={`text-[10px] font-black ${color.text}`}>{initials}</span>
                        </div>
                        <div>
                            <span className="text-[13px] font-bold text-white tracking-wide">{group.username}</span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <Globe className="w-2.5 h-2.5 text-emerald-500/70" />
                                <span className="text-[10px] font-mono text-emerald-500/60">Web</span>
                                <span className="text-zinc-700 text-[10px]">·</span>
                                <span className="text-[10px] font-mono text-zinc-600">{timeAgo(first.createdAt)}</span>
                            </div>
                        </div>
                    </div>
                    <span className="text-[9px] font-mono text-zinc-700 tabular-nums mt-1">#{String(index + 1).padStart(4, '0')}</span>
                </div>

                {/* Messages (grouped) */}
                <div className="space-y-3">
                    {group.items.map((item, i) => (
                        <div key={item.id}>
                            {i > 0 && (
                                <span className="block text-[10px] font-mono text-zinc-700 mb-1 ml-0.5">{timeAgo(item.createdAt)}</span>
                            )}
                            {item.text && (
                                <p className="text-[13.5px] leading-[1.75] text-zinc-300 whitespace-pre-wrap font-[450]">
                                    {item.text}
                                </p>
                            )}
                            {item.images.length > 0 && (
                                <div className={`mt-3 grid gap-2 ${item.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                                    {item.images.map((src, idx) => (
                                        <a key={idx} href={src} target="_blank" rel="noreferrer"
                                            className="relative block overflow-hidden rounded-xl border border-white/8 hover:border-white/20 transition-all group/img"
                                            style={{ aspectRatio: item.images.length === 1 ? '16/9' : '1/1' }}
                                        >
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={src} alt="" className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500" loading="lazy" />
                                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                                <span className="text-[10px] font-mono text-white/80 bg-black/50 px-2 py-1 rounded-md">View</span>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="mt-4 pt-3 border-t border-white/[0.05] flex items-center justify-between">
                    {group.items.length > 1 && (
                        <span className="text-[10px] font-mono text-zinc-700">{group.items.length} messages</span>
                    )}
                    <div className={`ml-auto w-1.5 h-1.5 rounded-full ${color.dot} opacity-40 group-hover:opacity-100 transition-opacity`} />
                </div>
            </div>
        </div>
    );
}

/** App submission — monochrome, terminal / system-log feel */
function AppCard({ group, index }: { group: FeedbackGroup; index: number }) {
    const first = group.items[0];

    return (
        <div className="break-inside-avoid mb-5 group relative rounded-2xl border border-blue-500/10 bg-[#08090d]/95 backdrop-blur-xl overflow-hidden hover:border-blue-500/20 transition-all duration-300">
            {/* Subtle blue top line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />

            <div className="relative z-10 p-6">
                {/* Header row */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                        {/* Terminal-style icon */}
                        <div className="w-9 h-9 rounded-xl bg-blue-500/8 border border-blue-500/15 flex items-center justify-center flex-shrink-0">
                            <Monitor className="w-4 h-4 text-blue-400/80" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-[13px] font-bold text-white/90 tracking-wide font-mono">{group.username}</span>
                                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400">DESKTOP</span>
                            </div>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="text-[10px] font-mono text-zinc-600">{timeAgo(first.createdAt)}</span>
                                <span className="text-zinc-700 text-[10px]">·</span>
                                <span className="text-[10px] font-mono text-blue-500/50">ColorWall Engine</span>
                            </div>
                        </div>
                    </div>
                    <span className="text-[9px] font-mono text-zinc-700 tabular-nums mt-1">#{String(index + 1).padStart(4, '0')}</span>
                </div>

                {/* Log-line style messages */}
                <div className="space-y-3 font-mono">
                    {group.items.map((item, i) => (
                        <div key={item.id} className={i > 0 ? 'pt-3 border-t border-white/[0.04]' : ''}>
                            {item.text && (
                                <p className="text-[13px] leading-[1.7] text-zinc-400 whitespace-pre-wrap">
                                    {/* Prefix first message with a › prompt symbol */}
                                    {i === 0 && <span className="text-blue-500/40 select-none mr-2">›</span>}
                                    {item.text}
                                </p>
                            )}
                            {item.images.length > 0 && (
                                <div className={`mt-3 grid gap-2 ${item.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                                    {item.images.map((src, idx) => (
                                        <a key={idx} href={src} target="_blank" rel="noreferrer"
                                            className="relative block overflow-hidden rounded-xl border border-blue-500/10 hover:border-blue-500/25 transition-all group/img"
                                            style={{ aspectRatio: item.images.length === 1 ? '16/9' : '1/1' }}
                                        >
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={src} alt="" className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500 opacity-85 group-hover/img:opacity-100" loading="lazy" />
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between">
                    {group.items.length > 1 && (
                        <span className="text-[10px] font-mono text-zinc-700">{group.items.length} entries</span>
                    )}
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 opacity-30 group-hover:opacity-80 transition-opacity" />
                </div>
            </div>
        </div>
    );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default async function FeedbackPage() {
    const feedbacks = await getFeedback();
    const groups    = groupFeedback(feedbacks);
    const appCount  = feedbacks.filter(f => f.source === 'App').length;
    const webCount  = feedbacks.filter(f => f.source !== 'App').length;

    return (
        <main
            className="min-h-screen bg-[#080809] text-zinc-100 relative overflow-hidden"
            style={{ fontFamily: "'DM Sans', 'Geist', sans-serif" }}
        >
            {/* Noise overlay */}
            <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.025]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat', backgroundSize: '200px 200px',
                }} />

            {/* Ambient orbs */}
            <div className="pointer-events-none fixed top-[-15%] left-[-5%] w-[55%] h-[55%] rounded-full opacity-40"
                style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)' }} />
            <div className="pointer-events-none fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full opacity-30"
                style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)' }} />
            <div className="pointer-events-none fixed top-[40%] right-[20%] w-[30%] h-[30%] rounded-full opacity-20"
                style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)' }} />

            {/* Top scan line */}
            <div className="fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent z-50" />

            <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-16 pt-28 pb-28">

                {/* ══════════ HEADER ══════════ */}
                <div className="mb-20">
                    <div className="flex items-center gap-3 mb-7">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
                        </span>
                        <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-indigo-400/80">
                            Community · Live Feed
                        </span>
                        <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-indigo-500/40 to-transparent" />
                    </div>

                    <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-10">
                        <div>
                            <h1 className="text-[clamp(3rem,8vw,7rem)] font-black tracking-[-0.04em] leading-[0.9] text-white mb-0">
                                What Users
                            </h1>
                            <h1
                                className="text-[clamp(3rem,8vw,7rem)] font-black tracking-[-0.04em] leading-[0.9] mb-6"
                                style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)', color: 'transparent' }}
                            >
                                Are Saying.
                            </h1>
                            <p className="text-[15px] text-zinc-500 max-w-lg leading-relaxed">
                                Unfiltered reports, feature requests, and bug logs from real users of{' '}
                                <span className="text-zinc-300 font-medium">ColorWall Engine</span>.
                                Every voice shapes the next release.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="flex items-stretch gap-4 flex-wrap xl:flex-nowrap">
                            <div className="flex flex-col justify-between p-5 rounded-2xl border border-white/8 bg-white/[0.025] backdrop-blur-xl min-w-[130px] hover:border-indigo-500/30 hover:bg-white/[0.04] transition-all duration-300">
                                <div className="flex items-center gap-2 mb-3">
                                    <Users className="w-3.5 h-3.5 text-zinc-500" />
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Total</span>
                                </div>
                                <div className="text-4xl font-black text-white tracking-tight tabular-nums">{feedbacks.length}</div>
                                <div className="text-[10px] text-zinc-600 mt-1 font-mono">submissions</div>
                            </div>

                            <div className="flex flex-col justify-between p-5 rounded-2xl border border-white/8 bg-white/[0.025] backdrop-blur-xl min-w-[130px] hover:border-blue-500/30 hover:bg-white/[0.04] transition-all duration-300">
                                <div className="flex items-center gap-2 mb-3">
                                    <Monitor className="w-3.5 h-3.5 text-blue-500" />
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Desktop</span>
                                </div>
                                <div className="text-4xl font-black text-white tracking-tight tabular-nums">{appCount}</div>
                                <div className="text-[10px] text-zinc-600 mt-1 font-mono">via app</div>
                            </div>

                            <div className="flex flex-col justify-between p-5 rounded-2xl border border-white/8 bg-white/[0.025] backdrop-blur-xl min-w-[130px] hover:border-emerald-500/30 hover:bg-white/[0.04] transition-all duration-300">
                                <div className="flex items-center gap-2 mb-3">
                                    <Globe className="w-3.5 h-3.5 text-emerald-500" />
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Web</span>
                                </div>
                                <div className="text-4xl font-black text-white tracking-tight tabular-nums">{webCount}</div>
                                <div className="text-[10px] text-zinc-600 mt-1 font-mono">via browser</div>
                            </div>

                            <div className="flex flex-col justify-between p-5 rounded-2xl border border-indigo-500/25 bg-indigo-500/[0.07] backdrop-blur-xl min-w-[170px] relative overflow-hidden group cursor-default hover:border-indigo-500/35 transition-all duration-300">
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Zap className="w-3.5 h-3.5 text-indigo-400" />
                                        <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400/70">Submit</span>
                                    </div>
                                    <p className="text-sm font-semibold text-white leading-snug">Share your feedback</p>
                                    <p className="text-[11px] text-indigo-400/60 mt-1">below ↓</p>
                                </div>
                                <div className="relative z-10 mt-4 flex items-center gap-1.5 text-[10px] font-mono text-indigo-400/50">
                                    <Globe className="w-3 h-3" />
                                    <span>or via Desktop App</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ══════════ TWO-COLUMN LAYOUT ══════════ */}
                <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-10 items-start">

                    {/* ── Feed (left / main) ── */}
                    <div>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Latest Reports</span>
                            <div className="h-px flex-1 bg-gradient-to-l from-white/10 to-transparent" />
                        </div>

                        {groups.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-40 border border-dashed border-white/8 rounded-3xl">
                                <div className="w-14 h-14 rounded-2xl border border-white/10 bg-white/[0.03] flex items-center justify-center mb-5">
                                    <MessageSquare className="w-6 h-6 text-zinc-600" />
                                </div>
                                <p className="text-lg font-semibold text-zinc-400">Nothing yet.</p>
                                <p className="text-sm text-zinc-600 mt-1">Be the first to leave feedback.</p>
                            </div>
                        ) : (
                            <div className="columns-1 md:columns-2 gap-5">
                                {groups.map((group, i) =>
                                    group.source === 'App'
                                        ? <AppCard key={`${group.username}-${i}`} group={group} index={i} />
                                        : <WebCard key={`${group.username}-${i}`} group={group} index={i} />
                                )}
                            </div>
                        )}

                        {groups.length > 0 && (
                            <div className="mt-12 flex items-center justify-center gap-3 text-[11px] font-mono text-zinc-700">
                                <div className="h-px w-16 bg-white/5" />
                                <span>Showing {feedbacks.length} most recent submissions</span>
                                <div className="h-px w-16 bg-white/5" />
                            </div>
                        )}
                    </div>

                    {/* ── Submission form (right / sticky sidebar) ── */}
                    <div className="xl:sticky xl:top-8">
                        <div className="flex items-center gap-4 mb-5">
                            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Your Voice</span>
                            <div className="h-px flex-1 bg-gradient-to-l from-white/10 to-transparent" />
                        </div>
                        <FeedbackForm defaultSource="Web" />
                        <p className="text-[10px] font-mono text-zinc-700 text-center mt-3">
                            Also available inside the Desktop App
                        </p>
                    </div>
                </div>

            </div>
        </main>
    );
}