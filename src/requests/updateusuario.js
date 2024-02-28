import { newRequest } from "./newRequest"

export async function updateuser(documento, nombre, apellido, contraseña, isactive,correo,rol){

  const body ={
    documento: documento,
    nombre: nombre,
    apellido: apellido,
    contrasena: contraseña,
    isactive : isactive,
    email: correo,
    nombrerol: rol
  }

  const url = new URL('http://localhost:8080/api/user/update');

  return await newRequest({url, body, method: 'PUT'})
}