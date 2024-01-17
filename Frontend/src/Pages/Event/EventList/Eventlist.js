//Author: Dhruvin Dankhara

import React, { useEffect, useState } from "react";
import eventImage1 from "../../../Images/Landing-page-background.jpg";
import "./EventList.css";
import { useNavigate } from "react-router-dom";
import { getAllEvents } from "../../../services/eventApi";

function EventList() {
  const navigate = useNavigate();
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [completedEvents, setCompletedEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const eventListApiCall = async () => {
    setLoading(true);
    const apiResponse = await getAllEvents();
    if (apiResponse) {
      console.log(apiResponse.data?.data?.events);
      setUpcomingEvents(
        apiResponse.data?.data?.events.filter((event) => !event.isCompleted)
      );
      setCompletedEvents(
        apiResponse.data?.data?.events.filter((event) => event.isCompleted)
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    eventListApiCall();
  }, []);

  const handleViewEvent = (event) => {
    navigate(`/event-details/${event._id}`, {
      state: event,
    });
  };

  const handleEditEvent = (event) => {
    navigate(`/edit-event/${event.id}`, {
      state: event,
    });
  };

  const handleCreateEvent = (event) => {
    navigate(`/create-event`);
  };

  return (
    <>
      {loading ? (
        "Loading.."
      ) : (
        <div className="container event-list-container">
          <div className="row">
            <div className="d-flex justify-content-between mb-2">
              <h1 className="header-title">Upcoming/Ongoing events</h1>
              <div className="event-card-buttons">
                {/* <button
                  className="btn btn-secondary"
                  onClick={() => handleCreateEvent()}
                >
                  Create Event
                </button> */}
              </div>
            </div>
            <div>
              {/* className="max-height" */}
              {upcomingEvents.map((event) => (
                <div key={event._id} className="col-md-12 event-card mb-2">
                  <div className="event-card-image">
                    <img
                      src={event.imageUrl || ""}
                      alt="Event"
                      className="img-fluid"
                      onError={(event) => {
                        event.target.onerror = null;
                        event.target.src =
                          "https://st2.depositphotos.com/1635204/7654/i/450/depositphotos_76549817-stock-photo-word-events-on-colorful-wooden.jpg";
                      }}
                    />
                  </div>
                  <div className="event-card-details">
                    <h3>{event.name}</h3>
                    <p>
                      <b>Date & Time:</b>{" "}
                      {new Date(event.dateAndTime).toUTCString()}
                    </p>
                    <p>
                      <b>Location:</b> {event.location}
                    </p>
                    <p>
                      <b>Category:</b> {event.category}
                    </p>
                    <p>
                      <b>Description:</b> {event.description}
                    </p>
                  </div>
                  <div className="event-card-buttons">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleViewEvent(event)}
                    >
                      View Event
                    </button>
                    {/* <button
                      className="btn btn-secondary"
                      onClick={() => handleEditEvent(event)}
                    >
                      Edit Event
                    </button>
                    <button className="btn btn-success">Complete Event</button> */}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* <div className="row">
            <div className="col-md-12 mb-2">
              <h1 className="header-title">Completed events</h1>
            </div>
            <div className="max-height">
              {completedEvents.map((event) => (
                <div key={event.id} className="col-md-12 event-card mb-2">
                  <div className="event-card-image">
                    <img src={event.imageUrl} alt="Event" className="img-fluid" />
                  </div>
                  <div className="event-card-details">
                    <h3>{event.name}</h3>
                    <p>
                      <b>Date & Time: </b>
                      {new Date(event.dateAndTime).toUTCString()}
                    </p>
                    <p>
                      <b>Location: </b>
                      {event.location}
                    </p>
                    <p>
                      <b>Category: </b>
                      {event.category}
                    </p>
                    <p>
                      <b>Description: </b>
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      )}
    </>
  );
}

export default EventList;
