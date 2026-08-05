// Imports removed for clean API integration

 
export async function fetchLocal(
  endpoint: string,
  options?: RequestInit,
): Promise<unknown> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  // Map profile route
  if (endpoint.includes("/api/profile")) {
    const url = new URL(endpoint, "http://localhost:3000");
    const username = url.searchParams.get("username");
    if (username) {
      try {
        const res = await fetch(`${baseUrl}/api/v1/profiles/${username}/`, {
          cache: "no-store",
          ...options,
        });
        if (res.ok) {
          const profile = await res.json();
          // Backend returns a single profile object, frontend expects `{ profile, books, reviews, activity }`
          // Note: we'll have to adapt the shape if necessary.
          return { profile, books: [], reviews: [], activity: [] };
        }
      } catch (e) {
        console.error("fetchLocal error profile:", e);
      }
    }
  }

  // Map categories
  if (endpoint.includes("/api/categories")) {
    try {
      const res = await fetch(`${baseUrl}/api/v1/books/categories/`, {
        cache: "no-store",
        ...options,
      });
      if (res.ok) {
        const backendCategories = await res.json();
        // Map backend schema to frontend schema
        return backendCategories.map((c: { slug: string; name: string }) => ({
          href: `/books/category/${c.slug}`,
          title: c.name,
          image: `/categories/${c.slug}.png`,
          icon: "BookOpenIcon",
        }));
      }
    } catch {
      // ignore
    }
    return [];
  }

  // Map books detail (single book)
  if (endpoint.match(/\/api\/books\/[\w-]+/)) {
    const parts = endpoint.split("/");
    const idOrSlug = parts[parts.length - 1];
    try {
      // Books endpoint in backend handles book listings
      const res = await fetch(`${baseUrl}/api/v1/books/${idOrSlug}/`, {
        cache: "no-store",
        ...options,
      });
      if (res.ok) return await res.json();
    } catch {
      // ignore
    }
  }

  // Map books list
  if (endpoint.includes("/api/books")) {
    try {
      const res = await fetch(`${baseUrl}/api/v1/books/`, {
        cache: "no-store",
        ...options,
      });
      if (res.ok) {
        const data = await res.json();
        // Django paginated response `{ results: [...] }`
        return data.results || data;
      }
    } catch {
      // ignore
    }
    return [];
  }

  // Map book search
  if (endpoint.includes("/api/search/books")) {
    try {
      const url = new URL(endpoint, "http://localhost:3000");
      const qs = url.search;
      const res = await fetch(`${baseUrl}/api/v1/search/books/${qs}`, {
        cache: "no-store",
        ...options,
      });
      if (res.ok) {
        const data = await res.json();
        // Django elasticsearch response returns { results: [...] }
        // We map BookSearchResultSerializer to BookCardBook
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return data.results.map((r: any) => ({
          id: r.id,
          title: r.title,
          author: r.author,
          rating: 4.5,
          reviewCount: 0,
          coverUrl:
            "https://m.media-amazon.com/images/I/41K-Lsc8w5L._SY445_SX342_.jpg", // fallback
          providerType: "library",
          providerName: "Central Library",
          tags: ["library", r.genre, r.condition].filter(Boolean),
          availability: r.availability_mode,
        }));
      }
    } catch {
      // ignore
    }
    return [];
  }

  // Map search suggestions
  if (endpoint.includes("/api/search/suggestions")) {
    try {
      const url = new URL(endpoint, "http://localhost:3000");
      const qs = url.search;
      const res = await fetch(`${baseUrl}/api/v1/search/suggestions/${qs}`, {
        cache: "no-store",
        ...options,
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // ignore
    }
    return { suggestions: [] };
  }

  // Fallbacks for endpoints that are not yet connected to the backend
  if (endpoint.includes("/api/profile")) return null;
  if (endpoint.includes("/api/categories")) return [];
  if (endpoint.includes("/api/readers")) return [];
  if (endpoint.includes("/api/community")) return [];
  if (endpoint.includes("/api/sponsors")) return [];
  if (endpoint.includes("/api/testimonials")) return [];
  if (endpoint.includes("/api/orders/tracking")) return [];
  if (endpoint.includes("/api/authors/humayun-ahmed/books")) return [];

  if (endpoint.includes("/api/books/")) {
    return null;
  }

  if (endpoint.includes("/api/books")) return [];

  return {};
}
