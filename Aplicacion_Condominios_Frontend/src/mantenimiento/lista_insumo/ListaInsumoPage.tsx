import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import "./style.css";
import {Insumo, deleteInsumo, getAllInsumos} from "../services/maintenance/insumosService"






const ListaInsumo: React.FC = () => {
    const [datos, setDatos] = useState<Insumo[]>([]);

    useEffect(() => {
      const cargarDatos = async () => {
        const datosObtenidos = await getAllInsumos();
        console.log("🚀 ~ cargarDatos ~ datosObtenidos:", datosObtenidos)

        const datosFiltered = datosObtenidos.filter(element => {
            if(element.encargado !== null){
                return element;
            }
        })

        setDatos(datosFiltered);
      };
  
      cargarDatos();
    }, []);

    const handleDelete = async (idInsumo:number) =>{
        const deleted = await deleteInsumo(idInsumo);
        if(deleted){
            const newDatos = datos.filter(element => {
                if(element.idInsumo !== idInsumo){
                    return element;
                }
            })
            setDatos(newDatos);
        }
    }

    return(
        <>
            <div className="content__insu">
                <div className="row">
                    <div className="col">
                        <h2>Lista de Insumos</h2>
                    </div>
                    <div className="col button__insu">
                       
                        <Link to="/changelog/registrar_insumo" className="block block__texto">                 
                            Registrar
                        </Link>
                    </div>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className="">Solicitud</th>
                            <th className="">Categoria</th>
                            <th className="">Encargado</th>
                            <th className="">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                    {datos?.map((insumos) => (
                        <tr key={insumos.idInsumo}>
                            <td> Solicitud {insumos.idSolicitud}</td>
                            <td>{insumos.catnombre}</td>
                            <td>{insumos.encargado}</td>
                            <td className="ajustar__insu">
                                <button type="button">
                                    <CreateOutlinedIcon fontSize="large" />
                                </button>
                                <button onClick={()=>handleDelete(insumos.idSolicitud)} type="button">
                                    <DeleteOutlinedIcon fontSize="large" />
                                </button>
                            </td>
                        </tr>
                    ))}

                   
                    </tbody>
                </table>
            </div>       
        </>
    );
}

export default ListaInsumo;