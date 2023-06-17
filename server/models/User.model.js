import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    userMobile: {
      type: Number,
      required: true,
      unique: true,
    },
    userPassword: {
      type: String,
      required: true,
      min: 5,
    },
    userToken: {
      type: String,
    },
    userPin: {
      type: Number,
    },
    userPinExpireAt: {
      type: Date,
    },
    userLoginStatus: {
      type: String,
      required: true,
      enum: ["LOGGED_OFF", "CREDENTIAL_VERIFIED", "PIN_VERIFIED", "LOGGED_IN"],
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("userPassword")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.userPassword, salt);
    user.userPassword = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

const User = mongoose.model("User", UserSchema);
export default User;
