import { useState, useEffect } from 'react';
import { Cards } from "./Cards";
import { getinitialdata } from "../requests/getReportsInitialdata";
import Cookies from "js-cookie";
import Graficas from './graficas';
import ApexChart from './grafDona';
import Pagos from './graficaregpag';
import Graficasempresa from './graficasempresas'

export function Dasboard() {
  const [data, setData] = useState({});


  useEffect(() => {
    async function getreportfirst() {
      const datatra = await getinitialdata();
      setData(datatra)
    }
    getreportfirst();
  }, []);

  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOption3, setSelectedOption3] = useState(0);
  const [selectedOption2, setSelectedOption2] = useState(0);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleOptionChange2 = (event) => {
    setSelectedOption2(event.target.value);
  };

  const handleOptionChange3 = (event) => {
    setSelectedOption3(event.target.value);
  };


  return (
    <section class="bg-white w-full max-h-svh  overflow-auto justify-center">
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
        <div className="w-full flex flex-wrap justify-center items-center">
          <div className="rounded-lg bg-white mt-2 min-w-min p-5">
            <Graficas value={selectedOption2 === "porMes" ? 0 : selectedOption2 === "porAño" ? 1 : 0} />
            <div className="flex justify-center mt-4 space-x-4">
              <label htmlFor="porMes" className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  id="porMes"
                  name="composicion3"
                  value="porMes"
                  className="form-radio h-5 w-5 text-indigo-600"
                  onChange={handleOptionChange2}
                  defaultChecked={true}
                />
                <span className="ml-2">Por Mes</span>
              </label>
              <label htmlFor="porAño" className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  id="porAño"
                  name="composicion3"
                  value="porAño"
                  className="form-radio h-5 w-5 text-indigo-600"
                  onChange={handleOptionChange2}
                />
                <span className="ml-2">Por Año</span>
              </label>
            </div>
          </div>

        </div>

        {/* Contenedor para las gráficas de donas */}
        <div className="w-full flex flex-wrap mt-3 centered">
          <div className="max-w-screen-xl mx-auto flex flex-wrapauto justify-center">
            <div className="rounded-lg bg-red mt-2 min-w-min p-5 max-h-full md:w-1/2 md:mr-2">
              <Graficasempresa />
            </div>
            <div className="rounded-lg bg-white p-5 max-h-full md:w-1/2 md:ml-2 justify-center min-w-min"> {/* Agrega las clases justify-center y w-full aquí */}
              <h1 className="text-xl md:text-2xl font-bold p-4 text-center">Composición de pagos FIC</h1>
              <div className="flex justify-center">
                <ApexChart value={selectedOption === "porAportes" ? 0 : selectedOption === "porCantidad" ? 1 : 1} />
              </div>
              <div className="flex justify-center mt-4 space-x-4">
                <label htmlFor="porCantidad" className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    id="porCantidad"
                    name="composicion"
                    value="porCantidad"
                    className="form-radio h-5 w-5 text-indigo-600"
                    onChange={handleOptionChange}
                    defaultChecked={true}
                  />
                  <span className="ml-2">Por Aportes</span>
                </label>
                <label htmlFor="porAportes" className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    id="porAportes"
                    name="composicion"
                    value="porAportes"
                    className="form-radio h-5 w-5 text-indigo-600"
                    onChange={handleOptionChange}
                  />
                  <span className="ml-2">Por Cantidad</span>
                </label>
              </div>
            </div>
          </div>
        </div>






        <div className="w-full flex flex-wrap justify-center items-center">
          <div className="rounded-lg bg-white mt-2 min-w-min p-5">
            <Pagos value={selectedOption3 === "porMesesUG" ? 0 : selectedOption3 === "porAñosUG" ? 1 : 0} />
            <div className="flex justify-center mt-4 space-x-4">
              <label htmlFor="porMesesUG" className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  id="porMesesUG"
                  name="composicion2"
                  value="porMesesUG"
                  className="form-radio h-5 w-5 text-indigo-600"
                  onChange={handleOptionChange3}
                  defaultChecked={true}
                />
                <span className="ml-2">Por Meses</span>
              </label>
              <label htmlFor="porAñosUG" className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  id="porAñosUG"
                  name="composicion2"
                  value="porAñosUG"
                  className="form-radio h-5 w-5 text-indigo-600"
                  onChange={handleOptionChange3}
                />
                <span className="ml-2">Por Años</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}