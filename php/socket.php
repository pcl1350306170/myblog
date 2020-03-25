<?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:x-requested-with,content-type');
require_once('DBDA.php');

session_start();
session_write_close();

$db=new DBDA();
$id = date('YmdHis').randomKeys(6);
echo $id;