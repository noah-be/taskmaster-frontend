// UserUtility.js

import UserModel from '../models/UserModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const checkUsername = async (username) => {
    const existingUser = await UserModel.findOne({
        username
    });
    return Boolean(existingUser);
};

const validateUser = async (username, password) => {
    const user = await UserModel.findOne({
        username
    });
    if (!user) {
        return null;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return null;
    }

    return user;
};

const createUser = async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new UserModel({
        username,
        password: hashedPassword
    });

    await newUser.save();
    return newUser;
};

const generateJwtToken = (user) => {
    return jwt.sign({
        userId: user._id,
        username: user.username
    }, 'YOUR_SECRET_KEY', {
        expiresIn: '1h'
    });
};

const handleUserFromGoogle = async (googleUserData) => {
    let user = await UserModel.findOne({
        googleId: googleUserData.googleId
    });

    if (!user) {
        user = new UserModel({
            username: googleUserData.email, // Assuming email as username
            googleId: googleUserData.googleId
            // Add other necessary data from Google user data
        });

        await user.save();
    }

    return user;
};

export {
    createUser,
    validateUser,
    handleUserFromGoogle,
    checkUsername,
    generateJwtToken
};