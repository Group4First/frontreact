import { newRequest } from "./newRequest";

export async function getbussinfo(idbuss) {

    const url = new URL('https://api-wvh8.onrender.com/api/bussiness/search');

    url.searchParams.append('idbuss', idbuss);

    return await newRequest({ url, method: 'GET' })
}