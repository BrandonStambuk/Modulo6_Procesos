import api from "../api";

export const newListaCompra = async (dataCompra: any) => {
  console.log("🚀 ~ newListaCompra ~ dataCompra:", dataCompra);
  try {
    const response: any = await api.post(`/lista-compra/insert`, dataCompra);
    return response.data;
  } catch (error) {
    console.log("Error:", error);
  }
};

export const getListaCompras = async () => {
  try {
    const response = await api.get("/lista-compra");
    return response.data;
  } catch (error) {}
};
