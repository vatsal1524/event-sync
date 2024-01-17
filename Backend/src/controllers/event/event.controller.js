//Author: Dhruvin Dankhara
const { StatusCodes } = require("http-status-codes");
const { response } = require("../../utils/response");
const eventRepository = require("../../repository/event.repository");
const notificationsRepository = require("../../repository/notifications.repository");
const { Message } = require("../../utils/Message");
const { uploadFile } = require("../../utils/fileUpload");

const getEvents = async (req, res) => {
  try {
    const queryParams = req.query;
    const result = await eventRepository.getAllEvents(queryParams);
    return response(res, StatusCodes.ACCEPTED, true, result, Message.EVENT.GET);
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

const createEvent = async (req, res) => {
  try {
    const data = req.body;
    const filePath = await uploadFile(req.files);
    const result = await eventRepository.createEvent({
      ...data,
      imageUrl: filePath,
    });
    await notificationsRepository.addNotifications(
      {
        interests: result.category,
      },
      {
        notificationType: "notification",
        title: "New Event Added",
        body:
          "A new event named " +
          result.name +
          " with your interest " +
          result.category +
          " has been added recently",
        status: "Success",
      }
    );
    return response(
      res,
      StatusCodes.ACCEPTED,
      true,
      result,
      Message.EVENT.CREATE
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

const updateEvent = async (req, res) => {
  try {
    const eventId = req.params?.id;
    const data = req.body;
    const filePath = await uploadFile(req.files);
    console.log(data, filePath);
    const result = await eventRepository.updateEvent(eventId, {
      ...data,
      imageUrl: filePath,
    });
    result.users.forEach(async (user) => {
      console.log(user);
      await notificationsRepository.addNotifications(
        {
          _id: user.userId._id,
        },
        {
          notificationType: "notification",
          title: "Event Updated",
          body: "The event " + result.name + " has been updated",
          status: "Warning",
        }
      );
    });
    return response(
      res,
      StatusCodes.ACCEPTED,
      true,
      result,
      Message.EVENT.UPDATE
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

const getEventById = async (req, res) => {
  try {
    const eventId = req.params?.id;
    const result = await eventRepository.getEventById(eventId);
    return response(res, StatusCodes.ACCEPTED, true, result, Message.EVENT.GET);
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

const completeEventById = async (req, res) => {
  try {
    const eventId = req.params?.id;
    const data = {
      isCompleted: true,
    };
    const result = await eventRepository.updateEvent(eventId, data);
    result.users.forEach(async (user) => {
      await notificationsRepository.addNotifications(
        {
          _id: user.userId._id,
        },
        {
          notificationType: "notification",
          title: "Event Completed",
          body: "The event " + result.name + " has been completed",
          status: "Danger",
        }
      );
    });
    return response(
      res,
      StatusCodes.ACCEPTED,
      true,
      result,
      Message.EVENT.COMPLETE
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
const cancelEvent = async (req, res) => {
  try {
    const eventId = req.params?.id;
    const result = await eventRepository.cancelEvent(eventId);
    return response(
      res,
      StatusCodes.ACCEPTED,
      true,
      result,
      Message.EVENT.DELETE
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
  createEvent,
  getEvents,
  updateEvent,
  completeEventById,
  cancelEvent,
  getEventById,
};
