import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import { Button } from "reactstrap";

const ComponentToPrint = React.forwardRef(
  ({ titulo, descripcion, fechaComunicacion, fechaRealizacion }, ref) => {
    return (
      <div
        className="p-5 "
        ref={ref}
        style={{ textAlign: "center", paddingTop: "10px" }}
      >
        <h2 className="h1">{titulo}</h2>
        <p>{descripcion}</p>
        <p>Fecha de comunicación: {fechaComunicacion}</p>
        <p>Fecha de realización: {fechaRealizacion}</p>
        <p>Atte: Direcciones</p>
      </div>
    );
  }
);

const Imprimir = ({
  titulo,
  descripcion,
  fechaComunicacion,
  fechaRealizacion,
  setFechaComunicacion,
  setFechaRealizacion,
}) => {
  const componentRef = useRef();

  const handleFechaComunicacionChange = (e) =>
    setFechaComunicacion(e.target.value);
  const handleFechaRealizacionChange = (e) =>
    setFechaRealizacion(e.target.value);

  return (
    <div className="container mt-5 bg-body-secondary">
      <div className="p-5">
        <h2>Notificación</h2>
        <div className="mb-3">
          <label>Título:</label>
          <input type="text" value={titulo} readOnly className="form-control" />
        </div>
        <div className="descripcion mb-3">
          <label>Descripción:</label>
          <textarea value={descripcion} readOnly className="form-control" />
        </div>
        <div className="mb-3">
          <label>Fecha de comunicación:</label>
          <input
            type="date"
            value={fechaComunicacion}
            onChange={handleFechaComunicacionChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Fecha de realización:</label>
          <input
            type="date"
            value={fechaRealizacion}
            onChange={handleFechaRealizacionChange}
            className="form-control"
          />
        </div>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <ReactToPrint
            trigger={() => (
              <Button className="bg-primary text-white" color="light">
                Imprimir
              </Button>
            )}
            content={() => componentRef.current}
          />
        </div>
      </div>
      <div style={{ display: "none" }}>
        <ComponentToPrint
          ref={componentRef}
          titulo={titulo}
          descripcion={descripcion}
          fechaComunicacion={fechaComunicacion}
          fechaRealizacion={fechaRealizacion}
        />
      </div>
    </div>
  );
};

export default Imprimir;
