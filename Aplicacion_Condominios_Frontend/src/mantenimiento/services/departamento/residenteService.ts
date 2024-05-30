import api from "../api";

interface DepartamentoResponse {
  id: number;
  nombre_residente: string;
  apellidos_residente: string;
  cedula_residente: string;
  telefono_residente: string;
  fecha_nacimiento_residente: string;
  tipo_residente: string;
  nacionalidad_residente: string;
  email_residente: string;
  genero_residente: string;
  estado_residente: number;
  imagen_residente: string;
  contrato_id: number;
  created_at: string;
  updated_at: string;
}

export const getResidenteByDepartamentoId = async (
  departamentoId: number
): Promise<DepartamentoResponse | null> => {
  try {
    const response = await api.get(
      `/residente-by-departamento/${departamentoId}`
    );
    return response.data;
  } catch (error) {
    return null;
  }
};
