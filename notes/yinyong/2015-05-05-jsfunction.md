##目录

[函数定义](#a1)

[没有重载](#a2)

[区分函数声明与函数表达式](#a6)

[作为值的函数](#a3)

[函数内部属性](#a4)

[函数属性和方法](#a5)

在js中，函数是对象，函数名是指针。每个函数都是function类型的实例，而且与其他引用类型一样具有属性和方法。由于函数是对象，因此函数名实际上也是一个指向对象的指针，不会与某个函数绑定

<a name="a1"></a>

##函数定义##

函数定义的方法有三种。

###使用函数声明语法定义###

	function fa1(n1,n2){
		return n1+n2;
	}


###使用函数表达式定义函数###

	var fa2=function(n1,n2){
		return n1+n2;
	};
	//注意，函数表达式定义函数，花括号后面要加分号。


###使用function构造函数定义函数###

这种方法接受任意数量的参数，但最后一个参数是种都被默认为是函数体，前面的参数是新函数的参数；

	var fa3=Function("n1","n2","return n1+n2");


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

<a name="a6"></a>

##区分函数声明与函数表达式 ##

解析器在向执行环境中加载数据时，对函数声明和函数表达式并非一视同仁。解析器会率先读取函数声明，并使其执行在任何代码之前可用（可以访问）。至于函数表达式，只有在解析器执行到它锁在的代码，才会真正被解析。

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

<a name="a2"></a>

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

<a name="a3"></a>

##作为值的函数##

因为在js中函数名本身就是变量，所以函数也可以作为值来使用，也就是说，不仅可以像传递参数一样把一个函数传递给另一个函数，而且可以将一个函数作为另一个函数的结果返回

	function fc2(f,n){
		return f(n);
	}
	function fc1(n){
		return n+10;
	}
	var c1=fc2(fc1,10);
	console.log(c1);


可以从一个函数中返回另一个函数

<a name="a4"></a>

##函数内部属性##

在函数的内部有两个特殊的对象：**arguments**和**this**

####arguments####

arguments是一个类数组的对象，在js中的参数在内部是用这个数组来表示的。函数接受到的始终都是这个数组，并不关心数组中包含哪些参数。数组中可以有多个参数，也可以没有参数。在函数体内，可以通过arguments对象来访问这个参数数组，从而获得传递给函数的每一个参数。

arguments对象只是与数组类似，并不是数组，可以使用方括号语法访问它的每一个元素。使用length属性来确定传递进来的参数个数。

arguments对象还有一个叫callee的属性，该属性是一个指针，指向拥有这个arguments对象的函数。

	function d1(n){
		if(n<=1){
			return 1;
		}else{
			return n*d1(n-1);
		}
	}
	console.log(d1(10));//3628800


定义阶乘函数都要用到递归算法，如上面的代码所示，在函数有名字，而且名字以后也不会变的情况下，这样定义没有问题。但是这个函数的执行与函数名factorial紧紧耦合在了一起。为了消除这种紧密耦合的现象，可以像下面这样使用arguments.callee。

	function d2(n){
		if(n<=1){
			return 1;
		}else{
			return n*arguments.callee(n-1);
		}
	}
	console.log(d2(10));//3628800


在重写后的factorial（）函数的函数体内，没有在引用函数名factorial。这样无论引用函数时使用的是什么名字，都可以保证正常完成递归调用。


####this####

函数体内的另一个特殊对象是this，this引用的是函数执行的环境对象，--或者也可以说是this值（当在全局作用域中调用函数时，this对象引用的就是window）。如下面的例子所示：

	window.d3="red";
	var o={d3:"blue"};
	function d4(){
		console.log(this.d3);
	}
	d4();//red
	o.d4=d4;
	o.d4();//blue

####caller####

	function d5(){
		d6();
	}
	function d6(){
		console.log(d6.caller);
	}
	d5();//function d5(){d6();}

caller属性保存着调用当前函数的函数的引用

<a name="a5"></a>

##函数属性和方法##

Javascript中的函数是对象，因此函数也有属性和方法，每个函数都包含两个属性length和prototype，其中length属性表示函数希望接受到的参数个数。

	function e1(s){
		console.log("e1函数");
	}
	console.log(e1.length);//1


Javascript核心所定义的全部属性中，最耐人寻味的就是prototype属性，对于Javascript中的引用类型而言prototype是保存他们所以实例方法的真正所在，换句话说诸如toString（）和valueOf（）等方法其实都是保存在prototype名下，只不过是通过各自对象的实例访问罢了。创建自定义引用类型以及实现继承的时候，prototype的属性是极为重要的，后面的文章中将作出详细介绍。prototype属性是不可枚举的，因此使用for-in语句无法发现。



每个函数都包含两个非继承而来的方法：apply（）和call（）。这两个方法都是在特定的作用域中调用函数，实际上等同于设置函数体内的this对像的值。首先apply（）方法接受两个参数：一个是在其中运行函数的作用域，另一个是参数数组。第二个参数可以是Array实例，也可以是arguments对象。

	function e2(n1,n2){
		return n1+n2;
	}
	function callE2(n1,n2){
		return e2.apply(this,arguments);
	}
	function callE3(n1,n2){
		return e2.apply(this,[n1,n2]);
	}
	console.log(callE2(10,10));//20
	console.log(callE3(10,10));//20



call（）方法与apply（）方法的作用相同，区别仅在于接受参数的方式不同，对于call（）函数而言，接受的第一个参数是this值，没有变化，变化的是其余参数都是直接传递给函数。换句话说，在使用call（）方法的时候，传递给函数的参数必须逐个列举出来：

	function callE4(n1,n2){
		return e2.call(this,n1,n2);
	}
	console.log(callE4(10,10));//20

使用call（）还是apply（）方法，完全取决于采用那种给函数传递参数的方式最方便。

事实上，传递参数并非call（）和apply（）真正的用武之地，他们真正强大的地方是能够扩充函数赖以运行的作用域，请看下面的例子：

	window.e3="red";
	var fe4={e3:"blue"};
	function fe5(){
		console.log(this.e3);
	}
	fe5.call(this);//red
	fe5.call(window);//red
	fe5.call(fe4);//blue



javascript中还定义了一个方法：bind（）。这个方法会创建一个函数的实例，其this值会被绑定到传给bind（）函数的值

	window.e6="666";
	var fe7={
		e6:"888"
	};
	function fe8(){
		console.log(this.e6);
	}
	var e9=fe8.bind(fe7);
	e9();//888

ie9+,firefox4+,safari5.1+,opera12+,chrome

valueOf()方法返回函数代码