import type { Metadata } from 'next';
import './globals.scss';
import './form.scss';

export const metadata: Metadata = {
  title: 'Arrow Office System Demo',
  description: 'AOS Demo',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
