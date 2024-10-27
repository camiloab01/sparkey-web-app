import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Web3Provider from './config/web3Provider'
import { headers } from 'next/headers'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'TabDuel App',
  description: 'Better you play, the less you pay',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookies = (await headers()).get('cookie')

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Web3Provider cookies={cookies}>
          <Header />
          {children}
          <Footer />
        </Web3Provider>
      </body>
    </html>
  )
}
