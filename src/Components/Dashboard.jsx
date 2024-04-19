import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { LoggedUserDetails, MobileFormDetails, StorageFormDetails, ConditionFormDetails, CarrierFormDetails, BackToPreviousList } from '../App';
import { FaWpforms } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { MdDevicesOther } from "react-icons/md";
import { MdSdStorage } from "react-icons/md";
import { MdGppGood } from "react-icons/md";
import { FaCheckToSlot } from "react-icons/fa6";
import axios from "axios";
import LoadingPlate from './LoadingPlate';
import Select from "react-dropdown-select";
import ListingTitle from './ListingTitle';
import ButtonMain from './ButtonMain'
import ListingPlates from './ListingPlates'
import NavContent from './NavContent';

const Dashboard = () => {

    const navigate = useNavigate();

    const loggedUserDetails = useContext(LoggedUserDetails);
    const mobileFormDetails = useContext(MobileFormDetails);
    const storageFormDetails = useContext(StorageFormDetails);
    const conditionFormDetails = useContext(ConditionFormDetails);
    const carrierFormDetails = useContext(CarrierFormDetails);
    const backToPreviousList = useContext(BackToPreviousList);

    const [showListing, setShowListing] = useState(backToPreviousList.previousList ? backToPreviousList.previousList : 'submittedForms');
    const [showDeviceType, setShowDeviceType] = useState('mobile');

    const [loader, setLoader] = useState(false);

    const [submittedFormListArr, setSubmittedFormListArr] = useState([]);
    const [appointmentListArr, setAppointmentListArr] = useState([]);
    const [devicesListArr, setDevicesListArr] = useState([]);
    const [storagesListArr, setStoragesListArr] = useState([]);
    const [conditionsListArr, setConditionsListArr] = useState([]);
    const [carriersListArr, setCarriersListArr] = useState([]);

    // useEffect to mount submitted forms list data
    useEffect(() => {

        if (showListing === 'submittedForms') {

            setLoader(true);
            const authToken = localStorage.getItem('authToken'); // get auth token from localstorage

            // uncomment this if statement to handle auth from frontend (if required) --
            // if (!authToken) {
            //     console.error('Authentication token not found in local storage');
            //     setLoader(false);
            //     navigate('/login');
            //     return;
            // }

            axios.get('https://sell-iphone-backend-production.up.railway.app/api/admin/get-all-forms',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${authToken}`,
                    }
                }
            )
                .then(res => {

                    if (res.data.data.length > 0) {
                        const submittedFormData = res.data.data;
                        setSubmittedFormListArr(submittedFormData);
                        setLoader(false);

                    } else {
                        console.log("submitted form data empty");
                        setSubmittedFormListArr([]);
                        setLoader(false);
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

    }, [showListing, navigate])

    // useEffect to mount appointment list data
    useEffect(() => {

        if (showListing === 'appointments') {

            setLoader(true);
            const authToken = localStorage.getItem('authToken'); // get auth token from localstorage

            axios.get('https://sell-iphone-backend-production.up.railway.app/api/admin/get-appointment-details',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${authToken}`,
                    }
                }
            )
                .then(res => {

                    if (res.data.data.length > 0) {
                        const appointmentData = res.data.data;
                        setAppointmentListArr(appointmentData);
                        setLoader(false);

                    } else {
                        console.log("Appointment data empty");
                        setAppointmentListArr([]);
                        setLoader(false);
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

    }, [showListing, navigate])

    // useEffect to mount device list data
    useEffect(() => {

        const authToken = localStorage.getItem('authToken'); // get auth token from localstorage

        if (showListing === 'devices' && showDeviceType === 'mobile') {

            setLoader(true);
            axios.get('https://sell-iphone-backend-production.up.railway.app/api/admin/get-all-devices/mobile',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${authToken}`,
                    }
                }
            )
                .then(res => {

                    if (res.data.data.length > 0) {
                        const devicesData = res.data.data;
                        setDevicesListArr(devicesData);
                        setLoader(false);

                    } else {
                        console.log("devices data empty");
                        setDevicesListArr([]);
                        setLoader(false);
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

        } else if (showListing === 'devices' && showDeviceType === 'laptop') {

            setLoader(true);
            axios.get('https://sell-iphone-backend-production.up.railway.app/api/admin/get-all-devices/laptop',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${authToken}`,
                    }
                }
            )
                .then(res => {

                    if (res.data.data.length > 0) {
                        const devicesData = res.data.data;
                        setDevicesListArr(devicesData);
                        setLoader(false);

                    } else {
                        console.log("devices data empty");
                        setDevicesListArr([]);
                        setLoader(false);
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

        } else if (showListing === 'devices' && showDeviceType === 'watch') {

            setLoader(true);
            axios.get('https://sell-iphone-backend-production.up.railway.app/api/admin/get-all-devices/watch',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${authToken}`,
                    }
                }
            )
                .then(res => {

                    if (res.data.data.length > 0) {
                        const devicesData = res.data.data;
                        setDevicesListArr(devicesData);
                        setLoader(false);

                    } else {
                        console.log("devices data empty");
                        setDevicesListArr([]);
                        setLoader(false);
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

    }, [showListing, showDeviceType, navigate])

    // useEffect to mount storages list data
    useEffect(() => {

        if (showListing === 'storages') {

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
                        setStoragesListArr(storagesData);
                        setLoader(false);

                    } else {
                        console.log("Storages data empty");
                        setStoragesListArr([]);
                        setLoader(false);
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

    }, [showListing, navigate])

    // useEffect to mount conditions list data
    useEffect(() => {

        if (showListing === 'conditions') {

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
                        setConditionsListArr(conditionsData);
                        setLoader(false);

                    } else {
                        console.log("Conditions data empty");
                        setConditionsListArr([]);
                        setLoader(false);
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

    }, [showListing, navigate])

    // useEffect to mount carriers list data
    useEffect(() => {

        if (showListing === 'carriers') {

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
                        setCarriersListArr(carriersData);
                        setLoader(false);

                    } else {
                        console.log("Carriers data empty");
                        setCarriersListArr([]);
                        setLoader(false);
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

    }, [showListing, navigate])

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
        setShowDeviceType(value[0].device_type);
    };

    // function to convert backend created & updated date data into date format
    const formatDate = (timestamp) => {

        if (!timestamp || !timestamp._seconds || !timestamp._nanoseconds) {
            return '';
        }

        const date = new Date(timestamp._seconds * 1000 + Math.floor(timestamp._nanoseconds / 1e6));
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        // console.log('Formatted Date:', `${day}/${month}/${year}`);
        return `${day}/${month}/${year}`;
    };

    // function to logout
    const logout = () => {

        loggedUserDetails.dispatch({ type: "loggedOut" })
        localStorage.removeItem('authToken');
        backToPreviousList.dispatch({ type: "switchList", value: 'submittedForms' });
        navigate("/login");
    };

    return (
        <div className='grid sm:grid-rows-10 gap-1'>

            {/* Header */}
            <div className='grid grid-cols-2 ml-5 mr-4 py-4 text-lg font-bold'>
                <div className='grid justify-items-start sm:text-xl text-slate-700'> Admin Dashboard </div>
                <div className='col-span-1 grid justify-items-end'>
                    <ButtonMain
                        name="logout"
                        buttonLable="Logout"
                        color='red'
                        onClick={() => logout()}
                    />
                </div>
            </div>

            {/* Dasboard panel */}
            <div className='row-span-9 sm:grid grid-cols-7 gap-1 shadow border border-slate-300 items-start rounded-lg sm:ml-4 sm:mr-4' style={{ backgroundColor: '#F0F2F5' }}>

                {/* Dasboard left Nav */}
                <div className='grid sm:grid-rows-12 gap-1 text-left rounded-lg py-5 pl-4 pr-4 sm:h-full' style={{ backgroundColor: '#001529' }}>
                    <NavContent title="Submitted forms" onClick={() => setShowListing('submittedForms')} />
                    <NavContent title="Apointments" onClick={() => setShowListing('appointments')} />
                    <NavContent title="Devices" onClick={() => setShowListing('devices')} />
                    <NavContent title="Storages" onClick={() => setShowListing('storages')} />
                    <NavContent title="Conditions" onClick={() => setShowListing('conditions')} />
                    <NavContent title="Carriers" onClick={() => setShowListing('carriers')} />
                </div>

                {/* Dasboard right Listing*/}
                <div className='col-span-6 rounded-lg py-4 pl-4 pr-4'>

                    {
                        showListing === 'submittedForms' ?

                            // Submitted form listing section
                            <div className='grid sm:grid-rows-12 h-full'>
                                <div className='grid'>
                                    <ListingTitle titlename="Submitted Forms List" icon={<FaWpforms />} />
                                </div>

                                <div className='row-span-11'>
                                    {
                                        !loader ?

                                            submittedFormListArr.length > 0 ?

                                                <div className='h-[34rem] overflow-auto'>
                                                    {
                                                        submittedFormListArr.map((formData, index) => (

                                                            <div className='mb-2' key={index}>
                                                                <ListingPlates
                                                                    contentLine1A={formData.device_name}
                                                                    contentLine1B={formData.contact_number}
                                                                    contentLine1C={formData.email_id}
                                                                    contentLine2A='Quoted Price:'
                                                                    contentLine2B='Storage:'
                                                                    contentLine2C='Condition:'
                                                                    contentLine2D='Carrier:'
                                                                    contentLine3A={"$" + formData.quoted_price}
                                                                    contentLine3B={formData.storage.storage_value ? formData.storage.storage_value + ' ' + formData.storage.storage_unit : ''}
                                                                    contentLine3C={formData.condition.condition_title ? formData.condition.condition_title : ''}
                                                                    contentLine3D={formData.carrier.carrier_name ? formData.carrier.carrier_name : ''}
                                                                    fetchEditItem=''
                                                                />
                                                            </div>
                                                        ))}
                                                </div>
                                                :
                                                <div className='h-[34rem] text-xl font-bold text-cyan-900 animate-pulse pt-4'> No Forms Submitted !! </div>
                                            :
                                            <LoadingPlate />
                                    }
                                </div>
                            </div>

                            : showListing === "appointments" ?

                                // appointments listing section
                                <div className='grid sm:grid-rows-12 h-full'>
                                    <div className='grid'>
                                        <ListingTitle titlename="Appointments List" icon={<FaClipboardList />} />
                                    </div>

                                    <div className='row-span-11'>
                                        {
                                            !loader ?

                                                appointmentListArr.length > 0 ?

                                                    <div className='h-[34rem] overflow-auto'>
                                                        {
                                                            appointmentListArr.map((appointmentData, index) => (

                                                                <div className='mb-2' key={index}>
                                                                    <ListingPlates
                                                                        contentLine1A={formatDate(appointmentData.date)}
                                                                        contentLine1B={'Time slot: ' + appointmentData.time_slot}
                                                                        contentLine1C={appointmentData.shop_address}
                                                                        contentLine2A={appointmentData.user_name}
                                                                        contentLine2B={appointmentData.contact_number}
                                                                        contentLine2C=''
                                                                        contentLine2D=''
                                                                        contentLine3A={appointmentData.email_id}
                                                                        contentLine3B=''
                                                                        contentLine3C=''
                                                                        contentLine3D=''
                                                                        fetchEditItem=''
                                                                    />
                                                                </div>
                                                            ))}
                                                    </div>
                                                    :
                                                    <div className='h-[34rem] text-xl font-bold text-cyan-900 animate-pulse pt-4'> No Appointments scheduled !! </div>
                                                :
                                                <LoadingPlate />


                                        }
                                    </div>
                                </div>

                                : showListing === "devices" ?

                                    // devices listing section
                                    <div className='grid sm:grid-rows-12 h-full'>
                                        <div className='sm:grid grid-cols-6'>

                                            <div className='grid'>
                                                <ListingTitle titlename="Devices Details List" icon={<MdDevicesOther />} />
                                            </div>

                                            <div className='col-span-1 ml-2 grid justify-self-start'>
                                                <ButtonMain
                                                    name='addDevice'
                                                    buttonLable='Add New Device'
                                                    onClick={() => {

                                                        if (showDeviceType === 'mobile') {
                                                            navigate('/mobileForm');

                                                        } else if (showDeviceType === 'laptop') {
                                                            navigate('/laptopForm');

                                                        } else if (showDeviceType === 'watch') {
                                                            navigate('/watchForm');
                                                        }

                                                        mobileFormDetails.dispatch({ type: "add" })
                                                    }}
                                                />
                                            </div>

                                            {/* device selection dropdown */}
                                            <div className='col-span-4 sm:grid justify-self-end'>
                                                <div className='grid sm:grid-cols-2 gap-1 '>
                                                    <label className='text-normal font-semibold text-slate-600'>Select Device: </label>
                                                    <Select
                                                        className='bg-white text-slate-600 font-semibold text-xs text-left'
                                                        options={devicesList}
                                                        labelField="deviceName"
                                                        valueField="device_type"
                                                        values={[
                                                            {
                                                                device_type: 'mobile',
                                                                deviceName: 'mobile'
                                                            }
                                                        ]}
                                                        onChange={(values) => setDevice(values)}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className='row-span-11'>
                                            {
                                                showDeviceType === 'mobile' ?

                                                    // mobile device lisiting section
                                                    !loader ?
                                                        devicesListArr.length > 0 ?
                                                            <div className='h-[34rem] overflow-auto'>
                                                                {
                                                                    devicesListArr.map((deviceData, index) => (

                                                                        <div className='mb-2' key={index}>
                                                                            <ListingPlates
                                                                                contentLine1A={deviceData.device_data.device_name}
                                                                                contentLine1B='Storages available:'
                                                                                contentLine1C='Conditions available:'
                                                                                contentLine2A={'$' + deviceData.device_data.base_price}
                                                                                contentLine2B={deviceData.storages.map(storage => `${storage.storage_value} ${storage.storage_unit}`).join(', ')}
                                                                                contentLine2C={deviceData.conditions.map(condition => `${condition.condition_title}`).join(', ')}
                                                                                contentLine2D={''}
                                                                                // contentLine3A=''
                                                                                // contentLine3B=''
                                                                                // contentLine3C=''
                                                                                buttonRequired='yes'
                                                                                dateTimeRequired='yes'
                                                                                createdDate={formatDate(deviceData.device_data.created_at)}
                                                                                updatedDate={formatDate(deviceData.device_data.updated_at)}
                                                                                fetchEditArr={deviceData.device_data}
                                                                                fetchEditConditionArr={deviceData.conditions}
                                                                                fetchEditStorageArr={deviceData.storages}
                                                                                fetchEditCarrierArr={deviceData.carriers}
                                                                                fetchEditItem='mobile'
                                                                            />
                                                                        </div>
                                                                    ))}
                                                            </div>
                                                            :
                                                            <div className='h-[34rem] text-xl font-bold text-cyan-900 animate-pulse pt-4'> No Mobile devices available !! </div>
                                                        :
                                                        <LoadingPlate />

                                                    : showDeviceType === 'laptop' ?

                                                        // laptop device lisiting section
                                                        !loader ?
                                                            devicesListArr.length > 0 ?
                                                                <div className='h-[34rem] overflow-auto'>
                                                                    {
                                                                        devicesListArr.map((deviceData, index) => (

                                                                            <div className='mb-2' key={index}>
                                                                                <ListingPlates
                                                                                    contentLine1A={deviceData.device_data.device_name}
                                                                                    contentLine1B='Storages available:'
                                                                                    contentLine1C='Conditions available:'
                                                                                    contentLine2A={'$' + deviceData.device_data.base_price}
                                                                                    contentLine2B={deviceData.storages.map(storage => `${storage.storage_value} ${storage.storage_unit}`).join(', ')}
                                                                                    contentLine2C={deviceData.conditions.map(condition => `${condition.condition_title}`).join(', ')}
                                                                                    contentLine2D={''}
                                                                                    // contentLine3A=''
                                                                                    // contentLine3B=''
                                                                                    // contentLine3C=''
                                                                                    buttonRequired='yes'
                                                                                    dateTimeRequired='yes'
                                                                                    createdDate={formatDate(deviceData.device_data.created_at)}
                                                                                    updatedDate={formatDate(deviceData.device_data.updated_at)}
                                                                                    fetchEditArr={deviceData.device_data}
                                                                                    fetchEditConditionArr={deviceData.conditions}
                                                                                    fetchEditStorageArr={deviceData.storages}
                                                                                    fetchEditCarrierArr={deviceData.carriers}
                                                                                    fetchEditItem='laptop'
                                                                                />
                                                                            </div>
                                                                        ))
                                                                    }
                                                                </div>
                                                                :
                                                                <div className='h-[34rem] text-xl font-bold text-cyan-900 animate-pulse pt-4'> No Mobile devices available !! </div>
                                                            :
                                                            <LoadingPlate />


                                                        : showDeviceType === "watch" &&

                                                            // watch device lisiting section
                                                            !loader ?
                                                            devicesListArr.length > 0 ?
                                                                <div className='h-[34rem] overflow-auto'>
                                                                    {
                                                                        devicesListArr.map((deviceData, index) => (

                                                                            <div className='mb-2' key={index}>
                                                                                <ListingPlates
                                                                                    contentLine1A={deviceData.device_data.device_name}
                                                                                    contentLine1B='Storages available:'
                                                                                    contentLine1C='Conditions available:'
                                                                                    contentLine2A={'$' + deviceData.device_data.base_price}
                                                                                    contentLine2B={deviceData.storages.map(storage => `${storage.storage_value} ${storage.storage_unit}`).join(', ')}
                                                                                    contentLine2C={deviceData.conditions.map(condition => `${condition.condition_title}`).join(', ')}
                                                                                    contentLine2D={''}
                                                                                    // contentLine3A=''
                                                                                    // contentLine3B=''
                                                                                    // contentLine3C=''
                                                                                    buttonRequired='yes'
                                                                                    dateTimeRequired='yes'
                                                                                    createdDate={formatDate(deviceData.device_data.created_at)}
                                                                                    updatedDate={formatDate(deviceData.device_data.updated_at)}
                                                                                    fetchEditArr={deviceData.device_data}
                                                                                    fetchEditConditionArr={deviceData.conditions}
                                                                                    fetchEditStorageArr={deviceData.storages}
                                                                                    fetchEditCarrierArr={deviceData.carriers}
                                                                                    fetchEditItem='watch'
                                                                                />
                                                                            </div>
                                                                        ))
                                                                    }
                                                                </div>
                                                                :
                                                                <div className='h-[34rem] text-xl font-bold text-cyan-900 animate-pulse pt-4'> No Mobile devices available !! </div>
                                                            :
                                                            <LoadingPlate />
                                            }
                                        </div>
                                    </div>

                                    : showListing === "storages" ?

                                        // storages listing section
                                        <div className='grid sm:grid-rows-12 h-full'>
                                            <div className='sm:grid grid-cols-8'>
                                                <div className='grid'>
                                                    <ListingTitle titlename="Storages List" icon={<MdSdStorage />} />
                                                </div>

                                                <div className='col-span-1 ml-2 grid justify-self-start'>
                                                    <ButtonMain
                                                        name='addStorage'
                                                        buttonLable='Add New Storage'
                                                        onClick={() => {
                                                            navigate('/storageForm');
                                                            storageFormDetails.dispatch({ type: "add" })
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <div className='row-span-11'>
                                                {
                                                    !loader ?

                                                        storagesListArr.length > 0 ?

                                                            <div className='h-[34rem] overflow-auto'>
                                                                {
                                                                    storagesListArr.map((storagesData, index) => (

                                                                        <div className='mb-2' key={index}>
                                                                            <ListingPlates
                                                                                contentLine1A={storagesData.storage_value + ' ' + storagesData.storage_unit}
                                                                                contentLine1B=''
                                                                                contentLine1C=''
                                                                                contentLine2A='Storage description: '
                                                                                contentLine2B={storagesData.storage_description ? storagesData.storage_description : 'N/A'}
                                                                                contentLine2C=''
                                                                                contentLine2D=''
                                                                                contentLine3A=''
                                                                                contentLine3B=''
                                                                                buttonRequired='yes'
                                                                                fetchEditArr={storagesData}
                                                                                fetchEditItem='storage'
                                                                            />
                                                                        </div>
                                                                    ))}
                                                            </div>
                                                            :
                                                            <div className='h-[34rem] text-xl font-bold text-cyan-900 animate-pulse pt-4'> No Storages available !! </div>
                                                        :
                                                        <LoadingPlate />

                                                }
                                            </div>
                                        </div>

                                        : showListing === "conditions" ?

                                            // conditions listing section
                                            <div className='grid sm:grid-rows-12 h-full'>
                                                <div className='sm:grid grid-cols-7'>
                                                    <div className='grid'>
                                                        <ListingTitle titlename="Conditions List" icon={<MdGppGood />} />
                                                    </div>

                                                    <div className='col-span-1 ml-2 grid justify-self-start'>
                                                        <ButtonMain
                                                            name='addCondition'
                                                            buttonLable='Add New Condition'
                                                            onClick={() => {
                                                                navigate('/conditionForm');
                                                                conditionFormDetails.dispatch({ type: "add" })
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                <div className='row-span-11'>
                                                    {
                                                        !loader ?

                                                            conditionsListArr.length > 0 ?

                                                                <div className='h-[34rem] overflow-auto'>
                                                                    {
                                                                        conditionsListArr.map((conditionData, index) => (

                                                                            <div className='mb-2' key={index}>
                                                                                <ListingPlates
                                                                                    contentLine1A={conditionData.condition_title}
                                                                                    contentLine1B=''
                                                                                    contentLine1C=''
                                                                                    contentLine2A='Condition description: '
                                                                                    contentLine2B={conditionData.condition_description ? conditionData.condition_description : 'N/A'}
                                                                                    contentLine2C=''
                                                                                    contentLine2D=''
                                                                                    contentLine3A=''
                                                                                    contentLine3B=''
                                                                                    buttonRequired='yes'
                                                                                    fetchEditArr={conditionData}
                                                                                    fetchEditItem='condition'
                                                                                />
                                                                            </div>
                                                                        ))}
                                                                </div>
                                                                :
                                                                <div className='h-[34rem] text-xl font-bold text-cyan-900 animate-pulse pt-4'> No Conditions available !! </div>
                                                            :
                                                            <LoadingPlate />
                                                    }
                                                </div>
                                            </div>

                                            : showListing === "carriers" &&

                                            // carriers listing section
                                            <div className='grid sm:grid-rows-12 h-full'>

                                                <div className='sm:grid grid-cols-8'>
                                                    <div className='grid'>
                                                        <ListingTitle titlename="Carriers List" icon={<FaCheckToSlot />} />
                                                    </div>

                                                    <div className='col-span-1 ml-2 grid justify-self-start'>
                                                        <ButtonMain
                                                            name='addCarrier'
                                                            buttonLable='Add New Carrier'
                                                            onClick={() => {
                                                                navigate('/carrierForm');
                                                                carrierFormDetails.dispatch({ type: "add" })
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                <div className='row-span-11'>
                                                    {
                                                        !loader ?

                                                            carriersListArr.length > 0 ?

                                                                <div className='h-[34rem] overflow-auto'>
                                                                    {
                                                                        carriersListArr.map((carriersData, index) => (

                                                                            <div className='mb-2' key={index}>
                                                                                <ListingPlates
                                                                                    contentLine1A={carriersData.carrier_name}
                                                                                    contentLine1B=''
                                                                                    contentLine1C=''
                                                                                    contentLine2A='Carrier description: '
                                                                                    contentLine2B={carriersData.condition_description ? carriersData.condition_description : 'N/A'}
                                                                                    contentLine2C=''
                                                                                    contentLine2D=''
                                                                                    contentLine3A=''
                                                                                    contentLine3B=''
                                                                                    buttonRequired='yes'
                                                                                    fetchEditArr={carriersData}
                                                                                    fetchEditItem='carrier'
                                                                                />
                                                                            </div>
                                                                        ))}
                                                                </div>
                                                                :
                                                                <div className='h-[34rem] text-xl font-bold text-cyan-900 animate-pulse pt-4'> No Carriers available !! </div>
                                                            :
                                                            <LoadingPlate />
                                                    }
                                                </div>
                                            </div>

                    }

                </div>
            </div>
        </div>
    )
}

export default Dashboard