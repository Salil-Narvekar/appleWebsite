import React, { useReducer, createContext } from 'react'
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './Components/Login'
import Dashboard from './Components/Dashboard';
import Form from './Components/Form';
import StorageForm from './Components/StorageForm';
import ConditionForm from './Components/ConditionForm';
import CarrierForm from './Components/CarrierForm';

export const LoggedUserDetails = createContext();
export const MobileFormDetails = createContext();
export const StorageFormDetails = createContext();
export const ConditionFormDetails = createContext();
export const CarrierFormDetails = createContext();

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
  //.............................................................................................................................


  // Reducer function for fetching Mobile device details for edit
  const initialMobileForm = {
    base_price: "",
    device_id: "",
    device_name: "",
    device_type: "",
    conditionData: [],
    storageData: [],
    carrierData: []
  };

  const reducerMobileForm = (state, action) => {
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
      // return console.log("Device edit", action.value);
      case 'add':
        return initialMobileForm;
      default:
        return initialMobileForm;
    }
  }
  //.............................................................................................................................


  // Reducer function for fetching storage details for edit
  const initialStorageForm = {
    storage_id: '',
    storage_value: '',
    storage_unit: '',
    storage_description: '',
    price: ''
  };

  const reducerStorageForm = (state, action) => {
    switch (action.type) {
      case 'edit':
        return {
          storage_id: action.value.storage_id,
          storage_value: action.value.storage_value,
          storage_unit: action.value.storage_unit,
          storage_description: action.value.storage_description,
          price: ''
        }
      // return console.log("Storage edit", action.value);
      case 'add':
        return initialStorageForm;
      default:
        return initialStorageForm;
    }
  }
  //.............................................................................................................................


  // Reducer function for fetching condition details for edit
  const initialConditionForm = {
    condition_id: '',
    condition_title: '',
    condition_description: '',
    price: ''
  };

  const reducerConditionForm = (state, action) => {
    switch (action.type) {
      case 'edit':
        return {
          condition_id: action.value.condition_id,
          condition_title: action.value.condition_title,
          condition_description: action.value.condition_description,
          price: ''
        }
      // return console.log("Condition edit", action.value);
      case 'add':
        return initialConditionForm;
      default:
        return initialConditionForm;
    }
  }
  //.............................................................................................................................


  // Reducer function for fetching carrier details for edit
  const initialCarrierForm = {
    carrier_id: '',
    carrier_name: '',
    price: '',
  };

  const reducerCarrierForm = (state, action) => {
    switch (action.type) {
      case 'edit':
        return {
          carrier_id: action.value.carrier_id,
          carrier_name: action.value.carrier_name,
          price: '',
        }
      // return console.log("Carrier edit", action.value);
      case 'add':
        return initialCarrierForm;
      default:
        return initialCarrierForm;
    }
  }
  //.............................................................................................................................


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
  //.............................................................................................................................


  const [loggedUser, dispatchUser] = useReducer(reducerUser, initialUserState);
  const [mobileForm, dispatchMobileForm] = useReducer(reducerMobileForm, initialMobileForm);
  const [storageForm, dispatchStorageForm] = useReducer(reducerStorageForm, initialStorageForm);
  const [conditionForm, dispatchConditionForm] = useReducer(reducerConditionForm, initialConditionForm);
  const [carrierForm, dispatchCarrierForm] = useReducer(reducerCarrierForm, initialCarrierForm);

  const [previousList, dispatchPreviousList] = useReducer(reducerPreviousList, initialPreviousList);

  return (
    <LoggedUserDetails.Provider value={{ loggedUser: loggedUser, dispatch: dispatchUser }}>
      <MobileFormDetails.Provider value={{ mobileForm: mobileForm, dispatch: dispatchMobileForm }}>
        <StorageFormDetails.Provider value={{ storageForm: storageForm, dispatch: dispatchStorageForm }}>
          <ConditionFormDetails.Provider value={{ conditionForm: conditionForm, dispatch: dispatchConditionForm }}>
            <CarrierFormDetails.Provider value={{ carrierForm: carrierForm, dispatch: dispatchCarrierForm }}>
              <BackToPreviousList.Provider value={{ previousList: previousList, dispatch: dispatchPreviousList }}>

                <div className="text-center h-screen font-sans sm:overflow-hidden" style={{ backgroundColor: '#FFFFFF' }}>
                  <HashRouter>
                    <Routes>
                      <Route path='/' element={<Navigate to='/login' />} />
                      <Route path='/login' element={<Login />} />
                      <Route path='/dashboard' element={<Dashboard />} />
                      <Route path='/mobileForm' element={<Form />} />
                      <Route path='/storageForm' element={<StorageForm />} />
                      <Route path='/conditionForm' element={<ConditionForm />} />
                      <Route path='/carrierForm' element={<CarrierForm />} />
                    </Routes>
                  </HashRouter>
                </div>

              </BackToPreviousList.Provider>
            </CarrierFormDetails.Provider>
          </ConditionFormDetails.Provider>
        </StorageFormDetails.Provider>
      </MobileFormDetails.Provider>
    </LoggedUserDetails.Provider>
  );
}

export default App;
