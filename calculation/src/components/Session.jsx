import React from 'react'
import SingleSession from './SingleSession'

export default function Session() {
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
