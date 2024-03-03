import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import Cookies from "js-cookie";

const Pagos = () => {
  const [filter, setFilter] = useState("Por meses");
  const [apiData, setApiData] = useState({});
  const token = Cookies.get('session') ? JSON.parse(Cookies.get('session')).token : '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/reports/GraphicPays?optional=${filter === "Por meses" ? 0 : 1}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await response.json();
        setApiData(data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, [filter, token]);

  const categories = filter === "Por meses" ? apiData.infomensualList?.map(item => item.mes) : apiData.infoanualList?.map(item => item.anio);

  const totalAndAdditionalData = filter === "Por meses"
    ? apiData.infomensualList?.map(item => ({
      mes: item.mes,
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
        with: 11,
      },
    },
  };

  const series = [
    {
      name: filter === "Por meses" ? "Número Pagos Totales"  : " Historicos Número Pagos Totales",
      data: totalAndAdditionalData?.map(item => item.PagosPre) 
    }
  ];

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Chart options={options} series={series} type="bar" height={370} width={1000} />
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "1px" }}>
        <button
          style={{ marginRight: "10px", padding: "10px", backgroundColor: filter === "Por meses" ? "#E3F5FF" : "#ecf0f1", color: "#000000", border: "none", cursor: "pointer" }}
          onClick={() => handleFilterChange("Por meses")}
        >
          Por Meses
        </button>
        <button
          style={{ padding: "10px", backgroundColor: filter === "Por año" ? "#E5ECF6" : "#ecf0f1", color: "#000000", border: "none", cursor: "pointer" }}
          onClick={() => handleFilterChange("Por año")}
        >
          Por Año
        </button>
      </div>
    </div>
  );
};

export default Pagos;
