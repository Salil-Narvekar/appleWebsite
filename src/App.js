import React, { useReducer, createContext } from 'react'
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './Components/Login'
import Dashboard from './Components/Dashboard';
import Form from './Components/Form';
import StorageForm from './Components/StorageForm';
import ConditionForm from './Components/ConditionForm';
import CarrierForm from './Components/CarrierForm';

export const LoggedUserDetails = createContext();
export const DeviceFormDetails = createContext();
export const BackToPreviousList = createContext();

function App() {

  // Reducer function for fetching logged-In User details on login
  const initialUserState = {
    // userID: '',
    username: '',
    password: '',
  };

  const reducerUser = (state, action) => {
    switch (action.type) {
      case 'loggedIn':
        return {
          // userID: 'action.value.ID',
          username: action.value.username,
          password: action.value.Passwords,
        }
      // return console.log("loggedIn", action.value);

      case 'loggedOut':
        return initialUserState
      default:
        return initialUserState
    }
  }

  // Reducer function for fetching device details for edit
  const initialDeviceForm = {
    base_price: "",
    device_id: "",
    device_name: "",
    device_type: "",
    conditionData: [],
    storageData: [],
    carrierData: []
  };

  const reducerDeviceForm = (state, action) => {
    switch (action.type) {
      case 'edit':
        return {
          base_price: action.value.base_price,
          device_id: action.value.device_id,
          device_name: action.value.device_name,
          device_type: action.value.device_type,
          conditionData: action.value.conditionData,
          storageData: action.value.storageData,
          carrierData: action.value.carrierData
        }
      // return console.log("edit", action.value);
      case 'add':
        return initialDeviceForm;
      default:
        return initialDeviceForm;
    }
  }

  // Reducer function for go back to required listing
  const initialPreviousList = ''

  const reducerPreviousList = (state, action) => {
    switch (action.type) {
      case 'switchList':
        return action.value 
        // return console.log("listing", action.value);
      default:
        return initialPreviousList;
    }
  }

  const [loggedUser, dispatchUser] = useReducer(reducerUser, initialUserState);
  const [deviceForm, dispatchDeviceForm] = useReducer(reducerDeviceForm, initialDeviceForm);
  const [previousList, dispatchPreviousList] = useReducer(reducerPreviousList, initialPreviousList);

  return (
    <LoggedUserDetails.Provider value={{ loggedUser: loggedUser, dispatch: dispatchUser }}>
      <DeviceFormDetails.Provider value={{ deviceForm: deviceForm, dispatch: dispatchDeviceForm }}>
        <BackToPreviousList.Provider value={{ previousList: previousList, dispatch: dispatchPreviousList }}>

          <div className="text-center h-screen font-sans sm:overflow-hidden" style={{ backgroundColor: '#FFFFFF' }}>
            <HashRouter>
              <Routes>
                <Route path='/' element={<Navigate to='/login' />} />
                <Route path='/login' element={<Login />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/deviceForm' element={<Form />} />
                <Route path='/storageForm' element={<StorageForm />} />
                <Route path='/conditionForm' element={<ConditionForm />} />
                <Route path='/carrierForm' element={<CarrierForm />} />
              </Routes>
            </HashRouter>
          </div>

        </BackToPreviousList.Provider>
      </DeviceFormDetails.Provider>
    </LoggedUserDetails.Provider>
  );
}

export default App;
