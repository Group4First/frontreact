import { newRequest } from "./newRequest";

export async function getuserinfo(document) {

    const url = new URL('https://api-wvh8.onrender.com/api/user/getbydocument');

    url.searchParams.append('Document', document);

    return await newRequest({ url, method: 'GET' })
}