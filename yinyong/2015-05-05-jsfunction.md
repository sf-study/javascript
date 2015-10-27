---
layout: post
title:  "js引用类型function"
category: Javascript
tags: [test, jekyll, welcome]
---

在js中，函数是对象，函数名是指针。每个函数都是function类型的实例，而且与其他引用类型一样具有属性和方法。由于函数是对象，因此函数名实际上也是一个指向对象的指针，不会与某个函数绑定

##函数定义##

函数定义的方法有三种。

###使用函数声明语法定义###

	function sum(num1,num2){
		return num1+num2;
	}


###使用函数表达式定义函数###

	var sum=function(){
		return num1+num2;
	};
	//注意，函数表达式定义函数，花括号后面要加分号。


###使用function构造函数定义函数###

这种方法接受任意数量的参数，但最后一个参数是种都被默认为是函数体，前面的参数是新函数的参数；

	var sum=function("num1","num2","return num1+num2");


**函数名仅是指向函数的指针**

请看下面的代码

	//定义函数
	function sum(num1,num2){
		return num1+num2;
	}
	alert(sum(10,10));
	//把sum的值赋值给anotherSum
	//使用不带圆括号的函数名是访问函数指针，而非调用函数
	//此时anotherSum和sum指向同一个函数
	var anotherSum=sum;
	alert(anotherSum(10,10));

	sum=null;
	//设置sum为null，“断绝与函数的关系”，仍然可以访问anotherSum。
	alert(anotherSum(10,10));


###区分函数声明与函数表达式 ###

实际上解析器在向执行环境中加载数据时，对函数声明和函数表达式并非一视同仁。解析器会率先读取函数声明，并使其执行在任何代码之前可用（可以访问）。至于函数表达式，只有在解析器执行到它锁在的代码，才会真正被解析。

	alert(sum(10,10));//20
	function sum(num1,num2){
		return num1+num2;
	}


上面的代码可以正常运行，因为在代码开始执行之前，解析器就已经通过一个名为函数声明提升的过程，读取并将函数声明添加到执行环境中。对代码求值，js引擎第一遍会声明函数并将他们放到源代码树的顶部。所以，即使函数声明的代码在调用他的代码之后，js引擎也能把函数声明提升到顶部

	alert(sum(10,10));//20
	var sum=function(num1,num2){
		return num1+num2;
	};


上面的代码会在运行期间报错，原因在于函数位于一个初始化语句中，而不是一个函数声明。换句话说，在执行到函数锁在的语句之前，变量sum中不会保存有对函数的引用；而且由于第一行代码就会报错：“unexpected identitier”(意外标识符)，实际上也不会执行到下一行。

##没有重载##

将函数名想象为指针，有助于理解js中没有重载的概念。

	function sum(num1,num2){
		return num1+num2;
	}
	function sum(num1,num2){
		return num1+num2+1000;
	}
	alert(sum(100,100));//1200
	//后面的函数覆盖了前面的函数


##作为值的函数##

因为在js中函数名本身就是变量，所以函数也可以作为值来使用，也就是说，不仅可以像传递参数一样把一个函数传递给另一个函数，而且可以将一个函数作为另一个函数的结果返回

请看下面的例子:

	//callSomeFunction函数接受两个参数，第一个参数是一个函数指针，第二个参数是
	//要传递给第一个参数的参数
	function callSomeFunction(someFunction,someArgument){
		return someFunction(someArgument);
	}
	function add(num){
		return num+10;
	}
	var result1=callSomeFunction(add10,10);
	alert(result1);//10

	function getGreeting(name){
		return "Hello,"+name;
	}
	var result2=callSomeFunction(getGreeting,"cherry");
	alert(result2);//Hello,cherry;


当然也可以从一个函数中返回另一个函数

###函数内部属性###

在函数的内部有两个特殊的对象：**arguments**和**this**

####arguments####

arguments是一个类数组的对象，在js中的参数在内部是用这个数组来表示的。函数接受到的始终都是这个数组，并不关心数组中包含哪些参数。数组中可以有多个参数，也可以没有参数。在函数体内，可以通过arguments对象来访问这个参数数组，从而获得传递给函数的每一个参数。

arguments对象只是与数组类似，并不是数组，可以使用方括号语法访问它的每一个元素。使用length属性来确定传递进来的参数个数。

arguments对象还有一个叫callee的属性，该属性是一个指针，指向拥有这个arguments对象的函数。

请看下面的这段代码：

	function factorial(num){
		if(num<=1){
			return 1;
	}
	else{
		return num*factorial(num-1);
	}
	}


定义阶乘函数都要用到递归算法，如上面的代码所示，在函数有名字，而且名字以后也不会变的情况下，这样定义没有问题。但是这个函数的执行与函数名factorial紧紧耦合在了一起。为了消除这种紧密耦合的现象，可以像下面这样使用arguments.cellee。

	function factorial(num){
		if(num<=1){
			return 1;
	}
	else{
		return num*arguments.callee(num-1);
	}
	}


在重写后的factorial（）函数的函数体内，没有在引用函数名factorial。这样无论引用函数时使用的是什么名字，都可以保证正常完成递归调用。例如

	function factorial(num){
		if(num<=1){
			return 1;
		}
		else{
			return num*arguments.callee(num-1);
		}
	}
	var truefactorial=factorial;
	factorial=function(){
		return 0;
	};
	alert(truefactorial(5));//120
	alert(factorial(5));//0


####this####

函数体内的另一个特殊对象是this，this引用的是函数执行的环境对象，--或者也可以说是this值（当在全局作用域中调用函数时，this对象引用的就是window）。如下面的例子所示：

	window.color="red";
	var o={color:"blue"};
	function saycolor(){
		alert(this.color);
	}
	saycolor(); //red
	o.saycolor=saycolor;
	o.saycolor();//blue


上面的代码saycolor（）是在全局作用域中定义的，它引用了this对象。由于在调用函数之前this的值并不确定，因此this会在代码执行过程中引用不同的对象，当在全局作用域中调用saycolor（）时，this引用的是全局对象window，换句话说对this.color求值，会转成对window.color求值，于是结果就返回red。而当把saycolor（）函数赋值给对象o，并调用o.saycolor（），this引用的对象是o，因此对this.color求值，会转换成对o.color求值，于是返回blue。

##函数属性和方法##

Javascript中的函数是对象，因此函数也有属性和方法，每个函数都包含两个属性length和prototype，其中length属性表示函数希望接受到的参数个数。

例如：

	function sum(){
		alert(sum.length);//0
	}
	sum();


Javascript核心所定义的全部属性中，最耐人寻味的就是prototype属性，对于Javascript中的引用类型而言prototype是保存他们所以实例方法的真正所在，换句话说诸如toString（）和valueOf（）等方法其实都是保存在prototype名下，只不过是通过各自对象的实例访问罢了。创建自定义引用类型以及实现继承的时候，prototype的属性是极为重要的，后面的文章中将作出详细介绍。prototype属性是不可枚举的，因此使用for-in语句无法发现。

每个函数都包含两个非继承而来的方法：apply（）和call（）。这两个方法都是在特定的作用域中调用函数，实际上等同于设置函数体内的this对像的值。首先apply（）方法接受两个参数：一个是在其中运行函数的作用域，另一个是参数数组。第二个参数可以是Array实例，也可以是arguments对象。

	function sum(num1,num2) {
		return num1 + num2;
	}
	function callsum1(num1,num2) {
		return sum.apply(this, arguments);
		//设置sum函数的this值为callsum1（）函数的作用域
		//并传入arguments对象作为参数
	}
	function callsum2(num1,num2) {
		return sum.apply(this, [num1, num2]);
		//设置sum函数的this值为callsum2（）函数的作用域
		//并传入数组作为参数
	}
	alert(callsum1(10, 10));
	//20
	alert(callsum2(10, 10));
	//20



call（）方法与apply（）方法的作用相同，区别仅在于接受参数的方式不同，对于call（）函数而言，接受的第一个参数是this值，没有变化，变化的是其余参数都是直接传递给函数。换句话说，在使用call（）方法的时候，传递给函数的参数必须逐个列举出来：

	function sum(num1,num2){
		return num1+num2;
	}
	function callsum(num1,num2){
		return sum.call(this,num1,num2);
	}
	alert(callsum(10,10));//20


在使用call（）方法的情况下，callsum（）必须明确的传入每一个参数。结果与使用apply（）没有什么不同。至于使用call（）还是apply（）方法，完全取决于你决定采用那种给函数传递参数的方式最方便。

事实上，传递参数并非call（）和apply（）真正的用武之地，他们真正强大的地方是能够扩充函数赖以运行的作用域，请看下面的例子：

	window.color="red";
	var o={color:"blue"};
	//在全局作用域中定义函数saycolor()
	function saycolor(){
		alert(this.color);
	}
	saycolor.call(this);//red,saycolor（）函数的作用域是当前作用域，即window
	saycolor.call(window);//red，saycolor（）函数的作用域为window
	saycolor.call(o);//blue，saycolor（）函数作用域为o



javascript中还定义了一个方法：bind（）。这个方法会创建一个函数的实例，其this值会被绑定到传给bind（）函数的值。例如：

	window.color="red";
	var 0={color:"red"};
	function saycolor(){
		alert(this.color);
	}
	var objectsaycolor=saycolor.bind(o);
	//创建saycolor()函数的实例，并将其赋值给objectsaycolor
	//，并把o对象传递给bind（）函数，objectsaycolor（）函数的this值等于o
	objectsaycolor();//blue
