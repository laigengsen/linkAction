const mongoose=require('mongoose');
const config=require('config');
const dbUrl=config.get('mongodbUrl');

//创建mongodb数据库链接方法
const connectDB=async()=>{
    try{
        await mongoose.connect(dbUrl,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log('mongodb connected.');
    }catch(err){
        console.log(err.message);
        process.exit(1);
    }
}

module.exports=connectDB;