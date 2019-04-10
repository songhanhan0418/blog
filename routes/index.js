const express = require('express')
const CategoryModel = require('../models/category.js')
const ArticleModel = require('../models/article.js')
const router = express.Router()

async function getCommonData(req){
	const categoriesPromise = CategoryModel.find({},'name').sort({order:-1})
	const pageArticlesPromise = ArticleModel.getPaginationArticles(req)
	const topArticlesPromise = ArticleModel.find({},'_id click title').sort({click:-1}).limit(10)

	const categories = await categoriesPromise;
	const pageArticles = await pageArticlesPromise
	const topArticles = await topArticlesPromise
	return {
		categories,
		pageArticles,
		topArticles
	}
}

//显示首页
router.get('/', (req, res) => {
	getCommonData(req)
	.then(data=>{
		const {categories,pageArticles,topArticles} = data
		res.render('main/index',{
			userInfo:req.userInfo,
			categories,
			topArticles,
			articles:pageArticles.docs,
			page:pageArticles.page,
			list:pageArticles.list,
			pages:pageArticles.pages,
			url:'/article'
		})			
	})
})
//处理文章数据的ajax请求
router.get('/articles',(req,res)=>{
	ArticleModel.getPaginationArticles(req)
	.then(data=>{
		res.json({
			status:0,
			data
		})		
	})

})



module.exports = router