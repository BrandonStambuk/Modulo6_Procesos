import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export const NoticesSection = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/avisos/aprobados")
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

  const formatDate = (date) => {
    let jsDate = new Date(date);
    let dateFormated = jsDate.toLocaleDateString("es-ES") + " " + jsDate.toLocaleTimeString("es-ES");
    return dateFormated;
  }

  return (
    <div>
      <h2 className="text-center">Avisos</h2>

      <div className="row justify-content-center align-items-center gap-3">
        {Array.isArray(notices) && notices.map(notice => (
          <Card style={{ width: "60%" }}>
            <Card.Header>Gerencia</Card.Header>
            <Card.Body>
              <Card.Title className="text-center">{notice.titulo}</Card.Title>
              <Card.Text>{notice.descripcion}</Card.Text>
            </Card.Body>
            <Card.Footer className="text-end">Publicado el {formatDate(notice.created_at)}</Card.Footer>
          </Card> 
        ))}
      </div>
    </div>
  );
}

