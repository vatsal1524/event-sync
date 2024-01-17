// author: Mehul Bhunsadiya
const joi = require("joi");
const { response } = require("../../utils/response");
const { StatusCodes } = require("http-status-codes");
const { userTypes } = require("../../utils/protected");

const createUserValidation = async (req, res, next) => {
    const validation = joi.object({
        firstName: joi.string().trim(true).max(20).required(),
        lastName: joi.string().trim(true).max(20).required(),
        age: joi.number().required(),
        email: joi.string().email().trim(true).required(),
        password: joi.string().min(6).trim(true).required(),
        userType: joi.string().valid("admin", "organizer", "user").required(),
    });

    const data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        email: req.body.email,
        password: req.body.password,
        userType: req.body.userType,
    };
    const { error } = validation.validate(data);
    if (error) {
        let msg = `Error in User Data : ${error.message}`;
        return response(res, StatusCodes.NOT_ACCEPTABLE, false, {}, msg);
    } else {
        next();
    }
};
module.exports = { createUserValidation };
