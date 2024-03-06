import Cookies from "js-cookie";
import { newRequest } from "./newRequest";


export async function getUsuarios(currentpage, searchTerm) {
    
    const url = new URL('https://api-wvh8.onrender.com/api/user/getall');

    // Agrega los parámetros a la URL
    url.searchParams.append('searchTerm', searchTerm);
    url.searchParams.append('page', currentpage);
    url.searchParams.append('size', '');

    return await newRequest({url, method: 'GET'})
}