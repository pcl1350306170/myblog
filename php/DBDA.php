<?php
class DBDA
{
	public $host = "localhost";//服务器地址
	public $uid = "root";//用户名
	public $pwd = "";//密码


	public $conn;//连接对象
	//操作数据库方法
	//$sql代表需要执行的sql语句
	//$type代表sql语句的类型，1代表查询，0代表曾删改
	//$db代表要操作的数据库名称
	//如果是查询，返回二维数组
	//如果是其他语句，返回true或false
	function __construct($db="test"){
		//造连接对象

		$this->conn = new MySQLi($this->host,$this->uid,$this->pwd,$db);
		}
	public function Query($sql,$type=1){
		//判断是否出错
		!mysqli_connect_error() or die("连接失败");
		//执行sql语句
		$result = $this->conn->Query($sql);
		//判断sql语句类型
		if($type==1)
		{
			//如果是查询语句，返回结果集的二维数组
			return $result->fetch_row();
		}
		else
		{
			//如果是其他语句，返回true或false
			return $result;
		}
		}
	//Ajax调用返回JSON
	public function JsonQuery($sql,$type=1,$db="mydb")
	{
		//自定义数据源
		$dsn = "mysql:dbname={$db};host={$this->host}";
		//造pdo对象
		$pdo = new PDO($dsn,"{$this->uid}","{$this->pwd}");
		//准备执行sql语句
		$st = $pdo->prepare($sql);
		//执行预处理sql语句
		if($st->execute())
		{
			if($type==1)
			{
					$attr = $st->fetchAll(PDO::FETCH_ASSOC);
					return json_encode($attr);
			}
			else
			{
				if($st)
				{
					return "OK";
				}
				else
				{
					return "NO";
				}
			}
		}
		else
		{
			echo "执行失败！";
		}
	}
	//Ajax调用返回字符串
	public function StrQuery($sql,$type=1)
	{
		//判断连接是否成功
		!mysqli_connect_error() or die("连接失败！");
		//执行sql语句
		$result = $this->conn->query($sql);
		//判断sql语句类型
		if($type==1)
		{
			$attr = array();
			while($atr = $result->fetch_row()){
				$attr[] = $atr;
			}

			$str = "";
			//如果是查询语句返回字符串
			for($i=0;$i<count($attr);$i++)
			{
				for($j=0;$j<count($attr[$i]);$j++)
				{
					$str = $str.$attr[$i][$j];
					$str = $str."\2";
				}
				$str = substr($str,0,strlen($str)-1);
				$str = $str."\1";
			}
			$str = substr($str,0,strlen($str)-1);
			return $str;
		}
		else
		{
			//如果是其他语句，返回true或false
			if($result)
			{
				return "OK";
			}
			else
			{
				return "NO";
			}
		}
	}

	function PdoQuery($sql,$type=1,$db="aaas")
	{
		//造数据源
		$dns = "mysql:host={$this->host};dbname={$db}";
		//造pdo对象
		$pdo = new PDO($dns,$this->uid,$this->pwd);
		//准备一条sql语句
		$stm = $pdo->prepare($sql);
		//执行预处理语句
		$r = $stm->execute();
		if($r)
		{
			if($type==1)
			{
				return $stm->fetchAll();
			}
			else
			{
				return "OK";
			}
		}
		else
		{
			return "NO";
		}
	}


/* 
*功能：php完美实现下载远程图片保存到本地 
*参数：文件url,保存文件目录,保存文件名称，使用的下载方式 
*当保存文件名称为空时则使用远程文件原来的名称 
*/ 
function getImage($url,$save_dir='',$filename='',$type=0)
	{
		 if(trim($url)==''){ 
			return array('file_name'=>'','save_path'=>'','error'=>1); 
		} 
		if(trim($save_dir)==''){ 
			$save_dir='./'; 
		} 
		if(trim($filename)==''){//保存文件名 
			$ext=strrchr($url,'.'); 
			if($ext!='.gif'&&$ext!='.jpg'){ 
				return array('file_name'=>'','save_path'=>'','error'=>3); 
			} 
			$filename=time().$ext; 
		} 
		if(0!==strrpos($save_dir,'/')){ 
			$save_dir.='/'; 
		} 
		//创建保存目录 
		if(!file_exists($save_dir)&&!mkdir($save_dir,0777,true)){ 
			return array('file_name'=>'','save_path'=>'','error'=>5); 
		} 
		//获取远程文件所采用的方法  
		if($type){ 
			$ch=curl_init(); 
			$timeout=5; 
			curl_setopt($ch,CURLOPT_URL,$url); 
			curl_setopt($ch,CURLOPT_RETURNTRANSFER,1); 
			curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,$timeout); 
			$img=curl_exec($ch); 
			curl_close($ch); 
		}else{ 
			ob_start();  
			readfile($url); 
			$img=ob_get_contents();  
			ob_end_clean();  
		} 
		//$size=strlen($img); 
		//文件大小  
		$fp2=@fopen($save_dir.$filename,'a'); 
		fwrite($fp2,$img); 
		fclose($fp2); 
		unset($img,$url); 
		return array('file_name'=>$filename,'save_path'=>$save_dir.$filename,'error'=>0); 
	}




}


/**
 * 获取随机数
 * @param {Number} $length 随机数的长度
 */
function randomKeys($length) {
	$pattern = '1234567890ABCDEFGHIJKLOMNOPQRSTUVWXYZ';
	for($i = 0; $i < $length;$i++)
	{
		$key .= $pattern{mt_rand(0, 35)};
	}
	return $key;
}

// 获取文件相关
function printFile($filepath)
{
	//substr(string,start,length)函数返回字符串的一部分；start规定在字符串的何处开始 ；length规定要返回的字符串长度。默认是直到字符串的结尾。
	//strripos(string,find,start)查找 "php" 在字符串中最后一次出现的位置； find为规定要查找的字符；start可选。规定开始搜索的位置

	//读取文件后缀名
	//$filetype = substr ( $filename, strripos ( $filename, "." ) + 1 );
	//判断是不是以txt结尾并且是文件
	#if ($filetype == "txt" && is_file ( $filepath . "/" . $filename ))
	if ( is_file ( $filepath))
	{
		//return $filepath;
		//echo str_replace("\\","/",$filepath);
		return str_replace("\\","/",$filepath);
		/*
		$filename=iconv("gb2312","utf-8",$filepath);
		echo $filename."内容如下:"."<br/>";
		$fp = fopen ( $filepath, "r" );//打开文件
		#while (! feof ( $f )) //一直输出直到文件结尾
		$i = 1;
		while ($i < 10)
		{
			$line = fgets ( $fp );
			echo $line."<br/>";
			$i = $i +1;
		}
		fclose($fp);
		*/

	}
}


function readFileRecursive($filepath){
  $fileArray = array();
	if (is_dir ( $filepath )) //判断是不是目录
	{
		$dirhandle = opendir ( $filepath );//打开文件夹的句柄
		if ($dirhandle)
		{
			//判断是不是有子文件或者文件夹
			while ( ($filename = readdir ( $dirhandle ))!= false )
			{
				if ($filename == "." or $filename == "..")
				{
					//echo "目录为“.”或“..”"."<br/>";
					continue;
				}

				//判断是否为目录，如果为目录递归调用函数，否则直接读取打印文件
				if(is_dir ($filepath . "/" . $filename ))
				{
					readFileRecursive($filepath . "/" . $filename);
				}
				else
				{
					//打印文件
					$fname = printFile($filepath . "/" . $filename);
          array_push($fileArray,$fname);
				}
			}
			closedir ( $dirhandle );
		}
	}
	else
	{

		printFile($filepath . "/" . $filename);
		return;
	}
	return $fileArray;
}
