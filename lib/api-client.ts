export const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // Browser should use relative path
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  return "http://localhost:3000"; // Default for local SSR
};

export async function fetchProfile(username: string) {
  const res = await fetch(`${getBaseUrl()}/api/profile?username=${username}`);
  if (!res.ok) return null;
  return res.json();
}

export async function fetchBooks(type?: string) {
  const url = type ? `${getBaseUrl()}/api/books?type=${type}` : `${getBaseUrl()}/api/books`;
  const res = await fetch(url);
  return res.json();
}

export async function fetchTransactions() {
  const res = await fetch(`${getBaseUrl()}/api/wallet/transactions`);
  return res.json();
}
