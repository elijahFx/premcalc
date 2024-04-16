import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeDialog, deleteAllTheCases } from '../features/casesSlice.mjs'

export default function Dialog() {

    const { showDialog } = useSelector(state => state.cases)

    useEffect(() => {
        const body = document.body;

        if (showDialog) {
            body.classList.add('shadow');
        } else {
            body.classList.remove('shadow');
        }
    
        return () => {
            body.classList.remove('shadow');
        };
    }, [showDialog])


    const dispatch = useDispatch()

    function deleteAllPaid() {
        dispatch(deleteAllTheCases())
        dispatch(changeDialog(""))
    }

  return (
    <div className='dialog'>
        <h2>Вы действительно хотите удалить все оплаченные дела?</h2>
        <div className="flexContainer">
            <button onClick={() => deleteAllPaid()} className='yesBtn'>Да</button>
            <button onClick={() => dispatch(changeDialog(""))} className='noBtn'>Нет</button>
        </div>
    </div>
  )
}
