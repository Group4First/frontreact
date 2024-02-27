import { newRequest } from "./newRequest";

export async function getuserinfo(document) {

    const url = new URL('http://localhost:8080/api/user/getbydocument');

    url.searchParams.append('Document', document);

    return await newRequest({ url, method: 'GET' })
}