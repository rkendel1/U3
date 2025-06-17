'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const { data: session, status } = useSession()
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (session?.user) {
      setUser(session.user)
    } else {
      setUser(null)
    }
  }, [session])

  return (
    <AuthContext.Provider value={{ user, status }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
} 