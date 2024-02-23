import { Eye, Plus, Search, SquarePen } from "lucide-react";
import { getEmpresas } from "../requests/getEmpresas";
import { useState, useEffect } from "react";
import { Paginationbuttons } from "../components/paginationButtons";


export function Empresas() {

  const [empresas, setEmpresas] = useState([]);
  const [lempresas, setLempresas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(0)


  useEffect(() => {
    async function fetchData() {
      try {
        const empresasData = await getEmpresas(currentPage,searchTerm);
        setEmpresas(empresasData.listaempresas);
        setLempresas(empresasData);
      } catch (error) {
        console.error('Error al obtener datos de empresas:', error);
      }
    }

    fetchData();
  }, [currentPage,searchTerm]);

  useEffect(() => {
    if (searchTerm !== '') {
      setCurrentPage(0);
    }
  }, [searchTerm]); 
  return (

    <div className="w-full max-w-fu h-svh overflow-y-auto">
      <h1 className="text-vgreen font-semibold px-16 mt-4 text-xl">Lista de empresas</h1>

      <section className=" flex justify-center">
        <div className=" w-11/12 flex items-center justify-between mt-10 ">
          <div className="h-12 w-60 rounded-xl border-2 bg-[#E6E5E5] flex items-center text-vgray2 justify-center">
            <Search size={20} color="#7D7D7D" />
            <input onChange={(event) => { setSearchTerm(event.target.value); }} type="text" placeholder="Buscar" className=" bg-[#E6E5E5] placeholder:font-medium placeholder:text-[#7D7D7D] outline-none text-black font-semibold ml-3 w-44" />
          </div>
          <button className="px-4 py-2 bg-vgreen text-white font-medium text-sm rounded-lg flex gap-2" >
            <Plus size={20} color="#FFFFFF" />
            Añadir
          </button>
        </div>
      </section>


      <section className="flex flex-col items-center relative overflow-x-auto">
        <div className="h-14 w-11/12 bg-white rounded-xl mb-3 grid items-center px-3 mt-6 bg"
          style={{ gridTemplateColumns: '2fr 0.7fr 1fr 1fr 0.7fr 0.5fr' }}>
          <h1 className=" text-vgraylight font-medium">Nombre</h1>
          <h1 className=" text-vgraylight font-medium text-center">Tipo</h1>
          <h1 className=" text-vgraylight font-medium text-center" >Identificación</h1>
          <h1 className=" text-vgraylight font-medium text-center">Teléfono</h1>
          <h1 className=" text-vgraylight font-medium text-center">Obras</h1>
        </div>

        {empresas.map((empresa, index) => (
          <div key={index} className="h-14 w-11/12 bg-white rounded-xl grid items-center px-3 mt-5"
            style={{ gridTemplateColumns: '2fr 0.7fr 1fr 1fr 0.7fr 0.5fr' }}>
            <h1 className="text-vgraydark font-semibold">{empresa.razonsocial}</h1>
            <h1 className="text-vgraydark font-semibold text-center">{empresa.tipodocumento}</h1>
            <h1 className="text-vgraydark font-semibold text-center">{empresa.numidentificacion}</h1>
            <h1 className="text-vgraydark font-semibold text-center">{empresa.telefono}</h1>
            <h1 className="text-vgraydark font-semibold text-center">{empresa.numobras}</h1>
            <div className="flex gap-5 justify-center">
              <Eye color="#204ADF" />
              <SquarePen color="#00AF00" />
            </div>
          </div>
        ))}
      </section>
      <Paginationbuttons totalPages={lempresas.totalpaginas} setCurrentPage={setCurrentPage} />

    </div>

  )
}