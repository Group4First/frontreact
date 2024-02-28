import { newRequest } from "./newRequest";

export async function getCalculoPagoMe(mes, anio, fechapago, numtrabajadores) {

  const url = new URL('http://localhost:8080/api/interest/getintcal');

  const body = {
    mes: mes,
    anio: anio,
    fechapago: fechapago,
    numemp: numtrabajadores,

  }
  return await newRequest({ url, body, method: 'POST' })
}