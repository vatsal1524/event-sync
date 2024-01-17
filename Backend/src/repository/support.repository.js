//author: Vatsal

const { Faq } = require("../model/Faq.model");
const { AdminQuery } = require("../model/AdminQuery.model");

const getFaqs = async () => {
  const faqs = await Faq.find({});
  return faqs;
};

const getAdminQueryById = async (userId) => {
  const adminQueries = await AdminQuery.find({ userId });
  return adminQueries;
};

const createAdminQuery = async (userId, data) => {
  const { title, description } = data;
  const adminQuery = new AdminQuery({ userId, title, description });
  adminQuery.save();
  return adminQuery;
};

module.exports = {
  getFaqs,
  getAdminQueryById,
  createAdminQuery,
};
