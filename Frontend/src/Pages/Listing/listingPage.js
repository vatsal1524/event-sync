import React, { useState, useEffect, componentDidMount } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import SearchBar from "./searchBar";
import SortBySelect from "./sortBySelect";
import FilterDropdowns from "./filterDropdowns";
import EventCard from "./eventCard";
import FilterButton from "./filterButton";
import Loading from "../../Components/Loading/Loading";
import "./listingPage.css";
import ToastMessage from "../../Components/Toast/Toast";

function ListingPage() {
  const state = useLocation();
  console.log("State", state);

  let stateCategories = [];
  if (state.state) {
    stateCategories = state.state.categories;
  }

  const userId = localStorage.getItem("userId");
  const [events, setEvents] = useState([]);
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [sortBy, setSortBy] = useState("Time");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [userInterests, setUserInterests] = useState(stateCategories);
  const [loading, setLoading] = useState(false);

  console.log("User interests", userInterests);

  const fetchInitialData = () => {
    setLoading(true);
    const requestBody = {
      searchInput,
      sortBy,
      selectedLocation,
      selectedCategory,
      selectedPrice,
      userId,
      userInterests,
    };

    axios
      .post(process.env.REACT_APP_BASE_URL + "/listing/events", requestBody)
      .then((response) => {
        const { events, locations, categories } = response.data.data;
        setEvents(events);
        setLocations(locations);
        setCategories(categories);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const handleJoinClick = (eventId) => {
    const currentTime = new Date().toISOString();

    const requestBody = {
      eventId,
      userId,
      time: currentTime,
    };

    console.log(requestBody);
    axios
      .post(process.env.REACT_APP_BASE_URL + "/listing/join", requestBody)
      .then((response) => {
        const { updatedEvent } = response.data.data;

        console.log(updatedEvent._id);
        const eventIndex = events.findIndex(
          (event) => event._id === updatedEvent._id
        );

        console.log(eventIndex);
        if (eventIndex !== -1) {
          const updatedEvents = [...events];
          updatedEvents[eventIndex] = updatedEvent;

          setEvents(updatedEvents);
          console.log(updatedEvents);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    ToastMessage("Event Joined!");
  };

  const handleSearchClick = () => {
    console.log(searchInput);

    const requestBody = {
      searchInput,
      sortBy,
      selectedLocation,
      selectedCategory,
      selectedPrice,
      userId,
      userInterests,
    };

    axios
      .post(process.env.REACT_APP_BASE_URL + "/listing/events", requestBody)
      .then((response) => {
        const { events, locations, categories } = response.data.data;
        setEvents(events);
        setLocations(locations);
        setCategories(categories);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSortByChange = (event) => {
    const selectedValue = event.target.value;
    console.log(selectedValue);
    setSortBy(selectedValue);

    const requestBody = {
      searchInput,
      sortBy: selectedValue,
      selectedLocation,
      selectedCategory,
      selectedPrice,
      userId,
      userInterests,
    };

    axios
      .post(process.env.REACT_APP_BASE_URL + "/listing/events", requestBody)
      .then((response) => {
        const { events, locations, categories } = response.data.data;
        setEvents(events);
        setLocations(locations);
        setCategories(categories);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleFilterClick = () => {
    setSelectedLocation(selectedLocation);
    setSelectedCategory(selectedCategory);
    setSelectedPrice(selectedPrice);
    console.log(selectedCategory, selectedLocation, selectedPrice);

    const requestBody = {
      searchInput,
      sortBy,
      selectedLocation,
      selectedCategory,
      selectedPrice,
      userId,
      userInterests,
    };

    axios
      .post(process.env.REACT_APP_BASE_URL + "/listing/events", requestBody)
      .then((response) => {
        const { events, locations, categories } = response.data.data;
        setEvents(events);
        setLocations(locations);
        setCategories(categories);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div style={{ margin: "20px" }}>
          <Row>
            <Col md={12}>
              <SearchBar
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                handleSearchClick={handleSearchClick}
              />
            </Col>
            <Col md={12} className="sort-by-container">
              <SortBySelect
                sortBy={sortBy}
                handleSortByChange={handleSortByChange}
              />
            </Col>
          </Row>
          <Row className="row-border">
            <Col md={12} className="col-margin">
              <FilterDropdowns
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                selectedPrice={selectedPrice}
                setSelectedPrice={setSelectedPrice}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                locations={locations}
                categories={categories}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <FilterButton handleFilterClick={handleFilterClick} />
            </Col>
          </Row>
          <div className="card-container d-flex justify-content-left flex-wrap">
            {events.length > 0 ? (
              events.map((event, index) => (
                <EventCard
                  key={index}
                  event={event}
                  userId={userId}
                  handleJoinClick={handleJoinClick}
                />
              ))
            ) : (
              <div className="col-md-12">
                <div className="card mb-3">
                  <div className="card-body">No events found.</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ListingPage;
