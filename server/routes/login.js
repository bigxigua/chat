const router = require('koa-router')();
const user = require('../controllers/user.js');

router.post('/login', async (ctx, next) => {
	const {account, password} = ctx.request.body;
  const info = await user.verifyUser(account, password);
  ctx.body = { code: 0, data: info}
});


module.exports = router;
