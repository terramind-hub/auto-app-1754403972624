import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { MusicProvider } from '@/contexts/MusicContext'
import { PlaylistProvider } from '@/contexts/PlaylistContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spotify Clone',
  description: 'A comprehensive music streaming application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MusicProvider>
          <PlaylistProvider>
            {children}
          </PlaylistProvider>
        </MusicProvider>
      </body>
    </html>
  )
}