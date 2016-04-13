<?php
    header("Content-Type: text/plain");
    header("XDomainRequestAllowed: 1");
    header("Content-Length: 27");
	sleep(2);
	//sleep(2)停止两秒
    echo "Some data";
    flush();
	sleep(6);
    echo "Some data";//echo输出字符串
    flush();
	sleep(10);
    echo "Some data";
    flush();//flush刷新浏览器的cache   
?>