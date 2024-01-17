//Author: Dhruvin Dankhara

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./EventDetails.css";
import { getEventDetailById } from "../../../services/eventApi";
import { Rating } from "../../../Components/Rate/Rating";
import ToastMessage from "../../../Components/Toast/Toast";
import {
  DownOutlined,
  SortDescendingOutlined,
  SortAscendingOutlined,
} from "@ant-design/icons";
import {
  getAllCommentOfEvent,
  postComment,
} from "../../../services/commentApi";
import { Button, Divider, Dropdown, Space } from "antd";
import Loading from "../../../Components/Loading/Loading";

function EventDetails() {
  // let eventInWishlist = false
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [eventDetails, setEventDetails] = useState({});
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);
  const [eventInWishlist, setEventInWishlist] = useState(false);

  const getEventDetailByIdApiCall = async () => {
    setLoading(true);
    const apiResponse = await getEventDetailById(id);
    if (apiResponse) {
      setEventDetails(apiResponse.data?.data);
    }
    getAllComments();
    setLoading(false);
  };

  const getAllComments = async (data) => {
    const response = await getAllCommentOfEvent(id, data);
    console.log(response);
    setCommentsList(response.data?.comments);
    setLoading(false);
  };

  const handleMenuClick = async (e) => {
    console.info("Click on menu item.");
    const data = {
      createdAt: e.key,
    };
    await getAllComments(data);
    console.log("click", e);
  };
  const items = [
    {
      label: "latest",
      key: -1,
      icon: <SortDescendingOutlined />,
    },
    {
      label: "oldest",
      key: 1,
      icon: <SortAscendingOutlined />,
    },
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const handleCommentSubmit = async () => {
    if (comment.trim() !== "") {
      //API CALL for creating comment
      const response = await postComment(id, comment);
      if (response.status) {
        // show toast message
        ToastMessage("Comment created successfully");
        setLoading(true);
        await getAllComments();
      } else {
        // show something went wrong
        ToastMessage("Error creating comment", "Error");
      }
      setComment("");
    }
  };

  // author: Preetha Kachhadiya
  const checkEventInWishlist = async () => {
    const requestOptions = {
      method: "POST", // Set the request method to POST (you can use 'GET', 'POST', 'PUT', 'DELETE', etc.)
      headers: {
        "Content-Type": "application/json", // Specify the content type of the payload
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      // localStorage.getItem("userId");
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
        eventId: id,
      }), // Replace { key: 'value' } with your actual payload
    };
    const response = await fetch(
      process.env.REACT_APP_BASE_URL + "/wishlist/checkEventInWishlist",
      requestOptions
    );
    const data = await response.json();
    // eventInWishlist = data.data.isEventInWishlist
    setEventInWishlist(data.data.isEventInWishlist);
    // setTimeout(() => {
    console.log("EventInWishlist", eventInWishlist);
    console.log("checkEventInWishlist", data);
    // }, 500);
  };

  const handleRemoveFromWishlist = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
        eventId: id,
      }),
    };
    const response = await fetch(
      process.env.REACT_APP_BASE_URL + "/wishlist/remove",
      requestOptions
    ); // Replace with your API endpoint URL
    if (!response.ok) {
      throw new Error("Network response was not ok");
    } else {
      checkEventInWishlist();
    }
  };
  const handleAddToWishlist = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
        eventId: id,
      }),
    };
    const response = await fetch(
      process.env.REACT_APP_BASE_URL + "/wishlist/add",
      requestOptions
    ); // Replace with your API endpoint URL
    if (!response.ok) {
      throw new Error("Network response was not ok");
    } else {
      checkEventInWishlist();
    }
  };

  useEffect(() => {
    getEventDetailByIdApiCall();
    checkEventInWishlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="container event-details-container">
          <div className="row">
            <div className="col-md-6">
              <img
                src={eventDetails.imageUrl || ""}
                alt="Event"
                className="img-fluid event-image"
                onError={(event) => {
                  event.target.onerror = null;
                  event.target.src =
                    "https://st2.depositphotos.com/1635204/7654/i/450/depositphotos_76549817-stock-photo-word-events-on-colorful-wooden.jpg";
                }}
              />
            </div>
            <div className="col-md-6">
              <div className="event-details">
                <div className="d-flex justify-content-between">
                  <h2>{eventDetails.name}</h2>
                  <h4>
                    {eventInWishlist && (
                      <i
                        class="bi bi-bookmark-fill"
                        onClick={handleRemoveFromWishlist}
                      ></i>
                    )}
                    {!eventInWishlist && (
                      <i
                        class="bi bi-bookmark"
                        onClick={handleAddToWishlist}
                      ></i>
                    )}
                    {/* <i className="bi bi-bookmark"></i>} */}
                  </h4>
                </div>
                <p>
                  <b>Date & Time: </b>
                  {new Date(eventDetails.dateAndTime).toLocaleString(
                    undefined,
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    }
                  )}
                </p>
                <p>
                  <b>Location: </b>
                  {eventDetails.location}
                </p>
                <p>
                  <b>Category: </b>
                  {eventDetails.category}
                </p>
                <p>
                  <b>Description: </b>
                  {eventDetails.description}
                </p>
              </div>
            </div>
          </div>
          <Divider />
          <div className="row mt-2">
            {/* <div className="col-md-2"> */}
            <Rating eventId={id} />
            <div className="mt-4" />
            <Divider />
            <div>
              <div className="comment-rating-header">
                <h3>Add a Review</h3>
              </div>
              <textarea
                className="form-control"
                rows="4"
                placeholder="Write your comment here..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <div className="comment-submit-btn">
                <button
                  className="btn btn-secondary mt-2 "
                  onClick={handleCommentSubmit}
                >
                  Submit Review
                </button>
              </div>
              {/* </div> */}
            </div>
            <div>
              <div className="comments-section">
                <div class="horizontal-container">
                  <h3>Reviews</h3>
                  <div className="horizontal-items">
                    <Dropdown menu={menuProps}>
                      <Button>
                        <Space>
                          Sort By
                          <DownOutlined />
                        </Space>
                      </Button>
                    </Dropdown>
                    <Button onClick={() => getAllComments({ limit: 10 })}>
                      View All
                    </Button>
                  </div>
                </div>
                <ul className="comment-list">
                  {commentsList.map((commentObj, index) => (
                    <div className="comment-card">
                      <div className="comment-header">
                        <span className="comment-user">
                          {commentObj.userId.firstName}{" "}
                          {commentObj.userId.lastName}
                        </span>
                        <span className="comment-date">
                          {new Date(commentObj.createdAt).toLocaleString(
                            undefined,
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                            }
                          )}
                        </span>
                      </div>
                      <div className="comment-text">
                        <p>{commentObj.text}</p>
                      </div>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EventDetails;
