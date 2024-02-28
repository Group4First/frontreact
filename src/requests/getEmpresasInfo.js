import { newRequest } from "./newRequest";

export async function getbussinfo(idbuss) {

    const url = new URL('http://localhost:8080/api/bussiness/search');

    url.searchParams.append('idbuss', idbuss);

    return await newRequest({ url, method: 'GET' })
}