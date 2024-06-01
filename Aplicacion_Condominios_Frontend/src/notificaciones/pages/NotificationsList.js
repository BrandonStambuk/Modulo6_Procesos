import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Imprimir from "./Imprimir";
import { MailOutlined, PrintOutlined } from "@mui/icons-material";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";

export const NotificationsList = () => {
  const [notices, setNotices] = useState([]);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [fechaComunicacion, setFechaComunicacion] = useState("");
  const [fechaRealizacion, setFechaRealizacion] = useState("");
  const [noticeToPrint, setNoticeToPrint] = useState(null);
  

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/avisos/aprobados")
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

  const handleDeleteNotice = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/avisos/${id}`)
      .then((response) => {
        setNotices(notices.filter((notice) => notice.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting notice:", error);
      });
  };

  const handlePrintModalClose = () => setShowPrintModal(false);

  const handlePrintNotice = (notice) => {
    setNoticeToPrint(notice);
    setShowPrintModal(true);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedNotice, setSelectedNotice] = useState({
    titulo: "",
    descripcion: "",
  });

  const handleSendEmail = (notice) => {
    setSelectedNotice(notice);
    handleShow();
  };

  const sendEmail = async () => {
    const url = "http://127.0.0.1:8000/api";
    const data = await axios.get(`${url}/notificacion-general`);
    const residentes = data.data.residentes;
    sendNotificationsToResidents(residentes);
  };

  const sendNotificationsToResidents = async (residentes) => {
    const url = "http://127.0.0.1:8000/api";

    const promises = residentes.map((residente) => {
      const notificationData = {
        titulo: selectedNotice.titulo,
        anuncio: selectedNotice.descripcion,
        email: residente.email_residente,
      };

      return axios.post(`${url}/email`, notificationData);
    });

    try {
      await Promise.all(promises);
      alert("Notificaciones enviadas exitosamente.");
      handleClose();
    } catch (error) {
      alert("Ocurrio un error al enviar los mensajes, intente nuevamente.");
    }
  };

  return (
    <div>
      <h3>Lista de Notificaciones</h3>
      
      <Modal
        show={showPrintModal}
        onHide={handlePrintModalClose}
        centered
        className="bg-body-secondary"
      >
        <Modal.Body>
          {noticeToPrint && (
            <Imprimir
              titulo={noticeToPrint.titulo}
              descripcion={noticeToPrint.descripcion}
            />
          )}
        </Modal.Body>
      </Modal>

      <table className="mt-3 table table-striped text-center">
        <thead className="bg-primary text-white">
          <tr>
            <th>Aviso</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(notices) && notices.map((notice) => (
            <tr key={notice.id}>
              <td>{notice.titulo}</td>
              <td>
                <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                  <Button
                    style={{ width: "auto" }}
                    variant="outline-dark"
                    onClick={() => handleSendEmail(notice)}
                  >
                    <MailOutlined fontSize="small" />
                  </Button>
                  <Button
                    style={{ width: "auto", backgroundColor: "#1B325F", borderColor: "#1B325F" }}
                    onClick={() => handlePrintNotice(notice)}
                  >
                    <PrintOutlined fontSize="small" />
                  </Button>
                  <Button 
                    style={{ width: "auto" }}
                    variant="danger" 
                    onClick={() => handleDeleteNotice(notice.id)}
                  >
                    <DeleteOutlined fontSize="small" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={show} onHide={handleClose}centered>
        <Modal.Header closeButton>
          <Modal.Title>Vista Previa</Modal.Title>
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
          <Button style={{ width: "auto" }} variant='success' onClick={sendEmail}>
            Enviar
          </Button>
          <Button style={{ width: "auto" }} variant='danger' onClick={handleClose}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
