import React, { useEffect } from 'react'
import SingleSession from './SingleSession'
import { useDispatch, useSelector } from 'react-redux'
import { getSessions } from '../features/sessionsSlice'

export default function Session() {

    const dispatch = useDispatch()
    const allTheSessions = useSelector(state => state.session)


    useEffect(() => {
        dispatch(getSessions())

    }, [allTheSessions])


  return (
    <div className='sessionContainer'>
         <div className="box">
            <SingleSession />
            <SingleSession />
         </div>
         <div className="box">

         </div>
    </div>
  )
}
