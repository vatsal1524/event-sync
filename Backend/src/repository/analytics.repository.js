//author: Faizal

const { Event } = require("../model/Event.model");
const { User } = require("../model/User.model");
const mongoose = require("mongoose");

const getAnalyticsDetail = async (bodyParams) => {
  // Fetch the data from MongoDB where user enrollment date is greater than or equal to the threshold date
  //   const events = await Event.find({
  //     "users.dateJoined": { $gte: dateThreshold },
  //     _id: mongoose.Types.ObjectId(bodyParams.id),
  //   });

  const events = await Event.find({
    _id: mongoose.Types.ObjectId(bodyParams.id),
  })
    .populate("users.userId") // Populate the 'users' array with user details based on the 'userId'
    .exec();

  if (events.length == 0) {
    throw new Error("No such event found!");
  }

  if (events[0].users.length == 0) {
    const response = {
      peopleresponse: [],
      ageresponse: [],
      event: events[0],
    };

    return response;
  }

  console.log(events, events[0].users[0].userId, events[0].users[1].userId);
  let thresholdDate = null;
  if (bodyParams.peopleDays !== "-1") {
    const today = new Date();
    thresholdDate = new Date(
      today.getTime() - bodyParams.peopleDays * 24 * 60 * 60 * 1000
    );
  }

  // Group the users by dateJoined and count the number of users for each date
  const userCounts = events[0].users.reduce((counts, user) => {
    const date = new Date(user.dateJoined);
    // Filter the user based on the threshold date
    if (!thresholdDate || date >= thresholdDate) {
      const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`;

      if (counts[formattedDate]) {
        counts[formattedDate]++;
      } else {
        counts[formattedDate] = 1;
      }
    }
    return counts;
  }, {});

  // Convert the userCounts object to the desired response format
  const peopleresponse = Object.keys(userCounts).map((date) => {
    return { label: date, y: userCounts[date] };
  });

  const ageGroups = [
    { min: 10, max: 20, label: "10-19" },
    { min: 20, max: 30, label: "20-29" },
    { min: 30, max: 40, label: "30-39" },
    { min: 40, max: 50, label: "40-49" },
    { min: 50, max: 60, label: "40-59" },
    { min: 60, max: Infinity, label: "60+" },
  ];

  thresholdDate = null;
  if (bodyParams.ageDays !== "-1") {
    const today = new Date();
    thresholdDate = new Date(
      today.getTime() - bodyParams.ageDays * 24 * 60 * 60 * 1000
    );
  }

  const ageresponse = ageGroups.map((group) => {
    const count = events[0].users.filter((user) => {
      const date = new Date(user.dateJoined);
      return (
        user.userId.age >= group.min &&
        user.userId.age < group.max &&
        (!thresholdDate || date >= thresholdDate)
      );
    }).length;
    return { label: group.label, y: count };
  });

  const response = {
    peopleresponse,
    ageresponse,
    event: events[0],
  };

  return response;
};

const getEventAnalyticsDetail = async (bodyParams) => {
  const events = await Event.find({
    _id: mongoose.Types.ObjectId(bodyParams.id),
  })
    .populate("users.userId") // Populate the 'users' array with user details based on the 'userId'
    .exec();

  if (events.length == 0) {
    throw new Error("No such event found!");
  }

  return events[0];
};

const getPeopleAnalyticsDetail = async (bodyParams) => {
  const events = await Event.find({
    _id: mongoose.Types.ObjectId(bodyParams.id),
  })
    .populate("users.userId") // Populate the 'users' array with user details based on the 'userId'
    .exec();

  if (events.length == 0) {
    throw new Error("No such event found!");
  }

  if (events[0].users.length == 0) {
    const response = {
      peopleresponse: [],
    };

    return response;
  }

  let thresholdDate = null;
  if (bodyParams.peopleDays !== "-1") {
    const today = new Date();
    thresholdDate = new Date(
      today.getTime() - bodyParams.peopleDays * 24 * 60 * 60 * 1000
    );
  }

  // Group the users by dateJoined and count the number of users for each date
  const userCounts = events[0].users.reduce((counts, user) => {
    const date = new Date(user.dateJoined);
    // Filter the user based on the threshold date
    if (!thresholdDate || date >= thresholdDate) {
      const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`;

      if (counts[formattedDate]) {
        counts[formattedDate]++;
      } else {
        counts[formattedDate] = 1;
      }
    }
    return counts;
  }, {});

  // Convert the userCounts object to the desired response format
  const peopleresponse = Object.keys(userCounts).map((date) => {
    return { label: date, y: userCounts[date] };
  });

  const response = {
    peopleresponse,
  };

  return response;
};

const getAgeAnalyticsDetail = async (bodyParams) => {
  const events = await Event.find({
    _id: mongoose.Types.ObjectId(bodyParams.id),
  })
    .populate("users.userId") // Populate the 'users' array with user details based on the 'userId'
    .exec();

  if (events.length == 0) {
    throw new Error("No such event found!");
  }

  if (events[0].users.length == 0) {
    const response = {
      ageresponse: [],
    };

    return response;
  }

  console.log(events, events[0].users[0].userId, events[0].users[1].userId);
  const ageGroups = [
    { min: 10, max: 20, label: "10-19" },
    { min: 20, max: 30, label: "20-29" },
    { min: 30, max: 40, label: "30-39" },
    { min: 40, max: 50, label: "40-49" },
    { min: 50, max: 60, label: "40-59" },
    { min: 60, max: Infinity, label: "60+" },
  ];

  thresholdDate = null;
  if (bodyParams.ageDays !== "-1") {
    const today = new Date();
    thresholdDate = new Date(
      today.getTime() - bodyParams.ageDays * 24 * 60 * 60 * 1000
    );
  }

  const ageresponse = ageGroups.map((group) => {
    const count = events[0].users.filter((user) => {
      const date = new Date(user.dateJoined);
      return (
        user.userId.age >= group.min &&
        user.userId.age < group.max &&
        (!thresholdDate || date >= thresholdDate)
      );
    }).length;
    return { label: group.label, y: count };
  });

  const response = {
    ageresponse,
  };

  return response;
};

const setPeopleAnalyticsDefault = async (bodyParams) => {
  const { peopleDefault, id } = bodyParams;

  const updatedUser = await User.findByIdAndUpdate(
    mongoose.Types.ObjectId(id),
    { $set: { peopleDefault } },
    { new: true }
  );

  if (!updatedUser) {
    throw new Error("User not found");
  }

  return updatedUser;
};

const setAgeAnalyticsDefault = async (bodyParams) => {
  const { ageDefault, id } = bodyParams;

  const updatedUser = await User.findByIdAndUpdate(
    mongoose.Types.ObjectId(id),
    { $set: { ageDefault } },
    { new: true }
  );

  if (!updatedUser) {
    throw new Error("User not found");
  }

  return updatedUser;
};

module.exports = {
  getAnalyticsDetail,
  setPeopleAnalyticsDefault,
  setAgeAnalyticsDefault,
  getEventAnalyticsDetail,
  getPeopleAnalyticsDetail,
  getAgeAnalyticsDetail,
};
