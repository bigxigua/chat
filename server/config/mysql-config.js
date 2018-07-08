module.exports = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'shuaitbz',
  dbs: [
    'chat'
  ],
  //tinyint(2)
  create_table_sql_user: 'CREATE TABLE `chat.User` (\n' +
  '  `U_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT \'用户自增长ID\',\n' +
  '  `U_Account` varchar(30) NOT NULL COMMENT \'用户账户\',\n' +
  '  `U_NickName` varchar(30) NOT NULL COMMENT \'用户昵称\',\n' +
  '  `U_PassWord` varchar(30) NOT NULL COMMENT \'用户明文密码\',\n' +
  '  `U_SignaTure` varchar(30) DEFAULT NULL COMMENT \'用户签名\',\n' +
  '  `U_Sex` tinyint(2) NOT NULL DEFAULT \'0\' COMMENT \'用户性别\',\n' +
  '  `U_Birthday` varchar(50) DEFAULT NULL COMMENT \'用户生日\',\n' +
  '  `U_Telephone` varchar(30) DEFAULT NULL COMMENT \'用户手机号码\',\n' +
  '  `U_Name` varchar(30) DEFAULT NULL COMMENT \'用户真实姓名\',\n' +
  '  `U_Age` int(11) DEFAULT NULL COMMENT \'用户年龄\',\n' +
  '  `U_Email` varchar(50) DEFAULT NULL COMMENT \'用户邮箱\',\n' +
  '  `U_Intro` varchar(300) DEFAULT NULL COMMENT \'用户简介\',\n' +
  '  `U_HeadPortrait` varchar(100) DEFAULT NULL COMMENT \'用户头像\',\n' +
  '  `properties` text COMMENT \'扩展数据\',\n' +
  '  PRIMARY KEY (`U_ID`) USING BTREE\n' +
  ') ENGINE=InnoDB AUTO_INCREMENT=541  \n' +
  'DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;',
  create_table_sql_room: '',
  create_table_sql_friends: '',
  create_table_sql_messages: '',
};