import React, { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { LoggedUserDetails } from '../App';
import Loader from './Loader'
import InputField from './InputField'
import ButtonMain from './ButtonMain'
import LoginHeader from './LoginHeader';

const Login = () => {

  const navigate = useNavigate();
  const loggedUserDetails = useContext(LoggedUserDetails);

  const [username, setUsername] = useState('');
  const [userPass, setUserPass] = useState('');
  const [validateUsernameFlag, setValidateUsernameFlag] = useState(false);
  const [validatePassFlag, setValidatePassFlag] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState('');

  const [loader, setLoader] = useState(false);

  const showLoading = () => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  };

  const storeUsernameValue = (emailValue) => {
    setUsername(emailValue);
  };

  const storePassValue = (passValue) => {
    setUserPass(passValue);
  };

  const loginUser = (e) => {
    e.preventDefault();
    showLoading();

    if (username && userPass) {

      if (username === "salil" && userPass === "11") {

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);

        loggedUserDetails.dispatch({ type: "loggedIn", value: { username: username, password: userPass } });

      } else {
        setInvalidCredentials('Invalid credentials, Try again !!')
      }

    } else {

      if (!username) {
        setValidateUsernameFlag(true);
      } else if (!userPass) {
        setValidatePassFlag(true);
      }
    }

  }

  return (

    <div className="grid sm:grid-rows-4 gap-20 justify-center">

      <LoginHeader />

      <form onSubmit={loginUser} className='row-span-2 border rounded-2xl grid gap-5 justify-center content-center py-12 pl-20 pr-20 drop-shadow-lg' style={{ backgroundColor: '#F0F2F5' }}>

        <div className='h-16'>

          <InputField
            label="username"
            name="username"
            id="username"
            type="text"
            placeholder="Enter username"
            labelTop={true}
            onChange={(e) => {
              setInvalidCredentials('');
              setValidateUsernameFlag(false);
              storeUsernameValue(e.target.value);
            }}
          />

          {
            validateUsernameFlag && !loader &&
            <span className='text-red-700 text-xs text-left grid justify-end'>Username required</span>
          }
        </div>

        <div className='h-16 mb-4'>
          <InputField
            label="password"
            name="password"
            id="password"
            type="password"
            placeholder="xxxxxx"
            labelTop={true}
            onChange={(e) => {
              setInvalidCredentials('');
              setValidatePassFlag(false);
              storePassValue(e.target.value);
            }}
          />

          {
            validatePassFlag && !loader &&
            <span className='text-red-700 text-xs text-left grid justify-end'>Password required</span>
          }
        </div>


        {
          !loader ?
            <ButtonMain
              buttonLable="Login"
              name="loginButton"
            />
            :
            <Loader />
        }

        {
          invalidCredentials !== '' && !loader &&
          <span className='text-red-700 text-md font-semibold animate-pulse'> {invalidCredentials} </span>
        }

      </form>
    </div>

  )
}

export default Login