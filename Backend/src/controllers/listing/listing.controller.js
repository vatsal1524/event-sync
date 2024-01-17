//author: Vatsal

const { StatusCodes } = require("http-status-codes");
const { response } = require("../../utils/response");
const listingRepository = require("../../repository/listing.repository");
const notificationsRepository = require("../../repository/notifications.repository");
const { Message } = require("../../utils/Message");

const getEvents = async (req, res) => {
  try {
    const data = req.body;
    const result = await listingRepository.getEvents(data);
    return response(
      res,
      StatusCodes.ACCEPTED,
      true,
      result,
      Message.LISTING.GET_EVENTS
    );
  } catch (error) {
    console.log(error);
    return response(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      false,
      {},
      Message.INTERNAL_SERVER_ERROR
    );
  }
};

const addUserToEvent = async (req, res) => {
  try {
    const data = req.body;
    const result = await listingRepository.addUserToEvent(data);
    console.log(result);
    await notificationsRepository.addNotifications(
      {
        _id: result.updatedEvent?.ownerId,
      },
      {
        notificationType: "notification",
        title: "User joined",
        body: "A new user has joined your event - " + result.updatedEvent?.name,
        status: "Warning",
      }
    );
    return response(
      res,
      StatusCodes.CREATED,
      true,
      result,
      Message.LISTING.ADD_USER_TO_EVENT
    );
  } catch (error) {
    console.log(error);
    return response(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      false,
      {},
      Message.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = {
  getEvents,
  addUserToEvent,
};
