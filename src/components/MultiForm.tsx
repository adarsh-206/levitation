import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SweetAlert from './SweetAlert';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const MultiForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [address1, setAddress1] = useState<string>('');
  const [address2, setAddress2] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [pincode, setPinCode] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [geolocationStatus, setGeolocationStatus] = useState<string>('');
  const [singleFile, setSingleFile] = useState<File | null>(null);
  const [multipleFiles, setMultipleFiles] = useState<File[]>([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    if(!localStorage.getItem('authToken')) {
       nav('/') 
    }
  }, []); 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUserName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'phone') {
      setPhoneNumber(value);
    } else if (name === 'address1') {
      setAddress1(value);
    } else if (name === 'address2') {
      setAddress2(value);
    } else if (name === 'city') {
      setCity(value);
    } else if (name === 'state') {
      setState(value);
    } else if (name === 'pincode') {
      setPinCode(value);
    } else if (name === 'country') {
      setCountry(value);
    } else if(name === 'singlefile') {
      setSingleFile(e.target.files?.[0] || null)
    } else if(name === 'multiplefile') {
      setMultipleFiles(Array.from(e.target.files || []))
    }
  };

  const handleGeolocationCapture = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setGeolocationStatus(`${latitude}, ${longitude}`);
      },
      (error) => {
        setGeolocationStatus('Geolocation capture failed');
        console.log(error);
        
      }
    );
  };

  function showErrorToast(message: string) {
    toast.error(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    // Field validations with regex expressions
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneNumberRegex = /^91\d{10}$/;
    const pincodeRegex = /^\d{6}$/;
    const stateRegex = /^[a-zA-Z\s]+$/;
    const countryRegex = /^[a-zA-Z\s]+$/;
    const cityRegex = /^[a-zA-Z\s]+$/;
    const addressRegex = /^[a-zA-Z0-9\s]+$/;
    if (!userName || !email || !phoneNumber || !address1 || !city || !state || !pincode || !country) {
      showErrorToast("⚠️ Please enter required fields ");
    } else if(!emailRegex.test(email)) {
      showErrorToast("⚠️ Please enter a valid email address");
    } else if (!phoneNumberRegex.test(phoneNumber)) {
      showErrorToast("⚠️ Please enter a valid 10-digit phone number");
    } else if (!pincodeRegex.test(pincode)) {
      showErrorToast("⚠️ Please enter a valid 6-digit pincode");
    } else if(!stateRegex.test(state)) {
      showErrorToast("⚠️ Please enter a valid state");
    } else if (!countryRegex.test(country)) {
      showErrorToast("⚠️ Please enter a valid country");
    } else if (!cityRegex.test(city)) {
      showErrorToast("⚠️ Please enter a valid city");
    } else if (!addressRegex.test(address1)) {
      showErrorToast("⚠️ Please enter a valid address line 1");
    } else if (!addressRegex.test(address2)) {
      showErrorToast("⚠️ Please enter a valid address line 2");
    } else {

    const formData = new FormData();

    // Append all data
    formData.append('name', userName);
    formData.append('email', email);
    formData.append('phone_number', phoneNumber);
    formData.append('address_1', address1);
    formData.append('address_2', address2);
    formData.append('city', city);
    formData.append('state', state);
    formData.append('pincode', pincode);
    formData.append('country', country);
    formData.append('geolocation', geolocationStatus);

    // Append single file to FormData
    if (singleFile) {
      formData.append('single_file', singleFile);
    }

    // Append multiple files to FormData
    multipleFiles.forEach((file, index) => {
      formData.append(`multi_ups${index}`, file);
    });
    

    try {
      const response = await axios.post('https://x8ki-letl-twmt.n7.xano.io/api:XooRuQbs/form', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem("authToken")}`
        },
      });
      if (response.data) {
        setIsSubmit(true);
      } else {
        setIsSubmit(false);
      }
    } catch (error) {
      console.error(error);
    }

    // Clear form fields and file inputs
    setEmail('');
    setUserName('');
    setPhoneNumber('');
    setAddress1('');
    setAddress2('');
    setCity('');
    setState('');
    setPinCode('');
    setCountry('');
    setSingleFile(null);
    setMultipleFiles([]);
    setGeolocationStatus('');
  }
  };

  const handleReset = (): void => {
    setEmail('');
    setUserName('');
    setPhoneNumber('');
    setAddress1('');
    setAddress2('');
    setCity('');
    setState('');
    setPinCode('');
    setCountry('');
    setSingleFile(null);
    setMultipleFiles([]);
    setGeolocationStatus('');
  };

  const handlePhoneChange = (value: any) => {
    setPhoneNumber(value);
  };

  const handleLogOut = () => {
    localStorage.clear();
    nav('/')
  }

  return (
    <>
    <h1 className='text-2xl font-bold pb-5 text-gray-700'>Multi Form</h1>
    <div className="flex items-center justify-center h-screen m-6">
      <form onSubmit={handleSubmit} className="bg-white drop-shadow-md rounded px-8 pt-6 pb-8 mx-auto grid grid-cols-2 gap-7">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
          <label
              className={`block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4 ${
                !userName ? 'required-field' : ''
              }`}
              htmlFor="username"
            >
              Name{!userName && <span className="required-star text-red-500 pl-1">*</span>}
          </label>
          </div>
          <div className="md:w-2/3">
            <input
              type="text"
              id="username"
              name="username"
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              placeholder="Enter your User Name"
              value={userName}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className={`block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4 ${
                !email ? 'required-field' : ''
              }`}
              htmlFor="email"
            >
              Email{!email && <span className="required-star text-red-500 pl-1">*</span>}
          </label>
          </div>
          <div className="md:w-2/3">
            <input
              type="email"
              id="email"
              name="email"
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              placeholder="Enter your email"
              value={email}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className={`block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4 ${
                !phoneNumber ? 'required-field' : ''
              }`}
              htmlFor="phone"
            >
              Phone Number{!phoneNumber && <span className="required-star text-red-500 pl-1">*</span>}
          </label>
          </div>
          <div className="md:w-2/3">
            <PhoneInput
              country={'in'}
              value={phoneNumber}
              inputProps={{
                className: 'bg-gray-200 appearance-none border-2 w-full border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500',
                style: { paddingLeft: '2.5rem' }
              }}
              dropdownStyle={{ top: '2.8rem' }}
              onChange={handlePhoneChange}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className={`block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4 ${
                !address1 ? 'required-field' : ''
              }`}
              htmlFor="address1"
            >
              Address Line 1{!address1 && <span className="required-star text-red-500 pl-1">*</span>}
          </label>
          </div>
          <div className="md:w-2/3">
            <input
              type="text"
              id="address1"
              name="address1"
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              placeholder="Enter Address Line 1"
              value={address1}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className={`block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4 ${
                !address2 ? 'required-field' : ''
              }`}
              htmlFor="address2"
            >
              Address Line 2{!address2 && <span className="required-star text-red-500 pl-1">*</span>}
          </label>
          </div>
          <div className="md:w-2/3">
            <input
              type="text"
              id="address2"
              name="address2"
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              placeholder="Enter Address Line 2"
              value={address2}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className={`block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4 ${
                !city ? 'required-field' : ''
              }`}
              htmlFor="city"
            >
              City{!city && <span className="required-star text-red-500 pl-1">*</span>}
          </label>
          </div>
          <div className="md:w-2/3">
            <input
              type="text"
              id="city"
              name="city"
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              placeholder="Enter your city"
              value={city}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className={`block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4 ${
                !state ? 'required-field' : ''
              }`}
              htmlFor="state"
            >
              State{!state && <span className="required-star text-red-500 pl-1">*</span>}
          </label>
          </div>
          <div className="md:w-2/3">
            <input
              type="text"
              id="state"
              name="state"
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              placeholder="Enter your state"
              value={state}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
          <label
              className={`block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4 ${
                !pincode ? 'required-field' : ''
              }`}
              htmlFor="pincode"
            >
              Pin Code{!pincode && <span className="required-star text-red-500 pl-1">*</span>}
          </label>
          </div>
          <div className="md:w-2/3">
            <input
              type="text"
              id="pincode"
              name="pincode"
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              placeholder="Enter your pin code"
              value={pincode}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
          <label
              className={`block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4 ${
                !country ? 'required-field' : ''
              }`}
              htmlFor="country"
            >
              Country{!country && <span className="required-star text-red-500 pl-1">*</span>}
          </label>
          </div>
          <div className="md:w-2/3">
            <input
              type="text"
              id="country"
              name="country"
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              placeholder="Enter your country"
              value={country}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
          <label
              className={`block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4 ${
                !singleFile ? 'required-field' : ''
              }`}
              htmlFor="singlefile"
            >
              Upload File{!singleFile && <span className="required-star text-red-500 pl-1">*</span>}
          </label>
          </div>
          <div className="md:w-2/3">
            <input
              type="file"
              id="singlefile"
              name="singlefile"
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              accept=".png,.pdf"
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
          <label
              className={`block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4 ${
                !multipleFiles ? 'required-field' : ''
              }`}
              htmlFor="multiplefile"
            >
              Upload Files{!multipleFiles && <span className="required-star text-red-500 pl-1">*</span>}
          </label>
          </div>
          <div className="md:w-2/3">
            <input
              type="file"
              id="multiplefile"
              name="multiplefile"
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              multiple
              accept=".png,.pdf"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
          <label
              className={`block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4 ${
                !geolocationStatus ? 'required-field' : ''
              }`}
              htmlFor="geolocation"
            >
              Geo Location{!geolocationStatus && <span className="required-star text-red-500 pl-1">*</span>}
          </label>
          </div>
          <div className="md:w-2/3">
            {!geolocationStatus ?
              <button type="button" className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight' onClick={handleGeolocationCapture}>
                Click here to capture geolocation
              </button>
              :
              <input
                type="text"
                id="geolocation"
                name="geolocation"
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight"
                value={geolocationStatus}
                readOnly
                style={{ pointerEvents: "none" }}
              />
            }
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3 flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            >
              Submit
            </button>
            <button
              type="reset"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => {
                handleReset();
              }}
            >
              Reset
            </button>
            <button
              type="button"
              className="bg-slate-400 ml-2 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => {
                handleLogOut();
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </form>
      {isSubmit && <SweetAlert />}
      <ToastContainer />
    </div>
    </>
  );
};

export default MultiForm;