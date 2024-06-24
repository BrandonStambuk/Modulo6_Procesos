import { useEffect } from "react";

import Loader from "../../../../components/Loader/Loader";
import useCreateCommonArea from "../../hooks/useCreateCommonArea";

import "./common-area.css";

const DAYS = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

interface CommonAreaFormProps {
  id?: number;
  isEditing?: boolean;
}

export default function CommonAreaForm({
  id,
  isEditing = false,
}: CommonAreaFormProps) {
  const {
    addPolicy,
    capacity,
    description,
    error,
    errors,
    handleSubmit,
    horarios,
    name,
    policies,
    policy,
    enableEdit,
    submitting,
    urlImage,
    setFile,
    setCapacity,
    setDescription,
    setCheckbox,
    setEndHour,
    setName,
    setPolicy,
    setStartHour,
    setData,
    setOldData,
    deletePolicy,
    // setAvailable,
  } = useCreateCommonArea({ isEditing, id });

  useEffect(() => {
    if (isEditing) {
      const fetchCommonArea = async () => {
        const response = await fetch(
          `http://localhost:8000/api/common-areas/${id}`
        );
        const {
          data: { commonArea },
        } = await response.json();
        setData(commonArea);
        setOldData(commonArea);
      };

      fetchCommonArea();
    }
  }, [id, isEditing]);

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="form"
    >
      <div className="name-capacity-container">
        <div
          className="form-group"
          style={{
            width: "100%",
          }}
        >
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={setName}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="capacity">Capacidad:</label>
          <input
            type="number"
            id="capacity"
            value={capacity}
            onChange={setCapacity}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="description">Descripción:</label>
        <textarea
          style={{
            resize: "none",
            minHeight: "100px",
          }}
          id="description"
          value={description}
          onChange={setDescription}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="image">Imagen</label>

        {urlImage && (
          <img className="image-common-area" src={urlImage} alt="" />
        )}

        <input type="file" id="image" onChange={setFile} />
      </div>

      <div className="form-group">
        <h3>Horario</h3>
        {horarios.map((horario, index) => (
          <div key={index} className="schedule-container">
            <div
              className="hour-container"
              style={{
                opacity: horario.isChecked ? 1 : 0.4,
              }}
            >
              <p>{DAYS[horario.day]}:</p>

              <div className="hour-inputs-container">
                <input
                  type="time"
                  value={horario.startHour}
                  onChange={(e) => setStartHour(e, index)}
                  disabled={!horario.isChecked}
                />
                <input
                  type="time"
                  value={horario.endHour}
                  onChange={(e) => setEndHour(e, index)}
                  disabled={!horario.isChecked}
                />
              </div>
            </div>

            <label>
              <input
                style={{
                  cursor: "pointer",
                }}
                type="checkbox"
                checked={horario.isChecked}
                onChange={() => setCheckbox(index)}
              />
            </label>
          </div>
        ))}
      </div>

      <div className="form-group">
        <h3>Políticas/Reglas</h3>

        <ul className="policies">
          {policies.map((policy, index) => (
            <li className="policy" key={index}>
              <span>{policy}</span>
              <button
                type="button"
                className="delete-policy"
                onClick={() => deletePolicy(index)}
              >
                X
              </button>
            </li>
          ))}
        </ul>

        <div className="policy-container">
          <textarea
            style={{
              resize: "none",
              minHeight: "100px",
            }}
            value={policy}
            onChange={setPolicy}
            placeholder="Escribe una política/regla"
          />

          <button type="button" className="btn-add-policy" onClick={addPolicy}>
            Agregar
          </button>
        </div>
      </div>

      {submitting && (
        <div className="loader-container">
          <Loader />
        </div>
      )}

      {error !== "" && (
        <div className="errors-container">
          <h3
            style={{
              padding: 0,
              margin: 0,
              textAlign: "center",
            }}
          >
            {error}
          </h3>

          <ul>
            {errors.map((error, index) => {
              return <li key={index}>{error}</li>;
            })}
          </ul>
        </div>
      )}

      <input
        type="submit"
        value={isEditing ? "Actualizar" : "Registrar"}
        className="btn-submit"
        style={{
          opacity: isEditing && !enableEdit ? 0.5 : 1,
          cursor: isEditing && !enableEdit ? "not-allowed" : "pointer",
        }}
        disabled={isEditing && !enableEdit}
      />
    </form>
  );
}
