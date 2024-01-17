//Author: Dhruvin Dankhara

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, ConfigProvider, Form, Modal, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  getAllMyEvents,
  sendRequestApiCall,
  setEventToComplete,
} from "../../../services/eventApi";
import "./myEvent.css";
import ToastMessage from "../../../Components/Toast/Toast";
import Loading from "../../../Components/Loading/Loading";

function MyEvents() {
  const navigate = useNavigate();
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [completedEvents, setCompletedEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async (values) => {
    console.log(values);
    if (values.upload && values.upload !== undefined) {
      const response = await sendRequestApiCall(values.upload);
      setIsModalOpen(false);
    } else {
      ToastMessage("Please select a file to upload", "fail");
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const formItemLayout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const navigateToWishlist = (event) => {
    navigate(`/analytics/${event._id}`);
  };

  const eventListApiCall = async () => {
    setLoading(true);
    const apiResponse = await getAllMyEvents();
    if (apiResponse) {
      setUpcomingEvents(
        apiResponse.data?.data?.events.filter((event) => !event.isCompleted)
      );
      setCompletedEvents(
        apiResponse.data?.data?.events.filter((event) => event.isCompleted)
      );
    }
    setLoading(false);
  };

  const completeEventApiCall = async (eventId) => {
    setLoading(true);
    try {
      const apiResponse = await setEventToComplete(eventId);
      if (apiResponse.status === 202) {
        console.log("Event update successful");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("userType") === "organizer") {
      eventListApiCall();
    }
  }, []);

  const handleViewEvent = (event) => {
    navigate(`/event-details/${event._id}`, {
      state: event,
    });
  };

  const handleEditEvent = (event) => {
    navigate(`/edit-event/${event._id}`, {
      state: event,
    });
  };

  const handleCreateEvent = (event) => {
    const userType = localStorage.getItem("userType");
    if (userType === "organizer") {
      navigate(`/create-event`);
    } else {
      showModal();
    }
  };

  const handleCompleteEvent = async (event) => {
    await completeEventApiCall(event._id);
    eventListApiCall();
  };

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#6c757d",
          },
        }}
      >
        {loading ? (
          <Loading />
        ) : (
          <div className="container event-list-container">
            <div>
              <h1>My Event List</h1>
            </div>
            <div className="row event-card-buttons">
              <div className="tab-switcher">
                <button
                  style={{
                    marginRight: 20,
                  }}
                  className={`tab-button ${
                    activeTab === "upcoming" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("upcoming")}
                >
                  Upcoming/Ongoing Events
                </button>
                <button
                  className={`tab-button ${
                    activeTab === "completed" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("completed")}
                >
                  Completed Events
                </button>
              </div>
            </div>
            <div className="row">
              <div className="d-flex justify-content-between mb-2">
                <h1 className="header-title">
                  {activeTab === "upcoming"
                    ? "Upcoming/Ongoing events"
                    : "Completed events"}
                </h1>
                {activeTab === "upcoming" && (
                  <div className="event-card-buttons">
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleCreateEvent()}
                    >
                      Create Event
                    </button>
                    <Modal
                      title="Request for event organizer"
                      open={isModalOpen}
                      onCancel={handleCancel}
                      footer={[]}
                    >
                      <Form {...formItemLayout} onFinish={handleOk}>
                        <Form.Item
                          name="upload"
                          label="Certificate"
                          valuePropName="fileList"
                          getValueFromEvent={normFile}
                          extra=""
                        >
                          <Upload
                            name="logo"
                            // action="/upload.do"
                            listType="picture"
                            beforeUpload={(file) => {
                              const isJPG =
                                file.type === "image/jpeg" ||
                                file.type === "image/png";
                              if (!isJPG) {
                                console.error(
                                  "You can only upload JPG or PNG file!"
                                );
                                return false;
                              }
                              return false;
                            }}
                          >
                            <Button icon={<UploadOutlined />}>
                              Click to upload your certificate
                            </Button>
                          </Upload>
                        </Form.Item>
                        <Form.Item
                          {...tailLayout}
                          style={{
                            marginRight: 50,
                          }}
                        >
                          <Button type="primary" htmlType="submit">
                            Submit
                          </Button>
                          <Button htmlType="button" onClick={handleCancel}>
                            Cancel
                          </Button>
                        </Form.Item>
                      </Form>
                    </Modal>
                  </div>
                )}
              </div>
              <div>
                {activeTab === "upcoming"
                  ? upcomingEvents.map((event) => (
                      <div
                        key={event._id}
                        className="col-md-12 event-card mb-2"
                      >
                        {/* ... (upcoming event card markup) */}
                        <div className="event-card-image">
                          <img
                            src={event.imageUrl || ""}
                            alt="Event"
                            className="img-fluid"
                            onError={(event) => {
                              event.target.onerror = null;
                              event.target.src =
                                "https://st2.depositphotos.com/1635204/7654/i/450/depositphotos_76549817-stock-photo-word-events-on-colorful-wooden.jpg";
                            }}
                          />
                        </div>
                        <div className="event-card-details">
                          <h3>{event.name}</h3>
                          <p>
                            <b>Date & Time: </b>
                            {new Date(event.dateAndTime).toUTCString()}
                          </p>
                          <p>
                            <b>Location: </b>
                            {event.location}
                          </p>
                          <p>
                            <b>Category: </b>
                            {event.category}
                          </p>
                          <p>
                            <b>Description: </b>
                            {event.description}
                          </p>
                        </div>
                        <div className="event-card-buttons">
                          <button
                            className="btn btn-primary"
                            onClick={() => handleViewEvent(event)}
                          >
                            View Event
                          </button>
                          <button
                            className="btn btn-secondary"
                            onClick={() => handleEditEvent(event)}
                          >
                            Edit Event
                          </button>
                          <button
                            className="btn btn-success"
                            onClick={() => handleCompleteEvent(event)}
                          >
                            Complete Event
                          </button>
                          <button
                            className="btn btn-primary"
                            onClick={() => navigateToWishlist(event)}
                          >
                            Analytics
                          </button>
                        </div>
                      </div>
                    ))
                  : completedEvents.map((event) => (
                      <div
                        key={event._id}
                        className="col-md-12 event-card mb-2"
                      >
                        {/* ... (completed event card markup) */}
                        <div className="event-card-image">
                          <img
                            src={event.imageUrl}
                            alt="Event"
                            className="img-fluid"
                          />
                        </div>
                        <div className="event-card-details">
                          <h3>{event.name}</h3>
                          <p>
                            <b>Date & Time: </b>
                            {new Date(event.dateAndTime).toUTCString()}
                          </p>
                          <p>
                            <b>Location: </b>
                            {event.location}
                          </p>
                          <p>
                            <b>Category: </b>
                            {event.category}
                          </p>
                          <p>
                            <b>Description: </b>
                            {event.description}
                          </p>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        )}
      </ConfigProvider>
    </>
  );
}

export default MyEvents;
