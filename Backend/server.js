// Author names: Mehul Bhunsadiya
// Author: Dhruvin Dankhara
// Author: Faizal

require("./src/config/conn");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const { connect } = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cron = require("node-cron");

const app = express();

app.use(fileUpload());
app.use(cors());

app.use(express.static(path.join(__dirname, "/uploads")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
  // Production logger format
  app.use(morgan("combined"));
} else {
  // Development logger format
  app.use(morgan("dev"));
}

const authRouter = require("./src/routes/auth.routes");
const userRouter = require("./src/routes/user.routes");
const eventRoute = require("./src/routes/event.routes");
const analyticsRoute = require("./src/routes/analytics.routes");
const wishlistRoute = require("./src/routes/wishlist.routes");
const supportRoute = require("./src/routes/support.routes");
const commentRoute = require("./src/routes/comment.routes");
const ratingRoute = require("./src/routes/rating.routes");
const listingRoute = require("./src/routes/listing.routes");
const notificationsRoute = require("./src/routes/notifications.routes");
const { sendReminders } = require("./src/repository/notifications.repository");
const recommendationRoute = require("./src/routes/recommendation.routes");
const adminRouter = require("./src/routes/admin.routes");

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/event", eventRoute);
app.use("/wishlist", wishlistRoute);
app.use("/analytics", analyticsRoute);
app.use("/support", supportRoute);
app.use("/listing", listingRoute);
app.use("/notifications", notificationsRoute);
app.use("/recommendation", recommendationRoute)
app.use("/comment", commentRoute);
app.use("/rate", ratingRoute);
app.use("/admin", adminRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/src/view/serverRunning.html"));
});

var port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server is Running on " + port);
});

cron.schedule("0 0 * * *", () => {
  sendReminders();
});
