import { Establishment } from "@/@types";
import { api } from "./client";

export async function fetchEstablishments() {
  return api.get("/api/v1/establishments");
}

export async function createEstablishment(
  establishmentObject: Establishment
) {
  return api.post("/api/v1/establishments", establishmentObject);
}

export async function updateEstablishment(
  establishmentObject: Establishment
) {
  return api.put(
    `/api/v1/establishments/${establishmentObject._id}`,
    establishmentObject
  );
}
