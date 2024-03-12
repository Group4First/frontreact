import { Check, ChevronDown, ChevronUp, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { postPagoPr } from "../requests/postPagoPr";
import { postPagoMe } from "../requests/postPagoMe";
import { getCalculoPagoMe } from "../requests/getCalculoPagoMe";
import { Modal } from "./Modal";
import { useGlobalContext } from "../context/context";
import Cookies from "js-cookie";

export function FormRegisterPay({ idobra, reload, setReaload, type, state, formattedFechaPagoMayor }) {


  const { activeAlert } = useGlobalContext()

  const [calc, setCalc] = useState([]);

  const [fechapago, setFechapago] = useState('');
  const [mes, setMes] = useState('');
  const [anio, setAnio] = useState('');
  const [numtrabajadores, setNumtrabajadores] = useState('');
  const [valorfic, setValorfic] = useState('FIC');
  const [valorintereses, setValorintereses] = useState('Intereses');
  const [valortotal, setValortotal] = useState('Total');
  const [porcentajeObra, setPorcentajeObra] = useState(type === 'Mano de obra' ? 1 : 0.25);
  const [valorContrato, setValorContrato] = useState('');

  const [open, setOpen] = useState(false);


  const [showAcordeon, setShowAcordeon] = useState(false);
  const toggleAcordeon = () => {
    setShowAcordeon(!showAcordeon);
  };

  const validateInputsMe = () => {
    const requiredFields = [fechapago, mes, anio, numtrabajadores];

    if (requiredFields.some(valor => !valor.trim())) {
      activeAlert('error', 'Todos los campos son requeridos', 2000);
      return false;
    }
    return true;

  };
  const validateInputsPr = () => {
    const requiredFields = [fechapago, valorfic];
    if (requiredFields.some(valor => !valor.trim())) {
      activeAlert('error', 'Todos los campos son requeridos', 2000);
      return false;
    }
    return true;

  };

  async function registrarPagosMe() {
    try {
      const pagosData = await postPagoMe(fechapago, mes, anio, numtrabajadores, valorfic, valorintereses, valortotal, idobra);
      activeAlert('success', pagosData, 2000);
      setReaload(!reload)
      toggleAcordeon()

      // Limpiar los inputs después de agregar un nuevo pago
      setFechapago('');
      setMes('');
      setAnio('');
      setNumtrabajadores('');
      setValorfic('FIC');
      setValorintereses('Intereses');
      setValortotal('Total');

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

  async function registrarPagosPr() {
    try {

      const pagosData = await postPagoPr(fechapago, valorfic, idobra);
      activeAlert('success', pagosData, 2000);
      setReaload(!reload)
      // Limpiar los inputs después de agregar un nuevo pago
      setValorfic('');

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


  useEffect(() => {
    // Check if all required fields are filled
    if (valorContrato) {
      const valorFIC = (parseFloat(valorContrato) * (porcentajeObra / 100)).toFixed(2);
      setValorfic(valorFIC)
    }
  }, [valorContrato]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Check if all required fields are filled
        if (mes && anio && fechapago && numtrabajadores) {
          const calcData = await getCalculoPagoMe(mes, anio, fechapago, numtrabajadores);
          setCalc(calcData);
          setValorfic(calcData.valor_fic)
          setValorintereses(calcData.interescalculado)
          setValortotal(calcData.totalconinteres)
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
    fetchData();
  }, [mes, anio, fechapago, numtrabajadores]);

  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  return (
    <>
      {type == 'Mensual' ? (
        <>
          {state == 'En curso' && (
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
                          className="outline-none text-vgray2 font-semibold ml-3 w-full text-center"
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
                        <input
                          value={numtrabajadores}
                          onChange={(event) => {
                            const inputValue = event.target.value;
                            const sanitizedValue = inputValue.replace(/\D/g, ''); // Elimina caracteres no numéricos
                            setNumtrabajadores(event.target.value = sanitizedValue);
                          }}
                          type="number"
                          placeholder="Número trabajadores"
                          autoComplete="cc"
                          className="outline-none text-vgray2 font-semibold ml-3 w-full text-center"
                        />
                      </div>
                      <div className="bg-white h-12 w-[320px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4 mt-6 centered-full">
                        <h1 className="font-semibold text-center w-full"> {valorfic} </h1>
                      </div>
                      <div className="bg-white h-12 w-[320px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4 mt-6 centered-full">
                        <h1 className="font-semibold text-center w-full"> {valorintereses} </h1>
                      </div>
                      <div className="bg-white h-12 w-[320px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4 mt-6 centered-full">
                        <h1 className="font-semibold text-center w-full"> {valortotal} </h1>
                      </div>

                    </div>
                    <div className="flex justify-end mr-10 mt-10 max-xl:justify-center">
                      <button className="px-4 py-2 bg-vgreen text-white font-medium items-center text-sm rounded-lg flex gap-2" onClick={() => {
                            if (validateInputsMe()) {
                                setOpen(true);
                            }
                        }}>
                        <Plus />
                        Añadir
                      </button>
                      <Modal open={open} onClose={() => setOpen(false)} title={ 'Confirmar pago' } text={ '¿Esta seguro de agregar el nuevo pago?' } onAcept={registrarPagosMe} />
                    </div>
                  </section>
                </>
              )}


            </>
          )}
        </>
      ) : (
        <>
          {state == 'En curso' && (
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
                      <button className="px-4 py-2 bg-vgreen text-white font-medium items-center text-sm rounded-lg flex gap-2" onClick={() => {
                            if (validateInputsPr()) {
                                setOpen(true);
                            }
                        }}>
                        <Check />
                        Registrar
                      </button>
                      <Modal open={open} onClose={() => setOpen(false)} title={ 'Confirmar pago' } text={ '¿Esta seguro de agregar el nuevo pago?' } onAcept={registrarPagosPr} />
                    </div>
                  </section>
                </>
              )}
            </>)}

        </>
      )}

    </>
  )
}