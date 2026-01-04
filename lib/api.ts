const getBaseUrl = () => {
    let url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    // Remove trailing slash if present
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    // Automatically append /api if it's missing and it's not a local dev URL (which usually has it)
    if (!url.endsWith('/api') && (url.startsWith('http://') || url.startsWith('https://'))) {
        url = `${url}/api`;
    }
    return url;
};

const API_URL = getBaseUrl();

const checkBackend = async () => {
    try {
        const res = await fetch(`${API_URL}/health`, { method: 'GET' });
        return res.ok;
    } catch (e) {
        return false;
    }
};

const getHeaders = () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    return {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

export const menuAPI = {
    // Get all menu items
    async getAll() {
        console.log(`🔍 Fetching menu from: ${API_URL}/menu`);
        try {
            const response = await fetch(`${API_URL}/menu`);
            if (!response.ok) {
                console.error(`❌ Menu fetch failed with status: ${response.status}`);
                throw new Error('Failed to fetch menu');
            }
            const data = await response.json();
            console.log(`✅ Fetched ${data.data?.length || 0} menu items`);
            return data.data;
        } catch (error) {
            console.error('🔴 API ERROR:', error);
            const isRunning = await checkBackend();
            if (!isRunning) {
                console.error(`🔴 BACKEND NOT REACHABLE at ${API_URL}. \n1. Check if Render backend is live. \n2. Check if NEXT_PUBLIC_API_URL is set in Vercel. \n3. Ensure you use HTTPS for Render if Vercel is HTTPS.`);
            }
            return [];
        }
    },

    // Get popular items
    async getPopular() {
        console.log(`🔍 Fetching popular items from: ${API_URL}/menu/popular/items`);
        try {
            const response = await fetch(`${API_URL}/menu/popular/items`);
            if (!response.ok) {
                console.error(`❌ Popular items fetch failed with status: ${response.status}`);
                throw new Error('Failed to fetch popular items');
            }
            const data = await response.json();
            console.log(`✅ Fetched ${data.data?.length || 0} popular items`);
            return data.data;
        } catch (error) {
            console.error('🔴 POPULAR API ERROR:', error);
            const isRunning = await checkBackend();
            if (!isRunning) {
                console.error(`🔴 BACKEND NOT REACHABLE at ${API_URL}.`);
            }
            return [];
        }
    },

    // Get items by category
    async getByCategory(category: string) {
        console.log(`🔍 Fetching category ${category} from: ${API_URL}/menu/category/${category}`);
        try {
            const response = await fetch(`${API_URL}/menu/category/${category}`);
            if (!response.ok) {
                console.error(`❌ Category ${category} fetch failed with status: ${response.status}`);
                throw new Error(`Failed to fetch category ${category}`);
            }
            const data = await response.json();
            console.log(`✅ Fetched ${data.data?.length || 0} items for category ${category}`);
            return data.data;
        } catch (error) {
            console.error(`🔴 CATEGORY ${category} API ERROR:`, error);
            const isRunning = await checkBackend();
            if (!isRunning) {
                console.error(`🔴 BACKEND NOT REACHABLE at ${API_URL}.`);
            }
            return [];
        }
    },

    // Get item by ID
    async getById(id: string) {
        console.log(`🔍 Fetching item ${id} from: ${API_URL}/menu/${id}`);
        try {
            const response = await fetch(`${API_URL}/menu/${id}`);
            if (!response.ok) {
                console.error(`❌ Item ${id} fetch failed with status: ${response.status}`);
                throw new Error('Failed to fetch menu item');
            }
            const data = await response.json();
            console.log(`✅ Fetched item: ${data.data?.name}`);
            return data.data;
        } catch (error) {
            console.error(`🔴 ITEM ${id} API ERROR:`, error);
            return null;
        }
    },

    // Admin: Create item
    async create(itemData: any) {
        const response = await fetch(`${API_URL}/menu`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(itemData),
        });
        if (!response.ok) throw new Error('Failed to create menu item');
        return response.json();
    },

    // Admin: Update item
    async update(id: string, itemData: any) {
        const response = await fetch(`${API_URL}/menu/${id}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(itemData),
        });
        if (!response.ok) throw new Error('Failed to update menu item');
        return response.json();
    },

    // Admin: Delete item
    async delete(id: string) {
        const response = await fetch(`${API_URL}/menu/${id}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });
        if (!response.ok) throw new Error('Failed to delete menu item');
        return response.json();
    }
};

export const reservationAPI = {
    // Admin: Get all reservations
    async getAll() {
        const response = await fetch(`${API_URL}/reservations`, {
            headers: getHeaders(),
        });
        if (!response.ok) throw new Error('Failed to fetch reservations');
        const data = await response.json();
        return data.data;
    },

    // Create reservation (Public)
    async create(reservationData: any) {
        const response = await fetch(`${API_URL}/reservations`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reservationData),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to create reservation');
        }
        return response.json();
    },

    // Admin: Get reservation by ID
    async getById(id: string) {
        const response = await fetch(`${API_URL}/reservations/${id}`, {
            headers: getHeaders(),
        });
        if (!response.ok) throw new Error('Failed to fetch reservation');
        const data = await response.json();
        return data.data;
    },

    // Admin: Update reservation (full or status)
    async update(id: string, updates: any) {
        const response = await fetch(`${API_URL}/reservations/${id}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(updates),
        });
        if (!response.ok) throw new Error('Failed to update reservation');
        return response.json();
    },

    // Admin: Update status (kept for compatibility)
    async updateStatus(id: string, status: string) {
        return this.update(id, { status });
    }
};

export const reviewAPI = {
    // Get public reviews
    async getAll() {
        try {
            const response = await fetch(`${API_URL}/reviews`);
            if (!response.ok) throw new Error('Failed to fetch reviews');
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error('Error fetching reviews:', error);
            return [];
        }
    },

    // Admin: Get all reviews
    async getAllAdmin() {
        const response = await fetch(`${API_URL}/reviews/admin`, {
            headers: getHeaders(),
        });
        if (!response.ok) throw new Error('Failed to fetch admin reviews');
        const data = await response.json();
        return data.data;
    },

    // Create review
    async create(reviewData: any) {
        const response = await fetch(`${API_URL}/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reviewData),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to submit review');
        }
        return response.json();
    },

    // Admin: Update status
    async updateStatus(id: string, isApproved: boolean) {
        const response = await fetch(`${API_URL}/reviews/${id}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify({ isApproved }),
        });
        if (!response.ok) throw new Error('Failed to update review status');
        return response.json();
    },

    // Admin: Delete review
    async delete(id: string) {
        const response = await fetch(`${API_URL}/reviews/${id}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });
        if (!response.ok) throw new Error('Failed to delete review');
        return response.json();
    }
};
