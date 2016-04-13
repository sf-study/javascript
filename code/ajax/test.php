<?php
ob_start();
for ($i = 1; $i < 5; $i++) {
	echo str_pad(' ', 4096);
	echo $i;
	echo "ob_length:" . ob_get_length() . "ob_contents" . ob_get_contents();
	ob_flush();
	flush();
	sleep(1);
}
?>