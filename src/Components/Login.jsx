import React, { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { LoggedUserDetails } from '../App';
import axios from "axios";
import Loader from './Loader'
import InputField from './InputField'
import ButtonMain from './ButtonMain'
import LoginHeader from './LoginHeader';
import ValidationMsg from './ValidationMsg';

const Login = () => {

  const navigate = useNavigate();
  const loggedUserDetails = useContext(LoggedUserDetails);

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [validationFlag, setValidationFlag] = useState();
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [loader, setLoader] = useState(false);

  const loginUser = () => {

    setLoader(true);

    // to validate & login
    if (!credentials.email || !credentials.password) {

      setValidationFlag(false);
      setLoader(false);

    } else {

      setValidationFlag(true);
      // console.log("credentials payload -> ", credentials);

      axios.post('https://sell-iphone-backend-production.up.railway.app/api/auth/login', credentials)
        .then(res => {

          if (res.data.status === true) {

            // auth token - localstorage 
            const authToken = res.data.data.token;
            localStorage.setItem('authToken', authToken);

            loggedUserDetails.dispatch({
              type: "loggedIn",
              value: {
                email: credentials.email,
                password: credentials.password,
                token: authToken
              }
            });

            setLoader(false);
            setInvalidCredentials(false);
            navigate("/dashboard");

          } else {

            setLoader(false);
            setInvalidCredentials(true);
            console.log("user not found / invalid credentials !! ");
          }
        })
        .catch(error => {
          console.error('login failed:', error);
        });
    }
  }

  return (

    <div className="grid sm:grid-rows-4 gap-20 justify-center">

      <LoginHeader />

      <div className='row-span-2 border rounded-2xl grid gap-5 justify-center content-center py-12 pl-20 pr-20 drop-shadow-lg' style={{ backgroundColor: '#F0F2F5' }}>

        {/* email */}
        <div className='h-16'>
          <InputField
            label="email"
            name="email"
            id="email"
            type="email"
            placeholder="Enter email"
            labelTop={true}
            onChange={(e) => {
              setInvalidCredentials(false);
              setCredentials((prevSetDetails) => ({
                ...prevSetDetails,
                email: e.target.value
              }));
            }}
          />

          {
            validationFlag === false && !credentials.email && !loader &&
            <ValidationMsg errorMsg="Email required" />
          }
        </div>

        {/* password */}
        <div className='h-16 mb-4'>
          <InputField
            label="password"
            name="password"
            id="password"
            type="password"
            placeholder="xxxxxx"
            labelTop={true}
            onChange={(e) => {
              setInvalidCredentials(false);
              setCredentials((prevSetDetails) => ({
                ...prevSetDetails,
                password: e.target.value
              }));
            }}
          />

          {
            validationFlag === false && !credentials.password && !loader &&
            <ValidationMsg errorMsg="Password required" />
          }
        </div>

        {/* login button & invalid credentials msg*/}
        <div className='h-12'>

          <div className='mb-3'>
            {
              !loader ?
                <ButtonMain
                  buttonLable="Login"
                  name="loginButton"
                  onClick={() => loginUser()}
                />
                :
                <Loader />
            }
          </div>

          <div>
            {
              invalidCredentials && !loader &&
              <span className='text-red-700 text-md font-semibold animate-pulse'> Invalid credentials, Try again !! </span>
            }
          </div>
        </div>

      </div>
    </div>

  )
}

export default Login