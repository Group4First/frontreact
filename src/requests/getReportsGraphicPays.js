import { newRequest } from "./newRequest";

export async function getgraphicpays(optional) {

    const url = new URL('https://api-wvh8.onrender.com/api/reports/GraphicPays');

    url.searchParams.append('optional', optional);

    return await newRequest({ url, method: 'GET' })

}