"use client"

import { useEffect, useState } from "react"
import { reviewAPI } from "@/lib/api"
import { Star, Check, X, Trash2, Loader2 } from "lucide-react"

export default function AdminReviewsPage() {
    const [reviews, setReviews] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const fetchReviews = async () => {
        try {
            const data = await reviewAPI.getAllAdmin()
            setReviews(data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchReviews()
    }, [])

    const handleApproval = async (id: string, isApproved: boolean) => {
        try {
            await reviewAPI.updateStatus(id, isApproved)
            setReviews(reviews.map(review =>
                review._id === id ? { ...review, isApproved } : review
            ))
        } catch (error) {
            alert("Failed to update status")
        }
    }

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this review?")) {
            try {
                await reviewAPI.delete(id)
                setReviews(reviews.filter((review) => review._id !== id))
            } catch (error) {
                alert("Failed to delete review")
            }
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
            <h1 className="text-2xl font-bold font-serif text-slate-900 mb-6">Reviews Management</h1>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">User</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Rating</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Comment</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {reviews.map((review) => (
                            <tr key={review._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-slate-900">{review.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center text-yellow-400">
                                        <span className="text-slate-900 mr-1 text-sm">{review.rating}</span>
                                        <Star className="h-4 w-4 fill-current" />
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-slate-500 line-clamp-2">{review.comment}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        ${review.isApproved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                        {review.isApproved ? 'Approved' : 'Pending'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    {!review.isApproved && (
                                        <button
                                            onClick={() => handleApproval(review._id, true)}
                                            className="text-green-600 hover:text-green-900 mr-4"
                                            title="Approve"
                                        >
                                            <Check className="h-4 w-4" />
                                        </button>
                                    )}
                                    {review.isApproved && (
                                        <button
                                            onClick={() => handleApproval(review._id, false)}
                                            className="text-yellow-600 hover:text-yellow-900 mr-4"
                                            title="Reject"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(review._id)}
                                        className="text-red-600 hover:text-red-900"
                                        title="Delete"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
