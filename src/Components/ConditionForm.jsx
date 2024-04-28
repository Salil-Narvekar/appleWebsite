import React, { useState, useContext, useEffect } from 'react'
import { ConditionFormDetails, BackToPreviousList } from '../App';
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import axios from "axios";
import ButtonMain from './ButtonMain';
import InputField from './InputField';
import Loader from './Loader';
import ValidationMsg from './ValidationMsg';

const ConditionForm = () => {
    const navigate = useNavigate();
    const backToPreviousList = useContext(BackToPreviousList);
    const conditionFormDetails = useContext(ConditionFormDetails);

    const [conditionDetails, setConditionDetails] = useState({
        condition_id: conditionFormDetails.conditionForm.condition_id ? conditionFormDetails.conditionForm.condition_id : '',
        condition_title: conditionFormDetails.conditionForm.condition_title ? conditionFormDetails.conditionForm.condition_title : '',
        condition_description: conditionFormDetails.conditionForm.condition_description ? conditionFormDetails.conditionForm.condition_description : '',
        price: ''
    });

    const [validationFlag, setValidationFlag] = useState();
    const [submitLoader, setSubmitLoader] = useState(false);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        const authToken = localStorage.getItem('authToken'); // get auth token from localstorage
        if (!authToken) {
            console.error('Authentication token not found in local storage');
            navigate('/login');
            return;
        }
    }, [navigate])


    const submitConditionDetails = (action) => {

        // to validate & Submit
        if (!conditionDetails.condition_title) {
            setValidationFlag(false);
        } else {

            setValidationFlag(true);
            setSubmitLoader(true);
            console.log("condition added successfully - conditionDetails payload -> ", conditionDetails);
            const authToken = localStorage.getItem('authToken'); // get auth token from localstorage

            if (action === 'add') {

                axios.post('https://sell-iphone-backend-production.up.railway.app/api/admin/add-new-condition', conditionDetails,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `${authToken}`,
                        }
                    }
                )
                    .then(res => {

                        if (res.data.status === 200) {

                            console.log("condition added successfully - conditionDetails payload -> ", conditionDetails);
                            setSubmitLoader(false);
                            setModal(true);

                        } else {

                            console.log("failed to add condition !! ");
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

                axios.put(`https://sell-iphone-backend-production.up.railway.app/api/admin/update-condition/${conditionDetails.condition_id}`, conditionDetails,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `${authToken}`,
                        }
                    }
                )
                    .then(res => {

                        if (res.data.status === 200) {

                            console.log("condition updated successfully - conditionDetails payload -> ", conditionDetails);
                            setSubmitLoader(false);
                            setModal(true);

                        } else {

                            console.log("failed to updated condition !! ");
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
                <div className='grid justify-items-start sm:text-xl text-slate-700'> {!conditionDetails.condition_id ? "Add new condition details" : "Update condition details"} </div>
                <div className='col-span-1 grid justify-items-end'>
                    <ButtonMain
                        name="back"
                        buttonLable="Back to dashboard"
                        onClick={() => {
                            backToPreviousList.dispatch({ type: "switchList", value: 'conditions' });
                            navigate('/dashboard')
                        }}
                    />
                </div>
            </div>

            <div className="row-span-9 shadow border border-slate-300 rounded-lg sm:ml-4 sm:mr-4 pt-5 pb-2" style={{ backgroundColor: '#F0F2F5' }}>

                {/* Form section - Device details */}
                <div className='grid sm:grid-rows-4 gap-3 sm:justify-items-start text-left ml-4 mt-2'>
                    <div className='grid sm:grid-cols-2 sm:gap-2 justify-items-start'>
                        <InputField
                            label="Condition title"
                            name="condition_title"
                            id="condition_title"
                            type="text"
                            placeholder="Enter condition title"
                            value={conditionDetails.condition_title}
                            onChange={(e) => {
                                setConditionDetails((prevSetDetails) => ({
                                    ...prevSetDetails,
                                    condition_title: e.target.value
                                }));
                            }}
                        />

                        <div className='sm:mt-2'>
                            {
                                validationFlag === false && !conditionDetails.condition_title &&
                                <ValidationMsg errorMsg="Condition value required" />
                            }
                        </div>
                    </div>

                    <div className='row-span-3 grid sm:grid-cols-3 justify-items-start font-sans text-slate-600 text-xs md:text-sm lg:text-md'>
                        <span className="text-right mr-2"><b>Condition description: </b></span>
                        <textarea
                            className='col-span-2 w-full h-full border border-slate-300 rounded text-black
                            transition duration-500 ease-in-out hover:scale-95 text-slate-600 font-semibold py-1 pl-2 '
                            name="condition_description"
                            id="condition_description"
                            type="text"
                            placeholder="Enter condition description"
                            value={conditionDetails.condition_description}
                            onChange={(e) => {
                                setConditionDetails((prevSetDetails) => ({
                                    ...prevSetDetails,
                                    condition_description: e.target.value
                                }));
                            }}
                        />
                    </div>
                </div>

                {/* Form section - Submit button */}
                <div className='grid justify-items-start mt-4 ml-4'>
                    {
                        !conditionDetails.condition_id ?

                            !submitLoader ?
                                <ButtonMain name='submit' buttonLable='Add condition' color='green' onClick={() => submitConditionDetails('add')} />
                                :
                                <div className='grid grid-cols-2 gap-2 justify-items-start'>
                                    <ButtonMain buttonLable='Adding condition... ' color='green' />
                                    <Loader />
                                </div>

                            :

                            !submitLoader ?
                                <ButtonMain name='submit' buttonLable='Update condition' color='green' onClick={() => submitConditionDetails('update')} />
                                :
                                <div className='grid grid-cols-2 gap-2 justify-items-start'>
                                    <ButtonMain buttonLable='Updating condition... ' color='green' />
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
                    <div className='grid sm:grid-rows-2 gap-2 rounded-2xl bg-white py-6 pl-6 pr-6 lg:py-6 lg:pl-20 lg:pr-20'>

                        {/* Modal description */}
                        <div className='grid justify-items-center'>
                            {
                                !conditionDetails.condition_id ?
                                    <span className='text-sm md:text-base lg:text-normal font-bold text-green-700'>Successfully added the new condition details !!</span>
                                    :
                                    <span className='text-sm md:text-base lg:text-normal font-bold text-green-700'>{'Successfully updated the ' + conditionDetails.condition_title + ' details !!'}</span>
                            }

                            <small className='text-xs font-bold text-green-600'>View the updated conditions list on dashboard</small>
                        </div>

                        {/* Modal buttons */}
                        <div className='grid justify-items-center'>
                            <ButtonMain
                                name="closeModal"
                                buttonLable="Return To Dashboard"
                                onClick={() => {
                                    setModal(false);
                                    backToPreviousList.dispatch({ type: "switchList", value: 'conditions' });
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

export default ConditionForm