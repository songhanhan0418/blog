const express = require('express')
const mongoose = require('mongoose')
const swig = require('swig')
const bodyParser = require('body-parser')
const app = express();
const port = 3000

//连接数据库服务
mongoose.connect('mongodb://localhost/blog', {useNewUrlParser: true});

const db = mongoose.connection;

db.on('error',(err)=>{
	console.log('connect err:::',err);
	throw err;
});

db.once('open',()=>{
	console.log('successful connect!!!');
});

app.use(express.static('public'))

//开发阶段设置不走缓存
swig.setDefaults({
	cache:false
})

//配置应用模板
app.engine('html', swig.renderFile);
//配置模板的存放目录
app.set('views', './views')
//注册模板引擎
app.set('view engine', 'html')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use('/',require('./routes/index.js'))
app.use('/user',require('./routes/user.js'))

app.listen(port, () => console.log(`app listening on port ${port}!`))