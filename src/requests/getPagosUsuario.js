
import Cookies from "js-cookie";


export async function getPagosUsuario(id, currentpage, searchTerm) {
    console.log(currentpage);
    const token = Cookies.get('session') != undefined ? JSON.parse(Cookies.get('session')).token : '';

    try {
        const url = new URL('http://localhost:8080/api/user/getuserxpay');

        // Agrega los parámetros a la URL
        url.searchParams.append('Iduser', id);
        url.searchParams.append('searchTerm', searchTerm);
        url.searchParams.append('page', currentpage);
        url.searchParams.append('size', '');
        console.log(url);
        const result = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },

        });

        if (result.status === 200) {
            const data = await result.json();
            return data;
        } else {
            const errorResponse = await result.json();
            const error = new Error(errorResponse.motive || 'error');
            error.status = result.status
            throw error
        }
    } catch (error) {
        const err = new Error(error);
        err.status = error.status
        throw err
    }
}
