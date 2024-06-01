import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";

function ModalBeneficios({ onGuardar, beneficioToEdit }) {
  const [show, setShow] = useState(false);
  const [beneficio, setBeneficio] = useState("");
  const [costo, setCosto] = useState("Mixto");
  const [costoEmpresa, setCostoEmpresa] = useState("");
  const [costoEmpleado, setCostoEmpleado] = useState("");
	const [errorNombre, setErrorNombre] = useState("");
  const [errorCostoEmpresa, setErrorCostoEmpresa] = useState("");
  const [errorCostoEmpleado, setErrorCostoEmpleado] = useState("");

  useEffect(()=>{
    if(beneficioToEdit){
      setBeneficio(beneficioToEdit.name);
      setCosto(beneficioToEdit.cost);
      setCostoEmpresa(beneficioToEdit.costEmpr);
      setCostoEmpleado(beneficioToEdit.costEmpl);
      setShow(true);
    }
  },[beneficioToEdit]);

  const handleClose = () => {
		setShow(false);
		setErrorNombre("");
    setErrorCostoEmpresa("");
    setErrorCostoEmpleado("");
	}

  const handleShow = () => {
    setBeneficio("");
    setCosto("Mixto");
    setCostoEmpresa("");
    setCostoEmpleado("");
    beneficioToEdit = null;
    setShow(true);
  }

  const costoChange = (e) => {
    setCosto(e.target.value);
    if(e.target.value === "Empleado"){
      setCostoEmpresa("");
    }else{
      setCostoEmpleado("");
    }
  };

  const validateFields = () => {
    let flag = false;
    if (!beneficio.trim()) {
      flag = true;
      setErrorNombre("El nombre del beneficio es obligatorio.");
    }
    if (!costoEmpresa.trim() && (costo === "Mixto" || costo === "Empresa")) {
      flag = true;
      setErrorCostoEmpresa("El costo-empresa es obligatorio.");
    }
    if (!costoEmpleado.trim() && (costo === "Mixto" || costo === "Empleado")) {
      flag = true;
      setErrorCostoEmpleado("El costo-empleado es obligatorio.");
    }
    return flag;
  }

  const saveData = () => {
    if (validateFields()) {
      return;
    }

    const nuevoBeneficio = {
      id: (beneficioToEdit) ? beneficioToEdit.id : 0,
      name: beneficio,
      cost: costo,
      costEmpr: costo === "Empleado" ? "S/C" : costoEmpresa,
      costEmpl: costo === "Empresa" ? "S/C" : costoEmpleado,
    };

    onGuardar(nuevoBeneficio); 
    setBeneficio("");
    setCosto("Mixto");
    setCostoEmpresa("");
    setCostoEmpleado("");
		handleClose();
  };

	const handleNombreChange = (e) => {
    setBeneficio(e.target.value);
    setErrorNombre("");
  };

  const handleCostoEmpresaChange = (e) => {
    setCostoEmpresa(e.target.value);
    setErrorCostoEmpresa("");
  };

  const handleCostoEmpleadoChange = (e) => {
    setCostoEmpleado(e.target.value);
    setErrorCostoEmpleado("");
  };

  return (
    <>
      <Button onClick={handleShow} style={{ backgroundColor: '#65B8A6', borderColor: '#65B8A6' }}>
        Agregar
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        size="ms"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>
                <b>Nombre de Beneficio</b>
              </Form.Label>
              <Form.Control
                type="text"
                value={beneficio}
                onChange={(e) => handleNombreChange(e)}
                autoFocus
								isInvalid={errorNombre}
              />
							<Form.Control.Feedback type="invalid">
                {errorNombre}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>
                <b>Asignar un Costo</b>
              </Form.Label>
              <Form.Select
                aria-label="Default select"
                value={costo}
                onChange={(e) => costoChange(e)}
              >
                <option value="Mixto">Mixto</option>
                <option value="Empresa">Empresa</option>
                <option value="Empleado">Empleado</option>
              </Form.Select>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>
                <b>Costo-Empresa</b>
              </Form.Label>
              <InputGroup>
                <Form.Control 
									aria-label="Dollar amount (with dot and two decimal places)"
									disabled={costo === "Empleado"} 
									value={costoEmpresa}
									onChange={(e) => handleCostoEmpresaChange(e)}
									isInvalid={errorCostoEmpresa}
								/>
                <InputGroup.Text>Bs</InputGroup.Text>
                <InputGroup.Text>M</InputGroup.Text>
								<Form.Control.Feedback type="invalid">
                  {errorCostoEmpresa}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>
                <b>Costo-Empleado</b>
              </Form.Label>
              <InputGroup>
                <Form.Control 
									aria-label="Dollar amount (with dot and two decimal places)"
									disabled={costo === "Empresa"}
                  value={costoEmpleado}
                  onChange={(e) => handleCostoEmpleadoChange(e)}
									isInvalid={errorCostoEmpleado}
								/>
                <InputGroup.Text>Bs</InputGroup.Text>
                <InputGroup.Text>M</InputGroup.Text>
								<Form.Control.Feedback type="invalid">
                  {errorCostoEmpleado}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => saveData()}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalBeneficios;