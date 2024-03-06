import { newRequest } from "./newRequest"

export async function postLogin(documento, contraseña){

  const body ={
    documentousuario: documento,
    contraseñausuario: contraseña
  }

  const url = "https://api-wvh8.onrender.com/api/user/auth"

  return await newRequest({url, body, method: 'POST'})
}
