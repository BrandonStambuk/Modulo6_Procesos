import {useState} from "react";
import {Modal} from "react-bootstrap";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import "./style.css";

const ModalContratoPersonal: React.FC = () => {
    const [show,setShow]=useState(true);
    const handleHide = () => {
        setShow(false);
    }
    const handleShow = () => {
        setShow(true);
    }

    return(
        <>
        <button
            onClick = {()=>{handleShow()}}
            className="btn btn-primary">
            Abrir Contrato
        </button>

        <Modal show={show} onHide={handleHide} backdrop="static" id="modalContratoPersonal">
            <Modal.Header closeButton>
                <h6 className="text__coloregPers">REGISTRO DE CONTRATO DE PERSONAL EXTERNO</h6>
            </Modal.Header>
            <Modal.Body>
                <div id="">

                    <div className="row mb-3 mx-3">
                        <div className="col-3">
                            <label className="fw-bold">
                                Empleado
                            </label>
                        </div>
                        <div className="col-9">
                            <TextField
                            size="small"
                            id=""
                            fullWidth
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
                            <label className="fw-bold">
                                Cargo
                            </label>
                        </div>
                        <div className="col-9">
                            <TextField
                            size="small"
                            id=""
                            fullWidth
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
                            <label className="fw-bold">
                                Fecha de Inicio
                            </label>
                        </div>
                        <div className="col-9">
                            <TextField
                            size="small"
                            type="date"
                            id=""
                            fullWidth
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
                            <label className="fw-bold">
                                Solicitud
                            </label>
                        </div>
                        <div className="col-9">
                            <TextField
                            size="small"
                            id=""
                            fullWidth
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
                            <label className="fw-bold">
                                Destino    
                            </label>
                        </div>
                        <div className="col-9">
                            <TextField
                            size="small"
                            id=""
                            fullWidth
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
                            <label className="fw-bold">
                                Salario
                            </label>
                        </div>
                        <div className="col-9">
                            <TextField
                            size="small"
                            type="number"
                            id=""
                            fullWidth
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

                    <div className="modal-footerCenter mt-4">
                        <div className="button__regPersonal fw-bold pt-2">
                            <Link
                            to=""
                            className="block"
                            >
                            Registrar
                            </Link>
                        </div>
                    </div>

                </div>
            </Modal.Body>
        </Modal>

        </>
    )

};

export default ModalContratoPersonal;   