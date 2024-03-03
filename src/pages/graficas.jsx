import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import Cookies from "js-cookie";


const Graficas = () => {
  const [filter, setFilter] = useState("Por meses");
  const [apiData, setApiData] = useState({});
  const token = Cookies.get('session') ? JSON.parse(Cookies.get('session')).token : '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/reports/GraphicMoney?optional=${filter === "Por meses" ? 0 : 1}`, {
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

  const categories = filter === "Por meses" ? apiData.infomensualList?.map(item => item.mes) : apiData.infoanualList?.map(item => item.anio) ; //carga los meses y los años

  //datos que muestran en la grafica
  const totalAndAdditionalData = filter === "Por meses"
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
    xaxis: {
      categories: categories || [] 
    },
    colors: ["#000000", "#ced4da"]
  };

  //informacion que se muestra pasar el cursor por la grafica
  const series = [
    {
      name: filter === "Por meses" ? "Número Pagos Presuntivos"  : "Número Pagos Presuntivos",
      data: totalAndAdditionalData?.map(item => item.valorpagospr) || [] 
    },
    {
      name: filter === "Por meses" ? "Número Pagos Mensuales"  : "Número Pagos Mensuales",
      data: totalAndAdditionalData?.map(item => item.valorpagosme) || [] 
    }
  ];

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  // botones para los filtros de entre meses y año
  return (
    <div>
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Chart options={options} series={series} type="area" m width={1000} />
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

export default Graficas;
