import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getObrasEmpresa } from "../requests/getObrasEmpresa";
import { ChevronLeft, Plus, Search } from "lucide-react";
import { CardPagos } from "../components/cardPagos";

export function Obras() {
    const { id } = useParams();
    const [obras, setObras] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')
    const [error, setError] = useState(null);
    const navigate = useNavigate()


    useEffect(() => {
        async function fetchData() {
            try {
                const obrasData = await getObrasEmpresa(id, searchTerm);
                setObras(obrasData);
                setError(null);
            } catch (error) {
                setObras([]);
                setError(error.message);
            }
        }

        fetchData();
    }, [searchTerm]);
    return (
        <div className="w-full max-w-full h-svh overflow-y-auto">
            <button className="flex items-center text-vgreen font-semibold px-16 mt-5 text-xl gap-4" onClick={() => { navigate(`/empresas`); }}>
                <ChevronLeft size={30} />Lista de obras
            </button>
            {error ? (
                <h1 className="text-red-500 font-semibold px-16 mt-4 text-3xl text-center ">{error}</h1>
            ) : (<>
                <section className=" flex justify-center">
                    <div className=" w-11/12 flex items-center justify-between mt-10 ">
                        <div className="h-12 w-60 rounded-xl border-2 bg-[#E6E5E5] flex items-center text-vgray2 justify-center">
                            <Search size={20} color="#7D7D7D" />
                            <input onChange={(event) => { setSearchTerm(event.target.value); }} type="text" placeholder="Buscar" className=" bg-[#E6E5E5] placeholder:font-medium placeholder:text-[#7D7D7D] outline-none text-black font-semibold ml-3 w-44" />
                        </div>
                        <button className="px-4 py-2 bg-vgreen text-white font-medium text-sm rounded-lg flex gap-2" onClick={()=>{
                       //     navigate('/empresas/obras/registro')
                        }} >
                            <Plus size={20} color="#FFFFFF" />
                            Añadir
                        </button>
                    </div>
                </section>
                <div className="w-full mb-10 flex justify-center">
                    <div className="w-11/12 mt-5">
                        <section className="grid gap-x-14 gap-y-7 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 ">
                            {obras.map((obra, index) => {

                                const colorType = obra.tipo == 'Mensual' ? '#5A7FFF' : '#F97429'
                                const colorState = obra.estado == 'En curso' ? '#39A900' : '#FF0000'
                                  console.log(`Index: ${index}, Text: ${obra.estado}, Color: ${colorState}`);

                                return <div key={index} className="bg-white rounded-lg">
                                    <div className="w-full flex-col ml-10 mt-7 mb-7">
                                        <h1 className="font-semibold text-vgraydark text-lg ">{obra.descripcion}</h1>
                                        <h2 className="font-medium text-vgraylight mt-10 text-nowrap">Ultimo pago: {obra.fechaultimopago == null ? 'No se han registrado pagos': obra.fechaultimopago}</h2>
                                        <h2 className="font-medium text-vgraylight mt-6">Fecha inicio: {obra.fechainicio }</h2>
                                    </div>
                                    <div className="flex justify-around w-full mb-7 ">
                                        <CardPagos color={colorType} type={'Tipo'} text={obra.tipo} />
                                        <CardPagos color={colorState} type={'Estado'} text={obra.estado} />
                                    </div>
                                </div>
                            })}

                        </section>
                    </div>

                </div>
            </>)}

        </div>
    )
}