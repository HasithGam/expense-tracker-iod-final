//UseAuth.js
import React, { useState } from 'react'
const baseApi = `${process.env.NEXT_PUBLIC_API_URL}`;



const useAuth = () => {
    const { user, setUser } = useState(null);

    const login = async (email, password) => {
        try {
            const response = await fetch(`${baseApi}/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application-json"
                },
                body: JSON.stringify({ email, password })
            })
            const data = await response.json();

            if (!response.ok) {
                console.log("Login failed!", data.error);
            }
            else {
                localStorage.setItem("token", data.token);
                setUser(data.user);
            }
        }
        catch (err) {
            console.log("Login failed!", err);
        }
    }

    const logOut = () => {
        localStorage.removeItem("token");
        setUser(null);
    }

    const getToken = () => { localStorage.getItem("token") }

    return {
        user, getToken, login, logOut,
    }
}

export default useAuth