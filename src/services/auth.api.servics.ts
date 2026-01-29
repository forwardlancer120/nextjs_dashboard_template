import { error } from "console";

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
        let errorMessage = 'Failed to sign up';
        try {
            const err = await res.json();
            errorMessage = err.detail || JSON.stringify(err);
        } catch {
            // Ignore JSON parsing errors
            const text = await res.text();
            if (text) {
                errorMessage = text;
            }
        }
        throw new Error(errorMessage);
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
        let errorMessage = 'Failed to sign in';
        try {
            const err = await res.json();
            errorMessage = err.detail || JSON.stringify(err);
        } catch {
            const text = await res.text();
            if (text) {
                errorMessage = text;
            }
        }              
        throw new Error(errorMessage);
    }

    return res.json();
}