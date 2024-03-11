import { Check, X, ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useGlobalContext } from "../context/context"
import { postbussiness } from "../requests/postempresas";
import { updatebuss } from "../requests/updateEmpresas";
import { getbussinfo } from "../requests/getEmpresasInfo";
import { Modal } from "../components/Modal";

export function RegistroEmpresa() {

    const navigate = useNavigate();
    const { idempresa } = useParams();
    const [datatra, setDatatra] = useState([]);

    const { activeAlert } = useGlobalContext()
    const [selectedDocumentType, setSelectedDocumentType] = useState('NIT');
    const handleDocumentClick = (documentType) => {
        setSelectedDocumentType(documentType);
    };

    const [Razonsocial, setRazonsocial] = useState('');
    const [NumIdentificacion, setNumIdentificacion] = useState('');
    const [DV, setDV] = useState('');
    const [CIIU, setCIIU] = useState('');
    const [Actividadeconomica, setActividadeconomica] = useState('');
    const [Direccion, setDireccion] = useState('');
    const [Municipio, setMunicipio] = useState('');
    const [Telefono, setTelefono] = useState('');
    const [Fax, setFax] = useState('');
    const [Correo, setCorreo] = useState('');
    const [Representantelegal, setRepresentantelegal] = useState('');
    const [CCrepresentantelegal, setCCrepresentantelegal] = useState('');
    const [Cajadecompensacion, setCajadecompensacion] = useState('');
    const [Escrituraconstitucion, setEscrituraconstitucion] = useState('');
    const [Notaria, setNotaria] = useState('');
    const [Ciudad, setCiudad] = useState('');
    const [Fecha, setFecha] = useState('');

    const [open, setOpen] = useState(false);


    async function registrarempresa() {

        try {
            const res = await postbussiness(NumIdentificacion, Razonsocial, selectedDocumentType, DV, Direccion, Municipio, Telefono, Fax, Actividadeconomica, CIIU, Correo, Representantelegal, CCrepresentantelegal, Cajadecompensacion, Escrituraconstitucion? Escrituraconstitucion: null, Notaria? Notaria: null, Ciudad? Ciudad: null, Fecha? Fecha: null);
            activeAlert('success', res, 2000);
            navigate("/empresas")
        } catch (error) {
            activeAlert('error', error.message, 2000);
        }
    }
    const validateInputs = () => {
        const requiredFields = [Razonsocial, NumIdentificacion, selectedDocumentType, DV, CIIU, Actividadeconomica, Direccion, Municipio, Telefono, Fax, Correo, Representantelegal, CCrepresentantelegal, Cajadecompensacion];
        const camposRequeridos = [Direccion, Municipio, Telefono, Fax, Correo, Representantelegal, CCrepresentantelegal, Cajadecompensacion];

        if (idempresa) {
            if (camposRequeridos.some(valor => !valor.trim())) {
                activeAlert('error', 'Todos los campos son requeridos', 2000);
                return false;
            }
            return true;
        } else if (requiredFields.some(field => !field || !field.trim())) {
            activeAlert('error', 'Todos los campos son requeridos', 2000);
            return false;
        } else {

            return true;
        }

    };


    useEffect(() => {
        async function traerinfoempresa() {
            if (idempresa) {
                try {
                    const emptra = await getbussinfo(idempresa);
                    if (Object.keys(emptra).length > 0) {
                        setDatatra(emptra);
                        setNumIdentificacion(emptra.numidentificacion);
                        setRazonsocial(emptra.razonsocial);
                        setSelectedDocumentType(emptra.tipodocumento);
                        setDV(emptra.dv);
                        setDireccion(emptra.direccion);
                        setMunicipio(emptra.municipio);
                        setTelefono(emptra.telefono);
                        setFax(emptra.fax);
                        setActividadeconomica(emptra.actividadeconomica);
                        setCIIU(emptra.ciiu);
                        setCorreo(emptra.correo)
                        setRepresentantelegal(emptra.representantelegal)
                        setCCrepresentantelegal(emptra.ccrepresentante)
                        setCajadecompensacion(emptra.cajadecompensacion)
                        setEscrituraconstitucion(emptra.numescrituraconstitucion);
                        setNotaria(emptra.numnotaria);
                        setCiudad(emptra.ciudad);
                        setFecha(emptra.fecha);
                    }
                    else {
                        activeAlert("error", "La informacion es vacia", 2000);
                    }
                } catch (error) {
                    if (error.status == 401) {
                        activeAlert("warning", "Su sesion ha expirado, inicie sesion de nuevo", 6000)
                        setTimeout(() => {
                            navigate("/")
                        }, 3000)
                    }
                }
            }
        }
        traerinfoempresa();
    }, []);

    async function actualizarempresa() {

        try {
            const res = await updatebuss(idempresa, Direccion, Municipio, Telefono, Fax, Correo, Representantelegal, CCrepresentantelegal, Cajadecompensacion, Escrituraconstitucion, Notaria, Ciudad, Fecha);
            activeAlert('success', res, 2000);
            navigate("/empresas")
        } catch (error) {
            activeAlert('error', error.message, 2000);
        }
    }

    return (
        <section>
            <div className="w-full max-w-full h-full">
                <button className="flex items-center text-vgreen font-semibold px-16 mt-5 text-xl gap-4" onClick={() => { navigate(`/empresas`); }}>
                    <ChevronLeft size={30} />{idempresa ? 'Actualizar' : 'Registrar'} empresa
                </button>

                <div className="w-11/12 flex justify-end mt-10 ml-5 centered">
                    <button className="px-4 py-2 bg-red-500 text-white font-medium text-sm rounded-lg flex items-center gap-2 mr-4" onClick={() => { navigate(`/empresas`); }}>
                        <X className="h-4 w-4" /> Cancelar
                    </button>
                    <button className="px-4 py-2 bg-vgreen text-white font-medium text-sm rounded-lg flex items-center gap-2" onClick={() => {
                        if (validateInputs()) {
                            setOpen(true);
                        }
                    }}>
                        <Check className="h-4 w-4" /> {idempresa ? 'Actualizar' : 'Registrar'}
                    </button>
                    <Modal open={open} onClose={() => setOpen(false)} title={idempresa ? 'Confirmar Actualización' : 'Comfirmar registro'} text={idempresa ? '¿Esta seguro de actualizar la empresa?' : '¿Esta seguro de agregar la empresa'} onAcept={idempresa ? (actualizarempresa) : (registrarempresa)} />

                </div>

                <section className="mt-5 ml-5 overflow-y-auto " style={{ maxHeight: "calc(100vh - 200px)" }}>

                    <div className=" flex flex-wrap centered mt-5">
                        <div>
                            <label className="flex flex-wrap mt-4 justify-center text-center text-black font-semibold">Razón social</label>
                            <div className="bg-white h-12 w-[284px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4">
                                <input onChange={(event) => { setRazonsocial(event.target.value); }} value={Razonsocial} type="text" required="true" placeholder="Razón social" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-full text-center" disabled={idempresa ? true : false} />
                            </div>
                        </div>

                        <div>
                            <label className="flex flex-wrap mt-4 justify-center text-center text-black font-semibold">Info documentos</label>
                            <div className="flex centered flex-wrap mr-4">
                                <div className={`bg-white h-12 w-[284px] border-2 border-vgray flex items-center font-semibold text-vgray2 px-3 ${window.innerWidth <= 425 ? 'rounded-t-xl border-t-2 border-l-2 border-r-2 border-b-0' : 'rounded-l-xl border-2'}`}>
                                    <input onChange={(event) => { setNumIdentificacion(event.target.value); }} value={NumIdentificacion} type="number" placeholder="Numero de documento" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-full text-center " disabled={idempresa ? true : false} />
                                </div>
                                <div className={`bg-white h-12 border-vgray flex items-center text-vgray2 px-3 border-l-0 border-r-0 ${window.innerWidth <= 425 ? 'w-[142px] block md:flex border-l-2 rounded-bl-xl border-2' : 'block md:flex rounded-1-xl border-t-2 border-b-2'}`} style={{ backgroundColor: selectedDocumentType === 'NIT' ? '#BAEDBD' : 'white' }} onClick={!idempresa ? () => handleDocumentClick('NIT') : null} >
                                    <button className="font-semibold text-black p-2">NIT</button>
                                </div>
                                <div className={`bg-white h-12 border-vgray flex items-center text-vgray2 px-3 ${window.innerWidth <= 425 ? 'w-[142px] block md:flex rounded-br-xl border-2' : 'block md:flex rounded-r-xl border-2'}`} style={{ backgroundColor: selectedDocumentType === 'CC' ? '#BAEDBD' : 'white' }} onClick={!idempresa ? () => handleDocumentClick('CC') : null}>
                                    <button className="font-semibold text-black">Cedula</button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="flex flex-wrap mt-4 justify-center text-center text-black font-semibold">Dv</label>
                            <div className="bg-white h-12 w-26 rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 ">
                                <input onChange={(event) => { setDV(event.target.value); }}value={DV} type="number" placeholder="DV" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-8"disabled={idempresa ? true : false} />
                            </div>
                        </div>
                    </div>


                    <div className=" flex flex-wrap centered">
                        <div >
                            <label className="flex flex-wrap  justify-center text-center text-black font-semibold mt-4">Código</label>
                            <div className="bg-white h-12  w-32 rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4" >
                                <input onChange={(event) => { setCIIU(event.target.value); }} value={CIIU} type="number" placeholder="CIIU" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-20 text-center" disabled={idempresa ? true : false}/>
                            </div>
                        </div>

                        <div>
                            <label className="flex flex-wrap  justify-center text-center text-black font-semibold mt-4">Actividad económica</label>
                            <div className="bg-white h-12 w-[284px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4">
                                <input onChange={(event) => { setActividadeconomica(event.target.value); }} value={Actividadeconomica} type="text" placeholder="Actividad económica" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-full text-center" disabled={idempresa ? true : false}/>
                            </div>
                        </div>
                    </div>


                    <div className=" flex flex-wrap centered">
                        <div>
                            <label className="flex flex-wrap  justify-center text-center text-black font-semibold mt-4">Dirección</label>
                            <div className="bg-white h-12 w-[284px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4">
                                <input onChange={(event) => { setDireccion(event.target.value); }} value={Direccion} type="text" placeholder="Dirección" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-full text-center" />
                            </div>
                        </div>
                        <div>
                            <label className="flex flex-wrap  justify-center text-center text-black font-semibold mt-4">Municipio</label>
                            <div className="bg-white h-12 w-[284px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4">
                                <input onChange={(event) => { setMunicipio(event.target.value); }} value={Municipio} type="text" placeholder="Municipio" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-full text-center" />
                            </div>
                        </div>
                    </div>
                    <div className=" flex flex-wrap centered">
                        <div>
                            <label className="flex flex-wrap  justify-center text-center text-black font-semibold mt-4">Teléfono</label>
                            <div className="bg-white h-12 w-[284px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4">
                                <input onChange={(event) => { setTelefono(event.target.value); }} value={Telefono} type="number" placeholder="Teléfono" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-full text-center" />
                            </div>
                        </div>
                        <div>
                            <label className="flex flex-wrap  justify-center text-center text-black font-semibold mt-4 ">Fax</label>
                            <div className="bg-white h-12 w-[284px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4">
                                <input onChange={(event) => { setFax(event.target.value); }} value={Fax} type="text" placeholder="Fax" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-full text-center" />
                            </div>
                        </div>
                        <div>
                            <label className="flex flex-wrap  justify-center text-center text-black font-semibold mt-4 ">Correo electrónico</label>
                            <div className="bg-white h-12 w-[284px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3  mr-4">
                                <input onChange={(event) => { setCorreo(event.target.value); }} value={Correo} type="text" placeholder="Correo electrónico" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-full text-center" />
                            </div>
                        </div>
                    </div>
                    <div className=" flex flex-wrap centered">
                        <div>
                            <label className="flex flex-wrap  justify-center text-center text-black font-semibold mt-6">Representante legal</label>
                            <div className="bg-white h-12 w-[284px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4">
                                <input onChange={(event) => { setRepresentantelegal(event.target.value); }} value={Representantelegal} type="text" placeholder="Representante legal" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-full text-center" />
                            </div>
                        </div>
                        <div>
                            <label className="flex flex-wrap  justify-center text-center text-black font-semibold mt-6">Documento Representante</label>
                            <div className="bg-white h-12 w-[284px] rounded-xl border-2 border-vgray flex items-center text-vgray2 px-3 mr-4">
                                <input onChange={(event) => { setCCrepresentantelegal(event.target.value); }} value={CCrepresentantelegal} type="number" placeholder="Cedula R.P" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-full text-center" />
                            </div>
                        </div>
                        <div>
                            <label className="flex flex-wrap  justify-center text-center text-black font-semibold mt-6">Caja de compensación</label>
                            <div className="bg-white h-12 w-[284px] rounded-xl border-2 border-vgray flex  text-vgray2 px-3 mr-4">
                                <input onChange={(event) => { setCajadecompensacion(event.target.value); }} value={Cajadecompensacion} type="text" placeholder="Caja de compensación" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-full text-center" />
                            </div>
                        </div>
                    </div>

                    <div className=" flex flex-wrap centered">
                        <div>
                            <label className="flex flex-wrap  justify-center text-center text-black font-semibold mt-6">Numero escritura</label>
                            <div className="bg-white h-12 w-[284px] rounded-xl border-2 border-vgray flex  text-vgray2 px-3 mr-4  ">
                                <input onChange={(event) => { setEscrituraconstitucion(event.target.value); }} value={Escrituraconstitucion} type="number" placeholder="Escritura constitucion" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-full text-center" disabled={idempresa && datatra.numescrituraconstitucion? true : false}/>
                            </div>
                        </div>
                        <div>
                            <label className="flex flex-wrap  justify-center text-center text-black font-semibold mt-6">Numero Notaria</label>
                            <div className="bg-white h-12 w-[284px] rounded-xl border-2 border-vgray flex  text-vgray2 px-3 mr-4 ">
                                <input onChange={(event) => { setNotaria(event.target.value); }} value={Notaria}type="number" placeholder="Notaria" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-full text-center" disabled={idempresa && datatra.numnotaria? true : false}/>
                            </div>
                        </div>
                        <div>
                            <label className="flex flex-wrap  justify-center text-center text-black font-semibold mt-6">Ciudad notaria</label>
                            <div className="bg-white h-12 w-[284px] rounded-xl border-2 border-vgray flex  text-vgray2 px-3 mr-4  ">
                                <input onChange={(event) => { setCiudad(event.target.value); }} value={Ciudad} type="text" placeholder="Ciudad" className="placeholder:font-semibold placeholder:text-vgray2 outline-none text-black font-semibold ml-3 w-full text-center"disabled={idempresa && datatra.ciudad? true : false} />
                            </div>
                        </div>
                        <div className="bg-white h-12 w-[284px] rounded-xl border-2 border-vgray flex text-vgray2 px-3 mr-2 mt-12 mb-5">
                            <label htmlFor="fecha" className="text-vgray2 font-semibold flex-grow mt-[10px] ml-4">Fecha</label>
                            <input onChange={(event) => { setFecha(event.target.value); }} value={Fecha} type="date" id="fecha" placeholder="Fecha" className="outline-none text-black font-semibold w-[150px] " disabled={idempresa && datatra.fecha? true : false}/>
                        </div>
                    </div>

                </section>
            </div>
        </section>
    )
}
