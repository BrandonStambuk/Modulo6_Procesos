import api from "../api";

export const getContratoPersonal = async (idContrato: number) => {
  try {
    const response: any = await api.get(`/contrato-personal/${idContrato}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener contrato", error);
  }
};

export const getAllContratoPersonal = async () => {
  try {
    const response = await api.get("/contrato-personal");
    return response.data;
  } catch (error) {
    console.error("Error al obtener contrato personal", error);
  }
};

export const createContratoPersonal = async (data: any) => {
  try {
    const response = await api.post("/contrato-personal/insert", data);
    console.log("🚀 ~ createContratoPersonal ~ response:", response);
  } catch (error) {}
};
