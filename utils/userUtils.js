import UserModel from '../models/UserModel.js';
import bcrypt from 'bcryptjs';

const checkUsername = async (username) => {
    const existingUser = await UserModel.findOne({ username });
    return Boolean(existingUser);
};

const createUser = async (username, password) => {
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
        throw new Error('Username is already taken');
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();
    return newUser;
};

const validateUser = async (username, password) => {
    const user = await UserModel.findOne({ username });
    if (!user) {
        return null;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return null;
    }

    return user;
};

const handleUserFromGoogle = async (payload) => {
    let user = await UserModel.findOne({ googleId: payload.sub });
    if (!user) {
        user = new UserModel({
            username: payload.email,
            isGoogleAccount: true,
            googleId: payload.sub,
        });
        await user.save();
    }
    return user;
};

const setJwtCookie = (res, token) => {
    res.cookie('jwt', token, { httpOnly: true, sameSite: 'strict' });
};

export { createUser, validateUser, handleUserFromGoogle, setJwtCookie, checkUsername };
