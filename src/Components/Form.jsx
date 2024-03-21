import React, { useState } from 'react'
import ButtonMain from './ButtonMain'
import { useNavigate } from "react-router-dom";
import InputField from './InputField';
import ValidationMsg from './ValidationMsg';

const Form = () => {
    const navigate = useNavigate();

    const [validation, setValidation] = useState(false);

    const submitDeviceDetails = () => {
        // navigate('/dashboard');
        setValidation(true);
    }

    return (
        <div className='grid sm:grid-rows-10 gap-1'>
            {/* Header */}
            <div className='grid grid-cols-2 ml-5 mr-4 py-4 text-lg font-bold'>
                <div className='grid justify-items-start sm:text-xl text-slate-700'> Add new device details </div>
                <div className='col-span-1 grid justify-items-end'>
                    <ButtonMain
                        name="back"
                        buttonLable="Back to dashboard"
                        onClick={() => navigate('/dashboard')}
                    />
                </div>
            </div>

            <div className="row-span-9 border border-slate-300 rounded-lg bg-sky-50 sm:ml-4 sm:mr-4 py-10">

                <div className='grid sm:grid-cols-3 gap-6 justify-items-start ml-4'>

                    <div className='sm:h-16'>
                        <InputField
                            label="Device name"
                            name="deviceName"
                            id="deviceName"
                            type="text"
                            placeholder="Enter device name"
                            onChange={(e) => {

                            }}
                        />

                        {
                            validation &&
                            <ValidationMsg errorMsg="Device name required" />
                        }
                    </div>

                    <div className='sm:h-16'>
                        <InputField
                            label="Base price"
                            name="basePrice"
                            id="basePrice"
                            type="text"
                            placeholder="Enter base price"
                            onChange={(e) => {

                            }}
                        />

                        {
                            validation &&
                            <ValidationMsg errorMsg="Base price required" />
                        }
                    </div>


                    <div className='sm:h-16'>
                        <InputField
                            label="Condition accepted"
                            name="conditionAccepted"
                            id="conditionAccepted"
                            type="text"
                            placeholder="Enter Conditions accepted"
                            onChange={(e) => {

                            }}
                        />

                        {
                            validation &&
                            <ValidationMsg errorMsg="Condition required" />
                        }
                    </div>

                    <div className='sm:h-16'>
                        <InputField
                            label="Storgae accepted"
                            name="storgaeAccepted"
                            id="storgaeAccepted"
                            type="text"
                            placeholder="Enter storgae accepted"
                            onChange={(e) => {

                            }}
                        />

                        {
                            validation &&
                            <ValidationMsg errorMsg="Storgae required" />
                        }
                    </div>

                    <div className='sm:h-16'>
                        <InputField
                            label="Storgae accepted"
                            name="storgaeAccepted"
                            id="storgaeAccepted"
                            type="text"
                            placeholder="Enter storgae accepted"
                            onChange={(e) => {

                            }}
                        />

                        {
                            validation &&
                            <ValidationMsg errorMsg="Device name required" />
                        }
                    </div>

                    <div className='sm:h-16'>
                        <InputField
                            label="Storgae accepted"
                            name="storgaeAccepted"
                            id="storgaeAccepted"
                            type="text"
                            placeholder="Enter storgae accepted"
                            onChange={(e) => {

                            }}
                        />

                        {
                            validation &&
                            <ValidationMsg errorMsg="Device name required" />
                        }
                    </div>

                    <div className='sm:h-16'>
                        <InputField
                            label="Storgae accepted"
                            name="storgaeAccepted"
                            id="storgaeAccepted"
                            type="text"
                            placeholder="Enter storgae accepted"
                            onChange={(e) => {

                            }}
                        />

                        {
                            validation &&
                            <ValidationMsg errorMsg="Device name required" />
                        }
                    </div>
                </div>

                <div className='grid justify-items-center mt-4'>
                    <ButtonMain name='submit' buttonLable='Add device' color='green' onClick={() => submitDeviceDetails()} />
                </div>
            </div>

        </div>
    )
}

export default Form