import { getAllChildStatistics } from "@/api/services/parentService";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useDispatch } from "react-redux";

const TaskChart = () => {
  const dispatch = useDispatch();
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await getAllChildStatistics()(dispatch);

        const names = response.map((entry) => entry.child.username);
        const sectionsCompleted = response.map(
          (entry) => entry.sections.length
        );

        setLabels(names);
        setData(sectionsCompleted);
      } catch (error) {
        console.error("Greška pri učitavanju statistike:", error);
      }
    };

    fetchStatistics();
  }, [dispatch]);

  const chartConfig = {
    type: "bar",
    height: 400,
    series: [
      {
        name: "Završene sekcije",
        data: data,
      },
    ],
    options: {
      chart: {
        id: "children-statistics",
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          columnWidth: "40%",
        },
      },
      title: {
        text: "Završene sekcije po nalogu deteta",
        align: "center",
      },
      xaxis: {
        categories: labels,
        title: {
          text: "Deca",
        },
      },
      yaxis: {
        title: {
          text: "Broj završenih sekcija",
        },
        min: 0,
        forceNiceScale: true,
      },
      colors: ["#9333ea"],
      dataLabels: {
        enabled: true,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };

  return (
    <div className="p-4 rounded-lg shadow-md">
      <Chart {...chartConfig} />
    </div>
  );
};

export default TaskChart;
