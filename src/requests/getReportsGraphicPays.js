import { newRequest } from "./newRequest";

export async function getgraphicpays(optional) {

    const url = new URL('http://localhost:8080/api/reports/GraphicPays');

    url.searchParams.append('optional', optional);

    return await newRequest({ url, method: 'GET' })

}