//author: Mehulkumar Bhunsadiya
const { User } = require("../model/User.model");
const { Event } = require("../model/Event.model");

const getRecommendationById = async (userId) => {
  // Fetch interests from the User collection using userId
  const userInterests = await User.findOne(
    { _id: userId },
    { interests: 1 }
  ).lean();

  // Fetch events
  const events = await Event.find();

  // Filter events based on user interests
  const matchingEvents = events.filter((event) =>
    userInterests?.interests.includes(event.category)
  );

  return {
    events: matchingEvents,
  };
};

module.exports = {
  getRecommendationById
};
