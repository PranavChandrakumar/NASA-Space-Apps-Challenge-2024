import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Helios',
  description: 'Landsat SR app.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <main id='content'>{children}</main>
      </body>
    </html>
  );
}
