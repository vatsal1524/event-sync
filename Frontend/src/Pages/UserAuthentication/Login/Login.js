/* author: Mehulkumar Bhunsadiya */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import ToastMessage from "../../../Components/Toast/Toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (!email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
      errors.email = "Email address is invalid";
      isValid = false;
    }

    if (password.length < 6) {
      errors.password = "Password should be at least 6 characters long";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const loginData = {
        email: email,
        password: password,
        fcmToken: localStorage.getItem("fcmToken"),
      };

      fetch(process.env.REACT_APP_BASE_URL + "/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((responseData) => {
          const { token, user } = responseData.data;
          localStorage.setItem("token", token);
          localStorage.setItem("userId", user._id);
          localStorage.setItem("age", user.age);
          localStorage.setItem("ageDefault", user.ageDefault);
          localStorage.setItem("peopleDefault", user.peopleDefault);
          localStorage.setItem("userType", user.userType);
          if(responseData.data.user.userType === "admin") {
              ToastMessage("Login Successfull");
              navigate('/admin/approvalrequests');
          } else {
            if (responseData.data.user.interests.length > 0) {
              ToastMessage("Login Successfull");
              navigate("/dashboard");
            } else {
              ToastMessage("Login Successfull");
              navigate("/onboarding");
            }
          }
          if(responseData.data.status === false) {
            ToastMessage(responseData.data.message,"Fails");
          }
        })
        .catch((error) => {
          ToastMessage("Something went wrong", "Fails");
          console.error("Error sending data:", error);
        });
    }
  };

  const handleCreateAccountClick = () => {
    navigate("/registration");
  };

  const handleResetPasswordClick = () => {
    navigate("/reset-password");
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="overlay"></div>
        <div className="form-container">
          <h1 className="header-text">Login</h1>
          <form onSubmit={handleSubmit}>
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
            <div className="d-flex justify-content-center">
              <button className="mt-2 btn btn-secondary" type="submit">
                Login
              </button>
            </div>
            <div
              className="mt-2 text-primary cursor"
              onClick={handleCreateAccountClick}
            >
              Continue with new account
            </div>
            <div
              className="mt-2 text-primary cursor"
              onClick={handleResetPasswordClick}
            >
              Reset password
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
