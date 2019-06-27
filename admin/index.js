const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const User = require('./schema/users')

app.use(bodyParser.urlencoded({
  extended:false,
}));
app.use(bodyParser.json())

app.use('/register',(req,res)=>{
  let {name,password} = req.body;
  //new User({name,password}).save()
  //console.log(name, password);
  User.findOne({name}).then((data)=>{
    if(data){
      res.send({
        errno:1
      })
    }else{
      res.send({
        errno:0
      })
      new User({name,password}).save()
      //,shopcar:{id:0,num:0}
    }

  })
})

app.use('/login',(req,res)=>{
  let {name,password} = req.body;
  //new User({name,password}).save()
  //console.log(name, password);
  User.findOne({name,password}).then((data)=>{
    if(data){
      res.send({
        errno:1
      })
    }else{
      res.send({
        errno:0
      })
      //new User({name,password}).save()
    }
  })
})
//加入购物车
app.use('/addcart',(req,res)=>{
  let {name,id} = req.body;
 // console.log(name,id);
  User.findOne({name}).then(data=>{
    console.log(data,data.shopcar);
    if(!data.shopcar.includes(id)){
      data.shopcar.push(id);
      data.save().then(res.send({errno:1}))
    }else{
      res.send({errno:0})
    }
  });
})
//请求购物车数据
app.use('/shopcar',(req,res)=>{
  let {name} = req.body;
  User.findOne({name}).then(data=>{
    //console.log(data);
    res.send(data.shopcar)
  })
})
//移除购物车
app.use('/removecar',(req,res)=>{
  let {name,id} = req.body;
  console.log(id);
  User.findOne({name}).then(data=>{
    data.shopcar = data.shopcar.filter(v=>{
      return v!=id
    })
    console.log(data.shopcar);
    data.save().then(()=>{
      console.log(data.shopcar);
    });
  })
})

mongoose.connect('mongodb://localhost:27017/app1',{useNewUrlParser:true},(err)=>{
  if(err){
    console.log('数据库连接失败')
  }
  console.log('数据库连接成功');
  app.listen(3000);
})
