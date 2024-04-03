import React, { useContext } from 'react'
import ButtonMain from './ButtonMain'
import { useNavigate } from 'react-router-dom'
import { DeviceFormDetails } from '../App';

const ListingPlates = ({ fetchEditArr, fetchEditConditionArr, fetchEditStorageArr, fetchEditCarrierArr, contentLine1A, contentLine1B, contentLine1C, contentLine2A, contentLine2B, contentLine2C, contentLine2D, contentLine3A, contentLine3B, contentLine3C, contentLine3D, buttonRequired, dateTimeRequired, createdDate, updatedDate }) => {

  const navigate = useNavigate();
  const deviceFormDetails = useContext(DeviceFormDetails);

  return (
    <div className='grid sm:grid-rows-3 rounded-lg text-slate-700 sm:h-24 transition duration-500 ease-in-out hover:scale-95 shadow-md pl-2 pr-1 pb-1 pt-2 font-medium' style={{ backgroundColor: '#FFFFFF' }}>

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

        <div className='col-span-3 text-left'>
          {contentLine2D}
        </div>
      </div>

      {/* content line 3 */}
      {
        dateTimeRequired === "yes" ?
          <div className='sm:grid grid-cols-12 gap-2 text-xs font-medium text-red-700'>

            <div className='col-span-3 text-left'>
              {
                <span>{fetchEditArr.created_at && 'Created at: ' + createdDate} </span>
              }
            </div>

            <div className='col-span-3 text-left'>
              {
                <span>{fetchEditArr.updated_at && 'Updated at: ' + updatedDate} </span>
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

                    const conditionData = fetchEditConditionArr.map(conditionData => ({ value: conditionData.condition_id, label: conditionData.condition_title, price: conditionData.price }));
                    const storageData = fetchEditStorageArr.map(storageData => ({ value: storageData.storage_id, label: storageData.storage_value + ' ' + storageData.storage_unit, price: storageData.price }));
                    const carrierData = fetchEditCarrierArr.map(carrierData => ({ value: carrierData.carrier_id, label: carrierData.carrier_name, price: carrierData.price }));

                    deviceFormDetails.dispatch(
                      {
                        type: "edit",
                        value: {
                          base_price: fetchEditArr.base_price,
                          device_id: fetchEditArr.device_id,
                          device_name: fetchEditArr.device_name,
                          device_type: fetchEditArr.device_type,
                          conditionData,
                          storageData, 
                          carrierData
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

            <div className='col-span-3 text-left'>
              {contentLine3D}
            </div>
          </div>
      }
    </div>
  )
}

export default ListingPlates