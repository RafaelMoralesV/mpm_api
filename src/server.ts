import express, {Express, Request, Response} from 'express';
import db from './models';


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
  }).then((user: any) => console.log(user));

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

app.listen(3000, () => console.log('Listening on Port 3000'));
