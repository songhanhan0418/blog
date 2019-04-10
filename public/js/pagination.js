/*
* @Author: TomChen
* @Date:   2019-03-13 18:10:45
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-13 18:52:43
*/
;(function($){
	$.fn.extend({
		pagination:function(options){
			var $elem = $(this);
			$elem.on('click','a',function(){
				var $this =$(this)
				//计算页码
				var page = 1;
				//获取当前页
				var currentPage = $elem.find('.active a').html()

				var labelText = $this.attr('aria-label');
				if(labelText == 'Next'){
					page = currentPage*1 + 1;
				}else if(labelText == 'Previous'){
					page = currentPage*1 - 1
				}
				else{
					page =$this.html()
				}
				if(currentPage == page){
					return false
				}
				//发送请求
				$.ajax({
					url:options.url+'?page=' + page,
					dataType:'json'
				})
				.done(function(result){
					if(result.status == 0 ){
						$elem.trigger('get-data',result.data)
					}
				})
				.fail(function(err){
					console.log(err)
				})


			})
		}
	})
})(jQuery);