//Author: Dhruvin Dankhara

import React, { useState } from "react";
import "./CreateEvent.css";
import { createEvent } from "../../../services/eventApi";
import { useNavigate } from "react-router-dom";

function CreateEvent() {
  const [eventData, setEventData] = useState({
    name: "",
    dateAndTime: "",
    location: "",
    category: "",
    description: "",
    ticketPrice: null,
    image: null, // Added image state
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  // const createEventApiCall

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEventData({ ...eventData, image: file });
  };

  const handleCreateEvent = async () => {
    const validationErrors = {};
    if (!eventData.name.trim()) {
      validationErrors.name = "Event name is required.";
    }
    if (!eventData.dateAndTime.trim()) {
      validationErrors.dateAndTime = "Date & Time is required.";
    }
    if (!eventData.location.trim()) {
      validationErrors.location = "Location is required.";
    }
    if (!eventData.category.trim()) {
      validationErrors.category = "Category is required.";
    }
    if (!eventData.description.trim()) {
      validationErrors.description = "Description is required.";
    }
    if (!eventData.ticketPrice.trim()) {
      validationErrors.ticketPrice = "Ticket price is required.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formData = new FormData();
    for (const [key, value] of Object.entries(eventData)) {
      if (key === "image") {
        console.log(value);
        formData.append("files", value);
      }
      formData.append(key, value);
    }
    formData.append("ownerId", localStorage.getItem("userId"));
    const response = await createEvent(formData);
    if (response.status === 202) {
      console.log("Event Data:", response);
      navigate("/my-events");
    }
  };

  // Replace this array with your actual list of categories
  const categories = [
    "Art & Design",
    "Technology",
    "Music",
    "Photography",
    "Fitness",
    "Cooking",
    "Travel",
    "Fun",
    // Add more categories here
  ];

  return (
    <div className="container create-event-container">
      <h1>Create Event</h1>
      <div className="row">
        <div className="col-md-8">
          <div className="event-details">
            <div className="form-group">
              <label>Event Name:</label>
              <input
                type="text"
                name="name"
                value={eventData.name}
                onChange={handleInputChange}
                className="form-control"
              />
              {errors.name && <div className="error-text">{errors.name}</div>}
            </div>
            <div className="form-group">
              <label>Date & Time: </label>
              <input
                type="datetime-local"
                name="dateAndTime"
                value={eventData.dateAndTime}
                onChange={handleInputChange}
                className="form-control"
                min={new Date()
                  .toISOString()
                  .slice(0, new Date().toISOString().lastIndexOf(":"))}
              />
              {errors.dateAndTime && (
                <div className="error-text">{errors.dateAndTime}</div>
              )}
            </div>
            <div className="form-group">
              <label>Location:</label>
              <input
                type="text"
                name="location"
                value={eventData.location}
                onChange={handleInputChange}
                className="form-control"
              />
              {errors.location && (
                <div className="error-text">{errors.location}</div>
              )}
            </div>
            <div className="form-group">
              <label>Ticket Price ($ CAD):</label>
              <input
                type="number"
                name="ticketPrice"
                value={eventData.ticketPrice}
                onChange={handleInputChange}
                className="form-control"
              />
              {errors.ticketPrice && (
                <div className="error-text">{errors.ticketPrice}</div>
              )}
            </div>
            <div className="form-group">
              <label>Category:</label>
              <select
                name="category"
                value={eventData.category}
                onChange={handleInputChange}
                className="form-control"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <div className="error-text">{errors.category}</div>
              )}
            </div>
            <div className="description form-group">
              <label>Description:</label>
              <textarea
                name="description"
                value={eventData.description}
                onChange={handleInputChange}
                className="form-control"
              />
              {errors.description && (
                <div className="error-text">{errors.description}</div>
              )}
            </div>
            <div className="form-group">
              <label>Upload Image:</label>
              <div>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="form-control-file"
                />
              </div>
              {errors.image && <div className="error-text">{errors.image}</div>}
            </div>
            <button className="btn btn-secondary" onClick={handleCreateEvent}>
              Create Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateEvent;
