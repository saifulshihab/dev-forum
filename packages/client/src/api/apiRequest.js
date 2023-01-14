import axios from "axios";
import { baseURL } from "../baseURL";

const publicInstance = axios.create({
  baseURL,
});
const privateInstance = axios.create({
  baseURL,
});

export const publicApiRequest = publicInstance;
export const privateApiRequest = privateInstance;
