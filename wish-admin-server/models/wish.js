// 实现数据库表的映射
const Sequelize = require("sequelize");
// 引入数据库实例
const db = require("../db");

// 定义model
const Wish = db.define(
  "Wish",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true, //是否支持驼峰
    tableName: "wish",
  }
);
module.exports = Wish;
