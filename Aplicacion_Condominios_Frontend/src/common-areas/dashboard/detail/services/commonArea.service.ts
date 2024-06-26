import axios from 'axios';

export const getCommonAreaAvailability = async (commonAreaName: string): Promise<number> => {
  const response = await axios.get(`http://localhost:8000/api/reservations/getCommonAreaAvailability/${commonAreaName}`);
  return response.data.available;
};
