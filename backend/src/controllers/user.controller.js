import { User } from "../model/user.model.js";
import jwt from "jsonwebtoken";
import { logger } from "../../logger.js";
import validator from "validator";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";

const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while generating referesh and access token"
        );
    }
};

const registerUser = asyncHandler(async (req, res) => {
    const { username, password, fullname, email, phone, geolocation, gender } =
        req.body;

    if (
        !username ||
        !password ||
        !fullname ||
        !email ||
        !phone ||
        !geolocation ||
        !gender
    ) {
        return res
            .status(400)
            .json({ status: "error", message: "All fields are required." });
    }
    //TODO: SET ERROR TO NEW APIERROR
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
  await user.save();
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user")
  }
  return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered Successfully")
  )
});

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
// };

const loginUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;
    if (!username || !password) {
        throw new ApiError(400, "username or password is required");
    }
    const user = await User.findOne({
        $or: [{ username }, { email }],
    });

    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
        user._id
    );

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken,
                },
                "User logged In Successfully"
            )
        );
});

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1, // this removes the field from document
            },
        },
        {
            new: true,
        }
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged Out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken =
        req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request");
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const user = await User.findById(decodedToken?._id);

        if (!user) {
            throw new ApiError(401, "Invalid refresh token");
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used");
        }

        const options = {
            httpOnly: true,
            secure: true,
        };

        const { accessToken, newRefreshToken } =
            await generateAccessAndRefereshTokens(user._id);

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: newRefreshToken },
                    "Access token refreshed"
                )
            );
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token");
    }
});

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findOne({
        $or: [{ email: req.user?.email }, { username: req.user?.username }],
    });
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    await User.deleteOne({ _id: user._id });

    logger.info(`User deleted: ${user.username}`);
    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "user deleted"));
});

const profile = asyncHandler(async (req, res) => {
    const user = req.user;
    try {
        res.json(new ApiResponse(200, req.user, "user profile"));
    } catch (error) {
        throw new ApiError(401, error?.message || "unauthorized user");
    }
});

const googleOAuthCallback = asyncHandler(async (req, res) => {
    try {
        const user = await User.findOne({
            $or: [{ username: req.user?.username }, { email: req.user?.email }],
        });
        if (!user) {
            throw new ApiError(401, "user invalid or UnAuthorized");
        }
        const { accessToken, refreshToken } =
            await generateAccessAndRefereshTokens(user._id);
        const loggedUser = await User.findById(user._id).select(
            "-password -refreshToken -loginType"
        );
        const options = {
            httpOnly: true,
            secure: true,
        };
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        user: loggedUser,
                        accessToken,
                        refreshToken,
                    },
                    "User logged In Successfully"
                )
            );
    } catch (error) {
        throw new ApiError(401, error?.message || "unauthorized access");
    }
});

export {
    registerUser,
    loginUser,
    refreshAccessToken,
    logoutUser,
    deleteUser,
    profile,
    googleOAuthCallback,
};
