import Cookies from "js-cookie";
import { newRequest } from "./newRequest";

export async function getsmlv(year) {


  const url = new URL('https://api-wvh8.onrender.com/api/interest/getsmmv');

  // Agrega los parámetros a la URL
  url.searchParams.append('Year', year);

  return await newRequest({ url, method: 'GET' })
}