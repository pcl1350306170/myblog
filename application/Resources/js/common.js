var CommonFun = {
    // 编辑文件名
    fileEdit(data) {
        data.act = 'editFileName'
        $.ajax({
            url: ajaxFileDealPhp,
            type: "POST",
            dataType: "TEXT",
            data: data,
            success: function (data) {
                console.log(data)
                layer.alert(data, {icon: 1});
            }
        });
    },
    // 根据一个网页地址爬取网页信息
    onlinePaQu (data){
        data.act = 'phppaqu'
        $.ajax({
            url: ajaxFileDealPhp,
            type: "POST",
            dataType: "TEXT",
            data: data,
            success: function (data) {
                console.log(data)
                layer.alert(data, {icon: 1});
            }
        });
    },
    //在表story中，根据小说名，生成txt文件
    hstoryCreateTxt(data){
        data.act = 'hstoryCreateTxt'
        $.ajax({
            url: ajaxFileDealPhp,
            type: "POST",
            dataType: "TEXT",
            data: data,
            success: function (data) {
                console.log('写入文件状态：'+data)
                // layer.alert(data, {icon: 1});
            }
        });
    },
    // 获取这个小说中已经写入txt的记录，用了判断是否生成txt完成
    hstoryCreateTxtnum(data,callback){
        data.act = 'hstoryCreateTxtnum'
        $.ajax({
            url: ajaxFileDealPhp,
            type: "POST",
            dataType: "TEXT",
            data: data,
            success: function (data) {

                let r = eval('(' + data + ')')
                let num = r[0]['num']
                console.log('当前尚未写入txt数量：'+num)
                if(Number(num) === 0){
                    callback()
                }
                // layer.alert(data, {icon: 1});
            }
        });
    },
    //在表story中，根据小说名，删除数据
    hstoryDelete(data){
        data.act = 'hstoryDelete'
        $.ajax({
            url: ajaxFileDealPhp,
            type: "POST",
            dataType: "TEXT",
            data: data,
            success: function (data) {
                layer.alert(data, {icon: 1});
            }
        });
    },
    //在表story中，根据小说名，获取小说内容
    hstorygetNr(data){
        data.act = 'hstorygetNr'
        $.ajax({
            url: ajaxFileDealPhp,
            type: "POST",
            dataType: "TEXT",
            data: data,
            success: function (data) {
                console.log('获取在线内容：'+data)
                // layer.alert(data, {icon: 1});
            }
        });
    },
    // 获取这个小说中为空的记录，用了判断是否爬取完成
    hstorygetNrNull(data,callback){
        data.act = 'hstorygetNrNull'
        $.ajax({
            url: ajaxFileDealPhp,
            type: "POST",
            dataType: "TEXT",
            data: data,
            success: function (data) {

                let r = eval('(' + data + ')')
                let num = r[0]['num']
                console.log('当前尚未获取到内容数量：'+num)
                if(Number(num) === 0){
                    callback()
                }
                // layer.alert(data, {icon: 1});
            }
        });
    },
    // uniapp测试数据：获取新闻
    UNNIAPP_getOnlineNr(data,callback){
        $.ajax({
            url: 'https://unidemo.dcloud.net.cn/api/news',
            type: "GET",
            dataType: "JSON",
            data: data,
            success: function (data) {
                callback(data);
            }
        });
    },
    // uniapp测试数据：保存新闻
    UNNIAPP_createNews (data){
        data.act = 'UNNIAPP_createNews'
        $.ajax({
            url: ajaxFileDealPhp,
            type: "POST",
            dataType: "TEXT",
            data: data,
            success: function (data) {


            }
        });
    }
}