"use client"

import { useState } from "react"
import { Mail, Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setMessage("")
        setError("")

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
            const res = await fetch(`${API_URL}/auth/forgotpassword`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message || "Failed to send reset email")
            }

            setMessage("If an account exists with that email, we've sent a reset link.")
            setEmail("")
        } catch (err: any) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-white p-4">
            <div className="w-full max-w-sm bg-gradient-to-b from-orange-50/50 to-white rounded-3xl shadow-xl p-8 flex flex-col items-center border border-orange-100 text-black">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white mb-6 shadow-lg">
                    <Mail className="w-7 h-7 text-black" />
                </div>
                <h2 className="text-2xl font-semibold mb-2 text-center">
                    Forgot Password
                </h2>
                <p className="text-gray-500 text-sm mb-6 text-center">
                    Enter your email address and we'll send you a link to reset your password.
                </p>

                {message && (
                    <div className="w-full p-3 mb-4 text-sm text-green-600 bg-green-50 border border-green-100 rounded-xl text-center">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="w-full p-3 mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <Mail className="w-4 h-4" />
                        </span>
                        <input
                            placeholder="Email"
                            type="email"
                            value={email}
                            className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 bg-gray-50 text-black text-sm"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary text-white font-medium py-2 rounded-xl shadow hover:brightness-105 cursor-pointer transition flex items-center justify-center"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Sending...
                            </>
                        ) : (
                            "Reset Password"
                        )}
                    </button>
                </form>

                <Link
                    href="/auth/login"
                    className="mt-6 flex items-center text-sm text-gray-500 hover:text-black transition"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Sign In
                </Link>
            </div>
        </div>
    )
}
