import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-modal';
import { MobileFormDetails, StorageFormDetails, ConditionFormDetails, CarrierFormDetails, BackToPreviousList } from '../App';
import axios from "axios";
import ButtonMain from './ButtonMain'
import { MdDeleteForever } from "react-icons/md";

const ListingPlates = ({ fetchEditItem, fetchEditArr, fetchEditConditionArr, fetchEditStorageArr, fetchEditCarrierArr, contentLine1A, contentLine1B, contentLine1C, contentLine2A, contentLine2B, contentLine2C, contentLine2D, contentLine3A, contentLine3B, contentLine3C, contentLine3D, buttonRequired, dateTimeRequired, createdDate, updatedDate }) => {

  const navigate = useNavigate();
  const mobileFormDetails = useContext(MobileFormDetails);
  const storageFormDetails = useContext(StorageFormDetails);
  const conditionFormDetails = useContext(ConditionFormDetails);
  const carrierFormDetails = useContext(CarrierFormDetails);
  const backToPreviousList = useContext(BackToPreviousList);

  const [modal, setModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [editItem, setEditItem] = useState('');

  // useEffect to update edit item name
  useEffect(() => {
    setEditItem(fetchEditItem);
  }, [fetchEditItem])

  // function to delete item 
  const deleteItem = (itemId, editItem) => {

    // console.log("delete", itemId, editItem);
    navigate('/redirecting..');

    axios.delete(`https://sell-iphone-backend-production.up.railway.app/api/admin/delete-${editItem}/${itemId}`)
      .then(res => {

        if (res.data.status === 200) {

          if (editItem === 'mobile') {
            backToPreviousList.dispatch({ type: "switchList", value: 'devices' });
          } else {
            backToPreviousList.dispatch({ type: "switchList", value: editItem + 's' });
          }

          setModal(false);
          navigate('/dashboard');
          showDeleteSuccess();
          console.log("deleted " + editItem + " successfuly id: " + itemId);

        } else {

          setModal(false);
          console.log("failed to delete " + editItem + " !! ");
        }
      })
      .catch(error => {
        console.error('Error deleting data:', error);
      });
  }

  // delete success modal
  const showDeleteSuccess = () => {

    setSuccessModal(true);
    setTimeout(() => {
      setSuccessModal(false);
    }, 4000);
  }

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
        buttonRequired === 'yes' ?
          <div className='sm:grid grid-cols-12 gap-2 font-medium'>

            {/* datetime / content */}
            {
              dateTimeRequired === "yes" ?
                <div className='col-span-6 grid grid-cols-2 text-left text-xs text-red-700'>
                  <div>
                    {
                      <span>{fetchEditArr.created_at && 'Created at: ' + createdDate} </span>
                    }
                  </div>

                  <div>
                    {
                      <span>{fetchEditArr.updated_at && 'Updated at: ' + updatedDate} </span>
                    }
                  </div>
                </div>

                :

                <div className='col-span-6 grid grid-cols-2 text-sm text-left'>
                  <div>
                    {contentLine3A}
                  </div>

                  <div>
                    {contentLine3B}
                  </div>
                </div>
            }

            {/* buttons */}
            <div className='col-span-6 justify-self-end'>

              <div className='grid grid-cols-3'>

                <MdDeleteForever className='text-3xl text-red-700 cursor-pointer hover:animate-pulse' onClick={() => setModal(true)} />

                <div className='col-span-2'>
                  <ButtonMain
                    name="edit"
                    buttonLable={"Edit " + editItem}
                    size='small'
                    color='green'
                    onClick={() => {
                      navigate('/' + editItem + 'Form');

                      if (editItem === 'mobile') {
                        const conditionData = fetchEditConditionArr.map(conditionData => ({ value: conditionData.condition_id, label: conditionData.condition_title, price: conditionData.price }));
                        const storageData = fetchEditStorageArr.map(storageData => ({ value: storageData.storage_id, label: storageData.storage_value + ' ' + storageData.storage_unit, price: storageData.price }));
                        const carrierData = fetchEditCarrierArr.map(carrierData => ({ value: carrierData.carrier_id, label: carrierData.carrier_name, price: carrierData.price }));

                        mobileFormDetails.dispatch(
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

                      } else if (editItem === 'storage') {

                        storageFormDetails.dispatch(
                          {
                            type: "edit",
                            value: {
                              storage_id: fetchEditArr.storage_id,
                              storage_value: fetchEditArr.storage_value,
                              storage_unit: fetchEditArr.storage_unit,
                              storage_description: fetchEditArr.storage_description,
                              price: ''
                            }
                          }
                        );

                      } else if (editItem === 'condition') {

                        conditionFormDetails.dispatch(
                          {
                            type: "edit",
                            value: {
                              condition_id: fetchEditArr.condition_id,
                              condition_title: fetchEditArr.condition_title,
                              condition_description: fetchEditArr.condition_description,
                              price: ''
                            }
                          }
                        );

                      } else if (editItem === 'carrier') {

                        carrierFormDetails.dispatch(
                          {
                            type: "edit",
                            value: {
                              carrier_id: fetchEditArr.carrier_id,
                              carrier_name: fetchEditArr.carrier_name,
                              price: '',
                            }
                          }
                        );

                      }

                    }}
                  />
                </div>

              </div>
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

      {
        modal &&

        <Modal
          isOpen={modal}
          ariaHideApp={false}
          className="flex items-center justify-center h-screen bg-gray-950 bg-opacity-50"
        >
          <div className='grid sm:grid-rows-2 gap-2 rounded-2xl bg-white py-6 pl-20 pr-20'>

            {/* Modal description */}
            <div className='grid justify-items-center'>
              {
                editItem === 'mobile' ?
                  <span className='text-normal font-bold text-red-700'>{"Are you sure you want to delete mobile device: " + fetchEditArr.device_name + " ?"}</span>

                  : editItem === 'storage' ?
                    <span className='text-normal font-bold text-red-700'>{"Are you sure you want to delete storage: " + fetchEditArr.storage_value + ' ' + fetchEditArr.storage_unit + " ?"}</span>

                    : editItem === 'condition' ?
                      <span className='text-normal font-bold text-red-700'>{"Are you sure you want to delete condition: " + fetchEditArr.condition_title + " ?"}</span>

                      : editItem === 'carrier' &&
                      <span className='text-normal font-bold text-red-700'>{"Are you sure you want to delete carrier: " + fetchEditArr.carrier_name + " ?"}</span>
              }
            </div>

            {/* Modal buttons */}
            <div className='grid sm:grid-cols-2 gap-2 justify-self-center'>
              <ButtonMain
                name="closeModal"
                buttonLable="Cancel"
                onClick={() => {
                  setModal(false);
                }}
              />

              <ButtonMain
                name="deleteItem"
                buttonLable="Confirm delete"
                color='red'
                onClick={() => {

                  if (editItem === 'mobile') {
                    deleteItem(fetchEditArr.device_id, editItem);

                  } else if (editItem === 'storage') {
                    deleteItem(fetchEditArr.storage_id, editItem);

                  } else if (editItem === 'condition') {
                    deleteItem(fetchEditArr.condition_id, editItem);

                  } else if (editItem === 'carrier') {
                    deleteItem(fetchEditArr.carrier_id, editItem);

                  }
                }}
              />
            </div>

          </div>
        </Modal>
      }

      {
        successModal &&

        <Modal
          isOpen={successModal}
          ariaHideApp={false}
          className="flex items-center justify-center h-screen bg-gray-950 bg-opacity-50"
        >
          <div className='grid rounded-2xl bg-orange-200 py-6 pl-20 pr-20'>

            {/* Modal description */}
            <div className='grid justify-items-center'>
              {
                editItem === 'mobile' ?
                  <span className='text-normal font-bold text-red-700'>{"Mobile device: " + fetchEditArr.device_name + ", deleted successfully !!"}</span>

                  : editItem === 'storage' ?
                    <span className='text-normal font-bold text-red-700'>{"Storage: " + fetchEditArr.storage_value + ' ' + fetchEditArr.storage_unit + ", deleted successfully !!"}</span>

                    : editItem === 'condition' ?
                      <span className='text-normal font-bold text-red-700'>{"Condition: " + fetchEditArr.condition_title + ", deleted successfully !!"}</span>

                      : editItem === 'carrier' &&
                      <span className='text-normal font-bold text-red-700'>{"Carrier: " + fetchEditArr.carrier_name + ", deleted successfully !!"}</span>
              }
            </div>

          </div>
        </Modal>
      }
    </div>
  )
}

export default ListingPlates