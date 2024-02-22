import { Eye, EyeOff, LockKeyhole, User } from "lucide-react"
import { useEffect, useState } from "react"
import { postLogin } from "../requests/postLogin"
import { useNavigate } from "react-router-dom"
import { useGlobalContext } from "../context/context"
import Cookies from "js-cookie"

function Login() {

	const [type, setType] = useState('password')
	const [documento, setDocumento] = useState('')
	const [contraseña, setContraseña] = useState('')
	const navigate = useNavigate()


	function showHidePassword() {
		type == 'password' ? setType('text') : setType('password')
	}

	async function login() {
		try {
			const data = await postLogin(documento, contraseña)
			Cookies.set('session', JSON.stringify(data))
			navigate('/dashboard')
		} catch (error) {
			//console.log(error);
		}

	}

	useEffect(() => {
		const data = Cookies.get('session')
		if (data) {
			navigate('/dashboard')
		}
	}, [])

	return (
		<div className="w-full h-svh flex justify-center items-center">
			<div className="w-[400px] h-[500px] bg-white shadow-xl rounded-2xl  flex flex-col justify-center items-center relative">
				<img src="/logoSena.svg" alt="" className="w-28 mb-8" />

				<h1 className="text-3xl font-bold mb-8"> Iniciar sesion </h1>
				<div className="h-12 w-60 rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3">
					<User strokeWidth={2.4} />
					<input onChange={(event) => { setDocumento(event.target.value); }} type="number" placeholder="Documento" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-44" />
				</div>
				<div className="h-12 w-60 rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mt-5">
					<LockKeyhole strokeWidth={2.2} />
					<input onChange={(event) => { setContraseña(event.target.value) }} type={type} placeholder="Contraseña" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-32 mr-5" />
					<button onClick={() => { showHidePassword() }}>
						{type == 'password' ? <Eye /> : <EyeOff />}
					</button>
				</div>
				<button className="px-4 py-2 bg-vgreen text-white font-bold text-lg mt-8 rounded-xl" onClick={login}>
					Iniciar sesion
				</button>
			</div>
		</div>
	)
}
export default Login