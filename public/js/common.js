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
	$('#sub-register').on('click',function(){
		//2.1获取表单数据
		var username = $register.find('[name="username"]').val();
		var password = $register.find('[name="password"]').val();
		var repassword = $register.find('[name="repassword"]').val();
		//2.2验证
		var errMsg = '';
		var $err = $register.find('.err')
		//用户名以字母开头，数字字母下划线的3-10位字符
		if(!/^[a-z][0-9a-z_]{2,9}$/i.test(username)){
			errMsg = '用户名以字母开头，数字字母下划线的3-10位字符'
		}
		//密码3-6位
		else if(!/^\w{3,6}$/i.test(password)){
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
				console.log(result)
			})
			.fail(function(err){
				$err.html('请求失败,请稍后重试')
			})
		}
		
	})












})(jQuery);