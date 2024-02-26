import { newRequest } from "./newRequest"

export async function postinterest(mes, anio, tasaanual, smmv){

  const body ={
    mes: mes,
    anio: anio,
    tasaanual: tasaanual,
    smmv: smmv
  }


  const url = new URL('http://localhost:8080/api/interest/add');

  return await newRequest({url, body, method: 'POST'})
}