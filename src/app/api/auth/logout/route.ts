import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function POST() {
   try {
      const response = await fetch(`${baseURL}/auth/logout`, {
         method: 'POST',
      });
      const data = await response.json();
      const cookieStore = await cookies();
      cookieStore.delete('accessToken');
      cookieStore.delete('refreshToken');
      
      return NextResponse.json({ message: data.message }, { status: 200 });
   } catch (error) {
      return NextResponse.json({ message: 'Logout failed' }, { status: 500 });
   }
}