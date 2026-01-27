import { Establishment } from "@/@types";

export async function fetchEstablishments() {
   const response = await fetch("/api/v1/establishments", {
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

export async function createEstablishment(establishmentObject: Establishment) {
   const response = await fetch("/api/v1/establishments", {
      method: 'POST',
      body: JSON.stringify(establishmentObject),
   });

   if (!response.ok) throw new Error("Failed to add a category!");
   return response.json();
}

export async function updateEstablishment(establishmentObject: Establishment) {
   const response = await fetch(`/api/v1/establishments/${establishmentObject._id}`, {
      method: 'PUT', 
      body: JSON.stringify(establishmentObject),
   });

   if (!response.ok) throw new Error("Failed to update the establishment!");
   return response.json();
}