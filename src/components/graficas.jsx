import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { getgraphicmoney } from "../requests/getReportsGraphicMoney";

const Graficas = ({ value }) => {
  const [apiData, setApiData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getgraphicmoney(value);
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
      mes: item.mes,
      valorpagosme: item.valorpagosme,
      valorpagospr: item.valorpagospr,
      valortotalpagos: item.valortotalpagos
    }))
    : apiData.infoanualList?.map(item => ({
      anio: item.anio,
      valorpagosme: item.valorpagosme,
      valorpagospr: item.valorpagospr,
      valortotalpagosanual: item.valortotalpagosanual
    }));


  const options = {
    chart: {
      height: 350,
      type: 'area'
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'area',
      categories: categories || []
    },
    toolbar: {
      show: 'none'
    },
    responsive: [{
      breakpoint: 466,
      options: {
        chart: {
          width: 300,
          height: 300,
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
    colors: ['#713BDB', '#04E38A'],
  };


  function getWindowWidth() {
    return window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
  }
  const series = [
    {
      name: value === 0 ? "Recaudo Pagos Presuntivos" : "Recaudo Pagos Presuntivos",
      data: totalAndAdditionalData?.map(item => Math.floor(item.valorpagospr)) || []
    },
    {
      name: value === 0 ? "Recaudo Pagos Mensuales" : "Recaudo Pagos Mensuales",
      data: totalAndAdditionalData?.map(item => Math.floor(item.valorpagosme)) || []
    }
  ];
  

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Chart options={options} series={series} type="area" width={1000} />
      </div>
    </div>
  );
};

export default Graficas;
