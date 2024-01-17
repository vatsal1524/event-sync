// author: Mehul Bhunsadiya
const { StatusCodes } = require("http-status-codes");
const { User } = require("../../model/User.model");
const { response } = require("../../utils/response");
const userRepository = require("../../repository/user.repository");
const { Message } = require("../../utils/Message");

// Get User Details
const getUserDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await userRepository.findById(id);
        if (!user) {
            return response(
                res,
                StatusCodes.NOT_FOUND,
                false,
                {},
                Message.USER.NOT_FOUND
            );
        }

        return response(res, StatusCodes.OK, true, { user: user }, null);
    } catch (error) {
        console.log(error.message);
        return response(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            false,
            {},
            error.message
        );
    }
};

// Update User Dtails
const updateUserDetails = async (req, res) => {
    try {
        const { firstName, lastName, age, email, interests } = req.body;
        const id = req.params.id;
        let user = {};
        if (firstName) {
            user.firstName = firstName;
        }
        if (lastName) {
            user.lastName = lastName;
        }
        if (email) {
            user.email = email;
        }
        if (age) {
            user.age = age;
        }
        if (interests) {
            user.interests = interests;
        }

        if (user) {
            user.updatedAt = new Date();
            try {
                const newUser = await userRepository.findByIdAndUpdate(
                    id,
                    user
                );
                if (!newUser) {
                    return response(
                        res,
                        StatusCodes.BAD_REQUEST,
                        false,
                        {},
                        Message.USER.COULD_NOT_UPDATE_USER
                    );
                }

                return response(
                    res,
                    StatusCodes.ACCEPTED,
                    true,
                    { user: newUser },
                    Message.USER.UPDATE_SUCCESS
                );
            } catch (error) {
                return response(
                    res,
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    false,
                    {},
                    error.message
                );
            }
        } else {
            return response(
                res,
                StatusCodes.BAD_REQUEST,
                false,
                {},
                Message.USER.PROVIDE_INFORMATION
            );
        }
    } catch (error) {
        console.log(error.message);
        return response(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            false,
            {},
            error.message
        );
    }
};

// Delete User
const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return response(
                res,
                StatusCodes.NOT_FOUND,
                false,
                {},
                Message.USER.NOT_FOUND
            );
        }

        const user = await userRepository.findByIdAndDelete(id);
        if (!user) {
            return response(
                res,
                StatusCodes.BAD_REQUEST,
                false,
                {},
                Message.USER.NOT_FOUND
            );
        }

        return response(
            res,
            StatusCodes.ACCEPTED,
            true,
            {},
            Message.USER.DELETED
        );
    } catch (error) {
        return response(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            false,
            {},
            error.message
        );
    }
};

module.exports = {
    getUserDetails,
    updateUserDetails,
    deleteUser,
};
