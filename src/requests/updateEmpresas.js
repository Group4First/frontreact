import { newRequest } from "./newRequest"

export async function updatebuss(numidentificacion,razonsocial,tipodocumento,dv,direccion,municipio,telefono,fax ,actividadeconomica,ciiu,correo,representantelegal,
    ccrepresentante,cajadecompensacion,numescrituraconstitucion,numnotaria,ciudad,fecha){

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
  }



  private String numidentificacion;
    private String direccion;
    private String municipio;
    private String telefono;
    private String fax;
    private String correo;
    private String representantelegal;
    private String ccrepresentante;
    private String cajadecompensacion;


  const url = new URL('http://localhost:8080/api/user/update');

  return await newRequest({url, body, method: 'PUT'})
}