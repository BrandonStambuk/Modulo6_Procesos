export interface APIResponseReservations {
  data: Data;
}

export interface Data {
  reservations: Reservation[];
}

export interface Reservation {
  idCommonArea: number;
  idReservation: number;
  reservationDate: Date;
  startTime: string;
  endTime: string;
  reason: string;
  numberPeople: number;
  title: string;
  reserva_pagada: number;
}

export interface CreateReservationDTO {
  idResident: number;
  idCommonArea: number;
  reservationDate: string;
  startTime: string;
  endTime: string;
  reason: string;
  numberPeople: number;
  title: string;
}
