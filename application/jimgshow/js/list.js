var getListData = {
    requestPHP: requestHttp + 'requestData_himgs.php',
    page: 1,
    total: 0,
    limit: 100,
    search_gjz: '',
    search_type: '',
    listDemo: "#mainContainerList",
    listData: null,
    list_getcount () {
        let _this = this
        $.ajax({
            url: _this.requestPHP, // 这是当前服务器的地址
            type: 'POST',
            data: {act: 'gcount'},
            dataType: 'text',
            success: function (data) {
                _this.total = data;
                layui.use(['laypage', 'layer'], function () {
                    var laypage = layui.laypage;

                    laypage.render({
                        elem: 'pagesdemo'
                        , count: Math.ceil(_this.total / _this.limit)*10
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
                _this.listData = r

                let h = '';
                for (let i = 0; i < r.length; i++) {

                    let s = r[i]['srcs'].split("\n")
                    let isdownload =r[i]['isdownload']
                    let isd = ''
                    if(isdownload === '1'){
                        isd = 'display:none;'
                    }
                    console.log(s)
                    h += '<div class="card">\n' +
                    '            <div class="img" onclick="getListData.showimgs(\''+i+'\')">\n' +
                    '                <img src="'+s[0]+'" alt="">\n' +
                    '            </div>\n' +
                    '            <div class="name">\n' +
                    '                '+r[i]['title']+'\n' +
                        '               <button type="button" class="layui-btn layui-btn-danger layui-btn-radius" onclick="getListData.del(\''+r[i]['id']+'\',this)">删除</button>' +
                        '<button type="button" style="'+isd+'" class="layui-btn layui-btn-default layui-btn-radius" onclick="getListData.hasdown(\''+r[i]['id']+'\',this)">已下载</button>' +
                    '            </div>\n' +
                    '        </div>'
                }

                $(_this.listDemo).html(h);
            }
        });
    },
    showimgs(i){
        let _this = this
        let srcs =_this.listData[i]["srcs"]

        $("#copytextarea").val(srcs)
        let copyText = $("#copytextarea");//获取对象
        copyText.select();//选择
        document.execCommand("Copy");//执行复制

    },
    del(id,obj){
        const _this = this
        $.ajax({
            url: _this.requestPHP, // 这是当前服务器的地址
            type: 'POST',
            data: {act: 'del',id:id},
            dataType: 'text',
            success: function (data) {
                $(obj).parent().parent().remove()
            }

        });
    },
    hasdown(id,obj){
        const _this = this
        $.ajax({
            url: _this.requestPHP, // 这是当前服务器的地址
            type: 'POST',
            data: {act: 'hasdown',id:id},
            dataType: 'text',
            success: function (data) {
                $(obj).hide()
            }

        });
    }
}

