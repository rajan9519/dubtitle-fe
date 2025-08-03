import { redirect } from 'next/navigation';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.subgen.in';

export default async function Login() {
  redirect(`${API_BASE_URL}/login`);
} 