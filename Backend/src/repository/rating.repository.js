const { default: mongoose } = require("mongoose");
const { Rating } = require("../model/rating.model");

const createRating = async (data) => {
  const query = {
    userId: mongoose.Types.ObjectId(data.userId),
    eventId: mongoose.Types.ObjectId(data.eventId),
  };
  return Rating.updateOne(query, { rating: +data.rating }, { upsert: true });
};

const getUserAndEventRating = async (data) => {
  const query = {
    userId: mongoose.Types.ObjectId(data.userId),
    eventId: mongoose.Types.ObjectId(data.eventId),
  };

  const agg = [
    {
      $match: {
        eventId: mongoose.Types.ObjectId(data.eventId),
      },
    },
    {
      $group: {
        _id: {
          eventId: mongoose.Types.ObjectId(data.eventId),
        },
        overAllRating: {
          $avg: "$rating",
        },
        count: {
          $count: {},
        },
      },
    },
  ];

  const result = await Rating.aggregate(agg);
  console.log(result);

  const userRating = await Rating.findOne(query);
  return {
    userRating: userRating?.rating || 0,
    eventRating: result[0]?.overAllRating || 0,
    totalRatingCount: result[0]?.count || 0,
  };
};

// const getCommentsbyEventId = async (eventId, queryParams) => {
//   const { skip = 0, limit = 10, createdAt = -1 } = queryParams;
//   let filter = {};
//   if (eventId) {
//     filter = {
//       ...filter,
//       eventId: mongoose.Types.ObjectId(eventId),
//     };
//   }

//   const sortBy = {
//     createdAt: createdAt,
//   };

//   const cursor = await Comment.find(filter)
//     // Populate user details and select first name and last name
//     .populate("userId", ["firstName", "lastName"])
//     .select(["text", "createdAt", "userId"])
//     .skip(skip)
//     .limit(limit)
//     .sort(sortBy);
//   return {
//     comments: cursor,
//   };
// };

module.exports = {
  createRating,
  getUserAndEventRating,
  // getCommentsbyEventId,
};
