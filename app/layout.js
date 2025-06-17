import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import { AuthProvider } from './context/AuthContext'
import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Upwork Clone',
  description: 'Find the best freelancers and jobs',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AuthProvider>
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  )
}
