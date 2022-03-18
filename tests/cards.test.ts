import supertest from 'supertest';
import {Card} from '../src/models/card';
import {User} from '../src/models/user';
import app, {server} from '../src/server';

const api = supertest(app);

describe('Cards enpoints', () => {
  let token: string;

  beforeAll(async () => {
    // Populates a single user with 2 cards owned.
    await User.create({
      name: 'base_user',
      password: 'password',
      email: 'base@test.com',
    }).then(async (user: User) => {
      await Card.bulkCreate([{
        UserId: 1,
        name: 'Demonic Tutor',
        uuid: '3bdbc231-5316-4abd-9d8d-d87cff2c9847',
        stock: 2,
      }, {
        UserId: 1,
        name: 'Burgeoning',
        uuid: '6da045f8-6278-4c84-9d39-025adf0789c1',
        stock: 1,
      }]);
    }).then(async () => {
      await api.post('/auth/login')
          .send({username: 'base_user', password: 'password'})
          .then((res) => token = res.body.access_token);
    });
  });


  it('can get own collection', async () => {
    await api.get('/cards/').set('Authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-type', /application\/json/)
        .then((response) => {
          expect(response.body.data.size).toBe(2);
        });
  });


  it('can get another user\'s collection', async () => {
    // Populates a new user with 1 card.
    await User.create({
      name: 'base_user',
      password: 'password',
      email: 'base@test.com',
    }).then(async () =>
      await Card.create({UserId: 2, name: 'Some name', stock: 3, uuid: 'id'}),
    );
    await api.get('/cards/2').set('Authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-type', /application\/json/)
        .then((response) => {
          expect(response.body.data.size).toBe(1);
        });
  });


  it('can update a card\'s stock', async () => {
    await api.put('/cards/').set('Authorization', 'Bearer ' + token)
        .send({stock: 10, id: 1})
        .expect(200)
        .expect('Content-type', /application\/json/)
        .then(async (response) => {
          const card = await Card.findOne({where: {id: 1}});
          expect(card!.stock).toBe(10);
        });
  });


  it('can add a new card to your own collection', async () => {
    await api.post('/cards/').set('Authorization', 'Bearer ' + token)
        .send({
          name: 'Black Lotus',
          uuid: 'bd8fa327-dd41-4737-8f19-2cf5eb1f7cdd',
          stock: 4,
        })
        .expect(200)
        .expect('Content-type', /application\/json/)
        .then(async (response) => {
          const user = await User.findOne({where: {id: 1}});

          const cardAmount = await user!.countCards();
          const cards = await user!.getCards();

          expect(cardAmount).toBe(3);
          expect(cards[2].name).toBe('Black Lotus');
        });
  });


  afterAll(() => server.close());
});
