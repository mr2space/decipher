import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true,
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        gender: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
        },
        geolocation: {
            type: String,
        },
        avatar: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        refreshToken: {
            type: String,
        },
        loginType: {
            // 1-> jwt  0 -> oauth
            type: Boolean,
            required: true,
        },
        credit: {
            type: Number,
            default: 20,
        },
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1d",
        }
    );
};
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "5d",
        }
    );
};

userSchema.methods.isCreditForPhoto = function () {
    return this.credit > 2;
};

userSchema.methods.isCreditForSearch = function () {
    return this.credit > 0;
};

userSchema.methods.decrementCreditForPhoto = function () {
    this.credit = this.credit - 3;
    return this.credit;
};

userSchema.methods.decrementCreditForSearch = function () {
    this.credit = this.credit - 1;
    return this.credit;
};

export const User = mongoose.model("User", userSchema);
