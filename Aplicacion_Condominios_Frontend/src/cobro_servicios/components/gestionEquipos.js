import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTrash, FaEdit } from 'react-icons/fa';

const GestionEquipos = () => {
    const [equipamientos, setEquipamientos] = useState([]);
    const [filtros, setFiltros] = useState({
        categoriaEquipoDanado: '',
        areaComun: '',
        responsable: '',
        categoriaServicio: ''
    });
    const [categoriasServicio, setCategoriasServicio] = useState([]);
    const [areasComunes, setAreasComunes] = useState([]);
    const endpoint = "http://localhost:8000/api";

    useEffect(() => {
        const obtenerEquipamientos = async () => {
            try {
                const response = await axios.get(`${endpoint}/obtener-equipamientos-todo`);
                console.log('Equipamientos:', response.data);
                setEquipamientos(response.data.equipamientos);
            } catch (error) {
                console.error('Error al obtener los equipamientos:', error);
            }
        };

        const obtenerCategoriasServicio = async () => {
            try {
                const response = await axios.get(`${endpoint}/CategoriaServicio`);
                setCategoriasServicio(response.data);
            } catch (error) {
                console.error('Error al obtener las categorías de servicio:', error);
            }
        };

        const obtenerAreasComunes = async () => {
            try {
                const response = await axios.get(`${endpoint}/obtenerAreasComunes`);
                setAreasComunes(response.data);
            } catch (error) {
                console.error('Error al obtener las áreas comunes:', error);
            }
        };

        obtenerEquipamientos();
        obtenerCategoriasServicio();
        obtenerAreasComunes();
    }, []);

    const handleFiltroChange = (e) => {
        const { name, value } = e.target;
        setFiltros((prevFiltros) => ({
            ...prevFiltros,
            [name]: value
        }));
    };

    const filtrarEquipamientos = () => {
        return equipamientos.filter((equipo) => {
            const cumpleCategoria = !filtros.categoriaEquipoDanado || equipo.categoria === filtros.categoriaEquipoDanado;
            const cumpleAreaComun = !filtros.areaComun || equipo.area_comun_nombre === filtros.areaComun;
            const cumpleResponsable = !filtros.responsable || (filtros.responsable === 'si' ? equipo.residente_id !== null : equipo.residente_id === null);
            const cumpleCategoriaServicio = !filtros.categoriaServicio || equipo.categoria_id === parseInt(filtros.categoriaServicio);

            console.log(`Equipo ${equipo.id} cumple:
                Categoria: ${equipo.categoria}
                CategoriaFiltro: ${filtros.categoriaEquipoDanado}
                Area Comun: ${equipo.area_comun_id}
                Area Comun Filtro: ${filtros.areaComun}
                Responsable: ${cumpleResponsable}
                Categoria Servicio: ${cumpleCategoriaServicio}`);

            console.log(`Equipo ${equipo.id} cumple:
                Categoria: ${cumpleCategoria}
                Area Comun: ${cumpleAreaComun}
                Responsable: ${cumpleResponsable}
                Categoria Servicio: ${cumpleCategoriaServicio}`);

            return cumpleCategoria && cumpleAreaComun && cumpleResponsable && cumpleCategoriaServicio;
        });
    };

    const eliminarEquipo = async (id) => {
        try {
            await axios.delete(`${endpoint}/eliminar-equipo/${id}`);
            setEquipamientos((prevEquipamientos) => prevEquipamientos.filter((equipo) => equipo.id !== id));
        } catch (error) {
            console.error('Error al eliminar el equipo:', error);
        }
    };

    const editarEquipo = (id) => {
        window.location.href = `/cobros/edicion-equipo/${id}`;
    };

    const equipamientosFiltrados = filtrarEquipamientos();

    return (
        <div className="container">
            <h2>Gestión de Equipos</h2>

            <div className="filters row mb-3">
                <div className="form-group col">
                    <label htmlFor="categoriaEquipoDanado">Categoría de Equipo Dañado</label>
                    <select
                        id="categoriaEquipoDanado"
                        name="categoriaEquipoDanado"
                        className="form-control"
                        value={filtros.categoriaEquipoDanado}
                        onChange={handleFiltroChange}
                    >
                        <option value="">Todas</option>
                        <option value="Reposición">Reposición</option>
                        <option value="Mantenimiento">Mantenimiento</option>
                    </select>
                </div>

                {filtros.categoriaEquipoDanado === 'Mantenimiento' && (
                    <div className="form-group col">
                        <label htmlFor="categoriaServicio">Categoría de Servicio</label>
                        <select
                            id="categoriaServicio"
                            name="categoriaServicio"
                            className="form-control"
                            value={filtros.categoriaServicio}
                            onChange={handleFiltroChange}
                        >
                            <option value="">Todas</option>
                            {categoriasServicio.map((categoria) => (
                                <option key={categoria.id} value={categoria.id}>{categoria.catnombre}</option>
                            ))}
                        </select>
                    </div>
                )}

                <div className="form-group col">
                    <label htmlFor="areaComun">Área Común</label>
                    <select
                        id="areaComun"
                        name="areaComun"
                        className="form-control"
                        value={filtros.areaComun}
                        onChange={handleFiltroChange}
                    >
                        <option value="">Todas</option>
                        {areasComunes.map((area) => (
                            <option key={area.id} value={area.id}>{area}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group col">
                    <label htmlFor="responsable">Responsable</label>
                    <select
                        id="responsable"
                        name="responsable"
                        className="form-control"
                        value={filtros.responsable}
                        onChange={handleFiltroChange}
                    >
                        <option value="">Todos</option>
                        <option value="si">Sí</option>
                        <option value="no">No</option>
                    </select>
                </div>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Costo</th>
                        <th>Área Común</th>
                        {filtros.responsable === 'si' && <th>Residente</th>}
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {equipamientosFiltrados.map((equipo) => (
                        <tr key={equipo.id}>
                            <td>{equipo.id}</td>
                            <td>{equipo.nombre}</td>
                            <td>{equipo.descripcion}</td>
                            <td>{equipo.costo}</td>
                            <td>{equipo.area_comun_nombre}</td>
                            {filtros.responsable === 'si' && (
                                <td>{equipo.residente_id ? equipo.residente_id : 'N/A'}</td>
                            )}
                            <td>
                                <button className="btn btn-primary" onClick={() => editarEquipo(equipo.id)}>
                                    <FaEdit />
                                </button>
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => eliminarEquipo(equipo.id)}>
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GestionEquipos;
