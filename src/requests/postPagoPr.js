import Cookies from "js-cookie";
import { newRequest } from "./newRequest"

export async function postPagoPr(fechapago, tipopago, valorfic, idobra) {

  const idusuario = Cookies.get('session') ? JSON.parse(Cookies.get('session')).idusuario : 'idusuario'

  const body = {
    fechapago: fechapago,
    tipopago: tipopago,
    valorfic: valorfic,
    idobra: idobra,
    idusuario: idusuario
  }

  const url = new URL('http://localhost:8080/api/payment/addpr');

  return await newRequest({ url, body, method: 'POST' })
}

