const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'fuck'
  })
});
router.get('/login', async (ctx, next) => {
  await ctx.render('index', {
    title: 'fuck'
  })
});
router.get('/register', async (ctx, next) => {
  await ctx.render('index', {
    title: 'fuck'
  })
});

module.exports = router;
