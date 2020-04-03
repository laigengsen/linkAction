const express=require('express');
const router=express.Router();
const UrlModel=require('../models/Url.js');
const validUrl=require('valid-url');
const shortid=require('shortid');
const config=require('config');

//阻塞延时的方法 单位为秒
async function sleep(time){
    return new Promise((resolve)=>{
        let timer = setTimeout(()=>{
            resolve();
            clearTimeout(timer);
        },time*1000)
    })
}

//@route POST api/url/shorten
//创建短链接
router.post('/shorten',async(req,res)=>{
    
    //睡眠2秒
    await sleep(2);

    //获取长链接
    const{longUrl}=req.body;

    //验证长链接
    if(!validUrl.isUri(longUrl)){
        return res.status(401).json('无效的url');
    }

    //生成唯一标识（url Code）成为
    const urlCode=shortid.generate();

    //生成短链接
    const shortUrl=config.get('baseUrl')+'/'+urlCode;

    try{
            //检测长链接是否已经存在于数据库
    let url=await UrlModel.findOne({longUrl});
    if(url){
        return res.json(url);
    }

    //生成的短链接存入数据库
    url = new UrlModel({
        longUrl,shortUrl,urlCode,date:new Date()
    })
    url.save();

    //响应url对象
    res.json(url);
    }catch(error){
        console.error();
        res.status(500).json('server error.')
    }
});

module.exports=router;