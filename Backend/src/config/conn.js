const mongoose = require("mongoose");
require("dotenv").config();

const dbConnectionString = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.uflhbx5.mongodb.net/?retryWrites=true&w=majority`;

mongoose
    .connect(dbConnectionString, {
        dbName: process.env.DATABASE_NAME,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize: 10,
    })
    .then(() => {
        console.log("Database Connected");
    })
    .catch((e) => {
        console.log("Database Connection Error");
    });
