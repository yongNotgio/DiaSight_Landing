import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [doctor, setDoctor] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check localStorage for existing session
    const storedDoctor = localStorage.getItem('doctor')
    if (storedDoctor) {
      setDoctor(JSON.parse(storedDoctor))
    }
    setLoading(false)
  }, [])

  const login = (doctorData) => {
    setDoctor(doctorData)
    localStorage.setItem('doctor', JSON.stringify(doctorData))
  }

  const logout = () => {
    setDoctor(null)
    localStorage.removeItem('doctor')
  }

  return (
    <AuthContext.Provider value={{ doctor, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
