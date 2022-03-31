const Common = require("./common");
const WishModel = require("../models/wish");
const Constant = require("../constant/constant");
const dateFormat = require("dateformat");
const Token = require("./token");
const TOKEN_EXPIRE_SECOND = 3600; //Token失效时间一小时

let exportObj = {
  list,
  info,
  add,
  update,
  remove,
};

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
        if (req.query.name) {
          whereCondition.name = req.query.name;
        }
        WishModel.findAndCountAll({
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
                name: item.name,
                content: item.content,
                createdAt: dateFormat(item.createdAt, "yyyy-mm-dd HH:MM:ss"),
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
        WishModel.findByPk(req.params.id)
          .then(function (result) {
            console.log(result);
            if (result) {
              resObj.data = {
                id: result.id,
                name: result.name,
                content: result.content,
                createdAt: dateFormat(result.createdAt, "yyyy-mm-dd HH:MM:ss"),
              };
              cb(null);
            } else {
              cb(Constant.WISH_NOT_EXSIT);
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
      Common.checkParams(req.body, ["name", "content"], cb);
    },
    add: [
      "checkParams",
      (result, cb) => {
        WishModel.create({
          name: req.body.name,
          content: req.body.content,
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
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS); //定义返回对象
  let tasks = {
    checkParams: (cb) => {
      Common.checkParams(req.body, ["id", "name", "content"], cb);
    },
    update: [
      "checkParams",
      (result, cb) => {
        WishModel.update(
          {
            name: req.body.name,
            content: req.body.content,
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
              cb(Constant.WISH_NOT_EXSIT);
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
        WishModel.destroy({
          where: {
            id: req.body.id,
          },
        })
          .then(function (result) {
            if (result) {
              cb(null);
            } else {
              cb(Constant.WISH_NOT_EXSIT);
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
