var getListData = {
	requestPHP: requestHttp + 'requestData_zsd.php',
	page: 1,
	total: 0,
	limit: 10,
	search_gjz: '',
	search_type: '杂七杂八',
	listDemo: "#mainContainerList",
	list_getMoviecount(){
		let _this = this
		_this.requestPHP = requestHttp + 'requestData_movie.php'
		$.ajax({
			url: _this.requestPHP, // 这是当前服务器的地址
			type: 'POST',
			data: {act: 'gcount', search_gjz: _this.search_gjz},
			dataType: 'text',
			success: function (data) {
				_this.total = data;
				layui.use(['laypage', 'layer'], function () {
					var laypage = layui.laypage;

					laypage.render({
						elem: 'pagesdemo'
						, count: _this.total
						, first: '首页'
						, last: '尾页'
						, prev: '<em>←</em>'
						, next: '<em>→</em>',
						jump: function (obj, first) {
							//obj包含了当前分页的所有参数，比如：
							console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
							console.log(obj.limit); //得到每页显示的条数
							_this.page = obj.curr

							_this.list_getMoviedata()
							//首次不执行
							if (!first) {
								//list_getdata()
							}
						}
					});
				})

			}

		});
	},
	list_getcount () {
		let _this = this
		$.ajax({
			url: _this.requestPHP, // 这是当前服务器的地址
			type: 'POST',
			data: {act: 'gcount', search_gjz: _this.search_gjz, search_type: _this.search_type},
			dataType: 'text',
			success: function (data) {
				_this.total = data;
				layui.use(['laypage', 'layer'], function () {
					var laypage = layui.laypage;

					laypage.render({
						elem: 'pagesdemo'
						, count: _this.total
						, first: '首页'
						, last: '尾页'
						, prev: '<em>←</em>'
						, next: '<em>→</em>',
						jump: function (obj, first) {
							//obj包含了当前分页的所有参数，比如：
							console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
							console.log(obj.limit); //得到每页显示的条数
							_this.page = obj.curr

							_this.list_getdata()
							//首次不执行
							if (!first) {
								//list_getdata()
							}
						}
					});
				})

			}

		});
	},
	list_getMoviedata () {
		let _this = this
		$.ajax({
			async: false,
			url: _this.requestPHP, // 这是当前服务器的地址
			type: 'POST',
			data: {
				act: 'glist',
				page: _this.page,
				search_gjz: _this.search_gjz,
				limit: _this.limit,
			},
			dataType: 'text',
			success: function (data) {
				let r = eval('(' + data + ')')

				let h = '';
				for (let i = 0; i < r.length; i++) {
					h += '<li class="clearfix article_list">\n' +
						'        <a  onclick="showImg(this)" class="article_list_img">\n' +
						'            <img src="' + r[i].image + '" onerror="this.src=\'./img/20191130171408.png\'">\n' +
						'        </a>\n' +
						'        <h3>' + r[i].name + '</h3>\n' +
						'        <p>' + r[i]['path'] + '</p>\n' +
						'        <div class="article_list_link">\n' +
						'                            <span class="article_list_count">\n' +
						'                                <i class="see_count"></i>\n' +
						'                                ' + r[i]['tjsj'] +
						'                            </span>\n' +
						'        </div>\n' +
						'    </li>'
				}

				$(_this.listDemo).html(h);
			}
		});
	},
	list_getdata () {
		let _this = this
		$.ajax({
			async: false,
			url: _this.requestPHP, // 这是当前服务器的地址
			type: 'POST',
			data: {
				act: 'glist',
				page: _this.page,
				search_gjz: _this.search_gjz,
				search_type: _this.search_type,
				limit: _this.limit,
			},
			dataType: 'text',
			success: function (data) {
				let r = eval('(' + data + ')')

				let h = '';
				for (let i = 0; i < r.length; i++) {
					let tagh = ''
					let g = r[i].gjc.split(',')
					for (let ii = 0; ii < g.length; ii++) {
						tagh += '<span class="layui-badge layui-bg-blue" style="margin: 10px">' + g[ii] + '</span>'
					}
					h += '<li class="clearfix article_list">\n' +
						'        <a onclick="showImg(this)" class="article_list_img">\n' +
						'            <img src="' + r[i].images + '" onerror="this.src=\'./img/kongzhishi.png\'">\n' +
						'        </a>' +
						'        <h3 onclick="showDetail(\'' + r[i]['id'] + '\')">' + r[i].title + '</h3>\n' +
						'        <p>' + tagh + '</p>\n' +
						'        <div class="article_list_link">\n' +
						'                            <span class="article_list_count">\n' +
						'                                <i class="see_count"></i>\n' +
						'                                ' + r[i]['tjsj'] +
						'                            </span>\n' +
						'            <a  onclick="showDetail(\'' + r[i]['id'] + '\')">查看详细+</a>\n' +
						'        </div>\n' +
						'    </li>'
				}

				$(_this.listDemo).html(h);
			}
		});
	},
	searchMovieList () {
		let _this = this
		_this.search_gjz = $(".search_text").val()
		_this.list_getMoviecount()
	},
	searchList () {
		let _this = this
		_this.search_gjz = $(".search_text").val()
		_this.list_getcount();
	},
}

function showDetail(id){
	window.open('detail.html?id='+id)
}
function showImg(obj){
	let src = $(obj).find('img').attr('src')
	let n = '<img src="'+src+'" style="max-width: 1500px">'
	//页面层-图片

	layer.open({
		type: 1,
		title: false,
		closeBtn: 0,
		area: ['auto'],
		skin: 'layui-layer-nobg', //没有背景色
		shadeClose: true,
		content: n
	});
}
