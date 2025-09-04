// import { cookies } from 'next/headers';
// import { NextResponse } from 'next/server';

// export async function POST(req: Request) {
//    try {
//       const { email, password } = await req.json();
//       const baseURL = process.env.BACKEND_URL;

//       if (!email || !password) {
//          return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
//       }

//       const response = await fetch(`${baseURL}/api/auth/login`, {
//          method: 'POST',
//          headers: {
//             'Content-Type': 'application/json',
//          },
//          body: JSON.stringify({ email, password }),
//       });
//       const data = await response.json();

//       const setCookieHeader = response.headers.get('set-cookie');
//       if (setCookieHeader) {
//          // Parse and set them into Next.js cookies
//          const cookieStore = await cookies();

//          // In case there are multiple cookies
//          setCookieHeader.split(',').forEach(cookieStr => {
//             const [cookiePair] = cookieStr.split(';'); // e.g. "refreshToken=abc123"
//             const [name, value] = cookiePair.split('=');
//             cookieStore.set(name.trim(), value.trim(), {
//                httpOnly: true,
//                secure: true,
//                sameSite: 'lax',
//                path: '/',
//             });
//          });
//       }

//       return NextResponse.json(data, { status: 200 });
//    } catch (error) {
//       return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
//    }
// }