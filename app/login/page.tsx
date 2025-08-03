'use client';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.subgen.in';

export default function Login() {
  const handleLogin = () => {
    window.location.href = `${API_BASE_URL}/login`;
  };

  return <button onClick={handleLogin}>Login</button>;
}