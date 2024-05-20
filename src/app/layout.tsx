import type { Metadata } from 'next'
import { Navigation } from '@/components/navigation/navigation'
import { MoneyContextProvider } from '@/context/store'
import { AuthContextProvider } from '@/context/authContext'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'XPNS | Home',
  description: 'Take a look of where your money goes everytime you spend it!'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`dark:bg-black bg-slate-100 ${inter.className}`}>
        <div className='absolute -z-10 inset-0 dark:bg-black bg-slate-100 min-h-screen'>
          <main className='w-full relative dark:bg-grid-white/[0.2] bg-grid-black/[0.2] min-h-screen'>
            <AuthContextProvider>
              <MoneyContextProvider>
                <Navigation />
                {children}
              </MoneyContextProvider>
            </AuthContextProvider>
          </main>
        </div>
      </body>
    </html>
  )
}
