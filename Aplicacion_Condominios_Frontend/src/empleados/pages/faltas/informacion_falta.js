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
const cookies = new Cookies();
function InformacionFalta() {

    const empleado = cookies.get('empleado_seleccionado');

    const [errors, setErrors] = useState({});

    useEffect(()=>{

    }, []);

    const handleSubmit =  async (e) => {
        e.preventDefault(); 
        const validationErrors = {};

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {

          //window.location.href = "./assignTurn";
        }
    };

    const cambiarMotivoFalta = ()  => {

      
  
    }
    
    return (
      <>
        <MDBContainer fluid>
          <MDBRow className="d-flex justify-content-center align-items-center">
            <MDBCol lg="9" className="my-5">
              <MDBRow>
                <MDBCol className="d-flex align-items-center justify-content-center">
                  <h1 class="mb-4">Informacion de la falta</h1>
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
                          {empleado.contracts[0].fecha_inicio}
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
                          {empleado.contracts[0].fecha_final === null
                            ? "Indefinido"
                            : empleado.contracts[0].fecha_final}
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
                        <p className="mb-0">{empleado.contracts[0].area}</p>
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
                        <p className="mb-0">{empleado.contracts[0].cargo}</p>
                      </div>
                    </div>
                  </div>

                  <hr className="mx-n3" />

                  <MDBRow>
                    <MDBCol>
                      <h4 className="mb-3">Detalles de la falta</h4>

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
                            <strong className="mb-0">Fecha de la falta:</strong>
                            <p className="mb-0">
                              {empleado.nombre} {empleado.apellido}
                            </p>
                          </div>
                        </div>
                      </div>
                    </MDBCol>
                  </MDBRow>

                  <hr className="mx-n3" />

                  <MDBRow>
                    <MDBCol>
                      <h4 className="mb-3">Motivo de la falta</h4>
                      <div className="d-flex flex-start w-100">
                            
                            <MDBTextArea onChange={cambiarMotivoFalta} id='textAreaExample' rows={4} style={{ backgroundColor: '#fff' }} wrapperClass="w-100" />
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
                        onClick={handleSubmit}
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
                        onClick={() => (window.location.href = "./control_faltas")}
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
  
  export default InformacionFalta;