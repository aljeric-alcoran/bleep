export async function fetchEstablishments() {
   const response = await fetch("/api/v1/establishments", {
      method: 'GET',
   });
   
   if (!response.ok) throw new Error("Failed to fetch categories");
   return response.json();
}