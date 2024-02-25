
import Cookies from "js-cookie";


export async function getObrasEmpresa(id, searchTerm) {

    const token = Cookies.get('session') ? JSON.parse(Cookies.get('session')).token : '';

    try {
        const url = new URL('http://localhost:8080/api/works/getbybussines');

        // Agrega los parámetros a la URL
        url.searchParams.append('bussinesid', id);
        url.searchParams.append('searchTerm', searchTerm);

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
            throw new Error(errorResponse.motive || 'Error al obtener los datos');
        }
    } catch (error) {
        throw new Error(error.message);
    }
}
