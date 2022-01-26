const KoaRouter = require('koa-router');
const jwtgenerator = require('jsonwebtoken');

const router = new KoaRouter();

function generateToken(user) {
  return new Promise((resolve, reject) => {
    jwtgenerator.sign(
      { sub: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, tokenResult) => (err ? reject(err) : resolve(tokenResult)),
    );
  });
}

router.post('api.auth.login', '/', async (ctx) => {
    const { username, password } = ctx.request.body;
    const user = await ctx.orm.user.findOne({ where: { username } });
  
    if (!user) ctx.throw(404, `No user found with username ${username}`);
  
    const authenticated = await user.checkPassword(password);
    if (!authenticated) ctx.throw(401, 'Invalid password');
  
    const token = await generateToken(user);
    const { id } = user;
  
    ctx.body = {
      id,
      access_token: token,
      token_type: 'Bearer',
    };
  });
  
  module.exports = router;
  