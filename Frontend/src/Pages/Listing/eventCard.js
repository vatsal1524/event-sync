import React from "react";
import { MdLocationOn } from "react-icons/md";
import { FaCalendarAlt, FaRegClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function EventCard({ event, userId, handleJoinClick }) {
  const navigate = useNavigate();
  return (
    <div className="card mb-4 mx-4" style={{ width: "60vh" }}>
      <div className="card-image">
        <img
          className="card-img-top"
          src={event.imageUrl ? event.imageUrl : "https://placehold.co/700x390"}
        />
      </div>
      <div className="card-content">
        <div className="card-body">
          <div className="card-details">
            <div className="card-location">
              <MdLocationOn className="location-icon" /> {event.location}
            </div>
            <div className="card-ticket">
              <span className="ticket-price">${event.ticketPrice}</span>
            </div>
          </div>
          <div className="card-title event-title">{event.name}</div>
          <p className="card-text left-aligned">
            <strong>Category:</strong> {event.category}
          </p>
          <div className="card-text left-aligned event-date-time">
            <div className="event-date">
              <FaCalendarAlt className="calendar-icon" />{" "}
              {new Date(event.dateAndTime).toLocaleDateString()}
            </div>
            <div className="event-time">
              <FaRegClock className="clock-icon" />{" "}
              {new Date(event.dateAndTime).toLocaleTimeString()}
            </div>
          </div>
          <div className="card-buttons">
            <button
              className="view-details-button"
              onClick={() => navigate(`/event-details/${event._id}`)}
            >
              VIEW DETAILS
            </button>
            {!event.users.some((user) => user.userId === userId) && (
              <button
                className="join-button"
                onClick={() => handleJoinClick(event._id)}
              >
                + JOIN
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
