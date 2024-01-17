import React from "react";
import defaultImage from "./Landing-page-background.jpg";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const { event } = props;
  const navigate = useNavigate()
  const handleRemoveEventFromWishlist = () => {
    console.log("eventID from eventCard", event._id);
    props.handleRemoveEventFromWishlist(event._id);
  };

  const handleEventDetail = () => {
    props.handleEventDetail(event._id);
  };

  const getDate = (timestamp) => {
    if (timestamp) {
      // Create a new Date object from the timestamp
      const dateObj = new Date(timestamp);

      // Get the individual components of the date (year, month, day)
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth() + 1; // Months are zero-based, so we add 1
      const day = dateObj.getDate();

      // Format the date as a string (YYYY-MM-DD)
      const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}`;

      return formattedDate;
    }
    return "Coming Soon";
  };

  const getTime = (timestamp) => {
    if (timestamp) {
      const dateObject = new Date(timestamp);

      const hours = dateObject.getHours();
      const minutes = dateObject.getMinutes();

      const ampm = hours >= 12 ? "PM" : "AM";
      const twelveHourFormat = (hours % 12 || 12).toString().padStart(2, "0");

      const formattedTime = `${twelveHourFormat}:${minutes
        .toString()
        .padStart(2, "0")} ${ampm}`;

      return formattedTime;
    }
    return "Coming Soon";
    // console.log(formattedTime); // Output: "05:39 AM"
  };

  return (
    <div className="col my-3 px-3">
      <div className="card h-100" style={{ minHeight: "380px" }}>
        <img
          src={event.imageUrl || ""}
          className="card-img-top "
          alt="logo"
          onError={(event) => {
            event.target.onerror = null;
            event.target.src =
              "https://st2.depositphotos.com/1635204/7654/i/450/depositphotos_76549817-stock-photo-word-events-on-colorful-wooden.jpg";
          }}
        />
        {/* <img src={event.imageUrl} className='card-img-top ' alt='logo' /> */}
        <div className="card-body">
          <h5
            className="card-title d-flex justify-content-center cursor-pointer"
            // style={{ cursor: 'pointer' }}
            onClick={handleEventDetail}
          >
            <span className="pe-2">{event.name}</span>
            <i className="bi bi-box-arrow-up-right" onClick={() => { console.log('EVENT', event); navigate('/event-details/' + event._id)}}></i>
          </h5>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <div>
                <span>
                  <i className="bi bi-calendar me-1"></i>
                  {getDate(event.dateAndTime)}
                </span>
              </div>
              <div>
                <span>
                  <i className="bi bi-clock me-1"></i>
                  {getTime(event.dateAndTime)}
                </span>
              </div>
              <div>
                <span>
                  <i className="bi bi-geo-alt-fill me-1"></i>
                  {event.location}
                </span>
              </div>
            </div>
            <div
              className="me-1"
              onClick={handleRemoveEventFromWishlist}
              // style={{ fontSize: '1.5rem' }}
            >
              <span className="cursor-pointer trash-icon">
                <i className="bi bi-trash3-fill"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
