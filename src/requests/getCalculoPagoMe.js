import { newRequest } from "./newRequest";

export async function getCalculoPagoMe(mes, anio, fechapago, numtrabajadores,tipo) {

  const url = new URL('https://api-wvh8.onrender.com/api/interest/getintcal');

  const body = {
    mes: mes,
    anio: anio,
    fechapago: fechapago,
    numemp: numtrabajadores,
    tipo:tipo

  }
  return await newRequest({ url, body, method: 'POST' })
}