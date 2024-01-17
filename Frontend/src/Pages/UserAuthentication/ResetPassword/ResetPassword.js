/* author: Mehulkumar Bhunsadiya */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ResetPassword.css";
import ToastMessage from "../../../Components/Toast/Toast";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [emailExists, setEmailExists] = useState(false);
  const [showVerificationCode, setShowVerificationCode] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateEmail = () => {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(emailRegex)) {
      setErrors({ email: "Email address is invalid" });
      return false;
    }
    return true;
  };

  const handleEmailCheck = (e) => {
    e.preventDefault();
    if (validateEmail()) {
      // Make an API call to check if the email is registered or not
      fetch(process.env.REACT_APP_BASE_URL + "/auth/sendVerificationCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (data.status == true) {
            setEmailExists(true);
            setShowVerificationCode(true);
            setErrors({});
          } else {
            setErrors({ email: "Email address is not registered" });
          }
        })
        .catch((error) => {
          console.error("Error checking email:", error);
        });
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    const numericVerificationCode = Number(verificationCode);
    if (validateEmail() && password === confirmPassword) {
      const resetData = {
        email: email,
        password: password,
        verificationCode: numericVerificationCode,
      };

      // Make an API call to reset the password
      fetch(process.env.REACT_APP_BASE_URL + "/auth/resetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resetData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          ToastMessage("Reset Password Successfull");
          navigate("/login");
        })
        .catch((error) => {
          ToastMessage("Something went wrong", "Fails");
          console.error("Error resetting password:", error);
        });
    } else if (password !== confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
    }
  };

  return (
    <div className="reset-password">
      <div className="reset-password-container">
        <div className="overlay"></div>
        <div className="form-container">
          <h1 className="header-text">Reset Password</h1>
          {!showVerificationCode ? (
            <form onSubmit={handleEmailCheck}>
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
              <div className="d-flex justify-content-center">
                <button className="mt-2 btn btn-secondary" type="submit">
                  Check Email
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleResetPassword}>
              <div className="form-group">
                <div className="label-text text-color">New Password</div>
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
              <div className="form-group">
                <div className="label-text text-color">Verification Code</div>
                <input
                  type="text"
                  id="verificationCode"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="form-control text-color input-field"
                  required
                />
                {errors.verificationCode && (
                  <p className="text-danger">{errors.verificationCode}</p>
                )}
              </div>
              <div className="d-flex justify-content-center">
                <button className="mt-2 btn btn-secondary" type="submit">
                  Save Password
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
