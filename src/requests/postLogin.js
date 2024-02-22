
export async function postLogin(documento,contraseña){

  const body ={
    documentousuario: documento,
    contraseñausuario:contraseña
  }

 try {
  const result = await fetch('http://localhost:8080/api/user/auth',{
    method:'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(body)
  })

  if (result.status == 200) {
    return await result.json()
  } else {
    throw new Error('error para pedir los datos')
  }

 } catch (error) {
    throw new Error('Error para pedir los datos')
 }
}
