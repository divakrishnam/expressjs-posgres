import JWTUtils from '../utils/jwt-utils';

export default function requireAuth(tokenType = 'accessToken') {
  return function (req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      try {
        var [bearer, token] = authHeader.split(' ');
        if (bearer.toLowerCase() !== 'bearer' || !token) {
          throw Error;
        }
      } catch (error) {
        return res
          .status(401)
          .send({ success: false, message: 'Bearer token malformed' });
      }
    } else {
      return res
        .status(401)
        .send({ success: false, message: 'Authorization header not found' });
    }

    try {
      let jwt;
      switch (tokenType) {
        case 'refreshToken':
          jwt = JWTUtils.verifyAccessToken(token);
          break;

        case 'accessToken':
          jwt = JWTUtils.verifyAccessToken(token);
          break;
      }
      req.body.jwt = jwt;
      next();
    } catch (error) {
      return res.status(401).send({ success: false, message: 'Invalid token' });
    }
  };
}
