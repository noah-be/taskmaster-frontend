import { createToken, setJwtCookie } from "./tokenUtils.js";
//import UserModel from "../models/UserModel.js";

const finalizeAuthentication = async (res, userId) => {
  try {
    const token = createToken(userId);
    await setJwtCookie(token, res);
    return {
      redirectUrl: "/tasks",
    };
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }
};

// const handleUserFromGoogle = async (googleUserData) => {
//   let user = await UserModel.findOne({
//     googleId: googleUserData.googleId,
//   });
//   if (!user) {
//     user = new UserModel({
//       username: googleUserData.email,
//       googleId: googleUserData.googleId,
//     });
//     await user.save();
//   }
//   return user;
// };
export { finalizeAuthentication };
