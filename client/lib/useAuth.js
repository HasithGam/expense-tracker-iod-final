"use client";
import React, { useState, useEffect } from 'react';

const baseApi = `${process.env.NEXT_PUBLIC_API_URL}`;

const useAuth = () => {
    const [user, setUser] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedUser = localStorage.getItem('user');
            return savedUser ? JSON.parse(savedUser) : null;
        }
        return null;
    });

    const login = async (email, password) => {
        try {
            const response = await fetch(`${baseApi}/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Login failed');
            }
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            setUser(data.user);
            return { success: true, message: "Login successful!" };
        } catch (err) {
            console.log("Login failed!", err);
            return { success: false, message: err.message || "Login failed. Please try again later." };
        }
    };

    const logOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };

    const getToken = () => {
        return localStorage.getItem("token");
    };

    useEffect(() => {
        const handleStorageChange = () => {
            const savedUser = localStorage.getItem('user');
            setUser(savedUser ? JSON.parse(savedUser) : null);
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return {
        user,
        getToken,
        login,
        logOut
    };
};

export default useAuth;
