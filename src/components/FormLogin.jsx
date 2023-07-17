"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function FormLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        const response = await axios.post("/api/login", {
            email: email,
            password: password
        })
        const user = response.data;
        console.log(user)
        if (user.isAuth) {
            localStorage.setItem('userId', user.id);
            router.push('/eventos');
        } else {
            setError('Invalid email or password');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            {error && <div>{error}</div>}
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" className='input' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className='w-full'>
                <button type="submit" className='bg-blue-500 rounded-lg py-2 px-8 text-white'>Iniciar Sesión</button>
            </div>
        </form>
    );
}