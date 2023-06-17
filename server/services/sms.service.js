import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const SUCCESS_RES = "success";

export const sendSmsNotifyApi = async (mobileNumber, smsContent) => {
  let isSmsSent = false;
  await axios({
    url: process.env.NOTF_SMS_API_URL,
    method: "POST",
    params: {
      user_id: process.env.NOTF_SMS_USER_ID,
      api_key: process.env.NOTF_SMS_API_KEY,
      sender_id: process.env.NOTF_SMS_SENDER_ID,
      to: "94" + mobileNumber,
      message: smsContent,
    },
  })
    .then((res) => {
      console.log(res.data);
      if (res.data.status === SUCCESS_RES) {
        isSmsSent = true;
      }
    })
    .catch((err) => {
      console.log(err);
      return false;
    });

  return isSmsSent;
};
