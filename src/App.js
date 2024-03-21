import React, {useReducer, createContext} from 'react'
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './Components/Login'
import Dashboard from './Components/Dashboard';
import Form from './Components/Form';

export const LoggedUserDetails = createContext();

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

  const [loggedUser, dispatchUser] = useReducer(reducerUser, initialUserState);

  return (
    <LoggedUserDetails.Provider value={{ loggedUser: loggedUser, dispatch: dispatchUser }}>

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

    </LoggedUserDetails.Provider>
  );
}

export default App;
