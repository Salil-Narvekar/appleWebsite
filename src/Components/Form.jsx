import React, { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { DeviceFormDetails } from '../App';
import { MultiSelect } from "react-multi-select-component";
import Select from 'react-dropdown-select';
import ButtonMain from './ButtonMain'
import InputField from './InputField';
import ValidationMsg from './ValidationMsg';

const Form = () => {
    const navigate = useNavigate();
    const deviceFormDetails = useContext(DeviceFormDetails);

    const [deviceDetails, setDeviceDetails] = useState({
        base_price: deviceFormDetails.deviceForm.base_price ? deviceFormDetails.deviceForm.base_price : '',
        device_id: deviceFormDetails.deviceForm.device_id ? deviceFormDetails.deviceForm.device_id : '',
        device_name: deviceFormDetails.deviceForm.device_name ? deviceFormDetails.deviceForm.device_name : '',
        device_type: deviceFormDetails.deviceForm.device_type ? deviceFormDetails.deviceForm.device_type : '',
        storage_accepted: {},
        condition_accepted: {},
        carriers_accepted: {

        },
    });
    // console.log("deviceDetails", deviceDetails);

    const [validationFlag, setValidationFlag] = useState();
    const [selectedStorages, setSelectedStorages] = useState([]);
    const [selectedConditions, setSelectedConditions] = useState([]);

    const storagesArr = [
        { label: "126 gb", value: "126" },
        { label: "256 gb", value: "256" },
        { label: "1 tb", value: "1", },
    ];

    const conditionsArr = [
        { label: "new", value: "new" },
        { label: "old", value: "old" },
        { label: "refurbished", value: "refurbished", },
    ];

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
                <div className='grid justify-items-start sm:text-xl text-slate-700'> {!deviceDetails.device_id ? "Add new device details" : "Update device details"} </div>
                <div className='col-span-1 grid justify-items-end'>
                    <ButtonMain
                        name="back"
                        buttonLable="Back to dashboard"
                        onClick={() => navigate('/dashboard')}
                    />
                </div>
            </div>

            <div className="row-span-9 grid grid-rows-8 border border-slate-300 rounded-lg bg-sky-50 sm:ml-4 sm:mr-4 pt-5 pb-2">

                {/* Form section - Device details */}
                <div className='row-span-1 grid sm:grid-cols-3 gap-1 justify-items-start ml-4'>
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
                </div>

                {/* Form section - Carriers details */}
                <div className='row-span-2 border border-slate-300 border-dashed pt-2 rounded-lg ml-1 mr-1'>
                    <span className='grid justify-items-start font-bold text-lg underline ml-4 mb-2'>Carriers Details:</span>

                    <div className='grid sm:grid-cols-4 gap-1 justify-items-start ml-4'>
                        <InputField
                            label="Carriers Name"
                            name="carriersAccepted"
                            id="carriersAccepted"
                            type="number"
                            min={1}
                            placeholder="Enter Carriers Price"
                            onChange={(e) => {
                                setDeviceDetails((prevSetDetails) => ({
                                    ...prevSetDetails,
                                    carriers_accepted: {
                                        carrier_id: '',
                                        carrier_price: e.target.value,
                                    }
                                }));
                            }}
                        />

                        <InputField
                            label="Carriers Name"
                            name="carriersAccepted"
                            id="carriersAccepted"
                            type="number"
                            min={1}
                            placeholder="Enter Carriers Price"
                            onChange={(e) => {
                                setDeviceDetails((prevSetDetails) => ({
                                    ...prevSetDetails,
                                    carriers_accepted: {
                                        carrier_id: '',
                                        carrier_price: e.target.value,
                                    }
                                }));
                            }}
                        />

                        <InputField
                            label="Carriers Name"
                            name="carriersAccepted"
                            id="carriersAccepted"
                            type="number"
                            min={1}
                            placeholder="Enter Carriers Price"
                            onChange={(e) => {
                                setDeviceDetails((prevSetDetails) => ({
                                    ...prevSetDetails,
                                    carriers_accepted: {
                                        carrier_id: '',
                                        carrier_price: e.target.value,
                                    }
                                }));
                            }}
                        />

                        <InputField
                            label="Carriers Name"
                            name="carriersAccepted"
                            id="carriersAccepted"
                            type="number"
                            min={1}
                            placeholder="Enter Carriers Price"
                            onChange={(e) => {
                                setDeviceDetails((prevSetDetails) => ({
                                    ...prevSetDetails,
                                    carriers_accepted: {
                                        carrier_id: '',
                                        carrier_price: e.target.value,
                                    }
                                }));
                            }}
                        />

                        <InputField
                            label="Carriers Name"
                            name="carriersAccepted"
                            id="carriersAccepted"
                            type="number"
                            min={1}
                            placeholder="Enter Carriers Price"
                            onChange={(e) => {
                                setDeviceDetails((prevSetDetails) => ({
                                    ...prevSetDetails,
                                    carriers_accepted: {
                                        carrier_id: '',
                                        carrier_price: e.target.value,
                                    }
                                }));
                            }}
                        />

                        <InputField
                            label="Carriers Name"
                            name="carriersAccepted"
                            id="carriersAccepted"
                            type="number"
                            min={1}
                            placeholder="Enter Carriers Price"
                            onChange={(e) => {
                                setDeviceDetails((prevSetDetails) => ({
                                    ...prevSetDetails,
                                    carriers_accepted: {
                                        carrier_id: '',
                                        carrier_price: e.target.value,
                                    }
                                }));
                            }}
                        />

                        <InputField
                            label="Carriers Name"
                            name="carriersAccepted"
                            id="carriersAccepted"
                            type="number"
                            min={1}
                            placeholder="Enter Carriers Price"
                            onChange={(e) => {
                                setDeviceDetails((prevSetDetails) => ({
                                    ...prevSetDetails,
                                    carriers_accepted: {
                                        carrier_id: '',
                                        carrier_price: e.target.value,
                                    }
                                }));
                            }}
                        />
                    </div>
                </div>

                {/* Form section - Storage & condition details */}
                <div className='row-span-5 grid sm:grid-cols-2 gap-1 justify-items-start ml-1 mr-1'>

                    {/* Storage details */}
                    <div className='grid justify-items-start border-r border-dashed w-full pl-4 py-2'>
                        <div>
                            <div className='grid grid-cols-4 gap-1'>
                                <label className='text-lg font-bold text-slate-600'>Conditions accepted: </label>
                                <MultiSelect
                                    className='col-span-3'
                                    options={conditionsArr}
                                    value={selectedConditions}
                                    onChange={setSelectedConditions}
                                    labelledBy="Select Conditions"
                                    overrideStrings={{
                                        selectSomeItems: 'Select accepted conditions...',
                                        allItemsAreSelected: 'All conditions selected.',
                                        selectAll: 'Select All',
                                        search: 'Search available conditions',
                                    }}
                                />
                            </div>

                        </div>
                    </div>

                    {/* Condition details */}
                    <div className='grid justify-items-start w-full pl-4 py-2'>
                        <div>
                            <div className='grid grid-cols-4 gap-1'>
                                <label className='text-lg font-bold text-slate-600'>Storage accepted: </label>
                                <MultiSelect
                                    className='col-span-3'
                                    options={storagesArr}
                                    value={selectedStorages}
                                    onChange={setSelectedStorages}
                                    labelledBy="Select Storages"
                                    overrideStrings={{
                                        selectSomeItems: 'Select accepted storages...',
                                        allItemsAreSelected: 'All storages selected.',
                                        selectAll: 'Select All',
                                        search: 'Search available storages',
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form section - Submit button */}
                <div className='grid justify-items-center mt-1'>
                    {
                        !deviceDetails.device_id ?
                            <ButtonMain name='submit' buttonLable='Add device' color='green' onClick={() => submitDeviceDetails()} />
                            :
                            <ButtonMain name='submit' buttonLable='Update device' color='green' onClick={() => submitDeviceDetails()} />

                    }
                </div>
            </div>

        </div >
    )
}

export default Form