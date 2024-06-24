import { useEffect, useState } from "react";
import axios from "axios";
import "../customs.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ClipLoader } from 'react-spinners';
import {
	Row,
	Col,
	Container,
	Label,
	Table,
	InputGroup,
	Input,
} from "reactstrap";

const VisualizarParqueos = () => {
	const [parqueos, setParqueos] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [busqueda, setBusqueda] = useState("");

	useEffect(() => {
		getParqueos();
	}, []);

	const getParqueos = async () => {
		try {
			const [
				parqueosResponse,
				departamentosResponse,
				bloquesResponse,
				edificiosResponse,
			] = await Promise.all([
				axios.get(`http://localhost:8000/api/parqueos`),
				axios.get(`http://localhost:8000/api/departamentos`),
				axios.get(`http://localhost:8000/api/bloques`),
				axios.get(`http://localhost:8000/api/edificios`),
			]);

			const parqueos = parqueosResponse.data;
			const departamentos = departamentosResponse.data;
			const bloquesData = bloquesResponse.data;
			const edificiosData = edificiosResponse.data;
			const departamentosMap = Object.fromEntries(
				departamentos.map((depa) => [depa.id, depa])
			);
			const edificiosMap = Object.fromEntries(
				edificiosData.map((edificio) => [edificio.id, edificio])
			);
			const bloquesMap = Object.fromEntries(
				bloquesData.map((bloque) => [bloque.id, bloque])
			);

			parqueos.forEach((parqueo) => {
				const depa = departamentosMap[parqueo.departamento_id];
				const edificio = depa ? edificiosMap[depa.edificio_id] : null;
				const bloque = edificio ? bloquesMap[edificio.bloque_id] : null;
				parqueo.departamento_parqueo = depa ? depa.nombre_departamento : "N/A";
				parqueo.edificio_parqueo = edificio ? edificio.nombre_edificio : "N/A";
				parqueo.bloque_parqueo = bloque ? bloque.nombre_bloque : "N/A";
			});
			parqueos.sort((a, b) => a.nombre_parqueo.localeCompare(b.nombre_parqueo));
			setParqueos(parqueos);
		} catch (error) {
			console.error("Error al obtener los parqueos:", error);
		} finally {
			setIsLoading(false);
		}
	};
	const manejarBusqueda = async (e) => {
		setBusqueda(e.target.value);
	};

	return (
		<>
			<Container>
				<Row>
					<Label className="text-center mb-4 titulosForms">
						Visualizar parqueos
					</Label>
				</Row>
				<Row className="d-flex align-items-center justify-content-center">
					<Col md={8}>
						<InputGroup>
							<Input
								placeholder="Buscar parqueos..."
								className="buscadorDepa"
								onChange={manejarBusqueda}
								style={{
									borderRadius: "15px",
									border: "1px solid rgba(0, 0, 0, 0.3)",
									boxShadow:
										"0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
								}}
							/>
						</InputGroup>
					</Col>
				</Row>
				{isLoading ? (
					<div className="d-flex justify-content-center my-5">
						<ClipLoader color={'#5B9223'} loading={isLoading} size={50} />
					</div>
				) : (
					<Table striped responsive bordered className="mt-5">
						<thead className="text-center">
							<tr>
								<th>Nombre</th>
								<th>Bloque</th>
								<th>Edificio</th>
								<th>Departamento</th>
								<th>Dirección</th>
							</tr>
						</thead>
						<tbody className="visitasTabla">
							{parqueos
								.filter((parqueo) => {
									if (busqueda === "") {
										return parqueo;
									} else if (
										parqueo.nombre_parqueo
											.toLowerCase()
											.includes(busqueda.toLowerCase()) ||
										parqueo.direccion_parqueo
											.toLowerCase()
											.includes(busqueda.toLowerCase()) ||
										parqueo.departamento_parqueo
											.toLowerCase()
											.includes(busqueda.toLowerCase()) ||
										parqueo.edificio_parqueo.toLowerCase().includes(busqueda.toLowerCase()) ||
										parqueo.bloque_parqueo.toLowerCase().includes(busqueda.toLowerCase())
									) {
										return parqueo;
									}
									return false;
								})
								.map((parqueo) => (
									<tr key={parqueo.id}>
										<td className="celdaVisita">{parqueo.nombre_parqueo}</td>
										<td className="celdaVisita">{parqueo.bloque_parqueo}</td>
										<td className="celdaVisita">{parqueo.edificio_parqueo}</td>
										<td className="celdaVisita">
											{parqueo.departamento_parqueo}
										</td>
										<td className="celdaVisita">{parqueo.direccion_parqueo}</td>
									</tr>
								))}
						</tbody>
					</Table>
				)}
			</Container>
		</>
	);
};

export default VisualizarParqueos;
