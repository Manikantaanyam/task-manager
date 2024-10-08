import axios from "axios";
import { BACKEND_URL } from "config";

interface dataToSend {
  name?: string;
  email: string;
  password: string;
}

export const useFetch = async (
  { type }: { type: string },
  { data }: { data: dataToSend }
) => {
  const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type}`, data);

  console.log(response.data);
};
