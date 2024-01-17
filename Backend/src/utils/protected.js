//Author: Dhruvin Dankhara

const { StatusCodes } = require("http-status-codes");
const { response } = require("../utils/response");
const { Message } = require("./Message");

const isOrganizer = async (req, res, next) => {
  const user = req.user;
  if (user?.userType && user?.userType == "organizer") {
    return next();
  }

  return response(
    res,
    StatusCodes.FORBIDDEN,
    false,
    {},
    Message.USER.NOT_AUTHORIZED
  );
};

module.exports = { isOrganizer };
