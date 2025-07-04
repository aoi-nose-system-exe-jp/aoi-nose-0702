import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '今日の運勢占い - あなたの運勢を占います',
  description: '恋愛運、仕事運、金運など、あなたの今日の運勢を無料で占います。毎日の生活に少しの楽しみを。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}