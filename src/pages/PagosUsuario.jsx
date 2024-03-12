import { ChevronLeft, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPagosUsuario } from "../requests/getPagosUsuario";
import { PaginationButtons } from "../components/paginationButtons";
import { useGlobalContext } from "../context/context";

export function PagosUsuario() {
  const { id } = useParams();
  const [pagos, setPagos] = useState([]);
  const [lpagos, setLPagos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {activeAlert} = useGlobalContext()

  useEffect(() => {
    async function fetchData() {
      try {
        const pagosData = await getPagosUsuario(id, currentPage, searchTerm);
        setPagos(pagosData.listapagos);
        setLPagos(pagosData);
        setError(null);
      } catch (error) {
        setPagos([])
        setError(error.message)
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

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value);
  };

  return (
    <div className="w-full max-w-fu h-svh overflow-y-auto">
      <button className="flex items-center text-vgreen font-semibold px-16 mt-5 text-xl gap-4" onClick={() => { navigate(`/usuarios`); }}>
        <ChevronLeft size={30} />Lista de pagos
      </button>
      {error ? (
        <h1 className="text-red-500 font-semibold px-16 mt-4 text-3xl text-center ">{error}</h1>
      ) : (
        <>
          <h1 className="text-black font-medium px-16 mt-6 text-xl">{lpagos.nombresUsuario}</h1>

          <section className="flex justify-center">
            <div className="w-11/12 flex items-center justify-between mt-10">
              <div className="h-12 w-60 rounded-xl border-2 bg-[#E6E5E5] flex items-center text-vgray2 justify-center">
                <Search size={20} color="#7D7D7D" />
                <input
                  onChange={(event) => { setSearchTerm(event.target.value); }}
                  type="text"
                  placeholder="Buscar"
                  className="bg-[#E6E5E5] placeholder:font-medium placeholder:text-[#7D7D7D] outline-none text-black font-semibold ml-3 w-44"
                />
              </div>
            </div>
          </section>

          <section className="flex flex-col items-center relative overflow-x-auto">
            <div className="max-xl:scale-0 h-14 w-11/12 bg-white rounded-xl mb-3 grid items-center px-3 mt-6 " style={{ gridTemplateColumns: '1.5fr 1.5fr 1fr 1fr' }}>
              <h1 className="text-vgraylight font-medium">Empresa</h1>
              <h1 className="text-vgraylight font-medium text-center">Obra</h1>
              <h1 className="text-vgraylight font-medium text-center" >Fecha de pago</h1>
              <h1 className="text-vgraylight font-medium text-center">Total</h1>
            </div>

            {pagos.map((pago, index) => (
              <div key={index} className={`text-vgraydark font-semibold bg-white rounded-xl items-center px-3 mt-5 max-xl:max-w-[280px] max-xl:w-[280px] max-xl:p-5 max-xl:rounded-2xl max-xl:mx-4 xl:grid xl:text-center xl:grid-cols-[1.5fr_1.5fr_1fr_1fr] xl:h-14 xl:w-11/12`}>
                <h1 className="text-left"> <span className="xl:text-[0px] xl:text-transparent xl:scale-0 text-black"> Empresa: </span> {pago.nombreEmpresa}</h1>
                <h1 className=""> <span className="xl:text-[0px] xl:text-transparent xl:scale-0 text-black"> Fecha de pago: </span> {pago.nombreObra}</h1>
                <h1 className=""> <span className="xl:text-[0px] xl:text-transparent xl:scale-0 text-black"> Total: </span> {pago.fechapago}</h1>
                <h1 className="text-vgreen"> <span className="xl:text-[0px] xl:text-transparent xl:scale-0 text-black"> Obra: </span> {formatCurrency(pago.valorTotal)}</h1>

              </div>
            ))}
          </section>

          <div className="w-full flex justify-center mt-5">
            <PaginationButtons totalPages={lpagos.totalpaginas} setCurrentPage={setCurrentPage} currentPage={currentPage} />
          </div>
        </>
      )}
    </div>
  );
}
