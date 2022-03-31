var express = require('express');
var router = express.Router();

// 管理员相关接口（路由）
const Adminconstructor = require('../controllers/admin')

// 获得管理员列表
router.get('/',Adminconstructor.list);
// 获得管理员详情接口
router.get('/:id',Adminconstructor.info);
// 新增管理员接口
router.post('/',Adminconstructor.add);
// 修改管理员
router.put ('/',Adminconstructor.update );
// 删除管理员
router.delete ('/',Adminconstructor.remove );
module.exports = router