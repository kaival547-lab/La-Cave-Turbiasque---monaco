"use client"

import * as React from "react"
import { useState } from "react";
import { LogIn, Lock, Mail, Loader2 } from "lucide-react";
import Link from 'next/link';

interface SignIn2Props {
    email?: string;
    password?: string;
    setEmail?: (email: string) => void;
    setPassword?: (password: string) => void;
    onSubmit?: () => void;
    error?: string;
    isLoading?: boolean;
}

const SignIn2 = ({
    email: propEmail,
    password: propPassword,
    setEmail: propSetEmail,
    setPassword: propSetPassword,
    onSubmit,
    error: propError,
    isLoading
}: SignIn2Props) => {
    const [internalEmail, setInternalEmail] = useState("");
    const [internalPassword, setInternalPassword] = useState("");
    const [internalError, setInternalError] = useState("");

    const email = propEmail ?? internalEmail;
    const password = propPassword ?? internalPassword;
    const setEmail = propSetEmail ?? setInternalEmail;
    const setPassword = propSetPassword ?? setInternalPassword;
    const error = propError ?? internalError;

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSignIn = () => {
        if (onSubmit) {
            onSubmit();
            return;
        }

        if (!email || !password) {
            setInternalError("Please enter both email and password.");
            return;
        }
        if (!validateEmail(email)) {
            setInternalError("Please enter a valid email address.");
            return;
        }
        setInternalError("");
        alert("Sign in successful! (Demo)");
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-white rounded-xl z-1">
            <div className="w-full max-w-sm bg-gradient-to-b from-orange-50/50 to-white rounded-3xl shadow-xl shadow-opacity-10 p-8 flex flex-col items-center border border-orange-100 text-black">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white mb-6 shadow-lg shadow-opacity-5">
                    {isLoading ? (
                        <Loader2 className="w-7 h-7 text-black animate-spin" />
                    ) : (
                        <LogIn className="w-7 h-7 text-black" />
                    )}
                </div>
                <h2 className="text-2xl font-semibold mb-2 text-center">
                    Admin Sign in
                </h2>
                <p className="text-gray-500 text-sm mb-6 text-center">
                    Enter your credentials to access the Bistro Admin Dashboard
                </p>
                <div className="w-full flex flex-col gap-3 mb-2">
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
                            disabled={isLoading}
                            suppressHydrationWarning
                        />
                    </div>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <Lock className="w-4 h-4" />
                        </span>
                        <input
                            placeholder="Password"
                            type="password"
                            value={password}
                            className="w-full pl-10 pr-10 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200 bg-gray-50 text-black text-sm"
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                            suppressHydrationWarning
                        />
                    </div>
                    <div className="w-full flex flex-col gap-1 items-end">
                        {error && (
                            <div className="text-sm text-red-500 text-left w-full">{error}</div>
                        )}
                        <Link href="/auth/forgot-password" core-button-style="true" className="text-xs hover:underline font-medium" suppressHydrationWarning>
                            Forgot password?
                        </Link>
                    </div>
                </div>
                <button
                    onClick={handleSignIn}
                    disabled={isLoading}
                    className="w-full bg-primary text-white font-medium py-2 rounded-xl shadow hover:brightness-105 cursor-pointer transition mb-4 mt-2 flex items-center justify-center"
                    suppressHydrationWarning
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Signing in...
                        </>
                    ) : (
                        "Get Started"
                    )}
                </button>
                <div className="flex items-center w-full my-2">
                    <div className="flex-grow border-t border-dashed border-gray-200"></div>
                    <span className="mx-2 text-xs text-gray-400">Or sign in with</span>
                    <div className="flex-grow border-t border-dashed border-gray-200"></div>
                </div>
                <div className="flex gap-3 w-full justify-center mt-2">
                    <button className="flex items-center justify-center w-12 h-12 rounded-xl border bg-white hover:bg-gray-100 transition grow" suppressHydrationWarning>
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            alt="Google"
                            className="w-6 h-6"
                        />
                    </button>
                    <button className="flex items-center justify-center w-12 h-12 rounded-xl border bg-white hover:bg-gray-100 transition grow" suppressHydrationWarning>
                        <img
                            src="https://www.svgrepo.com/show/448224/facebook.svg"
                            alt="Facebook"
                            className="w-6 h-6"
                        />
                    </button>
                    <button className="flex items-center justify-center w-12 h-12 rounded-xl border bg-white hover:bg-gray-100 transition grow" suppressHydrationWarning>
                        <img
                            src="https://www.svgrepo.com/show/511330/apple-173.svg"
                            alt="Apple"
                            className="w-6 h-6"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export { SignIn2 };
