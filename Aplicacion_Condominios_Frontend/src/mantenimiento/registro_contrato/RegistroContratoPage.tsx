import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import "./style.css";
import { getSolicitudServicioById } from "../services/maintenance/solicitudMantenimientoService";
import { createContratoPersonal } from "../services/maintenance/contratoService";

const ModalContratoPersonal = ({
  setShowModalContrato,
  solicitudActual,
}: any) => {
  const [show, setShow] = useState(true);

  const [solicitudData, setSolicitudData] = useState<any>(null);
  const [date, setDate] = useState(null);
  const [salario, setSalario] = useState<any>(null);

  const handleHide = () => {
    setShowModalContrato(false);
  };

  //   const handleShow = () => {
  //     setShow(true);
  //   };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response: any = await getSolicitudServicioById(solicitudActual);
    console.log("🚀 ~ getData ~ response:", response);
    if (response.message === undefined) {
      setSolicitudData(response);
    } else {
      setSolicitudData(null);
    }
  };

  const handleClickDate = (date: any) => {
    console.log(date);
    setDate(date);
  };

  const handleBlur = (salario: number) => {
    setSalario(salario);
  };

  const sendData = async () => {
    const dataToSend = {
      idSolicitud: solicitudActual,
      salario: salario,
      fechaInicio: date,
    };

    if (dataToSend.salario !== null && dataToSend.fechaInicio !== null) {
      console.log("DATA", dataToSend);
      await createContratoPersonal(dataToSend);
      alert("Se ha registrado el contrato");
      setShowModalContrato(false);
      window.location.reload();
    } else {
      alert("Todos los campos deben estar llenos");
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleHide}
        backdrop="static"
        id="modalContratoPersonal"
      >
        <Modal.Header closeButton>
          <h6 className="text__coloregPers">
            REGISTRO DE CONTRATO DE PERSONAL EXTERNO
          </h6>
        </Modal.Header>
        <Modal.Body>
          <div id="">
            <div className="row mb-3 mx-3">
              <div className="col-3">
                <label className="fw-bold">Empleado</label>
              </div>
              <div className="col-9">
                <TextField
                  size="small"
                  id=""
                  fullWidth
                  disabled={true}
                  value={solicitudData?.encargado}
                  sx={{
                    height: "35px",
                    "& .MuiInputBase-root": {
                      height: "100%",
                    },
                  }}
                />
              </div>
            </div>

            <div className="row mb-4 mx-3">
              <div className="col-3">
                <label className="fw-bold">Cargo</label>
              </div>
              <div className="col-9">
                <TextField
                  size="small"
                  id=""
                  fullWidth
                  disabled={true}
                  value={solicitudData?.categoria.catnombre}
                  sx={{
                    height: "35px",
                    "& .MuiInputBase-root": {
                      height: "100%",
                    },
                  }}
                  // placeholder="Ingrese Nombre del Empleado"
                />
              </div>
            </div>
            <hr />
            <div className="row my-4 mx-3">
              <div className="col-3">
                <label className="fw-bold">Fecha de Inicio</label>
              </div>
              <div className="col-9">
                <TextField
                  size="small"
                  type="date"
                  id=""
                  fullWidth
                  onChange={(e) => handleClickDate(e.target.value)}
                  sx={{
                    height: "35px",
                    "& .MuiInputBase-root": {
                      height: "100%",
                    },
                  }}
                  // placeholder="Ingrese Nombre del Empleado"
                />
              </div>
            </div>
            <hr />
            <div className="row mb-3 mx-3 mt-4">
              <div className="col-3">
                <label className="fw-bold">Solicitud</label>
              </div>
              <div className="col-9">
                <TextField
                  size="small"
                  id=""
                  fullWidth
                  disabled={true}
                  value={solicitudData?.descripcion}
                  sx={{
                    height: "35px",
                    "& .MuiInputBase-root": {
                      height: "100%",
                    },
                  }}
                  // placeholder="Ingrese Nombre del Empleado"
                />
              </div>
            </div>

            <div className="row mb-4 mx-3">
              <div className="col-3">
                <label className="fw-bold">Destino</label>
              </div>
              <div className="col-9">
                <TextField
                  size="small"
                  id=""
                  fullWidth
                  disabled={true}
                  value={solicitudData?.ubicacion}
                  sx={{
                    height: "35px",
                    "& .MuiInputBase-root": {
                      height: "100%",
                    },
                  }}
                  // placeholder="Ingrese Nombre del Empleado"
                />
              </div>
            </div>
            <hr />
            <div className="row mt-4 mx-3">
              <div className="col-3">
                <label className="fw-bold">Salario</label>
              </div>
              <div className="col-9">
                <TextField
                  size="small"
                  type="number"
                  id=""
                  fullWidth
                  onBlur={(e) => handleBlur(parseInt(e.target.value))}
                  sx={{
                    height: "35px",
                    "& .MuiInputBase-root": {
                      height: "100%",
                    },
                  }}
                  // placeholder="Ingrese Nombre del Empleado"
                />
              </div>
            </div>

            <div className="modal-footerCenter mt-4" onClick={sendData}>
              <div className="button__regPersonal fw-bold pt-2">
                <Link to="" className="block">
                  Registrar
                </Link>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalContratoPersonal;
