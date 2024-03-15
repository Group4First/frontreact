import { newRequest } from "./newRequest";


export async function getReportsUserPays(currentpage,size) {
    
    const url = new URL('https://api-wvh8.onrender.com/api/reports/UserPays');

    url.searchParams.append('page', currentpage);
    url.searchParams.append('size', size);

    return await newRequest({url, method: 'GET'})
}