import React from 'react'

const ValidationMsg = ({errorMsg}) => {
  return (
    <div className='text-xs text-red-950 font-medium mt-1 sm:text-right'>
      {errorMsg}
    </div>
  )
}

export default ValidationMsg