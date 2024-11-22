import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/usersSlice";
import UserRow from "./UserRow";
import { fetchAllCases } from "../features/casesSlice.mjs";
import { calculateSalary } from "../misc/salary";

const date = new Date();
export const formattedDate = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "long",
  year: "numeric",
}).format(date);

export default function AdminPanel() {
  const dispatch = useDispatch();
  const listOfUsers = useSelector((state) => state.users.listOfUsers);
  const allCases = useSelector((state) => state.cases.allCases);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(fetchAllCases());
  }, [dispatch]);

  const [isDown, setIsDown] = useState(false);
  const [sortedUsers, setSortedUsers] = useState([]);

  useEffect(() => {
    // Calculate the money for each user and update the sortedUsers state
    const usersWithMoney = listOfUsers.map((user) => {
      const userCases = allCases?.filter((c) => c.user_id === user._id);
      const money = calculateSalary(
        userCases,
        user.oklad,
        user._id
      ).myPureMoney;
      return { ...user, money };
    });
    setSortedUsers(usersWithMoney);
  }, [listOfUsers, allCases]);

  function sortZarplata(order) {
    setIsDown(!isDown);
    const sorted = [...sortedUsers].sort((a, b) => {
      return order === 1 ? a.money - b.money : b.money - a.money;
    });
    setSortedUsers(sorted);
  }

  return (
    <div className="adminPnl">
      <div className="monthContainer">
        <div className="month">
          <h5>{formattedDate}</h5>
          <Link to="/">
            <button>На главную</button>
          </Link>
        </div>
      </div>
      <div className="subPanel">
        <table className="table">
          <thead>
            <tr>
              {sortedUsers.length > 1 ? <th>№ </th> : <th></th>}
              <th>Пользователь (email): </th>
              <th>Имя: </th>
              <th>Роль: </th>
              <th>id: </th>
              <th>Оклад:</th>
              <th>
                Настоящий заработок:{" "}
                {isDown ? (
                  <span
                    className="material-symbols-outlined"
                    onClick={() => sortZarplata(1)}
                  >
                    arrow_upward
                  </span>
                ) : (
                  <span
                    className="material-symbols-outlined"
                    onClick={() => sortZarplata(-1)}
                  >
                    arrow_downward
                  </span>
                )}
              </th>
              <th>Действия: </th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((el, number) => (
              <UserRow
                image={el.image}
                money={el.money}
                userOklad={el.oklad}
                id={el._id}
                key={number}
                num={number}
                email={el.email}
                role={el.role}
                name={el.name}
                allCases={allCases} // pass allCases to UserRow if needed
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
