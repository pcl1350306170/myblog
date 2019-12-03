<?php
	header('Access-Control-Allow-Origin:*');
	header('Access-Control-Allow-Methods:POST');
	header('Access-Control-Allow-Headers:x-requested-with,content-type');
	require_once('DBDA.php');

	session_start();
	session_write_close();

	$db=new DBDA();

	$act 		= $_POST['act'];
	$pagesize 	= $_POST['pagesize'];
	$page 		= $_POST['page'];
	$limit		= $_POST['limit'];

	//获取查询字段-------开始
	$search_gjz	= $_POST['search_gjz'];
	$search_type	= $_POST['search_type'];
	$search_title	= $_POST['search_bt'];
	$search_nr	= $_POST['search_nr'];

	$table = "zhishidian";
	$dba='test';

	$condition = "1=1";

	//权限控制===============END

	//组织查询条件====开始
	if($search_gjz != ""){
		$condition .= " AND gjc LIKE '%".$search_gjz."%'";
	}
	if($search_type != ""){
		$condition .= " AND type LIKE '%".$search_type."%'";
	}
	if($search_title != ""){
		$condition .= " AND title LIKE '%".$search_title."%'";
	}
	if($search_nr != ""){
		$condition .= " AND nr LIKE '%".$search_nr."%'";
	}

	//组织查询条件====结束


	switch ($act) {
		case "gcount":
			$sql = "select count(1) from $table where $condition";
			$lei=$db->Query($sql);
			echo $lei[0];
			break;
		case "glist":
			$page 		= $_POST['page'];
			$sql = "select id,title,gjc,tjsj,images from $table where $condition order by id desc limit ".(($page-1)*$limit).",".$limit;
			$lei=$db->JsonQuery($sql,1,$dba);
			echo $lei;
			break;
		case  'remove' :
			$rsDataId = $_POST['ids'];

			$SQL = "delete from $table where id='".$rsDataId."'";


			$lei=$db->Query($SQL,2);
			echo $lei;

		break;
		case 'add':
			//处理传过来的值
			$field_title	= $_POST["field_title"];				// 标题
			$field_content	= $_POST['field_content'];				// 内容
			$field_gjc = $_POST['field_gjc'];// 接收单位名称


			$id = date('YmdHis').randomKeys(6);
			$TJSJ = date("Y-m-d H:i:s");


			$SQL = "insert into $table(".
				"id, title, nr,gjc,tjsj) values (".
				"'".$id."', ".
				"'".$field_title."', ".
				"'".addslashes($field_content)."', ".
				"'".$field_gjc."', ".
				"'".$TJSJ."')";
			$lei=$db->Query($SQL,2);
			echo $lei[0];
			break;
		case 'modify':
			//处理传过来的值
			$field_id = $_POST["field_id"];							// ID
			$field_title	= $_POST["field_title"];				// 标题
			$field_content	= $_POST['field_content'];				// 内容
			$field_gjc = $_POST['field_gjc'];// 接收单位名称

			$SQL = "update $table set".
				" title='$field_title',".
				"nr='".addslashes($field_content)."',".
				"gjc='$field_gjc' ".
				"where id='$field_id'";

			$lei=$db->Query($SQL,2);
			echo $lei;
			break;
		case "showdetail":
		  $zsdid = $_POST["zsdid"];
		  $sql = "select id,title,gjc,tjsj,nr from $table where  id = '".$zsdid."'";
		  $lei=$db->JsonQuery($sql,1,$dba);
		  echo $lei;
		break;
	}

?>
