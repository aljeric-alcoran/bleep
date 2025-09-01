import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
   try {
      const cookieStore = await cookies();
      cookieStore.delete('accessToken');
      cookieStore.delete('refreshToken');
      
      return NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });
   } catch (error) {
      return NextResponse.json({ message: 'Logout failed' }, { status: 500 });
   }
}