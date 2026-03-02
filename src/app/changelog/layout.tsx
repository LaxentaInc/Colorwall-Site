import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Changelog',
    description: 'View the latest updates, features, and bug fixes for the ColorWall live wallpaper engine.',
};

export default function ChangelogLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>;
}
