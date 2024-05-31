import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import { Button } from "reactstrap";

// Función para obtener la fecha actual
const getCurrentDate = () => {
  const date = new Date();
  return date.toLocaleDateString();
};

const ComponentToPrint = React.forwardRef(({ titulo, descripcion }, ref) => {
  return (
    <div
    className=" p-5 justify-content-center"
      ref={ref}
    >
      <h2 className="text-center">Aviso Importante</h2>
      <p className="text-right p-4">Fecha: {getCurrentDate()}</p>
      <p>Para: A todos los residentes del Condominio</p>
      <p>De: Administración del Condominio</p>
      <p>Asunto: {titulo}</p>
      <hr />
      <p>Estimados residentes,</p>
      <p>{descripcion}</p>
      <p>
        Para cualquier consulta o emergencia, por favor contacten a la
        administración a través del número de teléfono (123) 456-7890 o el
        correo electrónico admin@condominioxyz.com.
      </p>
      <p>Atentamente:</p>
      <p className="text-center">Administración del Condominio</p>
    </div>
  );
});

const Imprimir = ({ titulo, descripcion }) => {
  const componentRef = useRef();
  return (
    <div className="container mt-5 bg-body-secondary alingn-items-center">
      <div className="p-5">
        <h2>AVISO</h2>
        <div className="mb-3">
          <label>Título:</label>
          <input type="text" value={titulo} readOnly className="form-control" />
        </div>
        <div className="descripcion mb-3">
          <label>Descripción:</label>
          <textarea value={descripcion} readOnly className="form-control" />
        </div>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <ReactToPrint
            trigger={() => (
              <Button style={{ width: "auto" }} className="bg-primary text-white" color="light">
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
        />
      </div>
    </div>
  );
};

export default Imprimir;
