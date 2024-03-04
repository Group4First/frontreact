import { newRequest } from "./newRequest";

export async function getgraphicmoney(optional) {

    const url = new URL('http://localhost:8080/api/reports/GraphicMoney');

    url.searchParams.append('optional', optional);

    return await newRequest({ url, method: 'GET' })

}