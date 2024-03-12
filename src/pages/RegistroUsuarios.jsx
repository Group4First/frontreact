import { Check, X, ChevronLeft, Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../context/context"
import { postuser } from "../requests/postusuarios";
import { updateuser } from "../requests/updateusuario";
import { getuserinfo } from "../requests/getUsuarioInfo";
import { Modal } from "../components/Modal";

export function RegistroUsuarios() {

    const navigate = useNavigate();
    const { activeAlert } = useGlobalContext();
    const { docusuario } = useParams();
    const [type, setType] = useState('password');
    const [documento, setDocumento] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [correo, setCorreo] = useState('');
    const [rol, setRol] = useState('');
    const [estado, setEstado] = useState('');
    const [correoError, setCorreoError] = useState('');
    
    const [open, setOpen] = useState(false);

    const Roles = [
        "Superadmin", "Usuario"
    ];

    const Estados = [
        "Activo", "Inactivo"
    ];

    function showHidePassword() {
        type == 'password' ? setType('text') : setType('password');
    }
    async function registrarusuario() {
        try {
            const res = await postuser(documento, nombre, apellido, contraseña, correo, rol);
            activeAlert('success', res, 2000);
        } catch (error) {
            activeAlert('error', error.message, 2000);
        }
    };

    const validateInputs = () => {
        const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
    
        if (!documento.trim() || !nombre.trim() || !apellido.trim() || !correo.trim() || !rol.trim()) {
          activeAlert('error', 'Todos los campos son requeridos', 2000);
          return false;
        } else if (!correoValido) {
          activeAlert('error', 'El formato del correo electrónico no es válido', 2000);
          return false;
        } else if (!docusuario && !contraseña.trim()) {
          activeAlert('error', 'La contraseña es requerida', 2000);
          return false;
        } else {
          return true;
        }
      };
    

    

    async function actualizarusuario() {

        try {
            const isactive = estado.trim().toLowerCase() === "activo";
            const res = await updateuser(documento, nombre, apellido, contraseña.trim() || null, isactive, correo, rol);
            activeAlert('success', res, 2000);
        } catch (error) {
            activeAlert('error', error.message, 2000);
        }
    };

    useEffect(() => {
        async function validarurl() {
            if (docusuario) {
                try {
                    const usuariotra = await getuserinfo(docusuario);
                    if (Object.keys(usuariotra).length > 0) {
                        setNombre(usuariotra.nombre);
                        setApellido(usuariotra.apellido);
                        setDocumento(usuariotra.documento);
                        setCorreo(usuariotra.email)
                        setRol(usuariotra.nombrerol)
                        if (usuariotra.isactive) {
                            setEstado("Activo")
                        }
                        else {
                            setEstado("Inactivo")
                        }
                    }
                    else {
                        activeAlert("error", "La informacion es vacia", 2000);
                    }

                } catch (error) {
                    if (error.status == 401) {
                        Cookies.remove('session')
                        activeAlert("warning", "Su sesion ha expirado, inicie sesion de nuevo", 6000)
                        setTimeout(() => {
                            navigate("/")
                        }, 3000)
                    }
                }
            }
        }
        validarurl();
    }, []);

    return (
        <section >
            <div className="w-full max-w-full h-full">
                <button className="flex items-center text-vgreen font-semibold px-16 mt-5 text-xl gap-4" onClick={() => { navigate(`/usuarios`); }}>
                    <ChevronLeft size={30} />
                    {docusuario ? 'Actualizar' : 'Registrar'} usuarios
                </button>

                <div className="w-11/12 flex justify-end mt-10 ml-5 centered">
                    <div className="w-11/12 flex justify-end mt-10 ml-5 centered">
                        <button className="px-4 py-2 bg-red-500 text-white font-medium text-sm rounded-lg flex items-center gap-2 mr-4" onClick={() => { navigate(`/usuarios`); }}>
                            <X className="h-4 w-4" /> Cancelar
                        </button>
                        <button className="px-4 py-2 bg-vgreen text-white font-medium text-sm rounded-lg flex items-center gap-2" onClick={() => {
                            if (validateInputs()) {
                                setOpen(true);
                            }
                        }}>
                            <Check className="h-4 w-4" /> {docusuario ? 'Actualizar' : 'Guardar'}
                        </button>
                        <Modal open={open} onClose={() => setOpen(false)} title={docusuario ? 'Confirmar Actualización' : 'Comfirmar registro'} text={docusuario ? '¿Esta seguro de actualizar el usuario?' : '¿Esta seguro de agregar el usuario?'} onAcept={docusuario ? (actualizarusuario) : (registrarusuario)} />
                    </div>
                </div>

                <section className="mt-5 ml-5 overflow-y-auto" style={{ maxHeight: "calc(100vh - 100px)" }}>
                    <div className="flex flex-wrap mt-3 centered">
                        {!docusuario && (
                            <div>
                                <label className="flex flex-wrap  mt-3 centered-full justify-center text-center text-black font-semibold">Documento</label>
                                <div className="bg-white h-12 w-[320px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4 mt-1 centered-full">
                                    <input onChange={(event) => { setDocumento(event.target.value); }} type="text" placeholder="Documento" className="outline-none text-vgray2 font-semibold  w-full text-center" />
                                </div>
                            </div>
                        )}
                        <div>
                            <label className="flex flex-wrap mt-3 centered-full justify-center text-center text-black font-semibold">Nombre</label>
                            <div className="bg-white h-12 w-[320px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4 mt-1 centered-full">
                                <input onChange={(event) => { setNombre(event.target.value); }} value={nombre} type="text" placeholder="Nombre" className="outline-none text-vgray2 font-semibold  w-full text-center" />
                            </div>
                        </div>
                        <div>
                            <label className="flex flex-wrap mt-3 centered-full justify-center text-center text-black font-semibold">Apellido</label>
                            <div className="bg-white h-12 w-[320px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4 mt-1 centered-full">
                                <input onChange={(event) => { setApellido(event.target.value); }} value={apellido} type="text" placeholder="Apellido" className="outline-none text-vgray2 font-semibold  w-full text-center" />
                            </div>
                        </div>
                        <div className="flex flex-wrap mt-3 centered">
                            <div>
                                <label className="flex flex-wrap mt-3 centered-full justify-center text-center text-black font-semibold">Correo</label>
                                <div className="bg-white h-12 w-[320px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4 mt-1 centered-full">
                                    <input onChange={(event) => {setCorreo(event.target.value);}} value={correo} type="text" placeholder="Correo" className="outline-none text-vgray2 font-semibold  w-full text-center" />
                                </div>
                            </div>
                            <div>
                                <label className="flex flex-wrap mt-3 centered-full justify-center text-center text-black font-semibold">Contraseña</label>
                                <div className="bg-white h-12 w-[320px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4 mt-1 centered-full">
                                    <input onChange={(event) => {setContraseña(event.target.value)}} type={type} placeholder="Contraseña" className="outline-none text-vgray2 font-semibold w-full text-center" />
                                    <button className="ml-2" onClick={() => { showHidePassword() }}>
                                        {type == 'password' ? <Eye /> : <EyeOff />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="flex flex-wrap mt-3 centered-full justify-center text-center text-black font-semibold">Rol</label>
                                <div className="bg-white h-12 w-[320px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4 mt-1 centered-full">
                                    <select onChange={(event) => { setRol(event.target.value); }} value={rol} className="outline-none text-vgray2 font-semibold  w-full text-center">
                                        <option value="" disabled>Selecciona un rol</option>
                                        {Roles.map((rol, index) => (
                                            <option key={index} value={rol}>
                                                {rol}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            {docusuario && (
                                <div>
                                    <label className="flex flex-wrap mt-3 centered-full justify-center text-center text-black font-semibold">Estado</label>
                                    <div className="bg-white h-12 w-[320px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4 mt-1 centered-full">
                                        <select onChange={(event) => { setEstado(event.target.value); }} value={estado} className="outline-none text-vgray2 font-semibold ml-3 w-full text-center">
                                            <option value="" disabled>Selecciona un estado</option>
                                            {Estados.map((estado, indexnew) => (
                                                <option key={indexnew} value={estado}>
                                                    {estado}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </section>
    )
}