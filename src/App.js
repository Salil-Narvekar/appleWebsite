import React, { useReducer, createContext } from 'react'
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './Components/Login'
import Dashboard from './Components/Dashboard';
import Form from './Components/Form';

export const LoggedUserDetails = createContext();
export const DeviceFormDetails = createContext();

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
    condition_accepted: [],
    device_id: "",
    device_name: "",
    device_type: "",
    storage_accepted: []
  };

  const reducerDeviceForm = (state, action) => {
    switch (action.type) {
      case 'edit':
        return {
          base_price: action.value.base_price,
          condition_accepted: [],
          device_id: action.value.device_id,
          device_name: action.value.device_name,
          device_type: action.value.device_type,
          storage_accepted: []
        }
        // return console.log("edit", action.value);

      default:
        return initialDeviceForm
    }
  }

  const [loggedUser, dispatchUser] = useReducer(reducerUser, initialUserState);
  const [deviceForm, dispatchDeviceForm] = useReducer(reducerDeviceForm, initialDeviceForm);

  return (
    <LoggedUserDetails.Provider value={{ loggedUser: loggedUser, dispatch: dispatchUser }}>
      <DeviceFormDetails.Provider value={{ deviceForm: deviceForm, dispatch: dispatchDeviceForm }}>

        <div className="text-center h-screen font-sans sm:overflow-hidden bg-sky-100">
          <HashRouter>
            <Routes>
              <Route path='/' element={<Navigate to='/login' />} />
              <Route path='/login' element={<Login />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/deviceForm' element={<Form />} />
            </Routes>
          </HashRouter>
        </div>

      </DeviceFormDetails.Provider>
    </LoggedUserDetails.Provider>
  );
}

export default App;
