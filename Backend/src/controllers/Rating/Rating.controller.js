const { StatusCodes } = require("http-status-codes");
const { Message } = require("../../utils/Message");
const { response } = require("../../utils/response");
const ratingRepository = require("../../repository/rating.repository");

const postRating = async (req, res) => {
  try {
    const eventId = req.params?.id;
    const bodyData = req.body;
    const data = {
      userId: req.user._id,
      eventId: eventId,
      rating: +bodyData.rating,
    };
    const result = await ratingRepository.createRating(data);
    // const result = "Post Comment";
    return response(
      res,
      StatusCodes.ACCEPTED,
      true,
      result,
      Message.RATING.CREATE
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

const getRatingOfUserAndEvent = async (req, res) => {
  try {
    const eventId = req.params?.id;
    const result = await ratingRepository.getUserAndEventRating({
      eventId: eventId,
      userId: req.user._id,
    });
    return response(
      res,
      StatusCodes.ACCEPTED,
      true,
      result,
      Message.RATING.GET
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
  postRating,
  getRatingOfUserAndEvent,
  // getCommentsbyEventId,
};
