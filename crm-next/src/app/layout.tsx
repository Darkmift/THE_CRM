'use client';
import MainBody from '@/components/layout/MainBody';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <MainBody>{children}</MainBody>
    </html>
  );
}
