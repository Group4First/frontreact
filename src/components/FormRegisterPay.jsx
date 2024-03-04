import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { postPagoPr } from "../requests/postPagoPr";
import { postPagoMe } from "../requests/postPagoMe";
import { getCalculoPagoMe } from "../requests/getCalculoPagoMe";

export function FormRegisterPay({ idobra, reload, setReaload, type, state, formattedFechaPagoMayor}) {


  const [calc, setCalc] = useState([]);

  const [fechapago, setFechapago] = useState('');
  const [mes, setMes] = useState('');
  const [anio, setAnio] = useState('');
  const [tipopago, setTipoPago] = useState('');
  const [numtrabajadores, setNumtrabajadores] = useState('');
  const [valorfic, setValorfic] = useState('FIC');
  const [valorintereses, setValorintereses] = useState('Intereses');
  const [valortotal, setValortotal] = useState('Total');
  const [porcentajeObra, setPorcentajeObra] = useState(type === 'Mano de obra' ? 0.25 : 1);
  const [valorContrato, setValorContrato] = useState('');

  const [showAcordeon, setShowAcordeon] = useState(false);
  const toggleAcordeon = () => {
    setShowAcordeon(!showAcordeon);
  };

  async function postPagosme() {
    try {
      const pagosData = await postPagoMe(fechapago, mes, anio, tipopago, numtrabajadores, valorfic, valorintereses, valortotal, idobra);
      setReaload(!reload)
      toggleAcordeon()

      // Limpiar los inputs después de agregar un nuevo pago
      setFechapago('');
      setMes('');
      setAnio('');
      setTipoPago('');
      setNumtrabajadores('');
      setValorfic('FIC');
      setValorintereses('Intereses');
      setValortotal('Total');

    } catch (error) {
      console.log("errorpost: ", error);

      if (error.status == 401) {
        activeAlert("warning", "Su sesion ha expirado, inicie sesion de nuevo", 6000)
        setTimeout(() => {
          navigate("/")
        }, 3000)
      }
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
      if (error.status == 401) {
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
      console.log("valorFIC:", valorFIC);
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
          console.log("calcData:", calcData);
        }
      } catch (error) {
        console.log("errorcalcData:", error);
        if (error.status == 401) {
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
  const tpagos = [
    "Cheque", "Efectivo"
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
                          autoComplete="cc"
                          className="outline-none text-vgray2 font-semibold ml-3 w-[320px] text-center"
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
            </>)}

        </>
      )}

    </>
  )
}