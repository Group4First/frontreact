import Cookies from "js-cookie";


export async function getUsuarios(currentpage, searchTerm) {
    console.log(currentpage);
    const token = Cookies.get('session') ? JSON.parse(Cookies.get('session')).token : '';

    try {
        const url = new URL('http://localhost:8080/api/user/getall');

        // Agrega los parámetros a la URL
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
            throw new Error('Error al obtener los datos');
        }
    } catch (error) {
        throw new Error('Error al obtener los datos');
    }
}