import { Eye, EyeOff, LockKeyhole, User } from "lucide-react"
import { useEffect, useState } from "react"
import { postLogin } from "../requests/postLogin"
import { useNavigate } from "react-router-dom"
import { useGlobalContext } from "../context/context"
import Cookies from "js-cookie"
import { Loading } from "../components/Loading"

function Login() {

	const [type, setType] = useState('password')
	const [documento, setDocumento] = useState('')
	const [contraseña, setContraseña] = useState('')
	const navigate = useNavigate()
	const {activeAlert} = useGlobalContext()
	const [isLoading, setIsLoading] = useState(false)
	const [session, setSession] = useState(Cookies.get('session'))

	useEffect(() => {
		if (session) {
			navigate('/empresas')
		}
	})


	function showHidePassword() {
		type == 'password' ? setType('text') : setType('password')
	}

	async function login() {
		try {
			setIsLoading(true)
			Cookies.remove('session')
			const data = await postLogin(documento, contraseña)
			Cookies.set('session', JSON.stringify(data))
			activeAlert('success', 'Inicio de sesion exitoso', 2000)
			setIsLoading(false)

			if (data.inforoles.idrol !== 1){
				navigate('/empresas')
			} else {
				navigate('/dashboard')
			}
		} catch (error) {
			setIsLoading(false)
			activeAlert('error', error.message)
		}
	}

	async function enter(e) {
		if (e.key === 'Enter' || e.code === 'Enter') {
			await login()
			e.preventDefault();
		}
	}

	if (!session) return (
		<div className="w-full h-svh flex justify-center items-center">
			<div className="w-[400px] h-[500px] bg-white shadow-xl rounded-2xl  flex flex-col justify-center items-center relative">
				<img src="/logoSena.svg" alt="" className="w-28 mb-8" />

				<h1 className="text-3xl font-bold mb-8"> Iniciar sesión </h1>
				<div className="h-12 w-60 rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3">
					<User strokeWidth={2.4} />
					<input onKeyDown={enter} onChange={(event) => { setDocumento(event.target.value); }} type="number" placeholder="Documento" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-44" />
				</div>
				<div className="h-12 w-60 rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mt-5">
					<LockKeyhole strokeWidth={2.2} />
					<input onKeyDown={enter} onChange={(event) => { setContraseña(event.target.value) }} type={type} placeholder="Contraseña" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-32 mr-5" />
					<button onClick={() => { showHidePassword() }}>
						{type == 'password' ? <Eye /> : <EyeOff />}
					</button>
				</div>
				<button className="px-4 py-2 bg-vgreen text-white font-bold text-lg mt-8 rounded-xl transition-all duration-300" onClick={login}>
					{!isLoading ? 'Iniciar sesión' : <Loading color="#FFFFFFg"/>}
				</button>
			</div>
		</div>
	)
}
export default Login