// author: Mehulkumar Bhunsadiya
const { sign } = require("jsonwebtoken");

const config = {
    secrets: {
        jwt: process.env.JWT_TOKEN_SECRET,
        jwtExp: "30d",
    },
};

const createToken = (user) => {
    return sign(
        {
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            age: user.age,
            userType: user.userType,
            interests: user.interests,
        },
        config.secrets.jwt,
        {
            expiresIn: config.secrets.jwtExp,
        }
    );
};

module.exports = { createToken, config };
