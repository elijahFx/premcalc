import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';



export default function DeletedRow({ name, num, id }) {


    const cases = useSelector(state => state.cases.cases)


  return (
    <tr className="gray">
            <td>{num + 1}</td>
			<td>{name}</td>
            <td>{24} часа (-ов) {20} секунд</td>
            <td><span className="material-symbols-outlined">history</span></td>
	</tr>
  )
}