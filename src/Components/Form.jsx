import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { DeviceFormDetails, BackToPreviousList } from '../App';
import { MultiSelect } from "react-multi-select-component";
import axios from "axios";
import Select from 'react-dropdown-select';
import Modal from 'react-modal';
import ButtonMain from './ButtonMain'
import InputField from './InputField';
import ValidationMsg from './ValidationMsg';
import Loader from './Loader';

const Form = () => {
    const navigate = useNavigate();
    const deviceFormDetails = useContext(DeviceFormDetails);
    const backToPreviousList = useContext(BackToPreviousList);

    const [deviceDetails, setDeviceDetails] = useState({
        base_price: deviceFormDetails.deviceForm.base_price ? deviceFormDetails.deviceForm.base_price : '',
        device_id: deviceFormDetails.deviceForm.device_id ? deviceFormDetails.deviceForm.device_id : '',
        device_name: deviceFormDetails.deviceForm.device_name ? deviceFormDetails.deviceForm.device_name : '',
        device_type: deviceFormDetails.deviceForm.device_type ? deviceFormDetails.deviceForm.device_type : '',
        carrierData: {},
        conditionData: {},
        storageData: {},
    });
    // console.log("deviceDetails", deviceDetails)

    const [validationFlag, setValidationFlag] = useState();
    const [loader, setLoader] = useState(false);
    const [submitLoader, setSubmitLoader] = useState(false);
    const [modal, setModal] = useState(false);

    const [carriersArr, setCarriersArr] = useState([]);

    const [storagesArrData, setStoragesArrData] = useState([]);
    const [conditionsArrData, setConditionsArrData] = useState([]);

    const [selectedConditions, setSelectedConditions] = useState(deviceFormDetails.deviceForm.conditionData.length > 0 ? deviceFormDetails.deviceForm.conditionData : []);
    const [selectedStorages, setSelectedStorages] = useState(deviceFormDetails.deviceForm.storageData.length > 0 ? deviceFormDetails.deviceForm.storageData : []);

    // useEffect to mount carriers data
    useEffect(() => {
        setLoader(true);
        axios.get('https://sell-iphone-backend-production.up.railway.app/api/device/get-all-carriers')
            .then(res => {

                if (res.data.data.length > 0) {
                    const carriersData = res.data.data;
                    setCarriersArr(carriersData);
                    setLoader(false);
                } else {
                    console.log("Carriers data empty");
                    setCarriersArr([]);
                }

            })
            .catch(error => {
                console.error('Error fetching carriers data:', error);
            });
    }, [])

    // useEffect to mount conditions data
    useEffect(() => {
        setLoader(true);
        axios.get('https://sell-iphone-backend-production.up.railway.app/api/admin/all-conditions')
            .then(res => {

                if (res.data.data.length > 0) {
                    const conditionsData = res.data.data;
                    setConditionsArrData(conditionsData);
                    setLoader(false);
                } else {
                    console.log("Conditions data empty");
                    setConditionsArrData([]);
                }

            })
            .catch(error => {
                console.error('Error fetching conditions data:', error);
            });
    }, [])

    // useEffect to mount storages data
    useEffect(() => {
        setLoader(true);
        axios.get('https://sell-iphone-backend-production.up.railway.app/api/admin/all-storages')
            .then(res => {

                if (res.data.data.length > 0) {
                    const storagesData = res.data.data;
                    setStoragesArrData(storagesData);
                    setLoader(false);
                } else {
                    console.log("Storages data empty");
                    setStoragesArrData([]);
                }

            })
            .catch(error => {
                console.error('Error fetching storages data:', error);
            });
    }, [])

    // conditions array mapping for multiselect
    const storagesArr = storagesArrData.map(storage => ({
        label: storage.storage_value + ' ' + storage.storage_unit,
        value: storage.storage_id
    }));

    // conditions array mapping for multiselect
    const conditionsArr = conditionsArrData.map(condition => ({
        label: condition.condition_title,
        value: condition.condition_id
    }));

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

    //...............(for old references).................................................................

    // function to set  carrierData details 
    // const setCarriersDetails = (carrierId, carrierPrice, index) => {

    //     // console.log(carrierId, carrierPrice, index);
    //     const updatedCarrierData = {
    //         ...deviceDetails.carrierData,
    //         [carrierId]: carrierPrice
    //     };

    //     setDeviceDetails((prevDeviceDetails) => ({
    //         ...prevDeviceDetails,
    //         carrierData: updatedCarrierData
    //     }));
    // }

    // // function to set conditionData details
    // const setConditionsDetails = (conditionId, conditionPrice, index) => {
    //     // console.log(conditionId, conditionPrice, index);
    //     const updatedConditionData = {
    //         ...deviceDetails.conditionData,
    //         [conditionId]: conditionPrice
    //     };

    //     setDeviceDetails((prevDeviceDetails) => ({
    //         ...prevDeviceDetails,
    //         conditionData: updatedConditionData
    //     }));
    // }

    // // function to set storageData details
    // const setStoragesDetails = (storageId, storagePrice, index) => {
    //     // console.log(storageId, storagePrice, index);
    //     const updatedStorageData = {
    //         ...deviceDetails.storageData,
    //         [storageId]: storagePrice
    //     };

    //     setDeviceDetails((prevDeviceDetails) => ({
    //         ...prevDeviceDetails,
    //         storageData: updatedStorageData
    //     }));
    // }

    //......................................................................................................

    // function to set  carrierData details
    const setCarriersDetails = (carrierId, carrierPrice, index) => {
        setDeviceDetails(prevDeviceDetails => {
            const updatedCarrierData = { ...prevDeviceDetails.carrierData };
            updatedCarrierData[carrierId] = carrierPrice;
            return { ...prevDeviceDetails, carrierData: updatedCarrierData };
        });
    };

    // function to set conditionData details
    const setConditionsDetails = (conditionId, conditionPrice, index) => {
        setDeviceDetails(prevDeviceDetails => {
            const updatedConditionData = { ...prevDeviceDetails.conditionData };
            updatedConditionData[conditionId] = conditionPrice;
            return {
                ...prevDeviceDetails,
                conditionData: updatedConditionData
            };
        });
    };

    // function to set storageData details
    const setStoragesDetails = (storageId, storagePrice, index) => {
        setDeviceDetails(prevDeviceDetails => {
            const updatedStorageData = { ...prevDeviceDetails.storageData };
            updatedStorageData[storageId] = storagePrice;
            return {
                ...prevDeviceDetails,
                storageData: updatedStorageData
            };
        });
    };

    // function to validate fields & Submit form details
    const submitDeviceDetails = (action) => {

        // to validate & Submit
        if (!deviceDetails.device_name ||
            !deviceDetails.base_price ||
            !deviceDetails.device_type ||
            Object.values(deviceDetails.carrierData).filter(Boolean).length !== carriersArr.length ||
            Object.values(deviceDetails.conditionData).length !== selectedConditions.length ||
            Object.values(deviceDetails.storageData).length !== selectedStorages.length ||
            selectedConditions.length === 0 ||
            selectedStorages.length === 0
        ) {

            setValidationFlag(false);
        } else {

            setValidationFlag(true);
            setSubmitLoader(true);

            if (action === 'add') {

                axios.post('https://sell-iphone-backend-production.up.railway.app/api/admin/add-new-mobile', deviceDetails)
                    .then(res => {

                        if (res.data.status === 200) {

                            console.log("device added successfully - deviceDetails payload -> ", deviceDetails);
                            setSubmitLoader(false);
                            setModal(true);

                        } else {

                            console.log("failed to add device !! ");
                            setSubmitLoader(false);
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching storages data:', error);
                    });

            } else if (action === 'update') {

                axios.post(`https://sell-iphone-backend-production.up.railway.app/api/admin/update-mobile/${deviceDetails.device_id}`, deviceDetails)
                    .then(res => {

                        if (res.data.status === 200) {

                            console.log("device updated successfully - deviceDetails payload -> ", deviceDetails);
                            setSubmitLoader(false);
                            setModal(true);

                        } else {

                            console.log("failed to update device !! ");
                            setSubmitLoader(false);
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching storages data:', error);
                    });
            }
        }
    }

    // useEffect to set the carrier, condition & storage values for edit state
    useEffect(() => {
        deviceFormDetails.deviceForm.carrierData.forEach((carriersData, index) => {
            setCarriersDetails(carriersData.value, carriersData.price, index);
        });

        selectedConditions.forEach((condition, index) => {
            setConditionsDetails(condition.value, condition.price, index);
        });

        selectedStorages.forEach((storage, index) => {
            setStoragesDetails(storage.value, storage.price, index);
        });

    }, []);

    return (
        <div className='grid sm:grid-rows-10 gap-1'>

            {/* Header */}
            <div className='grid grid-cols-2 ml-5 mr-4 py-4 text-lg font-bold'>
                <div className='grid justify-items-start sm:text-xl text-slate-700'> {!deviceDetails.device_id ? "Add new device details" : "Update device details"} </div>
                <div className='col-span-1 grid justify-items-end'>
                    <ButtonMain
                        name="back"
                        buttonLable="Back to dashboard"
                        onClick={() => {
                            backToPreviousList.dispatch({ type: "deviceList" });
                            navigate('/dashboard')
                        }
                        }
                    />
                </div>
            </div>

            <div className="row-span-9 grid sm:grid-rows-8 shadow border border-slate-300 rounded-lg sm:ml-4 sm:mr-4 pt-5 pb-2" style={{ backgroundColor: '#F0F2F5' }}>

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
                                validationFlag === false && Object.values(deviceDetails.carrierData).filter(Boolean).length !== carriersArr.length &&
                                <ValidationMsg errorMsg="All carriers prices required" />
                            }
                        </div>
                    </div>

                    {
                        !loader ?

                            <div className='grid sm:grid-cols-4 gap-1 sm:justify-items-start sm:ml-4'>
                                {
                                    deviceFormDetails.deviceForm.carrierData.length > 0 ?

                                        deviceFormDetails.deviceForm.carrierData.map((carrierData, index) => (

                                            // console.log('salil',deviceDetails.carrierData[carrierData.value])
                                            <div key={index}>
                                                <InputField
                                                    key={carrierData.value}
                                                    label={carrierData.label}
                                                    name="carrierPrice"
                                                    id="carrierPrice"
                                                    type="number"
                                                    min={1}
                                                    value={deviceDetails.carrierData[carrierData.value]}
                                                    placeholder={"Enter " + carrierData.label + " price"}
                                                    onChange={(e) => setCarriersDetails(carrierData.value, e.target.value, index)}
                                                />
                                            </div>
                                        ))

                                        :

                                        carriersArr.map((carriersData, index) => (

                                            <div key={index}>
                                                <InputField
                                                    key={carriersData.carrier_id}
                                                    label={carriersData.carrier_name}
                                                    name="carrierPrice"
                                                    id="carrierPrice"
                                                    type="number"
                                                    min={1}
                                                    placeholder={"Enter " + carriersData.carrier_name + " price"}
                                                    onChange={(e) => setCarriersDetails(carriersData.carrier_id, e.target.value, index)}
                                                />
                                            </div>
                                        ))

                                }
                            </div>
                            :
                            <div className='grid ml-4 gap-2'>
                                <span className='text-lg font-semibold text-cyan-800'>Loading available carriers... </span>
                                <Loader />
                            </div>
                    }

                </div>

                {/* Form section - Storage & condition details */}
                <div className='row-span-5 grid sm:grid-cols-2 gap-1 justify-items-start ml-1 mr-1'>

                    {/* Condition details */}
                    <div className='grid sm:justify-items-start border-r border-dashed w-full pl-4 py-2 pt-4'>

                        {/* Multiselect box */}
                        <div>
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
                            {
                                validationFlag === false && selectedConditions.length === 0 &&
                                <ValidationMsg errorMsg="Select conditions" />
                            }
                        </div>

                        {/* Dynamic fields */}
                        <div className='grid sm:grid-rows-4 sm:grid-cols-3 sm:justify-items-start sm:text-left'>
                            {
                                selectedConditions.map((condition, index) => (

                                    <InputField
                                        key={condition.value}
                                        label={condition.label}
                                        name="conditionPrice"
                                        id="conditionPrice"
                                        type="number"
                                        min={1}
                                        value={deviceDetails.conditionData[condition.value]}
                                        placeholder={"Enter " + condition.label + " price"}
                                        onChange={(e) => setConditionsDetails(condition.value, e.target.value, index)}
                                    />
                                ))
                            }
                        </div>

                        {/* Validations */}
                        <div className='grid sm:justify-items-start'>
                            {
                                validationFlag === false && Object.values(deviceDetails.conditionData).length !== selectedConditions.length &&
                                <ValidationMsg errorMsg="All selected conditions prices required" />
                            }
                        </div>
                    </div>

                    {/* Storage details */}
                    <div className='grid sm:justify-items-start w-full pl-4 py-2 pt-4'>

                        {/* Multiselect box */}
                        <div>
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
                            {
                                validationFlag === false && selectedStorages.length === 0 &&
                                <ValidationMsg errorMsg="Select storages" />
                            }
                        </div>

                        {/* Dynamic fields */}
                        <div className='grid sm:grid-rows-4 sm:grid-cols-3 sm:justify-items-start sm:text-left'>
                            {
                                selectedStorages.map((storages, index) => (

                                    <InputField
                                        key={storages.value}
                                        label={storages.label}
                                        name="storagePrice"
                                        id="storagePrice"
                                        type="number"
                                        min={1}
                                        value={deviceDetails.storageData[storages.value]}
                                        placeholder={"Enter " + storages.label + " price"}
                                        onChange={(e) => setStoragesDetails(storages.value, e.target.value, index)}
                                    />
                                ))
                            }
                        </div>

                        {/* Validations */}
                        <div className='grid sm:justify-items-start'>
                            {
                                validationFlag === false && Object.values(deviceDetails.storageData).length !== selectedStorages.length &&
                                <ValidationMsg errorMsg="All selected storages prices required" />
                            }
                        </div>
                    </div>
                </div>

                {/* Form section - Submit button */}
                <div className='grid justify-items-center mt-1'>
                    {
                        !loader ?
                            !deviceDetails.device_id ?
                                !submitLoader ?
                                    <ButtonMain name='submit' buttonLable='Add device' color='green' onClick={() => submitDeviceDetails('add')} />
                                    :
                                    <div className='grid grid-rows-2 gap-1'>
                                        <Loader />
                                        <ButtonMain buttonLable='Adding device... ' color='green' />
                                    </div>

                                :
                                !submitLoader ?
                                    <ButtonMain name='submit' buttonLable='Update device' color='green' onClick={() => submitDeviceDetails('update')} />
                                    :
                                    <ButtonMain buttonLable='Updating device... ' color='green' />

                            :
                            <ButtonMain color='green' buttonLable='Wait unitl loading carriers...' />

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
                            {
                                !deviceDetails.device_id ?
                                    <span className='text-normal font-bold text-green-700'>Successfully added the new device details !!</span>
                                    :
                                    <span className='text-normal font-bold text-green-700'>{'Successfully updated the ' + deviceDetails.device_name + ' details !!'}</span>
                            }

                            <small className='text-xs font-bold text-green-600'>View the updated device list on dashboard</small>
                        </div>

                        <div className='grid justify-items-center'>
                            <ButtonMain
                                name="closeModal"
                                buttonLable="Ok go to dahborad"
                                onClick={() => {
                                    setModal(false);
                                    navigate('/dashboard');
                                    backToPreviousList.dispatch({ type: "deviceList" });
                                }}
                            />
                        </div>


                    </div>
                </Modal>
            }
        </div>
    )
}

export default Form