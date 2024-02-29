import { newRequest } from "./newRequest"

export async function putFinalizarObra(idObra, fechafin) {

    url.searchParams.append('idwork', idObra);
    url.searchParams.append('fechadefin', fechafin);
    const url = new URL('http://localhost:8080/api/payment/addme');

    return await newRequest({ url, body, method: 'PUT' })
}

