import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { calculateSalary } from '../misc/salary'; // Import the calculateSalary function

export default function UserRow({ email, num, id, role, name, userOklad }) {
  const allCases = useSelector(state => state.cases.allCases);
  const [roleData, setRoleData] = useState(role);
  const roles = ["worker", "employer", "admin"];

  const [money, setMoney] = useState(0)

  const actualOklad = userOklad 

  useEffect(() => {
    setRoleData(role);
  }, [role]);

 async function getUserSalary() {
    const userCases = await allCases?.filter((el) => el.user_id === id); 
    
    const salaryData = calculateSalary(userCases, actualOklad); 
    
    setMoney(salaryData.myPureMoney)
  }

  useEffect(() => {
    getUserSalary();
  }, [allCases]);

  function handleInputChange(event) {
    const { name, value } = event.target;
    if (name && value) {
      setRoleData(value);
    }
  }

  function handleBanUser() {
    // Logic to ban the user
  }

  return (
    <tr className={role === "admin" ? "golden" : "gray"}>
      <td>{num + 1}</td>
      <td>{email}</td>
      <td>{name ? name : "Безымянный"}</td>
      <td>
        <select name="role" value={roleData} onChange={(e) => handleInputChange(e)}>
          <option value={role}>{role}</option>
          <option value={roles.filter(a => a !== role)[0]}>{roles.filter(a => a !== role)[0]}</option>
          <option value={roles.filter(a => a !== role)[1]}>{roles.filter(a => a !== role)[1]}</option>
        </select>
      </td>
      <td>{id}</td>
      <td>{actualOklad.toFixed(2)} бел. руб.</td> 
      <td>{money} бел. руб.</td> 
      <td><span className="material-symbols-outlined" onClick={handleBanUser}>cancel</span></td>
    </tr>
  );
}
