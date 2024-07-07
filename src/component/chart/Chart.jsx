import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
function ChartComponents() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      chartInstance.current = new Chart(ctx, {
        type: "line",
        width: 1,
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
          datasets: [
            {
              label: "Doanh thu",
              data: [0, 30, 120, 300, 400, 120, 500, 300],
              borderColor: "rgb(0,0,0)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              title: {
                display: true,
                text: "Doanh thu",
              },
              type: "linear",
              position: "left",
              beginAtZero: true,
            },
            x: {
              title: {
                display: true,
                text: "Total Users",
              },
            },
          },
        },
      });
    }
  }, []);
  return (
    <div className="w-lvw h-[583.2px] flex justify-center items-center my-8">
      <canvas
        style={{
          width: "100%",
        }}
        ref={chartRef}
      ></canvas>
    </div>
  );
}

export default ChartComponents;
