import { NextResponse } from 'next/server';

export async function POST(req: Request) {
   try {
      const { refreshToken } = await req.json();
      const baseURL = process.env.BACKEND_URL;

      if (!refreshToken) {
         return NextResponse.json({ message: 'Refresh token not provided' }, { status: 400 });
      }

      const response = await fetch(`${baseURL}/api/auth/refresh`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${refreshToken}`
         },
         body: JSON.stringify({ refreshToken }),
      });
      const { accessToken } = await response.json();

      return NextResponse.json({ accessToken }, { status: 200 });
   } catch (error) {
      return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
   }
}