import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Download',
    description: 'Download ColorWall — the performance-first desktop customization engine for Windows 10/11.',
};

export default function DownloadLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>;
}
