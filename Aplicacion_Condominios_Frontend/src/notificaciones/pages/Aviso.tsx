import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';

const Aviso = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const url = "http://localhost:8000/api"

  const handleTituloChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitulo(event.target.value);
  };

  const handleDescripcionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescripcion(event.target.value);
  };

  const handleSaveNotice = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmSave = async () => {
    await axios.post(`${url}/avisos`, { titulo, descripcion });
    console.log('Aviso guardado:', { titulo, descripcion });
    setShowConfirmModal(false);
    setTitulo('');
    setDescripcion('');
  };

  const handleClose = () => {
    setTitulo('');
    setDescripcion('');
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title">Generar Aviso</h1>
              <Form>
                <Form.Group controlId="formNoticeTitle">
                  <Form.Label>Asunto</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese el aviso"
                    value={titulo}
                    onChange={handleTituloChange}
                  />
                </Form.Group>
                <Form.Group controlId="formNoticeSubject" className="mt-7">
                  <Form.Label>Descripcion</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Ingrese la descripcion"
                    value={descripcion}
                    onChange={handleDescripcionChange}
                    rows={5}
                  />
                </Form.Group>
                <div className="form-buttons mt-4" style={{ display: "flex", justifyContent: "center" }}>
                  <Button style={{ width: "auto" }} variant="primary" onClick={handleSaveNotice}>
                    Guardar Aviso
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showConfirmModal} onHide={handleCloseConfirmModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro de que desea guardar este aviso?
        </Modal.Body>
        <Modal.Footer>
          <Button style={{ width: "auto" }} variant="secondary" onClick={handleCloseConfirmModal}>
            Cancelar
          </Button>
          <Button style={{ width: "auto" }} variant="primary" onClick={handleConfirmSave}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Aviso;
