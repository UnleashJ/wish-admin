var express = require('express');
var router = express.Router();

// 许愿管理模块路由
const Wishconstructor = require('../controllers/wish')
// 获取许愿列表接口
router.get('/',Wishconstructor.list);
// 获得许愿详情接口
router.get('/:id',Wishconstructor.info);
// 新增许愿接口
router.post('/',Wishconstructor.add);
/*  
    修改许愿内容接口
    PUT 与 POST 方法的区别在于，PUT方法是幂等的：调用一次与连续调用多次是等价的（即没有副作用），
    而连续调用多次POST方法可能会有副作用，比如将一个订单重复提交多次。
*/
router.put('/',Wishconstructor.update);
// 删除许愿接口
router.delete('/',Wishconstructor.remove);
module.exports = router