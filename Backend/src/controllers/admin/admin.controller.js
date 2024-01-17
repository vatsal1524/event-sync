// author: Preetha Kachhadiya

const { StatusCodes } = require("http-status-codes");
const { response } = require("../../utils/response");
const adminRepository = require("../../repository/admin.repository");
const notificationsRepository = require("../../repository/notifications.repository");
const { Message } = require("../../utils/Message");
const { uploadFile } = require("../../utils/fileUpload");

const getAllOpenAdminQueries = async (req, res) => {
  try {
    // const queryParams = req.body
    const result = await adminRepository.getAllOpenAdminQueries(req.body);
    console.log("result from get queries:", result);
    return response(
      res,
      StatusCodes.ACCEPTED,
      true,
      result,
      Message.ADMIN.GET_ADMIN_QUERY
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

const getPendingApprovalRequests = async (req, res) => {
  try {
    // const data = req.body
    const result = await adminRepository.getPendingApprovalRequests();
    return response(
      res,
      StatusCodes.ACCEPTED,
      true,
      result,
      Message.ADMIN.GET_ADMIN_APROVAL_REQUEST
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

const updateApprovalStatus = async (req, res) => {
  try {
    // const eventId = req.params?.id
    const data = req.body;
    const result = await adminRepository.updateApprovalStatus(data);
    let status = "Success";
    if (result.approval_status === "declined") {
      status = "Danger";
    }
    await notificationsRepository.addNotifications(
      {
        _id: result.user_id,
      },
      {
        notificationType: "notification",
        title: "Approval Status Updated",
        body:
          "Your approval status for posting events has been " +
          result.approval_status,
        status: status,
      }
    );
    return response(
      res,
      StatusCodes.ACCEPTED,
      true,
      result,
      Message.ADMIN.UPDATE_ADMIN_APROVAL_REQUEST
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

const updateAdminQuery = async (req, res) => {
  try {
    // const eventId = req.params?.id
    const data = req.body;
    const result = await adminRepository.updateAdminQuery(data);
    await notificationsRepository.addNotifications(
      {
        _id: result.userId,
      },
      {
        notificationType: "notification",
        title: "Query answered by admin",
        body: "Admin has answered to the ticket for " + result.title,
        status: "Success",
      }
    );
    return response(
      res,
      StatusCodes.ACCEPTED,
      true,
      result,
      Message.ADMIN.UPDATE_ADMIN_QUERY
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

const createEventOrganizerRequest = async (req, res) => {
  try {
    const filePath = await uploadFile(req.files);
    console.log(filePath);
    const data = {
      user_id: req.user._id,
      user_email: req.user.email,
      approval_status: "pending",
      certificate: filePath,
    };
    console.log(data);
    const result = await adminRepository.createAdminApprovalRequest(data);
    return response(
      res,
      StatusCodes.ACCEPTED,
      true,
      result,
      Message.ADMIN.CREATE_APPROVAL_REQUEST
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
  getAllOpenAdminQueries,
  getPendingApprovalRequests,
  updateApprovalStatus,
  updateAdminQuery,
  createEventOrganizerRequest,
  // completeEventById,
  // cancelEvent,
  // getEventById
};
