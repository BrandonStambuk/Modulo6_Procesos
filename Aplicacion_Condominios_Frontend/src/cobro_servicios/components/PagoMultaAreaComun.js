import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import QRCode from "qrcode.react";
import Swal from "sweetalert2"; 
import jsPDF from "jspdf";

const endpoint = "http://localhost:8000/api";

const PagoMultaAreaComun = () => {
    const { idReport, idResidente,idAreaComun,idReservation } = useParams();
    const [monto, setMonto] = useState(0);
    const [formaPago, setFormaPago] = useState("");
    const [efectivo, setEfectivo] = useState(""); 
    const [errors, setErrors] = useState({});
    const [showQR, setShowQR] = useState(false);
    const [cambio, setCambio] = useState(0);
    const [pagoRealizado, setPagoRealizado] = useState(false);
    const [reportes, setReportes] = useState([]);
    const [cosToReplace, setCosToReplace] = useState(0);
    const [countToReplace, setCountToReplace] = useState(0);
    const [montoTotal, setMontoTotal] = useState(0);
    const [nombreResidente, setNombreResidente] = useState("");

    useEffect(() => {
        console.log("Componente FormularioPagoArea montado");
        console.log("ID Reporte:", idReport);
        console.log("ID Residente:", idResidente);

        const fetchReports = async () => {
            try {
                let response = await axios.get(`${endpoint}/reports/${idReservation}`);
                setReportes(response.data.data);
                console.log(response.data.data);
                if (response.data.data.length > 0) {
                    setCosToReplace(response.data.data[0].cosToReplace);
                    setCountToReplace(response.data.data[0].countToReplace);
                    setMontoTotal(response.data.data[0].cosToReplace * response.data.data[0].countToReplace);
                }
            } catch (error) {
                console.error("Error fetching reports:", error);
            }
        };

        const fetchResidente = async () => {
            try {
                let response = await axios.get(`${endpoint}/residente/${idResidente}`);
                setNombreResidente(response.data.nombre_residente); // Asumiendo que el nombre del residente está en la propiedad 'nombre'
            } catch (error) {
                console.error("Error fetching residente:", error);
            }
        };

        fetchReports();
        fetchResidente();
    }, [idReport, idResidente]);

    useEffect(() => {
        setMontoTotal(parseFloat(cosToReplace) * parseFloat(countToReplace));
    }, [cosToReplace, countToReplace]);

    const generatePDF = () => {
        try {
            const doc = new jsPDF();
            doc.text("Administracion", 20, 10);
            doc.text("-------------------", 20, 20);
            doc.text("Recibo de Pago", 20, 30);
            doc.text("-------------------", 20, 40);

            if (montoTotal) {
                doc.text(`Monto Total: ${montoTotal}`, 20, 50);
            }
            if (formaPago) {
                doc.text(`Forma de Pago: ${formaPago}`, 20, 60);
            }
            if (formaPago === "efectivo" && efectivo) {
                doc.text(`Efectivo: ${efectivo}`, 20, 70);
                if (cambio > 0) {
                    doc.text(`Cambio: ${cambio.toFixed(2)}`, 20, 80);
                }
            }
            if (cosToReplace !== null) {
                doc.text(`Costo a Reponer: ${cosToReplace}`, 20, 90);
            }
            if (countToReplace !== null) {
                doc.text(`Cantidad a Reponer: ${countToReplace}`, 20, 100);
            }

            doc.save("recibo_pago.pdf");
        } catch (error) {
            console.error(error);
        }
    };
    
    const handleInput = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case "monto":
                setMonto(value);
                break;
            case "formaPago":
                setFormaPago(value);
                break;
            case "efectivo": 
                setEfectivo(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = {};
    
        if (!monto.trim()) {
            validationErrors.monto = "Este campo es obligatorio";
        }
    
        if (!formaPago.trim()) {
            validationErrors.formaPago = "Seleccione una forma de pago";
        }
    
        setErrors(validationErrors);
    
        if (Object.keys(validationErrors).length === 0) {
            console.log("Monto:", montoTotal);
            console.log("Forma de pago:", formaPago);
            axios.put(`${endpoint}/common-areas/${idReservation}/pagarMultaArea`, { monto: montoTotal })
                .then(response => {
                    console.log(response.data);
                    setShowQR(formaPago === "qr");
                    setPagoRealizado(true);
    
                    Swal.fire({
                        icon: 'success',
                        title: '¡Pago realizado con éxito!'
                    }).then(() => {
                        window.location.href = "/cobros/pagar-reserva";
                    });
                    axios.delete(`${endpoint}/eliminar-reporte/${idReport}`);
                })
                .catch(error => {
                    console.error('Error al pagar la reserva:', error);
                });
    
            if (formaPago === "efectivo") {
                const cambioCalculado = parseFloat(efectivo) - parseFloat(montoTotal);
                setCambio(cambioCalculado > 0 ? cambioCalculado : 0);
            }

            generatePDF();
        }
    };
    
    const handleGenerateQR = () => {
        const qrData = `Monto: ${montoTotal}`;
        setShowQR(true);
    };

    return (
        <Container className="custom-form">
            <Row>
                <Col sm={12}>
                    <h2 className="text-center mb-5">Pagar Multa de Área Común</h2>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="nombreResidente">Nombre del Residente:</Label>
                            <Input
                                type="text"
                                name="nombreResidente"
                                id="nombreResidente"
                                value={nombreResidente}
                                disabled
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="monto">Monto:</Label>
                            <Input
                                type="number"
                                name="monto"
                                id="monto"
                                value={monto}
                                onChange={handleInput}
                                required
                            />
                            {errors.monto && <span>{errors.monto}</span>}
                        </FormGroup>
                        <FormGroup>
                            <Label for="formaPago">Forma de Pago:</Label>
                            <Input
                                type="select"
                                name="formaPago"
                                id="formaPago"
                                value={formaPago}
                                onChange={handleInput}
                                required
                            >
                                <option value="">Seleccione una opción</option>
                                <option value="efectivo">Efectivo</option>
                                <option value="qr">Pago por QR</option>
                            </Input>
                            {errors.formaPago && <span>{errors.formaPago}</span>}
                        </FormGroup>
                        {formaPago === "efectivo" && ( 
                            <FormGroup>
                                <Label for="efectivo">Efectivo:</Label>
                                <Input
                                    type="number"
                                    name="efectivo"
                                    id="efectivo"
                                    value={efectivo}
                                    onChange={handleInput}
                                    required
                                />
                            </FormGroup>
                        )}
                        {cosToReplace !== null && (
                            <FormGroup>
                                <Label for="cosToReplace">Costo a Reponer:</Label>
                                <Input
                                    type="number"
                                    name="cosToReplace"
                                    id="cosToReplace"
                                    value={cosToReplace}
                                    disabled
                                />
                            </FormGroup>
                        )}
                        {countToReplace !== null && (
                            <FormGroup>
                                <Label for="countToReplace">Cantidad a Reponer:</Label>
                                <Input
                                    type="number"
                                    name="countToReplace"
                                    id="countToReplace"
                                    value={countToReplace}
                                    disabled
                                />
                            </FormGroup>
                        )}
                        <FormGroup>
                            <Label for="montoTotal">Monto Total:</Label>
                            <Input
                                type="number"
                                name="montoTotal"
                                id="montoTotal"
                                value={montoTotal}
                                disabled
                            />
                        </FormGroup>
                        <Button type="submit" color="primary">
                            Pagar
                        </Button>
                        {formaPago === "qr" && (
                            <Button color="info" onClick={handleGenerateQR}>Generar QR</Button>
                        )}
                    </Form>
                    {showQR && ( 
                        <div className="text-center mt-3">
                            <h3>Escanea el siguiente código QR para realizar el pago:</h3>
                            <QRCode value={`Monto: ${montoTotal}`} />
                        </div>
                    )}
                    {formaPago === "efectivo" && cambio > 0 && ( 
                        <div className="text-center mt-3">
                            <h4>Cambio: {cambio.toFixed(2)}</h4>
                        </div>
                    )}
                    {pagoRealizado && (
                        <div className="text-center mt-3 text-success">
                            <h4>Pago realizado con éxito</h4>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default PagoMultaAreaComun;