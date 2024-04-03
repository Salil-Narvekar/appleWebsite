import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { LoggedUserDetails, DeviceFormDetails } from '../App';
import { FaWpforms } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { MdDevicesOther } from "react-icons/md";
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
    const deviceFormDetails = useContext(DeviceFormDetails);

    const [showListing, setShowListing] = useState('submittedForms');
    const [showDeviceType, setShowDeviceType] = useState('mobile');

    const [submittedFormListArr, setSubmittedFormListArr] = useState([]);
    const [appointmentListArr, setAppointmentListArr] = useState([]);
    const [devicesListArr, setDevicesListArr] = useState([]);

    // useEffect to mount submitted forms list data
    useEffect(() => {
        axios.get('https://sell-iphone-backend-production.up.railway.app/api/admin/get-all-forms')
            .then(res => {

                if (res.data.data.length > 0) {
                    const submittedFormData = res.data.data;
                    setSubmittedFormListArr(submittedFormData);
                } else {
                    console.log("submitted form data empty");
                    setSubmittedFormListArr([]);
                }

            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [])

    // useEffect to mount appointment list data
    useEffect(() => {
        axios.get('https://sell-iphone-backend-production.up.railway.app/api/admin/get-appointment-details')
            .then(res => {

                if (res.data.data.length > 0) {
                    const appointmentData = res.data.data;
                    setAppointmentListArr(appointmentData);
                } else {
                    console.log("Appointment data empty");
                    setAppointmentListArr([]);
                }

            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [])

    // useEffect to mount devices list data
    useEffect(() => {
        axios.get('https://sell-iphone-backend-production.up.railway.app/api/admin/get-all-devices/mobile')
            .then(res => {

                console.log('device list data', res.data.data);
                
                if (res.data.data.length > 0) {
                    const devicesData = res.data.data;
                    setDevicesListArr(devicesData);
                } else {
                    console.log("devices data empty");
                    setDevicesListArr([]);
                }

            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [])

    const logout = () => {
        console.log('logout')
        loggedUserDetails.dispatch({ type: "loggedOut", value: { username: '', password: '' } })
        navigate("/login");
    };

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
                    <NavContent title="Add storage" onClick={() => navigate('/storageForm')} />
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
                                                            />
                                                        </div>
                                                    ))}
                                            </div>
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
                                                                />
                                                            </div>
                                                        ))}
                                                </div>
                                                :
                                                <LoadingPlate />

                                        }
                                    </div>
                                </div>

                                : showListing === "devices" &&

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
                                                    navigate('/deviceForm');
                                                    deviceFormDetails.dispatch({ type: "add" })
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

                                                devicesListArr.length > 0 ?

                                                    // mobile device lisiting section
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
                                                                    />
                                                                </div>
                                                            ))}
                                                    </div>
                                                    :
                                                    <LoadingPlate />


                                                : showDeviceType === 'laptop' ?

                                                    // laptop device lisiting section
                                                    <ListingPlates
                                                        contentLine1A='Laptop Device Demo'
                                                        contentLine1B='Storage accepted'
                                                        contentLine1C='Condition accepted'
                                                        contentLine2A='base price'
                                                        contentLine2B=''
                                                        contentLine2C=''
                                                        contentLine3A=''
                                                        contentLine3B=''
                                                        contentLine3C=''
                                                        buttonRequired='yes'
                                                        dateTimeRequired='yes'
                                                        createdDate='dd/mm/yyyy'
                                                        updatedDate='dd/mm/yyyy'
                                                    />

                                                    : showDeviceType === "watch" &&

                                                    // watch device lisiting section
                                                    <ListingPlates
                                                        contentLine1A='Watch Device Demo'
                                                        contentLine1B='Storage accepted'
                                                        contentLine1C='Condition accepted'
                                                        contentLine2A='base price'
                                                        contentLine2B=''
                                                        contentLine2C=''
                                                        contentLine3A=''
                                                        contentLine3B=''
                                                        contentLine3C=''
                                                        buttonRequired='yes'
                                                        dateTimeRequired='yes'
                                                        createdDate='dd/mm/yyyy'
                                                        updatedDate='dd/mm/yyyy'
                                                    />
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