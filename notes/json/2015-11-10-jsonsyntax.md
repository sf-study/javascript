#json语法

json的语法可以表示下列三种类型的值

+ 简单值：使用与Javascript相同的语法可以表示字符串、数值、布尔值和null，但不支持undefined

+ 对象：对象作为一种复杂的数据类型，表示一组有序的键值对，每个键值对中的值可以是简单值，也可以是复杂的数据类型

+ 数组：数组也是一种复杂的数据类型，表示一组有序的值的列表，可以通过数值索引来访问其中的值。数组的值也可以是任意类型：简单值、对象、数组

json是一种表示结构化数据的格式

##简单值

字符串类型的必须用双引号，否则就会导致语法错误

```json
{
    5,
    null,
    true,
    "test"
}
```

##对象

json要求给属性加双引号,属性的之可以是简单类型的，也可以是复杂类型值

```json
{
	"name":"xiahua",
	"age":22,
	"school":{
		"name":"jialidun",
		"location":"jinhailu"
	},
    "friends":["lisa","cherry","gary"]
}
```

##数组

	[25,"hi",true]

把数组和对象结合使用

```json
{
	"name":"xiahua",
	"age":22,
	"school":{
		"name":"jialidun",
		"location":"jinhailu"
	},
	"pre":["a","b","c"]
}
```

#解析与序列化

可以把JSON数据结构解析为有用的Javascript对象

##JSON对象

ECMAScript5对解析JSON的行为进行规范，定义了全局对象JSON，支持这个对象的浏览器有IE8+、Firefox3.5+、Safari4+、Chrome和Opera10.5+

JSON对象有两个方法，stringify（）和parse（）

stringify（）把javascript对象序列化为json字符串

parse（）把json字符串解析为javascript值

###stringify（）

stringify（）把javascript对象序列化为json字符串

```javascript
var book = {
    title : 'javascript',
    authors : ['xiahua', 'xiatian'],
    edition : 3,
    year : 2011,
    sales:null,
    un:undefined,
    sayName:function(){
        console.log("name");
    }
};
var jsonText = JSON.stringify(book);
console.log(jsonText);
//{"title":"javascript","authors":["xiahua","xiatian"],"edition":3,"year":2011,"sales":null}
```

在序列化Javascript对象时，所有函数及原型成员都会被忽略，不体现在结果中，此外值为undefined的任何属性也都会被跳过

stringify（）还可以接受两个参数，用于指定以不同的方式序列化Javascript对象：第一个参数是一个过滤器，可以是一个数组，或一个函数，第二个参数是一个选项，表示是否在JSON字符串中保留缩进

####第二个参数是数组

```javascript
var jsonText2 = JSON.stringify(book, ["title", "edition"], 4);
console.log(jsonText2);
//{title:'javascript',edition:3};每个级别缩进四个字符
```

在返回的结果中保留数组里面的项对应的属性

####第二个参数是函数

```javascript
var jsonText3 = JSON.stringify(book, function(key, value) {
    switch(key) {
        case "authors":
            return value.join(",");
        case "year":
            return 5000;
        case "edition":
            return undefined;
        default:
            return value;
    }
}, 4);
console.log(jsonText3);
//{title:'javascript',authors:'xiahua,xiatian',year:5000};
```

如果传入的第二个参数是函数，接受两个参数：属性名和属性值

如果函数返回了undefined，那么相应的属性会被忽略

####字符串缩进

JSON.stringify()的第三个参数，如果是一个数值，表示每个级别缩进的空格数，最大的缩进空格为10，所有大于10的值都会被自动转换为10

如果缩进参数是一个字符串，这个字符串在JSON字符串中被用作缩进字符

###toJSON()方法

toJSON()返回对象自身的JSON数据格式

```javascript
var book2 = {
    title : 'css权威指南',
    authors : ['xinxin', 'linda'],
    edition : 5,
    year : 2016,
    toJSON:function(){
        return this.title;
    }
};
var jsonText5=JSON.stringify(book2);
console.log(jsonText5);//"css权威指南"
```

对象将会被序列化为一个简单的字符串而非对象

把一个对象传入JSON.stringify()方法，序列化该对象的顺序如下

1. 如果存在toJSON()方法切能够通过它取得有效的值，则调用该方法，否则按默认顺序执行

2. 如果提供了第二个参数，应用这个函数过滤器，传入函数过滤器的值是第一步返回的值

3. 对第二步返回的每个值进行相应的序列化

4. 如果提供了第三个参数，执行相应的格式化


##解析选项

parse（）把json字符串解析为javascript对象

	var jsoncopy4=JSON.parse(jsonText);
    console.log(jsoncopy4);

parse（）可以接受第二个参数，该参数是一个函数，将在每个键值对上调用

```javascript
var book6 = {
    title : 'css权威指南',
    authors : ['xinxin', 'linda'],
    edition : 5,
    year : 2016,
    releaseDate:new Date(2011,11,1)
};
var jsonText6=JSON.stringify(book6);
var bookcopy6=JSON.parse(jsonText6,function(key,value){
	if(key=="releaseDate"){
		return new Date(value);
	}else{
		return value;
	}
});
console.log(bookcopy6);
```

###浏览器支持

支持原生JSON对象的浏览器：IE8+，Firefox3.5+，Safari4+，Opera4+，Chrome