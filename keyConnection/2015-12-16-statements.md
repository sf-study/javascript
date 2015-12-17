##语句

##目录

[if语句](#a1)

[do-while语句](#a2)

[while语句](#a3)

[for语句](#a4)

[for-in语句](#a5)

[label语句](#a6)

[break和continue语句](#a7)

[with语句](#a8)

[switch语句](#a9)

###if语句

	if(true){
		conlose.log("条件真");
	}else{
		console.log();
	}

条件可以是任何表达式，ECMAScript会自动调用Boolean()转换函数，将这个表达式的结果转换为一个布尔值

###do-while语句

	var a=0;
	do{
		a+=2;
		console.log(a);
	}while(a<10);

后测试循环语句，循环体中的代码至少执行一次

###while语句

	var b=0;
	while(b<10){
		b+=2;
		console.log(b);
	}

前测试循环语句，循环中的代码有可能永远不会执行

###for语句

	var c=10,i;
	for(i=0;i<c;i++){
		console.log(i);
	}
	console.log(i+"asd)

由于ECMAScript没有块级作用域，因此循环内部定义的变量在循环外部也可以访问

###for-in语句

	console.log("for-in--------------------------------");
	for(var propName in window){
		console.log(propName);
	}

for-in语句是一种精准的迭代语句，可以用来枚举对象的属性，使用之前，最好先检测该对象的值是不是null或undefined

###label语句

	start:for(var d=0;d<10;d++){
		console.log(d);
	}

标签可以在将来由break或continue语句引用

###break和continue语句

	var e1=0;
	for(var e=1;e<10;e++){
		if(e%5==0){
			break;
		}
		console.log(e);
		e1++;
	}
	console.log("e1:"+e1);

break语句，立即跳出循环，强制继续执行循环后面的语句

	var e2=0;
	for(var e=1;e<10;e++){
		if(e%5==0){
			continue;
		}
		console.log(e);
		e2++;
	}
	console.log("e2:"+e2);

continue语句，立即跳出循环，从循环的顶部继续执行

###with语句

将代码的作用域设置到一个特定的对象中

	var g=location.search.substring[1];
	var hoseName=location.hostname;
	var url=location.href;

上面的代码可以改写成下面的形式

	with(loaction){
		var g=search.substring[1];
		var hoseName=hostname;
		var url=href;
	}

###switch语句

	var h=25;
	switch(h){
		case 5:
		console.log(5);
		break;
		case 15:
		console.log(15);
		break;
		case 25:
		console.log(25);
		break;
		default:
		console.log("没有找到数字");
	}

如果省略break关键字，就会导致执行完当前的case后，继续执行下一个case

