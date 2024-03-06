import { newRequest } from "./newRequest";


export async function getEmpresas(currentpage, searchTerm) {

  const url = new URL('https://api-wvh8.onrender.com/api/bussiness/getall');
  // Agrega los parámetros a la URL
  url.searchParams.append('searchTerm', searchTerm);
  url.searchParams.append('page', currentpage);
  url.searchParams.append('size', '');

  return await newRequest({ url, method: 'GET' })
}