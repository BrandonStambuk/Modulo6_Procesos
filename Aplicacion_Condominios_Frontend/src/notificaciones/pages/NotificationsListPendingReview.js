import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";

export const NotificationsListPendingReview = () => {
  const [notices, setNotices] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const url = "http://127.0.0.1:8000/api";

  useEffect(() => {
    axios
      .get(`${url}/avisos/sin-revision`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setNotices(response.data);
        } else {
          console.error("Expected an array but got:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching notices:", error);
      });
  }, []);

  const handleShowModal = (notice) => {
    setSelectedNotice(notice);
    setShow(true);
  }

  const handleCloseModal = () => {
    setSelectedNotice(null);
    setShow(false);
  }

  const handleDeleteNotice = () => {
    setNotices(notices.filter(notice => notice.id !== selectedNotice.id))
    handleCloseModal();
  }

  const approveNotice = async () => {
    await axios
      .put(`${url}/avisos/aprobar/${selectedNotice.id}`)
      .then((response) => {
        alert(response.data.message);
        handleDeleteNotice();
      })
      .catch((error) => {
        console.error("Ocurrio un error", error);
      });
  }

  const rejectNotice = async () => {
    await axios
      .put(`${url}/avisos/rechazar/${selectedNotice.id}`)
      .then((response) => {
        alert(response.data.message);
        handleDeleteNotice();
      })
      .catch((error) => {
        console.error("Ocurrio un error", error);
      });
  }

  return (
    <div>
      <h3>Lista de avisos pendientes de revisión</h3>
      
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
                <Button style={{ width: 'auto' }} onClick={ () => {
                  handleShowModal(notice);
                } }>Revisar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal 
        show={show}
        onHide={handleCloseModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Aviso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {selectedNotice && (
          <p>
            <b>Titulo:</b><br/>{selectedNotice.titulo} <br/>
            <b>Descripcion:</b><br/>{selectedNotice.descripcion}
          </p>
        )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='success' style={{ width: 'auto' }} onClick={approveNotice}>Aprobar</Button>
          <Button variant='danger' style={{ width: 'auto' }} onClick={rejectNotice}>Rechazar</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};
