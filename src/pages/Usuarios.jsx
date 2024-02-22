import { Eye, Plus, Search, SquarePen } from "lucide-react";
import { useState, useEffect } from "react";
import { getUsuarios } from "../requests/getUsuarios";
import { Paginationbuttons } from "../components/paginationButtons";
import { useNavigate } from "react-router-dom";


export function Usuarios() {

    const [usuarios, setUsuarios] = useState([]);
    const [lusuarios, setLusuarios] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(0)
    const navigate = useNavigate()


    useEffect(() => {
        async function fetchData() {
            try {
                const usuariosData = await getUsuarios(currentPage, searchTerm);
                setUsuarios(usuariosData.userinfo);
                setLusuarios(usuariosData)
                console.log(usuariosData);
            } catch (error) {
                console.error('Error al obtener datos de empresas:', error);
            }
        }

        fetchData();
    }, [currentPage, searchTerm]);

    useEffect(() => {
        if (searchTerm !== '') {
            setCurrentPage(0);
        }
    }, [searchTerm]);
    return (

        <div className="w-full max-w-fu h-svh">
            <h1 className="text-vgreen font-semibold px-16 mt-4 text-xl">Lista de usuarios</h1>

            <section className=" flex justify-center">
                <div className=" w-11/12 flex items-center justify-between mt-10 ">
                    <div className="h-12 w-60 rounded-xl border-2 bg-[#E6E5E5] flex items-center text-vgray2 justify-center">
                        <Search size={20} color="#7D7D7D" />
                        <input onChange={(event) => { setSearchTerm(event.target.value); }} type="text" placeholder="Buscar" className=" bg-[#E6E5E5] placeholder:font-medium placeholder:text-[#7D7D7D] outline-none text-black font-semibold ml-3 w-44" />
                    </div>
                    <button className="px-4 py-2 bg-vgreen text-white font-medium text-sm rounded-lg flex gap-2" >
                        <Plus size={20} color="#FFFFFF" />
                        Añadir
                    </button>
                </div>
            </section>


            <section className="flex flex-col items-center relative overflow-x-auto">
                <div className="h-14 w-11/12 bg-white rounded-xl mb-3 grid items-center px-3 mt-6 bg"
                    style={{ gridTemplateColumns: '1fr 1fr 1.5fr 1fr 0.7fr 0.5fr' }}>
                    <h1 className=" text-vgraylight font-medium">Nombre</h1>
                    <h1 className=" text-vgraylight font-medium text-center">Documento</h1>
                    <h1 className=" text-vgraylight font-medium text-center" >Correo</h1>
                    <h1 className=" text-vgraylight font-medium text-center">Rol</h1>
                    <h1 className=" text-vgraylight font-medium text-center">Activo</h1>
                </div>

                {usuarios.map((usuario, index) => (
                    <div key={index} className="h-14 w-11/12 bg-white rounded-xl grid items-center px-3 mt-5 mb-3"
                        style={{ gridTemplateColumns: '1fr 1fr 1.5fr 1fr 0.7fr 0.5fr' }}>
                        <h1 className="text-vgraydark font-semibold">{usuario.nombre_completo}</h1>
                        <h1 className="text-vgraydark font-semibold text-center">{usuario.documento}</h1>
                        <h1 className="text-vgraydark font-semibold text-center">{usuario.email}</h1>
                        <h1 className="text-vgraydark font-semibold text-center">{usuario.inforoles.nombrerol}</h1>
                        <div className="flex items-center justify-center h-full w-full ">
                            <span className={`${usuario.isactive ? "bg-green-600" : "bg-red-500"} rounded-full h-6 w-6`}></span>
                        </div>
                        <div className="flex gap-5 justify-center">
                            <button className={`${usuario.ispay ? "text-[#204ADF]" : "text-vgraylight"}`}onClick={()=>{
                                navigate(`/pagos-usuario/${usuario.idusuario}`)
                            }}>
                                <Eye/>
                            </button>
                            <button>
                                <SquarePen color="#00AF00" />
                            </button>
                        </div>
                    </div>
                ))}
            </section>
            <Paginationbuttons totalPages={lusuarios.totalpaginas} setCurrentPage={setCurrentPage} />
        </div>

    )
}