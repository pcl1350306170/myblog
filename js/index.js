$(function () {
	//最新博文
	indexGetbowen()
	//杂七杂八的知识点
	indexGetzaba()
	//学习笔记
	indexGetbiji()
	//电影
	indexGetMovie()
});
function indexGetbowen(){
	getListData.limit = 3
	getListData.search_type = '博文'

	getListData.listDemo = '#ID_bowen'
	getListData.list_getdata();
}
//杂七杂八的知识点
function indexGetzaba() {
	getListData.limit = 4
	getListData.search_type = '杂七杂八'

	getListData.listDemo = '#ID_zaqizaba'
	getListData.list_getdata();
}
function indexGetbiji() {
	getListData.limit = 3
	getListData.search_type = '笔记'

	getListData.listDemo = '#ID_biji'
	getListData.list_getdata();
}
function indexGetMovie(){
	getListData.limit = 2
	getListData.requestPHP = requestHttp + 'requestData_movie.php'

	getListData.listDemo = '#ID_movie'
	getListData.list_getMoviedata();
}
