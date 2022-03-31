// 数据库配置文件
var Sequelize = require("sequelize");//操作MySql的ORM框架
var CONFIG = require("./config");

// 实例化数据库对象
var sequelize = new Sequelize(
  CONFIG.MYSQL.database,
  CONFIG.MYSQL.username,
  CONFIG.MYSQL.password,
  {
    host: CONFIG.MYSQL.host,
    dialect: "mysql", //数据库类型
    logging: CONFIG.DEBUG ? console.log : false,
    // 配置数据库连接池
    pool:{
        max:5,
        min:0,
        idle:10000
    },
    timezone:'+8:00'//时区设置
  }
);

module.exports = sequelize;
