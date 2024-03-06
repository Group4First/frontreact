import { newRequest } from "./newRequest"

export async function postObras(descripcion, tipo, fechainicio, fechafin, empresaid) {

  const body = {
    descripcion :descripcion,
    tipo : tipo,
    fechainicio :fechainicio,
    fechafin :fechafin,
    estado : 'En curso',
    empresaid :empresaid
  }

  const url = new URL('https://api-wvh8.onrender.com/api/works/add');

  return await newRequest({ url, body, method: 'POST' })
}

