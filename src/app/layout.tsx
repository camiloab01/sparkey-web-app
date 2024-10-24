import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Web3Provider from './config/web3Provider'
import { headers } from 'next/headers'

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
  title: 'Sparkey Web App',
  description: 'Web App for Sparkey',
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
        <Web3Provider cookies={cookies}>{children}</Web3Provider>
      </body>
    </html>
  )
}
