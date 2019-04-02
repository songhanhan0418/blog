const express = require('express')
const UserModel = require('../models/user.js')
const router = express.Router()

router.use((req,res,next) => {
	if(req.userInfo.isAdmin){
		next()
	}else{
		res.send('<h1>请用管理员账号登录</h1>')
	}
})

router.get('/',(req,res)=>{
	res.render('admin/index',{
		userInfo:req.userInfo
	})
})

//显示用户列表

router.get('/users',(req,res)=>{

	//分页
	//约定：一页显示2条
	//第一页：跳过两条
	//第page页：跳过(page - 1) * limit

	let {page} = req.query;

	const limit = 2;

	page = parseInt(page)
	if(isNaN(page)){
		page = 1
	}
	if(page == 0){
		page = 1
	}
	UserModel.countDocuments({})
	.then(count=>{
		//计算总页数
		const pages = Math.ceil(count/limit)
		if(page > pages){
			page = pages
		}
		//生成页码数组
		const list = [];
		for(var i = 1;i<=pages;i++){
			list.push(i)
		}

		//每页显示条数
		const skip = (page - 1) * limit

		UserModel.find({},'-password -__v')
		.skip(skip)
		.limit(limit)
		.then(users=>{
			res.render('admin/user_list',{
				userInfo:req.userInfo,
				users,
				page,
				list
			})	
		})
	})
	



	
})
module.exports = router