import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { DeviceFormDetails } from '../App';
import { MultiSelect } from "react-multi-select-component";
import axios from "axios";
import Select from 'react-dropdown-select';
import ButtonMain from './ButtonMain'
import InputField from './InputField';
import ValidationMsg from './ValidationMsg';
import Loader from './Loader';

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
        carriers_accepted: {},
    });
    // console.log("deviceDetails", deviceDetails);

    const [validationFlag, setValidationFlag] = useState();
    const [loader, setLoader] = useState(false);
    const [carriersArr, setCarriersArr] = useState([]);
    const [carriersArrLenght, setCarriersArrLenght] = useState();
    const [selectedStorages, setSelectedStorages] = useState([]);
    const [selectedConditions, setSelectedConditions] = useState([]);

    // useEffect to mount carriers data
    useEffect(() => {
        setLoader(true);
        axios.get('https://sell-iphone-backend-production.up.railway.app/api/device/get-all-carriers')
            .then(res => {

                if (res.data.data.length > 0) {
                    const carriersData = res.data.data;
                    setCarriersArr([carriersData]);
                    setLoader(false);
                } else {
                    console.log("devices data empty");
                    setCarriersArr([]);
                }

            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [])

    const storagesArr = [
        { label: "126 gb", value: "126" },
        { label: "256 gb", value: "256" },
        { label: "1 tb", value: "1", },
        { label: "2 tb", value: "2", },
        { label: "3 tb", value: "3", },
        { label: "4 tb", value: "4", },
        { label: "5 tb", value: "5", },
    ];

    const conditionsArr = [
        { label: "new", value: "new" },
        { label: "old", value: "old" },
        { label: "refurbished", value: "refurbished" },
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

    // function to set / update carriers details
    const setCarriersDetails = (carrierId, carrierPrice, index) => {

        // console.log(carrierId, carrierPrice, index);
        const updatedCarrierData = {
            ...deviceDetails.carriers_accepted,
            [carrierId]: carrierPrice
        };

        setDeviceDetails((prevDeviceDetails) => ({
            ...prevDeviceDetails,
            carriers_accepted: updatedCarrierData
        }));
    }

    // function to validate fields & Submit form details
    const submitDeviceDetails = () => {

        carriersArr.map((carriersArr) => setCarriersArrLenght(carriersArr.length))

        // to validate & Submit
        if (!deviceDetails.device_name || !deviceDetails.base_price || !deviceDetails.device_type || Object.values(deviceDetails.carriers_accepted).length !== carriersArrLenght) {
            setValidationFlag(false);

        } else {

            console.log("final deviceDetails payload -> ", deviceDetails);
            setValidationFlag(true);
            // navigate('/dashboard');
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

            <div className="row-span-9 grid sm:grid-rows-8 shadow border border-slate-300 rounded-lg bg-sky-50 sm:ml-4 sm:mr-4 pt-5 pb-2">

                {/* Form section - Device details */}
                <div className='row-span-1 grid sm:grid-cols-3 gap-1 sm:justify-items-start ml-4'>
                    <div>
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

                    <div>
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

                    <div>
                        <div className='grid sm:grid-cols-2 gap-1 '>
                            <label className='sm:text-md font-bold text-slate-600'>Select device type: </label>
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
                <div className='row-span-2 border border-slate-300 border-dashed rounded-lg pt-2 ml-1 mr-1'>
                    <div className='grid sm:grid-cols-9'>
                        <span className='grid sm:justify-items-start font-bold text-lg underline ml-4 mb-2'>Carriers Details:</span>
                        <div className='grid sm:justify-items-start'>
                            {
                                validationFlag === false && Object.values(deviceDetails.carriers_accepted).length !== carriersArrLenght &&
                                <ValidationMsg errorMsg="All carriers prices required" />
                            }
                        </div>
                    </div>

                    {
                        carriersArr.map((carriersArr, arrayIndex) => (

                            <div className='grid sm:grid-cols-4 gap-1 sm:justify-items-start sm:ml-4' key={arrayIndex}>
                                {
                                    !loader ?
                                        carriersArr.map((carriersData, innerIndex) => (

                                            <div key={innerIndex}>
                                                <InputField
                                                    key={carriersData.carrier_id}
                                                    label={carriersData.carrier_name}
                                                    name="storagePrice"
                                                    id="storagePrice"
                                                    type="number"
                                                    min={1}
                                                    placeholder={"Enter " + carriersData.carrier_name + " price"}
                                                    onChange={(e) => setCarriersDetails(carriersData.carrier_id, e.target.value, innerIndex)}
                                                />
                                            </div>
                                        ))
                                        :
                                        <div className='grid sm:grid-cols-3 gap-2'>
                                            <span className='sm:col-span-2 text-lg font-semibold text-cyan-800'>Loading available carriers... </span>
                                            <Loader />
                                        </div>
                                }
                            </div>
                        ))
                    }

                </div>

                {/* Form section - Storage & condition details */}
                <div className='row-span-5 grid sm:grid-cols-2 gap-1 justify-items-start ml-1 mr-1'>

                    {/* Condition details */}
                    <div className='grid sm:justify-items-start border-r border-dashed w-full pl-4 py-2 pt-4'>
                        <div className='grid sm:grid-cols-4 gap-1'>
                            <label className='sm:text-md font-bold text-slate-600'>Conditions accepted: </label>
                            <MultiSelect
                                className='sm:col-span-3 text-xs'
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

                        <div className='grid sm:grid-rows-4 sm:grid-cols-3 sm:justify-items-start sm:text-left'>
                            {
                                selectedConditions.map((condition) => (

                                    <InputField
                                        key={condition.value}
                                        label={condition.label}
                                        name="conditionPrice"
                                        id="conditionPrice"
                                        type="number"
                                        min={1}
                                        placeholder={"Enter " + condition.label + " price"}
                                        onChange={(e) => {

                                        }}
                                    />
                                ))
                            }
                        </div>
                    </div>

                    {/* Storage details */}
                    <div className='grid sm:justify-items-start w-full pl-4 py-2 pt-4'>
                        <div className='grid sm:grid-cols-4 gap-1'>
                            <label className='sm:text-md font-bold text-slate-600'>Storage accepted: </label>
                            <MultiSelect
                                className='sm:col-span-3 text-xs'
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

                        <div className='grid sm:grid-rows-4 sm:grid-cols-3 sm:justify-items-start sm:text-left'>
                            {
                                selectedStorages.map((storages) => (

                                    <InputField
                                        key={storages.value}
                                        label={storages.label}
                                        name="storagePrice"
                                        id="storagePrice"
                                        type="number"
                                        min={1}
                                        placeholder={"Enter " + storages.label + " price"}
                                        onChange={(e) => {

                                        }}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </div>

                {/* Form section - Submit button */}
                <div className='grid justify-items-center mt-1'>
                    {
                        !loader ?
                            !deviceDetails.device_id ?
                                <ButtonMain name='submit' buttonLable='Add device' color='green' onClick={() => submitDeviceDetails()} />
                                :
                                <ButtonMain name='submit' buttonLable='Update device' color='green' onClick={() => submitDeviceDetails()} />
                            :
                            <ButtonMain color='green' buttonLable='Wait unitl loading carriers...' />

                    }
                </div>
            </div>

        </div >
    )
}

export default Form