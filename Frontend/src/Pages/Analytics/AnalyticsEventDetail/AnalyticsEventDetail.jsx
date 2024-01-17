//author: Faizal
import React, { Component } from "react";

class AnalyticsEventDetail extends Component {
  state = {
    event: {},
    isLoading: true,
    url: process.env.REACT_APP_BASE_URL,
  };

  componentDidMount() {
    this.setState({ id: this.props.id });
    this.fetchEventData(this.props.id);
  }

  fetchEventData(id) {
    try {
      let data = {
        id: id,
        // peopleDays: 6,
        // ageDays: 7,
      };
      // Send the POST request
      fetch(`${this.state.url}/analytics/getEvent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((result) => {
          // Handle the response from the API
          console.log(result); // Do something with the response
          if (!result.status) {
            this.props.setIDStatus(-1);
          } else {
            this.props.setGraphs(1);
            const event = result.data;
            this.setState({
              event,
              isLoading: false,
            });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          this.props.setIDStatus(-1);
          this.setState({ isLoading: false }); // Set isLoading to false in case of an error
        });
    } catch (error) {
      console.error("Error fetching games:", error);
      this.setState({ isLoading: false }); // Set isLoading to false in case of an error
    }
  }

  getDate = (timestamp) => {
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
  };

  getTime = (timestamp) => {
    const dateObject = new Date(timestamp);

    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();

    const ampm = hours >= 12 ? "PM" : "AM";
    const twelveHourFormat = (hours % 12 || 12).toString().padStart(2, "0");

    const formattedTime = `${twelveHourFormat}:${minutes
      .toString()
      .padStart(2, "0")} ${ampm}`;

    return formattedTime;
    // console.log(formattedTime); // Output: "05:39 AM"
  };

  render() {
    const id = this.props.id;
    const eventData = this.state.event;
    if (this.state.isLoading) {
      return <div>"Loading"</div>;
    }
    console.log(this.state);
    return (
      <React.Fragment>
        <h3 className="text-center py-2">{eventData.name}</h3>
        <div className="eventDetails row pt-2">
          <div className="col-md-7">
            <img
              className="w-100"
              src={eventData.imageUrl || ""}
              onError={(event) => {
                event.target.onerror = null;
                event.target.src =
                  "https://st2.depositphotos.com/1635204/7654/i/450/depositphotos_76549817-stock-photo-word-events-on-colorful-wooden.jpg";
              }}
            ></img>
          </div>
          <div className="col-md-5 my-auto">
            <div className="d-flex flex-column justify-content-start text-start">
              <span className="mb-1">
                <b>Event created date:</b> {this.getDate(eventData.createdAt)}
              </span>
              <span className="mb-1">
                <b>Event Date:</b> {this.getDate(eventData.dateAndTime)}
              </span>
              <span className="mb-1">
                <b>Event Time:</b> {this.getTime(eventData.dateAndTime)}
              </span>
              <span className="mb-1">
                <b>No of people viewed:</b> 1000
              </span>
              <span className="mb-1">
                <b>No of people joined:</b> {eventData.users.length}
              </span>
              <span className="mb-1">
                <b>Event type:</b> {eventData.category}
              </span>
              <span className="mb-1">
                <b>Tags:</b> {eventData.tags.join(", ")}
              </span>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AnalyticsEventDetail;
