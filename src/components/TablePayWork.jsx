import { PaginationButtons } from "./paginationButtons";


export function TablePayWork({ type, pagos, setCurrentPage, totalPages }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value);
  };

  return (
    <>
      

      {type == 'Mensual' ? (
        <>

          <section className="flex flex-col items-center relative overflow-x-auto mt-10">
            <div className="max-xl:scale-0 h-14 w-11/12 bg-white rounded-xl mb-3 grid items-center px-3 grid-cols-[0.3fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr]">
              <h1 className="text-vgraylight font-medium">Año</h1>
              <h1 className="text-vgraylight font-medium text-center">Mes</h1>
              <h1 className="text-vgraylight font-medium text-center" >Fecha de <br /> pago</h1>
              <h1 className="text-vgraylight font-medium text-center">Número  <br />Trabajadores</h1>
              <h1 className="text-vgraylight font-medium text-center">Tipo  <br />pago</h1>
              <h1 className="text-vgraylight font-medium text-center">FIC</h1>
              <h1 className="text-vgraylight font-medium text-center">Intereses</h1>
              <h1 className="text-vgraylight font-medium text-center">Total</h1>
            </div>
            {pagos.map((pago, index) => {
              const colorInterest = pago.valorintereses === 0 ? '#848484' : '#FF0000';

              return (
                <div key={index} className={`text-vgraydark font-semibold bg-white rounded-xl items-center px-3 mt-5 max-xl:max-w-[280px] max-xl:w-[280px] max-xl:p-5 max-xl:rounded-2xl max-xl:mx-4 xl:grid xl:text-center xl:grid-cols-[0.3fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] xl:h-14 xl:w-11/12`}>
                  <h1 className="text-left"> <span className="xl:text-[0px] xl:text-transparent xl:scale-0 text-black"> Año: </span> {pago.anio}</h1>
                  <h1 className=""> <span className="xl:text-[0px] xl:text-transparent xl:scale-0 text-black"> Mes: </span> {pago.mes}</h1>
                  <h1 className=""> <span className="xl:text-[0px] xl:text-transparent xl:scale-0 text-black"> Fecha de pago: </span>  {pago.fechapago}</h1>
                  <h1 className=""> <span className="xl:text-[0px] xl:text-transparent xl:scale-0 text-black"> Número Trabajadores: </span> {pago.numtrabajadores}</h1>
                  <h1 className=""> <span className="xl:text-[0px] xl:text-transparent xl:scale-0 text-black"> Tipo pago: </span> {pago.tipopago}</h1>
                  <h1 className=""> <span className="xl:text-[0px] xl:text-transparent xl:scale-0 text-black"> FIC: </span> {formatCurrency(pago.valorfic)}</h1>
                  <h1 className="" style={{ color: colorInterest }}> <span className="xl:text-[0px] xl:text-transparent xl:scale-0 text-black"> Intereses: </span>{formatCurrency(pago.valorintereses)}</h1>
                  <h1 className="text-vgreen"> <span className="xl:text-[0px] xl:text-transparent xl:scale-0 text-black"> Total: </span>{formatCurrency(pago.valortotal)}</h1>

                </div>
              )
            })}

          </section>

          <div className="w-full flex justify-center mt-5">
            <PaginationButtons totalPages={totalPages} setCurrentPage={setCurrentPage} />
          </div>

        </>
      ) : (

        <>
          <section className="flex flex-col items-center relative overflow-x-auto mt-10">
            <div className="max-xl:scale-0 h-14 w-11/12 bg-white rounded-xl mb-3 grid items-center px-3 grid-cols-[1fr_1fr_1fr]">

              <h1 className="text-vgraylight font-medium text-center" >Fecha de <br /> pago</h1>
              <h1 className="text-vgraylight font-medium text-center">Tipo  <br />pago</h1>
              <h1 className="text-vgraylight font-medium text-center">Total</h1>
            </div>
            {pagos.map((pago, index) => {
              return (
                <div key={index} className={`text-vgraydark font-semibold bg-white rounded-xl items-center px-3 mt-5 max-xl:max-w-[280px] max-xl:w-[280px] max-xl:p-5 max-xl:rounded-2xl max-xl:mx-4 xl:grid xl:text-center xl:grid-cols-[1fr_1fr_1fr] xl:h-14 xl:w-11/12`}>
                  <h1 className=""> <span className="xl:text-[0px] xl:text-transparent xl:scale-0 text-black"> Fecha de pago: </span>  {pago.fechapago}</h1>
                  <h1 className=""> <span className="xl:text-[0px] xl:text-transparent xl:scale-0 text-black"> Tipo pago: </span> {pago.tipopago}</h1>
                  <h1 className="text-vgreen"> <span className="xl:text-[0px] xl:text-transparent xl:scale-0 text-black"> Total: </span>{formatCurrency(pago.valorfic)}</h1>

                </div>
              )
            })}
          </section>
        </>
      )
      }
    </>
  )
}