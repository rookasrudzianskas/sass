import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from "@/components/Header";
import { ThemeProvider } from '@/components/ThemeProvider';
import ClientProviders from "@/components/ClientProviders";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SASS Chat application',
  description: 'AI powered tech support chat application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClientProviders>
      <html lang="en">
        <body className={'flex flex-col min-h-screen'}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClientProviders>
  )
}
