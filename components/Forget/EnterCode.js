"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import  Style  from "./SendEmail.module.css";
import axios from "axios";

let Message
export default function EnterCode() {
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            setError(null);
            const email = localStorage.email;
            
            const response = await axios.get(`http://localhost:5142/api/Auth/ConfirmResetPassword?Code=${code}&Email=${email}`);
            if(response.data=="Failed"){
                Message = response.data;
                setError(true);
                setLoading(false);
                return;
            }
            console.log(response.data)
            // Navigate to the reset password page if the code is valid
            // router.push('/ResetPassword');
        } catch (error) {
            console.error('An error occurred:', error);
            setLoading(false);
            setError(error.response ? error.response.data : error.message);
        }
    };

    const handleChange = (event) => {
        setCode(event.target.value);
    };

    return (
        <div>
            <h2>Enter Verification Code</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="code">Code:</label>
                    <input
                        type="text"
                        id="code"
                        value={code}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Verifying...' : 'Verify'}
                    </button>
                </div>
                {error && <p className={Style.error}>{Message}</p>}
            </form>
        </div>
    );
}
