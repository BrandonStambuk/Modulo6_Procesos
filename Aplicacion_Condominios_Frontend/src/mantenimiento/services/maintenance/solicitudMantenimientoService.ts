import { AxiosResponse } from "axios";
import api from "../api";

interface Solicitud {
  idCategoria: number;
  descripcion: string;
  nombrePropietario: string;
  ubicacion: string;
  numerReferencia: string;
  fechaSolicitud: Date;
}

interface SolicitudServicio {
  idCategoria: number;
  idEstado: number;
  descripcion: string;
  nombrePropietario: string;
  ubicacion: string;
  numerRegerencia: string;
  encargado: string;
  fechaSoicitud: string;
  fechaFinalizado: string;
}

interface SolicitudServicioResponse {
  idRegistroSolicitud: number;
  idCategoria: number;
  idPersonalExterno:number;
  idEstado: number;
  descripcion: string;
  nombrePropietario: string;
  ubicacion: string;
  numerReferencia: string;
  encargado: string;
  fechaSolicitud: string;
  fechaFinalizado: string;
  categoria: { id: number; catnombre: string };
  estado: {
    idEstado: number;
    nombreEstado: string;
  };
}
//* to create a new Solicitud

export const createSolicitudServicio = async (
  newSolicitud: Partial<SolicitudServicio>
): Promise<SolicitudServicio | null> => {
  try {
    const response: AxiosResponse<SolicitudServicio> = await api.post(
      "/registro-solicitud/insert",
      newSolicitud
    );
    return response.data;
  } catch (error) {
    return null;
  }
};

//* to get all solicitudes

export const getAllSolicitudServicio = async (): Promise<
  SolicitudServicioResponse[]
> => {
  try {
    const response: AxiosResponse<SolicitudServicioResponse[]> = await api.get(
      "/registro-solicitud"
    );
    return response.data;
  } catch (error) {
    return [];
  }
};

//* to get solicitud by id
export const getSolicitudServicioById = async (
  solicitudId: number
): Promise<SolicitudServicio | null> => {
  try {
    const response: AxiosResponse<SolicitudServicio> = await api.get(
      `/registro-solicitud/${solicitudId}`
    );
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getSolicitudByEncargadoId = async(encargadoId: number): Promise<SolicitudServicioResponse[]> =>{
  try {
    const response: AxiosResponse<SolicitudServicioResponse[]> = await api.get(`/solicitudes-by-encargado/${encargadoId}`);
    console.log("🚀 ~ getSolicitudByEncargadoId ~ response.data:", response.data)
    return response.data;
  } catch (error) {
    return [];
  }
}

//* to update an existing solicitud servicio
export const updateSolicitudServicio = async (
  solicitudId: number,
  solicitudData: Partial<SolicitudServicioResponse>
): Promise<SolicitudServicioResponse | null> => {
  try {
    const response: AxiosResponse<SolicitudServicioResponse> = await api.put(
      `/registro-solicitud/update/${solicitudId}`,
      solicitudData
    );
    return response.data;
  } catch (error) {
    return null;
  }
};

//* to detele a solicitud servicio

export const deleteSolicitudServicio = async (
  solicitudId: number
): Promise<void> => {
  try {
    api.delete(`/registro-solicitud/delete/${solicitudId}`);
  } catch (error) {}
};
