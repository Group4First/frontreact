import { useState, useEffect } from 'react';
import { getinitialdata } from "../requests/getReportsInitialdata";
import Graficas from '../components/graficas';
import ApexChart from '../components/grafDona';
import Pagos from '../components/graficaregpag';
import Graficasempresa from '../components/graficasempresas';
import { Cards as CardsComponent } from "./Cards"; // Cambiando el nombre del componente importado


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

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value);
  };

  return (
    <section class=" w-full max-h-svh overflow-auto">
      <div className="flex flex-row flex-wrap items-start content-start p-0 gap-5  mb-10">


        <div className="w-full flex flex-wrap justify-center items-center">
          <h1 className="text-3xl lg:text-xl mt-6 ml-6 w-full">Vista general</h1>
          <div>

            <div className="flex flex-wrap justify-center items-center mt-5 space-x-5 sm:space-x-10">
              <div>
                <CardsComponent title={"Total de empresas"} valor={data.totalempresas} className={"bg-white px-3 mt-5"} />
              </div>
              <div>
                <CardsComponent title={"Total de obras"} valor={data.totalkobras} className={"bg-white px-3 mt-5"} />
              </div>
              <div>
                <CardsComponent title={"Total de empresas con obras activas"} valor={data.empresasconobrasactivas} className={"bg-white px-3 mt-5"} />
              </div>
            </div>

            <div className="flex flex-wrap justify-center items-center mt-5 space-x-5 sm:space-x-10">
              <div>
                <CardsComponent title={"Recaudo fic"} valor={formatCurrency(data.sumavalorfictotalhis)} className={"bg-white px-3 mt-5"} />
              </div>
              <div>
                <CardsComponent title={"Recaudo por intereses"} valor={formatCurrency(data.sumavalorficintereses)} className={"bg-white px-3 mt-5"} />
              </div>
            </div>


          </div>
        </div>




        {/* Gráfica principal línea */}
        <div className="w-full flex flex-wrap justify-center items-center ">
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
            <div className=" bg-white rounded-lg bg-red  min-w-min p-5 max-h-full md:w-1/2 md:mr-2 mt-5 mb-5">
              <Graficasempresa />
            </div>
            <div className="rounded-lg bg-white p-5 max-h-full md:w-1/2 justify-center min-w-min mt-5 mb-5"> {/* Agrega las clases justify-center y w-full aquí */}
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