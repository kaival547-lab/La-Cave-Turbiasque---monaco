"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Users,
    UtensilsCrossed,
    CalendarDays,
    MessageSquare,
    TrendingUp,
    ArrowUpRight
} from "lucide-react"
import { menuAPI } from "@/lib/api"
import { useAuth } from "@/components/auth-provider"

export default function AdminDashboard() {
    const { user } = useAuth()
    const [stats, setStats] = useState({
        menuItems: 0,
        reservations: 0,
        reviews: 0,
        activeBookings: 0
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchStats() {
            try {
                const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
                const token = localStorage.getItem("token")

                const headers = {
                    'Authorization': `Bearer ${token}`
                }

                const [menuRes, reservationsRes, reviewsRes] = await Promise.all([
                    fetch(`${API_URL}/menu`),
                    fetch(`${API_URL}/reservations`, { headers }),
                    fetch(`${API_URL}/reviews/admin`, { headers })
                ])

                const menuData = await menuRes.json()
                const reservationsData = await reservationsRes.json()
                const reviewsData = await reviewsRes.json()

                setStats({
                    menuItems: menuData.count || 0,
                    reservations: reservationsData.count || 0,
                    reviews: reviewsData.count || 0,
                    activeBookings: reservationsData.data?.filter((r: any) => r.status === 'confirmed').length || 0
                })
            } catch (error) {
                console.error("Error fetching stats:", error)
            } finally {
                setLoading(false)
            }
        }

        if (user) {
            fetchStats()
        }
    }, [user])

    const statCards = [
        {
            title: "Total Menu Items",
            value: stats.menuItems,
            icon: UtensilsCrossed,
            color: "text-blue-600",
            description: "Active dishes on menu"
        },
        {
            title: "Total Reservations",
            value: stats.reservations,
            icon: CalendarDays,
            color: "text-green-600",
            description: "All time bookings"
        },
        {
            title: "Pending Reviews",
            value: stats.reviews, // This should filter pending in real app
            icon: MessageSquare,
            color: "text-yellow-600",
            description: "Reviews awaiting approval"
        },
        {
            title: "Active Bookings",
            value: stats.activeBookings,
            icon: Users,
            color: "text-purple-600",
            description: "Confirmed upcoming guests"
        }
    ]

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Dashboard Overview</h1>
                <p className="text-slate-500 mt-2">Welcome back, {user?.name}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-slate-500">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className={`h-4 w-4 ${stat.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{loading ? "-" : stat.value}</div>
                            <p className="text-xs text-slate-500 mt-1">{stat.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm text-slate-500 text-center py-8">
                            No recent activity to show
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4">
                        <button className="p-4 border rounded-lg hover:bg-slate-50 flex flex-col items-center justify-center gap-2 transition-colors">
                            <UtensilsCrossed className="h-6 w-6 text-slate-600" />
                            <span className="text-sm font-medium">Add Menu Item</span>
                        </button>
                        <button className="p-4 border rounded-lg hover:bg-slate-50 flex flex-col items-center justify-center gap-2 transition-colors">
                            <CalendarDays className="h-6 w-6 text-slate-600" />
                            <span className="text-sm font-medium">View Bookings</span>
                        </button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
