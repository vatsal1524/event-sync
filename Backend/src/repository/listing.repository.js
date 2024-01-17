//author: Vatsal

const { Event } = require("../model/Event.model");

const getEvents = async (data) => {
  const {
    searchInput,
    sortBy,
    selectedLocation,
    selectedCategory,
    selectedPrice,
    userInterests,
  } = data;

  // Fetch events
  const events = await Event.find();

  let matchingEvents = [...events];

  // Filter events based on user interests
  if (userInterests.length !== 0) {
    matchingEvents = events.filter((event) =>
      userInterests?.includes(event.category)
    );
  }

  // Extract unique locations and categories from events
  const uniqueLocations = [
    ...new Set(matchingEvents.map((event) => event.location)),
  ];
  const uniqueCategories = [
    ...new Set(matchingEvents.map((event) => event.category)),
  ];

  let searchedEvents = [...matchingEvents];
  if (searchInput !== "") {
    searchedEvents = matchingEvents.filter(
      (event) =>
        event.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        event.description.toLowerCase().includes(searchInput.toLowerCase())
    );
  }

  // Filter events based on selectedLocation
  let filteredEvents = [...searchedEvents];
  if (selectedLocation !== "") {
    filteredEvents = filteredEvents.filter(
      (event) => event.location === selectedLocation
    );
  }

  if (selectedCategory !== "") {
    filteredEvents = filteredEvents.filter(
      (event) => event.category === selectedCategory
    );
  }

  if (selectedPrice === "<20") {
    filteredEvents = filteredEvents.filter((event) => event.ticketPrice < 20);
  } else if (selectedPrice === "20-50") {
    filteredEvents = filteredEvents.filter(
      (event) => event.ticketPrice >= 20 && event.ticketPrice <= 50
    );
  } else if (selectedPrice === "50-100") {
    filteredEvents = filteredEvents.filter(
      (event) => event.ticketPrice >= 50 && event.ticketPrice <= 100
    );
  } else if (selectedPrice === ">100") {
    filteredEvents = filteredEvents.filter((event) => event.ticketPrice > 100);
  }

  // Sort events based on sortBy
  let sortedEvents = [...filteredEvents];
  if (sortBy === "Time") {
    sortedEvents.sort((a, b) => a.dateAndTime - b.dateAndTime);
  } else if (sortBy === "Ticket Price") {
    sortedEvents.sort((a, b) => a.ticketPrice - b.ticketPrice);
  }

  console.log(sortedEvents, uniqueCategories, uniqueLocations);
  return {
    events: sortedEvents,
    locations: uniqueLocations,
    categories: uniqueCategories,
  };
};

const addUserToEvent = async (data) => {
  const { eventId, userId, time } = data;

  // Find the event by eventId and update the users array
  const updatedEvent = await Event.findOneAndUpdate(
    { _id: eventId },
    {
      $push: {
        users: {
          userId: userId,
          dateJoined: time,
        },
      },
    },
    { new: true }
  );

  if (updatedEvent) {
    return { updatedEvent };
  } else {
    throw new Error("Event not found!");
  }
};

module.exports = {
  getEvents,
  addUserToEvent,
};
