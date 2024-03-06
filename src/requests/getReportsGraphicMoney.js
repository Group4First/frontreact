import { newRequest } from "./newRequest";

export async function getgraphicmoney(optional) {

    const url = new URL('https://api-wvh8.onrender.com/api/reports/GraphicMoney');

    url.searchParams.append('optional', optional);

    return await newRequest({ url, method: 'GET' })

}