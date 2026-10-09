const API_BASE = import.meta.env.VITE_API_URL || '/api';

// Helper for authorized headers
const authHeaders = () => {
  const token = localStorage.getItem('thaagam_admin_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// ── CAUSES API ──
export const fetchCauses = async (category = '', search = '', all = false) => {
  try {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.append('category', category);
    if (search) params.append('search', search);
    if (all) params.append('all', 'true');

    const res = await fetch(`${API_BASE}/causes?${params.toString()}`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.warn('Backend /causes fetch failed, using fallback:', error.message);
    return null; // Signals component to use cached/fallback data
  }
};

export const fetchCauseBySlug = async (slug) => {
  try {
    const res = await fetch(`${API_BASE}/causes/slug/${slug}`);
    if (!res.ok) throw new Error('Not found');
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.warn('Fetch cause by slug failed:', error.message);
    return null;
  }
};

// ── PACKAGES API ──
export const fetchPackages = async () => {
  try {
    const res = await fetch(`${API_BASE}/packages`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.warn('Backend /packages fetch failed:', error.message);
    return null;
  }
};

// ── ADMIN API ──
export const loginAdmin = async (email, password) => {
  const res = await fetch(`${API_BASE}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || 'Login failed');
  }
  return data.data;
};

export const fetchAdminDashboardStats = async () => {
  const res = await fetch(`${API_BASE}/admin/dashboard`, {
    headers: authHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch dashboard stats');
  return data.data;
};

export const createCauseApi = async (causeData) => {
  const res = await fetch(`${API_BASE}/causes`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(causeData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to create cause');
  return data.data;
};

export const updateCauseApi = async (id, causeData) => {
  const res = await fetch(`${API_BASE}/causes/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(causeData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to update cause');
  return data.data;
};

export const deleteCauseApi = async (id) => {
  const res = await fetch(`${API_BASE}/causes/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to delete cause');
  return data;
};

export const createPackageApi = async (pkgData) => {
  const res = await fetch(`${API_BASE}/packages`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(pkgData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to create package');
  return data.data;
};

export const updatePackageApi = async (id, pkgData) => {
  const res = await fetch(`${API_BASE}/packages/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(pkgData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to update package');
  return data.data;
};

export const deletePackageApi = async (id) => {
  const res = await fetch(`${API_BASE}/packages/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to delete package');
  return data;
};
