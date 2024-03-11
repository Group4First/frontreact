import { newRequest } from "./newRequest"

export async function updatebuss(numidentificacion,direccion,municipio,telefono,fax ,correo,representantelegal,
    ccrepresentante,cajadecompensacion,Escrituraconstitucion, Notaria, Ciudad, Fecha){

  const body ={
    numidentificacion: numidentificacion,
    direccion: direccion,
    municipio: municipio,
    telefono: telefono,
    fax: fax,
    correo: correo,
    representantelegal: representantelegal,
    ccrepresentante: ccrepresentante,
    cajadecompensacion: cajadecompensacion,
    numescrituraconstitucion: Escrituraconstitucion,
    numnotaria: Notaria,
    ciudad: Ciudad,
    fecha:Fecha
  }

  const url = new URL('https://api-wvh8.onrender.com/api/bussiness/update');

  return await newRequest({url, body, method: 'PUT'})
}