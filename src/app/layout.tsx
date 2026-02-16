import '@/styles/globals.scss';
import { PT_Serif } from 'next/font/google';

const PTSerifFont = PT_Serif({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={PTSerifFont.className}>
        {children}
      </body>
    </html>
  );
}
