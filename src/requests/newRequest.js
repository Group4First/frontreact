import Cookies from "js-cookie"

export async function newRequest ({url, method, body}) {

  const token = Cookies.get('session') ? JSON.parse(Cookies.get('session')).token : 'token'

  const bodyRequest = { 
    method: method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }

  if (body) bodyRequest.body = JSON.stringify(body)

  try {
    const result = await fetch(url, bodyRequest)
  
    if (result.status === 200) {
      try {
        const data = await result.json();
        return data;
    } catch (error) {
        const textData = await result.text();
        return textData;
    }
    } else {
        const errorResponse = await result.json();
        const error = new Error(errorResponse.motive || 'error');
        error.status = result.status
        throw error
    }
  } catch (error) {
    const err = new Error(error.message)
    err.status = error.status
    throw err
  }
}