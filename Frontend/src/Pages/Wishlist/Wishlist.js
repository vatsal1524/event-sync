import React, { useState, useEffect } from "react";
import EventCardWishlist from "./eventCardWishlist";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./Wishlist.css";
// import Header from '../../Components/Header/Header'
// import Footer from '../../Components/Footer/Footer'
// import { useNavigate } from 'react-router-dom'

const base_url = process.env.REACT_APP_BASE_URL;

function Wishlist() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [allevents, setAllEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState("");
  // const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false);

  const getAllEvents = async () => {
    // Function to fetch data from the API
    // const fetchData = async () => {
    try {
      const requestOptions = {
        method: "POST", // Set the request method to POST (you can use 'GET', 'POST', 'PUT', 'DELETE', etc.)
        headers: {
          "Content-Type": "application/json", // Specify the content type of the payload
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        // localStorage.getItem("userId");
        body: JSON.stringify({
          userId: localStorage.getItem("userId"),
          filterBy: "",
          sortBy: "",
        }), // Replace { key: 'value' } with your actual payload
      };
      const response = await fetch(base_url + "/wishlist", requestOptions);
      const data = await response.json();
      console.log(data.data.events);
      setAllEvents(data.data.events);
      setEvents(data.data.events, () => {
        console.log("Updated events:", events);
      });
      console.log("wishlist events", events);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  const handleRemoveEventFromWishlist = async () => {
    console.log("eventID in remvoeEvent", selectedEventId);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
        eventId: selectedEventId,
      }),
    };
    const response = await fetch(base_url + "/wishlist/remove", requestOptions); // Replace with your API endpoint URL
    if (!response.ok) {
      throw new Error("Network response was not ok");
    } else {
      setSelectedEventId("");
      getAllEvents();
    }
    closeRemoveEventFromWishlistConfirmationModal();
  };

  const openRemoveEventFromWishlistConfirmationModal = (eventId) => {
    setSelectedEventId(eventId);
    setShowModal(true);
  };

  const closeRemoveEventFromWishlistConfirmationModal = () => {
    setSelectedEventId(null);
    setShowModal(false);
  };

  const handleEventDetail = (eventId) => {
    // navigate('')
  };

  const [searchQuery, setSearchQuery] = useState("");
  // const [searchResults, setSearchResults] = useState(events)

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      const filteredData = allevents.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setEvents(filteredData);
    } else {
      setEvents(allevents);
    }
  };

  const handleFilter = async (filter) => {
    setFilter(filter);

    // Function to fetch data from the API
    // const fetchData = async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          userId: localStorage.getItem("userId"),
          filterBy: filter,
          sortBy: sortBy,
        }),
      };
      const response = await fetch(base_url + "/wishlist", requestOptions);
      const data = await response.json();
      console.log(data.data.events);
      setEvents(data.data.events, () => {
        console.log("Updated events:", events);
      });
      console.log("wishlist events", events);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
    // }
  };

  const handleSort = async (sortBy) => {
    setSortBy(sortBy);

    // Function to fetch data from the API
    // const fetchData = async () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          userId: localStorage.getItem("userId"),
          filterBy: filter,
          sortBy: sortBy,
        }),
      };
      const response = await fetch(base_url + "/wishlist", requestOptions);
      const data = await response.json();
      console.log(data.data.events);
      setEvents(data.data.events, () => {
        console.log("Updated events:", events);
      });
      console.log("wishlist events", events);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }

    // }
  };

  return (
    <div>
      <Modal
        show={showModal}
        centered
        onHide={closeRemoveEventFromWishlistConfirmationModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Remove Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove this event from the wishlist?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="w-auto"
            onClick={closeRemoveEventFromWishlistConfirmationModal}
          >
            No
          </Button>
          <Button variant="primary" onClick={handleRemoveEventFromWishlist}>
            Yes, remove event
          </Button>
        </Modal.Footer>
      </Modal>
      <div class="my-4 mx-2">
        <div class="d-flex flex-column flex-md-row justify-content-between">
          <div className="mx-3">
            <h2>
              My Wishlist <i class="bi bi-bookmarks-fill"></i>
            </h2>
          </div>
          <div class="d-flex flex-column flex-md-row align-items-md-center">
            <div class="input-group my-2" style={{ minWidth: "300px" }}>
              <input
                type="text"
                class="form-control"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search Event"
              />
              <button
                class="btn btn-outline-secondary me-4"
                type="button"
                id="button-addon2"
              >
                <i class="bi bi-search"></i>
              </button>
            </div>
            {/* <div className='d-flex'> */}
            <div class="dropdown mx-3 my-2">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Sort By:
                {sortBy === "date" && " Date"}
                {sortBy === "nameAscending" && " Name(Ascending)"}
                {sortBy === "nameDescending" && " Name(Descending)"}
              </button>
              <ul class="dropdown-menu">
                <li>
                  <span
                    class="dropdown-item"
                    onClick={() => handleSort("date")}
                  >
                    Date
                  </span>
                </li>
                <li>
                  <span
                    class="dropdown-item"
                    onClick={() => handleSort("nameAscending")}
                  >
                    Name(Ascending order)
                  </span>
                </li>
                <li>
                  <span
                    class="dropdown-item"
                    onClick={() => handleSort("nameDescending")}
                  >
                    Name(Descending order)
                  </span>
                </li>
              </ul>
            </div>
            <div class="dropdown mx-3 my-2">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Filter By:
                {filter === "thisWeek" && " This Week"}
                {filter === "thisMonth" && " This Month"}
                {filter === "withinSixMonths" && " Six Months"}
              </button>
              <ul class="dropdown-menu">
                <li>
                  <span
                    class="dropdown-item"
                    onClick={() => handleFilter("thisWeek")}
                  >
                    This Week
                  </span>
                </li>
                <li>
                  <span
                    class="dropdown-item"
                    onClick={() => handleFilter("thisMonth")}
                  >
                    This Month
                  </span>
                </li>
                <li>
                  <span
                    class="dropdown-item"
                    onClick={() => handleFilter("withinSixMonths")}
                  >
                    Within Six Months
                  </span>
                </li>
                <li>
                  <span class="dropdown-item" onClick={() => handleFilter("")}>
                    Show All
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
      {/* <div class=' d-flex justify-content-around'> */}
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-4 mx-4">
        {events &&
          events?.map((event) => (
            <EventCardWishlist
              key={event.id}
              event={event}
              handleRemoveEventFromWishlist={
                openRemoveEventFromWishlistConfirmationModal
              }
              handleEventDetail={handleEventDetail}
            />
          ))}
      </div>
      {/* </div> */}
    </div>
  );
}

export default Wishlist;
