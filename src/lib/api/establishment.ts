import { Establishment } from "../models";

export async function fetchEstablishments() {
   const response = await fetch("/api/v1/establishments", {
      method: 'GET',
   });
   
   if (!response.ok) throw new Error("Failed to fetch categories");
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