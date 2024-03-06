import { newRequest } from "./newRequest";

export async function getinitialdata() {

    const url = new URL('https://api-wvh8.onrender.com/api/reports/InitialData');

    return await newRequest({ url, method: 'GET' })

}