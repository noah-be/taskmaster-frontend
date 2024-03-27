import { createToken } from './tokenUtils.js';

const setJwtCookie = (res, token) => {
    res.cookie('jwt', token, { httpOnly: true, sameSite: 'strict' });
};

const finalizeAuthentication = (res, userId, redirectUrl = '/tasks') => {
    const token = createToken(userId);
    setJwtCookie(res, token);
    res.redirect(redirectUrl);
};

export { setJwtCookie, finalizeAuthentication };
