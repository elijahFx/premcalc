import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCases } from "../../features/casesSlice.mjs";
import DeletedRow from "./DeletedRow";
import { formattedDate } from "../AdminPanel";
import { Link } from "react-router-dom";

export default function TrashBin() {
  const cases = useSelector((state) => state.cases.cases);
  const deletedCases = cases.filter((el) => el.isDeleted);
  const user = useSelector((state) => state.users.user);
  const { error, status } = useSelector((state) => state.cases);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCases());
  }, [1]);

  return (
    <>
      <div className="monthContainer">
        <div className="month">
          <h5>{formattedDate}</h5>
          <Link to="/">
            <button>На главную</button>
          </Link>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>№ </th>
            <th>Ответчик: </th>
            <th>До удаления осталось: </th>
            <th>Действия:</th>
          </tr>
        </thead>
        <tbody>
          {cases && status !== "loading" ? (
            deletedCases.map((el, number) => {
              return (
                <DeletedRow
                  id={el._id}
                  key={number}
                  num={number}
                  name={el.name}
                  deleteAt={el.deleteAt}
                />
              );
            })
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </>
  );
}
