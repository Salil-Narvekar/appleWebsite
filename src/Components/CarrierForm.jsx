import React, { useState, useContext } from 'react'
import { BackToPreviousList } from '../App';
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import ButtonMain from './ButtonMain';
import InputField from './InputField';
import Loader from './Loader';
import ValidationMsg from './ValidationMsg';

const CarrierForm = () => {
    const navigate = useNavigate();
    const backToPreviousList = useContext(BackToPreviousList);

    const [carrierDetails, setCarrierDetails] = useState({
        carrier_id: '',
        carrier_name: '',
        price: '',
    });

    const [validationFlag, setValidationFlag] = useState();
    const [submitLoader, setSubmitLoader] = useState(false);
    const [modal, setModal] = useState(false);

    const submitCarrierDetails = () => {

        // to validate & Submit
        if (!carrierDetails.carrier_name) {
            setValidationFlag(false);
        } else {

            setValidationFlag(true);
            setSubmitLoader(true);
            console.log("carrier added successfully - carrierDetails payload -> ", carrierDetails);


            // axios.post('https://sell-iphone-backend-production.up.railway.app/api/admin/add-new-mobile', carrierDetails)
            //     .then(res => {

            //         if (res.data.status === 200) {

            //             console.log("carrier added successfully - carrierDetails payload -> ", carrierDetails);
            //             setSubmitLoader(false);
            //             setModal(true);

            //         } else {

            //             console.log("failed to add carrier !! ");
            //             setSubmitLoader(false);
            //         }
            //     })
            //     .catch(error => {
            //         console.error('Error fetching carrier data:', error);
            //     });
        }
    }

    return (
        <div className='grid sm:grid-rows-10 gap-1'>

            {/* Header */}
            <div className='grid grid-cols-2 ml-5 mr-4 py-4 text-lg font-bold'>
                <div className='grid justify-items-start sm:text-xl text-slate-700'> Add new carrier details </div>
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
                <div className='grid sm:grid-rows-2 gap-3 sm:justify-items-start text-left ml-4 mt-2'>
                    <div className='grid sm:grid-cols-2 sm:gap-2 justify-items-start'>
                        <InputField
                            label="Carrier name"
                            name="carrier_name"
                            id="carrier_name"
                            type="text"
                            placeholder="Enter carrier name"
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
                                <ValidationMsg errorMsg="carrier name required" />
                            }
                        </div>
                    </div>
                </div>


                {/* Form section - Submit button */}
                <div className='grid justify-items-start mt-4 ml-4'>

                    {
                        !submitLoader ?
                            <ButtonMain name='submit' buttonLable='Add carrier' color='green' onClick={() => submitCarrierDetails()} />
                            :
                            <div className='grid grid-cols-2 gap-2 justify-items-start'>
                                <ButtonMain buttonLable='Adding carrier... ' color='green' />
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
                            <span className='text-normal font-bold text-green-700'>Successfully added new carrier details !!</span>
                        </div>

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