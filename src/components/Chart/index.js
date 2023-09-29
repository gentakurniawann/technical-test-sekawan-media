import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function TicketChart({ data }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data && data.length > 0) {
      // Extract the year and month from the createdAt date
      const chartData = data.reduce((acc, ticket) => {
        const yearMonth = ticket.createdAt.slice(0, 7); // YYYY-MM format
        if (acc[yearMonth]) {
          acc[yearMonth]++;
        } else {
          acc[yearMonth] = 1;
        }
        return acc;
      }, {});

      const labels = Object.keys(chartData);
      const values = Object.values(chartData);

      // Create the chart
      const ctx = chartRef.current.getContext("2d");

      new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Tickets per Month",
              data: values,
              borderColor: "#3751ff",
              borderWidth: 1,
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [data]);

  return <canvas ref={chartRef}/>;
}
