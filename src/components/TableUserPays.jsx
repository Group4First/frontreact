import { useEffect, useState } from "react";
import { getReportsUserPays } from "../requests/getReportsUserPays";
import { PaginationButtons } from "./paginationButtons";

export function TableUserPays() {
    const [currentPage, setCurrentPage] = useState(0);
    const [pagos, setPagos] = useState([]);
    const [lpagos, setLPagos] = useState([]);
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const pagosData = await getReportsUserPays(currentPage,7);
                setPagos(pagosData.reportinfo);
                setLPagos(pagosData);
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
    }, [currentPage]);
    return (
        <section className=" w-full flex justify-center ">
            <div className="flex flex-col items-center relative overflow-x-auto mt-10 w-10/12 bg-white px-10 pt-5 rounded-lg">
            <h1 className="text-xl md:text-2xl font-bold p-4 text-center mb-10">Pagos de usuarios</h1>

                <div className="max-xl:scale-0 h-14 w-11/12 bg-[#F1F2F3]  rounded-xl mb-3 grid items-center px-3 grid-cols-[1fr_1fr_1fr_1fr]">

                    <h1 className="text-green-900 font-medium text-center" >Usuario</h1>
                    <h1 className="text-green-900 font-medium text-center" >Pagos</h1>
                    <h1 className="text-green-900 font-medium text-center" >Empresas</h1>
                    <h1 className="text-green-900 font-medium text-center">Total recaudo</h1>
                </div>
                {pagos.map((pago, index) => {
                    return (
                        <div key={index} className={`text-green-800 font-semibold bg-[#F1F2F3] rounded-xl items-center px-3 mt-5 max-xl:max-w-[280px] max-xl:w-[280px] max-xl:p-5 max-xl:rounded-2xl max-xl:mx-4 xl:grid xl:text-center xl:grid-cols-[1fr_1fr_1fr_1fr] xl:h-14 xl:w-11/12`}>
                            <h1 className=""> <span className="xl:text-[0px] xl:text-transparent xl:scale-0 text-green-950"> Usuario: </span>  {pago.usuario}</h1>
                            <h1 className=""> <span className="xl:text-[0px] xl:text-transparent xl:scale-0 text-green-950"> Pagos</span>  {pago.pagos}</h1>
                            <h1 className=""> <span className="xl:text-[0px] xl:text-transparent xl:scale-0 text-green-950"> Empresas </span>  {pago.empresas}</h1>
                            <h1 className="text-vgreen"> <span className="xl:text-[0px] xl:text-transparent xl:scale-0 text-green-950"> Total recaudo: </span>{formatCurrency(pago.valortotal)}</h1>

                        </div>
                    )
                })}
                <div className="w-full flex justify-center mt-5">
                    <PaginationButtons totalPages={lpagos.totalpaginas} setCurrentPage={setCurrentPage} currentPage={currentPage} />
                </div>

            </div>
        </section>
    )
}