// 變量存放js
// 后台地址
var URL = window.location.href;
let R = '';
if(URL.indexOf('pangchunlei')>-1){
    R= 'http://pangchunlei.xyz/blog/php/'
}else if(URL.indexOf('abeiyun')>-1){
    R= 'http://ftp6263399.host108.abeiyun.cn/blog/php/'
}else{
    R = 'http://localhost:8888/mine/a-mine/myblog/php/'
}
const requestHttp = R

const ajaxSavemysqlPhp = 'http://localhost:8888/mywww/php/savemysql.php'
const ajaxFileDealPhp = 'http://localhost:8888/mywww/php/requestOnline.php'

