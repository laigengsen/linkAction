const express=require('express');
const router=express.Router();
const UrlModel=require('../models/Url.js');

//重定向到长链接的
router.get('/:code',async(req,res)=>{
    //获取url对象
    const url=await UrlModel.findOne({urlCode:req.params.code});

    //检测url是否存在
    if(url){
        //将跳转的页面由字符转为html
        res.type('html');

        // res.redirect(url.longUrl);
        res.render('index.ejs',{
            url:url.longUrl
        });
    }else{
        res.status(404).json('server error.');
    }
});

module.exports=router;