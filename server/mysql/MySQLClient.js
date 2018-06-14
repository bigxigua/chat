/*
	created By TaoBaoZhong at 2018.06.12
	Before you use it, you must have an existing database.
	Configuration file is in /config/mysql-config.js
*/

const mysql = require('mysql');
const config = require('../config/mysql-config.js');
const dbs = config.dbs;
let poolMap = {};

// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   port		 : 3306,
//   password : 'shuaitbz',
//   database : 'TESTDB'
// });


// connection.query('SELECT * FROM new_table', function (error, results, fields) {
// 	console.log(results)
//   if (error) {
//   	console.log(error)
//   }
// });

// connection.end();

let pool = mysql.createPool({
  connectionLimit: 100,
  host: config.host,
  user: config.user,
  password: config.password,
  port: config.port,
  queueLimit: 0, //当连接池达到上限时，排队的连接最大上线0是无限，其他值超过则报错
  waitForConnections: true //当连接池达到上限时，新的连接进来true排队， false报错
});

//连接池的事件：acquire（获取连接）connection（连接上）enqueue（排队时）release(连接被释放)
//pool.on('enqueue', callback)
//pool.end(callback) 关闭所有连接池

for (let i = 0; i < dbs.length; i++) {
  poolMap[dbs[i]] = pool;
}

class Client {
  constructor(option) {
    this.option = option || {};
  }
  createConnection(dbname) {
    return new Promise((resolve, reject) => {
      let conn = null;
      conn = !!conn ? conn : poolMap[dbname];
      conn.getConnection((err, client) => {
        err ? (reject(err)) : (resolve(client));
      })
    })
  }
}

module.exports = Client;
