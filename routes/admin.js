const express = require('express')
const multer = require('multer')
const upload = multer({ dest:'public/uploads/'})

const UserModel = require('../models/user.js')
const pagination = require('../util/pagination.js')
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

	const options={
		page:req.query.page,
		model:UserModel,
		query:{},
		projection:'-password -__v',
		sort:{_id:1},
		populates:[{path:'user',select:'username'},{path:'category',select:'name'}]
	}
	
	pagination(options)
	.then(data=>{
		res.render('admin/user_list',{
			userInfo:req.userInfo,
			users:data.docs,
			page:data.page,
			list:data.list,
			pages:data.pages,
			url:'/admin/users'
		})			
	})


	
})

//处理上传图片
router.post('/uploadImage',upload.single('upload'),(req,res)=>{
	console.log(req.file)
	const uploadedFilePath = '/uploads/'+req.file.filename
	res.json({
		uploaded:true,
		url:uploadedFilePath
	})
})
module.exports = router