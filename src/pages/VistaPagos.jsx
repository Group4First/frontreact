import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PaginationButtons } from "../components/paginationButtons";
import { CardPagos } from "../components/cardPagos";
import { getPagosObra } from "../requests/getPagosObra";

export function VistaPagos() {
    const { idempresa } = useParams();
    const { idobra } = useParams();
    const [pagos, setPagos] = useState([]);
    const [lpagos, setLPagos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    // const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0)
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const pagosData = await getPagosObra(idobra, currentPage);
                setPagos(pagosData.listapagos);
                setLPagos(pagosData);
                console.log("pagosdata:", pagosData);
                console.log("pagosdatalistapagos:", pagosData.listapagos);
            } catch (error) {
                setPagos([])

            }
        }

        fetchData();
    }, [currentPage]);
    const colorType = lpagos.tipo == 'Mensual' ? '#5A7FFF' : '#F97429'
    const colorState = lpagos.estado == 'En curso' ? '#39A900' : '#FF0000'

    return (

        <div className="w-full max-w-fu h-svh overflow-y-auto">
            <button className="flex items-center text-vgreen font-semibold px-16 mt-5 text-xl gap-4" onClick={() => { navigate(`/empresas/${idempresa}/obras`); }}>
                <ChevronLeft size={30} />Vista de pago
            </button>
            <section className="w-full flex justify-around flex-wrap mt-8 mb-10 gap-10">
                <div className="max-w-[350px]">
                    <h1 className="text-vgraydark font-semibold text-xl">{lpagos.razonsocial}</h1>
                    <h2 className="text-vgraylight font-medium text-lg mt-4 ">{lpagos.descripcion}</h2>
                </div>

                <div className="flex gap-10">
                    <div className="max-w-52 flex flex-col justify-around h-full">
                        <h1 className="text-vgraylight font-medium text-md"> Fecha inicio: <br /> {lpagos.fechainicio}</h1>
                        <h1 className="text-vgraylight font-medium text-md"> Fecha fin: <br /> {lpagos.fechafin}</h1>
                    </div>
                    <div className="max-w-40 flex flex-col gap-3">
                        <CardPagos color={colorType} type={'Tipo'} text={lpagos.tipo} />
                        <CardPagos color={colorState} type={'Estado'} text={lpagos.estado} />
                    </div>
                    {lpagos.tipo == 'Mensual' && lpagos.estado == 'En curso' && (
                        <button className="h-14 w-32 text-white font-medium text-sm rounded-lg  bg-blue-400">
                            Finalizar obra
                        </button>
                    )}
                </div>

            </section>

            {lpagos.tipo == 'Mensual' ? (
                <>
                    {lpagos.estado == 'En curso' && (
                        <>
                            {/* registro pago mensual*/}
                        </>
                    )}
                    <section className="flex flex-col items-center relative overflow-x-auto">
                        <div className="max-xl:scale-0 h-14 w-11/12 bg-white rounded-xl mb-3 grid items-center px-3 grid-cols-[0.3fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr]">
                            <h1 className="text-vgraylight font-medium">Año</h1>
                            <h1 className="text-vgraylight font-medium text-center">Mes</h1>
                            <h1 className="text-vgraylight font-medium text-center" >Fecha de <br /> pago</h1>
                            <h1 className="text-vgraylight font-medium text-center">Número  <br />Trabajadores</h1>
                            <h1 className="text-vgraylight font-medium text-center">Tipo  <br />pago</h1>
                            <h1 className="text-vgraylight font-medium text-center">FIC</h1>
                            <h1 className="text-vgraylight font-medium text-center">Intereses</h1>
                            <h1 className="text-vgraylight font-medium text-center">Total</h1>
                        </div>
                        {pagos.map((pago, index) => {
                            const colorInterest = pago.valorintereses == '0.0' ? '#848484' : '#FF0000';
                            return (
                                <div key={index} className={`text-vgraydark font-semibold bg-white rounded-xl items-center px-3 mt-5 max-xl:max-w-[280px] max-xl:w-[280px] max-xl:p-5 max-xl:rounded-2xl max-xl:mx-4 xl:grid xl:text-center xl:grid-cols-[0.3fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] xl:h-14 xl:w-11/12`}>
                                    <h1 className="text-left"> <span className="xl:text-[0px] xl:text-transparent xl:scale-0 text-black"> Año: </span> {pago.anio}</h1>
                                    <h1 className=""> <span className="xl:text-[0px] xl:text-transparent xl:scale-0 text-black"> Mes: </span> {pago.mes}</h1>
                                    <h1 className=""> <span className="xl:text-[0px] xl:text-transparent xl:scale-0 text-black"> Fecha de pago: </span>  {pago.fechapago}</h1>
                                    <h1 className=""> <span className="xl:text-[0px] xl:text-transparent xl:scale-0 text-black"> Número Trabajadores: </span> {pago.numtrabajadores}</h1>
                                    <h1 className=""> <span className="xl:text-[0px] xl:text-transparent xl:scale-0 text-black"> Tipo pago: </span> {pago.tipopago}</h1>
                                    <h1 className={`text-${colorInterest}`}> <span className="xl:text-[0px] xl:text-transparent xl:scale-0 text-black"> FIC: </span> {formatCurrency(pago.valorfic)}</h1>
                                    <h1 className="text-[#FF0000]"> <span className="xl:text-[0px] xl:text-transparent xl:scale-0 text-black"> Intereses: </span>{formatCurrency(pago.valorintereses)}</h1>
                                    <h1 className="text-vgreen"> <span className="xl:text-[0px] xl:text-transparent xl:scale-0 text-black"> Total: </span>{formatCurrency(pago.valortotal)}</h1>

                                </div>
                            )
                        })}

                    </section>

                    <div className="w-full flex justify-center mt-5">
                        <PaginationButtons totalPages={lpagos.totalPages} setCurrentPage={setCurrentPage} />
                    </div>

                </>
            ) : (
                <>
                    {lpagos.estado == 'En curso' ? (
                        <>
                            {/* registro pago presuntiva*/}
                        </>
                    ) : (
                        <>
                            <section className="flex flex-col items-center relative overflow-x-auto">
                                <div className="max-xl:scale-0 h-14 w-11/12 bg-white rounded-xl mb-3 grid items-center px-3 grid-cols-[1fr_1fr_1fr]">

                                    <h1 className="text-vgraylight font-medium text-center" >Fecha de <br /> pago</h1>
                                    <h1 className="text-vgraylight font-medium text-center">Tipo  <br />pago</h1>
                                    <h1 className="text-vgraylight font-medium text-center">Total</h1>
                                </div>
                                {pagos.map((pago, index) => {
                                    const colorInterest = pago.valorintereses == '0.0' ? '#848484' : '#FF0000';
                                    return (
                                        <div key={index} className={`text-vgraydark font-semibold bg-white rounded-xl items-center px-3 mt-5 max-xl:max-w-[280px] max-xl:w-[280px] max-xl:p-5 max-xl:rounded-2xl max-xl:mx-4 xl:grid xl:text-center xl:grid-cols-[1fr_1fr_1fr] xl:h-14 xl:w-11/12`}>
                                            <h1 className=""> <span className="xl:text-[0px] xl:text-transparent xl:scale-0 text-black"> Fecha de pago: </span>  {pago.fechapago}</h1>
                                            <h1 className=""> <span className="xl:text-[0px] xl:text-transparent xl:scale-0 text-black"> Tipo pago: </span> {pago.tipopago}</h1>
                                            <h1 className="text-vgreen"> <span className="xl:text-[0px] xl:text-transparent xl:scale-0 text-black"> Total: </span>{formatCurrency(pago.valorfic)}</h1>

                                        </div>
                                    )
                                })}
                            </section>
                        </>
                    )}
                </>
            )}
        </div>

    )
}