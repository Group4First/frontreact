import { newRequest } from "./newRequest";

export async function getinitialdata() {

    const url = new URL('http://localhost:8080/api/reports/InitialData');

    return await newRequest({ url, method: 'GET' })

}