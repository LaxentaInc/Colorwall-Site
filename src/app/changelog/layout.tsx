import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Changelog',
    description: 'View the latest updates, features, and improvements for ColorWall.',
};

export default function ChangelogLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>;
}
