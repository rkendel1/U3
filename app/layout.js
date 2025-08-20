import './globals.css'
import Navbar from './components/Navbar'
import { AuthProvider } from './context/AuthContext'
import Providers from './providers'

export const metadata = {
  title: 'Upwork Clone',
  description: 'Find the best freelancers and jobs',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
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
