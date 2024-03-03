import React, { useEffect, useState } from "react";
import ReactApexChart from 'react-apexcharts';
import Cookies from "js-cookie";

const ApexChart = () => {
  const [series, setSeries] = useState([]);
  const [nombre, setNombre] = useState('Holaa');
  const token = Cookies.get('session') ? JSON.parse(Cookies.get('session')).token : '';

  useEffect(() => {
    async function getreportfirst() {
      const datatra = await getinitialdata();
      setData(datatra)
    }
    getreportfirst();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/reports/InitialData', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();

        const { valormanodeobra, valoratodocosto, valormensual, valorintereses } = data.infografcomposicionfic.infografxvalores;

        const valuesArray = [valormanodeobra, valoratodocosto, valormensual, valorintereses];

        setSeries(valuesArray);
      } catch (error) {
        console.error('Error al obtener datos de la API:', error);
      }
    };

    fetchData();
  }, [token]);

  const options = {
  chart: {
    type: 'donut',
    width: 400,
    height: 400,
  },
  responsive: [
    {
      breakpoint: 700,
      options: {
        chart: {
          width: '100%',
          height: 'auto',
        },
        legend: {
          position: 'bottom',
          offsetY: 0,
          offsetX: 0,
          layout: 'vertical',
          itemMargin: {
            horizontal: 0, // Restablece el margen horizontal a 0 cuando el ancho de la pantalla es menor que 700px
          },
        },
      },
    },
    {
      breakpoint: 9999,
      options: {
        legend: {
          position: 'right',
          offsetY: 0,
          offsetX: 0,
        },
      },
    },
  ],
  labels: [
    `A mano de obra   ${nombre}`,
    "A todo costo    ${nombre}",
    "Obra mensual",
    "Intereses de mora"
  ],
  legend: {
    offsetY: 10,
    fontSize: '14px',
    fontFamily: 'Arial',
    formatter: function (val) {
      return val;
    },
    markers: {
      fillColors: ['#0000FF'], // Cambia el color de los marcadores a azul
      width: 10,
      height: 10,
    },
    itemMargin: {
      vertical: 10, // Márgenes verticales entre las etiquetas
    },
  },
};


  return (
    <div className="flex flex-col items-center">
      <div className="w-full">
        <ReactApexChart options={options} series={series} type="donut" />
      </div>
      <div id="html-dist" className="w-full lg:w-4/4 flex justify-center px-32"></div>
    </div>
  );
};

export default ApexChart;
