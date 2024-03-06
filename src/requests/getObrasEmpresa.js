import { newRequest } from "./newRequest";

export async function getObrasEmpresa(id, searchTerm) {

    const url = new URL('https://api-wvh8.onrender.com/api/works/getbybussines');

    // Agrega los parámetros a la URL
    url.searchParams.append('bussinesid', id);
    url.searchParams.append('searchTerm', searchTerm);

    return await newRequest({ url, method: 'GET' })
}
