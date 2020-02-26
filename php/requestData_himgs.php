<?php
	header('Access-Control-Allow-Origin:*');
	header('Access-Control-Allow-Methods:POST');
	header('Access-Control-Allow-Headers:x-requested-with,content-type');
	require_once('DBDA.php');

	session_start();
	session_write_close();

	$db=new DBDA();

	$pagesize 	= $_POST['pagesize'];
	$page 		= $_POST['page'];
	$limit		= $_POST['limit'];

	$table = "himgs";
	$dba='test';
	//获取查询字段-------开始
	$search_gjz	= $_POST['search_gjz'];
	$condition = "1=1";
	//组织查询条件====开始
	if($search_gjz != ""){
		$condition .= " AND (type LIKE '%".$search_gjz."%' or name LIKE '%".$search_gjz."%') ";
	}

	$act 		= $_POST['act'];

	switch ($act) {
		case "gcount":
			$sql = "select count(1) from $table where $condition";
			$lei=$db->Query($sql);
			echo $lei[0];
			break;
		case "glist":
			$page 		= $_POST['page'];
			$sql = "select id,title,srcs,tjsj,fenlei from $table where $condition order by id desc limit ".(($page-1)*$limit).",".$limit;
			$lei=$db->JsonQuery($sql,1,$dba);
			echo $lei;
			break;
			default:
				
				break;

	}






