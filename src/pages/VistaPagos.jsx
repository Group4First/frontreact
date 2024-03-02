import { Check, ChevronDown, ChevronLeft, ChevronUp, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PaginationButtons } from "../components/paginationButtons";
import { CardPagos } from "../components/cardPagos";
import { getPagosObra } from "../requests/getPagosObra";
import { postPagoMe } from "../requests/postPagoMe";
import { getCalculoPagoMe } from "../requests/getCalculoPagoMe";
import { postPagoPr } from "../requests/postPagoPr";
import { putFinalizarObra } from "../requests/putFinalizarObra";

export function VistaPagos() {
    const { idempresa } = useParams();
    const { idobra } = useParams();
    const [pagos, setPagos] = useState([]);
    const [lpagos, setLPagos] = useState([]);
    const [calc, setCalc] = useState([]);

    const [fechapago, setFechapago] = useState('');
    const [fechafin, setFechafin] = useState('');
    const [mes, setMes] = useState('');
    const [anio, setAnio] = useState('');
    const [tipopago, setTipoPago] = useState('');
    const [numtrabajadores, setNumtrabajadores] = useState('');
    const [valorfic, setValorfic] = useState('');
    const [valorintereses, setValorintereses] = useState('');
    const [valortotal, setValortotal] = useState('');
    const [porcentajeObra, setPorcentajeObra] = useState('');
    const [valorContrato, setValorContrato] = useState('');
    const [obraFinalizada, setObraFinalizada] = useState(false);

    const [formattedFechaPagoMayor, setFormattedFechaPagoMayor] = useState('');


    const [showAcordeon, setShowAcordeon] = useState(false);
    const toggleAcordeon = () => {
        setShowAcordeon(!showAcordeon);
    };
    const meses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    const tpagos = [
        "Cheque", "Efectivo"
    ];

    // const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0)
    const [reload, setReaload] = useState(false)
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value);
    };

    useEffect(() => {
        async function fetchData() {
            try {

                const pagosData = await getPagosObra(idobra, currentPage);
                setPagos(pagosData.listapagos);
                setLPagos(pagosData);


                const fechaPagoMayor = pagos.reduce((fechaMayor, pago) => {
                    const fechaPago = new Date(pago.fechapago);
                    fechaPago.setDate(fechaPago.getDate());
                    return fechaPago > fechaMayor ? fechaPago : fechaMayor;
                }, new Date(0));
                
                // Formatear la fecha en el formato deseado (YYYY-MM-DD)
                setFormattedFechaPagoMayor(fechaPagoMayor.toISOString().slice(0, 10));
                
                console.log('Fecha de pago mayor:', formattedFechaPagoMayor);

                setPorcentajeObra(lpagos.tipo === 'Mano de obra' ? 0.25 : 1);
                console.log("pagosdata:", pagosData);
                console.log("pagosdatalistapagos:", pagosData.listapagos);
            } catch (error) {
                setPagos([])

            }
        }

        fetchData();
    }, [currentPage, reload, porcentajeObra]);


    async function postPagosme() {
        try {
            const pagosData = await postPagoMe(fechapago, mes, anio, tipopago, numtrabajadores, valorfic, valorintereses, valortotal, idobra);
            setReaload(!reload)

            // Limpiar los inputs después de agregar un nuevo pago
            setFechapago('');
            setMes('');
            setAnio('');
            setTipoPago('');
            setNumtrabajadores('');
            setValorfic('');
            setValorintereses('');
            setValortotal('');

        } catch (error) {
            console.log("errorpost: ", error);


        }
    }

    async function postPagospr() {
        try {

            const pagosData = await postPagoPr(fechapago, tipopago, valorfic, idobra);
            setReaload(!reload)
            // Limpiar los inputs después de agregar un nuevo pago
            setTipoPago('');
            setValorfic('');
            console.log("pagospr: ", pagosData);

        } catch (error) {
            console.log("errorpost: ", error);


        }
    }

    async function putFinalizar() {
        try {
            if (fechafin) {
                const pagosData = await putFinalizarObra(idobra, fechafin);
                setReaload(!reload)

                setFechafin('')
                setObraFinalizada(true);

                console.log("putFinalizarObra: ", pagosData);
            }



        } catch (error) {
            console.log("errorput: ", error);


        }
    }

    useEffect(() => {
        // Check if all required fields are filled
        if (valorContrato) {
            const valorFIC = (parseFloat(valorContrato) * (porcentajeObra / 100)).toFixed(2);
            setValorfic(valorFIC)
            console.log("valorFIC:", valorFIC);
        }
    }

        , [valorfic, valorContrato]);

    useEffect(() => {
        async function fetchData() {
            try {
                // Check if all required fields are filled
                if (mes && anio && fechapago && numtrabajadores) {
                    const calcData = await getCalculoPagoMe(mes, anio, fechapago, numtrabajadores);
                    setCalc(calcData);
                    setValorfic(calc.valor_fic)
                    setValorintereses(calc.interescalculado)
                    setValortotal(calc.totalconinteres)
                    console.log("calcData:", calcData);
                }
            } catch (error) {
                console.log("errorcalcData:", error);
            }
        }
        fetchData();
    }, [mes, anio, fechapago, numtrabajadores, valorfic, valortotal, valorintereses]);


    const colorType = lpagos.tipo == 'Mensual' ? '#5A7FFF' : '#F97429'
    const colorState = lpagos.estado == 'En curso' ? '#39A900' : '#FF0000'

    return (

        <div className="w-full max-w-fu h-svh overflow-y-auto">
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
                            {lpagos.tipo == 'Mensual' && lpagos.estado == 'En curso' && pagos.length>0 &&(
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
                        <div className="w-full flex justify-center mt-2 gap-10 ">

                            <div className="bg-white h-12 w-[320px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4  centered-full">
                                <label htmlFor="fecha" className="text-vgray2 font-semibold flex-grow ml-4">Fecha</label>
                                <input value={fechafin} onChange={(event) => { setFechafin(event.target.value); }} type="date" id="fecha" placeholder="Fecha" className="outline-none text-black font-semibold w-[150px] " />
                            </div>
                            <button className="h-12 w-24 text-white font-medium text-sm rounded-lg  bg-vgreen  " onClick={() => {
                                putFinalizar()
                            }}>
                                Aceptar
                            </button>

                            <button className="h-12 w-24 text-white font-medium text-sm rounded-lg  bg-red-500  " onClick={() => {
                                setObraFinalizada(false)
                            }}>
                                Cancelar
                            </button>
                        </div>
                    </div>

                )}

            </section>

            {lpagos.tipo == 'Mensual' ? (
                <>
                    {lpagos.estado == 'En curso' && (
                        <>
                            <div className="relative flex xl:p-12 max-xl:p-4 items-center gap-4">
                                <div className="xl:scale-0 max-xl:flex-grow max-xl:border-t max-xl:border-gray-400"></div>
                                <button onClick={toggleAcordeon} className="flex  text-gray-400">
                                    Nuevo pago
                                    {showAcordeon ? (<ChevronUp />) : (<ChevronDown />)}
                                </button>
                                <div className="flex-grow border-t border-gray-400"></div>

                            </div>

                            {showAcordeon && (
                                <>
                                    <section className="mb-10">
                                        <div className="flex flex-wrap mt-4 max-xl:justify-center">
                                            <div className="bg-white h-12 w-[320px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4 mt-6 centered-full">
                                                <input
                                                    value={anio}
                                                    onChange={(event) => {
                                                        const inputValue = event.target.value;
                                                        const sanitizedValue = inputValue.replace(/\D/g, ''); // Elimina caracteres no numéricos
                                                        const limitedValue = sanitizedValue.substring(0, 4); // Limita a los primeros 4 caracteres
                                                        setAnio(event.target.value = limitedValue);
                                                    }}
                                                    type="number"
                                                    placeholder="Año"
                                                    className="outline-none text-vgray2 font-semibold ml-3 w-[320px] text-center"
                                                    maxLength="4"
                                                />
                                            </div>
                                            <div className="bg-white h-12 w-[320px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4 mt-6 centered-full">
                                                <select value={mes} onChange={(event) => { setMes(event.target.value); }} className="outline-none text-vgray2 font-semibold ml-3 w-[320px] text-center">
                                                    <option 
                                                     defaultValue={"Selecciona un mes"}>Selecciona un mes</option>
                                                    {meses.map((mes, index) => (
                                                        <option key={index} value={mes}>{mes}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="bg-white h-12 w-[320px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4 mt-6 centered-full">
                                                <label htmlFor="fecha" className="text-vgray2 font-semibold flex-grow ml-4">Fecha</label>
                                                <input value={fechapago} onChange={(event) => { setFechapago(event.target.value); }} type="date" id="fecha" placeholder="Fecha" className="outline-none text-black font-semibold w-[150px] " min={formattedFechaPagoMayor} />
                                            </div>
                                            <div className="bg-white h-12 w-[320px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4 mt-6 centered-full">
                                                <select value={tipopago} onChange={(event) => { setTipoPago(event.target.value); }} className="outline-none text-vgray2 font-semibold ml-3 w-[320px] text-center">
                                                    <option defaultValue={"Selecciona un tipo de pago"}>Selecciona un tipo de pago</option>
                                                    {tpagos.map((tpago, index) => (
                                                        <option key={index} value={tpago}>{tpago}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="bg-white h-12 w-[320px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4 mt-6 centered-full">
                                                <input
                                                    value={numtrabajadores}
                                                    onChange={(event) => {
                                                        const inputValue = event.target.value;
                                                        const sanitizedValue = inputValue.replace(/\D/g, ''); // Elimina caracteres no numéricos
                                                        setNumtrabajadores(event.target.value = sanitizedValue);
                                                    }}
                                                    type="number"
                                                    placeholder="Número trabajadores"
                                                    className="outline-none text-vgray2 font-semibold ml-3 w-[320px] text-center"
                                                />
                                            </div>
                                            <div className="bg-white h-12 w-[320px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4 mt-6 centered-full">
                                                <input type="text" value={valorfic} placeholder="FIC" className="outline-none text-vgray2 font-semibold ml-3 w-[320px] text-center" />
                                            </div>
                                            <div className="bg-white h-12 w-[320px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4 mt-6 centered-full">
                                                <input type="text" value={valorintereses} placeholder="Intereses" className="outline-none text-vgray2 font-semibold ml-3 w-[320px] text-center" />
                                            </div>
                                            <div className="bg-white h-12 w-[320px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4 mt-6 centered-full">
                                                <input type="text" value={valortotal} placeholder="Total" className="outline-none text-vgray2 font-semibold ml-3 w-[320px] text-center" />
                                            </div>

                                        </div>
                                        <div className="flex justify-end mr-10 mt-10 max-xl:justify-center">
                                            <button className="px-4 py-2 bg-vgreen text-white font-medium items-center text-sm rounded-lg flex gap-2" onClick={() => {
                                                postPagosme();
                                            }}>
                                                <Plus />
                                                Añadir
                                            </button>
                                        </div>
                                    </section>
                                </>
                            )}


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
                            const colorInterest = pago.valorintereses === 0 ? '#848484' : '#FF0000';
                          
                            return (
                                <div key={index} className={`text-vgraydark font-semibold bg-white rounded-xl items-center px-3 mt-5 max-xl:max-w-[280px] max-xl:w-[280px] max-xl:p-5 max-xl:rounded-2xl max-xl:mx-4 xl:grid xl:text-center xl:grid-cols-[0.3fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] xl:h-14 xl:w-11/12`}>
                                    <h1 className="text-left"> <span className="xl:text-[0px] xl:text-transparent xl:scale-0 text-black"> Año: </span> {pago.anio}</h1>
                                    <h1 className=""> <span className="xl:text-[0px] xl:text-transparent xl:scale-0 text-black"> Mes: </span> {pago.mes}</h1>
                                    <h1 className=""> <span className="xl:text-[0px] xl:text-transparent xl:scale-0 text-black"> Fecha de pago: </span>  {pago.fechapago}</h1>
                                    <h1 className=""> <span className="xl:text-[0px] xl:text-transparent xl:scale-0 text-black"> Número Trabajadores: </span> {pago.numtrabajadores}</h1>
                                    <h1 className=""> <span className="xl:text-[0px] xl:text-transparent xl:scale-0 text-black"> Tipo pago: </span> {pago.tipopago}</h1>
                                    <h1 className=""> <span className="xl:text-[0px] xl:text-transparent xl:scale-0 text-black"> FIC: </span> {formatCurrency(pago.valorfic)}</h1>
                                    <h1 className="" style={{ color: colorInterest }}> <span className="xl:text-[0px] xl:text-transparent xl:scale-0 text-black"> Intereses: </span>{formatCurrency(pago.valorintereses)}</h1>
                                    <h1 className="text-vgreen"> <span className="xl:text-[0px] xl:text-transparent xl:scale-0 text-black"> Total: </span>{formatCurrency(pago.valortotal)}</h1>

                                </div>
                            )
                        })}

                    </section>

                    <div className="w-full flex justify-center mt-5">
                        <PaginationButtons totalPages={lpagos.totalpaginas} setCurrentPage={setCurrentPage} />
                    </div>

                </>
            ) : (
                <>
                    {lpagos.estado == 'En curso' ? (
                        <>
                            <div className="relative flex xl:p-12 max-xl:p-4 items-center gap-4">
                                <div className="xl:scale-0 max-xl:flex-grow max-xl:border-t max-xl:border-gray-400"></div>
                                <button onClick={toggleAcordeon} className="flex  text-gray-400">
                                    Registrar pago
                                    {showAcordeon ? (<ChevronUp />) : (<ChevronDown />)}
                                </button>
                                <div className="flex-grow border-t border-gray-400"></div>
                            </div>

                            {showAcordeon && (

                                <>
                                    <section className="mb-10 mr-8">
                                        <div className="flex xl:justify-end mt-4 max-xl:justify-center">
                                            <div className="bg-white h-12 w-[320px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 xl:mr-4 mt-6 centered-full ">
                                                <input
                                                    value={`${porcentajeObra}%`}
                                                    onChange={(event) => { (event.target.value); }}
                                                    type="text"
                                                    placeholder="% Porcentaje de pago"
                                                    className="outline-none text-vgray2 font-semibold ml-3 w-[320px] text-center"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap mt-4 max-xl:justify-center">
                                            <div className="bg-white h-12 w-[320px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4 mt-6 centered-full">
                                                <label htmlFor="fecha" className="text-vgray2 font-semibold flex-grow ml-4">Fecha</label>
                                                <input value={fechapago} onChange={(event) => { setFechapago(event.target.value); }} type="date" id="fecha" placeholder="Fecha" className="outline-none text-black font-semibold w-[150px] " />
                                            </div>
                                            <div className="bg-white h-12 w-[320px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4 mt-6 centered-full">
                                                <select onChange={(event) => { setTipoPago(event.target.value); }} className="outline-none text-vgray2 font-semibold ml-3 w-[320px] text-center">
                                                    <option value={tipopago} defaultValue={"Selecciona un tipo de pago"}>Selecciona un tipo de pago</option>
                                                    {tpagos.map((tpago, index) => (
                                                        <option key={index} value={tpago}>{tpago}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="bg-white h-12 w-[320px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4 mt-6 centered-full">
                                                <input
                                                    value={valorContrato}
                                                    onChange={(event) => {
                                                        const inputValue = event.target.value;
                                                        const sanitizedValue = inputValue.replace(/\D/g, ''); // Elimina caracteres no numéricos
                                                        setValorContrato(event.target.value = sanitizedValue);
                                                    }}
                                                    type="number"  // Cambiado a tipo 'tel'
                                                    placeholder="Valor del contrato"
                                                    className="outline-none text-vgray2 font-semibold ml-3 w-[320px] text-center"
                                                />
                                            </div>
                                            <div className="bg-white h-12 w-[320px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4 mt-6 centered-full">
                                                <input value={valorfic}
                                                    onChange={(event) => {
                                                        const inputValue = event.target.value;
                                                        const sanitizedValue = inputValue.replace(/\D/g, ''); // Elimina caracteres no numéricos
                                                        event.target.value = sanitizedValue;
                                                    }}
                                                    type="text"
                                                    placeholder="FIC"
                                                    className="outline-none text-vgray2 font-semibold ml-3 w-[320px] text-center"
                                                />
                                            </div>


                                        </div>

                                        <div className="flex justify-end mr-10 mt-10 max-xl:justify-center">
                                            <button className="px-4 py-2 bg-vgreen text-white font-medium items-center text-sm rounded-lg flex gap-2" onClick={() => { postPagospr() }}>
                                                <Check />
                                                Registrar
                                            </button>
                                        </div>
                                    </section>
                                </>
                            )}


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
            )
            }
        </div >

    )
}