const apiBase = process.env.NEXT_PUBLIC_API_BASE;

export interface User {
  id: string;
  username: string;
  email: string;
  role: "admin" | "member";
  full_name?: string;
  avatar_url?: string;
  bio?: string;
  phone_number?: string;
  created_at: string;
}

export async function getCurrentUser(token: string): Promise<User> {
  const res = await fetch(`${apiBase}/user/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    let errorMessage = `Failed to fetch user: ${res.status} ${res.statusText}`;

    try {
      const err = await res.json();
      if (err?.detail) errorMessage = err.detail;
    } catch {
      // fallback to text if JSON fails
      const text = await res.text();
      if (text) errorMessage = text;
    }

    throw new Error(errorMessage);
  }

  const data: User = await res.json();
  return data;
}
