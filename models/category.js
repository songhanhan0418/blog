const mongoose = require('mongoose');

//定义schema
const CategorySchema = new mongoose.Schema({
	name:{
		type:String
	},
	order:{
		type:Number,
		default:0
	},
})
//生成模型
const CategoryModel = mongoose.model('Category', CategorySchema);
//导出模型
module.exports = CategoryModel;