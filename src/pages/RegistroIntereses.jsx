import { Check, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../context/context"
import { postinterest } from "../requests/postIntereses";
import { getsmlv } from "../requests/getsmlv";
import { Modal } from "../components/Modal";


export function RegistroIntereses() {
    const navigate = useNavigate();
    const { activeAlert } = useGlobalContext()

    const meses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const [mes, setMes] = useState('');
    const [anio, setAnio] = useState('');
    const [tasaanual, setTasaanual] = useState('');
    const [smmv, setSmmv] = useState(0);
    const [condicion, setCondicion] = useState(true);

    const [open, setOpen] = useState(false);

    const validateInputs = () => {
        if (!mes.trim() || !anio.trim() || !tasaanual.trim() || !String(smmv).trim()) {
            activeAlert('error', 'Todos los campos son requeridos', 2000);
            return false;
        }
        return true;
    };

    async function registrarintereses() {
        try {
            const res = await postinterest(mes, anio, tasaanual, smmv);
            activeAlert('success', res, 2000);
            navigate("/intereses")
        } catch (error) {
            activeAlert('error', error.message, 2000);
        }
    }

    useEffect(() => {
        (async () => {
            try {
                if (anio.length === 4) {
                    const data = await getsmlv(anio);
                    setSmmv(data ? parseFloat(data) : 0);
                    setCondicion(true);
                } else {
                    setSmmv("smmv");
                    setCondicion(false);
                }
            } catch (error) {
                setSmmv("smmv");
                setCondicion(false);
                if (error.status == 401) {
                    activeAlert("warning", "Su sesion ha expirado, inicie sesion de nuevo", 6000)
                    setTimeout(() => {
                        navigate("/")
                    }, 3000)
                }
            }
        })();
    }, [anio]);


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
                            <input onChange={(event) => { setTasaanual(event.target.value); }} type="number" placeholder="Digita un numero" className="outline-none text-vgray2 font-semibold w-[320px] text-center" min="2000" max="2099" />
                        </div>
                    </div>
                </div>
                <div className=" flex flex-wrap mt-4 centered">
                    <div>
                        <label className="flex flex-wrap mt-4 centered-full justify-center text-center text-black font-semibold">Mes</label>
                        <div className="bg-white h-12 w-[320px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4 mt-1 centered-full">
                            <select onChange={(event) => { setMes(event.target.value); }} className="outline-none text-vgray2 font-semibold  w-[300px] text-center">
                                <option value="" defaultValue={"Selecciona un rol"}>Selecciona un mes</option>
                                {meses.map((mes, index) => (
                                    <option key={index} value={mes}>{mes}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="flex flex-wrap mt-4 centered-full justify-center text-center text-black font-semibold">Año</label>
                        <div className="bg-white h-12 w-[320px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4 mt-1 centered-full">
                            <input onChange={(event) => {
                                const inputValue = event.target.value;
                                const sanitizedValue = inputValue.replace(/\D/g, ''); // Elimina caracteres no numéricos
                                event.target.value = sanitizedValue.substring(0, 4);
                                setAnio((event.target.value));
                            }} type="number" placeholder="Digita un año" className="outline-none text-vgray2 font-semibold  w-[320px] text-center" min="2000" max="2099" />
                        </div>
                    </div>
                    <div>
                        <label className="flex flex-wrap mt-4 centered-full justify-center text-center text-black font-semibold">SMLMV</label>
                        <div className="bg-white h-12 w-[320px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4 mt-1 centered-full">
                            <input onChange={({ target }) => setSmmv(target.value)} value={smmv !== "smmv" ? smmv : ""} type="number" placeholder="SMLV" className="outline-none text-vgray2 font-semibold w-[300px] text-center" disabled={condicion} />
                        </div>
                    </div>
                </div>
                <div className="w-11/12 flex justify-end mt-10 ml-5 centered">
                    <button className="px-4 py-2 bg-vgreen text-white font-medium text-sm rounded-lg flex items-center gap-2" onClick={() => {
                        if (validateInputs()) {
                            setOpen(true);
                        }
                    }} >
                        <Check className="h-4 w-4" /> Guardar
                    </button>
                </div>
            </section>
            <Modal open={open} onClose={() => setOpen(false)} title={'Confirmar registro'} text={'¿Esta seguro de agregar el nuevo interes?'} onAcept={registrarintereses} />

        </section>
    )
}