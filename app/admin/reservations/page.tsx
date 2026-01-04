"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { reservationAPI } from "@/lib/api"
import { format } from "date-fns"
import { Check, X, Loader2, Calendar, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminReservationsPage() {
    const [reservations, setReservations] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const fetchReservations = async () => {
        try {
            const data = await reservationAPI.getAll()
            setReservations(data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchReservations()
    }, [])

    const handleStatusUpdate = async (id: string, status: string) => {
        try {
            await reservationAPI.updateStatus(id, status)
            setReservations(reservations.map(res =>
                res._id === id ? { ...res, status } : res
            ))
        } catch (error) {
            alert("Failed to update status")
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
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold font-serif text-slate-900">Reservations</h1>
                <Button onClick={fetchReservations} variant="outline" size="sm">
                    Refresh List
                </Button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date & Time</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Guest</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Party Size</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {reservations.map((reservation) => (
                            <tr key={reservation._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <Calendar className="h-4 w-4 mr-2 text-slate-400" />
                                        <span className="text-sm text-slate-900">
                                            {format(new Date(reservation.date), 'MMM dd, yyyy')}
                                        </span>
                                        <span className="ml-2 text-sm text-slate-500">
                                            {reservation.time}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-slate-900">{reservation.name}</div>
                                    <div className="text-sm text-slate-500">{reservation.email}</div>
                                    <div className="text-sm text-slate-500">{reservation.phone}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                    {reservation.guests} people
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        ${reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                            reservation.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                'bg-yellow-100 text-yellow-800'}`}>
                                        {reservation.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <Link href={`/admin/reservations/${reservation._id}`}>
                                        <button className="text-indigo-600 hover:text-indigo-900 mr-4" title="Edit">
                                            <Pencil className="h-4 w-4" />
                                        </button>
                                    </Link>
                                    {reservation.status === 'pending' && (
                                        <>
                                            <button
                                                onClick={() => handleStatusUpdate(reservation._id, 'confirmed')}
                                                className="text-green-600 hover:text-green-900 mr-4"
                                                title="Confirm"
                                            >
                                                <Check className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => handleStatusUpdate(reservation._id, 'cancelled')}
                                                className="text-red-600 hover:text-red-900"
                                                title="Cancel"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
