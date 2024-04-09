import React, { useState, useContext } from 'react'
import { ConditionFormDetails, BackToPreviousList } from '../App';
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
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

    const submitConditionDetails = (action) => {

        // to validate & Submit
        if (!conditionDetails.condition_title) {
            setValidationFlag(false);
        } else {

            setValidationFlag(true);
            setSubmitLoader(true);
            console.log("condition added successfully - conditionDetails payload -> ", conditionDetails);

            if (action === 'add') {

                // axios.post('https://sell-iphone-backend-production.up.railway.app/api/admin/add-new-mobile', conditionDetails)
                //     .then(res => {

                //         if (res.data.status === 200) {

                //             console.log("condition added successfully - conditionDetails payload -> ", conditionDetails);
                //             setSubmitLoader(false);
                //             setModal(true);

                //         } else {

                //             console.log("failed to add condition !! ");
                //             setSubmitLoader(false);
                //         }
                //     })
                //     .catch(error => {
                //         console.error('Error fetching condition data:', error);
                //     });

            } else if (action === 'update') {

                // axios.post('https://sell-iphone-backend-production.up.railway.app/api/admin/add-new-mobile/${conditionDetails.condition_id}', conditionDetails)
                //     .then(res => {

                //         if (res.data.status === 200) {

                //             console.log("condition updated successfully - conditionDetails payload -> ", conditionDetails);
                //             setSubmitLoader(false);
                //             setModal(true);

                //         } else {

                //             console.log("failed to updated condition !! ");
                //             setSubmitLoader(false);
                //         }
                //     })
                //     .catch(error => {
                //         console.error('Error fetching condition data:', error);
                //     });
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
                <div className='grid sm:grid-rows-2 gap-3 sm:justify-items-start text-left ml-4 mt-2'>
                    <div className='grid sm:grid-cols-2 sm:gap-2 justify-items-start'>
                        <InputField
                            label="condition title"
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


                    <div className='grid sm:grid-cols-2 sm:gap-2 justify-items-start'>
                        <InputField
                            label="condition description"
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
                    className="flex items-center justify-center h-screen bg-gray-950 bg-opacity-50"
                >
                    <div className='grid sm:grid-rows-2 gap-2 rounded-2xl bg-white py-6 pl-20 pr-20'>

                        <div className='grid justify-items-center'>
                            <span className='text-normal font-bold text-green-700'>Successfully added new condition details !!</span>
                        </div>

                        <div className='grid justify-items-center'>
                            <ButtonMain
                                name="closeModal"
                                buttonLable="Ok go to dahborad"
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