import { Check, X, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';


export function RegistroEmpresa() {
    const navigate = useNavigate();
    const [isDocumentSelected, setIsDocumentSelected] = useState(true);
    const [isObligatedSelected, setIsObligatedSelected] = useState(false);

    const handleDocumentClick = () => {
        setIsDocumentSelected(newdocumenttype => !newdocumenttype);
    };

    const handleObligatedClick = () => {
        setIsObligatedSelected(newobligated => !newobligated);
    };




    return (
        <section>
            <div className="w-full max-w-full h-full">
                <button className="flex items-center text-vgreen font-semibold px-16 mt-5 text-xl gap-4" onClick={() => { navigate(`/empresas`); }}>
                    <ChevronLeft size={30} />Registro de empresa
                </button>

                <div className="w-11/12 flex justify-end mt-10">
                    <button className="px-4 py-2 bg-red-500 text-white font-medium text-sm rounded-lg flex items-center gap-2 mr-4" onClick={() => { navigate(`/empresas`); }}>
                        <X className="h-4 w-4" /> Cancelar
                    </button>
                    <button className="px-4 py-2 bg-green-500 text-white font-medium text-sm rounded-lg flex items-center gap-2">
                        <Check className="h-4 w-4" /> Guardar
                    </button>

                </div>


                <section className="mt-20 ml-20">
                    <div className=" flex relative ml-20">
                        <div className="bg-white h-12 w-80 rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-6">
                            <input type="text" placeholder="Razon social" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-80 text-center" />
                        </div>
                        <div className="flex items-center mr-6">
                            <div className="bg-white h-12 w-80 rounded-l-xl border-2 border-vgray flex items-center font-semibold text-vgray2 px-3 ">
                                <input type="text" placeholder="Numero de documento" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-80 text-center" />
                            </div>
                            <div
                                className={`bg-white h-12 w-auto rounded-1-xl border-t-2 border-b-2 border-vgray flex items-center text-vgray2 px-3 border-l-0 border-r-0`} style={{ backgroundColor: isDocumentSelected ? '#BAEDBD' : 'white' }} onClick={handleDocumentClick}>
                                <button className="font-semibold text-black p-2">NIT</button>
                            </div>
                            <div
                                className={`bg-white h-12 w-auto rounded-r-xl border-2 border-vgray flex items-center text-vgray2 px-3`} style={{ backgroundColor: isDocumentSelected ? 'white' : '#BAEDBD' }} onClick={handleDocumentClick}>
                                <button className="font-semibold text-black">Cedula</button>
                            </div>
                        </div>
                        <div className="bg-white h-12 w-26 rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-6">
                            <input type="text" placeholder="DV" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-8" />
                        </div>
                        <div className="bg-white h-12  w-32 rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3">
                            <input type="text" placeholder="CIIU" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-20 text-center" />
                        </div>
                    </div>

                    <div className=" flex relative mt-4 ml-20 ">
                        <div className="bg-white h-12 w-80 rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-6">
                            <input type="text" placeholder="Direccion" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-80 text-center" />
                        </div>
                        <div className="bg-white h-12 w-80 rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-6">
                            <input type="text" placeholder="Municipio" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-80 text-center" />
                        </div>
                    </div>

                    <div className=" flex relative mt-4 ml-20 ">
                        <div className="bg-white h-12 w-80 rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-6">
                            <input type="text" placeholder="Telefono" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-80 text-center" />
                        </div>
                        <div className="bg-white h-12 w-80 rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-6">
                            <input type="text" placeholder="Fax" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-80 text-center" />
                        </div>
                        <div className="bg-white h-12 w-80 rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3">
                            <input type="text" placeholder="Correo electronico" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-80 text-center" />
                        </div>
                    </div>

                    <div className=" flex relative mt-4 ml-20 ">
                        <div className="bg-white h-12 w-80 rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-6">
                            <input type="text" placeholder="Representante legal" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-80 text-center" />
                        </div>
                        <div className="bg-white h-12 w-80 rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-6">
                            <input type="text" placeholder="Cedula R.P" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-80 text-center" />
                        </div>

                    </div>

                    <div className=" flex relative mt-4 ml-20 ">
                        <div className="bg-white h-12 w-80 rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-6">
                            <input type="text" placeholder="Funcionario entrevistado" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-80 text-center" />
                        </div>
                        <div className="bg-white h-12 w-80 rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-6">
                            <input type="text" placeholder="Cargo" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-80 text-center" />
                        </div>
                    </div>

                    <div className=" flex relative mt-4 ml-20 ">
                        <div className="bg-white h-12 w-80 rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-6">
                            <input type="text" placeholder="Numero de trabajadores" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-80 text-center" />
                        </div>
                        <div className="flex items-center mr-6">
                            <div className="bg-white h-12 w-96 rounded-l-xl border-2 border-vgray flex items-center font-semibold text-vgray2 px-3 p-2">
                                <span className="mr-3 ml-9">¿Obligado a contratar aprendices?</span>                    </div>
                            <div
                                className={`bg-white h-12 w-auto rounded-1-xl border-t-2 border-b-2 border-vgray flex items-center text-vgray2 px-3 border-l-0 border-r-0`} style={{ backgroundColor: isObligatedSelected ? '#BAEDBD' : 'white' }} onClick={handleObligatedClick}>
                                <button className="font-semibold text-black p-2">Si</button>
                            </div>
                            <div
                                className={`bg-white h-12 w-auto rounded-r-xl border-2 border-vgray flex items-center text-vgray2 px-3 pr-4 pl-4`} style={{ backgroundColor: isObligatedSelected ? 'white' : '#BAEDBD' }} onClick={handleObligatedClick}>
                                <button className="font-semibold text-black">No</button>
                            </div>
                        </div>
                    </div>
                    <div className=" flex relative mt-4 ml-20 ">
                        <div className="bg-white h-12 w-80 rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-6">
                            <input type="text" placeholder="Caja de compensacion" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-80 text-center" />
                        </div>
                        <div className="bg-white h-12 w-80 rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-6">
                            <input type="text" placeholder="Efectua los pagos en" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-80 text-center" />
                        </div>
                    </div>
                    <div className=" flex relative mt-4 ml-20 ">
                        <div className="bg-white h-12 w-80 rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-6">
                            <input type="text" placeholder="Caja de compensacion" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-80 text-center" />
                        </div>
                        <div className="bg-white h-12 w-80 rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-6">
                            <input type="text" placeholder="Efectua los pagos en" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-80 text-center" />
                        </div>
                        <div className="bg-white h-12 w-80 rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-6">
                            <input type="text" placeholder="Caja de compensacion" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-80 text-center" />
                        </div>
                        <div className="bg-white h-12 w-80 rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-6">
                            <input type="text" placeholder="Efectua los pagos en" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-80 text-center" />
                        </div>
                    </div>
                </section>
            </div>
        </section>
    )
}
