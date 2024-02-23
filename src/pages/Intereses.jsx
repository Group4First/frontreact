import { Plus, Search } from "lucide-react";
import { useState, useEffect } from "react";

import { getIntereses } from "../requests/getIntereses";
import { PaginationButtons } from "../components/PaginationButtons";


export function Intereses() {
    const [intereses, setIntereses] = useState([]);
    const [lintereses, setLintereses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(0)


    useEffect(() => {
        async function fetchData() {
            try {
                const interesesData = await getIntereses(currentPage, searchTerm);
                setIntereses(interesesData.listaintereses);
                setLintereses(interesesData);
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
        <div className="w-full max-w-fu h-svh overflow-y-auto">
            <h1 className="text-vgreen font-semibold px-16 mt-4 text-xl">Lista de intereses</h1>

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
                <div className="h-14 w-11/12 bg-white rounded-xl mb-3 grid items-center px-3 mt-6 bg grid-cols-6">
                    <h1 className=" text-vgraylight font-medium">Mes</h1>
                    <h1 className=" text-vgraylight font-medium text-center">Desde</h1>
                    <h1 className=" text-vgraylight font-medium text-center" >Hasta</h1>
                    <h1 className=" text-vgraylight font-medium text-center">Tasa legal usura</h1>
                    <h1 className=" text-vgraylight font-medium text-center">Tasa mensual</h1>
                    <h1 className=" text-vgraylight font-medium text-center">Tasa diaria</h1>
                </div>

                {intereses.map((interes, index) => (
                    <div className="h-14 w-11/12 bg-white rounded-xl grid items-center px-3 mt-5 bg grid-cols-6">
                        <h1 className="text-vgraydark font-semibold">{interes.mes}</h1>
                        <h1 className="text-vgraydark font-semibold text-center">{interes.fechainicio}</h1>
                        <h1 className="text-vgraydark font-semibold text-center">{interes.fechafin}</h1>
                        <h1 className="text-vgraydark font-semibold text-center">{interes.tasa}%</h1>
                        <h1 className="text-vgraydark font-semibold text-center">{interes.mensual}%</h1>
                        <h1 className="text-vgraydark font-semibold text-center">{interes.diario}%</h1>
                    </div>
                ))}
            </section>
            <div className="w-full flex justify-center mt-5">
                <PaginationButtons totalPages={lintereses.totalpaginas} setCurrentPage={setCurrentPage} />
            </div>

        </div>
    )
}