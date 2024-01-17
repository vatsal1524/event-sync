// author: Preetha Kachhadiya

const { AdminApproval } = require('../model/AdminApproval.model')
const { AdminQuery } = require('../model/AdminQuery.model')
const { User } = require('../model/User.model')
const mongoose = require('mongoose')
const sendMail = require("../utils/sendEmail");

const createAdminApprovalRequest = async (data) => {
  try {
    const createApproval = await AdminApproval.create(data);
    return createApproval;
  } catch (error) {
    throw new Error("Error in create query.");
  }
};

const getPendingApprovalRequests = async payload => {


    try {
      const pendingApprovals = await AdminApproval.find({ approval_status: 'pending' })
      return pendingApprovals
    }
    catch (error) {
      throw new Error('Error getting queries.')
    }

}

const updateApprovalStatus = async payload => {
  const { approval_status = '', request_id = '', user_id = ''} = payload

  try {
    const updatedApproval = await AdminApproval.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(request_id) },
      { $set: { approval_status: approval_status } },
      { new: true })
    if(approval_status === 'accepted') {

      const updatedUserType = await User.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(user_id) },
        { $set: { userType: "organizer" } },
        { new: true }
      )
    }

    console.log('updated approval status:', updatedApproval);
    const subject = "Approval request " + approval_status
    const html = "Your approval status for posting events has been " + approval_status
    await sendMail(updatedApproval.user_email, subject, html);

    return updatedApproval
  }
  catch (error) {
    throw new Error('Error updating approval.')
  }

}

const getAllOpenAdminQueries = async payload => {
  // Retrieve all records with status as 'pending'

  try {
    const pendingQueries = await AdminQuery.find({ status: 'open' }).populate('userId')
    console.log('pending queries:', pendingQueries);
    return pendingQueries
  }
  catch (error) {
    throw new Error('Error getting queries.')
  }
}

const updateAdminQuery = async payload => {
  const { response = '', query_id = ''} = payload

  try {
    const updatedQuery = await AdminQuery.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(query_id) },
      { $set: { response: response, status: 'closed' } },
      { new: true })

    return updatedQuery
  }
  catch (error) {
    throw new Error('Error updating query.')
  }

}

module.exports = {
  createAdminApprovalRequest,
  getAllOpenAdminQueries,
  getPendingApprovalRequests,
  updateApprovalStatus,
  updateAdminQuery
}
