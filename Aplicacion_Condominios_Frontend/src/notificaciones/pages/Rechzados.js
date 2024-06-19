import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";

export const Rechzados = () => {
  const url = "http://127.0.0.1:8000/api";

  const [notices, setNotices] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: ""
  });

  useEffect(() => {
    axios
      .get(`${url}/avisosRechazados2`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setNotices(response.data);
        } else {
          console.error("Expected an array but got:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error al obtener rechazados:", error);
      });
  }, []);

  const handleShowDeleteModal = (notice) => {
    setSelectedNotice(notice);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedNotice(null);
    setShowDeleteModal(false);
  };

  const handleShowEditModal = (notice) => {
    setSelectedNotice(notice);
    setFormData({
      titulo: notice.titulo,
      descripcion: notice.descripcion
    });
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setSelectedNotice(null);
    setShowEditModal(false);
  };

  const handleDelete = (id) => {
    axios
      .delete(`${url}/avisos/${id}`)
      .then((response) => {
        if (response.status === 200 || response.status === 204) {
          setNotices((prevNotices) => prevNotices.filter((notice) => notice.id !== id));
          handleCloseDeleteModal();
        } else {
          console.error("Failed to delete the notice:", response);
        }
      })
      .catch((error) => {
        console.error("Error al eliminar el aviso:", error);
      });
  };

  const confirmDelete = () => {
    if (selectedNotice) {
      handleDelete(selectedNotice.id);
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    axios
      .put(`${url}/avisos/${selectedNotice.id}`, formData)
      .then((response) => {
        setNotices((prevNotices) =>
          prevNotices.map((notice) =>
            notice.id === selectedNotice.id ? { ...notice, ...response.data } : notice
          )
        );
        handleCloseEditModal();
      })
      .catch((error) => {
        console.error("Error al actualizar el aviso:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h3>Lista de avisos rechazados</h3>
      
      <Table className="mt-3 text-center" size="sm">
        <thead>
          <tr>
            <th>Título</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(notices) && notices.map((notice) => (
            <tr key={notice.id}>
              <td>{notice.titulo}</td>
              <td>
                <Button variant="danger" onClick={() => handleShowDeleteModal(notice)}>Eliminar</Button>
                <Button onClick={() => handleShowEditModal(notice)}>Editar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      
      <Modal 
        show={showDeleteModal}
        onHide={handleCloseDeleteModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedNotice && (
            <p>
              ¿Estás seguro de que deseas eliminar el aviso"?<br/>
              Titulo: <b>{selectedNotice.titulo}</b><br/>
              Descripcion: <b>{selectedNotice.descripcion}</b><br/>
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal 
        show={showEditModal}
        onHide={handleCloseEditModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Editar Aviso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedNotice && (
            <Form onSubmit={handleEdit}>
              <Form.Group controlId="formTitulo">
                <Form.Label>Título</Form.Label>
                <Form.Control
                  type="text"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formDescripcion" className="mt-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Guardar cambios
              </Button>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
