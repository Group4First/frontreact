import { newRequest } from "./newRequest"

export async function postLogin(documento, contraseña){

  const body ={
    documentousuario: documento,
    contraseñausuario: contraseña
  }

  const url = "http://localhost:8080/api/user/auth"

  return await newRequest({url, body, method: 'POST'})
}
