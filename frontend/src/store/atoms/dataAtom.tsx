import { atom } from "recoil";

interface Data {
  id: string;
  title: string;
  description: string;
  created_At: string;
}

export const dataAtom = atom<Data[]>({
  key: "dataAtom",
  default: [],
});
