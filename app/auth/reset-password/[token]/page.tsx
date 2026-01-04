"use client"

import { useState } from "react"
import { Lock, Loader2, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"

export default function ResetPasswordPage() {
    const params = useParams()
    const router = useRouter()
    const token = params.token as string

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setError("Passwords do not match")
            return
        }

        setIsLoading(true)
        setError("")

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
            const res = await fetch(`${API_URL}/auth/resetpassword/${token}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password }),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message || "Failed to reset password")
            }

            setSuccess(true)
            setTimeout(() => {
                router.push("/auth/login")
            }, 3000)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    if (success) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-white p-4">
                <div className="w-full max-w-sm bg-gradient-to-b from-orange-50/50 to-white rounded-3xl shadow-xl p-8 flex flex-col items-center border border-orange-100 text-black text-center">
                    <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white mb-6 shadow-lg">
                        <CheckCircle className="w-7 h-7 text-green-500" />
                    </div>
                    <h2 className="text-2xl font-semibold mb-2">
                        Reset Successful
                    </h2>
                    <p className="text-gray-500 text-sm mb-6">
                        Your password has been successfully updated. Redirecting you to sign in...
                    </p>
                    <Link
                        href="/auth/login"
                        className="bg-primary text-white font-medium py-2 px-8 rounded-xl shadow hover:brightness-105 transition"
                        core-button-style="true">
                        Back to Sign In
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-white p-4">
            <div className="w-full max-w-sm bg-gradient-to-b from-orange-50/50 to-white rounded-3xl shadow-xl p-8 flex flex-col items-center border border-orange-100 text-black">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white mb-6 shadow-lg">
                    <Lock className="w-7 h-7 text-black" />
                </div>
                <h2 className="text-2xl font-semibold mb-2 text-center">
                    Reset Password
                </h2>
                <p className="text-gray-500 text-sm mb-6 text-center">
                    Please enter your new password below.
                </p>

                {error && (
                    <div className="w-full p-3 mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <Lock className="w-4 h-4" />
                        </span>
                        <input
                            placeholder="New Password"
                            type="password"
                            value={password}
                            className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 bg-gray-50 text-black text-sm"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <Lock className="w-4 h-4" />
                        </span>
                        <input
                            placeholder="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 bg-gray-50 text-black text-sm"
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                                Updating...
                            </>
                        ) : (
                            "Update Password"
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}
