import Chart from "react-apexcharts";

const TaskChart = () => {
  const chartConfig = {
    type: "line",
    height: 300,
    series: [
      {
        name: "Završeni zadaci",
        data: [1, 2, 3, 2, 4, 3, 5], // Ovdje stavi broj uradjenih zadataka za 7 dana
      },
    ],
    options: {
      colors: ["#9333ea"],
      chart: {
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      title: {
        text: "Završeni zadaci na nedeljnom niovu",
        align: "center",
      },
      xaxis: {
        categories: [
          "Ponedeljak",
          "Utorak",
          "Sreda",
          "Četvrtak",
          "Petak",
          "Subota",
          "Nedelja",
        ], // Dan 1 - Dan 7
        title: {
          text: "Dani u nedelji",
        },
      },
      yaxis: {
        title: {
          text: "Zadaci",
        },
        min: 0, // Minimum value na Y osi
      },
      stroke: {
        curve: "smooth",
      },
      markers: {
        size: 5,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };

  return (
    <div className="p-4 rounded-lg ">
      <Chart {...chartConfig} />
    </div>
  );
};

export default TaskChart;
