const mongose=require('mongoose');


//创建数据表结构
const urlSchema=new mongose.Schema({
    urlCode:String,
    longUrl:String,
    shortUrl:String,
    date:{type:String,default:Date.now()}
})

//创建表模型model
const model=mongose.model('Url',urlSchema);

module.exports=model;