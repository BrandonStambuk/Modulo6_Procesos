import {
  APIResponseReservations,
  CreateReservationDTO,
  Reservation,
} from "../interfaces/reservations";

const API_URL = "http://localhost:8000/api/";

export async function getAllReservations(): Promise<Reservation[]> {
  const response = await fetch(`${API_URL}common-areas/reservations`);

  const data: Reservation[] = await response.json();

  const formattedData = data
    .filter((reservation) => !reservation.cancelled)
    .map((reservation) => {
      return {
        ...reservation,
        reservationDate: new Date(reservation.reservationDate),
      };
    });

  return formattedData;
}

export async function getReservationsByCommonAreaId(
  commonAreaId: number
): Promise<Reservation[]> {
  const response = await fetch(
    `${API_URL}common-areas/${commonAreaId}/reservations`
  );

  const data: APIResponseReservations = await response.json();

  return data.data.reservations.filter((reservation) => !reservation.cancelled);
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

export async function getReservationById(id: number): Promise<Reservation> {
  const response = await fetch(`${API_URL}common-areas/reservations/${id}`);

  const data: Reservation = await response.json();

  return data;
}
