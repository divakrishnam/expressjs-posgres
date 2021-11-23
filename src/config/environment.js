export default {
  port: parseInt(process.env.PORT) || 8080,
  nodeEnv: process.env.NODE_ENV || 'production',
  saltRounds: parseInt(process.env.SALT_ROUNDS) || 10,
  jwtAccessTokenSecret:
    process.env.JWT_ACCESS_TOKEN_SECRET ||
    '0823fc1ba6ecb56deca2cd55cf7edd09013cee1df24b199346924a9b1719513b',
  jwtRefreshTokenSecret:
    process.env.JWT_REFRESH_TOKEN_SECRET ||
    'bc80f01c7ab5362ef1b607b17d04c5d82b2d1c54627506b73f7f03b6e4b3bb73',
};
