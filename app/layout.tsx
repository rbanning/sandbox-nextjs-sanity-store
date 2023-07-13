import { Providers } from '@/store/providers';
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

//see https://stackoverflow.com/questions/75337953/what-causes-nextjs-warning-extra-attributes-from-the-server-data-new-gr-c-s-c
const suppress_extra_attributes_warning = true;

export const metadata: Metadata = {
  title: 'Sandbox Store',
  description: 'Generated by Hallpass and Friends',
  icons: {
    icon: '/favicon.ico'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" >
      <body 
        suppressHydrationWarning={suppress_extra_attributes_warning}
        className={`${inter.className} min-h-screen`}>
          <Providers>
            {children}
          </Providers>
      </body>
    </html>
  )
}
