const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function allCategories() {
   const response = await fetch(`${baseURL}/categories`, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
      },
      credentials: 'include', 
   });

   const data = await response.json();
   return { status: response.status, message: data.message, data: data.data };
}