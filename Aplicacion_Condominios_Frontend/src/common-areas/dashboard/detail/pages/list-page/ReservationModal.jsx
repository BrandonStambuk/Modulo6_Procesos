import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from 'react-toastify';

const ReservationModal = ({ show, handleClose, commonAreaName }) => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [showEmailForm, setShowEmailForm] = useState(false);

  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
  });

  const [emailList, setEmailList] = useState([]);

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  }

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8000/api/reservations/after-date/${selectedDate}/${commonAreaName}`
      );
      setReservations(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }, [selectedDate, commonAreaName]);

  useEffect(() => {
    if (show && commonAreaName) {
      fetchData();
    }
  }, [show, commonAreaName, selectedDate, fetchData]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSendEmail = () => {
    const emails = reservations.map((reservation) => reservation.resident_email);
    setEmailList(emails);
    setShowEmailForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const promises = emailList.map((correo) => {
      const data = {
        titulo: formData.titulo,
        correo: correo,
        anuncio: formData.descripcion,
      };
      return axios.post("http://127.0.0.1:8000/api/email", data);
    });

    try {
      const responses = await Promise.all(promises);
      const allSuccessful = responses.every(
        (response) => response.status === 200
      );

      if (allSuccessful) {
        toast.success('Email enviado correctamente');
        setFormData({ titulo: "", descripcion: "" });
        setEmailList([]);
        setShowEmailForm(false);
      } else {
        alert("Error al enviar algunos de los emails");
      }
    } catch (error) {
      console.error(error);
      toast.error('Error al enviar algunos de los emails');
    }
  };

  const handleCancelSendEmail = () => {
    setShowEmailForm(false);
  };

  if (!show || !commonAreaName) {
    return null;
  }

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Vista Previa</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showEmailForm ? (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitulo">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={(e) =>
                  setFormData(prevState => ({ ...prevState, titulo: e.target.value }))
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="formDescripcion" className="mt-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                name="descripcion"
                value={formData.descripcion}
                onChange={(e) =>
                  setFormData(prevState => ({ ...prevState, descripcion: e.target.value }))
                }
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Enviar Correo
            </Button>
            <Button
              variant="danger"
              className="mt-3 ml-2"
              onClick={handleCancelSendEmail}
            >
              Cancelar
            </Button>
          </Form>
        ) : (
          <>
            <div className="mb-3">
              <label className="form-label">Seleccionar fecha:</label>
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="form-control"
              />
            </div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Fecha Reserva</th>
                    <th>Razon</th>
                    <th>Titulo</th>
                    <th>Residente</th>
                    <th>Residente Email</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((reservation) => (
                    <tr key={reservation.id}>
                      <td>{reservation.reserved_date}</td>
                      <td>{reservation.reason}</td>
                      <td>{reservation.title}</td>
                      <td>{reservation.resident_name}</td>
                      <td>{reservation.resident_email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Button variant="success" onClick={handleSendEmail}>
              Enviar
            </Button>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReservationModal;
