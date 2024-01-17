//Author: Dhruvin Dankhara
//author: Vatsal
//autor: Faizal

const Message = {
  USER: {
    CREATED: "User created successfully",
    UPDATE_SUCCESS: "User updated successfully",
    DELETED: "User deleted successfully",
    NOT_FOUND: "No user Found!",
    COULD_NOT_CREATE_USER: "Could not create user due to user error",
    COULD_NOT_UPDATE_USER: "Could not update!",
    COULD_NOT_DELETE_USER: "Could not delete!",
    PROVIDE_INFORMATION: "Please provide all the information",
    EMAIL_HAVE_ACCOUNT: "This Email Already have an Account",
    SIX_CHARACTER_PASSWORD: "Password must be minimum 6 character",
    NOT_AUTHORIZED: "User is not authorized",
  },
  AUTH: {
    PROVIDE_INFORMATION: "Could not login, Please Provide all information",
    ACCOUNT_NOT_EXIST: "No account exists with this email",
    COULD_NOT_LOGIN: "Could not login",
    INCORRECT_PASSWORD: "Incorrect Password!",
    LOGIN_SUCCESS: "Login successful",
    INVALID_CODE: "Verification code is invalid",
    RESET_PASSWORD_SUCCESS: "Password reset successfully",
  },
  NOTIFICATION: {
    CREATE: "Notification sent successfully",
    GET: "Notification fetched successfully",
  },
  EVENT: {
    CREATE: "Event created successfully",
    UPDATE: "Event updated successfully",
    DELETE: "Event deleted successfully",
    COMPLETE: "Event completed successfully",
    GET: "Event fetched successfully",
  },
  WISHLIST: {
    ADD: "Event added successfully in the Wishlist",
    REMOVE: "Event removed successfully from the Wishlist",
    GET: "Event fetched successfully for Wishlist",
  },
  ANALYTICS: {
    GET: "Analytics fetched successfully",
  },
  RECOMMENDATION: {
    GET_RECOMMENDATION_BY_ID: "Recommendations fetched successfully",
  },
  SUPPORT: {
    GET_FAQS: "Faqs retrieved successfully.",
    GET_ADMIN_QUERY: "Admin Query retrieved successfully.",
    CREATE_ADMIN_QUERY: "Admin Query created successfully.",
  },
  COMMENT: {
    CREATE: "Comment posted successfully",
    GET: "Comment fetched successfully",
  },
  RATING: {
    CREATE: "Rating is successfully",
    GET: "Rating fetched successfully",
  },
  LISTING: {
    GET_EVENTS: "Events retrieved successfully.",
    ADD_USER_TO_EVENT: "User successfully added to the event.",
  },
  ADMIN: {
    CREATE_APPROVAL_REQUEST: "Request for approval created successfully.",
    GET_ADMIN_QUERY: "Admin Query retrieved successfully",
    GET_ADMIN_APROVAL_REQUEST: "Admin approval request retrieved successfully",
    UPDATE_ADMIN_QUERY: "Query asnswered successfully",
    UPDATE_ADMIN_APROVAL_REQUEST: "Admin approval request updated successfully",
  },
  INTERNAL_SERVER_ERROR: "Internal Server Error",
};

module.exports = {
  Message,
};
