import React, { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { DeviceFormDetails } from '../App';
import Select from 'react-dropdown-select';
import ButtonMain from './ButtonMain'
import InputField from './InputField';
import ValidationMsg from './ValidationMsg';

const Form = () => {
    const navigate = useNavigate();
    const deviceFormDetails = useContext(DeviceFormDetails);

    const [deviceDetails, setDeviceDetails] = useState({
        base_price: deviceFormDetails.deviceForm.base_price ? deviceFormDetails.deviceForm.base_price : '',
        condition_accepted: [],
        device_id: deviceFormDetails.deviceForm.device_id ? deviceFormDetails.deviceForm.device_id : '',
        device_name: deviceFormDetails.deviceForm.device_name ? deviceFormDetails.deviceForm.device_name : '',
        device_type: deviceFormDetails.deviceForm.device_type ? deviceFormDetails.deviceForm.device_type : '',
        storage_accepted: []
    });

    // console.log("deviceDetails", deviceDetails);

    const devicesList = [
        {
            device_type: 'mobile',
            deviceName: "mobile"
        },
        {
            device_type: 'laptop',
            deviceName: "laptop"
        },
        {
            device_type: 'watch',
            deviceName: "watch"
        }
    ];

    const setDevice = (value) => {
        // console.log("SelectBox Value", value[0].device_type)
        setDeviceDetails((prevSetDetails) => ({
            ...prevSetDetails,
            device_type: value[0].device_type
        }));
    };

    const [validationFlag, setValidationFlag] = useState();

    // function to validate fields & Submit form details
    const submitDeviceDetails = () => {   

        if (!deviceDetails.device_name || !deviceDetails.base_price || !deviceDetails.device_type) {
            setValidationFlag(false);

        } else {

            setValidationFlag(true);
            navigate('/dashboard');
        }
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
                            name="device_name"
                            id="device_name"
                            type="text"
                            placeholder="Enter device name"
                            value={deviceDetails.device_name}
                            onChange={(e) => {
                                setDeviceDetails((prevSetDetails) => ({
                                    ...prevSetDetails,
                                    device_name: e.target.value
                                }));
                            }}
                        />

                        {
                            validationFlag === false && !deviceDetails.device_name && 
                            <ValidationMsg errorMsg="Device name required" />
                        }
                    </div>

                    <div className='sm:h-16'>
                        <InputField
                            label="Base price"
                            name="base_price"
                            id="base_price"
                            type="number"
                            min={1}
                            placeholder="Enter base price"
                            value={deviceDetails.base_price}
                            onChange={(e) => {
                                setDeviceDetails((prevSetDetails) => ({
                                    ...prevSetDetails,
                                    base_price: e.target.value
                                }));
                            }}
                        />

                        {
                            validationFlag === false && !deviceDetails.base_price && 
                            <ValidationMsg errorMsg="Base price required" />
                        }
                    </div>

                    <div className='sm:h-16'>
                        <div className='grid sm:grid-cols-2 gap-1 '>
                            <label className='sm:text-lg font-bold text-slate-600'>Select device type: </label>
                            <Select
                                className='bg-white text-slate-600 font-semibold text-sm text-left'
                                options={devicesList}
                                labelField="deviceName"
                                valueField="device_type"
                                values={[
                                    {
                                        device_type: deviceFormDetails.deviceForm.device_type,
                                        deviceName: deviceFormDetails.deviceForm.device_type
                                    }
                                ]}
                                onChange={(values) => setDevice(values)}
                            />
                        </div>

                        {
                            validationFlag === false && !deviceDetails.device_type && 
                            <ValidationMsg errorMsg="Select device type" />
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

                        {/* {
                            validationFlag &&
                            <ValidationMsg errorMsg="Condition required" />
                        } */}
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

                        {/* {
                            validationFlag &&
                            <ValidationMsg errorMsg="Storgae required" />
                        } */}
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