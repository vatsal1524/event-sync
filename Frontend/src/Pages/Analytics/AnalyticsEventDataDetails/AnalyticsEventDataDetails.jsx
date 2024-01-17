//author: Faizal
import React, { Component } from "react";
import AnalyticsEventBarGraph from "./AnalyticsEventLeftGraph/AnalyticsEventLeftGraph";
import AnalyticsEventPieChart from "./AnalyticsEventPieChart/AnalyticsEventPieChart";

class AnalyticsEventDataDetails extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <hr></hr>
        <h3 className="text-center m-0">Data Analytics</h3>
        <hr></hr>
        <div className="row">
          <div className="col-md-6">
            <AnalyticsEventBarGraph id={this.props.id}></AnalyticsEventBarGraph>
          </div>
          <div className="col-md-6">
            <AnalyticsEventPieChart id={this.props.id}></AnalyticsEventPieChart>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AnalyticsEventDataDetails;
