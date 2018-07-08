const Koa = require('koa');
const app = new Koa();
const db = require('./models/db-mongo');
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const cors = require('koa-cors');

const index = require('./routes/index');
const login = require('./routes/login');
const register = require('./routes/register');
const upload = require('./routes/upload');
const Room = require('./models/room-mongo.js');
const config = require('./config/init.js');


const initRoom = async function () {
  let initRoom = await Room.findOne({ name:  config.INIT_ROOM});
	if (!initRoom) {
		let room = new Room({
			info: config.INIT_ROOM_INFO,
			name: config.INIT_ROOM
		});
		await room.save();
	} else {
		console.log('初始房间已存在')
	}
};
initRoom().catch( (err) => {
	console.log(err, '创建初始房间时出错')
});

// error handler
onerror(app);

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}));
app.use(json());
app.use(logger());
app.use(cors());
app.use(require('koa-static')(__dirname + '/public'));
app.use(require('koa-static')(__dirname + '/views'));

app.use(views(__dirname + '/views', {
  extension: 'html'
}));

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
});

// routes
app.use(index.routes(), index.allowedMethods());
app.use(login.routes(), login.allowedMethods());
app.use(register.routes(), register.allowedMethods());
app.use(upload.routes(), upload.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app;
