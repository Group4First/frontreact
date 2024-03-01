import { newRequest } from "./newRequest"

export async function putFinalizarObra(idObra, fechafin) {


    const url = new URL('http://localhost:8080/api/works/updatestatus');
    url.searchParams.append('idwork', idObra);
    url.searchParams.append('fechadefin', fechafin);

    return await newRequest({ url, method: 'PUT' })
}

