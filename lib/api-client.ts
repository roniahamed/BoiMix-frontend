const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api/v1";

function getAuthHeaders(): HeadersInit {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function apiFetch(path: string, options?: RequestInit) {
  return fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...getAuthHeaders(), ...options?.headers },
  });
}

export async function fetchBooks(type?: string) {
  const url = type ? `/books/?type=${type}` : `/books/`;
  const res = await apiFetch(url);
  const data = await res.json();
  return data.results || data;
}

export async function fetchBookDetails(slug: string) {
  const res = await apiFetch(`/books/${slug}/`);
  if (!res.ok) throw new Error(`Failed to fetch book: ${res.statusText}`);
  return res.json();
}

export async function fetchSearchBooks(query: string = "", filters?: Record<string, string | number>) {
  const queryParams = new URLSearchParams();
  if (query) queryParams.append("q", query);
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        queryParams.append(key, String(value));
      }
    });
  }
  const queryString = queryParams.toString();
  const url = queryString ? `/search/books/?${queryString}` : `/search/books/`;
  
  const res = await apiFetch(url);
  const data = await res.json();
  return data.results || data;
}

export async function fetchSearchSuggestions(query: string) {
  const res = await apiFetch(`/search/suggestions/?q=${encodeURIComponent(query)}`);
  const data = await res.json();
  return data.suggestions || [];
}

export async function fetchNearbyBooks(lat: number, lng: number, radius = 5.0) {
  const res = await apiFetch(`/locations/nearby/?lat=${lat}&lng=${lng}&radius_km=${radius}`);
  const data = await res.json();
  return data.results || data;
}

export async function searchLocation(query: string) {
  const res = await apiFetch(`/locations/search/?q=${encodeURIComponent(query)}`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.results || data;
}

export async function reverseGeocode(lat: number, lng: number) {
  const res = await apiFetch(`/locations/reverse/?lat=${lat}&lng=${lng}`);
  if (!res.ok) return null;
  return res.json();
}

export async function fetchPublicProfile(username: string) {
  const res = await apiFetch(`/profiles/${username}/`);
  if (!res.ok) throw new Error(`Profile not found: ${res.statusText}`);
  return res.json();
}

export async function fetchUserLibrary() {
  const res = await apiFetch("/books/me/library/");
  const data = await res.json();
  return data.results || data;
}

export async function fetchFollowers() {
  const res = await apiFetch("/profiles/me/followers/");
  const data = await res.json();
  return data.results || data;
}

export async function fetchFollowing() {
  const res = await apiFetch("/profiles/me/following/");
  const data = await res.json();
  return data.results || data;
}

export async function fetchTransactions() {
  const res = await apiFetch("/wallets/transactions/");
  const data = await res.json();
  return data.results || data;
}

export async function fetchCategories() {
  const res = await apiFetch("/books/categories/");
  if (!res.ok) return [];
  const data = await res.json();
  const items = data.results || data;
  return items.map((c: { slug: string; name: string }) => ({
    href: `/books/category/${c.slug}`,
    title: c.name,
    image: `/categories/${c.slug}.png`,
    icon: "BookOpenIcon",
  }));
}
