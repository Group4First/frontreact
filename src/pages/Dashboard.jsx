import { useState, useEffect } from 'react';
import { Cards } from "./Cards";
import { getinitialdata } from "../requests/getReportsInitialdata";
import Cookies from "js-cookie";
import Graficas from './graficas';
import ApexChart from './grafDona';
import Pagos from './graficaregpag';


export function Dasboard() {
  const [data, setData] = useState({});


  useEffect(() => {
    async function getreportfirst() {
      const datatra = await getinitialdata();
      setData(datatra)
    }
    getreportfirst();
  }, []);

  return (
    <section class="w-full max-h-svh  overflow-auto">
      <div className="flex flex-row flex-wrap items-start content-start p-0 gap-28 w-850 left-16">
        <h1 className="text-3xl mb-5 left-16 lg:text-xl mt-6 relative">Vista general</h1>

        {/* Cards superiores */}
        <div className="container mx-auto px-10 grid space-x-4 gap-8">
          <div className="container mx-auto px-4 grid grid-cols-3 gap-4">
            <Cards title="Empresas" valor={data.totalempresas} className="bg-[#E3F5FF]" />
            <Cards title="Obras" valor={data.totalkobras} className="bg-[#E5ECF6]" />
            <Cards title="Empresas con obras activas" valor={data.empresasconobrasactivas} className="bg-[#E3F5FF]" />
          </div>
        </div>

        {/* Cards inferiores */}
        <div className="container mx-auto px-10 grid space-x-4 gap-8">
          <div className="container mx-auto px-4 grid grid-cols-3  -mt-16 gap-4">
            <Cards title="Total recaudo FIC" valor={data.sumavalorfictotalhis} className="bg-[#E5ECF6]" />
            <Cards title="Total recaudo Mora" valor={data.sumavalorficintereses} className="bg-[#E5ECF6]" />
          </div>
        </div>


        {/* Gráfica principal línea */}
        <div className="container mx-auto px-10 grid space-x-4 justify-center w-3/4 gap-8">
          <div className="container rounded-lg  overflow-y-auto bg-white -mt-20 h-max gap-6">
            <Graficas />
          </div>
        </div>

        {/* Contenedor para las gráficas de donas */}
        <div className="container mx-auto px-4 md:px-0 max-w-screen-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div className="rounded-lg bg-white mt-2">
              <h1 className="text-xl md:text-2xl font-bold p-4">Empresas que más han aportado</h1>
            </div>
            <div className="rounded-lg bg-white mt-2">
              <h1 className="text-xl md:text-2xl font-bold p-4">Composición de pagos FIC</h1>
              <ApexChart />
            </div>
          </div>
        </div>

        <div className="container mx-auto px-10 grid space-x-4 -mt-1 justify-center w-full gap-8">
          <div className="container rounded-lg  overflow-y-auto bg-white -mt-20 h-max gap-6">
            <Pagos />
          </div>
        </div>

      </div>
    </section>
  );
}