import supertest from 'supertest';
import {User} from '../src/models/user';
import app, {server} from '../src/server';

import {faker} from '@faker-js/faker';

const api = supertest(app);

describe('Users endpoints', () => {
  let token: string;

  beforeAll(async () => {
    const users = ((numUsers = 5) => {
      return Array.from({length: numUsers}, () => {
        return {
          name: faker.name.findName(),
          email: faker.internet.email(),
          password: 'password',
        };
      });
    })();

    const user = (await User.bulkCreate(users))[0];
    await user!.addFriends([2, 3]);

    await api.post('/auth/login')
        .send({username: user!.name, password: 'password'})
        .then((res) => token = res.body.api_token);
  });

  it('can send user\'s friend list', async () => {
    jest.setTimeout(99999);
    await api.get('/users/friends').set('Authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-type', /application\/json/)
        .then((res) => {
          const data = res.body.data;
          expect(data.size).toBe(2);
        });
  });

  afterAll(() => server.close());
});
