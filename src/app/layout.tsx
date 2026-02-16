import '@/styles/globals.scss';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import styles from './layout.module.scss';

const interFont = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={interFont.className}>
        <nav className={styles.breadcrumb} aria-label="パンくずリスト">
          <ol>
            <li>
              <a href="https://yskm.dev/" className={styles.breadcrumbLink}>
                yskm-dev
              </a>
            </li>
            <li>
              <a
                href="https://yskm.dev/sketch/"
                className={styles.breadcrumbLink}
              >
                sketch
              </a>
            </li>
            <li aria-current="page">
              <span className={styles.breadcrumbCurrent}>PokeSearch</span>
            </li>
          </ol>
        </nav>
        <main>
          <div className={styles.page}>
            <header className={styles.header}>
              <Link href="/">
                <h1 className={styles.title}>PokeSearch</h1>
              </Link>
              <p className={styles.subtitle}>ポケモン図鑑を検索しよう</p>
            </header>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
