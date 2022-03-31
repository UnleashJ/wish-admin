// 实现数据库表的映射
const Sequelize = require("sequelize");
// 引入数据库实例
const db = require("../db");

// 定义model
const Admin = db.define(
  "Admin",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastLoginAt:{
      type:Sequelize.DATE
    }
  },
  {
    underscored: true, //是否支持驼峰
    tableName: "admin",
  }
);
module.exports = Admin;
