const { default: mongoose } = require("mongoose");
const { Comment } = require("../model/comment.model");

const createComment = async (data) => {
  return Comment.create(data);
};

const getCommentsbyEventId = async (eventId, queryParams) => {
  const { skip = 0, limit = 10, createdAt = -1 } = queryParams;
  let filter = {};
  if (eventId) {
    filter = {
      ...filter,
      eventId: mongoose.Types.ObjectId(eventId),
    };
  }

  const sortBy = {
    createdAt: createdAt,
  };

  const cursor = await Comment.find(filter)
    // Populate user details and select first name and last name
    .populate("userId", ["firstName", "lastName"])
    .select(["text", "createdAt", "userId"])
    .skip(skip)
    .limit(limit)
    .sort(sortBy);
  return {
    comments: cursor,
  };
};

module.exports = {
  createComment,
  getCommentsbyEventId,
};
