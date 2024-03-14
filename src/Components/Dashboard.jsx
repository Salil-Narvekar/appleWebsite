import React, { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { LoggedUserDetails } from '../App';
import Select from "react-dropdown-select";
import ListingTitle from './ListingTitle';
import ButtonMain from './ButtonMain'
import ListingPlates from './ListingPlates'
import { FaWpforms } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { MdDevicesOther } from "react-icons/md";

const Dashboard = () => {

    const navigate = useNavigate();
    const loggedUserDetails = useContext(LoggedUserDetails);

    const [showListing, setShowListing] = useState('submittedForms');
    const [showDevice, setShowDevice] = useState('Mobile');

    const logout = () => {
        console.log('logout')
        loggedUserDetails.dispatch({ type: "loggedOut", value: { username: '', password: '' } })
        navigate("/login");
    };

    // const devicesList = rolesArr.map((value, index) => (
    //     {
    //         deviceId: index,
    //         deviceName: value
    //     }
    // ))

    const devicesList = [
        {
            deviceId: 0,
            deviceName: "Mobile"
        },
        {
            deviceId: 1,
            deviceName: "Laptop"
        },
        {
            deviceId: 2,
            deviceName: "Watch"
        }
    ];

    const setDevice = (value) => {
        // console.log("SelectBox Value", value[0].deviceName)
        setShowDevice(value[0].deviceName);
    };


    return (

        <div className='grid sm:grid-rows-10 gap-1'>

            {/* Header */}
            <div className='grid grid-cols-2 ml-4 mr-4 py-4 text-lg font-bold'>
                <div className='grid justify-items-start'>Website name </div>
                <div className='col-span-1 grid justify-items-end'>
                    <ButtonMain
                        name="logout"
                        buttonLable="Logout"
                        onClick={() => logout()}
                    />
                </div>
            </div>

            {/* Dasboard panel */}
            <div className='row-span-9 sm:grid grid-cols-7 gap-1 border border-slate-300 items-start rounded-lg bg-sky-50 sm:ml-4 sm:mr-4'>

                {/* Dasboard left Nav */}
                <div className='grid sm:grid-rows-12 gap-1 rounded-lg bg-neutral-200 py-5 pl-4 pr-4 sm:h-full'>
                    <ButtonMain name="submittedForm" buttonLable="Submitted Forms" onClick={() => setShowListing('submittedForms')} />
                    <ButtonMain name="appointmentForm" buttonLable="Apointments" onClick={() => setShowListing('appointments')} />
                    <ButtonMain name="devices" buttonLable="Devices" onClick={() => { setShowListing('devices') }} />
                </div>

                {/* Dasboard right Listing*/}
                <div className='col-span-6 border rounded-lg py-4 pl-4 pr-4'>

                    {
                        showListing === 'submittedForms' ?

                            <div className='grid grid-rows-12 h-full'>
                                <div className='grid'>
                                    <ListingTitle titlename="Submitted Forms List" icon={<FaWpforms />} />
                                </div>

                                <div className='row-span-11 grid grid-rows-5 gap-2 h-full overflow-auto'>
                                    <ListingPlates
                                        contentLine1A='Device name'
                                        contentLine1B='Carrier name'
                                        contentLine1C='Storage'
                                        contentLine2A='User email'
                                        contentLine2B='Mobile number'
                                        contentLine2C='condition name'
                                        contentLine3A='Quoted Price'
                                        contentLine3B='device id'
                                        contentLine3C=''
                                    />
                                </div>
                            </div>


                            : showListing === "appointments" ?

                                <div className='grid grid-rows-12 h-full'>
                                    <div className='grid'>
                                        <ListingTitle titlename="Appointments List" icon={<FaClipboardList />} />
                                    </div>

                                    <div className='row-span-11 grid grid-rows-5 gap-2 h-full overflow-auto'>
                                        <ListingPlates
                                            contentLine1A='Email'
                                            contentLine1B='phone number'
                                            contentLine1C=''
                                            contentLine2A='shop address'
                                            contentLine2B=''
                                            contentLine2C=''
                                            contentLine3A='date'
                                            contentLine3B='time'
                                            contentLine3C=''
                                        />
                                    </div>
                                </div>


                                : showListing === "devices" &&

                                <div className='grid sm:grid-rows-12 h-full'>
                                    <div className='sm:grid grid-cols-4'>

                                        <ListingTitle titlename="Devices Details List" icon={<MdDevicesOther />} />

                                        <div className='col-span-3 grid justify-self-end'>
                                            <div className='grid grid-cols-2 gap-1 '>
                                                <label className='text-normal font-semibold text-slate-600'>Select Device: </label>
                                                <Select
                                                    className='bg-white text-slate-600 font-semibold text-xs text-left'
                                                    options={devicesList}
                                                    labelField="deviceName"
                                                    valueField="deviceId"
                                                    onChange={(values) => setDevice(values)}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='row-span-11 grid grid-rows-5 gap-2 h-full overflow-auto'>

                                        {
                                            showDevice === 'Mobile' ?

                                                <ListingPlates
                                                    contentLine1A='Mobile Device name'
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

                                                : showDevice === 'Laptop' ?

                                                    < ListingPlates
                                                        contentLine1A='Laptop Device name'
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

                                                    : showDevice === "Watch" &&
                                                    
                                                    <ListingPlates
                                                        contentLine1A='Watch Device name'
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