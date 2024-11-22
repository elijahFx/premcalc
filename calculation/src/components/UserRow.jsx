import React, { useEffect, useState } from "react";

export default function UserRow({
  email,
  num,
  id,
  role,
  name,
  userOklad,
  money,
  image,
}) {
  const [roleData, setRoleData] = useState(role);
  const roles = ["worker", "employer", "admin"];

  const defaultImage =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
  image = image || defaultImage;

  useEffect(() => {
    setRoleData(role);
  }, [role]);

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
      <td>
        <div className="user-email">
          <div className="user-image-wrapper">
            <img className="user-image" src={image} alt={`${name}'s avatar`} />
            <div className="hover-image-wrapper">
              <img
                className="hover-image"
                src={image}
                alt={`${name}'s avatar large`}
              />
            </div>
          </div>
          {email}
        </div>
      </td>
      <td>{name ? name : "Безымянный"}</td>
      <td>
        <select
          name="role"
          value={roleData}
          onChange={(e) => handleInputChange(e)}
        >
          <option value={role}>{role}</option>
          <option value={roles.filter((a) => a !== role)[0]}>
            {roles.filter((a) => a !== role)[0]}
          </option>
          <option value={roles.filter((a) => a !== role)[1]}>
            {roles.filter((a) => a !== role)[1]}
          </option>
        </select>
      </td>
      <td>{id}</td>
      <td>{userOklad.toFixed(2)} бел. руб.</td>
      <td>{money} бел. руб.</td>
      <td>
        <span className="material-symbols-outlined" onClick={handleBanUser}>
          cancel
        </span>
      </td>
    </tr>
  );
}
