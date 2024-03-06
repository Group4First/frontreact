import { newRequest } from "./newRequest"

export async function postbussiness(numidentificacion,razonsocial,tipodocumento,dv,direccion,municipio,telefono,fax ,actividadeconomica,ciiu,correo,representantelegal,
                                    ccrepresentante,cajadecompensacion,numescrituraconstitucion,numnotaria,ciudad,fecha){
                       
  const body ={
    numidentificacion: numidentificacion,
    razonsocial: razonsocial,
    tipodocumento: tipodocumento,
    dv: dv,
    direccion: direccion,
    municipio: municipio,
    telefono: telefono,
    fax: fax,
    actividadeconomica: actividadeconomica,
    ciiu: ciiu,
    correo: correo,
    representantelegal: representantelegal,
    ccrepresentante: ccrepresentante,
    cajadecompensacion: cajadecompensacion,
    numescrituraconstitucion: numescrituraconstitucion,
    numnotaria: numnotaria,
    ciudad: ciudad,
    fecha: fecha
  }


  const url = new URL('https://api-wvh8.onrender.com/api/bussiness/add');

  return await newRequest({url, body, method: 'POST'})
}

