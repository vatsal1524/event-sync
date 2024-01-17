//author: Faizal

const { StatusCodes } = require("http-status-codes");
const { response } = require("../../utils/response");
const analyticsRepository = require("../../repository/analytics.repository");
const { Message } = require("../../utils/Message");

const getAnalyticsDetail = async (req, res) => {
  try {
    const bodyParams = req.body;
    const result = await analyticsRepository.getAnalyticsDetail(bodyParams);
    return response(
      res,
      StatusCodes.ACCEPTED,
      true,
      result,
      Message.ANALYTICS.GET
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

const getEventAnalyticsDetail = async (req, res) => {
  try {
    const bodyParams = req.body;
    const result = await analyticsRepository.getEventAnalyticsDetail(
      bodyParams
    );
    return response(
      res,
      StatusCodes.ACCEPTED,
      true,
      result,
      Message.ANALYTICS.GET
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

const getPeopleAnalyticsDetail = async (req, res) => {
  try {
    const bodyParams = req.body;
    const result = await analyticsRepository.getPeopleAnalyticsDetail(
      bodyParams
    );
    return response(
      res,
      StatusCodes.ACCEPTED,
      true,
      result,
      Message.ANALYTICS.GET
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

const getAgeAnalyticsDetail = async (req, res) => {
  try {
    const bodyParams = req.body;
    const result = await analyticsRepository.getAgeAnalyticsDetail(bodyParams);
    return response(
      res,
      StatusCodes.ACCEPTED,
      true,
      result,
      Message.ANALYTICS.GET
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

const setPeopleAnalyticsDefault = async (req, res) => {
  try {
    const bodyParams = req.body;
    const result = await analyticsRepository.setPeopleAnalyticsDefault(
      bodyParams
    );
    return response(
      res,
      StatusCodes.ACCEPTED,
      true,
      result,
      Message.ANALYTICS.GET
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

const setAgeAnalyticsDefault = async (req, res) => {
  try {
    const bodyParams = req.body;
    const result = await analyticsRepository.setAgeAnalyticsDefault(bodyParams);
    return response(
      res,
      StatusCodes.ACCEPTED,
      true,
      result,
      Message.ANALYTICS.GET
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
  getAnalyticsDetail,
  setPeopleAnalyticsDefault,
  setAgeAnalyticsDefault,
  getEventAnalyticsDetail,
  getPeopleAnalyticsDetail,
  getAgeAnalyticsDetail,
};
