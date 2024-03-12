import { Eye, Plus, Search, SquarePen } from "lucide-react";
import { getEmpresas } from "../requests/getEmpresas";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { PaginationButtons } from "../components/paginationButtons";
import { useGlobalContext } from "../context/context";
import { Loading } from "../components/Loading";
import Cookies from "js-cookie";

export function Empresas() {

  const [empresas, setEmpresas] = useState([]);
  const [lempresas, setLempresas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const navigate = useNavigate()
  const {activeAlert} = useGlobalContext()

  useEffect(() => {
    async function fetchData() {
      setEmpresas([])
      try {
        const empresasData = await getEmpresas(currentPage, searchTerm);
        setEmpresas(empresasData.listaempresas);
        setLempresas(empresasData);
      } catch (error) {
        if (error.status == 401) {
          Cookies.remove('session')
          activeAlert("warning", "Su sesion ha expirado, inicie sesion de nuevo", 6000)
          setTimeout(() => {
              navigate("/")
          }, 3000)
      }
      }
    }

    fetchData();
  }, [currentPage, searchTerm]);

  useEffect(() => {
    if (searchTerm !== '') {
      setCurrentPage(0);
    }
  }, [searchTerm]);

  
  if (empresas === null) {
    return <div className="w-full max-w-fu h-svh flex justify-center items-center">
      <Loading size={50}/>
    </div> 
  }

  if (empresas !== null) return (
    <div className="w-full max-w-full h-svh overflow-y-auto">
      <h1 className="text-vgreen font-semibold px-16 mt-4 text-xl">Lista de empresas</h1>

      <section className=" flex justify-center">
        <div className=" w-11/12 flex items-center justify-between mt-10 ">
          <div className="h-12 w-60 rounded-xl border-2 bg-[#E6E5E5] flex items-center text-vgray2 justify-center">
            <Search size={20} color="#7D7D7D" />
            <input onChange={(event) => { setSearchTerm(event.target.value); }} type="text" placeholder="Buscar" className=" bg-[#E6E5E5] placeholder:font-medium placeholder:text-[#7D7D7D] outline-none text-black font-semibold ml-3 w-44" />
          </div>
          <button className="px-4 py-2 bg-vgreen text-white font-medium text-sm rounded-lg flex gap-2" onClick={() => {
            navigate('/empresas/registroempresas')
          }}>
            <Plus size={20} color="#FFFFFF" />
            Añadir
          </button>

        </div>
      </section>


      <section className="flex flex-col items-center relative overflow-x-auto">
        <div className="max-xl:scale-0 h-14 w-11/12 bg-white rounded-xl mb-3 grid items-center px-3 mt-6 "
          style={{ gridTemplateColumns: '2fr 0.7fr 1fr 1fr 0.7fr 0.5fr' }}>
          <h1 className=" text-vgraylight font-medium">Nombre</h1>
          <h1 className=" text-vgraylight font-medium text-center">Tipo</h1>
          <h1 className=" text-vgraylight font-medium text-center" >Identificación</h1>
          <h1 className=" text-vgraylight font-medium text-center">Teléfono</h1>
          <h1 className=" text-vgraylight font-medium text-center">Obras</h1>
        </div>

        <div className="w-full flex xl:items-center xl:flex-col max-xl:justify-center max-xl:flex-row max-xl:flex-wrap max-xl:-translate-y-16">
          {empresas.map((empresa, index) => (
            <div key={index} className={`text-vgraydark font-semibold bg-white rounded-xl items-center px-3 mt-5 max-xl:max-w-[280px] max-xl:w-[280px] max-xl:p-5 max-xl:rounded-2xl max-xl:mx-4 xl:grid xl:text-center xl:grid-cols-[2fr_0.7fr_1fr_1fr_0.7fr_0.5fr] xl:h-14 xl:w-11/12`}>
              <h1 className="text-left"> <span className="xl:text-[0px] xl:text-transparent xl:scale-0 text-black"> Nombre: </span> {empresa.razonsocial}</h1>
              <h1 className=""> <span className="xl:text-[0px] xl:text-transparent xl:scale-0 text-black"> Tipo: </span> {empresa.tipodocumento}</h1>
              <h1 className=""> <span className="xl:text-[0px] xl:text-transparent xl:scale-0 text-black"> Documento: </span> {empresa.numidentificacion}</h1>
              <h1 className=""> <span className="xl:text-[0px] xl:text-transparent xl:scale-0 text-black"> Tel: </span> {empresa.telefono}</h1>
              <h1 className=""> <span className="xl:text-[0px] xl:text-transparent xl:scale-0 text-black"> Obras: </span> {empresa.numobras}</h1>
              <div className="flex gap-5 justify-end xl:justify-center">
                <button onClick={() => {
                  navigate(`/empresas/${empresa.numidentificacion}/obras`)
                }}>
                  <Eye color="#204ADF" />
                </button>
                <button onClick={() => {navigate(`/empresas/actualizarempresa/${empresa.numidentificacion}`)}}>
                  <SquarePen color="#00AF00" />
                </button>

              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="w-full flex justify-center mt-5">
        <PaginationButtons totalPages={lempresas.totalpaginas} setCurrentPage={setCurrentPage} currentPage={currentPage} />
      </div>

    </div>

  )
}