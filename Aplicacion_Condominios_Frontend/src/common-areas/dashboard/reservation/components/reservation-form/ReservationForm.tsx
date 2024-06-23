import useCreateReservation from "../../hooks/useCreateReservation";
import Loader from "../../../../components/Loader/Loader";
import "./reservation-form.css";
import { useEffect, useState } from "react";

interface ReservationFormProps {
  idCommonArea: number;
}

export default function ReservationForm({
  idCommonArea,
}: ReservationFormProps) {
  const {
    title,
    date,
    startTime,
    endTime,
    reason,
    numberPeople,
    residents,
    selectedResident,
    handleTitleChange,
    handleDateChange,
    handleStartTimeChange,
    handleEndTimeChange,
    handleReasonChange,
    handleResidentChange,
    handleNumberPeopleChange,
    errorMessage,
    errors,
    onSubmit,
    submitting,
  } = useCreateReservation({ idCommonArea });

  const [disableReasons, setDisableReasons] = useState<string[]>([]);

  useEffect(() => {
    const get = async () => {
      const response = await fetch(
        `http://localhost:8000/api/common-areas/${idCommonArea}/disable-reasons`
      );
      const data = await response.json();
      console.log(data);
      setDisableReasons(data.map((reason: any) => reason.reason));
    };

    get();
  }, [idCommonArea]);

  return (
    <form onSubmit={onSubmit} className="form">
      <div className="form-group">
        <label htmlFor="title">Título</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleTitleChange}
        />
      </div>

      <div className="form-group-container">
        <div
          className="form-group"
          style={{
            flex: "1",
          }}
        >
          <label htmlFor="date">Fecha</label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={handleDateChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="numberOfPeople">Número de personas</label>
          <input
            type="number"
            min={0}
            id="numberOfPeople"
            name="numberOfPeople"
            value={numberPeople}
            onChange={handleNumberPeopleChange}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="time">Hora Inicio</label>
        <input
          type="time"
          id="time"
          name="time"
          value={startTime}
          onChange={handleStartTimeChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="endTime">Hora Finalización</label>
        <input
          type="time"
          id="endTime"
          name="endTime"
          value={endTime}
          onChange={handleEndTimeChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="residente">Residente</label>
        <select
          id="residente"
          name="residente"
          value={selectedResident}
          onChange={handleResidentChange}
        >
          <option value="">Selecciones una opción</option>
          {residents.map((resident) => (
            <option key={resident.id} value={resident.id}>
              {resident.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="description">Motivo</label>
        <textarea
          rows={7}
          id="description"
          name="description"
          value={reason}
          onChange={handleReasonChange}
        ></textarea>
      </div>

      {submitting && (
        <div className="loader-container">
          <Loader />
        </div>
      )}

      {errorMessage !== "" && (
        <div className="errors-container">
          <h3
            style={{
              padding: 0,
              margin: 0,
              textAlign: "center",
            }}
          >
            {errorMessage}
          </h3>

          <ul>
            {errors.map((error, index) => {
              return <li key={index}>{error}</li>;
            })}
          </ul>
        </div>
      )}

      {disableReasons.length > 0 && (
        <ul>
          <h4>Observaciones</h4>
          {disableReasons.map((reason, index) => {
            return <li key={index}>{`🔴 ${reason}`}</li>;
          })}
        </ul>
      )}

      <button className="btn" type="submit">
        Reservar
      </button>
    </form>
  );
}
