import { Link } from "react-router-dom";
import { CommonArea } from "../../interfaces/common-areas";

import "./card-common-area.css";
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";

const baseImageUrl = "http://localhost:8000";

interface CardCommonAreaProps {
  commonArea: CommonArea;
}

export default function CardCommonArea({ commonArea }: CardCommonAreaProps) {
  return (
    <Card
      style={{
        width: "18rem",
      }}
    >
      <img
        className="image-common-area"
        alt="Sample"
        src={`${baseImageUrl}/${commonArea.urlImage}`}
      />

      <CardBody>
        <CardTitle tag="h5">{commonArea.name}</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          Capacidad: {commonArea.capacity} personas
        </CardSubtitle>
        <CardText>{commonArea.description}</CardText>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* <Button color="info"> */}
          <Link
            className="card-common-area-link details-link"
            to={`/areas-comunes/${commonArea.id}`}
          >
            Ver detalles
          </Link>
          {/* </Button> */}

          {/* <Button color="primary"> */}
          <Link
            className="card-common-area-link calendar-link"
            to={`/areas-comunes/calendario/${commonArea.id}`}
          >
            Ver calendario
          </Link>
          {/* </Button> */}
        </div>
      </CardBody>
    </Card>
  );
}
