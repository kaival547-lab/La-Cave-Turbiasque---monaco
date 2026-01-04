"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { SignIn2 } from "@/components/ui/clean-minimal-sign-in"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const { login } = useAuth()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
            const res = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message || "Failed to login")
            }

            login(data.token, data.user)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <SignIn2
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            onSubmit={() => {
                const e = { preventDefault: () => { } } as React.FormEvent;
                handleSubmit(e);
            }}
            error={error}
            isLoading={isLoading}
        />
    )
}
