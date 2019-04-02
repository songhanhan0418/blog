const express = require('express')
const UserModel = require('../models/user.js')
const hmac = require('../util/hmac.js')
const router = express.Router()

router.post('/register', (req, res) => {
	const {username,password} = req.body
	const result = {
		status:0, //成功
		message:''
	}
	//1.检查是否注册过
	UserModel.findOne({username})
	.then(user=>{
		if(user){//用户已存在
			result.status = 10;
			result.message = '用户已存在'
			res.json(result)
		}else{
			UserModel.insertMany({
				username,
				password:hmac(password),
				//isAdmin:true
			})
			.then(user=>{
				result.data = user
				res.json(result)
			})
			.catch(err=>{
				throw err
			})
		}
	})
	.catch(err=>{//寻找时发生错误，并非找不到
		result.status = 10;
		result.message = '服务器端错误，请稍后再试'
		res.json(result)		
	})
})
 //登录检查
router.post('/login', (req, res) => {
	const {username,password} = req.body
	const result = {
		status:0, //成功
		message:''
	}
	//1.检查是否注册过
	UserModel.findOne({username,password:hmac(password)},'-password -__v')
	.then(user=>{
		if(user){//登录成功
			result.data = user
			//req.cookies.set('userInfo',JSON.stringify(user))
			req.session.userInfo = user
			res.json(result)
		}else{
			result.status = 10;
			result.message = '用户名或密码不正确'
			res.json(result)
		}
	})
	.catch(err=>{//寻找时发生错误，并非找不到
		result.status = 10;
		result.message = '服务器端错误，请稍后再试'
		res.json(result)		
	})
})

router.get('/logout',(req,res)=>{
	const result = {
		status:0, //成功
		message:''
	}
	//req.cookies.set('userInfo',null)
	req.session.destroy()
	res.json(result)
})

module.exports = router