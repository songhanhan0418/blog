;(function($){
	var $login = $('#login');
	var $register = $('#register');
	//1.登录面板和注册面板的切换
	//1.1注册面板-->登录面板
	$('#go-login').on('click',function(){
		$register.hide();
		$login.show();
	})
	//1.2登录面板-->注册面板
	$('#go-register').on('click',function(){
		$login.hide();
		$register.show();
	})
	//2.用户注册
	var usernameReg = /^[a-z][0-9a-z_]{2,9}$/i;
	var passwordReg = /^\w{3,6}$/;
	$('#sub-register').on('click',function(){
		//2.1获取表单数据
		var username = $register.find('[name="username"]').val();
		var password = $register.find('[name="password"]').val();
		var repassword = $register.find('[name="repassword"]').val();
		//2.2验证
		var errMsg = '';
		var $err = $register.find('.err')

		//用户名以字母开头，数字字母下划线的3-10位字符
		if(!usernameReg.test(username)){
			errMsg = '用户名以字母开头，数字字母下划线的3-10位字符'
		}
		//密码3-6位
		else if(!passwordReg.test(password)){
			errMsg = '密码3-6位'
		}
		//密码输入一致
		else if(password != repassword){
			errMsg = '密码输入不一致'
		}

		if(errMsg){
			//验证不通过
			$err.html(errMsg)
			return
		}
		else{
			//验证通过
			$err.html('');
			//2.3发送ajax提交数据
			$.ajax({
				url:'/user/register',
				type:'post',
				dataType:'json',
				data:{
					username:username,
					password:password
				}
			})
			.done(function(result){
				if(result.status == 0){
					$('#go-login').trigger('click')
				}else{
					$err.html(result.message)
				}
			})
			.fail(function(err){
				$err.html('请求失败,请稍后重试')
			})
		}
		
	})
	//登录验证
	$('#sub-login').on('click',function(){
		//2.1获取表单数据
		var username = $login.find('[name="username"]').val();
		var password = $login.find('[name="password"]').val();
		//2.2验证
		var errMsg = '';
		var $err = $login.find('.err')

		//用户名以字母开头，数字字母下划线的3-10位字符
		if(!usernameReg.test(username)){
			errMsg = '用户名以字母开头，数字字母下划线的3-10位字符'
		}
		//密码3-6位
		else if(!passwordReg.test(password)){
			errMsg = '密码3-6位'
		}

		if(errMsg){
			//验证不通过
			$err.html(errMsg)
			return
		}
		else{
			//验证通过
			$err.html('');
			//2.3发送ajax提交数据
			$.ajax({
				url:'/user/login',
				type:'post',
				dataType:'json',
				data:{
					username:username,
					password:password
				}
			})
			.done(function(result){
				if(result.status == 0){
					/*$login.hide();
					$('#user-info span').html(result.data.username)
					$('#user-info').show()*/
					window.location.reload()
				}else{
					$err.html(result.message)
				}
			})
			.fail(function(err){
				$err.html('请求失败,请稍后重试')
			})
		}
		
	})


//文章列表分页
var $articlePagination = $('#article-list');
function buildArticleListHtml(articles){
	var html = '';
	articles.forEach(function(article){
		var createdAt = moment(article.createdAt).format('YYYY年MM月DD日 H:mm:ss')
		html+= `
				<div class="panel panel-default content-item">
			      <div class="panel-heading">
			        <h3 class="panel-title">
			          <a href="/view/${ article._id.toString() }" class="link" target="_blank">${ article.title }</a>
			        </h3>
			      </div>
			      <div class="panel-body">
			        ${ article.intro }
			      </div>
			      <div class="panel-footer">
			        <span class="glyphicon glyphicon-user"></span>
			        <span class="panel-footer-text text-muted">${ article.user.username }</span>
			        <span class="glyphicon glyphicon-th-list"></span>
			        <span class="panel-footer-text text-muted">${ article.category.name }</span>
			        <span class="glyphicon glyphicon-time"></span>
			        <span class="panel-footer-text text-muted">${ createdAt }</span>
			        <span class="glyphicon glyphicon-eye-open"></span>
			        <span class="panel-footer-text text-muted"><em>${ article.click }</em>已阅读</span>
			      </div>
			    </div>
				`
	})

	return html;
}
function buildArticlePaginationHtml(list,page){
	var html = '';
	html = `
		    <li>
		      <a href="javascript:;" aria-label="Previous">
		        <span aria-hidden="true">&laquo;</span>
		      </a>
		    </li>
			`
	list.forEach(function(i){
		if(i ==page){
			html +=`<li class="active"><a href="javascript:;">${ i }</a></li>`
		}else{
			html +=`<li><a href="javascript:;">${ i }</a></li>`
		}
	})
	html +=`<li>
		      <a href="javascript:;" aria-label="Next">
		        <span aria-hidden="true">&raquo;</span>
		      </a>
		    </li>`
	return html;
}
$articlePagination.on('get-data',function(ev,data){
	//1.构建文章列表
	$('#article-wrap').html(buildArticleListHtml(data.docs))
	//2.构建分页器
	var $pagination = $articlePagination.find('.pagination')
	if(data.pages > 1){
		$pagination.html(buildArticlePaginationHtml(data.list,data.page))
	}else{
		$pagination.html('')
	}
})

$articlePagination.pagination({
	url:'/articles',
})








})(jQuery);