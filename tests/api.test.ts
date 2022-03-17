import supertest from 'supertest';
import app, {server} from '../src/server';

const api = supertest(app);

test('I can connect to the API', async () => {
  await api.get('/hola')
      .expect(200)
      .expect('Content-type', /application\/json/);
});

test('Trying to connect without authencation produces error', async () => {
  await api.get('/hello')
      .expect(401)
      .expect('Content-type', /application\/json/);
});

afterAll(() => server.close());
