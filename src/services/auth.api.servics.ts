const apiBase = process.env.NEXT_PUBLIC_API_BASE;

export async function signUpWithEmail(payload: {username: string, email: string, password: string }) {
    const res = await fetch(`${apiBase}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if(!res.ok) {
        const err = await res.json();
        throw new Error(err || 'Failed to sign up');
    }

    return res.json();
}

export async function signInWithEmail(payload: {email: string, password: string }) {
    const res = await fetch(`${apiBase}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if(!res.ok) {
        const err = await res.json();
        throw new Error(err || 'Failed to sign in');
    }

    return res.json();
}