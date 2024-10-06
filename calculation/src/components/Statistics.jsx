import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { useDispatch, useSelector } from "react-redux";
import { getStatistics } from "../features/usersSlice";

export default function Statistics() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.users.user);
  const stats = useSelector((state) => state.users.statistics);

  let dates = stats?.map((stat) => stat.date) || [];
  let salaries = stats?.map((stat) => stat.money) || [];

  useEffect(() => {
    if (user?.id) {
      dispatch(getStatistics({ id: user.id }));
    }

    dates = stats?.map((stat) => stat.date) || [];
    salaries = stats?.map((stat) => stat.money) || [];
  }, [dispatch, user]);

  const [chartWidth, setChartWidth] = useState(500); // Initial chart width
  const minWidth = 400; // Minimum chart width
  const maxWidth = 1100; // Maximum chart width

  const handleClick = (event) => {
    const lineRect = event.currentTarget.getBoundingClientRect();
    const clickPosition = event.clientX - lineRect.left; // Get click position relative to the line
    const newWidth =
      minWidth + (clickPosition / lineRect.width) * (maxWidth - minWidth); // Scale the width based on click position
    setChartWidth(Math.max(minWidth, Math.min(maxWidth, newWidth))); // Ensure the width stays within the min/max bounds
  };

  const circlePosition =
    ((chartWidth - minWidth) / (maxWidth - minWidth)) * 100;

  return (
    <div className="chart-container">
      {/* BarChart */}
      <BarChart
        xAxis={[{ scaleType: "band", data: dates }]} // Use extracted dates as labels
        series={[
          {
            data: salaries,
          },
        ]}
        width={chartWidth}
        height={300}
        barLabel={(item) => `${item.value}`}
      />

      {/* Resizer - horizontal line with circle and min/max labels */}
      <div className="resizer-container">
        <div className="label-container">
          <span className="resizer-min-label">{minWidth}</span>
          <span className="resizer-max-label">{maxWidth}</span>
        </div>
        <div className="resizer-line" onClick={handleClick}>
          <div
            className="resizer-circle"
            style={{ left: `${circlePosition}%` }}
          />
        </div>
      </div>
    </div>
  );
}
