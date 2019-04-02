const mongoose = require('mongoose');

//定义schema
const UserSchema = new mongoose.Schema({
	username:{
		type:String
	},
	password:{
		type:String
	},
	isAdmin:{
		type:Boolean,
		default:false
	}


})
//生成模型
const UserModel = mongoose.model('User', UserSchema);
//导出模型
module.exports = UserModel;