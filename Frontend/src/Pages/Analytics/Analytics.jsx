//author: Faizal
import React, { Component } from "react";
import AnalyticsEventDetail from "./AnalyticsEventDetail/AnalyticsEventDetail";
import AnalyticsEventDataDetails from "./AnalyticsEventDataDetails/AnalyticsEventDataDetails";
import { useParams } from "react-router-dom";
function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class Analytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      IDstatus: 0,
      graphStatus: 0,
    };
  }

  componentDidMount() {
    const { id } = this.props.params;

    this.setState({ id });
  }

  setIDStatus = (IDstatus) => {
    console.log(IDstatus);
    this.setState({ IDstatus: IDstatus });
  };

  setGraphs = (graphStatus) => {
    console.log(graphStatus);
    this.setState({ graphStatus: graphStatus });
  };

  render() {
    if (this.state.id === "") {
      return <div>Loading...</div>; // Show a loading indicator while the API request is in progress
    }
    return (
      <React.Fragment>
        <div className="mx-3">
          {!this.state.IDstatus ? (
            <>
              <AnalyticsEventDetail
                id={this.state.id}
                setIDStatus={this.setIDStatus}
                setGraphs={this.setGraphs}
              ></AnalyticsEventDetail>
              {this.state.graphStatus ? (
                <AnalyticsEventDataDetails
                  id={this.state.id}
                ></AnalyticsEventDataDetails>
              ) : null}
              <div className="pb-5"></div>
            </>
          ) : (
            <>Invalid ID Passed</>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default withParams(Analytics);
