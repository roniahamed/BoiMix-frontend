import { apiRequest } from "@/lib/api/client";

export async function fetchBooks(
  type?: string, 
  filters?: Record<string, string | number | string[]>, 
  page: number = 1,
  searchQuery: string = "",
  pageSize: number = 20
) {
  const queryParams = new URLSearchParams();
  if (type) queryParams.append("type", type);
  
  if (page > 1) queryParams.append("page", String(page));
  if (pageSize) queryParams.append("page_size", String(pageSize));
  if (searchQuery) queryParams.append("search", searchQuery);
  
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        if (Array.isArray(value)) {
          queryParams.append(key, value.join(","));
        } else {
          queryParams.append(key, String(value));
        }
      }
    });
  }
  
  const queryString = queryParams.toString();
  const url = queryString ? `/books/?${queryString}` : `/books/`;
  
  try {
    const data = await apiRequest<any>({ url, method: "GET" });
    return data; // Return full paginated response {count, next, previous, results}
  } catch (err) {
    return { count: 0, results: [] };
  }
}

export async function fetchBookFilters() {
  try {
    const data = await apiRequest<any>({ url: `/books/filters/`, method: "GET" });
    return data;
  } catch (err) {
    return null;
  }
}

export async function fetchBookStatistics() {
  try {
    const data = await apiRequest<any>({ url: `/books/statistics/`, method: "GET" });
    return data;
  } catch (err) {
    return null;
  }
}

export async function fetchBookDetails(slug: string) {
  const data = await apiRequest<any>({ url: `/books/${slug}/`, method: "GET" });
  return data;
}

export async function fetchSearchBooks(
  query: string = "",
  filters?: Record<string, string | number>,
) {
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

  try {
    const data = await apiRequest<any>({ url, method: "GET" });
    return data.results || data;
  } catch (err) {
    return [];
  }
}

export async function fetchSearchSuggestions(query: string) {
  try {
    const data = await apiRequest<any>({
      url: `/search/suggestions/?q=${encodeURIComponent(query)}`,
      method: "GET",
    });
    return data.suggestions || [];
  } catch (err) {
    return [];
  }
}

export async function fetchNearbyBooks(lat: number, lng: number, radius = 5.0) {
  try {
    const data = await apiRequest<any>({
      url: `/locations/nearby/?lat=${lat}&lng=${lng}&radius_km=${radius}`,
      method: "GET",
    });
    return data.results || data;
  } catch (err) {
    return [];
  }
}

export async function searchLocation(query: string) {
  try {
    const data = await apiRequest<any>({
      url: `/locations/search/?q=${encodeURIComponent(query)}`,
      method: "GET",
    });
    return data.results || data;
  } catch (err) {
    return [];
  }
}

export async function reverseGeocode(lat: number, lng: number) {
  try {
    const data = await apiRequest<any>({
      url: `/locations/reverse/?lat=${lat}&lng=${lng}`,
      method: "GET",
    });
    return data;
  } catch (err) {
    return null;
  }
}

export async function fetchPublicProfile(username: string) {
  const data = await apiRequest<any>({ url: `/profiles/${username}/`, method: "GET" });
  return data;
}

export async function fetchUserLibrary() {
  try {
    const data = await apiRequest<any>({ url: "/books/me/library/", method: "GET" });
    return data.results || data;
  } catch (err) {
    return [];
  }
}

export async function fetchPublicUserLibrary(username: string) {
  try {
    const data = await apiRequest<any>({ url: `/books/?owner=${username}`, method: "GET" });
    return data.results || data;
  } catch (err) {
    return [];
  }
}

export async function fetchFollowers() {
  try {
    const data = await apiRequest<any>({ url: "/profiles/me/followers/", method: "GET" });
    return data.results || data;
  } catch (err) {
    return [];
  }
}

export async function fetchFollowing() {
  try {
    const data = await apiRequest<any>({ url: "/profiles/me/following/", method: "GET" });
    return data.results || data;
  } catch (err) {
    return [];
  }
}

export async function fetchTransactions() {
  try {
    const data = await apiRequest<any>({ url: "/wallets/transactions/", method: "GET" });
    return data.results || data;
  } catch (err) {
    return [];
  }
}

export async function fetchCategories() {
  try {
    const data = await apiRequest<any>({ url: "/books/categories/", method: "GET" });
    const items = data.results || data;
    return items.map((c: { slug: string; name: string }) => ({
      href: `/books/category/${c.slug}`,
      title: c.name,
      image: `/categories/${c.slug}.png`,
      icon: "BookOpenIcon",
    }));
  } catch (err) {
    return [];
  }
}
