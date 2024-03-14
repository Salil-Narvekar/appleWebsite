import React from 'react'

const ListingTitle = ({ titlename, icon }) => {
  return (
    <div className='grid grid-flow-col gap-3 justify-self-start font-semibold text-xl ml-1 text-slate-500'>
      <div>{titlename}</div>
      <div className='mt-1'>{icon}</div> 
    </div>
  )
}

export default ListingTitle