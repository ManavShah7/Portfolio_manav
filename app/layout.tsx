import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Manav Shah — Product Designer',
  description: 'Product Designer based in Boston. I go deep on problems, design with intent, and build the things I design.',
  openGraph: {
    title: 'Manav Shah — Product Designer',
    description: 'Product Designer based in Boston.',
    url: 'https://manavshah.me',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="bg-white text-[#111] font-sans">
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}