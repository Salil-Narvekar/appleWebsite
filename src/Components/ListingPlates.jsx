import React from 'react'
import ButtonMain from './ButtonMain'
import { useNavigate } from 'react-router-dom'

const ListingPlates = ({ contentLine1A, contentLine1B, contentLine1C, contentLine2A, contentLine2B, contentLine2C, contentLine3A, contentLine3B, contentLine3C, buttonRequired, dateTimeRequired, createdDate, updatedDate }) => {

  const navigate = useNavigate();

  return (
    <div className='grid sm:grid-rows-3 rounded-lg bg-slate-200 sm:h-24 transition duration-500 ease-in-out hover:scale-95 shadow-md pl-2 pr-2 pt-2 font-medium'>

      {/* content line 1 */}
      <div className='sm:grid grid-cols-12 gap-2 text-md'>
        <div className='col-span-3 text-left text-lg font-bold'>
          {contentLine1A}
        </div>

        <div className='col-span-3 text-left'>
          {contentLine1B}
        </div>

        <div className='col-span-3 text-left'>
          {contentLine1C}
        </div>

        {
          buttonRequired === 'yes' &&
          <div className='col-span-3 grid justify-self-end'>
            <ButtonMain name="edit" buttonLable="Edit device" size='small' color='green' onClick={() => navigate('/deviceForm')}/>
          </div>
        }
      </div>

      {/* content line 2 */}
      <div className='sm:grid grid-cols-12 gap-2 text-sm'>
        <div className='col-span-3 text-left'>
          {contentLine2A}
        </div>

        <div className='col-span-3 text-left'>
          {contentLine2B}
        </div>

        <div className='col-span-3 text-left'>
          {contentLine2C}
        </div>
      </div>

      {/* content line 3 */}
      {
        dateTimeRequired === "yes" ?
          <div className='sm:text-right text-xs font-medium text-red-700'>
            <span className='mr-4'>Created on: {createdDate}</span>
            <span>Updated on: {updatedDate}</span>
          </div>

          :
          
          <div className='sm:grid grid-cols-12 gap-2 text-sm'>
            <div className='col-span-3 text-left'>
              {contentLine3A}
            </div>

            <div className='col-span-3 text-left'>
              {contentLine3B}
            </div>

            <div className='col-span-3 text-left'>
              {contentLine3C}
            </div>
          </div>
      }
    </div>
  )
}

export default ListingPlates