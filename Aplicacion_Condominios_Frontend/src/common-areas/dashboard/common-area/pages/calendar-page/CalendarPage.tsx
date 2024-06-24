import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "dayjs/locale/es";

import { Reservation } from "../../../reservation/interfaces/reservations";
import {
  getCommonAreaById,
  getNameCommonAreaById,
} from "../../services/common-area.service";
import { getReservationsByCommonAreaId } from "../../../reservation/services/reservation.service";

import "./calendar-page.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CommonArea } from "../../interfaces/common-areas";

dayjs.locale("es");

interface Event {
  title: string;
  start: Date;
  end: Date;
  reason: string;
}

export default function CalendarPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const localizer = dayjsLocalizer(dayjs);

  const [events, setEvents] = useState<Event[]>([]);
  const [commonAreaName, setCommonAreaName] = useState<string>("");
  const [commonArea, setCommonArea] = useState<CommonArea | null>(null);

  const components = {
    event: (props: any) => {
      return (
        <div className="event-card">
          <div>{props.event.title}</div>
          <div>{props.event.reason}</div>
        </div>
      );
    },
  };

  useEffect(() => {
    getReservationsByCommonAreaId(Number(id)).then(
      (reservations: Reservation[]) => {
        const events: Event[] = reservations.map((reservation) => ({
          title: `${reservation.title} - ${
            reservation.reserva_pagada === 1 ? "Pagado" : "No Pagado"
          }`,
          start: dayjs(
            `${reservation.reservationDate}T${reservation.startTime}`
          ).toDate(),
          end: dayjs(
            `${reservation.reservationDate}T${reservation.endTime}`
          ).toDate(),
          reason: reservation.reason,
        }));

        setEvents(events);
      }
    );
  }, [id]);

  useEffect(() => {
    getNameCommonAreaById(Number(id)).then((name) => {
      setCommonAreaName(name);
    });

    getCommonAreaById(Number(id)).then((commonArea) => {
      setCommonArea(commonArea);
    });
  }, [id]);

  const navigateToReservation = () => {
    navigate(`/areas-comunes/reservar/${id}`);
  };

  const messages = {
    allDay: "Todo el día",
    previous: "Anterior",
    next: "Siguiente",
    today: "Hoy",
    month: "Mes",
    week: "Semana",
    day: "Día",
    agenda: "Agenda",
    date: "Fecha",
    time: "Hora",
    event: "Evento",
    noEventsInRange: "Sin eventos",
  };

  return (
    <section className="calendar-container">
      <header>
        <h1>Calendario - Área Común {commonAreaName}</h1>
      </header>

      <div className="calendar-content">
        <Calendar
          localizer={localizer}
          events={events}
          messages={messages}
          onSelectEvent={(event) => {
            console.log(event);
          }}
          components={components}
        />
      </div>

      <div className="calendar-actions">
        {commonArea !== null && (
          <button
            disabled={!commonArea.available}
            style={{
              opacity: commonArea.available ? "1" : ".5",
            }}
            className="calendar-action-link register-reservation"
            onClick={navigateToReservation}
          >
            Registrar Reserva
          </button>
        )}
      </div>
    </section>
  );
}
