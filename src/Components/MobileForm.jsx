import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { MobileFormDetails, BackToPreviousList } from '../App';
import { MultiSelect } from "react-multi-select-component";
import axios from "axios";
import Modal from 'react-modal';
import ButtonMain from './ButtonMain'
import InputField from './InputField';
import ValidationMsg from './ValidationMsg';
import Loader from './Loader';
// import Select from 'react-dropdown-select';

const MobileForm = () => {
    const navigate = useNavigate();
    const mobileFormDetails = useContext(MobileFormDetails);
    const backToPreviousList = useContext(BackToPreviousList);

    const [deviceDetails, setDeviceDetails] = useState({
        base_price: mobileFormDetails.mobileForm.base_price ? mobileFormDetails.mobileForm.base_price : '',
        device_id: mobileFormDetails.mobileForm.device_id ? mobileFormDetails.mobileForm.device_id : '',
        device_name: mobileFormDetails.mobileForm.device_name ? mobileFormDetails.mobileForm.device_name : '',
        device_type: mobileFormDetails.mobileForm.device_type ? mobileFormDetails.mobileForm.device_type : 'mobile',
        carrierData: {},
        conditionData: {},
        storageData: {},
        image_url: mobileFormDetails.mobileForm.image_url ? mobileFormDetails.mobileForm.image_url : ""
    });

    const [validationFlag, setValidationFlag] = useState();
    const [loader, setLoader] = useState(false);
    const [submitLoader, setSubmitLoader] = useState(false);
    const [modal, setModal] = useState(false);

    const [carriersArr, setCarriersArr] = useState([]);
    const [storagesArrData, setStoragesArrData] = useState([]);
    const [conditionsArrData, setConditionsArrData] = useState([]);

    const [selectedConditions, setSelectedConditions] = useState(mobileFormDetails.mobileForm.conditionData.length > 0 ? mobileFormDetails.mobileForm.conditionData : []);
    const [selectedStorages, setSelectedStorages] = useState(mobileFormDetails.mobileForm.storageData.length > 0 ? mobileFormDetails.mobileForm.storageData : []);

    // useEffect to mount carriers data
    useEffect(() => {

        setLoader(true);
        const authToken = localStorage.getItem('authToken'); // get auth token from localstorage

        axios.get('https://sell-iphone-backend-production.up.railway.app/api/device/get-all-carriers',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${authToken}`,
                }
            }
        )
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

                if (error.response.status === 401) {

                    console.error('Unauthorised User - Auth token not found');
                    localStorage.removeItem('authToken');
                    navigate('/login');
                    setLoader(false);

                } else {
                    console.error('Error fetching data:', error.response);
                }
            });

    }, [navigate])

    // useEffect to mount conditions data
    useEffect(() => {

        setLoader(true);
        const authToken = localStorage.getItem('authToken'); // get auth token from localstorage

        axios.get('https://sell-iphone-backend-production.up.railway.app/api/admin/all-conditions',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${authToken}`,
                }
            }
        )
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

                if (error.response.status === 401) {

                    console.error('Unauthorised User - Auth token not found');
                    localStorage.removeItem('authToken');
                    navigate('/login');
                    setLoader(false);

                } else {
                    console.error('Error fetching data:', error.response);
                }
            });

    }, [navigate])

    // useEffect to mount storages data
    useEffect(() => {

        setLoader(true);
        const authToken = localStorage.getItem('authToken'); // get auth token from localstorage

        axios.get('https://sell-iphone-backend-production.up.railway.app/api/admin/all-storages',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${authToken}`,
                }
            }
        )
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

                if (error.response.status === 401) {

                    console.error('Unauthorised User - Auth token not found');
                    localStorage.removeItem('authToken');
                    navigate('/login');
                    setLoader(false);

                } else {
                    console.error('Error fetching data:', error.response);
                }
            });

    }, [navigate])

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

    // function to validate fields & Submit form details
    const submitDeviceDetails = (action) => {

        console.log(deviceDetails)

        // to validate & Submit
        if (!deviceDetails.device_name ||
            !deviceDetails.base_price ||
            !deviceDetails.device_type ||
            Object.values(deviceDetails.carrierData).filter(Boolean).length !== carriersArr.length ||
            Object.values(deviceDetails.conditionData).filter(Boolean).length !== selectedConditions.length ||
            Object.values(deviceDetails.storageData).filter(Boolean).length !== selectedStorages.length ||
            selectedConditions.length === 0 ||
            selectedStorages.length === 0
        ) {

            setValidationFlag(false);
        } else {

            setValidationFlag(true);
            setSubmitLoader(true);

            const authToken = localStorage.getItem('authToken'); // get auth token from localstorage

            if (action === 'add') {

                axios.post('https://sell-iphone-backend-production.up.railway.app/api/admin/add-new-mobile', deviceDetails,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `${authToken}`,
                        }
                    }
                )
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

                        if (error.response.status === 401) {

                            console.error('Unauthorised User - Auth token not found');
                            localStorage.removeItem('authToken');
                            navigate('/login');
                            setLoader(false);

                        } else {
                            console.error('Error fetching data:', error.response);
                        }
                    });


            } else if (action === 'update') {

                axios.put(`https://sell-iphone-backend-production.up.railway.app/api/admin/update-mobile/${deviceDetails.device_id}`, deviceDetails,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `${authToken}`,
                        }
                    }
                )
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

                        if (error.response.status === 401) {

                            console.error('Unauthorised User - Auth token not found');
                            localStorage.removeItem('authToken');
                            navigate('/login');
                            setLoader(false);

                        } else {
                            console.error('Error fetching data:', error.response);
                        }
                    });

            }
        }
    }

    // function to set  carrierData details
    const setCarriersDetails = (carrierId, carrierPrice, index) => {
        setDeviceDetails(prevDeviceDetails => {
            const updatedCarrierData = { ...prevDeviceDetails.carrierData };
            updatedCarrierData[carrierId] = carrierPrice;
            return {
                ...prevDeviceDetails,
                carrierData: updatedCarrierData
            };
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

    // Function to handle image upload
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Create FormData object
        const formData = new FormData();
        formData.append('image', file);

        try {
            // Send image to the image upload API
            // const response = await fetch('http://localhost:8001/api/admin/upload-image', {
            //     method: 'POST',
            //     body: formData
            // });

            const authToken = localStorage.getItem('authToken');

            const response = await axios.post('https://sell-iphone-backend-production.up.railway.app/api/admin/upload-image', formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${authToken}`,
                    }
                }
            )

            console.log("image response", response);
            // Assuming the image upload API returns a JSON object with the URL
            // const data = await response.json();
            let image_url = response.data.data.imageUrl
            console.log("image Url: ", image_url)
            // Set the uploaded image URL in state
            // setImageUrl(image_url);
            setDeviceDetails((prevSetDetails) => ({
                ...prevSetDetails,
                image_url: image_url
            }));

        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    // useEffect to set the carrier values for edit state
    useEffect(() => {

        mobileFormDetails.mobileForm.carrierData.forEach((carriersData, index) => {
            setCarriersDetails(carriersData.value, carriersData.price, index);
        });

    }, [mobileFormDetails]);

    // useEffect to set the condition values for edit state
    useEffect(() => {

        selectedConditions.forEach((condition, index) => {
            setConditionsDetails(condition.value, condition.price, index);
        });

    }, [selectedConditions]);

    // useEffect to set the storage values for edit state
    useEffect(() => {

        selectedStorages.forEach((storage, index) => {
            setStoragesDetails(storage.value, storage.price, index);
        });

    }, [selectedStorages]);

    return (
        <div className='grid sm:grid-rows-10 gap-1'>

            {/* Header */}
            <div className='grid grid-cols-2 ml-5 mr-4 py-4 text-lg font-bold'>
                <div className='grid justify-items-start sm:text-xl text-slate-700'> {!deviceDetails.device_id ? "Add new mobile details" : "Update mobile details"} </div>
                <div className='col-span-1 grid justify-items-end'>
                    <ButtonMain
                        name="back"
                        buttonLable="Back to dashboard"
                        onClick={() => {
                            backToPreviousList.dispatch({ type: "switchList", value: 'devices' });
                            navigate('/dashboard')
                        }}
                    />
                </div>
            </div>

            <div className="row-span-9 grid sm:grid-rows-8 shadow border border-slate-300 rounded-lg sm:ml-4 sm:mr-4 pt-5 pb-2" style={{ backgroundColor: '#F0F2F5' }}>

                {/* Form section - Device details */}
                <div className='row-span-1 grid sm:grid-cols-12 gap-1 sm:justify-items-start ml-4 mr-4'>
                    <div className='col-span-3'>
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

                    <div className='col-span-3'>
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

                    <div className='col-span-2'>
                        <div className='grid sm:grid-cols-2 gap-1 '>
                            <label className='sm:text-md font-bold text-slate-600'>Device type: </label>
                            <span className='text-slate-600 font-bold text-md'>{deviceDetails.device_type}</span>
                            {/* <Select
                                className='bg-white text-slate-600 font-semibold text-sm text-left'
                                options={devicesList}
                                labelField="deviceName"
                                valueField="device_type"
                                values={[
                                    {
                                        device_type: mobileFormDetails.mobileForm.device_type,
                                        deviceName: mobileFormDetails.mobileForm.device_type
                                    }
                                ]}
                                onChange={(values) => setDevice(values)}
                            /> */}
                        </div>

                        {
                            validationFlag === false && !deviceDetails.device_type &&
                            <ValidationMsg errorMsg="Select device type" />
                        }
                    </div>

                    {/* sadil - Image upload section */}
                    <div className='col-span-4'>
                        <div className='grid sm:grid-cols-4 gap-2'>
                            <label className='sm:text-md font-bold text-slate-600'>Device image: </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className='col-span-2 py-2 pl-2 h-12 border border-slate-300 rounded-md text-black bg-neutral-50
                                transition duration-500 ease-in-out hover:scale-95 text-slate-600 font-semibold focus:outline-none focus:border-slate-500'
                            />
                            <div className='col-span-1'>
                                {
                                    <img src={deviceDetails.image_url} alt="View uploaded img here" className="h-10 md:h-10 lg:h-full xl:h-full w-21 md:w-10 lg:w-full xl:w-full object-cover border border-slate-300 rounded text-xs" />
                                }
                            </div>
                        </div>
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
                                    mobileFormDetails.mobileForm.carrierData.length > 0 ?

                                        mobileFormDetails.mobileForm.carrierData.map((carrierData, index) => (

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
                                validationFlag === false && Object.values(deviceDetails.conditionData).filter(Boolean).length !== selectedConditions.length &&
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
                                validationFlag === false && Object.values(deviceDetails.storageData).filter(Boolean).length !== selectedStorages.length &&
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
                    ariaHideApp={false}
                    className="flex items-center justify-center h-screen bg-gray-950 bg-opacity-50"
                >
                    <div className='grid sm:grid-rows-2 gap-2 rounded-2xl bg-white py-6 pl-20 pr-20'>

                        {/* Modal description */}
                        <div className='grid justify-items-center'>
                            {
                                !deviceDetails.device_id ?
                                    <span className='text-normal font-bold text-green-700'>Successfully added the new device details !!</span>
                                    :
                                    <span className='text-normal font-bold text-green-700'>{'Successfully updated the ' + deviceDetails.device_name + ' details !!'}</span>
                            }

                            <small className='text-xs font-bold text-green-600'>View the updated devices list on dashboard</small>
                        </div>

                        {/* Modal buttons */}
                        <div className='grid justify-items-center'>
                            <ButtonMain
                                name="closeModal"
                                buttonLable="Return To Dashboard"
                                onClick={() => {
                                    setModal(false);
                                    navigate('/dashboard');
                                    backToPreviousList.dispatch({ type: "switchList", value: 'devices' });
                                }}
                            />
                        </div>

                    </div>
                </Modal>
            }
        </div>
    )
}

export default MobileForm