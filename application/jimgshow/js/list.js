var getListData = {
    requestPHP: requestHttp + 'requestData_himgs.php',
    page: 1,
    total: 0,
    limit: 100,
    search_gjz: '',
    search_type: '',
    listDemo: "#mainContainerList",
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

                    let s = r[i]['srcs'].split("\n")
                    console.log(s)
                    h += '<div class="card">\n' +
                    '            <div class="img">\n' +
                    '                <img src="'+s[0]+'" alt="">\n' +
                    '            </div>\n' +
                    '            <div class="name">\n' +
                    '                '+r[i]['title']+'\n' +
                    '            </div>\n' +
                    '        </div>'
                }

                $(_this.listDemo).html(h);
            }
        });
    }
}

