const router = require('koa-router')();

router.get('/', async (ctx, next) => {
  await ctx.render('./dist/', {
    title: 'Chat'
  })
});
router.get('/login', async (ctx, next) => {
  await ctx.render('login', {
    title: 'fuck'
  })
});
router.get('/register', async (ctx, next) => {
  await ctx.render('index', {
    title: 'fuck'
  })
});

module.exports = router;
