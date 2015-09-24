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

####提交
	
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

####重置

	<form name="fm5">
		<input type="reset" />
	</form>
	<script type="text/javascript">
		//document.forms['fm5'].reset();
		document.forms['fm5'].onreset=function(){
			alert('你点击了重置按钮');
		};
	</script>

###表单字段

####取得表单字段

	<form name="fm6">
		<input type="text" />
		<textarea name="texta1">
			
		</textarea>
		<input type="radio"  name="color" value="red" />红色
		<input type="radio"  name="color" value="blue" />蓝色
		<input type="radio"  name="color" value="black" />黑色
	</form>
	<script type="text/javascript">
		var fm6=document.forms['fm6'];
		//访问一个form表单里面的元素，以及表单里面元素的个数
		var fm60=fm6.elements[0];
		var fm6L=fm6.length;
		var fm6T=fm6.elements['texta1'];
		
		//单选按钮 ，返回radioNodeList对象,可以通过数值索引
		var fm6R=fm6.elements['color'];
		var fm6R0=fm6R[0];
		
	</script>

####表单字段属性

**共有的表单字段属性**

+ disabled，布尔值，表示当前字段是否被禁用

+ form，指向当前字段所属的表单的指针，只读

+  name，当前字段的名称

+ readOnly，布尔值，表示当前字段是否只读

+ tabIndex，表示当前字段的切换序号

+ type，当前字段的类型，如‘text’等

+ value当前字段将被提交给费武器的值

	<p id="p7">
		
	</p>
	<form name="fm7">
		<input type="text" name="fm7_input1" value="输入测试文字" />
	</form>
	<script type="text/javascript">
		var fm7=document.forms['fm7'];
		var fd7=fm7.elements[0];
		var p7=document.getElementById('p7');
		p7.innerHTML='fd7.disabled:'+fd7.disabled+'<br><br>'+'fd7.form:'+fd7.form
		+'<br><br>'+'fd7.name:'+fd7.name+'<br><br>'+'fd7.readOnly:'+fd7.readOnly
		+'<br><br>'+'fd7.tabIndex:'+fd7.tabIndex+'<br><br>'+'fd7.type:'+fd7.type
		+'<br><br>'+'fd7.value:'+fd7.value;
		fd7.onclick=function(){
			fd7.value='你点击了文本框，文本框获得焦点，改变了默认的文字';
		};
	</script>

**共有的表单字段方法**

+ focus()，获得焦点

+ blur()，失去焦点

**共有的表单字段事件**

+ blur

+ change

+ focus

	<form name="fm8">
		<input type="text" name="fm8_input1" value="输入测试数字" style="background-color: red" />
	</form>
	<script type="text/javascript">
		var fd8=document.forms['fm8'].elements[0];
		EventUtil.addHandler(fd8,'focus',function(event){
			event=EventUtil.getEvent(event);
			var target=EventUtil.getTarget(event);
			if(target.style.backgroundColor!='red'){
				target.style.backgroundColor='yellow';
			}
		});
		EventUtil.addHandler(fd8,'blur',function(){
			event=EventUtil.getEvent(event);
			var target=EventUtil.getTarget(event);
			if(/[^\d]/.test(target.value)){
				alert('请输入数字');
				target.style.backgroundColor='red';
			}else{
				target.style.backgroundColor='';
			}
		});
		EventUtil.addHandler(fd8,'change',function(){
			event=EventUtil.getEvent(event);
			var target=EventUtil.getTarget(event);
			if(/[^\d]/.test(target.value)){
				alert('请输入数字');
				target.style.backgroundColor='red';
			}else{
				target.style.backgroundColor='';
			}
		});
	</script>

