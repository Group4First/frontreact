import { newRequest } from "./newRequest"

export async function putFinalizarObra(idObra, fechafin) {


    const url = new URL('https://api-wvh8.onrender.com/api/works/updatestatus');
    url.searchParams.append('idwork', idObra);
    url.searchParams.append('fechadefin', fechafin);

    return await newRequest({ url, method: 'PUT' })
}

