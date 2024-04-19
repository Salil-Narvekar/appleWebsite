import React, { useState, useContext } from 'react'
import { CarrierFormDetails, BackToPreviousList } from '../App';
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import axios from "axios";
import ButtonMain from './ButtonMain';
import InputField from './InputField';
import Loader from './Loader';
import ValidationMsg from './ValidationMsg';

const CarrierForm = () => {
    const navigate = useNavigate();
    const backToPreviousList = useContext(BackToPreviousList);
    const carrierFormDetails = useContext(CarrierFormDetails);

    const [carrierDetails, setCarrierDetails] = useState({
        carrier_id: carrierFormDetails.carrierForm.carrier_id ? carrierFormDetails.carrierForm.carrier_id : '',
        carrier_name: carrierFormDetails.carrierForm.carrier_name ? carrierFormDetails.carrierForm.carrier_name : '',
        price: '',
    });

    const [validationFlag, setValidationFlag] = useState();
    const [submitLoader, setSubmitLoader] = useState(false);
    const [modal, setModal] = useState(false);

    const submitCarrierDetails = (action) => {

        // to validate & Submit
        if (!carrierDetails.carrier_name) {
            setValidationFlag(false);
        } else {

            setValidationFlag(true);
            setSubmitLoader(true);
            console.log("carrier added successfully - carrierDetails payload -> ", carrierDetails);
            const authToken = localStorage.getItem('authToken'); // get auth token from localstorage

            if (action === 'add') {

                axios.post('https://sell-iphone-backend-production.up.railway.app/api/admin/add-new-carrier', carrierDetails,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `${authToken}`,
                        }
                    }
                )
                    .then(res => {

                        if (res.data.status === 200) {

                            console.log("carrier added successfully - carrierDetails payload -> ", carrierDetails);
                            setSubmitLoader(false);
                            setModal(true);

                        } else {

                            console.log("failed to add carrier !! ");
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

                axios.put(`https://sell-iphone-backend-production.up.railway.app/api/admin/update-carrier/${carrierDetails.carrier_id}`, carrierDetails,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `${authToken}`,
                        }
                    }
                )
                    .then(res => {

                        if (res.data.status === 200) {

                            console.log("carrier updated successfully - carrierDetails payload -> ", carrierDetails);
                            setSubmitLoader(false);
                            setModal(true);

                        } else {

                            console.log("failed to updated carrier !! ");
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
                <div className='grid justify-items-start sm:text-xl text-slate-700'> {!carrierDetails.carrier_id ? "Add new carrier details" : "Update carrier details"} </div>
                <div className='col-span-1 grid justify-items-end'>
                    <ButtonMain
                        name="back"
                        buttonLable="Back to dashboard"
                        onClick={() => {
                            backToPreviousList.dispatch({ type: "switchList", value: 'carriers' });
                            navigate('/dashboard')
                        }}
                    />
                </div>
            </div>

            <div className="row-span-9 shadow border border-slate-300 rounded-lg sm:ml-4 sm:mr-4 pt-5 pb-2" style={{ backgroundColor: '#F0F2F5' }}>

                {/* Form section - Enter carrier details */}
                <div className='grid gap-3 sm:justify-items-start text-left ml-4 mt-2'>
                    <div className='grid sm:grid-cols-2 sm:gap-2 justify-items-start'>
                        <InputField
                            label="Carrier name"
                            name="carrier_name"
                            id="carrier_name"
                            type="text"
                            placeholder="Enter carrier name"
                            value={carrierDetails.carrier_name}
                            onChange={(e) => {
                                setCarrierDetails((prevSetDetails) => ({
                                    ...prevSetDetails,
                                    carrier_name: e.target.value
                                }));
                            }}
                        />

                        <div className='sm:mt-2'>
                            {
                                validationFlag === false && !carrierDetails.carrier_name &&
                                <ValidationMsg errorMsg="Carrier name required" />
                            }
                        </div>
                    </div>
                </div>

                {/* Form section - Submit button */}
                <div className='grid justify-items-start mt-4 ml-4'>

                    {
                        !carrierDetails.carrier_id ?

                            !submitLoader ?
                                <ButtonMain name='submit' buttonLable='Add carrier' color='green' onClick={() => submitCarrierDetails('add')} />
                                :
                                <div className='grid grid-cols-2 gap-2 justify-items-start'>
                                    <ButtonMain buttonLable='Adding carrier... ' color='green' />
                                    <Loader />
                                </div>

                            :

                            !submitLoader ?
                                <ButtonMain name='submit' buttonLable='Update carrier' color='green' onClick={() => submitCarrierDetails('update')} />
                                :
                                <div className='grid grid-cols-2 gap-2 justify-items-start'>
                                    <ButtonMain buttonLable='Updating carrier... ' color='green' />
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
                                !carrierDetails.carrier_id ?
                                    <span className='text-normal font-bold text-green-700'>Successfully added the new carrier details !!</span>
                                    :
                                    <span className='text-normal font-bold text-green-700'>{'Successfully updated the ' + carrierDetails.carrier_name + ' details !!'}</span>
                            }

                            <small className='text-xs font-bold text-green-600'>View the updated carriers list on dashboard</small>
                        </div>

                        {/* Modal buttons */}
                        <div className='grid justify-items-center'>
                            <ButtonMain
                                name="closeModal"
                                buttonLable="Ok go to dahborad"
                                onClick={() => {
                                    setModal(false);
                                    backToPreviousList.dispatch({ type: "switchList", value: 'carriers' });
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

export default CarrierForm