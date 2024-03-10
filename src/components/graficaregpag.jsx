import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { getgraphicpays } from "../requests/getReportsGraphicPays";

const Pagos = ({ value }) => {
  const [apiData, setApiData] = useState({});
  const [TotalAndAdditionalData, setTotalAndAdditionalData] = useState(null); // Cambiado a null

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getgraphicpays(value);

        const modifiedData = value === 0
          ? data.infomensualList?.map(item => ({
            mes: item.mes,
            PagosMen: item.numpagosme,
            PagosPre: item.numpagospr,
            Pagostotales: item.numerospagostotalxmes
          }))
          : data.infoanualList?.map(item => ({
            anio: item.anio,
            PagosMen: item.numpagosmehis,
            PagosPre: item.numpagosprhis,
            Pagostotales: item.numerospagostotalhis
          }));
          
        setTotalAndAdditionalData(modifiedData);
        console.log(modifiedData);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, [value]);

  const categories = TotalAndAdditionalData ? 
    (value === 0 ? TotalAndAdditionalData.map(item => item.mes) : TotalAndAdditionalData.map(item => item.anio))
    : [];

  const series = TotalAndAdditionalData ? [
    {
      name: value === 0 ? "Número Pagos Totales" : "Historicos Número Pagos Totales",
      data: TotalAndAdditionalData.map(item => item.Pagostotales)
    }
  ] : [];

  const options = {
    xaxis: {
      categories: categories || []
    },
    colors: ["#713BDB", "#FFC644"],
    plotOptions: {
      bar: {
        borderRadius: 10,
        width: 11
      }
    },
    responsive: [{
      breakpoint: 466,
      options: {
        chart: {
          width: 320,
          height: 320,
        },
      },
    },
    {
      breakpoint: 1501,
      options: {
        chart: {
          width: getWindowWidth() * 0.75,
          height: 300,
        },
        legend: {
          position: 'bottom',
          offsetY: 2,
        },
      },
    },
    {
      breakpoint: 9999,
      options: {
        chart: {
          width: getWindowWidth() * 0.7,
          height: 600,
        },
      },
    },
    ],
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        if (TotalAndAdditionalData && TotalAndAdditionalData.length > 0 && TotalAndAdditionalData[dataPointIndex]) {
          const dataItem = TotalAndAdditionalData[dataPointIndex];
          const name = value === 0 ? dataItem.mes : dataItem.anio;
          const { PagosMen, PagosPre } = dataItem;
          return `
            <div class="custom-tooltip">
              <div class="tooltip-header">${name}</div>
              <hr class="separator"></hr>
              <div class="tooltip-content">
                <div class="tooltip-item">Pagos mensuales: ${PagosMen}</div>
                <div class="tooltip-item">Pagos presuntivos: ${PagosPre}</div>
              </div>
            </div>
          `;
        }
        return '';
      }
    } 
  };

  function getWindowWidth() {
    return window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
}

  return (
    <div>
      <div className="chart-container">
        {TotalAndAdditionalData && <Chart options={options} series={series} type="bar" height={370} width={1000} />}
      </div>
    </div>
  );
};

export default Pagos;
