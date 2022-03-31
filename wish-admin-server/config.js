// 数据库连接配置，管理数据库域名、账号等信息
const config = {
    //开启调试模式
    DEBUG:true,
    // MySql数据库连接配置
    MYSQL:{
        host:'localhost',
        database:'wish',
        username:'root',
        password:'jcm145236'
    }
};
if(process.env.NODE_ENV==='production'){
    config.MYSQL = {
        host:'localhost',
        database:'wish',
        username:'root',
        password:'jcm145236'
    }
}
module.exports = config