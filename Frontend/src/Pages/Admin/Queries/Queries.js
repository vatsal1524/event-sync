import React, { useState, useEffect } from "react";
// import EventCardWishlist from "./eventCardWishlist";
import {Table, Navbar, Nav, Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
// import "./Wishlist.css";
// import Header from '../../Components/Header/Header'
// import Footer from '../../Components/Footer/Footer'
import { useNavigate } from 'react-router-dom'

// const base_url = "http://localhost:3000";
const base_url = process.env.REACT_APP_BASE_URL
// const base_url = "https://web-group-project-backend-server.onrender.com";

function Approvals() {
  // const [events, setEvents] = useState([]);
  // const [filter, setFilter] = useState("");
  // const [sortBy, setSortBy] = useState("");
  const [allQueries, setAllQueries] = useState([]);
  // const [selectedEventId, setSelectedEventId] = useState("");
  const navigate = useNavigate()
  const [reply, setReply] = useState('');
  const [currentRequest, setCurrentRequest] = useState(null)
  const [showReplyModal, setShowReplyModal] = useState(false);

  const getAllOpenAdminQueries = async () => {
    // Function to fetch data from the API
    // const fetchData = async () => {
    try {
      const requestOptions = {
        method: "POST", // Set the request method to POST (you can use 'GET', 'POST', 'PUT', 'DELETE', etc.)
        headers: {
          "Content-Type": "application/json", // Specify the content type of the payload
          // Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        // localStorage.getItem("userId");
        body: JSON.stringify({}), // Replace { key: 'value' } with your actual payload
      };
      const response = await fetch(base_url + "/admin/get-queries", requestOptions);
      const data = await response.json();
      console.log(data.data);
      setAllQueries(data.data);
      // setEvents(data.data.events, () => {
      //   console.log("Updated events:", events);
      // });
      console.log("All Request", allQueries);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    getAllOpenAdminQueries();
  }, []);

  const updateApprovalRequest = async (requestID, status) => {
    const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            request_id: requestID,
            approval_status: status
          }),
        };
        const response = await fetch(base_url + "/admin/update-approval-request", requestOptions); // Replace with your API endpoint URL
        if (!response.ok) {
          throw new Error("Network response was not ok");
        } else {
          getAllOpenAdminQueries()
          // setSelectedEventId("");
          // getAllEvents();
        }
  }

  const openReplyModal = (item) => {
    setCurrentRequest(item)
    setShowReplyModal(true)
  }

  const closeReplyModal = () => {
    setCurrentRequest(null)
    setReply('')
    setShowReplyModal(false)
  }

  const handleReply = async () => {
    console.log('reply', reply);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        query_id: currentRequest._id,
        response: reply
      }),
    };
    const response = await fetch(base_url + "/admin/update-query", requestOptions); // Replace with your API endpoint URL
    if (!response.ok) {
      throw new Error("Network response was not ok");
    } else {
      getAllOpenAdminQueries()
      closeReplyModal()
      // getAllApprovalRequests()
      // setSelectedEventId("");
      // getAllEvents();
    }
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="md"
        bg="dark"
        data-bs-theme="dark"
        className="mb-4"
        id="header"
      >
        <Navbar.Brand className="ms-3">
          <span>
            <img
              src="https://cdn.logojoy.com/wp-content/uploads/2018/05/30163918/1241-768x591.png"
              style={{ width: "7%" }}
              alt="No image available"
            />
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="me-3">
          <Nav className="ms-3 ms-md-auto">
            <li className="nav-item me-5">
              <span
                onClick={(e) => {
                  navigate("/admin/approvalrequests");
                }}
                className="nav-link px-2"
              >
                Pending Approval Requests
              </span>
            </li>
            <li className="nav-item me-3">
              <span
                onClick={handleLogout}
                className="nav-link px-2"
              >
                Logout
              </span>
            </li>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="container text-center">
        <h2 className="mb-4">Queries</h2>
        <Modal show={showReplyModal} centered onHide={closeReplyModal}>
        <Modal.Header closeButton>
          <Modal.Title>Reply to a Query</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>Query Title: {currentRequest?.title}</p>
            <p>Desscription: {currentRequest?.description}</p>
            <textarea
              className="w-100"
              rows="5" // Number of visible rows
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Enter your text here..."
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' className="w-auto" onClick={closeReplyModal}>
            Cancel
          </Button>
          <Button variant='primary' onClick={handleReply}>
            Send Reply
          </Button>
        </Modal.Footer>
      </Modal>
        <Table responsive>
          <thead>
            <tr className="">
              <th style={{maxWidth: '100px'}}>User Name</th>
              <th style={{maxWidth: '150px'}}>Title</th>
              <th style={{maxWidth: '350px'}}>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allQueries?.map((item) => (
              <tr key={item._id}>
                <td style={{maxWidth: '100px'}}>{item.userId.firstName + " " + item.userId.lastName}</td>
                <td style={{maxWidth: '150px'}}>{item.title}</td>
                <td style={{maxWidth: '350px'}}>
                  {item.description}
                </td>
                <td>
                  {/* <Button className="me-2" variant="success" onClick={() => updateApprovalRequest(item._id, 'approved')}>Approve</Button> */}
                  <Button variant="success" onClick={() => openReplyModal(item)}>Reply</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
    </div>
  </>
  );
}

export default Approvals;
