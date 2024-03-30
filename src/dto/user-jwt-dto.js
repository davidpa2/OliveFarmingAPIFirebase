import { jwtVerify } from 'jose';

const userJWTDTO = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).send({ errors: ['Usuario no autorizado'] });

    const jwt = authorization.startsWith('Bearer') ? authorization.split(' ')[1] : authorization;
    if (!jwt) return res.status(402).send({ errors: ['Usuario no autorizado'] });

    try {
        const encoder = new TextEncoder();
        const { payload } = await jwtVerify(jwt, encoder.encode(process.env.JWT_PRIVATE_KEY));

        req.id = payload.id;

        next();
    } catch (error) {
        return res.status(402).send({ errors: ['Usuario no autorizado'] });
    }
}

export default userJWTDTO;