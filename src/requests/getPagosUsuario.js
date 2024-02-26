import { newRequest } from "./newRequest";

export async function getPagosUsuario(id, currentpage, searchTerm) {

    const url = new URL('http://localhost:8080/api/user/getuserxpay');

    // Agrega los parámetros a la URL
    url.searchParams.append('Iduser', id);
    url.searchParams.append('searchTerm', searchTerm);
    url.searchParams.append('page', currentpage);
    url.searchParams.append('size', '');

    return await newRequest({ url, method: 'GET' })
}