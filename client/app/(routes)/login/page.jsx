"use client"
import React, { useEffect, useState } from 'react';
import './login.css';
import useAuth from '@/lib/useAuth';
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const { login } = useAuth();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      // error message
    }
  }

  return (
    <div className='login'>
      <div className='container'>
        <div className='login-form'>
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <input
              value={email}
              className={`text-style`}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
            <button type="submit">Login</button>
            <div className="form-help">
              <div className="remember">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember" className="checkmark">Remember Me</label>
              </div>
              <p>Need Help?</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
