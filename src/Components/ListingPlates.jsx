import React, { useContext } from 'react'
import ButtonMain from './ButtonMain'
import { useNavigate } from 'react-router-dom'
import { DeviceFormDetails } from '../App';

const ListingPlates = ({ fetchEditArr, fetchEditConditionArr, fetchEditStorageArr, contentLine1A, contentLine1B, contentLine1C, contentLine2A, contentLine2B, contentLine2C, contentLine3A, contentLine3B, contentLine3C, buttonRequired, dateTimeRequired, createdDate, updatedDate }) => {

  const navigate = useNavigate();
  const deviceFormDetails = useContext(DeviceFormDetails);

  return (
    <div className='grid sm:grid-rows-3 rounded-lg bg-slate-200 sm:h-24 transition duration-500 ease-in-out hover:scale-95 shadow-md pl-2 pr-1 pb-1 pt-2 font-medium'>

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
          <div className='sm:grid grid-cols-12 gap-2 text-xs font-medium text-red-700'>

            <div className='col-span-3 text-left'>
              {
                fetchEditArr.created_at &&
                <span> Created at: {createdDate} </span>
              }
            </div>

            <div className='col-span-3 text-left'>
              {
                fetchEditArr.updated_at &&
                <span> Updated at: {updatedDate} </span>
              }
            </div>

            <div className='col-span-6 justify-self-end'>
              {
                buttonRequired === 'yes' &&
                <ButtonMain
                  name="edit"
                  buttonLable="Edit device"
                  size='small'
                  color='green'
                  onClick={() => {
                    navigate('/deviceForm');

                    // console.log(fetchEditConditionArr.map(conditionData => ({ value: conditionData.condition_id, label: conditionData.condition_title })))
                    const conditionData = fetchEditConditionArr.map(conditionData => ({ value: conditionData.condition_id, label: conditionData.condition_title }));
                    const storageData = fetchEditStorageArr.map(storageData => ({ value: storageData.storage_id, label: storageData.storage_value + ' ' + storageData.storage_unit }));

                    deviceFormDetails.dispatch(
                      {
                        type: "edit",
                        value: {
                          base_price: fetchEditArr.base_price,
                          conditionData,
                          device_id: fetchEditArr.device_id,
                          device_name: fetchEditArr.device_name,
                          device_type: fetchEditArr.device_type,
                          storageData
                        }
                      }
                    );
                  }}
                />
              }
            </div>
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