import React, { useEffect, useState } from "react";
import { Rate } from "antd";
import classes from "./Rating.module.css";
import ToastMessage from "../Toast/Toast";
import { fetchRating, giveRating } from "../../services/RatingApi";
const desc1 = {
  terrible: 1,
  bad: 2,
  normal: 3,
  good: 4,
  wonderful: 5,
};
const desc = ["terrible", "bad", "normal", "good", "wonderful"];

export const Rating = (props) => {
  const [value, setValue] = useState(0);
  const [total_review, setTotalReview] = useState();
  const [overallRating, setOverallRating] = useState();
  const eventId = props.eventId;

  const handleOnChangeRate = async (value) => {
    console.log(value);
    const response = await giveRating(eventId, value);
    if (response.status) {
      ToastMessage("Thank you for rating");
    } else {
      ToastMessage("Something went wrong!!!", "Fails");
    }

    await fetchRatingApi(eventId);
  };

  const fetchRatingApi = async () => {
    const response = await fetchRating(eventId);
    if (response.status) {
      setTotalReview(response.data.totalRatingCount);
      setOverallRating(response.data.eventRating);
      setValue(response.data.userRating);
    }
    console.log(response);
  };

  useEffect(() => {
    fetchRatingApi();
  }, []);
  // setTotalReview(23);
  return (
    <div>
      <div className={classes.HRI}>
        <div className={classes.VRI}>
          <h4>Overall Rating</h4>
          <h2
            style={{
              paddingRight: 20,
            }}
          >
            {overallRating} /
            <a
              style={{
                fontSize: 20,
              }}
            >
              5
            </a>
            {/* <Rate disabled defaultValue={overallRating} /> */}
          </h2>
          <text
            style={{
              fontSize: 15,
            }}
          >
            Based on {total_review} reviews
          </text>
        </div>
        <div className={classes.VRI}>
          <div className={classes.VRI}>
            <h3>Rate us</h3>
            <Rate
              tooltips={desc}
              onChange={(value) => handleOnChangeRate(value)}
              value={value}
              defaultValue={0}
            />
          </div>
          {/* {value ? <span className="ant-rate-text">{`${value}`}</span> : ""} */}
        </div>
      </div>
    </div>
  );
};
