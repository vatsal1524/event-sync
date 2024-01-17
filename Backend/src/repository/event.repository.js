const { default: mongoose } = require("mongoose");
const { Event } = require("../model/Event.model");

const createEvent = async (data) => {
  return Event.create(data);
};

const getAllEvents = async (queryParams) => {
  const { skip = 0, limit = 10, ownerId = null } = queryParams;
  let filter = {};
  if (ownerId) {
    filter = {
      ...filter,
      ownerId: mongoose.Types.ObjectId(ownerId),
    };
  }
  const cursor = await Event.find(filter).skip(skip).limit(limit);
  return {
    count: await Event.countDocuments(),
    events: cursor,
  };
};

const updateEvent = async (id, data) => {
  return Event.findOneAndUpdate({ _id: id }, data, { new: true })
    .populate("users.userId")
    .exec();
};
const cancelEvent = async (id) => {
  return Event.findByIdAndDelete({ _id: id });
};
const getEventById = async (id) => {
  return Event.findById(id);
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  cancelEvent,
};
