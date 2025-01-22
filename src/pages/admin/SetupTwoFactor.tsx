// src/pages/admin/SetupTwoFactor.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as OTPAuth from 'otpauth';
import { QRCodeCanvas } from 'qrcode.react';

export default function SetupTwoFactor() {
    const [qrCode, setQrCode] = useState('');
    const [secret, setSecret] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [isSetup, setIsSetup] = useState(localStorage.getItem('twoFactorSetup'));

    useEffect(() => {
        if (!isSetup) {
            // Generate new TOTP secret
            const totp = new OTPAuth.TOTP({
                issuer: "DustUp Admin",
                label: import.meta.env.VITE_ADMIN_USERNAME,
                algorithm: "SHA1",
                digits: 6,
                period: 30,
                secret: OTPAuth.Secret.random()
            });

            setSecret(totp.secret.base32);
            setQrCode(totp.toString());
        }
    }, []);

    const verifySetup = () => {
        const totp = new OTPAuth.TOTP({
            issuer: "DustUp Admin",
            label: import.meta.env.VITE_ADMIN_USERNAME,
            algorithm: "SHA1",
            digits: 6,
            period: 30,
            secret: secret
        });

        if (totp.validate({ token: verificationCode, window: 1 }) !== null) {
            localStorage.setItem('twoFactorSetup', 'true');
            localStorage.setItem('twoFactorSecret', secret);
            setIsSetup(true);
        } else {
            alert('Invalid verification code');
        }
    };

    const navigate = useNavigate();

    if (isSetup) {
        navigate('/admin/dashboard');
        return null;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900">
            <div className="bg-slate-800 p-8 rounded-lg text-white">
                <h2 className="text-xl mb-4">Setup Two-Factor Authentication</h2>
                <div className="mb-4">
                    <QRCodeCanvas value={qrCode} size={200} />
                </div>
                <p className="mb-4">Or enter this secret manually: {secret}</p>
                <input
                    type="text"
                    placeholder="Enter verification code"
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="mb-4 p-2 w-full rounded text-black"
                />
            <button
                onClick={verifySetup}
                className="w-full bg-blue-500 p-2 rounded"
            >
                Verify and Enable 2FA
            </button>
        </div>
    </div>
);
}
