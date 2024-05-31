import React, { useState, useEffect } from "react";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import { Link } from "react-router-dom";
import "./style.css";

import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { getListaCompras } from "../services/maintenance/listaComprasService";
import { getAllInsumosBySolicitudId } from "../services/maintenance/insumosService";

export default function ListaCompras() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [listaComprasList, setListaComprasList] = useState([]);
  const [insumosList, setInsumosList] = useState([]);

  const handleExpand = async (idSolicitud: number) => {
    setExpanded(expanded === idSolicitud ? null : idSolicitud);
    const response = await getAllInsumosBySolicitudId(idSolicitud);
    console.log("🚀 ~ handleExpand ~ response:", response.insumos);
    setInsumosList(response.insumos);
  };

  useEffect(() => {
    listaCompras();
  }, []);

  const listaCompras = async () => {
    const response = await getListaCompras();
    //console.log("🚀 ~ listaCompras ~ response:", response);
    setListaComprasList(response);
  };

  return (
    <>
      <div className="content__list">
        <div className="row">
          <div className="col">
            <h2>Lista de Compras</h2>
          </div>
          <div className="col button__insu">
            <Link
              to="/changelog/registro_compras"
              className="block block__texto1"
            >
              Registrar
            </Link>
          </div>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Solicitud</th>
              <th>Categoría</th>
              <th>Precio total</th>
              <th>Fecha</th>
              <th></th>
              <th></th>
              <th>Detalles</th>
              <th>Acciones</th>
              <th></th>
            </tr>
          </thead>
          {listaComprasList?.length > 0 &&
            listaComprasList.map((element: any) => (
              <tbody key={element.idSolicitud}>
                <tr>
                  <td>Solicitud{element.idSolicitud}</td>
                  <td>{element.solicitud.categoria.catnombre}</td>
                  <td>{element.totalCompra} Bs</td>
                  <td>{element.fechaCompra}</td>
                  <td></td>
                  <td></td>
                  <td>
                    <Accordion
                      className="tamanio_acordion"
                      expanded={expanded === element.idSolicitud}
                    >
                      <AccordionSummary
                        onClick={() => handleExpand(element.idSolicitud)}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${element.idSolicitud}-content`}
                        id={`panel${element.idSolicitud}-header`}
                      >
                        Compras solicitud {element.idSolicitud}
                      </AccordionSummary>
                      <AccordionDetails>
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th className="fixed-width">Cant.</th>
                              <th className="fixed-width">Insumo</th>
                              <th className="fixed-width">Precio U.</th>
                              <th className="fixed-width">Total</th>
                            </tr>
                          </thead>
                          {/* Aquí deberías mapear los insumos de cada solicitud */}
                          <tbody>
                            {insumosList.map((insumo: any) => (
                              <tr key={insumo.idInsumo}>
                                <td>{insumo.cantidadInsumo}</td>
                                <td>{insumo.nombreInsumo}</td>
                                <td>{insumo.precioInsumo}</td>
                                <td>{insumo.totalInsumo}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </AccordionDetails>
                    </Accordion>
                  </td>
                  <td>
                    <div className="button-container">
                      <Link
                        to="/changelog/registro_compras"
                        className="block block__texto"
                      >
                        <button className="personalize_button1">
                          <CreateOutlinedIcon className="tamIcon" />
                        </button>
                      </Link>
                    </div>
                  </td>
                  <td></td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>
    </>
  );
}
