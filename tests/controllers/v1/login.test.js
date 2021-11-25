import TestHelpers from '../../tests-helpers';
import models from '../../../src/models';
import request from 'supertest';

describe('Register', () => {
  let app;
  let newUserResponse;

  beforeAll(async () => {
    await TestHelpers.startDb();
    app = TestHelpers.getApp();
  });

  afterAll(async () => {
    await TestHelpers.stopDb();
  });

  beforeEach(async () => {
    await TestHelpers.syncDb();
    newUserResponse = await TestHelpers.registerNewUser({
      email: 'test@example.com',
      password: 'test123',
    });
  });

  it('should login a user successfully', async () => {
    const response = await request(app)
      .post('/v1/login')
      .send({ email: 'test@example.com', password: 'test123' })
      .expect(200);

    const refreshToken = response.body.data.refreshToken;
    expect(refreshToken).toEqual(newUserResponse.body.data.refreshToken);
  });

  it('should return 401 if we pass an email that is not associated with any user', async () => {
    const response = await request(app)
      .post('/v1/login')
      .send({ email: 'test@example.net', password: 'test123' })
      .expect(401);
    expect(response.body.success).toEqual(false);
    expect(response.body.message).toEqual('Invalid credentials');
  });

  it('should return 401 if we pass an invalid password', async () => {
    const response = await request(app)
      .post('/v1/login')
      .send({ email: 'test@example.net', password: 'invalidPassword' })
      .expect(401);
    expect(response.body.success).toEqual(false);
    expect(response.body.message).toEqual('Invalid credentials');
  });

  it('should create a new refresh token record if there is not on e associated with the user', async () => {
    const { RefreshToken } = models;
    await RefreshToken.destroy({ where: {} });
    let refreshTokensCount = await RefreshToken.count();
    expect(refreshTokensCount).toEqual(0);
    await request(app)
      .post('/v1/login')
      .send({ email: 'test@example.com', password: 'test123' })
      .expect(200);

    refreshTokensCount = await RefreshToken.count();
    expect(refreshTokensCount).toEqual(1);
  });

  it('should set the token field to a JWT if this field is empty', async () => {
    const { RefreshToken } = models;
    const refreshToken = newUserResponse.body.data.refreshToken;
    const savedRefreshToken = await RefreshToken.findOne({
      where: { token: refreshToken },
    });
    savedRefreshToken.token = null;
    await savedRefreshToken.save();
    await request(app)
      .post('/v1/login')
      .send({ email: 'test@example.com', password: 'test123' })
      .expect(200);

    await savedRefreshToken.reload();
    expect(savedRefreshToken.token).not.toBeNull();
  });
});
