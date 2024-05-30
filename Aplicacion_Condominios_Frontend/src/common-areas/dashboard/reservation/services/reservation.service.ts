import {
  APIResponseReservations,
  CreateReservationDTO,
  Reservation,
} from "../interfaces/reservations";

const API_URL = "http://localhost:8000/api/";

export async function getReservationsByCommonAreaId(
  commonAreaId: number
): Promise<Reservation[]> {
  const response = await fetch(
    `${API_URL}common-areas/${commonAreaId}/reservations`
  );

  const data: APIResponseReservations = await response.json();

  return data.data.reservations;
}

export async function createReservation(reservation: CreateReservationDTO) {
  const response = await fetch(`${API_URL}common-areas/reservations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(reservation),
  });

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }
}
