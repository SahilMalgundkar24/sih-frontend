"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import * as yup from "yup";

const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  middleName: yup.string(),
  lastName: yup.string().required("Last Name is required"),
  dob: yup
    .date()
    .required("Date of Birth is required")
    .typeError("Invalid Date"),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone Number is required"),
  email: yup.string().email("Invalid Email").required("Email is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  pincode: yup
    .string()
    .matches(/^\d{6}$/, "Pincode must be a 6-digit number")
    .required("Pincode is required"),
  address: yup.string().required("Address is required"),
  gender: yup.string().required("Gender is required"),
});

const Page = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    email: "",
    phone: "",
    secondaryPhone: "",
    city: "",
    state: "",
    pincode: "",
    address: "",
    gender: "",
  });

  const [documentData, setDocumentData] = useState({
    aadhaar: null,
    pan: null,
    gateMarksheet: null,
    ewsCertificate: null,
    aadhaarVerified: false,
    panVerified: false,
    gateMarksheetVerified: false,
    ewsCertificateVerified: false,
  });

  const [errors, setErrors] = useState({});
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDocumentChange = (e, document) => {
    const file = e.target.files[0];
    if (file) {
      setDocumentData((prevState) => ({
        ...prevState,
        [document]: file,
        [`${document}Verified`]: false,
      }));
    }
  };

  const handleClick = (image) => {
    const docData = new FormData();
    docData.append("file", image); // Corrected to append the image file
    console.log("Sending image data:", image);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    axios
      .post(`${apiUrl}/verify/classify/`, docData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure correct content type for file upload
        },
      })
      .then((response) => {
        console.log("Response:", response);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const handleVerify = (document) => {
    if (!documentData[document]) {
      alert(`Please upload ${document} document first`);
      return;
    }

    setDocumentData((prevState) => ({
      ...prevState,
      [`${document}Verified`]: true,
    }));
  };

  const areAllDocumentsVerified = () => {
    return (
      documentData.aadhaarVerified &&
      documentData.panVerified &&
      documentData.gateMarksheetVerified &&
      documentData.ewsCertificateVerified
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === 1) {
      try {
        await schema.validate(formData, { abortEarly: false });
        const newData = new FormData();
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        console.log(apiUrl);

        const response = await axios.post(`${apiUrl}/api/applications/create`, {
          username: "rushi",
          name: "Software_developer_at_Drdo",
          data: formData,
        });

        console.log(response.data);

        setErrors({});
        console.log("Personal Details", formData);
        console.log("Personal Details", newData);

        setStep(2);
      } catch (validationErrors) {
        console.log(validationErrors);
        const errorMessages = {};
        // validationErrors.inner.forEach((error) => {
        //   errorMessages[error.path] = error.message;
        // });
        setErrors(errorMessages);
      }
    } else if (step === 2) {
      // Check if all documents are uploaded
      const missingDocuments = [];
      if (!documentData.aadhaar) missingDocuments.push("Aadhaar");
      if (!documentData.pan) missingDocuments.push("PAN");
      if (!documentData.gateMarksheet) missingDocuments.push("Gate Marksheet");
      if (!documentData.ewsCertificate)
        missingDocuments.push("EWS Certificate");

      if (missingDocuments.length > 0) {
        alert(
          `Please upload the following documents: ${missingDocuments.join(
            ", "
          )}`
        );
        return;
      }

      // Check if all documents are verified
      const unverifiedDocuments = [];
      if (!documentData.aadhaarVerified) unverifiedDocuments.push("Aadhaar");
      if (!documentData.panVerified) unverifiedDocuments.push("PAN");
      if (!documentData.gateMarksheetVerified)
        unverifiedDocuments.push("Gate Marksheet");
      if (!documentData.ewsCertificateVerified)
        unverifiedDocuments.push("EWS Certificate");

      if (unverifiedDocuments.length > 0) {
        alert(
          `Please verify the following documents: ${unverifiedDocuments.join(
            ", "
          )}`
        );
        return;
      }

      console.log("Documents Verified. Moving to Step 3...");
      setStep(3);
    } else if (step === 3) {
      console.log("Final Submission:", {
        formData,
        documentData,
      });
      alert("Form submitted successfully!");
    }
  };

  if (!mounted) {
    return (
      <div className="flex flex-col h-screen w-full items-center justify-center"></div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-full p-3 lg:p-5">
      <div className="flex justify-start items-center lg:mb-0 mb-5">
        <div>
          <img className="w-[70%]" src="/images/drdologo1.png" />
        </div>
        <div>
          <img className="w-[80%]" src="/images/drdologo2.png" />
        </div>
      </div>

      <div className="w-full mt-10 lg:max-w-5xl mx-auto mb-3 lg:mb-8 px-6">
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-1/3 left-10 right-10 h-0.5 bg-gray-200 -translate-y-1/2">
            <div
              className="absolute top-0 left-0 h-full bg-blue-600 transition-all duration-300"
              style={{
                width: step === 1 ? "0%" : step === 2 ? "50%" : "100%",
              }}
            />
          </div>

          <div className="flex justify-between">
            {/* Step 1 Circle */}
            <div className="relative z-10 flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  step >= 1
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-gray-300 bg-white text-gray-500"
                }`}
              >
                1
              </div>
              <span className="mt-2 text-sm font-medium text-gray-600">
                Personal Details
              </span>
            </div>

            {/* Step 2 Circle */}
            <div className="relative z-10 flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  step >= 2
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-gray-300 bg-white text-gray-500"
                }`}
              >
                2
              </div>
              <span className="mt-2 text-sm font-medium text-gray-600">
                Documents
              </span>
            </div>

            {/* Step 3 Circle */}
            <div className="relative z-10 flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  step === 3
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-gray-300 bg-white text-gray-500"
                }`}
              >
                3
              </div>
              <span className="mt-2 text-sm font-medium text-gray-600">
                Review & Submit
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex items-center justify-center">
        <div className="flex w-full lg:max-w-5xl justify-center items-center flex-grow lg:px-4 py-4">
          {step === 1 && (
            <form
              onSubmit={handleSubmit}
              className="w-full px-3 py-6 space-y-4"
            >
              {/* Step 1 Form */}
              <div className="block lg:flex lg:space-x-7 space-y-3 lg:space-y-0">
                {/* First Name, Middle Name, Last Name */}
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    First Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Father Name
                  </label>
                  <input
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    placeholder="Enter your middle name"
                    className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="block lg:flex lg:space-x-7 space-y-3 lg:space-y-0">
                {/* Email */}
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
                {/* Date of Birth */}

                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Date of Birth <span className="text-red-600">*</span>
                  </label>
                  <input
                    name="dob"
                    type="date"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.dob && (
                    <p className="text-red-500 text-xs mt-1">{errors.dob}</p>
                  )}
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Phone Number */}
              {/* <div className="block lg:flex lg:space-x-7 space-y-3 lg:space-y-0">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number <span className="text-red-600">*</span>
                </label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Alternate Phone Number
                </label>
                <input
                  name="secondaryPhone"
                  value={formData.secondaryPhone}
                  onChange={handleChange}
                  placeholder="Enter your second number"
                  className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.secondaryPhone && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.secondaryPhone}
                  </p>
                )}
              </div>
            </div> */}

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address <span className="text-red-600">*</span>
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  rows="3"
                  className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                )}
              </div>

              <div className="block lg:flex lg:space-x-7 space-y-3 lg:space-y-0">
                {/* City */}
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    City <span className="text-red-600">*</span>
                  </label>
                  <input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter your city"
                    className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                  )}
                </div>

                {/* State */}
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    State <span className="text-red-600">*</span>
                  </label>
                  <input
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Enter your state"
                    className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.state && (
                    <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                  )}
                </div>

                {/* Pincode */}
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Pincode <span className="text-red-600">*</span>
                  </label>
                  <input
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Enter your pincode"
                    className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.pincode && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.pincode}
                    </p>
                  )}
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Gender <span className="text-red-600">*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
                )}
              </div>

              {/* Next Button */}
              <div className="w-full">
                <button
                  type="submit"
                  className="float-right w-auto py-2 px-5 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none"
                >
                  Next
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form
              onSubmit={handleSubmit}
              className="w-full px-3 py-6 space-y-4"
            >
              {/* Aadhaar Upload */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Upload Aadhaar <span className="text-red-600">*</span>
                </label>
                <div className="w-full flex items-center">
                  <input
                    type="file"
                    name="aadhaar"
                    accept=".pdf,.jpg,.png"
                    onChange={(e) => handleDocumentChange(e, "aadhaar")}
                    className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleClick(documentData.aadhaar)}
                    className={`ml-5 py-2 px-5 font-medium rounded-md focus:outline-none ${
                      documentData.aadhaarVerified
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-blue-600 hover:bg-blue-700"
                    } text-white`}
                    disabled={!documentData.aadhaar}
                  >
                    {documentData.aadhaarVerified ? "Verified" : "Verify"}
                  </button>
                </div>
                {documentData.aadhaar && (
                  <div className="mt-2">
                    {documentData.aadhaar.type.startsWith("image/") ? (
                      <img
                        src={URL.createObjectURL(documentData.aadhaar)}
                        alt="Aadhaar Preview"
                        className="w-[30%] lg:w-[7%] h-auto max-w-xs border rounded-md"
                      />
                    ) : (
                      <a
                        href={URL.createObjectURL(documentData.aadhaar)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        Preview Aadhaar Document
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* PAN Upload */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Upload PAN <span className="text-red-600">*</span>
                </label>
                <div className="w-full flex items-center">
                  <input
                    type="file"
                    name="pan"
                    accept=".pdf,.jpg,.png"
                    onChange={(e) => handleDocumentChange(e, "pan")}
                    className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleClick(documentData.pan)}
                    className={`ml-5 py-2 px-5 font-medium rounded-md focus:outline-none ${
                      documentData.panVerified
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-blue-600 hover:bg-blue-700"
                    } text-white`}
                    disabled={!documentData.pan}
                  >
                    {documentData.panVerified ? "Verified" : "Verify"}
                  </button>
                </div>
                {documentData.pan && (
                  <div className="mt-2">
                    {documentData.pan.type.startsWith("image/") ? (
                      <img
                        src={URL.createObjectURL(documentData.pan)}
                        alt="PAN Preview"
                        className="w-[30%] lg:w-[7%] h-auto max-w-xs border rounded-md"
                      />
                    ) : (
                      <a
                        href={URL.createObjectURL(documentData.pan)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        Preview PAN Document
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Gate Marksheet Upload */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Upload Gate Marksheet <span className="text-red-600">*</span>
                </label>
                <div className="w-full flex items-center">
                  <input
                    type="file"
                    name="gateMarksheet"
                    accept=".pdf,.jpg,.png"
                    onChange={(e) => handleDocumentChange(e, "gateMarksheet")}
                    className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleClick(documentData.gateMarksheet)}
                    className={`ml-5 py-2 px-5 font-medium rounded-md focus:outline-none ${
                      documentData.gateMarksheetVerified
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-blue-600 hover:bg-blue-700"
                    } text-white`}
                    disabled={!documentData.gateMarksheet}
                  >
                    {documentData.gateMarksheetVerified ? "Verified" : "Verify"}
                  </button>
                </div>
                {documentData.gateMarksheet && (
                  <div className="mt-2">
                    {documentData.gateMarksheet.type.startsWith("image/") ? (
                      <img
                        src={URL.createObjectURL(documentData.gateMarksheet)}
                        alt="Gate Marksheet Preview"
                        className="w-[30%] lg:w-[7%] h-auto max-w-xs border rounded-md"
                      />
                    ) : (
                      <a
                        href={URL.createObjectURL(documentData.gateMarksheet)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        Preview Gate Marksheet Document
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* EWS Certificate Upload */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Upload EWS Certificate <span className="text-red-600">*</span>
                </label>
                <div className="w-full flex items-center">
                  <input
                    type="file"
                    name="ewsCertificate"
                    accept=".pdf,.jpg,.png"
                    onChange={(e) => handleDocumentChange(e, "ewsCertificate")}
                    className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleClick(documentData.ewsCertificate)}
                    className={`ml-5 py-2 px-5 font-medium rounded-md focus:outline-none ${
                      documentData.ewsCertificateVerified
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-blue-600 hover:bg-blue-700"
                    } text-white`}
                    disabled={!documentData.ewsCertificate}
                  >
                    {documentData.ewsCertificateVerified
                      ? "Verified"
                      : "Verify"}
                  </button>
                </div>
                {documentData.ewsCertificate && (
                  <div className="mt-2">
                    {documentData.ewsCertificate.type.startsWith("image/") ? (
                      <img
                        src={URL.createObjectURL(documentData.ewsCertificate)}
                        alt="EWS Certificate Preview"
                        className="w-[30%] lg:w-[7%] h-auto max-w-xs border rounded-md"
                      />
                    ) : (
                      <a
                        href={URL.createObjectURL(documentData.ewsCertificate)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        Preview EWS Certificate Document
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Back and Submit Buttons */}
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="py-2 px-5 bg-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-400 focus:outline-none"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className={`py-2 px-5 font-medium rounded-md focus:outline-none ${
                    areAllDocumentsVerified()
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-400 text-gray-700 cursor-not-allowed"
                  }`}
                >
                  Next
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleSubmit} className="w-full p-6 space-y-4">
              <h1 className="text-lg font-bold">Review Your Details</h1>

              {/* Step 1 Details Display */}
              <div className="block lg:flex lg:space-x-7 space-y-3 lg:space-y-0">
                {/* First Name, Middle Name, Last Name */}
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <p className="mt-1 p-2 border rounded-md">
                    {formData.firstName}
                  </p>
                </div>

                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Father Name
                  </label>
                  <p className="mt-1 p-2 border rounded-md">
                    {formData.middleName || (
                      <span className="text-red-500">Not provided</span>
                    )}
                  </p>
                </div>

                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <p className="mt-1 p-2 border rounded-md">
                    {formData.lastName}
                  </p>
                </div>
              </div>

              <div className="block lg:flex lg:space-x-7 space-y-3 lg:space-y-0">
                {/* Email */}
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <p className="mt-1 p-2 border rounded-md">{formData.email}</p>
                </div>

                {/* Date of Birth */}
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Date of Birth
                  </label>
                  <p className="mt-1 p-2 border rounded-md">{formData.dob}</p>
                </div>

                {/* Phone Number */}
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <p className="mt-1 p-2 border rounded-md">{formData.phone}</p>
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <p className="mt-1 p-2 border rounded-md">{formData.address}</p>
              </div>

              <div className="block lg:flex lg:space-x-7 space-y-3 lg:space-y-0">
                {/* City */}
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <p className="mt-1 p-2 border rounded-md">{formData.city}</p>
                </div>

                {/* State */}
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    State
                  </label>
                  <p className="mt-1 p-2 border rounded-md">{formData.state}</p>
                </div>

                {/* Pincode */}
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    Pincode
                  </label>
                  <p className="mt-1 p-2 border rounded-md">
                    {formData.pincode}
                  </p>
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <p className="mt-1 p-2 border rounded-md">{formData.gender}</p>
              </div>

              {/* Buttons */}
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="py-2 px-5 bg-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-400 focus:outline-none"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className={`py-2 px-5 font-medium rounded-md focus:outline-none ${
                    areAllDocumentsVerified()
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-400 text-gray-700 cursor-not-allowed"
                  }`}
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
