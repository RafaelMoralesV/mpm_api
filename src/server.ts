import express, {Express, Request, Response} from 'express';
import db from './models';


const jwt = require('koa-jwt');
const { apiSetCurrentUser } = require('config/auth.js');
const app: Express = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended: false}));

// parse application/json
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.write('Hello!');
  res.statusCode = 200;
});

app.post('/login', (req: Request, res: Response) => {
  const {username, password}: {username:string, password:string} = req.body;

  db.User.findAll({
    where: {
      name: username,
    },
  }).then(async (user: any) => {
    const authenticated = (user && await user.checkPassword(password));
    console.log(user);
    console.log(authenticated);
  });

  
  res.send(`Username: ${username}\tPassword:${password}`);
});

app.post('/register', (req: Request, res: Response) => {
  const {username, password, email}:
  {username:string, password:string, email:string} = req.body;

  db.User.create({
    name: username,
    password: password,
    email: email,
  });

  res.send('OK');
});

// de aqui en adelante los endpoints requieren un JSON Web TOKEN de un usuario logueado.
app.use(jwt({ secret: process.env.JWT_SECRET, key: 'authData' }));
app.use(apiSetCurrentUser);

app.listen(3000, () => console.log('Listening on Port 3000'));
