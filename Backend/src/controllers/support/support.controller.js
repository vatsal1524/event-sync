//author: Vatsal

const { StatusCodes } = require("http-status-codes");
const { response } = require("../../utils/response");
const supportRepository = require("../../repository/support.repository");
const { Message } = require("../../utils/Message");

const getFaqs = async (req, res) => {
  try {
    const result = await supportRepository.getFaqs();
    return response(
      res,
      StatusCodes.ACCEPTED,
      true,
      result,
      Message.SUPPORT.GET_FAQS
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

const getAdminQueryById = async (req, res) => {
  try {
    const userId = req.params?.userId;
    const result = await supportRepository.getAdminQueryById(userId);
    return response(
      res,
      StatusCodes.ACCEPTED,
      true,
      result,
      Message.SUPPORT.GET_ADMIN_QUERY
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

const createAdminQuery = async (req, res) => {
  try {
    const userId = req.params?.userId;
    const data = req.body;
    const result = await supportRepository.createAdminQuery(userId, data);
    await notificationsRepository.addNotifications(
      {
        _id: userId,
      },
      {
        notificationType: "notification",
        title: "Query created",
        body: "A ticket has been generated for " + result.title,
        status: "Success",
      }
    );
    return response(
      res,
      StatusCodes.CREATED,
      true,
      result,
      Message.SUPPORT.CREATE_ADMIN_QUERY
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
  getFaqs,
  getAdminQueryById,
  createAdminQuery,
};
