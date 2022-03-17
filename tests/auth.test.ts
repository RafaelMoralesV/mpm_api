import supertest from 'supertest';
import {User} from '../src/models/user';
import app, {server} from '../src/server';

const api = supertest(app);

describe('Authentication tests', () => {
  beforeAll(async () => {
    await User.create({
      name: 'base_user',
      password: 'password',
      email: 'base@test.com',
    });
  });

  it('can register a user', async () => {
    await api.post('/auth/register')
        .send({
          'username': 'my_username',
          'password': 'password',
          'email': 'mail@test.com',
        })
        .expect(200)
        .expect('Content-type', /application\/json/);
  });


  it('can\'t register the same email twice', async () => {
    await api.post('/auth/register')
        .send({
          'username': 'my_username',
          'password': 'password',
          'email': 'base@test.com',
        })
        .expect(400)
        .expect('Content-type', /application\/json/);
  });

  it('needs a username field', async () => {
    await api.post('/auth/register')
        .send({
          'password': 'password',
          'email': 'mail@test.com',
        })
        .expect(400)
        .expect('Content-type', /application\/json/);
  });

  it('needs a password field', async () => {
    await api.post('/auth/register')
        .send({
          'username': 'my_username',
          'email': 'mail@test.com',
        })
        .expect(400)
        .expect('Content-type', /application\/json/);
  });

  it('needs a email field', async () => {
    await api.post('/auth/register')
        .send({
          'username': 'my_username',
          'password': 'password',
        })
        .expect(400)
        .expect('Content-type', /application\/json/);
  });

  it('logs in succesfully', async () => {
    await api.post('/auth/login')
        .send({
          'username': 'base_user',
          'password': 'password',
        })
        .expect(200)
        .expect('Content-type', /application\/json/);
  });

  it('can\'t log an unknown user', async () => {
    await api.post('/auth/login')
        .send({
          'username': 'unknown',
          'password': 'password',
        })
        .expect(404)
        .expect('Content-type', /application\/json/);
  });

  it('can\'t log in with an bad password', async () => {
    await api.post('/auth/login')
        .send({
          'username': 'base_user',
          'password': 'bad password',
        })
        .expect(401)
        .expect('Content-type', /application\/json/);
  });

  it('needs a username field', async () => {
    await api.post('/auth/login')
        .send({
          'password': 'password',
        })
        .expect(401)
        .expect('Content-type', /application\/json/);
  });

  it('needs a password field', async () => {
    await api.post('/auth/login')
        .send({
          'username': 'base_user',
        })
        .expect(401)
        .expect('Content-type', /application\/json/);
  });

  afterAll(() => server.close());
});
