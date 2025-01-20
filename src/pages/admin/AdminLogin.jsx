// src/pages/admin/AdminLogin.jsx
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

export function AdminLogin() {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [captchaToken, setCaptchaToken] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('adminToken'));

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!captchaToken) {
            alert('Please complete the CAPTCHA');
            return;
        }

        if (
            credentials.username === import.meta.env.VITE_ADMIN_USERNAME &&
            credentials.password === import.meta.env.VITE_ADMIN_PASSWORD
        ) {
            const token = btoa(Date.now().toString());
            localStorage.setItem('adminToken', token);
            setIsLoggedIn(true);
        }
    };

    if (isLoggedIn) {
        return <Navigate to="/admin/setup-2fa" />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900">
            <form onSubmit={handleLogin} className="bg-slate-800 p-8 rounded-lg">
                <input
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    className="mb-4 p-2 w-full rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    className="mb-4 p-2 w-full rounded"
                />
                <div className="mb-4">
                    <ReCAPTCHA
                        sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                        onChange={setCaptchaToken}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 p-2 rounded text-white"
                    disabled={!captchaToken}
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;