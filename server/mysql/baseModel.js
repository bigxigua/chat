const mysql = require('mysql');
const MySQLClient = require('./MySQLClient.js');

class BaseModel {
  constructor(option){
    this.dbname = option.dbname;
    this.mysqlClient = new MySQLClient();
  }

  getConnection() {
    if(!this.dbname) throw 'must have dbname';
    return this.mysqlClient.createConnection(this.dbname);
  }

  groupBy(groupBy){
    return 'GROUP BY ' + groupBy;
  }

  executeSql(querySQL, params) {
    //TODO错误处理
    //connection.escape(userId);转义
    //也可以使用？占位符进行转义
    // connection.query('UPDATE users SET foo = ?, bar = ?, baz = ? WHERE id = ?', ['a', 'b', 'c', userId], function (error, results, fields) {
    //   if (error) throw error;
    // });
    return this.getConnection().then((conn) => {
      return this._query(conn, querySQL, params);
    }).catch(err => {
      console.log(err)
    })
  }

  _query(conn, querySQL = '', params){
    return new Promise((resolve, reject) => {
      console.log(`---------------开始时间：${Date.now()}语句${mysql.format(querySQL)}-----${JSON.stringify(params)}----------`);
      conn.query(querySQL, params, (err, result) => {
        conn.release();
        err ? reject(err) : resolve(result);
      })
    })
  }

  //创建表
  createTable() {
    //创建表最好通过软件
  }

  //增
  insert(tableName, params = {}) {
    let sql = `INSERT INTO ${this.dbname}.${tableName} SET ?`;
    return this.executeSql(sql, params);
  }

  //删
  delete(tableName, conditions) {
    let params = {
      name: ''
    };
    let sql = `DELETE FROM ${this.dbname}.${tableName} WHERE `
    return this.executeSql(sql, params);
  }

  //查
  find(sql, params = []) {
    return this.executeSql(sql, params);
  }
  //查找所有
  findAll(tableName) {
    return this.executeSql(`SELECT * FROM ${this.dbname}.${tableName}`);
  }
  //条件查找
  findWithColumnName(tableName, columns = []) {
    let querySQL = `SELECT ${columns.join(',')} FROM ${this.dbname}.${tableName}`
    return this.executeSql(querySQL);
  }

  //改
  update() {}

  //条件子句
  where() {}

}

module.exports =  BaseModel;
