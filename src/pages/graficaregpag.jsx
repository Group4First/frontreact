import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { getgraphicpays } from "../requests/getReportsGraphicPays";

const Pagos = ({ value }) => {
  const [apiData, setApiData] = useState({});
  const [mes, setmes] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getgraphicpays(value);;
        setApiData(data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, [value]);

  const categories = value === 0 ? apiData.infomensualList?.map(item => item.mes) : apiData.infoanualList?.map(item => item.anio);

  const totalAndAdditionalData = value === 0
    ? apiData.infomensualList?.map(item => ({
      setmes: item.mes,
      PagosMen: item.numpagosme,
      PagosPre: item.numpagospr,
      Pagostotales: item.numerospagostotalxmes
    }))
    : apiData.infoanualList?.map(item => ({
      anio: item.anio,
      PagosMen: item.numpagosmehis,
      PagosPre: item.numpagosprhis,
      Pagostotales: item.numerospagostotalhis
    }));

    const options = {
      xaxis: {
          categories: categories || []
      },
      colors: ["#000000", "#90e0ef"],
      plotOptions: {
          bar: {
              borderRadius: 10,
              width: 11,
          },
      },
      responsive: [{
              breakpoint: 466,
              options: {
                  chart: {
                      width:300,
                      height: 300,
                  },
              },
          },
          {
              breakpoint: 9999,
              options: {
                  chart: {
                      width: getWindowWidth() * 0.70,
                      height: 600,
                  },
              },
          },
      ],
  };
  
  function getWindowWidth() {
      return window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth;
  }
  


  const series = [
    {
      name: value === 0 ? "Número Pagos Totales" : " Historicos Número Pagos Totales",
      data: totalAndAdditionalData?.map(item => item.Pagostotales),
      dataLabels: totalAndAdditionalData?.map(item => item.mes)
    }
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Chart options={options} series={series} type="bar" height={370} width={1000} />
      </div>

    </div>
  );
};

export default Pagos;
