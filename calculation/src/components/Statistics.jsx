import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { useDispatch, useSelector } from "react-redux";
import { getStatistics } from "../features/usersSlice";
import { formatToRussianMonthYear } from "../misc/dates";

export default function Statistics() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.users.user);
  const stats = useSelector((state) => state.users.statistics);

  const [dates, setDates] = useState([]);
  const [salaries, setSalaries] = useState([]);

  useEffect(() => {
    if (user?.id) {
      dispatch(getStatistics({ id: user.id }));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (stats) {
      // Sort stats by date
      const sortedStats = [...stats].sort(
        (a, b) =>
          new Date(a.date.split(".").reverse().join("-")) -
          new Date(b.date.split(".").reverse().join("-"))
      );

      setDates(sortedStats.map((stat) => stat.date));
      setSalaries(sortedStats.map((stat) => stat.money));
    }
  }, [stats]);

  const allTimeSum = salaries.reduce((acc, curr) => acc + curr, 0).toFixed(2);
  const averageSum = (allTimeSum / dates.length).toFixed(2);

  const lowestSalary = Math.min(...salaries);
  const highestSalary = Math.max(...salaries);

  const startDate = dates[0] ? formatToRussianMonthYear(dates[0], true) : null;
  const lastDate = dates[dates.length - 1]
    ? formatToRussianMonthYear(dates[dates.length - 1])
    : null;

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
      {allTimeSum && (
        <>
          <p className="total_p">
            Общий заработок за все время:{" "}
            <span className="money">{allTimeSum}</span> бел. руб.
          </p>
          <p className="total_p">
            Средняя заработная плата за период с {startDate} по {lastDate}:
            <span className="money"> {averageSum}</span> бел. руб.
          </p>
          <div className="flex-2">
            <p className="total_p">
              Макс. ЗП:
              <span className="money"> {highestSalary}</span> бел. руб.
            </p>
            <p className="total_p">
              Мин. ЗП:
              <span className="redMoney"> {lowestSalary}</span> бел. руб.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
