import React, { useEffect } from 'react'

function Alert({msg, type, removeAlert, list}) {
  useEffect(()=>{
    const timeout = setTimeout(()=>{
      removeAlert();
    },1000)
    return ()=>clearTimeout(timeout);
  }, [list])

  return (
    <div className={`alert alert-${type}`}>
      <p className='alert-msg'>{msg}</p>
    </div>
  )
}

export default Alert
