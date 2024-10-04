import { User } from "../model/user.model.js";
import bcrypt from "bcryptjs";
import { Token } from "../model/tokenModel.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import { logger } from "../../logger.js";
import validator from "validator"; 
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js" 
import { ApiResponse } from "../utils/ApiResponse.js"

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId)
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })

    return { accessToken, refreshToken }


  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating referesh and access token")
  }
}


const registerUser = async (req, res) => {
  const { username, password, fullname, email, phone, geolocation, gender } = req.body;

  if (!username || !password || !fullname || !email || !phone || !geolocation || !gender) {
    return res
      .status(400)
      .json({ status: "error", message: "All fields are required." });
  }

  if (!validator.isEmail(email)) {
    return res
      .status(400)
      .json({ status: "error", message: "Invalid email format." });
  }

  if (!validator.isMobilePhone(phone, "any")) {
    return res
      .status(400)
      .json({ status: "error", message: "Invalid phone number format." });
  }

  const userExists =
    (await User.findOne({ email })) || (await User.findOne({ username }));
  if (userExists) {
    logger.warn("User already exists");
    return res
      .status(400)
      .json({ status: "error", message: "User already exists" });
  }


  const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
  const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

  // const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username: username.toLowerCase(),
    password,
    fullname,
    gender,
    email,
    phone,
    geolocation,
    avatar: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
    loginType: 1,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user")
  }
  return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered Successfully")
  )

  // await user.save();

  // const token = jwt.sign({ id: user._id, username: user.username, email: user.email }, process.env.JWT_SECRET, {
  //   expiresIn: "1h",
  // });

  // const newToken = new Token({
  //   userId: user._id,
  //   username: user.username,
  //   token,
  // });
  // await newToken.save();

  // logger.info(`User registered: ${username}`);
  // res.status(201).json({
  //   status: "success",
  //   message: "User registration successful",
  //   token,
  //   data: { username, fullname, email, phone, geolocation },
  // });
};

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;
  if (!username && !password) {
    throw new ApiError(400, "username or email is required")
  }
  const user = await User.findOne({
    $or: [{ username }, { email }]
  });

  if (!user) {
    throw new ApiError(404, "User does not exist")
  }

  const isPasswordValid = await user.isPasswordCorrect(password)

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials")
    }

   const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )

});


const logoutUser = asyncHandler(async(req, res) => {
  await User.findByIdAndUpdate(
      req.user._id,
      {
          $unset: {
              refreshToken: 1 // this removes the field from document
          }
      },
      {
          new: true
      }
  )

  const options = {
      httpOnly: true,
      secure: true
  }

  return res
  .status(200)
  .clearCookie("accessToken", options)
  .clearCookie("refreshToken", options)
  .json(new ApiResponse(200, {}, "User logged Out"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

  if (!incomingRefreshToken) {
      throw new ApiError(401, "unauthorized request")
  }

  try {
      const decodedToken = jwt.verify(
          incomingRefreshToken,
          process.env.REFRESH_TOKEN_SECRET
      )
  
      const user = await User.findById(decodedToken?._id)
  
      if (!user) {
          throw new ApiError(401, "Invalid refresh token")
      }
  
      if (incomingRefreshToken !== user?.refreshToken) {
          throw new ApiError(401, "Refresh token is expired or used")
          
      }
  
      const options = {
          httpOnly: true,
          secure: true
      }
  
      const {accessToken, newRefreshToken} = await generateAccessAndRefereshTokens(user._id)
  
      return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
          new ApiResponse(
              200, 
              {accessToken, refreshToken: newRefreshToken},
              "Access token refreshed"
          )
      )
  } catch (error) {
      throw new ApiError(401, error?.message || "Invalid refresh token")
  }

})

const testSecureControl = (req, res) => {
  res.status(200).json({ success: 1 });
};

//TODO: REMOVE THE BELOW FUNCTION
// const googleOAuth2 = (req, res) => {
//     const scopes = [
//         'profile',
//         'email'
//     ];

//     const authorizationUrl = oauth2Client.generateAuthUrl({
//         access_type: 'offline',
//         scope: scopes,
//         state: JSON.stringify(req.body)
//     });

//     res.redirect(authorizationUrl);
// };

// const googleOAuth2Callback = async (req, res) => {
//     const { code, state } = req.body;

//     try {
//         // Exchange authorization code for access token
//         logger.info(JSON.stringify(req.body))
//         const { tokens } = await oauth2Client.getToken(code);
//         oauth2Client.setCredentials(tokens);

//         // Retrieve user information
//         const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
//         const userInfo = await oauth2.userinfo.get();

//         const { email, name } = userInfo.data;

//         // Check if user already exists
//         let user = await User.findOne({ email });

//         if (!user) {
//             // If not, register the user
//             user = new User({
//                 username: email.split('@')[0],
//                 email,
//                 fullname: name,
//                 // You can add default values for other fields like geolocation if needed
//             });

//             await user.save();
//             logger.error(`User registered via OAuth2: ${user.username}`);
//         } else {
//             logger.info(`User logged in via OAuth2: ${user.username}`);
//         }

//         // Generate and return token
//         res.status(200).json({
//             status: "success",
//             message: "OAuth2 login successful",
//             token: generateToken(user),
//             user: { username: user.username, email: user.email, fullname: user.fullname }
//         });
//     } catch (error) {
//         logger.error(`Error during OAuth2 callback: ${error.message}`);
//         res.status(500).json({ status: "error", message: "Server error" });
//     }
// };

const success_oauth = (req, res) => {
  res.status(200).json({ success: 1 });
};

const failure_oauth = (req, res) => {
  res.status(400).json({ success: 0 });
};

const deleteUser = async (req, res) => {
  const { user_id, password } = req.body;

  if (!user_id || !password) {
    return res.status(400).json({ status: "error", message: "Username or Email and Password are required." });
  }

  const user = await User.findOne({ $or: [{ email: user_id }, { username: user_id }] });

  if (!user) {
    logger.warn(`Delete attempt failed: No user found with identifier ${user_id}`);
    return res.status(404).json({ status: "error", message: "User not found." });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    logger.warn(`Delete attempt failed: Incorrect password for user ${user_id}`);
    return res.status(401).json({ status: "error", message: "Invalid password." });
  }

  await User.deleteOne({ _id: user._id });
  await Token.deleteMany({ userId: user._id });

  logger.info(`User deleted: ${user_id}`);
  res.status(200).json({ status: "success", message: `User ${user_id} deleted successfully.` });
};


export { registerUser, loginUser, refreshAccessToken, testSecureControl, failure_oauth, success_oauth, deleteUser };
