import React, { useState, useEffect } from "react";
// import EventCardWishlist from "./eventCardWishlist";
import {Table, Navbar, Nav} from "react-bootstrap";
import Button from "react-bootstrap/Button";
// import "./Wishlist.css";
// import Header from '../../Components/Header/Header'
// import Footer from '../../Components/Footer/Footer'
import { useNavigate } from 'react-router-dom'

// const base_url = "http://localhost:3000";
const base_url = process.env.REACT_APP_BASE_URL;
// const base_url = "https://web-group-project-backend-server.onrender.com";

function Approvals() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [allRequests, setAllRequests] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState("");
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false);

  const getAllApprovalRequests = async () => {
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
      const response = await fetch(base_url + "/admin/get-approval-requests", requestOptions);
      const data = await response.json();
      console.log(data.data);
      setAllRequests(data.data);
      // setEvents(data.data.events, () => {
      //   console.log("Updated events:", events);
      // });
      console.log("All Request", allRequests);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    getAllApprovalRequests();
  }, []);

  const updateApprovalRequest = async (request, status) => {
    const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            request_id: request._id,
            approval_status: status,
            user_id: request.user_id
          }),
        };
        const response = await fetch(base_url + "/admin/update-approval-request", requestOptions); // Replace with your API endpoint URL
        if (!response.ok) {
          throw new Error("Network response was not ok");
        } else {
          getAllApprovalRequests()
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
                  navigate("/admin/queries");
                }}
                className="nav-link px-2"
              >
                Pending Queries
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
        <h2 className="mb-4">Approval Requests</h2>
        <Table responsive>
          <thead>
            <tr className="">
              <th>User Email</th>
              <th>Certificate</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allRequests?.map((item) => (
              <tr key={item._id}>
                <td>{item.user_email}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => window.open(item.certificate, '_blank')}
                  > Download Certificate
                  </Button>
                  {/* <a href={item.certificate} target="_blank"
                    rel="noreferrer noopener">
                    View Certificate
                </a> */}
                </td>
                <td>
                  <Button className="me-2" variant="success" onClick={() => updateApprovalRequest(item, 'approved')}>Approve</Button>
                  <Button variant="danger" onClick={() => updateApprovalRequest(item, 'declined')}>Decline</Button>
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
