'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import {
    Send, X, ImagePlus, FileText, Loader2,
    CheckCircle2, ChevronRight, AlertCircle, Pencil,
    Monitor, Globe
} from 'lucide-react';

// ─── helpers ────────────────────────────────────────────────────────────────

function getUserColor(name: string) {
    const palette = [
        { bg: 'from-violet-500/20 to-indigo-500/20', border: 'border-violet-500/30', text: 'text-violet-300', dot: 'bg-violet-400', accent: '#8b5cf6' },
        { bg: 'from-cyan-500/20 to-sky-500/20',      border: 'border-cyan-500/30',   text: 'text-cyan-300',   dot: 'bg-cyan-400',   accent: '#06b6d4' },
        { bg: 'from-emerald-500/20 to-teal-500/20',  border: 'border-emerald-500/30',text: 'text-emerald-300',dot: 'bg-emerald-400', accent: '#10b981' },
        { bg: 'from-amber-500/20 to-orange-500/20',  border: 'border-amber-500/30',  text: 'text-amber-300',  dot: 'bg-amber-400',  accent: '#f59e0b' },
        { bg: 'from-rose-500/20 to-pink-500/20',     border: 'border-rose-500/30',   text: 'text-rose-300',   dot: 'bg-rose-400',   accent: '#f43f5e' },
        { bg: 'from-fuchsia-500/20 to-purple-500/20',border: 'border-fuchsia-500/30',text: 'text-fuchsia-300',dot: 'bg-fuchsia-400', accent: '#d946ef' },
    ];
    const hash = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    return palette[hash % palette.length];
}

// ─── Username Gate ────────────────────────────────────────────────────────────

function UsernameGate({ onConfirm }: { onConfirm: (name: string) => void }) {
    const [value, setValue] = useState('');
    const [shake, setShake]  = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => { inputRef.current?.focus(); }, []);

    const confirm = () => {
        const name = value.trim();
        if (!name || name.length < 2) { setShake(true); setTimeout(() => setShake(false), 500); return; }
        onConfirm(name);
    };

    return (
        <div className="flex flex-col items-center justify-center py-6 px-2">
            <div className="w-full max-w-sm">
                {/* icon */}
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 mx-auto">
                    <Pencil className="w-5 h-5 text-indigo-400" />
                </div>

                <h2 className="text-xl font-black text-white tracking-tight text-center mb-1">
                    What should we call you?
                </h2>
                <p className="text-[12px] text-zinc-500 text-center mb-6 font-mono">
                    This will be saved and linked to your feedback.
                </p>

                <div className={`relative transition-all duration-150 ${shake ? 'translate-x-1' : ''}`}>
                    <input
                        ref={inputRef}
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && confirm()}
                        maxLength={64}
                        placeholder="e.g. xKirito99"
                        className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] transition-all font-mono tracking-wide"
                    />
                    {value.trim().length >= 2 && (
                        <div className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center`}
                            style={{ background: getUserColor(value.trim()).accent + '30', border: `1px solid ${getUserColor(value.trim()).accent}40` }}>
                            <span className="text-[9px] font-black" style={{ color: getUserColor(value.trim()).accent }}>
                                {value.trim().charAt(0).toUpperCase()}
                            </span>
                        </div>
                    )}
                </div>

                {value.trim().length > 0 && value.trim().length < 2 && (
                    <p className="text-[11px] text-rose-400/80 font-mono mt-2 ml-1">At least 2 characters.</p>
                )}

                <button
                    onClick={confirm}
                    disabled={value.trim().length < 2}
                    className="mt-4 w-full py-3 rounded-xl bg-indigo-500/90 hover:bg-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(99,102,241,0.3)]"
                >
                    Continue <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}

// ─── Image Preview ────────────────────────────────────────────────────────────

function ImagePreview({ src, onRemove }: { src: string; onRemove: () => void }) {
    return (
        <div className="relative group flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" className="w-full h-full object-cover" />
            <button
                onClick={onRemove}
                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
            >
                <X className="w-4 h-4 text-white" />
            </button>
        </div>
    );
}

// ─── Main Form ────────────────────────────────────────────────────────────────

interface FeedbackFormProps {
    /** Populated only when submitted from the Tauri desktop app */
    defaultUsername?: string;
    defaultSource?: 'App' | 'Web';
}

type Stage = 'username' | 'form' | 'submitting' | 'success' | 'error';

export function FeedbackForm({ defaultUsername, defaultSource = 'Web' }: FeedbackFormProps) {
    const [stage,    setStage]    = useState<Stage>('username');
    const [username, setUsername] = useState('');
    const [text,     setText]     = useState('');
    const [images,   setImages]   = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [logFile,  setLogFile]  = useState<File | null>(null);
    const [errMsg,   setErrMsg]   = useState('');
    const [charLeft, setCharLeft] = useState(2000);

    const imageInputRef = useRef<HTMLInputElement>(null);
    const logInputRef   = useRef<HTMLInputElement>(null);
    const textareaRef   = useRef<HTMLTextAreaElement>(null);

    // ── On mount: restore username from localStorage or network ──
    useEffect(() => {
        if (defaultUsername) {
            setUsername(defaultUsername);
            setStage('form');
            return;
        }
        
        const fetchIdentity = async () => {
            const saved = localStorage.getItem('cw_username');
            if (saved) { 
                setUsername(saved); 
                setStage('form'); 
                return; 
            }

            try {
                // If they cleared local storage, ask the server what their name is
                const res = await fetch('/api/identify');
                const data = await res.json();
                
                if (data.username && data.username !== 'Anonymous User' && data.username !== 'Anonymous') {
                    // Mwahaha, you are stuck with this name
                    setUsername(data.username);
                    localStorage.setItem('cw_username', data.username);
                    setStage('form');
                }
            } catch (err) {
                // Let them set a new one if network fails
            }
        };

        fetchIdentity();
    }, [defaultUsername]);

    const confirmUsername = useCallback((name: string) => {
        setUsername(name);
        localStorage.setItem('cw_username', name);
        setStage('form');
        // Fire-and-forget: register username↔IP association on the server
        fetch('/api/identify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: name }),
        }).catch(() => {/* non-critical */});
    }, []);

    const addImages = useCallback((files: FileList | null) => {
        if (!files) return;
        const allowed = 5 - images.length;
        const next = Array.from(files).slice(0, allowed);
        setImages(prev => [...prev, ...next]);
        next.forEach(f => {
            const reader = new FileReader();
            reader.onload = e => setPreviews(prev => [...prev, e.target!.result as string]);
            reader.readAsDataURL(f);
        });
    }, [images.length]);

    const removeImage = useCallback((idx: number) => {
        setImages(prev => prev.filter((_, i) => i !== idx));
        setPreviews(prev => prev.filter((_, i) => i !== idx));
    }, []);

    const handleTextChange = (v: string) => {
        setText(v);
        setCharLeft(2000 - v.length);
    };

    const handleSubmit = async () => {
        if (!text.trim() && images.length === 0) {
            setErrMsg('Write something or attach an image.');
            return;
        }
        setStage('submitting');
        setErrMsg('');

        const fd = new FormData();
        fd.append('username', username);
        fd.append('text',     text.trim());
        fd.append('source',   defaultSource);
        images.forEach(img => fd.append('images', img));
        if (logFile) fd.append('logFile', logFile);

        try {
            const res  = await fetch('/api/feedback', { method: 'POST', body: fd });
            const data = await res.json();
            if (!res.ok) { setErrMsg(data.error ?? 'Something went wrong.'); setStage('form'); return; }
            setStage('success');
            setText(''); setImages([]); setPreviews([]); setLogFile(null); setCharLeft(2000);
        } catch {
            setErrMsg('Network error. Please try again.');
            setStage('form');
        }
    };

    const color = username ? getUserColor(username) : null;

    // ── Render ────────────────────────────────────────────────────────────────
    return (
        <div className="w-full rounded-2xl border border-white/8 bg-[#0d0d0f]/90 backdrop-blur-xl overflow-hidden">

            {/* ── Username Gate ── */}
            {stage === 'username' && (
                <div className="p-6">
                    <UsernameGate onConfirm={confirmUsername} />
                </div>
            )}

            {/* ── Submission Form ── */}
            {(stage === 'form' || stage === 'submitting' || stage === 'error') && color && (
                <>
                    {/* Header */}
                    <div className="flex items-center justify-between px-5 py-4 border-b border-white/6">
                        <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${color.bg} border ${color.border} flex items-center justify-center`}>
                                <span className={`text-[11px] font-black ${color.text}`}>
                                    {username.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div>
                                <span className="text-[13px] font-bold text-white">{username}</span>
                                <div className="flex items-center gap-1 mt-0.5">
                                    {defaultSource === 'App'
                                        ? <Monitor className="w-2.5 h-2.5 text-blue-400" />
                                        : <Globe    className="w-2.5 h-2.5 text-emerald-400" />}
                                    <span className={`text-[10px] font-mono ${defaultSource === 'App' ? 'text-blue-400/70' : 'text-emerald-400/70'}`}>
                                        {defaultSource === 'App' ? 'Desktop App' : 'Web'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Text area */}
                    <div className="px-5 pt-4 pb-2">
                        <textarea
                            ref={textareaRef}
                            value={text}
                            onChange={e => handleTextChange(e.target.value)}
                            maxLength={2000}
                            rows={4}
                            placeholder="Report a bug, request a feature, or just say something…"
                            className="w-full bg-transparent text-[13.5px] text-zinc-300 placeholder-zinc-600 resize-none outline-none leading-relaxed font-[450]"
                            style={{ fontFamily: 'inherit' }}
                        />
                    </div>

                    {/* Image previews */}
                    {previews.length > 0 && (
                        <div className="px-5 pb-3 flex gap-2 flex-wrap">
                            {previews.map((src, i) => (
                                <ImagePreview key={i} src={src} onRemove={() => removeImage(i)} />
                            ))}
                        </div>
                    )}

                    {/* Log file indicator */}
                    {logFile && (
                        <div className="mx-5 mb-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/8">
                            <FileText className="w-3.5 h-3.5 text-zinc-500" />
                            <span className="text-[11px] font-mono text-zinc-400 flex-1 truncate">{logFile.name}</span>
                            <button onClick={() => setLogFile(null)}>
                                <X className="w-3.5 h-3.5 text-zinc-600 hover:text-zinc-400 transition-colors" />
                            </button>
                        </div>
                    )}

                    {/* Error */}
                    {errMsg && (
                        <div className="mx-5 mb-3 flex items-center gap-2 px-3 py-2.5 rounded-lg bg-rose-500/8 border border-rose-500/20">
                            <AlertCircle className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                            <p className="text-[11px] font-mono text-rose-400">{errMsg}</p>
                        </div>
                    )}

                    {/* Footer toolbar */}
                    <div className="flex items-center justify-between px-5 py-3 border-t border-white/6">
                        <div className="flex items-center gap-1">
                            {/* Image attach */}
                            <button
                                onClick={() => imageInputRef.current?.click()}
                                disabled={images.length >= 5}
                                title="Attach images (max 5)"
                                className="p-2 rounded-lg text-zinc-600 hover:text-zinc-300 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            >
                                <ImagePlus className="w-4 h-4" />
                            </button>
                            <input ref={imageInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" multiple hidden onChange={e => addImages(e.target.files)} />

                            {/* Log attach */}
                            <button
                                onClick={() => logInputRef.current?.click()}
                                title="Attach log file (max 1 MB)"
                                className="p-2 rounded-lg text-zinc-600 hover:text-zinc-300 hover:bg-white/5 transition-all"
                            >
                                <FileText className="w-4 h-4" />
                            </button>
                            <input ref={logInputRef} type="file" accept=".log,.txt" hidden onChange={e => setLogFile(e.target.files?.[0] ?? null)} />

                            {images.length > 0 && (
                                <span className="text-[10px] font-mono text-zinc-600 ml-1">{images.length}/5</span>
                            )}
                        </div>

                        <div className="flex items-center gap-3">
                            <span className={`text-[10px] font-mono tabular-nums transition-colors ${charLeft < 100 ? 'text-amber-500' : charLeft < 20 ? 'text-rose-500' : 'text-zinc-700'}`}>
                                {charLeft}
                            </span>
                            <button
                                onClick={handleSubmit}
                                disabled={stage === 'submitting' || (!text.trim() && images.length === 0)}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500/90 hover:bg-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold text-[12px] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(99,102,241,0.35)]"
                            >
                                {stage === 'submitting'
                                    ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Sending…</>
                                    : <><Send className="w-3.5 h-3.5" /> Send</>}
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* ── Success ── */}
            {stage === 'success' && (
                <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    </div>
                    <h3 className="text-base font-black text-white mb-1 tracking-tight">Received.</h3>
                    <p className="text-[12px] text-zinc-500 font-mono mb-6">Your feedback is now live in the feed.</p>
                    <button
                        onClick={() => setStage('form')}
                        className="text-[11px] font-mono text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-2"
                    >
                        Submit another
                    </button>
                </div>
            )}
        </div>
    );
}