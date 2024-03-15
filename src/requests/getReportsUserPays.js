import { newRequest } from "./newRequest";


export async function getReportsUserPays(currentpage) {
    
    const url = new URL('https://api-wvh8.onrender.com/api/reports/UserPays');

    url.searchParams.append('page', currentpage);
    url.searchParams.append('size', '');

    return await newRequest({url, method: 'GET'})
}