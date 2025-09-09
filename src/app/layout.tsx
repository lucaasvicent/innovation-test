import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Innova Brindes',
  description: 'Sistema de produtos Innova Brindes',
  openGraph: {
    title: 'Innova Brindes',
    description: 'Sistema de produtos Innova Brindes!',
    url: 'https://lp-web-blog.vercel.app/og-image.jpg',
    siteName: 'Innova Brindes',
    locale: 'pt-BR',
    type: 'website',
  },
  icons: {
    icon: '/logo.jpg',
    shortcut: '/logo.jpg',
    apple: '/logo.jpg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}