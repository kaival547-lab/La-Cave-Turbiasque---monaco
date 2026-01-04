"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { reservationAPI } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function EditReservationPage() {
    const router = useRouter()
    const params = useParams()
    const id = params.id as string

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: 1,
        specialRequests: "",
        status: "pending"
    })

    useEffect(() => {
        const fetchReservation = async () => {
            if (!id) return;
            try {
                const data = await reservationAPI.getById(id)
                if (data) {
                    setFormData({
                        name: data.name,
                        email: data.email,
                        phone: data.phone,
                        date: data.date,
                        time: data.time,
                        guests: data.guests,
                        specialRequests: data.specialRequests || "",
                        status: data.status
                    })
                } else {
                    alert("Reservation not found")
                    router.push("/admin/reservations")
                }
            } catch (error) {
                console.error(error)
                alert("Failed to fetch reservation")
            } finally {
                setLoading(false)
            }
        }
        fetchReservation()
    }, [id, router])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleStatusChange = (value: string) => {
        setFormData(prev => ({ ...prev, status: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        try {
            await reservationAPI.update(id, formData)
            router.push("/admin/reservations")
        } catch (error) {
            console.error(error)
            alert("Failed to update reservation")
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6">
                <Link href="/admin/reservations" className="text-slate-500 hover:text-slate-900 flex items-center mb-2">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to Reservations
                </Link>
                <h1 className="text-2xl font-bold font-serif text-slate-900">Edit Reservation</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Guest Name</label>
                        <Input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Email</label>
                        <Input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Phone</label>
                        <Input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Status</label>
                        <Select value={formData.status} onValueChange={handleStatusChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Date</label>
                        <Input
                            name="date"
                            type="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Time</label>
                        <Input
                            name="time"
                            type="time"
                            value={formData.time}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Guests</label>
                        <Input
                            name="guests"
                            type="number"
                            min="1"
                            max="20"
                            value={formData.guests}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Special Requests</label>
                    <Textarea
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleChange}
                        placeholder="Any dietary requirements or special occasions?"
                    />
                </div>

                <div className="flex justify-end pt-4">
                    <Button type="submit" disabled={saving} className="w-full sm:w-auto">
                        {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Changes
                    </Button>
                </div>
            </form>
        </div>
    )
}
