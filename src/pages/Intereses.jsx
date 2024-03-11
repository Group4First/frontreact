import { Plus, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { getIntereses } from "../requests/getIntereses";
import { PaginationButtons } from "../components/paginationButtons";
import { useGlobalContext } from "../context/context";
import { Loading } from "../components/Loading";


export function Intereses() {
    const navigate = useNavigate()
    const [intereses, setIntereses] = useState([]);
    const [lintereses, setLintereses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(0)
    const { activeAlert } = useGlobalContext()

    useEffect(() => {
        async function fetchData() {
            try {
                const interesesData = await getIntereses(currentPage, searchTerm);
                setIntereses(interesesData.listaintereses);
                setLintereses(interesesData);
            } catch (error) {
                if (error.status == 401) {
                    activeAlert("warning", "Su sesion ha expirado, inicie sesion de nuevo", 6000)
                    setTimeout(() => {
                        navigate("/")
                    }, 3000)
                }
            }
        }

        fetchData();
    }, [currentPage, searchTerm]);

    useEffect(() => {
        if (searchTerm !== '') {
            setCurrentPage(0);
        }
    }, [searchTerm]);

    if (lintereses === null) {
        return <div className="w-full max-w-fu h-svh flex justify-center items-center">
            <Loading size={50} />
        </div>
    }

    if (lintereses !== null) return (
        <div className="w-full max-w-fu h-svh overflow-y-auto">
            <h1 className="text-vgreen font-semibold px-16 mt-4 text-xl">Lista de intereses</h1>

            <section className=" flex justify-center">
                <div className=" w-11/12  flex xl:items-end max-xl:items-center justify-between mt-10 max-xl:flex-col max-xl:gap-10 max-xl:justify-center">
                    <div className="flex flex-wrap mt-4 max-xl:justify-center">
                        <div className="bg-white h-12 w-[320px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4 mt-6 centered-full">
                            <label htmlFor="Mes" className="text-vgray2 font-semibold flex-grow ml-4">Mes</label>
                            <input onChange={(event) => { setSearchTerm(event.target.value); }} type="date" id="Mes" placeholder="Mes" className="outline-none text-black font-semibold w-[150px]" />
                        </div>
                        <div className="bg-white h-12 w-[320px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4 mt-6 centered-full">
                            <label htmlFor="Año" className="text-vgray2 font-semibold flex-grow ml-4">Año</label>
                            <input onChange={(event) => { setSearchTerm(event.target.value); }} type="date"    id="Año" placeholder="Año" className="outline-none text-black font-semibold w-[150px]" />
                        </div>
                    </div>

                    <button className="px-4 py-2 xl:mb-2 bg-vgreen text-white font-medium text-sm rounded-lg flex gap-2" onClick={() => {
                        navigate('/intereses/registrointereses')
                    }}>
                        <Plus size={20} color="#FFFFFF" />
                        Añadir
                    </button>
                </div>
            </section>


            <section className="flex flex-col items-center relative overflow-x-auto">
                <div className="max-xl:scale-0 h-14 w-11/12 bg-white rounded-xl mb-3 grid items-center px-3 mt-6 grid-cols-7">
                    <h1 className=" text-vgraylight font-medium">Año</h1>
                    <h1 className=" text-vgraylight font-medium">Mes</h1>
                    <h1 className=" text-vgraylight font-medium text-center">Desde</h1>
                    <h1 className=" text-vgraylight font-medium text-center" >Hasta</h1>
                    <h1 className=" text-vgraylight font-medium text-center">Tasa legal usura</h1>
                    <h1 className=" text-vgraylight font-medium text-center">Tasa mensual</h1>
                    <h1 className=" text-vgraylight font-medium text-center">Tasa diaria</h1>
                </div>
                <div className="w-full flex xl:items-center xl:flex-col max-xl:justify-center max-xl:flex-row max-xl:flex-wrap max-xl:-translate-y-16">
                    {intereses?.map((interes, index) => (
                        <div key={index} className={`text-vgraydark font-semibold bg-white rounded-xl items-center px-3 mt-5 max-xl:max-w-[280px] max-xl:w-[280px] max-xl:p-5 max-xl:rounded-2xl max-xl:mx-4 xl:grid xl:text-center xl:grid-cols-7 xl:h-14 xl:w-11/12`}>

                            <h1 className="text-left"> <span className="xl:text-[0px] xl:text-transparent xl:scale-0 text-black"> Año: </span>{interes.año}</h1>
                            <h1 className="text-left"> <span className="xl:text-[0px] xl:text-transparent xl:scale-0 text-black"> Mes: </span>{interes.mes}</h1>
                            <h1 className=""> <span className="xl:text-[0px] xl:text-transparent xl:scale-0 text-black"> Desde: </span>{interes.fechainicio}</h1>
                            <h1 className=""> <span className="xl:text-[0px] xl:text-transparent xl:scale-0 text-black"> Hasta: </span>{interes.fechafin}</h1>
                            <h1 className=""> <span className="xl:text-[0px] xl:text-transparent xl:scale-0 text-black"> Tasa legal usura: </span>{interes.tasa}%</h1>
                            <h1 className=""> <span className="xl:text-[0px] xl:text-transparent xl:scale-0 text-black"> Tasa mensual: </span>{interes.mensual}%</h1>
                            <h1 className=""> <span className="xl:text-[0px] xl:text-transparent xl:scale-0 text-black"> Tasa diaria: </span>{interes.diario}%</h1>
                        </div>
                    ))}

                </div>

            </section>
            <div className="w-full flex justify-center mt-5">
                <PaginationButtons totalPages={lintereses.totalpaginas} setCurrentPage={setCurrentPage} currentPage={currentPage} />
            </div>

        </div>
    )
}