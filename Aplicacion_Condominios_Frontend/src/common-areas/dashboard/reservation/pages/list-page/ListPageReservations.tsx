import { useEffect, useState } from "react";
import { getAllReservations } from "../../services/reservation.service";

import "./list-page-reservations.css";
import { Reservation } from "../../interfaces/reservations";
import { Link } from "react-router-dom";

export default function ListPageReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    getAllReservations().then((reservations) => {
      setReservations(reservations);
    });
  }, []);

  return (
    <section className="reservations-list-container">
      <header className="reservations-list-header">
        <h2>Reservas</h2>
      </header>

      <div>
        <table className="table">
          <thead>
            <tr style={{ backgroundColor: "#f0f7da" }}>
              <th>Fecha</th>
              <th>Hora de inicio</th>
              <th>Hora de fin</th>
              <th>Razon</th>
              <th>Numero de personas</th>
              <th>Titulo</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {reservations.map((reservation, index) => {
              return (
                <tr key={index}>
                  <td>{reservation.reservationDate.toLocaleDateString()}</td>
                  <td>{reservation.startTime}</td>
                  <td>{reservation.endTime}</td>
                  <td>{reservation.reason}</td>
                  <td>{reservation.numberPeople}</td>
                  <td>{reservation.title}</td>
                  <td>
                    <Link
                      className="btn btn-primary"
                      style={{
                        backgroundColor: "#1976a2",
                        border: "none",
                      }}
                      to={`/areas-comunes/crear-reporte/${reservation.idReservation}`}
                    >
                      Crear Reporte
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
