import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import ButtonMain from './ButtonMain';
import InputField from './InputField';
import Loader from './Loader';
import ValidationMsg from './ValidationMsg';

const StorageForm = () => {
    const navigate = useNavigate();

    const [storageDetails, setStorageDetails] = useState({
        storage_id: '',
        storage_value: '',
        storage_unit: '',
        storage_description: '',
    });

    const [validationFlag, setValidationFlag] = useState();
    const [submitLoader, setSubmitLoader] = useState(false);
    const [modal, setModal] = useState(false);

    const submitStorageDetails = () => {

        // to validate & Submit
        if (!storageDetails.storage_value || !storageDetails.storage_unit) {

            setValidationFlag(false);
        } else {

            setValidationFlag(true);
            setSubmitLoader(true);
            console.log("storage added successfully - storageDetails payload -> ", storageDetails);


            // axios.post('https://sell-iphone-backend-production.up.railway.app/api/admin/add-new-mobile', storageDetails)
            //     .then(res => {

            //         if (res.data.status === 200) {

            //             console.log("storage added successfully - storageDetails payload -> ", storageDetails);
            //             setSubmitLoader(false);
            //             setModal(true);

            //         } else {

            //             console.log("failed to add device !! ");
            //             setSubmitLoader(false);
            //         }
            //     })
            //     .catch(error => {
            //         console.error('Error fetching storages data:', error);
            //     });
        }
    }

    return (
        <div className='grid sm:grid-rows-10 gap-1'>
            {/* Header */}
            <div className='grid grid-cols-2 ml-5 mr-4 py-4 text-lg font-bold'>
                <div className='grid justify-items-start sm:text-xl text-slate-700'> Add new storage details </div>
                <div className='col-span-1 grid justify-items-end'>
                    <ButtonMain
                        name="back"
                        buttonLable="Back to dashboard"
                        onClick={() => navigate('/dashboard')}
                    />
                </div>
            </div>

            <div className="row-span-9 shadow border border-slate-300 rounded-lg sm:ml-4 sm:mr-4 pt-5 pb-2" style={{ backgroundColor: '#F0F2F5' }}>

                {/* Form section - Device details */}
                <div className='grid sm:grid-rows-3 gap-3 sm:justify-items-start text-left ml-4 mt-2'>
                    <div className='grid sm:grid-cols-2 sm:gap-2 justify-items-start'>
                        <InputField
                            label="Storage value"
                            name="storage_value"
                            id="storage_value"
                            type="number"
                            min={1}
                            placeholder="Enter storage value"
                            onChange={(e) => {
                                setStorageDetails((prevSetDetails) => ({
                                    ...prevSetDetails,
                                    storage_value: e.target.value
                                }));
                            }}
                        />

                        <div className='sm:mt-2'>
                            {
                                validationFlag === false && !storageDetails.storage_value &&
                                <ValidationMsg errorMsg="Storage value required" />
                            }
                        </div>
                    </div>

                    <div className='grid sm:grid-cols-2 sm:gap-2 justify-items-start'>
                        <InputField
                            label="Storage unit"
                            name="storage_unit"
                            id="storage_unit"
                            type="text"
                            placeholder="Enter storage unit"
                            onChange={(e) => {
                                setStorageDetails((prevSetDetails) => ({
                                    ...prevSetDetails,
                                    storage_unit: e.target.value
                                }));
                            }}
                        />

                        <div className='sm:mt-2'>
                            {
                                validationFlag === false && !storageDetails.storage_unit &&
                                <ValidationMsg errorMsg="Storage unit required" />
                            }
                        </div>
                    </div>

                    <div className='grid sm:grid-cols-2 sm:gap-2 justify-items-start'>
                        <InputField
                            label="Storage discription"
                            name="storage_discription"
                            id="storage_discription"
                            type="text"
                            placeholder="Enter Storage Discription"
                            onChange={(e) => {
                                setStorageDetails((prevSetDetails) => ({
                                    ...prevSetDetails,
                                    storage_description: e.target.value
                                }));
                            }}
                        />
                    </div>
                </div>


                {/* Form section - Submit button */}
                <div className='grid justify-items-start mt-4 ml-4'>

                    {
                        !submitLoader ?
                            <ButtonMain name='submit' buttonLable='Add storage' color='green' onClick={() => submitStorageDetails()} />
                            :
                            <div className='grid grid-cols-2 gap-2 justify-items-start'>
                                <ButtonMain buttonLable='Adding storage... ' color='green' />
                                <Loader />
                            </div>
                    }


                </div>
            </div>

            {
                modal &&

                <Modal
                    isOpen={modal}
                    className="flex items-center justify-center h-screen bg-gray-950 bg-opacity-50"
                >
                    <div className='grid sm:grid-rows-2 gap-2 rounded-2xl bg-white py-6 pl-20 pr-20'>

                        <div className='grid justify-items-center'>
                            <span className='text-normal font-bold text-green-700'>Successfully added new storage details !!</span>
                        </div>

                        <div className='grid justify-items-center'>
                            <ButtonMain
                                name="closeModal"
                                buttonLable="Ok go to dahborad"
                                onClick={() => {
                                    setModal(false);
                                    navigate('/dashboard');
                                }}
                            />
                        </div>


                    </div>
                </Modal>
            }
        </div>
    )
}

export default StorageForm