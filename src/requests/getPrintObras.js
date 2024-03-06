import { newRequest } from "./newRequest";

export async function getPrintWork(id) {

    const url = new URL('https://api-wvh8.onrender.com/api/works/printinfoworld');

    // Agrega los parámetros a la URL
    url.searchParams.append('idwork', id);


    return await newRequest({ url, method: 'GET' })
}
