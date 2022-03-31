const Common = require('./common')
const AdminModel = require('../models/admin')
const Constant = require('../constant/constant')
const dateFormat = require('dateformat')
const Token = require('./token')
const TOKEN_EXPIRE_SECOND = 3600 //Token失效时间一小时

let exportObj = {
    list,
    info,
    add,
    update,
    remove
}

module.exports = exportObj;


function list(req, res) {
    const resObj = Common.clone(Constant.DEFAULT_SUCCESS); //定义返回对象
    let tasks = {
      checkParams: (cb) => {
        Common.checkParams(req.query, ["page", "rows"], cb); //page页码，rows每页条数
      },
      query: [
        "checkParams",
        (result, cb) => {
          // 从第几条开始查
          let offset = (req.query.page - 1) * req.query.rows || 0;
          let limit = parseInt(req.query.rows) || 20;
          let whereCondition = {};
          if (req.query.username) {
            whereCondition.username = req.query.username;
          }
          AdminModel.findAndCountAll({
            where: whereCondition,
            offset,
            limit,
            order: [["created_at", "DESC"]],
          })
            .then(function (result) {
              let list = [];
              result.rows.forEach((item, index) => {
                let obj = {
                  id: item.id,
                  username:item.username,
                  name: item.name,
                  role: item.role,
                  createdAt: dateFormat(item.createdAt, "yyyy-mm-dd HH:MM:ss"),
                  lastLoginAt: dateFormat(item.lastLoginAt, "yyyy-mm-dd HH:MM:ss"),
                };
                list.push(obj);
              });
              resObj.data = {
                list,
                count: result.count,
              };
              cb(null);
            })
            .catch(function (err) {
              console.log(err);
              cb(Constant.DEFAULT_ERROR);
            });
        },
      ],
    };
    Common.autoFn(tasks, res, resObj);
  }
  
  function info(req, res) {
    const resObj = Common.clone(Constant.DEFAULT_SUCCESS); //定义返回对象
    let tasks = {
      checkParams: (cb) => {
        Common.checkParams(req.params, ["id"], cb);
      },
      query: [
        "checkParams",
        (result, cb) => {
          AdminModel.findByPk(req.params.id)
            .then(function (result) {
              console.log(result);
              if (result) {
                resObj.data = {
                  id: result.id,
                  username:result.username,
                  name: result.name,
                  role: result.role,
                  createdAt: dateFormat(result.createdAt, "yyyy-mm-dd HH:MM:ss"),
                  lastLoginAt: dateFormat(result.lastLoginAt, "yyyy-mm-dd HH:MM:ss"),
                };
                cb(null);
              } else {
                cb(Constant.ADMIN_NOT_EXSIT);
              }
            })
            .catch(function (err) {
              console.log(err);
              cb(Constant.DEFAULT_ERROR);
            });
        },
      ],
    };
    Common.autoFn(tasks, res, resObj);
  }
  
  function add(req, res) {
    const resObj = Common.clone(Constant.DEFAULT_SUCCESS); //定义返回对象
    let tasks = {
      checkParams: (cb) => {
        Common.checkParams(req.body, ["username","password","name", "role"], cb);
      },
      add: [
        "checkParams",
        (result, cb) => {
          AdminModel.create({
            name: req.body.name,
            role: req.body.role,
            username: req.body.username,
            password: req.body.password
          })
            .then(function (result) {
              cb(null);
            })
            .catch(function (err) {
              console.log(err);
              cb(Constant.DEFAULT_ERROR);
            });
        },
      ],
    };
    Common.autoFn(tasks, res, resObj);
  }
  
  function update(req, res) {
      console.log('update')
    const resObj = Common.clone(Constant.DEFAULT_SUCCESS); //定义返回对象
    let tasks = {
      checkParams: (cb) => {
        Common.checkParams(req.body, ["id", "username","password","name", "role"], cb);
      },
      update: [
        "checkParams",
        (result, cb) => {
          AdminModel.update(
            {
              name: req.body.name,
              username: req.body.username,
              password: req.body.password,
              role: req.body.role,
            },
            {
              where: {
                id: req.body.id,
              },
            }
          )
            .then(function (result) {
              if (result[0]) {
                cb(null);
              } else {
                cb(Constant.ADMIN_NOT_EXSIT);
              }
            })
            .catch(function (err) {
              console.log(err);
              cb(Constant.DEFAULT_ERROR);
            });
        },
      ],
    };
    Common.autoFn(tasks, res, resObj);
  }
  
  function remove(req, res) {
    const resObj = Common.clone(Constant.DEFAULT_SUCCESS); //定义返回对象
    let tasks = {
      checkParams: (cb) => {
        Common.checkParams(req.body, ["id"], cb);
      },
      add: [
        "checkParams",
        (result, cb) => {
          AdminModel.destroy({
            where: {
              id: req.body.id,
            },
          })
            .then(function (result) {
              if (result) {
                cb(null);
              } else {
                cb(Constant.ADMIN_NOT_EXSIT);
              }
            })
            .catch(function (err) {
              console.log(err);
              cb(Constant.DEFAULT_ERROR);
            });
        },
      ],
    };
    Common.autoFn(tasks, res, resObj);
  }
  