"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface User {
    id: string
    name: string
    email: string
    role: string
}

interface AuthContextType {
    user: User | null
    loading: boolean
    login: (token: string, userData: User) => void
    logout: () => void
    checkAdmin: () => boolean
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    login: () => { },
    logout: () => { },
    checkAdmin: () => false,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        // Check for token on mount
        const token = localStorage.getItem("token")
        const userData = localStorage.getItem("user")

        if (token && userData && userData !== "undefined") {
            try {
                setUser(JSON.parse(userData))
            } catch (e) {
                console.error("Failed to parse user data", e)
                localStorage.removeItem("user")
                localStorage.removeItem("token")
            }
        }
        setLoading(false)
    }, [])

    const login = (token: string, userData: User) => {
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(userData))
        setUser(userData)

        if (userData.role === "admin") {
            router.push("/admin")
        } else {
            router.push("/")
        }
    }

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUser(null)
        router.push("/auth/login")
    }

    const checkAdmin = () => {
        return user?.role === "admin"
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, checkAdmin }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
