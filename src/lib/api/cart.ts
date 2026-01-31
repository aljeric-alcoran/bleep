export async function fetchCartItems() {
   const response = await fetch("/api/v1/cart", {
      method: 'GET',
   });

   if (!response.ok) {
      const error = await response.json();
      throw {
         status: response.status,
         message: error.message || error.error || "Request failed"
      };
   }

   return response.json();
}