import { Check, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function RegistroIntereses() {
    const navigate = useNavigate();

    const meses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto","Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    return (
        <section>
            <div className="w-full max-w-full h-full ">
                <button className="flex items-center text-vgreen font-semibold px-16 mt-5 text-xl gap-4" onClick={() => { navigate(`/intereses`); }}>
                    <ChevronLeft size={30} />Registrar intereses
                </button>
            </div>

            <section className="mt-5 ml-5 overflow-y-auto" style={{ maxHeight: "calc(100vh - 100px)" }}>
                <div className=" flex flex-wrap centered">
                    <div>
                        <label className="flex flex-wrap mt-24 centered-full justify-center text-center text-black font-semibold">% Tasa legal de usura</label>
                        <div className="bg-white h-12 w-[320px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4 mt-1 ml-50 centered-full">
                            <input type="number" placeholder="Digita un numero" className="outline-none text-vgray2 font-semibold ml-3 w-[320px] text-center" min="2000" max="2099" />
                        </div>
                    </div>
                </div>
                <div className=" flex flex-wrap mt-4 centered">
                    <div>
                        <label className="flex flex-wrap mt-4 centered-full justify-center text-center text-black font-semibold">Mes</label>
                        <div className="bg-white h-12 w-[320px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4 mt-1 centered-full">
                            <select className="outline-none text-vgray2 font-semibold ml-3 w-[320px] text-center">
                                <option value="" disabled selected hidden>Selecciona un mes</option>
                                {meses.map((mes, index) => (
                                    <option key={index} value={mes.toLowerCase()}>{mes}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="flex flex-wrap mt-4 centered-full justify-center text-center text-black font-semibold">Año</label>
                        <div className="bg-white h-12 w-[320px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4 mt-1 centered-full">
                            <input type="number" placeholder="Digita un año" className="outline-none text-vgray2 font-semibold ml-3 w-[320px] text-center" min="2000" max="2099" />
                        </div>
                    </div>
                    <div>
                        <label className="flex flex-wrap mt-4 centered-full justify-center text-center text-black font-semibold">SMLMV</label>
                        <div className="bg-white h-12 w-[320px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4 mt-1 centered-full">
                            <input type="number" placeholder="SMLV" className="outline-none text-vgray2 font-semibold ml-3 w-[320px] text-center" min="2000" max="2099" />
                        </div>
                    </div>
                </div>
                <div className="w-11/12 flex justify-end mt-10 ml-5 centered">
                    <button className="px-4 py-2 bg-green-500 text-white font-medium text-sm rounded-lg flex items-center gap-2">
                        <Check className="h-4 w-4" /> Guardar
                    </button>
                </div>
            </section>

        </section>
    )
}