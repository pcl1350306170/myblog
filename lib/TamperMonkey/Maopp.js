/**
 * 猫咪视频操作
 * 网址：http://22maopp.com/
 *
 *
 * */

$(function () {
    var URL = window.location.href;

    let btn = "<span style='display: inline-block;position: fixed;left: 20px;top:20px;width: 150px;height: 60px;background-color: #fff700;font-size: 19px;padding: 15px;text-align: center;font-weight: bold;cursor: pointer;margin: 20px;' id='ID_imgListbtn'>展开图片列表</span>" +
        "";

    $("body").append(btn);
    let isclick = 0;
    // 图片列表展开:
    $("#ID_imgListbtn").click(function () {
        isclick = 1;
        $(".list ul li").each(function () {
            let a = $(this).find("a").attr('href');

            if(a.indexOf('arthtml')<0)return;
            window.open(a);
        })
        setTimeout(function () {
            $(".pagination a").each(function () {
                let t = $(this).text()
                if(t=='下一页'){
                    let a2= $(this).attr('href');
                    window.open(a2);
                }
            })
            window.close();
        },1000)
    })

    setInterval(function () {
        if(isclick == 0)$("#ID_imgListbtn").click()
    },4*1000)

    // /arttypehtml/16.html  ==== gif图片
    if(URL.indexOf("/arttypehtml/16")>0){

    }
    let title = document.getElementsByTagName("title")[0].innerText;

    // 遍历当前页面的所有图片

    setTimeout(function () {
        window.close();
    },1000*300)

    var imgsrcs = [];
    $(".content img").each(function () {
        let imgsrc = $(this).attr('data-original');
        console.log(imgsrc);
        if(imgsrc && imgsrc !== ''){
            imgsrcs.push(imgsrc);

        }
    })
    if(imgsrcs.length == 0)return
    $.ajax({
        type: "POST",
        url: "http://localhost:8888/mywww/php/requestOnline.php",
        data: {
            act: 'MAOMIsaveimg',
            imgsrc: imgsrcs.join("\n"),
            title:title
        },
        success: function (data) {
            if(URL.indexOf("/arttypehtml/16-")>0){
                return
            }
            window.close();
        },
        error: function (data) {

        }
    });
})

