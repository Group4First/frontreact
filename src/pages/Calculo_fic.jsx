import React, { useState, useEffect } from 'react';
import { getCalculoPagoMe } from "../requests/getCalculoPagoMe";
import { useGlobalContext } from '../context/context';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export function Calculo_fic() {

    // Estado para almacenar el número de empleados
    const [Numcalculo, setNumcalculo] = useState(0);
    // Estado para almacenar el resultado del cálculo
    const [resultadofic, setResultadofic] = useState(0);
    const [resultadoint, setResultadoint] = useState(0);
    const [resultadototal, setResultadototal] = useState(0);
    const [tipodeobra, setTipodeobra] = useState('Mensual');
    const [mesapagar, setMesapagar] = useState('');
    const [añoapagar, setAñoapagar] = useState('');

    const { activeAlert } = useGlobalContext()
    const navigate = useNavigate()

    const Tipoobra = [
        "Mensual", "A todo costo", "Mano de obra"
    ];
    const meses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];


    // Función para realizar el cálculo y actualizar el estado del resultado

    async function fetchcalcint() {
        try {
            //const datacal = await getCalculoPagoMe(mesapagar, añoapagar, new Date().toLocaleDateString('en-CA').toString(), Numcalculo, tipodeobra);
            const datacal = await getCalculoPagoMe(mesapagar, añoapagar, '2024-02-28', Numcalculo, tipodeobra);

            // Actualizar el estado del resultado con valores formateados como moneda
            const formatoMoneda = {
                style: 'currency',
                currency: 'COP' // Puedes cambiar a la moneda que desees
            };
            if (datacal.valor_fic === 0 && datacal.interescalculado === 0 && datacal.totalconinteres === 0) {
                activeAlert("warning", "No hay interes registrado para el mes actual", 3000)
            }

            setResultadofic(datacal.valor_fic.toLocaleString('es-CO', formatoMoneda));
            setResultadoint(datacal.interescalculado.toLocaleString('es-CO', formatoMoneda) ? datacal.interescalculado.toLocaleString('es-CO', formatoMoneda) : 'No hay interes definido para este mes');
            setResultadototal(datacal.totalconinteres.toLocaleString('es-CO', formatoMoneda));

        } catch (error) {
            if (error.status == 401) {
                Cookies.remove('session')
                activeAlert("warning", "Su sesión ha expirado, inicie sesión de nuevo", 6000)
                setTimeout(() => {
                    navigate("/")
                }, 3000)
            }
        }
    }
    return (
        <section className="w-full max-h-svh overflow-auto">
            <div className="min-h-screen flex justify-center items-center">
                <div className={` bg-white shadow-xl p-5 rounded-2xl flex flex-col justify-center items-center relative full-height" ${window.innerWidth > 425 ? 'w-750 h-750 xl:w-[800px]  xl:h-[800px]' : 'min-h-screen'}`}>


                    <h1 className="text-3xl font-bold mb-5 text-center lg:text-3xl "> Calculo rápido fic</h1>
                    <span className=" text-center">Calcular gastos mensuales y por empleado</span>
                    <div className="mb-6">
                        <label className="flex flex-wrap mt-4 justify-center text-center text-black font-semibold">Tipo de obra</label>
                        <div className="bg-white h-12 w-60 rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mt-1  ">
                            <select onChange={(event) => { setTipodeobra(event.target.value); }} className="outline-none text-vgray2 font-semibold  w-full text-center">
                                <option value="" defaultValue={"Selecciona..."}>Selecciona...</option>
                                {Tipoobra.map((tipo, index) => (
                                    <option key={index} value={tipo}>{tipo}</option>
                                ))}
                            </select>
                        </div>
                    </div >
                    <div className='flex flex-wrap mt-10 justify-center items-center gap-3'>
                        <div >
                            <label className="flex flex-wrap  justify-center text-center text-black font-semibold">Mes a pagar</label>
                            <div className="bg-white h-12 w-60 rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mt-1  ">
                                <select onChange={(event) => { setMesapagar(event.target.value); }} className="outline-none text-vgray2 font-semibold  w-full text-center">
                                    <option value="" defaultValue={"Selecciona un rol"}>Selecciona...</option>
                                    {meses.map((mes, index) => (
                                        <option key={index} value={mes}>{mes}</option>
                                    ))}
                                </select>
                            </div>
                        </div >
                        <div >
                            <label className="flex flex-wrap justify-center text-center text-black font-semibold">Año</label>
                            <div className="bg-white h-12 w-60 rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mt-1">
                                <input onChange={(event) => {
                                    const inputValue = event.target.value;
                                    const sanitizedValue = inputValue.replace(/\D/g, ''); // Elimina caracteres no numéricos
                                    event.target.value = sanitizedValue.substring(0, 4);
                                    setAñoapagar((event.target.value));
                                }} type="number" placeholder="Digita un año" className="outline-none text-vgray2 font-semibold  w-full text-center" min="2000" max="2099" />
                            </div>
                        </div>
                    </div>
                    <label className="flex flex-wrap mt-4 justify-center text-center text-black font-semibold">{tipodeobra == 'Mensual' ? 'Numero de trabajadores' : 'Costo total del contrato'}</label>
                    <div className="h-12 w-60 rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mt-1">
                        <input type="number" placeholder="Digite un número" className="outline-none text-vgray2 font-semibold  w-full text-center" onChange={(event) => {
                            const inputValue = event.target.value;
                            const sanitizedValue = inputValue.replace(/\D/g, '');
                            setNumcalculo(event.target.value = sanitizedValue);
                        }} />
                    </div>
                    <button className="px-4 py-2 bg-vgreen text-white font-bold text-lg mt-5 mb-2 rounded-xl" onClick={fetchcalcint}> Calcular</button>

                    <div className="flex flex-col mt-4">
                        <div className="flex items-center mb-2 flex-grow">
                            <div className="h-12 w-28 rounded-l-xl border-2 border-vgray flex items-center font-semibold text-vgray2 px-3 mr-1">
                                <span>FIC</span>
                            </div>
                            <div className="h-12 w-[190px] rounded-r-xl border-2 border-vgray flex items-center text-vgray2 px-3">
                                <h1 className="text-vgray2 outline-none font-semibold w-full text-right">{resultadofic}</h1>
                            </div>
                        </div>
                        <div className="flex items-center flex-grow mb-2">
                            <div className="h-12 w-28 rounded-l-xl border-2  border-vgray flex items-center font-semibold text-vgray2 px-3 mr-1">
                                <span>Intereses</span>
                            </div>
                            <div className="h-12 w-[190px] rounded-r-xl border-2 border-vgray flex items-center text-vgray2 px-3 ">
                                <h1 className="text-vgray2 outline-none font-semibold w-full text-right">{resultadoint}</h1>
                            </div>
                        </div>
                        <div className="flex items-center  flex-grow">
                            <div className="h-12 w-28 rounded-l-xl border-2 border-vgray flex items-center font-semibold text-vgray2 px-3 mr-1">
                                <span>Total</span>
                            </div>
                            <div className="h-12 w-[190px] rounded-r-xl border-2 border-vgray flex items-center text-vgray2 px-3">
                                <h1 className="text-vgray2 outline-none font-semibold w-full text-right">{resultadototal}</h1>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section >
    )
}