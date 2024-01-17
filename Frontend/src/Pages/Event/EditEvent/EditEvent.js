//Author: Dhruvin Dankhara
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./EditEvent.css";
import { updateEvent } from "../../../services/eventApi";

function EditEvent() {
  const location = useLocation();
  const event = location.state;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [editedEvent, setEditedEvent] = useState({
    name: event.name,
    dateAndTime: event.dateAndTime,
    location: event.location,
    category: event.category,
    description: event.description,
    imageUrl: event.imageUrl,
    image: null,
  });
  const [oldDataAndTime, setOldDataAndTime] = useState(
    new Date(event.dateAndTime)
  );

  const updateEventApiCall = async () => {
    setLoading(true);

    const formData = new FormData();
    for (const [key, value] of Object.entries(editedEvent)) {
      if (key == "image") {
        console.log(value);
        formData.append("files", value);
      } else if (key == "imageUrl") {
        continue;
      }
      formData.append(key, value);
    }
    formData.append("ownerId", localStorage.getItem("userId"));
    const response = await updateEvent(event._id, formData);
    if (response.status === 202) {
      console.log("Event Data:", response);
    }

    // const apiResponse = await updateEvent(event._id, editedEvent);
    // if (apiResponse == 202) {
    //   console.log(apiResponse.data.message);
    // }
    // else{

    // }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent({ ...editedEvent, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setEditedEvent({ ...editedEvent, imageUrl: reader.result, image: file });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async () => {
    try {
      await updateEventApiCall();
      navigate("/my-events");
    } catch (error) {}
  };

  return (
    <div className="container edit-event-container">
      <h1>Edit Event</h1>
      <div className="row">
        <div className="col-md-6">
          <div className="event-image">
            <img src={editedEvent.imageUrl} alt="Event" className="img-fluid" />
            <div className="upload-image">
              <label htmlFor="imageUpload" className="btn">
                Change Image
              </label>
              <input
                type="file"
                id="imageUpload"
                name="imageUrl"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="event-details">
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={editedEvent.name}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Date & Time: {oldDataAndTime.toUTCString()}</label>
              <input
                type="datetime-local"
                name="dateAndTime"
                onChange={handleInputChange}
                className="form-control"
                min={new Date()
                  .toISOString()
                  .slice(0, new Date().toISOString().lastIndexOf(":"))}
              />
            </div>
            <div className="form-group">
              <label>Location:</label>
              <input
                type="text"
                name="location"
                value={editedEvent.location}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Category:</label>
              <input
                type="text"
                name="category"
                value={editedEvent.category}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="description form-group">
              <label>Description:</label>
              <textarea
                name="description"
                value={editedEvent.description}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <button className="btn btn-secondary" onClick={handleSaveChanges}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditEvent;
