"use client"
import React, { useEffect, useState } from 'react';
import './login.css';
import useAuth from '@/lib/useAuth';
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [loginError, setLoginError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  


  const handleLogin = async (e) => {
    e.preventDefault();
    try {

      let hasError = false;
      setNameError("");
      setEmailError("");
      setPasswordError("");

      if (email.trim() === "") {
      setEmailError("Please enter a valid email address.");
      hasError = true;
      }

      if (password.trim() === "") {
        setPasswordError("Your password must contain between 4 and 60 characters.");
        hasError = true;
      }

      if (hasError) return;

      await login(email, password);
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      setPasswordError("Your username or password is incorrect!");
    }
  }

  return (
    <div className='login'>
      <div className='container'>
        <div className='login-form'>
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <>
              <input
                value={email}
                className={`text-style`}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
              />
              {emailError && <p className="error-message">{emailError}</p>}
            </>
            <>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
              {emailError && <p className="error-message">{emailError}</p>}
            </>
            <button type="submit">Login</button>
            {emailError && <p className="error-message">{emailError}</p>}
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
