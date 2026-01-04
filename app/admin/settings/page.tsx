"use client"

import { useAuth } from "@/components/auth-provider"

export default function AdminSettingsPage() {
    const { user } = useAuth()

    return (
        <div>
            <h1 className="text-2xl font-bold font-serif text-slate-900 mb-6">Settings</h1>

            <div className="bg-white rounded-lg shadow overflow-hidden p-6 max-w-2xl">
                <h2 className="text-lg font-semibold mb-4">Profile Information</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Name</label>
                        <div className="mt-1 p-2 bg-slate-50 rounded-md border border-slate-200 text-slate-900">
                            {user?.name}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700">Email</label>
                        <div className="mt-1 p-2 bg-slate-50 rounded-md border border-slate-200 text-slate-900">
                            {user?.email}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700">Role</label>
                        <div className="mt-1 p-2 bg-slate-50 rounded-md border border-slate-200 text-slate-900 capitalize">
                            {user?.role}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
