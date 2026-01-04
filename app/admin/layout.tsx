"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import {
    LayoutDashboard,
    UtensilsCrossed,
    CalendarDays,
    MessageSquare,
    Settings,
    LogOut,
    Menu as MenuIcon,
    X
} from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, loading, logout, checkAdmin } = useAuth()
    const router = useRouter()
    const pathname = usePathname()
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    useEffect(() => {
        if (!loading && !checkAdmin()) {
            router.push("/auth/login")
        }
    }, [loading, user, router])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (!checkAdmin()) return null

    const navigation = [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Menu Items", href: "/admin/menu", icon: UtensilsCrossed },
        { name: "Reservations", href: "/admin/reservations", icon: CalendarDays },
        { name: "Reviews", href: "/admin/reviews", icon: MessageSquare },
        { name: "Settings", href: "/admin/settings", icon: Settings },
    ]

    return (
        <div className="min-h-screen bg-slate-100 flex">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-200 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:relative lg:translate-x-0`}
            >
                <div className="h-full flex flex-col">
                    <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                        <h1 className="text-xl font-bold font-serif">Bistro Admin</h1>
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="lg:hidden text-slate-400 hover:text-white"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <nav className="flex-1 p-4 space-y-1">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive
                                            ? "bg-primary text-white"
                                            : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                        }`}
                                >
                                    <item.icon className="h-5 w-5 mr-3" />
                                    {item.name}
                                </Link>
                            )
                        })}
                    </nav>

                    <div className="p-4 border-t border-slate-800">
                        <div className="flex items-center mb-4 px-4">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                {user?.name?.[0].toUpperCase()}
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-white">{user?.name}</p>
                                <p className="text-xs text-slate-400 truncate w-32">{user?.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={logout}
                            className="flex w-full items-center px-4 py-2 text-sm font-medium text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
                        >
                            <LogOut className="h-5 w-5 mr-3" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
                <header className="lg:hidden bg-white shadow-sm p-4 flex items-center">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="text-slate-600 hover:text-slate-900"
                    >
                        <MenuIcon className="h-6 w-6" />
                    </button>
                    <span className="ml-4 font-bold text-lg">Dashboard</span>
                </header>

                <main className="flex-1 p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}
