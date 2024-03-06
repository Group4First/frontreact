import { newRequest } from "./newRequest"

export async function postinterest(mes, anio, tasaanual, smmv){

  const body ={
    mes: mes,
    anio: anio,
    tasaanual: tasaanual,
    smmv: smmv
  }


  const url = new URL('https://api-wvh8.onrender.com/api/interest/add');

  return await newRequest({url, body, method: 'POST'})
}