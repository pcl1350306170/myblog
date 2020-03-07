<?php
	header("Content-Type: text/html; charset=GB2312");
	header('Access-Control-Allow-Origin:*');
	header('Access-Control-Allow-Methods:POST');
	header('Access-Control-Allow-Headers:x-requested-with,content-type');
	require_once('../../php/DBDA.php');
	$db=new DBDA();

	session_start();
	session_write_close();

	$table = "movie";
	$dba='test';



	$act 		= $_POST['act'];

	switch ($act) {
			case "savemovie":
			    $path 		= $_REQUEST['path'];
				$name 		= $_REQUEST['name'];
				$type 		= $_REQUEST['type'];
				$imagePath 		= $_REQUEST['imagePath'];

				$id = date('YmdHis').randomKeys(6);

				$TJSJ = date("Y-m-d H:i:s");
				$lei=$db->getImage($imagePath,'E:\www\mywww\movie\images');
				$saveImagePath = 'http://localhost:8888/mywww/movie/images/'.$lei['file_name'];
		

				$SQL = "insert into $table(".
					"id, name, path,image,imageonline,imgname,type, tjsj) values (".
					"'".$id."', ".
					"'".$name."', ".
					"'".$path."', ".
					"'".$saveImagePath."', ".
					"'".$imagePath."', ".
					"'".$lei['file_name']."', ".
					"'".$type."', ".
					"'".$TJSJ."')";

				$lei=$db->Query($SQL,2);
				
				echo 'ok';
			break;
			default:
				
				break;

	}






