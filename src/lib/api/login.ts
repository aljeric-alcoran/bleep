export default async function loginUser({ email, password }: { email: string, password: string }) {
   const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
   });
   return response.json();
}