const { StatusCodes } = require("http-status-codes");
const { Message } = require("../../utils/Message");
const { response } = require("../../utils/response");
const commentRepository = require("../../repository/comment.repository");

const postComment = async (req, res) => {
  try {
    const eventId = req.params?.id;
    const body = req.body;
    console.log(eventId);
    const data = {
      eventId: eventId,
      userId: req.user._id,
      text: body.text,
    };
    console.log(data);
    const result = await commentRepository.createComment(data);
    // const result = "Post Comment";
    return response(
      res,
      StatusCodes.ACCEPTED,
      true,
      result,
      Message.COMMENT.CREATE
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

const getCommentsbyEventId = async (req, res) => {
  try {
    const eventId = req.params?.id;
    const conditions = req.query;
    console.log(conditions);
    const result = await commentRepository.getCommentsbyEventId(
      eventId,
      conditions
    );
    return response(
      res,
      StatusCodes.ACCEPTED,
      true,
      result,
      Message.COMMENT.GET
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
  postComment,
  getCommentsbyEventId,
};
