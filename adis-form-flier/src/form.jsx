import React, { useState } from "react";
import Logo from "./assets/logo.png";
import BG from "./assets/bg_image.jpeg";
import { useNavigate } from "react-router-dom";
import { get, useForm } from "react-hook-form";
import axios from "axios";
import { useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const Form = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const { handleSubmit } = useForm();
  const [image, setImage] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const initialValues = {
    name: "",
    email: "",
    phone_number: "",
    country: "",
  };
  const [formDetails, setFormDetails] = useState(initialValues);

  const { name, email, phone_number, country } = formDetails;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({ ...formDetails, [name]: value });
  };

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setFormDetails({ ...formDetails, country: selectedOption.value });
  };

  const fileUploadHandler = (e) => {
    console.log(e.target.files, "image");
    const imageFile = e.target.files[0];
    setImage(imageFile);
  };

  const insertFormDetails = () => {
    const url = `${apiURL}`;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone_number", phone_number);
    formData.append("country", country);
    formData.append("image", image);
    console.log(formData, "form details payload");

    axios.post(url, formData).then((response) => {
      console.log(response, "response from inserting form data");
      let userDetail = JSON.stringify(response.data.daata);
      localStorage.setItem("ADIS_USER", userDetail);
      alert(response.data.message);
      if (response.data.message === "Thank you for Joining") {
        navigate("/flier");
      } else {
        alert(response.message);
        navigate("/");
      }
    });
  };

  useEffect(() => {
    const getCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v2/all");
        const data = await response.json();
        const detail = data.map((country) => ({
          label: country.name,
          value: country.alpha2Code,
          flag: country.flag, // Assuming flags is an array
        }));
        console.log(data, "country info");
        setCountries(detail);
        return;
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    getCountries();
  }, []);

  const animatedComponents = makeAnimated();

  return (
    // <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-r from-white via-purple-800 to-white p-4 md:p-0">
    <div
      className="w-full h-screen relative overflow-hidden rounded-lg bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${BG})` }}
    >
      <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed bg-purple-900/50 flex flex-col items-center justify-center p-4 md:p-0">
        {/* <div className="w-[200px]"> */}
        {/* <img src={Logo} alt="SPC Universe" /> */}
        {/* </div> */}
        <h1 className="text-xl text-white font-semibold my-10">
          Welcome! Secure your spot in the ADIC COMMUNITY
        </h1>
        <div className="md:w-[500px] bg-white rounded shadow-2xl shadow-black p-4">
          <form onSubmit={handleSubmit(insertFormDetails)}>
            <div className="mx-4">
              <label className="mb-2 text-sm font-medium text-[#2d3748]">
                Name
              </label>
              <input
                type="text"
                className="w-full h-[48px] border border-[#d1d1d1] rounded-[5px] p-2"
                required
                name="name"
                value={name}
                onChange={handleChange}
              />
            </div>
            <div className="m-4">
              <label className="mb-2 text-sm font-medium text-[#2d3748]">
                Email
              </label>
              <input
                type="email"
                className="w-full h-[48px] border border-[#d1d1d1] rounded-[5px] p-2"
                required
                name="email"
                value={email}
                onChange={handleChange}
              />
            </div>
            <div className="m-4">
              <label className="mb-2 text-sm font-medium text-[#2d3748]">
                Phone Number
              </label>
              <input
                type="number"
                className="w-full h-[48px] border border-[#d1d1d1] rounded-[5px] p-2"
                required
                name="phone_number"
                value={phone_number}
                onChange={handleChange}
              />
            </div>
            <div className="m-4">
              <label className="mb-2 text-sm font-medium text-[#2d3748]">
                Country
              </label>
              {/* <input
                type="text"
                className="w-full h-[48px] border border-[#d1d1d1] rounded-[5px] p-2"
                required
                name="country"
                value={country}
                onChange={handleChange}
              /> */}
              <Select
                components={animatedComponents}
                options={countries}
                value={selectedCountry}
                onChange={handleCountryChange}
                getOptionLabel={(option) => (
                  <div className="flex">
                    <img
                      src={option.flag}
                      alt={`${option.label} flag`}
                      style={{ width: "20px", marginRight: "10px" }}
                    />
                    {option.label}
                  </div>
                )}
              />
            </div>
            <div className="m-4">
              <label className="mb-2 text-sm font-medium text-[#2d3748]">
                Upload Image
              </label>
              <input
                type="file"
                className="w-full"
                required
                name="image"
                // value={image}
                onChange={fileUploadHandler}
              />
            </div>
            <div className="m-4">
              <button
                type="submit"
                className="text-center p-3 text-white text-lg font-bold bg-purple-600 w-full h-[48px] border rounded-[5px]"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Form;
