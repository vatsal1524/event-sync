//author: Faizal
import React, { Component, useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class AnalyticsEventBarGraph extends Component {
  state = {
    selectedGraphValue: "column",
    peopleDays: "-1",
    peopleresponse: [],
    url: process.env.REACT_APP_BASE_URL,
  };

  componentDidMount() {
    this.setState({
      id: this.props.id,
      peopleDays: localStorage.getItem("peopleDefault"),
    });
    this.fetchEventData(this.props.id);
  }

  fetchEventData(id) {
    try {
      let data = {
        id: id,
        peopleDays: this.state.peopleDays,
        // ageDays: 7,
      };
      // Send the POST request
      fetch(`${this.state.url}/analytics/getPeople`, {
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
          const { peopleresponse } = result.data;
          console.log(peopleresponse);

          const compareLabels = (a, b) => {
            const dateA = new Date(`2023/${a.label}`);
            const dateB = new Date(`2023/${b.label}`);
            return dateA - dateB;
          };

          const sortedPeopleresponse = peopleresponse.sort(compareLabels);
          this.setState({
            peopleresponse: sortedPeopleresponse,
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
  handleOnGraphChange = (event) => {
    const { value } = event.target;
    this.setState({ selectedGraphValue: value });
  };
  handleOnTimeChange = (event) => {
    const { value } = event.target;

    this.setState({ peopleDays: value }, () => {
      this.fetchEventData(this.state.id);
    });
  };
  handleClick = () => {
    try {
      let data = {
        id: localStorage.getItem("userId"),
        peopleDefault: this.state.peopleDays,
      };
      // Send the POST request
      fetch(`${this.state.url}analytics/setPeople`, {
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
          localStorage.setItem("peopleDefault", result.data.peopleDefault);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.error("Error setting default for age:", error);
    }
  };
  render() {
    const { selectedGraphValue, peopleDays, peopleresponse } = this.state;
    const options = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light2", //"light1", "dark1", "dark2"
      title: {
        text:
          selectedGraphValue.charAt(0).toLocaleUpperCase() +
          selectedGraphValue.slice(1) +
          " Chart",
      },
      axisX: {
        title: "Date",
      },
      axisY: {
        title: "No of people registered",
        includeZero: true,
      },
      data: [
        {
          type: selectedGraphValue, //change type to bar, line, area, pie, etc
          //indexLabel: "{y}", //Shows y value on all Data Points
          indexLabelFontColor: "#5A5757",
          indexLabelPlacement: "outside",
          dataPoints: peopleresponse,
        },
      ],
    };
    return (
      <React.Fragment>
        <div className="row mb-3">
          <div className="col-6 text-center">
            <select
              value={selectedGraphValue}
              onChange={this.handleOnGraphChange}
            >
              <option value="column">Column</option>
              <option value="bar">Bar</option>
              <option value="line">Line</option>
              <option value="area">Area</option>
            </select>
          </div>
          <div className="col-6 text-center">
            <select value={peopleDays} onChange={this.handleOnTimeChange}>
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
          <CanvasJSChart
            key={peopleDays + selectedGraphValue}
            options={options}
            onRef={(ref) => (this.chart = ref)}
            /* containerProps={{ width: '100%', height: '300px' }} */
          />
          {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
        </div>
      </React.Fragment>
    );
  }
}

export default AnalyticsEventBarGraph;
