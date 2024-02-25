import { Check, X, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';

export function RegistroEmpresa() {
    const navigate = useNavigate();
    const [selectedDocumentType, setSelectedDocumentType] = useState('NIT');
    const [selectedOption, setSelectedOption] = useState('No');

    const handleDocumentClick = (documentType) => {
        setSelectedDocumentType(documentType);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    return (
        <section>
            <div className="w-full max-w-full h-full">
                <button className="flex items-center text-vgreen font-semibold px-16 mt-5 text-xl gap-4" onClick={() => { navigate(`/empresas`); }}>
                    <ChevronLeft size={30} />Registro de empresa
                </button>

                <div className="w-11/12 flex justify-end mt-10 ml-5 centered">
                    <button className="px-4 py-2 bg-red-500 text-white font-medium text-sm rounded-lg flex items-center gap-2 mr-4" onClick={() => { navigate(`/empresas`); }}>
                        <X className="h-4 w-4" /> Cancelar
                    </button>
                    <button className="px-4 py-2 bg-green-500 text-white font-medium text-sm rounded-lg flex items-center gap-2">
                        <Check className="h-4 w-4" /> Guardar
                    </button>

                </div>

                <section className="mt-5 ml-5 overflow-y-auto " style={{ maxHeight: "calc(100vh - 100px)" }}>


                    <div className=" flex flex-wrap centered">
                        <div className="bg-white h-12 w-[284px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4 mt-4">
                            <input type="text" placeholder="Razon social" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-[284px] text-center" />
                        </div>
                        <div className="flex centered flex-wrap mr-4 mt-4">
                            <div className={`bg-white h-12 w-[284px] border-2 border-vgray flex items-center font-semibold text-vgray2 px-3 ${window.innerWidth <= 425 ? 'rounded-t-xl border-t-2 border-l-2 border-r-2 border-b-0' : 'rounded-l-xl border-2'}`}>
                                <input type="text" placeholder="Numero de documento" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-full md:w-[284px] text-center " />
                            </div>
                            <div className={`bg-white h-12 border-vgray flex items-center text-vgray2 px-3 border-l-0 border-r-0 ${window.innerWidth <= 425 ? 'w-[142px] block md:flex border-l-2 rounded-bl-xl border-2' : 'block md:flex rounded-1-xl border-t-2 border-b-2'}`} style={{ backgroundColor: selectedDocumentType === 'NIT' ? '#BAEDBD' : 'white' }} onClick={() => handleDocumentClick('NIT')}>
                                <button className="font-semibold text-black p-2">NIT</button>
                            </div>
                            <div className={`bg-white h-12 border-vgray flex items-center text-vgray2 px-3 ${window.innerWidth <= 425 ? 'w-[142px] block md:flex rounded-br-xl border-2' : 'block md:flex rounded-r-xl border-2'}`} style={{ backgroundColor: selectedDocumentType === 'Cedula' ? '#BAEDBD' : 'white' }} onClick={() => handleDocumentClick('Cedula')}>
                                <button className="font-semibold text-black">Cedula</button>
                            </div>
                        </div>
                        <div className="bg-white h-12 w-26 rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4 mt-4">
                            <input type="text" placeholder="DV" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-8" />
                        </div>
                        <div className="bg-white h-12  w-32 rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mt-4">
                            <input type="text" placeholder="CIIU" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-20 text-center" />
                        </div>
                    </div>

                    <div className=" flex flex-wrap mt-4 centered">
                        <div className="bg-white h-12 w-[284px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4 mt-4">
                            <input type="text" placeholder="Direccion" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-[284px] text-center" />
                        </div>
                        <div className="bg-white h-12 w-[284px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4 mt-4">
                            <input type="text" placeholder="Municipio" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-[284px] text-center" />
                        </div>
                    </div>

                    <div className=" flex flex-wrap mt-4 centered">
                        <div className="bg-white h-12 w-[284px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4 mt-4">
                            <input type="text" placeholder="Telefono" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-[284px] text-center" />
                        </div>
                        <div className="bg-white h-12 w-[284px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4 mt-4">
                            <input type="text" placeholder="Fax" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-[284px] text-center" />
                        </div>
                        <div className="bg-white h-12 w-[284px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mt-4">
                            <input type="text" placeholder="Correo electronico" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-[284px] text-center" />
                        </div>
                    </div>

                    <div className=" flex flex-wrap mt-4 centered">
                        <div className="bg-white h-12 w-[284px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4 mt-4">
                            <input type="text" placeholder="Representante legal" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-[284px] text-center" />
                        </div>
                        <div className="bg-white h-12 w-[284px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4 mt-4">
                            <input type="text" placeholder="Cedula R.P" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-[284px] text-center" />
                        </div>

                    </div>

                    <div className=" flex flex-wrap mt-4 centered">
                        <div className="bg-white h-12 w-[284px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4 mt-4">
                            <input type="text" placeholder="Funcionario entrevistado" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-[284px] text-center" />
                        </div>
                        <div className="bg-white h-12 w-[284px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4 mt-4">
                            <input type="text" placeholder="Cargo" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-[284px] text-center" />
                        </div>
                    </div>

                    <div className=" flex flex-wrap mt-4 centered">
                        <div className="bg-white h-12 w-[284px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4 mt-4">
                            <input type="text" placeholder="Numero de trabajadores" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-[284px] text-center" />
                        </div>
                        <div className="flex centered flex-wrap mr-4 mt-4">
                            <div className={`bg-white h-12 w-[284px] border-2 border-vgray flex items-center font-semibold text-vgray2 px-3 ${window.innerWidth <= 425 ? 'rounded-t-xl border-t-2 border-l-2 border-r-2 border-b-0' : 'rounded-l-xl border-2'}`}>
                                <span className="mr-3 ml-9">¿Obligado a contratar?</span>
                            </div>
                            <div className={`bg-white h-12 border-vgray flex items-center text-vgray2 px-5 border-l-0 border-r-0 ${window.innerWidth <= 425 ? 'w-[142px] block md:flex border-l-2 rounded-bl-xl border-2' : 'block md:flex rounded-1-xl border-t-2 border-b-2'}`} style={{ backgroundColor: selectedOption === 'Si' ? '#BAEDBD' : 'white' }} onClick={() => handleOptionClick('Si')}>
                                <button className="font-semibold text-black p-2">Si</button>
                            </div>
                            <div className={`bg-white h-12 border-vgray flex items-center text-vgray2 px-7 ${window.innerWidth <= 425 ? 'w-[142px] block md:flex rounded-br-xl border-2' : 'block md:flex rounded-r-xl border-2'}`} style={{ backgroundColor: selectedOption === 'No' ? '#BAEDBD' : 'white' }} onClick={() => handleOptionClick('No')}>
                                <button className="font-semibold text-black">No</button>
                            </div>
                        </div>
                    </div>
                    <div className=" flex flex-wrap mt-4 centered">
                        <div className="bg-white h-12 w-[284px] rounded-xl border-2 border-vgray flex  text-vgray2 px-3 mr-4 mt-4">
                            <input type="text" placeholder="Caja de compensacion" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-[284px] text-center" />
                        </div>
                        <div className="bg-white h-12 w-[284px] rounded-xl border-2 border-vgray flex text-vgray2 px-3 mr-4 mt-4">
                            <input type="text" placeholder="Efectua los pagos en" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-[284px] text-center" />
                        </div>
                    </div>

                    <div className=" flex flex-wrap mt-4 centered">
                        <div className="bg-white h-12 w-[284px] rounded-xl border-2 border-vgray flex  text-vgray2 px-3 mr-4 mt-4 ">
                            <input type="text" placeholder="Escritura constitucion" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-[284px] text-center" />
                        </div>
                        <div className="bg-white h-12 w-[284px] rounded-xl border-2 border-vgray flex  text-vgray2 px-3 mr-4 mt-4 ">
                            <input type="text" placeholder="Notaria" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-[284px] text-center" />
                        </div>
                        <div className="bg-white h-12 w-[284px] rounded-xl border-2 border-vgray flex  text-vgray2 px-3 mr-4 mt-4 ">
                            <input type="text" placeholder="Ciudad" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-[284px] text-center" />
                        </div>
                        <div className="bg-white h-12 w-[284px] rounded-xl border-2 border-vgray flex  text-vgray2 px-3 mr-4 mt-4 mb-10">
                            <input type="date" placeholder="Fecha" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-[284px] text-center" />
                        </div>
                    </div>

                </section>
            </div>
        </section>
    )
}
