import UserModel from "models/UserModel.js";
import bcrypt from "bcryptjs";

const UserController = {
  async createUser(username, password) {
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      throw new Error("Username is already taken");
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();
    return newUser;
  },
  // async handleUserFromGoogle(payload) {
  //     let user = await UserModel.findOne({ googleId: payload.sub });
  //     if (!user) {
  //         user = new UserModel({
  //             username: payload.email,
  //             isGoogleAccount: true,
  //             googleId: payload.sub,
  //         });
  //         await user.save();
  //     }
  //     return user;
  // }
};

export default UserController;
