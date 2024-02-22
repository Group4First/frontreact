import React, { useState, useEffect } from 'react';
import { getsmlv } from "../requests/getsmlv";

export function Calculo_fic() {
    // Estado para almacenar el número de empleados
    const [numEmpleados, setNumEmpleados] = useState(0);
    // Estado para almacenar el resultado del cálculo
    const [resultado, setResultado] = useState(0);
    const [resultadoxemp, setResultadoxemp] = useState(0);
    const [resultsalario, setResultSalario] = useState(0);

    // Llamar a getsmlv y establecer el costo por empleado al montar el componente
    useEffect(() => {
        async function fetchSalario() {
            try {
                const data = await getsmlv();
                setResultSalario(parseFloat(data));
            } catch (error) {
                console.error('Error al obtener el salario:', error);
            }
        }

        fetchSalario();
    }, []);


    // Función para manejar el cambio en el input del número de empleados
    const handleChangeNumEmpleados = (event) => {
        setNumEmpleados(event.target.value);
    };

    // Función para realizar el cálculo y actualizar el estado del resultado
    const handleCalcular = () => {
        setResultado(0);
        setResultadoxemp(0);

        // Realizar el cálculo basado en el número de empleados y el salario
        const costoPorEmpleado = resultsalario;
        const numCostoPorEmpleado = numEmpleados / 40;
        const totalCosto = numCostoPorEmpleado * costoPorEmpleado;
        const totalxemp = totalCosto / numEmpleados;

        // Actualizar el estado del resultado
        const formatoMoneda = {
            style: 'currency',
            currency: 'COP' // Puedes cambiar a la moneda que desees
        };
    
        // Actualizar el estado del resultado con valores formateados como moneda
        setResultado(totalCosto.toLocaleString('es-CO', formatoMoneda));
        setResultadoxemp(totalxemp.toLocaleString('es-CO', formatoMoneda));
    };
    return (
        <div className="min-h-screen grid grid-cols-1">
            <div className="bg-white p-4 md:p-8 rounded-lg shadow-md flex justify-center items-center">

                <div className="sm:w-[600px] md:w-[700px] lg:w-[600px] xl:w-[700px] sm:h-[600px] md:h-[700px] lg:h-[600px] xl:h-[700px] bg-white shadow-xl rounded-2xl flex flex-col justify-center items-center relative">

                    <h1 className="text-3xl font-bold mb-5 text-center lg:text-3xl "> Calculo rapido fic</h1>
                    <span className="mb-20 ">Calcular gastos mensuales y por empleado</span>
                    <h2 className="text-xl font-semibold text-gray-00 ">Numero de trabajadores</h2>
                    <div className="h-12 w-60 rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mt-2">
                        <input type="number" placeholder="Digite un numero" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-44" onChange={handleChangeNumEmpleados} />
                    </div>
                    <button className="px-4 py-2 bg-vgreen text-white font-bold text-lg mt-8 rounded-xl" onClick={handleCalcular}> Calcular</button>

                    <div className="flex flex-col mt-14">
                        <div className="flex items-center mb-2 flex-grow">
                            <div className="h-12 w-32 rounded-l-xl border-2 border-vgray flex items-center font-semibold text-vgray2 px-3 mr-1">
                                <span>Mensual</span>
                            </div>
                            <div className="h-12 w-52 rounded-r-xl border-2 border-vgray flex items-center text-vgray2 px-3">
                                <h1 className="font-semibold text-vgray2 outline-none text-black font-semibold w-full text-right">{resultado} COP</h1>
                            </div>
                        </div>
                        <div className="flex items-center flex-grow">
                            <div className="h-12 w-32 rounded-l-xl border-2 border-vgray flex items-center font-semibold text-vgray2 px-3 mr-1">
                                <span>Empleado</span>
                            </div>
                            <div className="h-12 w-52 rounded-r-xl border-2 border-vgray flex items-center text-vgray2 px-3 ">
                                <h1 className="font-semibold text-vgray2 outline-none text-black font-semibold w-full text-right">{resultadoxemp} COP</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
