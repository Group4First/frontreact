import { ChevronLeft, Check, Plus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";


export function RegistroObra() {

    const navigate = useNavigate()
    const { id } = useParams();

    const [tipoObra, setTipoObra] = useState(""); // Estado para el tipo de obra
    const Tipos = [
        "Mensual", "A todo costo", "Mano de obra"
    ];


    const handleTipoObraChange = (event) => {
        setTipoObra(event.target.value);
    };






    return (
        <section>
            <div className="w-full max-w-full h-full ">
                <button className="flex items-center text-vgreen font-semibold px-16 mt-5 text-xl gap-4" onClick={() => { navigate(`/empresas/${id}/obras`) }}>
                    <ChevronLeft size={30} />Registrar obras
                </button>



                <section className="mt-5 ml-5 overflow-y-auto" style={{ maxHeight: "calc(100vh - 100px)" }}>
                    <div className="relative flex xl:p-12 max-xl:p-4 items-center gap-4">
                        <div className="xl:scale-0 max-xl:flex-grow max-xl:border-t max-xl:border-gray-400"></div>
                        <h1 className=" text-gray-400">Nueva obra</h1>
                        <div className="flex-grow border-t border-gray-400"></div>

                    </div>

                    <div className="w-11/12 flex justify-end mt-10 ml-5 centered">
                        <button className="px-4 py-2 bg-green-500 text-white font-medium text-sm rounded-lg flex items-center gap-2" onClick={""}>
                            <Check className="max-h-4 max-w-4" /> Registrar
                        </button>
                    </div>
                    <div className=" flex flex-wrap mt-4 centered">
                        <div>
                            <label className="flex flex-wrap mt-4 centered-full justify-center text-center text-black font-semibold">Nombre o descripcion de la obra</label>
                            <div className="bg-white h-16 w-[1130px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4 mt-1 centered-textarea">
                                <textarea
                                    onChange={(event) => { setNumIdentificacion(event.target.value); }}
                                    placeholder="Descripcion / Nombre"
                                    className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-full text-center" // Ajusta los estilos según tus necesidades
                                    style={{ resize: 'none' }} // Evita que el usuario redimensione el textarea
                                />                    </div>
                        </div>
                    </div>



                    <div className="flex flex-wrap centered">
                        <div>
                            <label className="flex flex-wrap mt-4 centered-full justify-center text-center text-black font-semibold">Tipo de obra</label>
                            <div className="bg-white h-12 w-[320px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4 mt-1 centered-full">
                                <select onChange={handleTipoObraChange} className="outline-none text-vgray2 font-semibold ml-3 w-[320px] text-center">
                                    <option value="" defaultValue={"Selecciona un rol"}>Selecciona un tipo</option>
                                    {Tipos.map((tipo, index) => (
                                        <option key={index} value={tipo}>{tipo}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="flex flex-wrap mt-4 centered-full justify-center text-center text-black font-semibold">Fecha de inicio</label>
                            <div className="bg-white h-12 w-[320px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4 mt-1 centered-full">
                                <input type="Date" placeholder="Fecha de inicio" className="outline-none text-vgray2 font-semibold ml-3 w-[320px] text-center" min="2000" max="2099" />
                            </div>
                        </div>
                        {tipoObra !== "Mensual" && ( // Si no es Mensual, muestra los inputs de fecha
                            <>
                                <div>
                                    <label className="flex flex-wrap mt-4 centered-full justify-center text-center text-black font-semibold">Fecha de fin</label>
                                    <div className="bg-white h-12 w-[320px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4 mt-1 centered-full">
                                        <input type="Date" placeholder="Fecha de fin" className="outline-none text-vgray2 font-semibold ml-3 w-[320px] text-center" min="2000" max="2099" />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </section>

            </div>
        </section >

    )
}