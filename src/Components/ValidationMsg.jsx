import React from 'react'

const ValidationMsg = ({errorMsg}) => {
  return (
    <div className='text-xs text-red-700 font-medium mt-1 text-right md:text-right lg:text-right'>
      {errorMsg}
    </div>
  )
}

export default ValidationMsg