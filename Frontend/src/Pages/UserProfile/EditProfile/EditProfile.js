/* author: Mehulkumar Bhunsadiya */
import { useNavigate } from "react-router-dom";
import "./EditProfile.css";
import React, { useState, useEffect } from "react";
import ToastMessage from "../../../Components/Toast/Toast";

function EditProfile() {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    fetch(process.env.REACT_APP_BASE_URL + `/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProfileData({
          firstName: data.data.user.firstName,
          lastName: data.data.user.lastName,
          email: data.data.user.email,
          age: data.data.user.age,
        });
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, []);

  const validateForm = () => {
    let isValid = true;
    const validationErrors = {};

    if (!profileData.firstName.match(/^[A-Za-z]+$/)) {
      validationErrors.firstName = "First name is invalid";
      isValid = false;
    }

    if (!profileData.lastName.match(/^[A-Za-z]+$/)) {
      validationErrors.lastName = "Last name is invalid";
      isValid = false;
    }

    if (
      !profileData.email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
    ) {
      validationErrors.email = "Email address is invalid";
      isValid = false;
    }

    if (profileData.password && profileData.password.length < 6) {
      validationErrors.password =
        "Password should be at least 6 characters long";
      isValid = false;
    }

    if (profileData.password !== profileData.confirmPassword) {
      validationErrors.confirmPassword = "Password does not match";
      isValid = false;
    }

    setErrors(validationErrors);
    return isValid;
  };

  // Function to handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const userId = localStorage.getItem("userId");
      const updateData = {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        age: profileData.age,
        email: profileData.email,
        password: profileData.password,
      };
      fetch(process.env.REACT_APP_BASE_URL + `/user/update/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updateData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          ToastMessage("Profile updated successfully!");
          navigate("/dashboard");
        })
        .catch((error) => {
          ToastMessage("Something went wrong", "Fails");
          console.error("Error updating profile:", error);
        });
    }
  };

  // Function to handle cancel button click
  const handleCancelClick = () => {
    navigate("/dashboard");
  };

  return (
    <div className="edit-profile">
      <div className="edit-profile-container">
        <div className="overlay"></div>
        <div className="form-container">
          <h1 className="header-text">Edit Profile</h1>
          <form onSubmit={handleSubmit} className="h-100">
            <div className="form-group">
              <div className="label-text text-color">First Name</div>
              <input
                type="text"
                id="firstName"
                value={profileData.firstName}
                onChange={(e) =>
                  setProfileData({ ...profileData, firstName: e.target.value })
                }
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
                value={profileData.lastName}
                onChange={(e) =>
                  setProfileData({ ...profileData, lastName: e.target.value })
                }
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
                value={profileData.email}
                onChange={(e) =>
                  setProfileData({ ...profileData, email: e.target.value })
                }
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
                value={profileData.age}
                onChange={(e) =>
                  setProfileData({ ...profileData, age: e.target.value })
                }
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
                value={profileData.password}
                onChange={(e) =>
                  setProfileData({ ...profileData, password: e.target.value })
                }
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
                value={profileData.confirmPassword}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    confirmPassword: e.target.value,
                  })
                }
                className="form-control text-color input-field"
                required
              />
              {errors.confirmPassword && (
                <p className="text-danger">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="d-flex justify-content-between">
              <button className="mt-2 btn btn-save-changes" type="submit">
                Save Changes
              </button>
              <button
                className="mt-2 btn btn-cancel-changes"
                type="button"
                onClick={handleCancelClick}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
