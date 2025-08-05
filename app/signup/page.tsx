'use client';

import { redirect } from 'next/navigation';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://dubtitle.com/api';

export default function Signup() {
  redirect(`${API_BASE_URL}/signup`);
}