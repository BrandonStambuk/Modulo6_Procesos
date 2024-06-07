import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBTextArea,
  }
  from 'mdb-react-ui-kit';

import axios from 'axios';
import Cookies from 'universal-cookie';
import '../../css/contract_register_style.css'
import Swal from 'sweetalert2';
const cookies = new Cookies();

function InformacionRetraso() {

    const empleado = cookies.get('empleado_seleccionado');

    const [errors, setErrors] = useState({});

    const [motivo, setMotivo] = useState("");


    useEffect(() => {

      verificarMotivo()
      console.log(empleado)

    }, []);

    const registrarMotivo =  async (e) => {
        e.preventDefault(); 
        const validationErrors = {};

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {

          const data = new FormData();

          data.append("motivo", motivo);

          const res = await axios.post(
            `http://127.0.0.1:8000/api/actualizar_motivo/${empleado.id_retraso}`,
            data
          );
    
          if (res.data.status === 200) {
            Swal.fire(
              "Se registro el motivo correctamente",
              "",
              "success"
            );
          }
        }
    };

    const cambiarMotivoRetraso = (event)  => {
      setMotivo(event.target.value);
    }

    const verificarMotivo = ()  => {
      if(empleado.motivo === null){
        setMotivo("")
      }else{
        setMotivo(empleado.motivo)
      }
    }
    
    return (
      <>
        <MDBContainer fluid>
          <MDBRow className="d-flex justify-content-center align-items-center">
            <MDBCol lg="9" className="my-5">
              <MDBRow>
                <MDBCol className="d-flex align-items-center justify-content-center">
                  <h1 class="mb-4">Informacion del retraso</h1>
                </MDBCol>
              </MDBRow>

              <MDBCard>
                <MDBCardBody className="px-4">
                  <div className="employee-info">
                    <h4 className="mb-3 ">Empleado</h4>
                    <div
                      className="employee-details"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        justifyItems: "start",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "1rem",
                        }}
                      >
                        <strong className="mb-0">Nombre:</strong>
                        <p className="mb-0">
                          {empleado.nombre} {empleado.apellido}
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "1rem",
                        }}
                      >
                        <strong className="mb-0">CI:</strong>
                        <p className="mb-0">{empleado.ci}</p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "1rem",
                        }}
                      >
                        <strong className="mb-0">
                          Fecha de inicio de contrato:
                        </strong>
                        <p className="mb-0">
                          {empleado.fecha_inicio}
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "1rem",
                        }}
                      >
                        <strong className="mb-0">
                          Fecha de fin de contrato:
                        </strong>
                        <p className="mb-0">
                          {empleado.fecha_final === null
                            ? "Indefinido"
                            : empleado.fecha_final}
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "1rem",
                        }}
                      >
                        <strong className="mb-0">Area:</strong>
                        <p className="mb-0">{empleado.area}</p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "1rem",
                        }}
                      >
                        <strong className="mb-0">Cargo:</strong>
                        <p className="mb-0">{empleado.cargo}</p>
                      </div>
                    </div>
                  </div>

                  <hr className="mx-n3" />

                  <MDBRow>
                    <MDBCol>
                      <h4 className="mb-3">Detalles del retraso</h4>

                      <div className="employee-info">
                        <div
                          className="employee-details"
                          style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            justifyItems: "start",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              gap: "1rem",
                            }}
                          >
                            <strong className="mb-0">Fecha del retraso:</strong>
                            <p className="mb-0">
                              {empleado.fecha}
                            </p>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              gap: "1rem",
                            }}
                          >
                            <strong className="mb-0">
                              Tiempo del retraso:
                            </strong>
                            <p className="mb-0">
                              {empleado.tiempo_demora}
                            </p>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              gap: "1rem",
                            }}
                          ></div>
                        </div>
                      </div>
                    </MDBCol>
                  </MDBRow>

                  <hr className="mx-n3" />

                  <MDBRow>
                    <MDBCol>
                      <h4 className="mb-3">Motivo del retraso</h4>
                      <div className="d-flex flex-start w-100">
                        <MDBTextArea
                          onChange={cambiarMotivoRetraso}
                          id="textAreaExample"
                          rows={4}
                          style={{ backgroundColor: "#fff" }}
                          wrapperClass="w-100"
                          value={motivo}
                        />
                      </div>
                    </MDBCol>
                  </MDBRow>

                  <hr className="mx-n3" />

                  <MDBRow>
                    <MDBCol className="d-flex align-items-center justify-content-center">
                      <Button
                        block
                        className="my-4"
                        size="lg"
                        onClick={registrarMotivo}
                        style={{
                          backgroundColor: "#65B8A6",
                          borderColor: "#65B8A6",
                        }}
                      >
                        Registrar motivo
                      </Button>
                    </MDBCol>

                    <MDBCol className="d-flex align-items-center justify-content-center">
                      <Button
                        block
                        className="my-4"
                        size="lg"
                        onClick={() =>
                          (window.location.href = "./control_retrasos")
                        }
                        variant="danger"
                      >
                        Atras
                      </Button>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </>
    );
  }
  
  export default InformacionRetraso;