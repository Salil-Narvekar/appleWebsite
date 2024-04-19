import React, { useState, useContext } from 'react'
import { StorageFormDetails, BackToPreviousList } from '../App';
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import axios from "axios";
import ButtonMain from './ButtonMain';
import InputField from './InputField';
import Loader from './Loader';
import ValidationMsg from './ValidationMsg';

const StorageForm = () => {
    const navigate = useNavigate();
    const backToPreviousList = useContext(BackToPreviousList);
    const storageFormDetails = useContext(StorageFormDetails);

    const [storageDetails, setStorageDetails] = useState({
        storage_id: storageFormDetails.storageForm.storage_id ? storageFormDetails.storageForm.storage_id : '',
        storage_value: storageFormDetails.storageForm.storage_value ? storageFormDetails.storageForm.storage_value : '',
        storage_unit: storageFormDetails.storageForm.storage_unit ? storageFormDetails.storageForm.storage_unit : '',
        storage_description: storageFormDetails.storageForm.storage_description ? storageFormDetails.storageForm.storage_description : '',
        price: ''
    });

    const [validationFlag, setValidationFlag] = useState();
    const [submitLoader, setSubmitLoader] = useState(false);
    const [modal, setModal] = useState(false);

    const authToken = localStorage.getItem('authToken'); // get auth token from localstorage
    if (!authToken) {
        console.error('Authentication token not found in local storage');
        navigate('/login');
        return;
    }

    const submitStorageDetails = (action) => {

        // to validate & Submit
        if (!storageDetails.storage_value || !storageDetails.storage_unit) {

            setValidationFlag(false);
        } else {

            setValidationFlag(true);
            setSubmitLoader(true);
            console.log("storage added successfully - storageDetails payload -> ", storageDetails);
            const authToken = localStorage.getItem('authToken'); // get auth token from localstorage

            if (action === 'add') {

                axios.post('https://sell-iphone-backend-production.up.railway.app/api/admin/add-new-storage', storageDetails,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `${authToken}`,
                        }
                    }
                )
                    .then(res => {

                        if (res.data.status === 200) {

                            console.log("storage added successfully - storageDetails payload -> ", storageDetails);
                            setSubmitLoader(false);
                            setModal(true);

                        } else {

                            console.log("failed to add storage !! ");
                            setSubmitLoader(false);
                        }
                    })

                    .catch(error => {

                        if (error.response.status === 401) {

                            console.error('Unauthorised User - Auth token not found');
                            localStorage.removeItem('authToken');
                            navigate('/login');

                        } else {
                            console.error('Error fetching data:', error.response);
                        }
                    });

            } else if (action === 'update') {

                axios.put(`https://sell-iphone-backend-production.up.railway.app/api/admin/update-storage/${storageDetails.storage_id}`, storageDetails,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `${authToken}`,
                        }
                    }
                )
                    .then(res => {

                        if (res.data.status === 200) {

                            console.log("storage updated successfully - storageDetails payload -> ", storageDetails);
                            setSubmitLoader(false);
                            setModal(true);

                        } else {

                            console.log("failed to updated storage !! ");
                            setSubmitLoader(false);
                        }
                    })

                    .catch(error => {

                        if (error.response.status === 401) {

                            console.error('Unauthorised User - Auth token not found');
                            localStorage.removeItem('authToken');
                            navigate('/login');

                        } else {
                            console.error('Error fetching data:', error.response);
                        }
                    });
            }

        }
    }

    return (
        <div className='grid sm:grid-rows-10 gap-1'>

            {/* Header */}
            <div className='grid grid-cols-2 ml-5 mr-4 py-4 text-lg font-bold'>
                <div className='grid justify-items-start sm:text-xl text-slate-700'> {!storageDetails.storage_id ? "Add new storage details" : "Update storage details"} </div>
                <div className='col-span-1 grid justify-items-end'>
                    <ButtonMain
                        name="back"
                        buttonLable="Back to dashboard"
                        onClick={() => {
                            backToPreviousList.dispatch({ type: "switchList", value: 'storages' });
                            navigate('/dashboard')
                        }}
                    />
                </div>
            </div>

            <div className="row-span-9 shadow border border-slate-300 rounded-lg sm:ml-4 sm:mr-4 pt-5 pb-2" style={{ backgroundColor: '#F0F2F5' }}>

                {/* Form section - Enter Storage details */}
                <div className='grid sm:grid-rows-5 gap-3 sm:justify-items-start text-left ml-4 mt-2'>
                    <div className='grid sm:grid-cols-2 sm:gap-2 justify-items-start'>
                        <InputField
                            label="Storage value"
                            name="storage_value"
                            id="storage_value"
                            type="number"
                            min={1}
                            placeholder="Enter storage value"
                            value={storageDetails.storage_value}
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
                            value={storageDetails.storage_unit}
                            onChange={(e) => {
                                setStorageDetails((prevSetDetails) => ({
                                    ...prevSetDetails,
                                    storage_unit: e.target.value.toUpperCase()
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

                    <div className='row-span-3 grid sm:grid-cols-3 justify-items-start font-sans text-slate-600'>
                        <span className="sm:text-md text-right mr-2"><b>Storage description: </b></span>
                        <textarea
                            className='col-span-2 w-full h-full border border-slate-300 rounded text-black
                            transition duration-500 ease-in-out hover:scale-95 text-slate-600 font-semibold py-1 pl-2 '
                            name="storage_description"
                            id="storage_description"
                            type="text"
                            placeholder="Enter storage description"
                            value={storageDetails.storage_description}
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
                        !storageDetails.storage_id ?

                            !submitLoader ?
                                <ButtonMain name='submit' buttonLable='Add storage' color='green' onClick={() => submitStorageDetails('add')} />
                                :
                                <div className='grid grid-cols-2 gap-2 justify-items-start'>
                                    <ButtonMain buttonLable='Adding storage... ' color='green' />
                                    <Loader />
                                </div>

                            :

                            !submitLoader ?
                                <ButtonMain name='submit' buttonLable='Update storage' color='green' onClick={() => submitStorageDetails('update')} />
                                :
                                <div className='grid grid-cols-2 gap-2 justify-items-start'>
                                    <ButtonMain buttonLable='Updating storage... ' color='green' />
                                    <Loader />
                                </div>

                    }
                </div>
            </div>

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
                                !storageDetails.device_id ?
                                    <span className='text-normal font-bold text-green-700'>Successfully added the new storage details !!</span>
                                    :
                                    <span className='text-normal font-bold text-green-700'>{'Successfully updated the ' + storageDetails.storage_value + ' ' + storageDetails.storage_unit + ' details !!'}</span>
                            }

                            <small className='text-xs font-bold text-green-600'>View the updated storages list on dashboard</small>
                        </div>

                        {/* Modal buttons */}
                        <div className='grid justify-items-center'>
                            <ButtonMain
                                name="closeModal"
                                buttonLable="Ok go to dahborad"
                                onClick={() => {
                                    setModal(false);
                                    backToPreviousList.dispatch({ type: "switchList", value: 'storages' });
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