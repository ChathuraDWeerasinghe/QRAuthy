import mongoose from "mongoose";

// Define the user schema
const resetSchema = new mongoose.Schema({
  resetUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  resetUserPin: {
    type: Number,
    required: true,
  },
  // Include other user fields as needed
});

// Create a user model from the schema
const ResetPwdModel = mongoose.model("ResetPwd", resetSchema);

export default ResetPwdModel;
