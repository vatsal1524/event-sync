import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const [recommendedEvents, setRecommendedEvents] = useState([]);
  const [visibleEvents] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    fetch(
      process.env.REACT_APP_BASE_URL +
        `/recommendation/recommendation/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((responseData) => {
        if (responseData) {
          setRecommendedEvents(responseData.data.events);
        }
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, []);

  const handleShowMoreSuggestedClick = () => {
    const categories = Object.keys(groupedEvents);
    console.log(categories);
    navigate("/events-list", { state: { categories } });
  };

  const handleShowMoreClick = (categories) => {
    console.log(categories);
    navigate("/events-list", { state: { categories } });
  };

  const groupedEvents = recommendedEvents.reduce((groups, event) => {
    if (!groups[event.category]) {
      groups[event.category] = [];
    }
    groups[event.category].push(event);
    return groups;
  }, {});

  const handleEventCardClick = (eventId) => {
    navigate(`/event-details/${eventId}`);
  };

  return (
    <div className="dashboard-container px-2">
      <div className="mt-5">
        <div className="d-flex justify-content-between mb-2">
          <h2 className="mb-3">Suggested Events</h2>
          {recommendedEvents.length > visibleEvents && (
            <button
              className="show-more-btn"
              onClick={handleShowMoreSuggestedClick}
            >
              Show More
            </button>
          )}
        </div>
        <div className="scrollable-container d-flex justify-content-start flex-nowrap">
          {recommendedEvents.slice(0, visibleEvents).map((event) => (
            <div
              key={event._id}
              className="event-card scrollable-container"
              onClick={() => handleEventCardClick(event._id)}
            >
              <img
                src={event.imageUrl}
                alt={`Event ${event._id}`}
                className="event-image"
              />
              <div className="event-details">
                <h5>{event.name}</h5>
                <p>
                  <b>Category:</b> {event.category}
                </p>
                <p>
                  <b>Location:</b> {event.location}
                </p>
                <p>
                  <b>Description:</b> {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {Object.keys(groupedEvents).map((category) => (
        <div key={category} className="mt-5">
          <div className="d-flex justify-content-between mb-2">
            <h2 className="mb-3">{category} Events</h2>
            {groupedEvents[category].length > visibleEvents && (
              <button
                className="show-more-btn"
                onClick={() => handleShowMoreClick(groupedEvents[category])}
              >
                Show More
              </button>
            )}
          </div>
          <div className="scrollable-container d-flex justify-content-start flex-nowrap">
            {groupedEvents[category].slice(0, visibleEvents).map((event) => (
              <div key={event._id} className="event-card scrollable-container">
                <img
                  src={event.imageUrl}
                  alt={`Event ${event._id}`}
                  className="event-image"
                />
                <div className="event-details">
                  <h5>{event.name}</h5>
                  <p>
                    <b>Category:</b> {event.category}
                  </p>
                  <p>
                    <b>Location:</b> {event.location}
                  </p>
                  <p>
                    <b>Description:</b> {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
