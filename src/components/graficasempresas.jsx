import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { getinitialdata } from "../requests/getReportsInitialdata";

const Graficasempresa = ({datatra}) => {
  const [series, setSeries] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const data = datatra;
    if (datatra && datatra.infografempresasconaportes) {        
      const empresas = Object.entries(data.infografempresasconaportes);
      const valoresAportados = empresas.map(([, valor]) => valor); 

      const { nombreempresa1, nombreempresa2, nombreempresa3, nombreempresa4, nombreempresa5 } = data.infografempresasconaportes;
      const valuesArray = ["", nombreempresa1, "", nombreempresa2, "", nombreempresa3, "", nombreempresa4, "", nombreempresa5];

      setSeries(valoresAportados.map(valor => Math.round(valor)));
      setCategories(valuesArray);
    }
  }, [datatra]);


  const seriestra = [
    {
      name: "Aporte de empresa: ",
      data: series
    }
  ];

  const options = {
    chart: {
      width: "100%",
      height: 380,
      type: "bar"
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: 40
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 1,
      colors: ["#04E38A"]
    },

    xaxis: {
      categories: categories
    },
    legend: {
      position: "right",
      verticalAlign: "top",
      containerMargin: {
        left: 35,
        right: 60
      }
    },
    responsive: [
      {
        breakpoint: 9999,
        options: {
          chart: {
            width: getWindowWidth() * 0.336,
            height: 500,
          },
          plotOptions: {
            bar: {
              horizontal: true
            }
          },
          legend: {
            position: "bottom"
          }
        }
      },
      {
        breakpoint: 711,
        options: {
          chart: {
            width: 300,
            height: 300,
          },
          plotOptions: {
            bar: {
              horizontal: false
            }
          },
          legend: {
            position: "bottom"
          }
        },
      }, {
        breakpoint: 1400,
        options: {
          chart: {
            width: getWindowWidth() * 0.65,
            height: 300,
          },
          plotOptions: {
            bar: {
              horizontal: false
            }
          },
          legend: {
            position: "bottom"
          }
        },
      },
    ],
    colors: ['#04E38A', '#04E38A'],
  };

  function getWindowWidth() {
    return window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
}
  return (
    <div>
      <div className="chart-container">
        <Chart options={options} series={seriestra} type="bar" height={370} width={1000} />
      </div>
    </div>
  );
};

export default Graficasempresa;
