//author: Faizal
import React, { Component, useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class AnalyticsEventPieChart extends Component {
  state = {
    ageDays: "-1",
    ageresponse: [],
    url: process.env.REACT_APP_BASE_URL,
  };

  componentDidMount() {
    this.setState({
      id: this.props.id,
      ageDays: localStorage.getItem("ageDefault"),
    });
    this.fetchEventData(this.props.id);
  }

  fetchEventData(id) {
    try {
      let data = {
        id: id,
        ageDays: this.state.ageDays,
        // ageDays: 7,
      };
      // Send the POST request
      fetch(`${this.state.url}/analytics/getAge`, {
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
          const ageresponse = result.data.ageresponse.filter(
            (item) => item.y !== 0
          );
          console.log(ageresponse);
          this.setState({
            ageresponse,
            isLoading: false,
          });
        })
        .catch((error) => {
          console.error("Error:", error);
          this.setState({ isLoading: false }); // Set isLoading to false in case of an error
        });
    } catch (error) {
      console.error("Error fetching games:", error);
      this.setState({ isLoading: false }); // Set isLoading to false in case of an error
    }
  }
  handleOnTimeChange = (event) => {
    const { value } = event.target;
    this.setState({ ageDays: value }, () => {
      this.fetchEventData(this.state.id);
    });
  };

  handleClick = () => {
    try {
      let data = {
        id: localStorage.getItem("userId"),
        ageDefault: this.state.ageDays,
      };
      // Send the POST request
      fetch(`${this.state.url}analytics/setAge`, {
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
          localStorage.setItem("ageDefault", result.data.ageDefault);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.error("Error setting default for age:", error);
    }
  };

  render() {
    const { ageDays, ageresponse } = this.state;
    const options = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light2", // "light1", "dark1", "dark2"
      title: {
        text: "Age Group",
      },
      data: [
        {
          type: "pie",
          indexLabel: "{label}: {y}",
          startAngle: 0,
          dataPoints: ageresponse,
        },
      ],
    };
    return (
      <React.Fragment>
        <div className="row mt-3 mt-md-0 mb-3">
          <div className="col-md-12 text-center">
            <select value={ageDays} onChange={this.handleOnTimeChange}>
              <option value="-1">All Time</option>
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="180">Last 180 days</option>
            </select>
            <button
              type="button"
              className="btn btn-link"
              onClick={this.handleClick}
            >
              Set as default
            </button>
          </div>
        </div>
        <div>
          <CanvasJSChart key={ageDays} options={options} />
        </div>
      </React.Fragment>
    );
  }
}

export default AnalyticsEventPieChart;
