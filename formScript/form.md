<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<title>html form script</title>
		<meta name="description" content="">
		<meta name="author" content="Administrator">
		<meta name="viewport" content="width=device-width; initial-scale=1.0">
	</head>

	<body>
		<ul>
			<li>
				<h1>获取表单元素</h1>
				<p>三种方法</p>
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
                    var fm1 = document.getElementById('fm1');
                    var fms = document.forms;
                    var fm2 = fms[0];
                    var fm3 = fms['fm3'];

				</script>
			</li>
			<li>
				<h1>提交表单</h1>
				<ul>
					<li>
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
					</li>
				</ul>
			</li>
		</ul>

		

		
	</body>
</html>