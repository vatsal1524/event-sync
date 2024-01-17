//author: Faizal

const { StatusCodes } = require("http-status-codes");
const { response } = require("../../utils/response");
const notificationsRepository = require("../../repository/notifications.repository");
const { Message } = require("../../utils/Message");
const { async } = require("@firebase/util");

const addNotifications = async (req, res) => {
  try {
    const data = req.body.data;
    const queries = req.body.query;
    const result = await notificationsRepository.addNotifications(
      queries,
      data
    );
    return response(
      res,
      StatusCodes.ACCEPTED,
      true,
      result,
      Message.NOTIFICATION.CREATE
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

const getNotifications = async (req, res) => {
  try {
    const userId = req.body.userId;
    const result = await notificationsRepository.getNotifications(userId);
    return response(
      res,
      StatusCodes.ACCEPTED,
      true,
      result,
      Message.NOTIFICATION.GET
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
  addNotifications,
  getNotifications,
};
