import React, { useEffect, useState } from "react";
import ReactApexChart from 'react-apexcharts';
import { getinitialdata } from "../requests/getReportsInitialdata";

const ApexChart = ({ value }) => {
  const [series, setSeries] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    async function getreportfirst() {
      const datatra = await getinitialdata();

      if (value == 0) {
        const { conteonummanodeobra, conteonumatodocosto, conteonummensual } = datatra.infografcomposicionfic.infografxnumero;
        const valuesArray = [conteonummanodeobra, conteonumatodocosto, conteonummensual];
        setSeries(valuesArray);
        setLabels([
          "Conteo obras: A mano de obra",
          "Conteo obras: A todo costo",
          "Conteo obras: Obra mensual"
        ]);
      } else {
        const { valormanodeobra, valoratodocosto, valormensual, valorintereses } = datatra.infografcomposicionfic.infografxvalores;
        const valuesArray = [valormanodeobra, valoratodocosto, valormensual, valorintereses];
        setSeries(valuesArray);
        setLabels([
          "Recaudo A mano de obra",
          "Recaudo A todo costo",
          "Recaudo Obra mensual",
          "Recaudo Intereses de mora"
        ]);
      }
    }
    getreportfirst();
  }, [value]);

  const options = {
    chart: {
      type: 'donut',
    },
    responsive: [{
      breakpoint: 711,
      options: {
        chart: {
          width: 300,
          height: 300,
        },
        legend: {
          position: 'bottom',
          offsetY: 2,
        },
      },
    }, {
      breakpoint: 1501,
      options: {
        chart: {
          width: getWindowWidth() * 0.65,
          height: 300,
        },
        legend: {
          position: 'bottom',
          offsetY: 2,
        },
      },
    },
    {
      breakpoint: 1700,
      options: {
        chart: {
          width: getWindowWidth() * 0.35,
          height: 500,
        },
        legend: {
          position: 'bottom',
          horizontalAlign: 'center',
          offsetY: 0,
          offsetX: -20,
        },
      },
    },
    {
      breakpoint: 9999,
      options: {
        chart: {
          width: getWindowWidth() * 0.336,
          height: 500,
        },
        legend: {
          position: 'right',
          offsetY: 70,
        },
      },
    }],
    labels: labels,
  };


  function getWindowWidth() {
    return window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
  }

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
