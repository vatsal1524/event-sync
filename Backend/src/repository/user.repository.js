// author: Mehul Bhunsadiya
const { User } = require("../model/User.model");

const createUser = async (user) => {
  return User.create(user);
};

const addFCMToken = async (user, fcmToken) => {
  try {
    if (user.fcmTokens !== undefined && user.fcmTokens.length > 0) {
      if (!user.fcmTokens.includes(fcmToken)) {
        user.fcmTokens.push(fcmToken);
      } else {
        return user;
      }
    } else {
      let arr = [];
      arr.push(fcmToken);
      user.fcmTokens = arr;
    }
    return user.save();
  } catch (ex) {
    console.log(ex);
  }
};

const findUserByEmail = async (email) => {
  return User.findOne({
    email: email,
  });
};

const findById = async (id) => {
  return User.findById(id).select("-password");
};

const findByIdAndUpdate = async (id, user) => {
  return User.findByIdAndUpdate(id, user, {
    new: true,
  })
    .select("-password")
    .exec();
};

const findByIdAndDelete = async (id) => {
  return User.findByIdAndDelete(id);
};

module.exports = {
  createUser,
  addFCMToken,
  findUserByEmail,
  findById,
  findByIdAndUpdate,
  findByIdAndDelete,
};
