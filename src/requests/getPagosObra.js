import { newRequest } from "./newRequest";

export async function getPagosObra(id, currentpage) {

    const url = new URL('http://localhost:8080/api/works/getbyid');

    // Agrega los parámetros a la URL
    url.searchParams.append('idwork', id);
    url.searchParams.append('page', currentpage );
    url.searchParams.append('size', '');
    console.log("url:", url);
    return await newRequest({ url, method: 'GET' })

}