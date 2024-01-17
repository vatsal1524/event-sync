//author: Faizal

const { Notification } = require("../model/Notification.model");
const { User } = require("../model/User.model");
const admin = require("firebase-admin");
const serviceAccount = require("./key.json");
const mongoose = require("mongoose");
const { async } = require("@firebase/util");
const { Event } = require("../model/Event.model");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const addNotifications = async (UserQueries, NotificationData) => {
  const query = {};

  for (const key in UserQueries) {
    query[key] = UserQueries[key];
  }
  User.find(query)
    .then((users) => {
      users.forEach((user) => {
        let tempNotificationData = NotificationData;
        tempNotificationData.userId = user._id;
        user.fcmTokens?.forEach((token) => {
          const message = {
            token,
            notification: {
              title: NotificationData.title,
              body: NotificationData.body,
            },
            data: {
              status: NotificationData.status,
            },
          };
          console.log(message);
          admin
            .messaging()
            .send(message)
            .then((response) => {
              console.log("Successfully sent notification:", response);
            })
            .catch((error) => {
              console.error("Error sending notification:", error);
            });
        });
        Notification.create(tempNotificationData);
      });
    })
    .catch((error) => {
      console.error("Error querying users:", error);
    });
};

const getNotifications = async (userId) => {
  const query = {
    userId: userId,
  };

  return Notification.find(query).sort({ createdAt: -1 });
};

const sendReminders = async () => {
  console.log("calledd");
  const currDate = new Date();
  const endDate = new Date(currDate.getTime() + 24 * 60 * 60 * 1000);
  const events = await Event.find({
    dateAndTime: { $gte: currDate, $lt: endDate },
  })
    .populate("users.userId")
    .exec(); // Populate the 'users' array with user details based on the 'userId'

  console.log(currDate, endDate);
  events.forEach((event) => {
    let tempNotificationData = {
      notificationType: "reminder",
      title: event.name + " Reminder",
      body:
        "The event " +
        event.name +
        " you have enrolled in is today at " +
        new Date(event.dateAndTime).toLocaleString(),
      status: "Info",
    };
    event.users?.forEach(async (tempUser) => {
      const user = tempUser.userId;
      await user.fcmTokens?.forEach(async (token) => {
        console.log(token);
        const message = {
          token,
          notification: {
            title: tempNotificationData.title,
            body: tempNotificationData.body,
          },
          data: {
            status: tempNotificationData.status,
          },
        };
        console.log(message);
        await admin
          .messaging()
          .send(message)
          .then((response) => {
            console.log("Successfully sent notification:", response);
          })
          .catch((error) => {
            console.error("Error sending notification:", error);
          });
      });
      tempNotificationData.userId = user._id;
      await Notification.create(tempNotificationData);
    });
  });
};

module.exports = {
  addNotifications,
  getNotifications,
  sendReminders,
};
