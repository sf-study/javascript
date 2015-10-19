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

###文本框脚本

####过滤输入

例如过滤非数字的输入

	<form name="fm10">
		<input type="text" />
	</form>
	<script type="text/javascript">
		var fm10=document.forms['fm10'];
		EventUtil.addHandler(fm10.elements[0],'keypress',function(event){
			event=EventUtil.getEvent(event);
			var target=EventUtil.getTarget(event);
			
			var charCode=EventUtil.getCharCode(event);
			if(! /\d/.test(String.fromCharCode(charCode)) && charCode>9){
				EventUtil.preventDefault(event);
			}
			
		});
		//当输入的是中文的时候，无效
	</script>

####访问剪贴板

	<form name="fm11">
		<input type="text" />
	</form>
	<script type="text/javascript">
		var fm11=document.forms['fm11'];
		EventUtil.addHandler(fm11.elements[0],'paste',function(event){
			event=EventUtil.getEvent(event);
			var text=EventUtil.getClipboardText(event);
			if(! /^\d*$/.test(text)){
				EventUtil.preventDefault(event);
			}
			
		});
	</script>

####自动切换焦点

	<form name="fm12">
		<input type="text" maxlength="3" />
		<input type="text" maxlength="3" />
		<input type="text" maxlength="4" />
	</form>
	<script type="text/javascript">
		var fm12=document.forms['fm12']; 
		(function(){
			function tabForward(event){
				event=EventUtil.getEvent(event);
				var target=EventUtil.getTarget(event);	
				if(target.value.length==target.maxLength){
					var form=target.form;
					for(var i=0,len=form.elements.length;i<len;i++){
						if(form.elements[i]==target){
							if(form.elements[i+1]){
								form.elements[i+1].focus();
							}
							return;
						}
					}
				}
			}
			var fd121=fm12.elements[0];
			var fd122=fm12.elements[1];
			var fd123=fm12.elements[2];
			EventUtil.addHandler(fd121,'keyup',tabForward);
			EventUtil.addHandler(fd122,'keyup',tabForward);
			EventUtil.addHandler(fd123,'keyup',tabForward);
		})();
	</script>

####HTML5约束验证API

	<form name="fm13">
		<!-- required必填 -->
		<input type="text" name="username" required />
		<input type="email" name="email" />
		<input type="url" name="url" />
		<input type="text" pattern="\d" name="count" />
	</form>

###选择框脚本

	<form name="fm14">
		<select>
			<option value="v1">v11111的文本</option>
			<option value="v2">v21111的文本</option>
			<option value="v3">v31111的文本</option>
			<option value="v4">v41111的文本</option>
			<option value="v5">v51111的文本</option>
		</select>
		<input type="button" value="点击查看option的个数" />
		<input type="button" value="" />
		<input type="button" value="点击显示第一个option的value值" />
		<input type="button" value="点击显示第2个option的文本值" />
		<input type="button" value="点击显示选择了哪个选项" />
		<h2>添加选项的方法</h2>
		<input type="button" value="点击按钮，新增一个选项（使用js动态创建选项）" name="input6" />
		<input type="button" value="点击按钮，新增一个选项（使用option构造函数方法）" name="input7" />
		<input type="button" value="点击按钮，新增一个选项（使用选择框的add方法）" name="input8" />
		<h2>移除选项</h2>
		<input type="button" value="点击按钮移除选项(使用DOM动态移除的方法)" name="input9" />
		<input type="button" value="点击按钮移除选项(选择框的remove方法)" name="input10" />
		<input type="button" value="点击按钮移除选项(使用js动态移除的方法)" name="input11" />
		<select name="s2">
			<option value="1">s1111111111111</option>
			<option value="2">s2222222222222</option>
			<option value="3">s3333333333333</option>
			<option value="4">s4444444444444</option>
		</select>
		<input type="button" value="移动选项（点击按钮，复制第一个选择框里的第一个选项到第二个选择框里）" name="input12" />
	</form>
	<script type="text/javascript">
		var fm14=document.forms['fm14'];
		fm14.elements[1].onclick=function(){
			alert(fm14.elements[0].options.length);
		};
		// fm14.elements[2].onclick=function(){
			// fm14.elements[0].add('<option value="v5">v5</option>',0);
		// };
		fm14.elements[3].onclick=function(){
			alert(fm14.elements[0].options[0].value);
		};
		fm14.elements[4].onclick=function(){
			alert(fm14.elements[0].options[1].text);
		};
		
		fm14.elements[5].onclick=function(){
			var selectedIndex=fm14.elements[0].selectedIndex;
			var selectedOption=fm14.elements[0].options[selectedIndex];
			alert(selectedIndex);
		};
			/*
         * 添加选项的三种方法
         * 1：DOM的appendChild（）方法
         */
		fm14.elements['input6'].onclick=function(){
			var newoption=document.createElement('option');
			newoption.appendChild(document.createTextNode('使用第一种方法新增的选项'));
			newoption.setAttribute('value','v61111');
			fm14.elements[0].appendChild(newoption);
			alert('新增选项成功');
		};
		/*
		 * 添加选项的第二种方法
		 * Option构造函数
		 * Option('option text','option value')
		 * ie8一下有bug
		 */
		fm14.elements['input7'].onclick=function(){
			var newoption2=new Option('使用第二种方法新增的选项','v7111111');
			fm14.elements[0].appendChild(newoption2);
			alert('新增选项成功');
		};
		/*
		 * 添加选项的第三种方法
		 * add（）；方法
		 */
		fm14.elements['input8'].onclick=function(){
			var newoption3=new Option('使用第三种方法新增的选项','v8111111');
			fm14.elements[0].add(newoption3,undefined);
			alert('新增选项成功');
		};
		/*
		 * 移除选项
		 * 方法1：DOM的removeChild（）方法
		 */
		fm14.elements['input9'].onclick=function(){
			fm14.elements[0].removeChild(fm14.elements[0].options[0]);
			alert('成功移除选项');
		};
		/*
		 * 移除选项
		 * 方法2：选择框的remove方法
		 */
		fm14.elements['input10'].onclick=function(){
			fm14.elements[0].remove(1);
			alert('成功移除选项');
		};
		/*
		 * 移除选项
		 * 方法3：设置每个选项为null
		 * DOM遗留机制
		 */
		fm14.elements['input11'].onclick=function(){
			fm14.elements[0].options[2]=null;
			alert('成功移除选项');
		};
		/*
		 * 移动选项
		 */
		fm14.elements['input12'].onclick=function(){
			var st1=fm14.elements['0'];
			var st2=fm14.elements['s2'];
			st2.appendChild(st1.options[0]);
			alert('成功移动选项');
		};
		
	</script>

###表单序列化

