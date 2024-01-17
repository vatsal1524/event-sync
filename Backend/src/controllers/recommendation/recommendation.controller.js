//author: Mehulkumar Bhunsadiya

const { StatusCodes } = require("http-status-codes");
const { response } = require("../../utils/response");
const recommendationRepository = require("../../repository/recommendation.repository");
const { Message } = require("../../utils/Message");

const getRecommendationById = async (req, res) => {
  try {
    const userId = req.params?.userId;
    const result = await recommendationRepository.getRecommendationById(userId);
    return response(
      res,
      StatusCodes.ACCEPTED,
      true,
      result,
      Message.RECOMMENDATION.GET_RECOMMENDATION_BY_ID
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
    getRecommendationById
};
