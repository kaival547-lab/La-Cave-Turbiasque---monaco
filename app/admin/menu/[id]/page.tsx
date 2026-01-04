"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { menuAPI } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function EditMenuItemPage() {
    const router = useRouter()
    const params = useParams()
    const id = params.id as string

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "mains",
        image: "",
        isPopular: false,
        isAvailable: true
    })

    useEffect(() => {
        const fetchItem = async () => {
            if (!id) return;
            try {
                const item = await menuAPI.getById(id)
                if (item) {
                    setFormData({
                        name: item.name,
                        description: item.description,
                        price: item.price.toString(),
                        category: item.category,
                        image: item.image,
                        isPopular: item.isPopular,
                        isAvailable: item.isAvailable
                    })
                } else {
                    alert("Menu item not found")
                    router.push("/admin/menu")
                }
            } catch (error) {
                console.error(error)
                alert("Failed to fetch menu item")
            } finally {
                setLoading(false)
            }
        }
        fetchItem()
    }, [id, router])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleCategoryChange = (value: string) => {
        setFormData(prev => ({ ...prev, category: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        try {
            await menuAPI.update(id, {
                ...formData,
                price: parseFloat(formData.price)
            })
            router.push("/admin/menu")
        } catch (error) {
            console.error(error)
            alert("Failed to update menu item")
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
                <Link href="/admin/menu" className="text-slate-500 hover:text-slate-900 flex items-center mb-2">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to Menu
                </Link>
                <h1 className="text-2xl font-bold font-serif text-slate-900">Edit Item</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-slate-700">Name</label>
                    <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium text-slate-700">Description</label>
                    <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label htmlFor="price" className="text-sm font-medium text-slate-700">Price ($)</label>
                        <Input
                            id="price"
                            name="price"
                            type="number"
                            step="0.01"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="category" className="text-sm font-medium text-slate-700">Category</label>
                        <Select value={formData.category} onValueChange={handleCategoryChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="appetizers">Appetizers</SelectItem>
                                <SelectItem value="mains">Mains</SelectItem>
                                <SelectItem value="desserts">Desserts</SelectItem>
                                <SelectItem value="wines">Wines</SelectItem>
                                <SelectItem value="sides">Sides</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="image" className="text-sm font-medium text-slate-700">Image URL</label>
                    <Input
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex items-center space-x-2">
                    <Switch
                        id="isPopular"
                        checked={formData.isPopular}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPopular: checked }))}
                    />
                    <label htmlFor="isPopular" className="text-sm font-medium text-slate-700">
                        Mark as Popular Item
                    </label>
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
