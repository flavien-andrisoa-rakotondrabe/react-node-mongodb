import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

import ReduxProvider from '@/redux/ReduxProvider';
import UtilsProvider from '@/providers/Utils.provider';
import ToastProvider from '@/providers/Toast.provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Campaign App',
  description: 'Campaign Full Stack App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <UtilsProvider>
            <ToastProvider>{children}</ToastProvider>
          </UtilsProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
