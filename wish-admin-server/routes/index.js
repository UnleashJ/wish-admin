var express = require('express');
var router = express.Router();

// 登录相关接口（路由）
const Indexconstructor = require('../controllers/index')
router.post('/login',Indexconstructor.login);
module.exports = router