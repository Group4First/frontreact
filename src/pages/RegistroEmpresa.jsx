import { Check, X } from "lucide-react";
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

export function RegistroEmpresa() {
    const [selectedButton, setSelectedButton] = useState(null);

    const handleButtonClick = (button) => {
        setSelectedButton(button);
    };

    return (
        <div className="w-full max-w-fu h-svh">
            <h1 className="text-vgreen font-semibold px-16 mt-4 text-xl">Registro de empresas</h1>

            <div className="w-11/12 flex justify-end mt-10">
                <Link to="/empresas">
                    <button className="px-4 py-2 bg-red-500 text-white font-medium text-sm rounded-lg flex items-center gap-2 mr-4">
                        <X className="h-4 w-4" /> Cancelar
                    </button>
                </Link>

                <button className="px-4 py-2 bg-green-500 text-white font-medium text-sm rounded-lg flex items-center gap-2">
                    <Check className="h-4 w-4" /> Guardar
                </button>

            </div>

            <div className="flex relative mt-20 ml-20">
                <div className="bg-white h-12 w-80 rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-6">
                    <input type="text" placeholder="Razon social" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-80 text-center" />
                </div>
                <div className="flex items-center mr-6">
                    <div className="bg-white h-12 w-66 rounded-l-xl border-2 border-vgray flex items-center font-semibold text-vgray2 px-3 ">
                        <input type="text" placeholder="Numero de documento" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-46 text-center" />
                    </div>
                    <div className={`bg-white h-12 w-auto rounded-1-xl border-t-2 border-b-2 border-vgray flex items-center text-vgray2 px-3 ${selectedButton === 'nit' ? 'bg-green-200' : 'bg-white'} border-l-0 border-r-0`} onClick={() => handleButtonClick('nit')}>
                        <button className="font-semibold text-black">NIT</button>
                    </div>
                    <div className={`bg-white h-12 w-auto rounded-r-xl border-2 border-vgray flex items-center text-vgray2 px-3 ${selectedButton === 'cedula' ? 'bg-green-200' : 'bg-white'}`} onClick={() => handleButtonClick('cedula')}>
                        <button className="font-semibold text-black">Cedula</button>
                    </div>
                </div>
                <div className="bg-white h-12 w-26 rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3">
                    <input type="text" placeholder="DV" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-8" />
                </div>
            </div>
        </div>
    )
}
