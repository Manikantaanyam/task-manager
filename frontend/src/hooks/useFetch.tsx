import { BACKEND_URL } from "@/config";
import { dataAtom } from "@/store/atoms/dataAtom";
import axios from "axios";
import { useSetRecoilState } from "recoil";

export const useFetch = () => {
  const setData = useSetRecoilState(dataAtom);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/todo/bulk`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  return { fetchData };
};
