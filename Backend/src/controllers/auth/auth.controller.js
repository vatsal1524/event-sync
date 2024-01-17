// author: Mehulkumar Bhunsadiya
const { StatusCodes } = require("http-status-codes");
const { createToken } = require("../../utils/JwtConfig");
const { verifyToken } = require("../../utils/protected");
const { response } = require("../../utils/response");
const { securePassword, comparePassword } = require("../../utils/Password");
const userRepository = require("../../repository/user.repository");
const { Message } = require("../../utils/Message");
const sendMail = require("../../utils/sendEmail");

//register new account
const register = async (req, res) => {
  try {
    const { firstName, lastName, age, email, password, userType } = req.body;

    if (!firstName || !lastName || !age || !email || !password || !userType) {
      return response(
        res,
        StatusCodes.BAD_REQUEST,
        false,
        {},
        Message.USER.PROVIDE_INFORMATION
      );
    }

    // Call Repository method to fetch data from database
    const oldUser = await userRepository.findUserByEmail(email);
    if (oldUser) {
      return response(
        res,
        StatusCodes.NOT_ACCEPTABLE,
        false,
        {},
        Message.USER.EMAIL_HAVE_ACCOUNT
      );
    }
    if (password.length < 6) {
      return response(
        res,
        StatusCodes.NOT_ACCEPTABLE,
        false,
        {},
        Message.USER.SIX_CHARACTER_PASSWORD
      );
    }
    const hashedPassword = await securePassword(req.body.password);
    const user = await userRepository.createUser({
      firstName: firstName,
      lastName: lastName,
      age: age,
      email: email,
      password: hashedPassword,
      userType: userType,
      activeStatus: true,
    });
    if (!user) {
      return response(
        res,
        StatusCodes.FORBIDDEN,
        false,
        {},
        Message.USER.COULD_NOT_CREATE_USER
      );
    }
    return response(
      res,
      StatusCodes.ACCEPTED,
      true,
      user,
      Message.USER.CREATED
    );
  } catch (error) {
    console.log(error);
    return response(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      false,
      {},
      Message.INTERNAL_SERVER_ERROR
    );
  }
};

//login
const login = async (req, res) => {
  const { email, password, fcmToken } = req.body;

  if (!email || !password) {
    return response(
      res,
      StatusCodes.BAD_REQUEST,
      false,
      {},
      Message.AUTH.PROVIDE_INFORMATION
    );
  }

  try {
    const user = await userRepository.findUserByEmail(email);
    if (!user) {
      return response(
        res,
        StatusCodes.NOT_FOUND,
        false,
        {},
        Message.AUTH.ACCOUNT_NOT_EXIST
      );
    }
    const matched = await comparePassword(password, user.password);
    if (matched) {
      const token = await createToken(user);
      if (token) {
        const val = await userRepository.addFCMToken(user, fcmToken);
        return response(
          res,
          StatusCodes.OK,
          true,
          {
            token: token,
            user: {
              _id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              age: user.age,
              interests: user.interests,
              peopleDefault: user.peopleDefault,
              ageDefault: user.ageDefault,
              userType: user.userType,
            },
          },
          Message.AUTH.LOGIN_SUCCESS
        );
      }
      return response(
        res,
        StatusCodes.BAD_REQUEST,
        false,
        {},
        Message.AUTH.COULD_NOT_LOGIN
      );
    } else {
      return response(
        res,
        StatusCodes.NOT_ACCEPTABLE,
        false,
        {},
        Message.AUTH.INCORRECT_PASSWORD
      );
    }
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

const sendVerificationCode = async (req, res) => {
  try {
    const email = req.body?.email;
    const user = await userRepository.findUserByEmail(email);
    if (user) {
      const verificationCode = Math.floor(100000 + Math.random() * 900000);
      const html = `<!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Verification Code</title>
                </head>
                <body style="font-family: Arial, sans-serif">
                    <div
                        style="
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                            border: 1px solid #ccc;
                        "
                    >
                        <h2 style="text-align: center">Verification Code</h2>
                        <p style="text-align: center">Hello,</p>
                        <p style="text-align: center">
                            Please use the following verification code to proceed:
                        </p>
                        <div
                            style="
                                background-color: #f9f9f9;
                                padding: 10px;
                                text-align: center;
                                font-size: 24px;
                                font-weight: bold;
                            "
                        >
                            <!-- Insert dynamic verification code here -->
                            ${verificationCode}
                        </div>
                        <p style="text-align: center; margin-top: 20px">
                            If you did not request this verification code, please ignore
                            this email.
                        </p>
                    </div>
                </body>
            </html>`;
      await userRepository.findByIdAndUpdate(user.id, {
        reset_password_token: verificationCode,
      });
      await sendMail(email, "Reset password verification code", html);
      return response(
        res,
        StatusCodes.ACCEPTED,
        true,
        {},
        "Email sent successfully"
      );
    } else {
      return response(
        res,
        StatusCodes.NOT_FOUND,
        false,
        {},
        Message.AUTH.ACCOUNT_NOT_EXIST
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

const resetPassword = async (req, res) => {
  try {
    const email = req.body?.email;
    const password = req.body?.password;
    const verificationCode = req.body?.verificationCode;

    const user = await userRepository.findUserByEmail(email);
    if (!user) {
      return response(
        res,
        StatusCodes.NOT_FOUND,
        false,
        {},
        Message.USER.NOT_FOUND
      );
    }
    console.log(user.reset_password_token, verificationCode);
    if (user.reset_password_token !== verificationCode) {
      return response(
        res,
        StatusCodes.BAD_REQUEST,
        false,
        {},
        Message.AUTH.INVALID_CODE
      );
    } else {
      const hashedPassword = await securePassword(password);
      await userRepository.findByIdAndUpdate(user.id, {
        reset_password_token: null,
        password: hashedPassword,
      });

      return response(
        res,
        StatusCodes.ACCEPTED,
        true,
        {},
        Message.AUTH.RESET_PASSWORD_SUCCESS
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

module.exports = {
  register,
  login,
  sendVerificationCode,
  resetPassword,
};
