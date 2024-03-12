import { ChevronLeft, Circle, Loader2, LoaderIcon, Printer } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CardPagos } from "../components/cardPagos";
import { getPagosObra } from "../requests/getPagosObra";
import { putFinalizarObra } from "../requests/putFinalizarObra";
import { useGlobalContext } from "../context/context";
import { FormRegisterPay } from "../components/FormRegisterPay";
import { TablePayWork } from "../components/TablePayWork";
import { Modal } from "../components/Modal";
import {  File } from "lucide-react";
import { Pdf } from "../components/Pdf";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Cookies from "js-cookie";

export function VistaPagos() {
    const { idempresa } = useParams();
    const { idobra } = useParams();
    const { activeAlert } = useGlobalContext()
    const [pagos, setPagos] = useState([]);
    const [lpagos, setLPagos] = useState(null);
    const [obraFinalizada, setObraFinalizada] = useState(false);
    const [fechafin, setFechafin] = useState('');

    const [open, setOpen] = useState(false);

    const [formattedFechaPagoMayor, setFormattedFechaPagoMayor] = useState('');

    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0)
    const [reload, setReaload] = useState(false)

    useEffect(() => {
        async function fetchData() {
            setLPagos(null)
            try {

                const pagosData = await getPagosObra(idobra, currentPage);
                setPagos(pagosData.listapagos);
                setLPagos(pagosData)

                // Obtener el pago mayor
                const fechaPagoMayor = pagosData.listapagos.reduce((fechaMayor, pago) => {
                    const fechaPago = new Date(pago.fechapago);
                    fechaPago.setDate(fechaPago.getDate());
                    return fechaPago > fechaMayor ? fechaPago : fechaMayor;
                }, new Date(0));

                // Formatear la fecha en el formato deseado (YYYY-MM-DD)
                setFormattedFechaPagoMayor(fechaPagoMayor.toISOString().slice(0, 10));

            } catch (error) {
                setPagos([])
                if (error.status == 401) {
                    Cookies.remove('session')
                    activeAlert("warning", "Su sesion ha expirado, inicie sesion de nuevo", 6000)
                    setTimeout(() => {
                        navigate("/")
                    }, 3000)
                }
            }
        }

        fetchData();
    }, [currentPage, reload]);



    async function putFinalizar() {
        try {
            if (fechafin) {
                const pagosData = await putFinalizarObra(idobra, fechafin);
                setReaload(!reload)

                setFechafin('')
                setObraFinalizada(false);

            }
        } catch (error) {
            if (error.status == 401) {
                activeAlert("warning", "Su sesion ha expirado, inicie sesion de nuevo", 6000)
                setTimeout(() => {
                    navigate("/")
                }, 3000)
            }

        }
    }

    const [colorType, setColorType] = useState('')
    const [colorState, setColorState] = useState('')

    useEffect(() => {
        if (lpagos == null) return
        lpagos.tipo == 'Mensual' ? setColorType('#5A7FFF') : setColorType('#F97429')
        lpagos.estado == 'En curso' ? setColorState('#39A900') : setColorState('#FF0000')
    }, [lpagos])

    if (lpagos === null) return (
        <div className="w-full max-w-full h-svh flex items-center justify-center">
            <div className="animate-spin">
                <Loader2 color="#39A900" size={50}/>
            </div>
        </div>
    )

    if (lpagos !== null ) return (
        <div className="w-full max-w-full h-svh overflow-y-auto">
            <button className="flex items-center text-vgreen font-semibold px-16 mt-5 text-xl gap-4" onClick={() => { navigate(`/empresas/${idempresa}/obras`); }}>
                <ChevronLeft size={30} />Vista de pago
            </button>
            <section className="w-full flex max-xl:flex-col max-xl:items-center justify-around flex-wrap mt-8  max-lg:mb-1 xl:mb-2 gap-10">
                <div className="max-w-[350px]">
                    <h1 className="text-vgraydark font-semibold text-xl">{lpagos.razonsocial}</h1>
                    <h2 className="text-vgraylight font-medium text-lg mt-4 ">{lpagos.descripcion}</h2>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-row max-xl:flex-col max-xl:gap-5  gap-10">
                        <h1 className="text-vgraylight font-medium text-md"> Fecha inicio: {lpagos.fechainicio}</h1>
                        <h1 className="text-vgraylight font-medium text-md"> Fecha fin:  {lpagos.fechafin}</h1>
                    </div>
                    <div className=" flex max-xl:flex-col max-xl:gap-5 gap-20">
                        <CardPagos color={colorType} type={'Tipo'} text={lpagos.tipo} />
                        <CardPagos color={colorState} type={'Estado'} text={lpagos.estado} />

                        <div className="flex items-center">
                            {lpagos.tipo == 'Mensual' && lpagos.estado == 'En curso' && pagos.length > 0 && (
                                <button className="h-12 w-32 text-white font-medium text-sm rounded-lg  bg-blue-400" onClick={() => {
                                    // Actualiza el estado para indicar que la obra ha sido finalizada
                                    setObraFinalizada(true);
                                }}>
                                    Finalizar obra
                                </button>
                            )}
                        </div>

                    </div>

                </div>
                {obraFinalizada && (
                    <div className="w-full">
                        <div className="relative flex xl:p-12 max-xl:p-4 items-center gap-4">
                            <div className="flex-grow border-t border-gray-400"></div>
                            <h1 className=" text-gray-400"> Fecha de finalizacion de la obra</h1>
                            <div className="flex-grow border-t border-gray-400"></div>
                        </div>
                        <div className="w-full flex justify-center mt-2 gap-10 flex-wrap ">
                            <div className="bg-white h-12 w-[320px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4  centered-full">
                                <label htmlFor="fecha" className="text-vgray2 font-semibold flex-grow ml-4">Fecha</label>
                                <input value={fechafin} onChange={(event) => { setFechafin(event.target.value); }} type="date" id="fecha" placeholder="Fecha" className="outline-none text-black font-semibold w-[150px] " min={formattedFechaPagoMayor} />
                            </div>
                            <button className="h-12 w-24 text-white font-medium text-sm rounded-lg  bg-vgreen  " onClick={() => {
                                if (fechafin) {
                                    setOpen(true)
                                } else {
                                    activeAlert('error', 'Ingrese una fecha', 2000);
                                }
                            }}>
                                Aceptar
                            </button>
                            <Modal open={open} onClose={() => setOpen(false)} title={'Confirmar actualización'} text={'¿Esta seguro de finalizar esta obra?'} onAcept={putFinalizar} />
                            <button className="h-12 w-24 text-white font-medium text-sm rounded-lg  bg-red-500  " onClick={() => {
                                setObraFinalizada(false)
                            }}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                )}

            </section>
            <FormRegisterPay idobra={idobra} setReaload={setReaload} type={lpagos.tipo} state={lpagos.estado} formattedFechaPagoMayor={formattedFechaPagoMayor} reload={reload} />

            <TablePayWork type={lpagos.tipo} pagos={pagos} setCurrentPage={setCurrentPage} totalPages={lpagos.totalpaginas} currentPage={currentPage}/>

            <div className="w-full flex mb-5 justify-center">
                <div className="w-11/12 flex justify-end">
                    <PDFDownloadLink document={<Pdf idwork={idobra} />} fileName="RegistrodepagosFIC.pdf">
                        {({ blob, url, loading, error }) =>
                            <button document={<Pdf />} className="h-10 w-32 justify-center gap-2 flex items-center text-white font-medium text-sm rounded-lg bg-red-500">
                                <Printer size={20}/>
                                Imprimir
                            </button>
                        }
                    </PDFDownloadLink>
                </div>
            </div>

        </div >

    )
}