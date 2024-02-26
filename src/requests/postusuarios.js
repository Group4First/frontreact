import { newRequest } from "./newRequest"

export async function postuser(documento, nombre, apellido, contraseña, correo,rol){

  const body ={
    documento: documento,
    nombre: nombre,
    apellido: apellido,
    contrasena: contraseña,
    email: correo,
    nombrerol: rol
  }

  const url = new URL('http://localhost:8080/api/user/create');

  return await newRequest({url, body, method: 'POST'})
}

