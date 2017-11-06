/**
 * util.util.js
 * 1.qser
 * 2.qdata
 * 3.util.on
 * 4.util.is
 * 5.util.ajax
 * 6.util.totop
 * 7.util.qrcode
 * 8.util.end
 * 9.util.cookie
 * 10.util.search
 */
// 对Date的扩展，将 Date 转化为指定格式的String   
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
// 例子：   
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
Date.prototype.Format = function(fmt)   
{ //author: meizz   
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}  


var util = {};

util.getNowFormatDate = function() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate
    return currentdate;
};

util.getLastFormatDate = function() {
	 var date = new Date();
	 date.setDate(date.getDate()-1);
	 var seperator1 = "-";
	 var seperator2 = ":";
	 var year = date.getFullYear();
	 var month = date.getMonth() + 1;
	 var strDate = date.getDate();
	 if (month >= 1 && month <= 9) {
	     month = "0" + month;
	 }
	 if (strDate >= 0 && strDate <= 9) {
	     strDate = "0" + strDate;
	 }
	 var currentdate = year + seperator1 + month + seperator1 + strDate
	 return currentdate;
}


util.on = function(obj, event, func){
	$(document).off(event, obj).on(event, obj, func);
};

/**
 * 将表单转为js对象
 */
$.fn.qser = function(){
	var obj = {};
	
	var objs = $(this).serializeArray();
	if(objs.length != 0){
		for(var i=0; i<objs.length; i++){
			obj[objs[i].name] = objs[i].value;
		}
	}

	return obj;
};

/** 
 * 将data属性转为js对象
 */
$.fn.qdata = function(){
	var res = {};
	
	var data = $(this).attr('data');
	if(data){
		var options = data.split(';');
		for(var i=0; i<options.length; i++){
			if(options[i]){
				var opt = options[i].split(':');
				res[opt[0]] = opt[1];
			}
		}
	}
	
	return res;
};

/**
 * util.on
 * 事件绑定
 */
util.on = function(obj, event, func){
	$(document).off(event, obj).on(event, obj, func);
};

/**
 * util.is
 * 一些常用的判断，例如数字，手机号等
 */
util.is = function(str, type){
	if(str && type){
		if(type == 'number') return /^\d+$/g.test(str);
		if(type == 'mobile') return /^1\d{10}$/g.test(str);
	}
};

/**
 * util.ajax
 * 对$.ajax的封装
 */
util.ajaxoptions = {
	url 		: '',
	data 		: {},
	type 		: 'post',
	dataType	: 'json',
	async 		: true,
	crossDomain	: false
};
util.ajaxopt = function(options){
	var opt = $.extend({}, util.ajaxoptions);
	if(typeof options == 'string'){
		opt.url = options;
	}else{
		$.extend(opt, options);
	}
	
	return opt;
};
util.ajax = function(options, success, fail){
	if(options){
		var opt = util.ajaxopt(options);
		if(typeof base != 'undefined') opt.url = base + opt.url;
		
		$.ajax(opt).done(function(obj){
			if(success) success(obj);
		}).fail(function(e){
			if(fail){
				fail(e);
			}else{
				alert('数据传输失败，请重试！');
			}
		});
	}
};

/**
 * util.totop
 * 返回顶部的方法
 * 可以参考：plugins/_01_qtotop/qtotop.html
 */
util.totop = function(el){
	var $el = $(el);
	$el.hide().click(function(){
		$('body, html').animate({scrollTop : '0px'});
	});
	
	var $window = $(window);
	$window.scroll(function(){
		if ($window.scrollTop()>0){
			$el.fadeIn();
		}else{
			$el.fadeOut();
		}
	});
};

/**
 * util.qcode
 * 生成二维码
 * 注：需要引入qrcode，<script src="http://cdn.staticfile.org/jquery.qrcode/1.0/jquery.qrcode.min.js"></script>
 * text：待生成文字
 * type：中文还是英文，cn为中文
 * render：展示方式，table为表格方式
 * width：宽度
 * height：高度
 * 可以参考：plugins/_03_qcode/qcode.html
 */
$.fn.qcode = function(options){
	if(options){
		var opt = {};
		if(typeof options == 'string'){
			opt.text = options;
		}else{
			if(options.text) opt.text = options.text;
			if(options.type && options.type == 'ch') opt.text = util.qrcodetochar(opt.text);
			if(options.render && options.render == 'table') opt.render = options.render;
			if(options.width) opt.width = options.width;
			if(options.height) opt.height = options.height;
		}

		$(this).qrcode(opt);
	}
};
util.qrcodetochar = function(str){
    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
    }
    return out;
};

/**
 * util.end
 * 到达页面底部后自动加载内容
 * end：到达底部后的回调函数
 * $d：容器，默认是$(window)
 * $c：内容，默认是$(document)
 * 可以参考：plugins/_04_qend/qend.html
 */
util.end = function(end, $d, $c){
	if(end){
		var $d = $d || $(window);
		var $c = $c || $(document);
		
		$d.scroll(function(){if($d.scrollTop() + $d.height() >= $c.height()) end();});
	}else{
		$(window).scroll(null);
	}
};

/**
 * util.cookie
 * 对jquery.cookie.js稍作封装
 * 注：需要引入jquery.cookie.js，<script src="http://cdn.bootcss.com/jquery-cookie/1.4.1/jquery.cookie.min.js"></script>
 * util.cookie(key)：返回key对应的value
 * util.cookie(key, null)： 删除key对应的cookie
 * util.cookie(key, value)：设置key-value的cookie
 * 可以参考：plugins/_05_qcookie/qcookie.html
 */
util.cookie = function(key, value){
	if(typeof value == 'undefined'){
		return $.Cookie(key);
	}else if(value == null){
		$.Cookie(key, value, {path:'/', expires: -1});
	}else{
		$.Cookie(key, value, {path:'/', expires:1});
	}
};

/**
 * util.search
 * 获取url后参数中的value
 * util.search(key)：返回参数中key对应的value
 * 可以参考：plugins/_06_qsearch/qsearch.html
 */
util.search = function(key){
	var res;
	
	var s = location.search;
	if(s){
		s = s.substr(1);
		if(s){
			var ss = s.split('&');
			for(var i=0; i<ss.length; i++){
				var sss = ss[i].split('=');
				if(sss && sss[0] == key) res = sss[1]; 
			}
		}
	}
	
	return res;
};

/**
 * util.bootstrap.js
 * 1.alert
 * 2.confirm
 * 3.dialog
 * 4.msg
 * 5.tooltip
 * 6.popover
 * 7.tree
 * 8.scrollspy
 * 9.initimg
 * 10.bsdate
 * 11.bstro
 */
util.bootstrap 	= {};
util.bootstrap.modaloptions = {
	id		: 'bsmodal',
	url 	: '',
	fade	: 'fade',
	close	: true,
	title	: 'title',
	head	: true,
	foot	: true,
	btn		: false,
	okbtn	: '确定',
	qubtn	: '取消',
	msg		: 'msg',
	big		: false,
	show	: false,
	remote	: false,
	backdrop: 'static',
	keyboard: true,
	style	: '',
	mstyle	: '',
	callback: null
};
util.bootstrap.modalstr = function(opt){
	var start = '<div class="modal '+opt.fade+'" id="' + opt.id + '" tabindex="-1" role="dialog" aria-labelledby="bsmodaltitle" aria-hidden="true" style="position:fixed;top:20px;'+opt.style+'">';
	if(opt.big){
		start += '<div class="modal-dialog modal-lg" style="'+opt.mstyle+'"><div class="modal-content">';
	}else{
		start += '<div class="modal-dialog" style="'+opt.mstyle+'"><div class="modal-content">';
	}
	var end = '</div></div></div>';
	
	var head = '';
	if(opt.head){
		head += '<div class="modal-header">';
		if(opt.close){
			head += '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>';
		}
		head += '<h3 class="modal-title" id="bsmodaltitle">'+opt.title+'</h3></div>';
	}
	
	var body = '<div class="modal-body"><p><h4>'+opt.msg+'</h4></p></div>';
	
	var foot = '';
	if(opt.foot){
		foot += '<div class="modal-footer"><button type="button" class="btn btn-primary bsok">'+opt.okbtn+'</button>';
		if(opt.btn){
			foot += '<button type="button" class="btn btn-default bscancel">'+opt.qubtn+'</button>';
		}
		foot += '</div>';
	}
	
	return start + head + body + foot + end;
};
util.bootstrap.alert = function(options, func){
	// options
	var opt = $.extend({}, util.bootstrap.modaloptions);
	
	opt.title = '提示';
	if(typeof options == 'string'){
		opt.msg = options;
	}else{
		$.extend(opt, options);
	}
	
	// add
	$('body').append(util.bootstrap.modalstr(opt));
	
	// init
	var $modal = $('#' + opt.id); 
	$modal.modal(opt);
	
	// bind
	util.on('button.bsok', 'click', function(){
		if(func) func();
		$modal.modal('hide');
	});
	util.on('#' + opt.id, 'hidden.bootstrap.modal', function(){
		$modal.remove();
	});
	
	// show
	$modal.modal('show');
};
util.bootstrap.confirm = function(options, ok, cancel){
	// options
	var opt = $.extend({}, util.bootstrap.modaloptions);

	opt.title = '确认操作';
	if(typeof options == 'string'){
		opt.msg = options;
	}else{
		$.extend(opt, options);
	}
	opt.btn = true;
	
	// append
	$('body').append(util.bootstrap.modalstr(opt));
	
	// init
	var $modal = $('#' + opt.id); 
	$modal.modal(opt);
	
	// bind
	util.on('button.bsok', 'click', function(){
		if(ok) ok();
		$modal.modal('hide');
	});
	util.on('button.bscancel', 'click', function(){
		if(cancel) cancel();
		$modal.modal('hide');
	});
	util.on('#' + opt.id, 'hidden.bootstrap.modal', function(){
		$modal.remove();
	});
	
	// show
	$modal.modal('show');
};
util.bootstrap.dialog = function(options, func){
	// options
	var opt = $.extend({}, util.bootstrap.modaloptions, options);
	opt.big = true;
	
	// append
	$('body').append(util.bootstrap.modalstr(opt));
	
	// ajax page
	util.ajax({
		url:options.url,
		dataType:'html'
	}, function(html){
		$('#' + opt.id + ' div.modal-body').empty().append(html);
		if(options.callback) options.callback();
	});
		
	// init
	var $modal = $('#' + opt.id); 
	$modal.modal(opt);
	
	// bind
	util.on('button.bsok', 'click', function(){
		var flag = true;
		if(func){
			flag = func();
		}
		
		if(flag){
			$modal.modal('hide');
		}
	});
	util.on('button.bscancel', 'click', function(){
		$modal.modal('hide');
	});
	util.on('#' + opt.id, 'hidden.bootstrap.modal', function(){
		$modal.remove();
	});
	
	// show
	$modal.modal('show');
};
util.bootstrap.msgoptions = {
	msg  : 'msg',
	type : 'info',
	time : 2000,
	position : 'top',
};
util.bootstrap.msgstr = function(msg, type, position){
	return '<div class="alert alert-'+type+' alert-dismissible" role="alert" style="display:none;position:fixed;' + position + ':0;left:0;width:100%;z-index:2001;margin:0;text-align:center;" id="bsalert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'+msg+'</div>';
};
util.bootstrap.msg = function(options){
	var opt = $.extend({},util.bootstrap.msgoptions);
	
	if(typeof options == 'string'){
		opt.msg = options;
	}else{
		$.extend(opt, options);
	}
	
	$('body').prepend(util.bootstrap.msgstr(opt.msg, opt.type , opt.position));
	$('#bsalert').slideDown();
	setTimeout(function(){
		$('#bsalert').slideUp(function(){
			$('#bsalert').remove();
		});
	},opt.time);
};
util.bootstrap.popoptions = {
	animation 	: true,
	container 	: 'body',
	content		: 'content',
	html		: true,
	placement	: 'bottom',
	title		: '',
	trigger		: 'hover'//click | hover | focus | manual.
};
$.fn.bstip = function(options){
	var opt = $.extend({}, util.bootstrap.popoptions);
	if(typeof options == 'string'){
		opt.title = options;
	}else{
		$.extend(opt, options);
	}
	
	$(this).data(opt).tooltip();
};
$.fn.bspop = function(options){
	var opt = $.extend({}, util.bootstrap.popoptions);
	if(typeof options == 'string'){
		opt.content = options;
	}else{
		$.extend(opt, options);
	}
	
	$(this).popover(opt);
};
util.bootstrap.tree = {};
util.bootstrap.tree.options = {
	url 	: '',
	height 	: '600px',
	open	: true,
	edit	: false,
	checkbox: false,
	showurl	: true
};
$.fn.bstree = function(options){
	var opt = $.extend({}, util.bootstrap.tree.options);
	if(options){
		if(typeof options == 'string'){
			opt.url = options;
		}else{
			$.extend(opt, options);
		}
	}
	
	var res = '加载失败！';
	var $this = $(this);
	util.ajax(opt.url + '/tree', function(json){
		if(json && json.object){
			var tree = json.object;
			
			var start = '<div class="panel panel-info"><div class="panel-body" ';
			if(opt.height != 'auto') 
				start += 'style="height:600px;overflow-y:auto;"';
			start += '><ul class="nav nav-list sidenav" id="treeul" data="url:' + opt.url +';">';
			var children = util.bootstrap.tree.sub(tree, opt);
			var end = '</ul></div></div>';
			res = start + children + end;
		}
		
		$this.empty().append(res);
		util.bootstrap.tree.init();
	});
};
util.bootstrap.tree.sub = function(tree, opt){
	var res = '';
	if(tree){
		var res = 
			'<li>' + 
				'<a href="javascript:void(0);" data="id:' + tree.id + ';url:' + tree.url + ';">' + 
					'<span class="glyphicon glyphicon-minus"></span>';
		if(opt.checkbox){
			res += '<input type="checkbox" class="treecheckbox" ';
			if(tree.checked){
				res += 'checked';
			}
			res += '/>';
		}
			res += tree.text;
		if(opt.showurl){
			res += '(' + tree.url + ')';
		}
		if(opt.edit)
			res += 
				'&nbsp;&nbsp;<span class="label label-primary bstreeadd">添加子菜单</span>' + 
				'&nbsp;&nbsp;<span class="label label-primary bstreeedit">修改</span>' + 
				'&nbsp;&nbsp;<span class="label label-danger  bstreedel">删除</span>';
			res += '</a>';
		var children = tree.children;
		if(children && children.length > 0){
				res += '<ul style="padding-left:20px;" id="treeid_' + tree.id + '" class="nav collapse ';
			if(opt.open) 
				res += 'in';
				res += '">';
			for(var i=0; i<children.length; i++){
				res += util.bootstrap.tree.sub(children[i], opt);
			}
				res += '</ul>';
		}
		res += '</li>';
	}
	
	return res;
};
util.bootstrap.tree.init = function(){
	util.on('#treeul .glyphicon-minus', 'click', function(){
		if($(this).parent().next().length > 0){
			$('#treeid_' + $(this).parents('a').qdata().id).collapse('hide');
			$(this).removeClass('glyphicon-minus').addClass('glyphicon-plus');
		}
	});
	util.on('#treeul .glyphicon-plus', 'click', function(){
		if($(this).parent().next().length > 0){
			$('#treeid_' + $(this).parents('a').qdata().id).collapse('show');
			$(this).removeClass('glyphicon-plus').addClass('glyphicon-minus');
		}
	});
	util.on('input.treecheckbox', 'change', function(){
		// 检测子级的
		var subFlag = $(this).prop('checked');
		$(this).parent().next().find('input.treecheckbox').each(function(){
			$(this).prop('checked', subFlag);
		});
		
		// 检测父辈的
		var parentFlag = true;
		var $ul = $(this).parent().parent().parent(); 
		$ul.children().each(function(){
			var checked = $(this).children().children('input').prop('checked');
			if(!checked) parentFlag = false;
		});
		$ul.prev().children('input').prop('checked', parentFlag);
	});
	
	util.bootstrap.tree.url = $('#treeul').qdata().url;
	if(util.bootstrap.tree.url){
		util.on('.bstreeadd', 'click', util.bootstrap.tree.addp);
		util.on('.bstreedel', 'click', util.bootstrap.tree.del);
		util.on('.bstreeedit', 'click', util.bootstrap.tree.editp);
	}
};
util.bootstrap.tree.addp = function(){
	util.bootstrap.dialog({
		url 	: util.bootstrap.tree.url + '/add/' + $(this).parent().qdata().id,
		title 	: '添加子菜单',
		okbtn 	: '保存'
	}, util.bootstrap.tree.add);
};
util.bootstrap.tree.add = function(){
	var res;
	util.ajax({url:util.bootstrap.tree.url + '/save',data:$('#bsmodal').find('form').qser(),async: false}, function(obj){res = obj;});
	
	util.bootstrap.msg(res);
	if(res && res.type == 'success'){
		util.crud.url = util.bootstrap.tree.url;
		util.crud.reset();
		return true;
	}else{
		return false;
	}
};
util.bootstrap.tree.del = function(){
	util.ajax({
		url:util.bootstrap.tree.url + '/del/' + $(this).parent().qdata().id,
	}, function(res){
		util.bootstrap.msg(res);
		
		if(res && res.type == 'success'){
			util.crud.url = util.bootstrap.tree.url;
			util.crud.reset();
		}
	});
};
util.bootstrap.tree.editp = function(){
	util.bootstrap.dialog({
		url 	: util.bootstrap.tree.url + '/savep?id=' + $(this).parent().qdata().id,
		title 	: '修改菜单',
		okbtn 	: '保存'
	}, util.bootstrap.tree.edit);
};
util.bootstrap.tree.edit = function(){
	util.crud.url = util.bootstrap.tree.url;
	return util.crud.save();
};
util.bootstrap.spy = function(target,body){
	var $body = 'body';
	var $target = '.scrolldiv';
	
	if(body) $body = body;
	if(target) $target = target;
	
	$($body).scrollspy({target:$target});
};
util.bootstrap.initimg = function(){
	$('img').each(function(){
		var clazz = $(this).attr('class');
		if(clazz){
			if(clazz.indexOf('img-responsive') == -1) $(this).addClass('img-responsive');
		}else{
			$(this).addClass('img-responsive');
		}
	});
};
util.bootstrap.bsdateoptions = {
	autoclose: true,
	language : 'zh-CN',
	format: 'yyyy-mm-dd',
    todayBtn:'linked'
};
util.bootstrap.bsdate = function(selector, options){
	if(selector){
		var $element = $(selector);
		if($element.length > 0){
			var opt = $.extend({}, util.bootstrap.bsdateoptions, options);
			$element.each(function(){
				$(this).datepicker(opt);
			});
		}
	}
};
util.bootstrap.bstrooptions = {
	width 	: '500px',
	html 	: 'true',
	nbtext	: '下一步',
	place 	: 'bottom',
	title 	: '网站使用引导',
	content : 'content'
};
util.bootstrap.bstroinit = function(selector, options, step){
	if(selector){
		var $element = $(selector);
		if($element.length > 0){
			var opt = $.extend({}, util.bootstrap.bstrooptions, options);
			if(typeof options == 'string'){
				opt.content = options;
			}else{
				$.extend(opt, options);
			}
			
			$element.each(function(){
				$(this).attr({
					'data-bootstro-width'			: opt.width, 
					'data-bootstro-title' 			: opt.title, 
					'data-bootstro-html'			: opt.html,
					'data-bootstro-content'			: opt.content, 
					'data-bootstro-placement'		: opt.place,
					'data-bootstro-nextButtonText'	: opt.nbtext,
					'data-bootstro-step'			: step
				}).addClass('bootstro');
			});
		}
	}
};
util.bootstrap.bstroopts = {
	prevButtonText : '上一步',
	finishButton : '<button class="btn btn-lg btn-success bootstro-finish-btn"><i class="icon-ok"></i>完成</button>',
	stopOnBackdropClick : false,
	stopOnEsc : false
};
util.bootstrap.bstro = function(bss, options){
	if(bss && bss.length > 0){
		for(var i=0; i<bss.length; i++){
			util.bootstrap.bstroinit(bss[i][0], bss[i][1], i);
		}
		
		var opt = $.extend({}, util.bootstrap.bstroopts);
		if(options){
			if(options.hasOwnProperty('pbtn')){
				opt.prevButtonText = options.pbtn;
			}
			if(options.hasOwnProperty('obtn')){
				if(options.obtn == ''){
					opt.finishButton = '';
				}else{
					opt.finishButton = '<button class="btn btn-mini btn-success bootstro-finish-btn"><i class="icon-ok"></i>'+options.obtn+'</button>';
				}
			}
			if(options.hasOwnProperty('stop')){
				opt.stopOnBackdropClick = options.stop;
				opt.stopOnEsc = options.stop;
			}
			if(options.hasOwnProperty('exit')){
				opt.onExit = options.exit;
			}
		}
		
		bootstro.start('.bootstro', opt);
	}
};
util.bootstrap.search = function(selector, options){
	if(!selector || !options || !options.url || !options.make || !options.back) return;
	
	var $this = $(selector);
	var zIndex = options.zIndex || 900;
	var bgColor = options.bgColor || '#fff';
	
	var $table = $('<table class="table table-bordered table-hover" style="position:absolute;display:none;margin-top:10px;width:95%;z-index:' + zIndex + ';background-color:' + bgColor + ';"></table>');
	$this.after($table);
	
	var tid,xhr;
	util.on(selector, 'keyup', function(){
		if(tid) clearTimeout(tid);
		if(xhr) xhr.abort();
		tid = setTimeout(function(){
			var code = $this.val();
			if(code){
				xhr = $.ajax({
					url: base + options.url + '?code=' + code,
					type:'get',
					dataType:'json'
				}).done(function(json){
					if(json && json.type == 'success'){
						var codes = json.object;
						if(codes && codes.length > 0){
							$table.empty();
							$.each(codes, function(i, item){
								if(item) $table.append('<tr class="qsearchtr" style="cursor:pointer;" data-id="' + item.id + '"><td>' + options.make(item) + '</td></tr>');
							});
						}
					}
					
					$table.show();
				});
			}
		}, 500);
	});
	
	util.on('tr.qsearchtr', 'click', function(){
		options.back($(this).data('id'));
		
		$this.val($(this).find('td').text());
		$table.hide();
	});
};

/**
 * util.crud
 */
util.crud = {};
util.crud.url = '';
util.crud.init = function(){
	// menu click
	util.on('.menus', 'click', function(){
		var url = $(this).qdata().url;
		if(url){
			util.crud.url = url;
			util.crud.reset();
		}
	});
	util.crud.bindcrud();
	util.crud.bindpage();
};
util.crud.bindcrud = function(){
	util.on('.allcheck','change', function(){$('.onecheck').prop('checked',$(this).prop('checked'));});
	util.on('.addBtn', 'click', function(){util.crud.savep('添加')});
	util.on('.editbtn','click', function(){util.crud.savep('修改',$(this).parents('tr').qdata().id)});
	util.on('.queBtn', 'click', function(){util.crud.search('查询')});
	util.on('.relBtn', 'click', function(){util.crud.reset();});
	util.on('.delBtn', 'click', function(){util.crud.del();});
	util.on('.delbtn', 'click', function(){util.crud.del($(this).parents('tr').qdata().id);});
};
util.crud.listopt = {pageNumber:1,pageSize:10};
util.crud.list = function(data){
	var opt = {url : util.crud.url + '/index'};
	if(data) $.extend(util.crud.listopt, data);
	opt.data = util.crud.listopt;
	opt.dataType = 'html';
	
	util.ajax(opt, function(html){$('#cruddiv').empty().append(html);});
};
util.crud.reset = function(){
	util.crud.listopt = {pageNumber:1,pageSize:10};
	util.crud.list();
};
util.crud.search = function(title){
	util.bootstrap.dialog({title:title,url:util.crud.url + '/search'}, function(){
		util.crud.list($('#bsmodal').find('form').qser());
		return true;
	});
};
util.crud.savep = function(title, id){
	var url = id ? (util.crud.url + '/savep?id=' + id) : (util.crud.url + '/savep');
	util.bootstrap.dialog({title:title,url:url}, function(){
		return util.crud.save();
	});
};
util.crud.save = function(){
	var res;
	util.ajax({
		async: false,
		url:util.crud.url+'/save',
		data:$('#bsmodal').find('form').qser()
	}, function(json){
		res = json;
	});
	
	util.bootstrap.msg(res);
	if(res && res.type == 'success'){
		util.crud.list();
		return true;
	}else{
		return false;
	}
};
util.crud.del = function(id){
	var ids = [];
	
	if(id){
		ids.push(id);
	}else{
		$('.onecheck:checked').each(function(){ids.push($(this).parents('tr').qdata().id);});
	}
	
	if(!ids.length){
		util.bootstrap.alert('请选择要删除的记录！');
	}else{
		util.bootstrap.confirm('确认要删除所选记录吗（若有子记录也会同时删除）？',function(){
			util.ajax({
				url:util.crud.url+'/del',
				data:{ids:ids.join(',')}
			}, function(res){
				util.bootstrap.msg(res);
				util.crud.list();
			});
		});
	}
};
util.crud.bindpage = function(){
	util.on('.crudfirst', 'click', function(){
		if(!$(this).parent().hasClass('disabled')){
			util.crud.reset();
		}
	});
	util.on('.crudprev', 'click', function(){
		if(!$(this).parent().hasClass('disabled')){
			util.crud.list({pageNumber:util.crud.listopt.pageNumber - 1});
		}
	});
	util.on('.crudnext', 'click', function(){
		if(!$(this).parent().hasClass('disabled')){
			util.crud.list({pageNumber:util.crud.listopt.pageNumber + 1});
		}
	});
	util.on('.crudlast', 'click', function(){
		if(!$(this).parent().hasClass('disabled')){
			util.crud.list({pageNumber:$(this).qdata().page});
		}
	});
	util.on('.cruda', 'click', function(){
		if(!$(this).parent().hasClass('disabled')){
			util.crud.list({pageNumber:parseInt($(this).text())});
		}
	});
	util.on('.pagesize', 'change', function(){
		var value = $(this).val();
		if(value){
			util.crud.listopt.pageSize = value;
		}
		
		util.crud.list({pageSize:value});
	});
};