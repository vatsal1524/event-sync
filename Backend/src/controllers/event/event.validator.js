//Author: Dhruvin Dankhara
const joi = require("joi");
const { response } = require("../../utils/response");
const { StatusCodes } = require("http-status-codes");

const createEventValidation = async (req, res, next) => {
    const validation = joi.object({
        name: joi.string().max(100).required(),
        dateAndTime: joi.date().required(),
        location: joi.string().required(),
        category: joi.string().required(),
        // tags: joi.array().required(),
        ticketPrice: joi.number().required(),
        description: joi.string().required(),
        ownerId: joi.string().required(),
    });

    const data = {
        name: req.body?.name,
        dateAndTime: req.body?.dateAndTime,
        location: req.body?.location,
        category: req.body?.category,
        // tags: req.body?.tags,
        ticketPrice: req.body?.ticketPrice,
        description: req.body?.description,
        ownerId: req.body?.ownerId,
    };
    const { error } = validation.validate(data);
    if (error) {
        let msg = `Error in Event Data : ${error.message}`;
        return response(res, StatusCodes.NOT_ACCEPTABLE, false, {}, msg);
    } else {
        next();
    }
};

const updateEventValidation = async (req, res, next) => {
    const validation = joi.object({
        dataAndTime: joi.date().optional(),
        location: joi.string().optional(),
        category: joi.string().optional(),
        tags: joi.array().optional(),
        ticketPrice: joi.number().optional(),
        description: joi.string().optional(),
    });
    const data = {
        dataAndTime: req.body?.dataAndTime,
        location: req.body?.location,
        category: req.body?.category,
        tags: req.body?.tags,
        ticketPrice: req.body?.ticketPrice,
        description: req.body?.description,
    };
    const { error } = validation.validate(data);
    if (error) {
        let msg = `Error in Event Data : ${error.message}`;
        return response(res, StatusCodes.NOT_ACCEPTABLE, false, {}, msg);
    } else {
        next();
    }
};
module.exports = { createEventValidation, updateEventValidation };
