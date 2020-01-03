$(()=>{




    var URL = window.location.href;
    let title = $('.infot:first-child').text()
    title = title.replace(/[\r\n]/g,"").replace(/\ +/g,"")

    let h = '<div style="width: 200px;height: 200px;position: fixed;left: 10px;top:100px;background: #ff00ff;text-align: center;font-size: 30px;color:#000;line-height: 200px;" id="ID_mineClick">点击</div>'

    $('body').append(h)
    if($('.liebiao ul li').length > 0){
        $("#ID_mineClick").click(function () {
            let tArray = []
            $('.liebiao ul li').each(function () {

                let _this = this

                let hre = $(_this).find('a').attr('href');
                let t = $(_this).find('a').text();
                if(!hre)return
                // console.log(t,'=====',hre)
                let O = {
                    title: title,
                    mulu: t,
                    hre: 'http://www.55555xs.net'+hre
                }
                tArray.push(O)
            })

            $.ajax({
                type: "POST",
                url: "http://localhost:8888/mywww/php/requestOnline.php",
                data: {
                    act: 'save555story',
                    tArray: JSON.stringify(tArray)
                },
                success: function (data) {
                    if(data === 1){
                        console.log('成功')
                    }
                    //window.close();
                },
                error: function (data) {

                }
            });
        })
    }else{
        let filename = $(".border_l_r").find("h1").text()
        let titles = $(".border_l_r").find("h2").text()
        let title1 = URL.replace(/.html/g,"").replace('http://www.55555xs.net/','').replace('/','')
        let nr = []
        $("#content").parent().find('p').each(function () {
            let n = $(this).text()
            nr.push(h)
        })

        console.log(filename,'----'+titles,'title1:'+title1,'内容：'+nr.join('\r\n'))
    }


















})