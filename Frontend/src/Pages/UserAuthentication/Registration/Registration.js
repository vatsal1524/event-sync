/* author: Mehulkumar Bhunsadiya */
import { useNavigate } from "react-router-dom";
import "./Registration.css";
import React, { useState } from "react";
import ToastMessage from "../../../Components/Toast/Toast";

function Registration() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (!firstName.match(/^[A-Za-z]+$/)) {
      errors.firstName = "First name is invalid";
      isValid = false;
    }

    if (!lastName.match(/^[A-Za-z]+$/)) {
      errors.lastName = "Last name is invalid";
      isValid = false;
    }

    if (!email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
      errors.email = "Email address is invalid";
      isValid = false;
    }

    if (!age.match(/^\d+$/)) {
      errors.age = "Age should be a number";
      isValid = false;
    }

    if (password.length < 6) {
      errors.password = "Password should be at least 6 characters long";
      isValid = false;
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Password does not match";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const userType = "user";
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const userRegistrationData = {
        firstName: firstName,
        lastName: lastName,
        age: age,
        email: email,
        password: password,
        userType: userType,
      };

      fetch(process.env.REACT_APP_BASE_URL + "/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userRegistrationData),
      })
        .then((response) => response.json())
        .then((data) => {
          if(data && data.status === true) {
          console.log(data);
          localStorage.setItem("userId", data._id);
          ToastMessage("Registration Successfull");
          navigate("/login");
          } else {
            ToastMessage(data.message, "Fails")
            console.log(data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="registration">
      <div className="registration-container">
        <div className="overlay"></div>
        <div className="form-container">
          <h1 className="header-text">Registration</h1>
          <form onSubmit={handleSubmit} className="h-100">
            <div className="form-group">
              <div className="label-text text-color">First Name</div>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="form-control text-color input-field"
                required
              />
              {errors.firstName && (
                <p className="text-danger">{errors.firstName}</p>
              )}
            </div>
            <div className="form-group">
              <div className="label-text text-color">Last Name</div>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="form-control text-color input-field"
                required
              />
              {errors.lastName && (
                <p className="text-danger">{errors.lastName}</p>
              )}
            </div>
            <div className="form-group">
              <div className="label-text text-color">Email</div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control text-color input-field"
                required
              />
              {errors.email && <p className="text-danger">{errors.email}</p>}
            </div>
            <div className="form-group">
              <div className="label-text text-color">Age</div>
              <input
                type="text"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="form-control text-color input-field"
                required
              />
              {errors.age && <p className="text-danger">{errors.age}</p>}
            </div>
            <div className="form-group">
              <div className="label-text text-color">Password</div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control text-color input-field"
                required
              />
              {errors.password && (
                <p className="text-danger">{errors.password}</p>
              )}
            </div>
            <div className="form-group">
              <div className="label-text text-color">Confirm Password</div>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-control text-color input-field"
                required
              />
              {errors.confirmPassword && (
                <p className="text-danger">{errors.confirmPassword}</p>
              )}
            </div>
            <div className="d-flex justify-content-center">
              <button className="mt-2 btn btn-secondary" type="submit">
                Submit
              </button>
            </div>
            <span
              className="mt-2 text-primary cursor"
              onClick={handleLoginClick}
            >
              Already have an account? Login here
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registration;
