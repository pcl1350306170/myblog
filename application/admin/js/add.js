/**
 *  添加的js页面
 */
var ajaxUrl = requestHttp + 'requestData_zsd.php',
	systemName = '',
	menuId = '';
var gjcArray = [];
$(function () {
	$(document).keydown(function(e){
		e = e || window.event;
		var keyCode = e.keyCode || e.which || e.charCode;
		if(keyCode==13){
			createGJC();
		};
	});
})
function createGJC(){
	let v= $("#field_gjc").val();
	if(v === '' || !v)return
	gjcArray.push(v)
	let h = '<span class="layui-badge layui-bg-blue" onclick="removeGjc(this)">'+v+'</span>'
	$(".div-gjc").append(h)
	$("#field_gjc").val('');
}
function removeGjc(obj){
	let g = $(obj).text()
	let i = gjcArray.findIndex((v,i)=>{
		return v === g
	})
	gjcArray.splice(i,1)
	$(obj).remove()
	console.log(gjcArray)
}

function saveEvent(obj) {
	var field_title = $("#field_title").val(),			// 标题
		field_content = ue.getContent(),				// 内容
		field_gjc = gjcArray.join(",");//接收单位名称

	var imgReg = /<img.*?(?:>|\/>)/gi;
	var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
	var arr = field_content.match(imgReg);
	let imgs = []
	let field_images = ''
	let field_imgname = ''
	console.log(arr);
	if(arr !== null){
		for (var i = 0; i < arr.length; i++) {
			var src = arr[i].match(srcReg);
			//获取图片地址
			if(src[1]){
				imgs.push(src[1])
			}
		}
		field_images = imgs[0]
		field_imgname = imgs[0].replace('http://localhost:8888/mywww/zsdimage/','')
	}

	console.log(imgs);

	if (field_title == "") {
		alert("请填写标题!");
		return false;
	}


	var psotom = {
		act: 'add',
		field_title: field_title,	// 标题
		field_content: field_content, // 内容
		field_gjc: field_gjc,
		field_type: $("#field_type").val(),
		field_images: field_images,
		field_imgname: field_imgname,
	};

	$.ajax({
		url: ajaxUrl,
		type: "POST",
		dataType: "TEXT",
		data: psotom,
		success: function (data) {
			if (data == '') {
				layer.alert('添加成功', {icon: 1}, function (index) {
					location = location;
					//operation("list");
				});
			} else {
				layer.alert('添加失败', {icon: 2});
			}
		}
	});
}
