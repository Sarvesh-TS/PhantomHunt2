import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Test',
  description: 'Created with v0',
  generator: 'v0.dev',
  icons: '/favicon.png', // Add the favicon here
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
