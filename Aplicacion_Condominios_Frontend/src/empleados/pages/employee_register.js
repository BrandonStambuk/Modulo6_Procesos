import React, { useEffect, useState } from 'react';

import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';

import {
    MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBSelect,
  MDBRadio
  }
  from 'mdb-react-ui-kit';

function EmployeeRegister() {
  
  
  const [errors, setErrors] = useState({});

  useEffect(()=>{

  }, []);

  const [values, setValues] = useState({
    nombre: "",
    apellido : "",
    correo : "",
    celular : "",
    genero : "",
    ci : "",
  });

  const handleInput = (e) => {
    const {name, value} = e.target;
    setValues({
        ...values,
        [name]:value,
    });
  }

  const handleSubmit =  async (e) => {
    e.preventDefault(); 
    const validationErrors = {};

    if(!values.nombre.trim()){
        validationErrors.nombre = "Este campo es obligatorio"
    }

    if(!values.apellido.trim()){
        validationErrors.apellido = "Este campo es obligatorio"
    }

    if(!values.correo.trim()){
        validationErrors.correo = "Este campo es obligatorio"
    }

    if (values.genero !== "F" && values.genero !== "M"){
      validationErrors.genero = "Debe escoger un genero"
    }

    if (!values.celular.trim()) {
        validationErrors.celular = "Este campo es obligatorio";
    }else if (!/^[6-7]\d{7}$/.test(values.celular)) {
        validationErrors.celular = "El número de celular debe comenzar con 6 o 7 y tener exactamente 8 dígitos";
    }

    if(!values.ci.trim()){
      validationErrors.ci = "Este campo es obligatorio"
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {

        const data = new FormData();

        data.append("nombre", values.nombre);
        data.append("apellido", values.apellido);
        data.append("correo", values.correo);
        data.append("celular", values.celular);
        data.append("genero", values.genero);
        data.append("ci", values.ci);
        data.append("estado_contrato", "Sin contrato");
        const res = await axios.post(`http://127.0.0.1:8000/api/add_employee`, data);
        window.location.href = "./";
    }
    
  }

  return (
    <MDBContainer fluid>
      <MDBRow className="justify-content-center align-items-center m-5">
        <MDBCard>
          <MDBCardBody className="px-4">
          <div className="text-center"> 
            <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5">
              Registrar Informacion de Empleado
            </h3>
          </div>

            <MDBRow className="mb-3">
              <MDBCol md="6">
              
                  <label htmlFor="form1" className="form-label fw-bold">Nombre(s):</label>
                <MDBInput
                  name="nombre"
                  size="lg"
                  id="form1"
                  type="text"
                  onBlur={handleInput}
                />
                 {errors.nombre && (
                    <span className="advertencia-creEve">{errors.nombre}</span>
                  )}
              </MDBCol>
             

              <MDBCol md="6">
             
                <label htmlFor="form2" className="form-label fw-bold" >Apellido(s):</label>
                
            
                <MDBInput
                  name="apellido"
                  size="lg"
                  id="form2"
                  type="text"
                  onBlur={handleInput}
                />
                 {errors.apellido && (
                           <span className="advertencia-creEve">{errors.apellido}</span>
                  )}
              </MDBCol>
            </MDBRow>

            <MDBRow className="mb-3">
              <MDBCol md="6">
                  <label htmlFor="form4" className="form-label fw-bold" >Celular:</label>
                  <MDBInput
                    name="celular"
                    size="lg"
                    id="form4"
                    type="number"
                    onBlur={handleInput}
                  />
                  {errors.celular && (
                            <span className="advertencia-creEve">{errors.celular}</span>
                    )}
                </MDBCol>
              <MDBCol md="6">
                <label htmlFor="form3" className="form-label fw-bold" >Correo:</label>
                <MDBInput
                  name="correo"
                  size="lg"
                  id="form3"
                  type="text"
                  onBlur={handleInput}
                />
                 {errors.correo && (
                           <span className="advertencia-creEve">{errors.correo}</span>
                  )}

              </MDBCol>

              
            </MDBRow>

            <MDBRow className="mb-3">


              <MDBCol md="6">
              
                <label htmlFor="form5" className="form-label fw-bold" >C.I.:</label>
                
              
                <MDBInput
                  name="ci"
                  size="lg"
                  id="form5"
                  type="number"
                  onBlur={handleInput}
                />
                {errors.ci && (
                           <span className="advertencia-creEve">{errors.ci}</span>
                  )}
              </MDBCol>
              <MDBCol md="6" className="mb-4">
                
                  <h6 className="fw-bold" style={{ paddingBottom: '15px' }}>Genero: </h6>
                  
                
                <MDBRadio
                  name="genero"
                  id="inlineRadio1"
                  value="F"
                  label="Femenino"
                  inline
                  onBlur={handleInput}
                />
                <MDBRadio
                  name="genero"
                  id="inlineRadio2"
                  value="M"
                  label="Masculino"
                  inline
                  onBlur={handleInput}
                />
               {errors.genero && (
                           <span className="advertencia-creEve">{errors.genero}</span>
                  )}
              </MDBCol>


            </MDBRow>
            <div className="text-center"> 
              <Button block onClick={handleSubmit} style={{ backgroundColor: '#65B8A6', borderColor: '#65B8A6' }}>
                Registrar
              </Button>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBRow>
    </MDBContainer>
  );

};
export default EmployeeRegister;
