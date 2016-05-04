##目录

[取得form元素的引用](#a1)

[提交表单](#a2)

[重置表单](#a3)

[表单字段](#a4)

[文本框脚本](#a5)

[选择框脚本](#a6)

##表单

form元素对应的是HTMLFormElement类型，HTMLFormElement有自己的属性和方法

+ acceptCharset:服务器能够处理的字符集，等价与accept-charset特性

+ action:接受请求的URL，等价于action特性

+ elements:表单中所有空间的集合

+ enctype:请求的编码类型，等价于enctype特性

+ length:表单中空间的数量

+ methed:要发送的HTTP请求的类型，等价于method特性

+ name:表单的名称，等价于name特性

+ reset():将所有表单域重置为默认的值

+ submit():提交表单

+ target:用于发送请求和接受响应的窗口名称，等价于target特性

<a name="a1"></a>

###取得form元素的引用

```html
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
```

###表单事件

<a name="a2"></a>

###提交表单

```html
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
```

<a name="a3"></a>

###重置表单

```html
<form name="fm5">
	<input type="reset" />
</form>
<script type="text/javascript">
	//document.forms['fm5'].reset();
	document.forms['fm5'].onreset=function(){
		alert('你点击了重置按钮');
	};
</script>
```

<a name="a4"></a>

###表单字段

每个表单都有elements属性，该属性是表单中所有元素的集合，这个elements集合是一个有序列表，其中包含着表单中的所有字段，每个表单字段在elements集合中的顺序，与它们出现在标记中的顺序相同，可以按位置和name特性来访问它们

####取得表单字段

```html
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
```

####表单字段属性

**共有的表单字段属性**

+ disabled，布尔值，表示当前字段是否被禁用

+ form，指向当前字段所属的表单的指针，只读

+  name，当前字段的名称

+ readOnly，布尔值，表示当前字段是否只读

+ tabIndex，表示当前字段的切换序号

+ type，当前字段的类型，如‘text’等

+ value当前字段将被提交给费武器的值

```html
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
```

**共有的表单字段方法**

+ focus()，将浏览器的焦点设置到表单字段

+ blur()，从元素中移走焦点

**共有的表单字段事件**

+ blur，当前字段是去焦点时触发

+ change，对于input和textarea元素，在他们失去焦点且value值改变时触发，对于select元素，在其选项改变时触发

+ focus，当字段获得焦点时触发

```html
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
```

<a name="a5"></a>

##文本框脚本

###选择文本

单行文本框和多行文本框会将用户输入的内容保存在value属性中，可以通过这个属性读取和设置文本框的值，在处理文本框的时候最好不要使用DOM方法

文本框支持一个select()方法，该方法用来选择文本框中所有的文本，该方法不接受参数

**选择事件**与select()方法对应的select事件，在选择了文本框中的文本时，会触发select事件

**取得选择的文本**selectionStart属性和selectionEnd属性表示所选文本的范围，
IE9+，Firefox，Safari，Chrome，Opera

**选择部分文本**setSelectionRange()方法接受两个参数，要选择的第一个字符的索引，和要选择的最后一个字符的索引

[查看示例](/code/formscript/2015-09-24-form1.html)

###过滤输入

例如过滤非数字的输入

```html
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
```

###访问剪贴板

剪贴板事件：

+ beforecopy:在发生复制操作前触发

+ copy:在发生复制操作时触发

+ beforecut:在发生剪切操作前触发

+ cut:在发生剪切操作时触发

+ beforepaste:在发生粘贴操作前触发

+ paste:在发生粘贴操作时触发

访问剪贴板中的数据可以使用clipboardData对象，在IE中这个对象是window的属性，而在Firefox4+，Safari和Chrome中这个对象是event对象的属性

clipboardData对象有三个方法：

+ getData():从剪贴板中取得数据，接受一个参数，即要取得的数据格式

+ setData():第一个参数是数据类型，第二个参数是要放在剪贴板中的文本

+ clearData():

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

###自动切换焦点

```html
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
```

###HTML5约束验证API

####必填字段

	<input type="text" name="username" required />

required属性适用于input,textarea,select元素，可以通过该属性检测是否为必填字段

####输入类型

HTML5为input元素的type属性新增了几个值：eamil,url是得到支持最多的类型

####数值范围

	<input type="number" min="0" max="10" step="5" />

####输入模式

HTML5为文本字段新增了pattern属性，这个属性的值是一个正则表达式，可以通过该属性访问模式

	<input type="text" pattern="\d" name="count" />

####检测有效性

使用checkValidity()方法检测表单中的某个字段是否有效，所有的表单字段都有这个方法，如果字段有效，返回true，否则返回false。

判断依据是本书前面介绍的那些约束

validity属性表示为什么字段无效（详细：p430）

####禁用验证

novalidate属性可以禁用验证

	<input type="text" pattern="\d" name="count" novalidate />

<a name="a6"></a>

##选择框脚本

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

