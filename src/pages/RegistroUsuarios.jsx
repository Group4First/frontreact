import { Check, X, ChevronLeft,Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { postuser } from "../requests/postusuarios";


export function RegistroUsuarios() {
    const navigate = useNavigate();

    const [type, setType] = useState('password')
    const [documento, setDocumento] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [correo, setCorreo] = useState('');
    const [rol, setRol] = useState('');
    const [respuesta, setRespuesta] = useState('');

    const Roles = [
        "Superadmin", "Usuario"
    ];

    function showHidePassword() {
		type == 'password' ? setType('text') : setType('password')
	}

    async function registrarusuario() {
		try {
           alert(documento + "-" +nombre+ "-" +apellido+ "-" +contraseña+ "-" +correo+ "-" +rol);
           const res = await postuser(documento, nombre, apellido, contraseña, correo, rol);
           alert(JSON.stringify(res));

		} catch (error) {

		}
	}

    return (
        <section>
            <div className="w-full max-w-full h-full">
                <button className="flex items-center text-vgreen font-semibold px-16 mt-5 text-xl gap-4" onClick={() => { navigate(`/usuarios`); }}>
                    <ChevronLeft size={30} />Registrar usuarios
                </button>

                <div className="w-11/12 flex justify-end mt-10 ml-5 centered">
                    <button className="px-4 py-2 bg-red-500 text-white font-medium text-sm rounded-lg flex items-center gap-2 mr-4" onClick={() => { navigate(`/usuarios`); }}>
                        <X className="h-4 w-4" /> Cancelar
                    </button>
                    <button className="px-4 py-2 bg-green-500 text-white font-medium text-sm rounded-lg flex items-center gap-2" onClick={registrarusuario}>
                        <Check className="h-4 w-4" /> Guardar
                    </button>



                </div>
                <section className="mt-5 ml-5 overflow-y-auto " style={{ maxHeight: "calc(100vh - 100px)" }}>
                    <div className=" flex flex-wrap mt-4 centered">
                        <div className="bg-white h-12 w-[320px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4 mt-6 centered-full">
                            <input onChange={(event) => { setNombre(event.target.value); }} type="text" placeholder="Nombre" className="outline-none text-vgray2 font-semibold ml-3 w-[320px] text-center" />
                        </div>
                        <div className="bg-white h-12 w-[320px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4 mt-6 centered-full">
                            <input onChange={(event) => { setApellido(event.target.value); }} type="text" placeholder="Apellido" className="outline-none text-vgray2 font-semibold ml-3 w-[320px] text-center"  />
                        </div>
                        <div className="bg-white h-12 w-[320px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4 mt-6 centered-full">
                            <select onChange={(event) => { setRol(event.target.value); }} className="outline-none text-vgray2 font-semibold ml-3 w-[320px] text-center">
                                <option value="" disabled selected hidden>Selecciona un rol</option>
                                {Roles.map((rol, index) => (
                                    <option key={index} value={rol}>{rol}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className=" flex flex-wrap centered">
                        <div className="bg-white h-12 w-[320px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4 mt-6 centered-full">
                            <input onChange={(event) => { setDocumento(event.target.value); }} type="number" placeholder="Documento" className="outline-none text-vgray2 font-semibold ml-3 w-[320px] text-center" />
                        </div>
                        <div className="bg-white h-12 w-[320px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4 mt-6 centered-full">
                            <input onChange={(event) => { setCorreo(event.target.value); }} type="text" placeholder="Correo" className="outline-none text-vgray2 font-semibold ml-3 w-[320px] text-center"  />
                        </div>
                        <div className="bg-white h-12 w-[320px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4 mt-6 centered-full">
                            <input onChange={(event) => { setContraseña(event.target.value) }} type={type} placeholder="Contraseña" className="outline-none text-vgray2 font-semibold ml-3 w-[320px] text-center" />
                            <button onClick={() => { showHidePassword() }}>
                                {type == 'password' ? <Eye /> : <EyeOff />}
                            </button>
                        </div>
                    </div>


                </section>
            </div>
        </section>
    )
}