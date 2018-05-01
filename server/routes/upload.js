const router = require('koa-router')();
const path = require('path');
const Busboy = require('busboy');
const fs = require('fs');

// const user = require('../controllers/user.js');
function reName (fileName, account) {
  return Math.random().toString(16).substr(2) + account + '.' + fileName.split('.').pop();
}
function uploadFile (ctx, options) {
  const _emmiter_ = new Busboy({headers: ctx.req.headers});
  const filePath = path.join(options.path);
  return new Promise((resolve, reject) => {
    _emmiter_.on('file', function (fieldname, file, filename, encoding, mimetype) {
      const fileName = reName(filename, options.account);
      console.log(fileName,'----');
      const saveTo = path.join(path.join(filePath, fileName));
      file.pipe(fs.createWriteStream(saveTo));
      file.on('end', function () {
        resolve({
          imgName: fileName
        })
      })
    });

    _emmiter_.on('finish', function () {
      console.log('finished...')
    });

    _emmiter_.on('error', function (err) {
      console.log('err...');
      reject(err)
    });

    ctx.req.pipe(_emmiter_)
  })
}

router.post('/upload', async (ctx, next) => {
  const account = ctx.url.match(/\?account=([^&]*)(&|$)/)[1];
  const serverPath = path.join(__dirname, '../public/uploads/');
  const result = await uploadFile(ctx, {
    account,
    path: serverPath
  });
  ctx.body = {
    imgUrl: 'uploads/' + result.imgName
  }
});


module.exports = router;
