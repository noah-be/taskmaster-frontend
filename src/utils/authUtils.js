import {
    createToken
} from './tokenUtils.js';

async function setJwtCookie(req, res) {
    try {
        res.cookie('jwt', token, {
            httpOnly: true,
            sameSite: 'None',
            secure: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

const finalizeAuthentication = (res, userId, redirectUrl = '/tasks') => {
    const token = createToken(userId);
    setJwtCookie(res, token);
    res.redirect(redirectUrl);
};

export {
    setJwtCookie,
    finalizeAuthentication
};