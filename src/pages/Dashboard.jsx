import { useState, useEffect } from 'react';
import { getinitialdata } from "../requests/getReportsInitialdata";
import Graficas from '../components/graficas';
import ApexChart from '../components/grafDona';
import Pagos from '../components/graficaregpag';
import Graficasempresa from '../components/graficasempresas';
import { Cards as CardsComponent } from "../components/Cards"; // Cambiando el nombre del componente importado
import Cookies from 'js-cookie';
import { TableUserPays } from '../components/TableUserPays';

import { Printer } from "lucide-react";
import { PdfDashboard } from "../components/PdfDashboard";
import { PDFDownloadLink } from "@react-pdf/renderer";


export function Dasboard() {
  const [data, setData] = useState({});
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    async function getreportfirst() {
      try {
        const datatra = await getinitialdata();
        setData(datatra)
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
    <section className="w-full max-h-svh overflow-auto">
      <div className="flex flex-row flex-wrap items-start content-start p-0 gap-5  mb-10">

        <div className="w-full flex flex-wrap justify-center items-center">
          <h1 className="text-3xl lg:text-xl mt-6 ml-6 w-full">Vista general</h1>
          <div>

            <div className="flex max-xl:flex-wrap justify-center items-center mt-5 gap-5 px-5">
              <div className='w-full'>
                <CardsComponent title={"Total de empresas"} valor={data.totalempresas} className={"bg-white px-3 mt-5"} />
              </div>
              <div className='w-full'>
                <CardsComponent title={"Total de obras"} valor={data.totalkobras} className={"bg-white px-3 mt-5"} />
              </div>
              <div className='w-full'>
                <CardsComponent title={"Empresas con obras activas"} valor={data.empresasconobrasactivas} className={"bg-white px-3 mt-5"} />
              </div>
            </div>

            <div className="flex max-xl:flex-wrap gap-5 justify-between items-center mt-5 w-full px-5">
              <div className='w-full'>
                <CardsComponent title={"Recaudo fic"} valor={formatCurrency(data.sumavalorfictotalhis)} className={"bg-white px-3 mt-5"} />
              </div>
              <div className='w-full'>
                <CardsComponent title={"Recaudo por intereses"} valor={formatCurrency(data.sumavalorficintereses)} className={"bg-white px-3 mt-5"} />
              </div>
            </div>


          </div>
        </div>

        {/* Gráfica principal línea */}
        <div className="w-full flex flex-wrap justify-center items-center ">
          <div className="rounded-lg bg-white mt-2 min-w-min p-5">
            <h1 className="text-xl md:text-2xl font-bold p-4 text-center">Dinero recaudado por el FIC</h1>
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
        <div className="w-full flex flex-wrap justify-center items-center">
          <div className="max-w-screen-xl mx-auto flex flex-wrapauto justify-center">
            <div className="rounded-lg bg-white p-5  min-w-min justify-center  mt-5 mb-5 mr-2 ml-2">
              <h1 className="text-xl md:text-2xl font-bold p-4 text-center">Empresas que más han aportado al FIC</h1>
              <div className="flex justify-center mt-5">
                <Graficasempresa />
              </div>
            </div>
            <div className="rounded-lg bg-white p-5 max-h-full md:w-1/2 justify-center min-w-min mt-5 mb-5 mr-2 ml-2">
              <h1 className="text-xl md:text-2xl font-bold p-4 text-center">Composición de pagos FIC</h1>
              <div className="flex justify-center mt-8">
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
            <h1 className="text-xl md:text-2xl font-bold p-4 text-center">Numero de pagos registrados</h1>
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
        <TableUserPays />
      </div>
      <div className="fixed bottom-5 right-5">
        {showButton && (
          <PDFDownloadLink document={<PdfDashboard />} fileName="InformaciónDashboard.pdf">
            {({ blob, url, loading, error }) =>
              <button className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-full  flex flex-col justify-center items-center">
                <Printer size={20} />
                PDF
              </button>
            }
          </PDFDownloadLink>
        )}
      </div>
    </section>
  );
}