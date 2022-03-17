import supertest from 'supertest';
import app, {server} from '../src/server';

const api = supertest(app);

describe('Basic connections to the API', () => {
  it('can connect to the API', async () => {
    await api.get('/hola')
        .expect(200)
        .expect('Content-type', /application\/json/);
  });

  it('needs to authenticate on some endpoints', async () => {
    await api.get('/hello')
        .expect(401)
        .expect('Content-type', /application\/json/);
  });

  it('produces addecuate error on 404', async () => {
    await api.get('/unknownEndpoint')
        .expect(404)
        .expect('Content-type', /application\/json/);
  });

  afterAll(() => server.close());
});
