import TestHelpers from '../tests-helpers';
import models from '../../src/models';

describe('Role', () => {
  beforeAll(async () => {
    await TestHelpers.startDb();
  });

  afterAll(async () => {
    await TestHelpers.stopDb();
  });

  beforeEach(async () => {
    await TestHelpers.syncDb();
  });

  it('should delete the role records if the user is deleted', async () => {
    const { Role } = models;
    const rolesForNewUser = ['admin', 'customers'];
    const user = await TestHelpers.createNewUser({ rolesForNewUser });
    let rolesCount = await Role.count();
    expect(rolesCount).toEqual(rolesForNewUser.length);
    await user.destroy();
    rolesCount = await Role.count();
    expect(rolesCount).toEqual(0);
  });
});
