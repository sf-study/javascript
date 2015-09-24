##目录

###取得form元素的引用

	<body>
		<form name="fm2">
			<input type="text" />
		</form>
		<form id="fm1">
			<input type="text" />
		</form>
		<form name="fm3">
			<input type="text" />
		</form>
		<script type="text/javascript">
			var fm1=document.getElementById('fm1');
			var fms=document.forms;
			var fm2=fms[0];
			var fm3=fms['fm3'];
			alert(fm3);
		</script>
	</body>

###表单事件
	
	<p>图像按钮，和submit类型的按钮会触发提交表单事件</p>
	<form name="fm4">
		<input type="image" src="../img/st1.jpg" />
	</form>
	<script type="text/javascript">
		//提交表单
		//fms['fm4'].submit();
		document.forms['fm4'].onsubmit=function(){
			alert('你点击提交按钮了');
		};
	</script>