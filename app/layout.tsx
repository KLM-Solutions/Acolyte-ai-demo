import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Acolyte-ai-demo',
  description: 'Powered by acolyte-health',
  generator: 'acolyte-health',
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
