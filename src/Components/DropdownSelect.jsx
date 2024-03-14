import React from 'react'
import Select from "react-dropdown-select";

const DropdownSelect = () => {
    return (
        <div className=''>
            <label>Select Device: </label>
            <Select
                options={devicesList}
                labelField="deviceName"
                valueField="deviceId"
                onChange={(values) => setDevice(values)}
            />
        </div>
    )
}

export default DropdownSelect