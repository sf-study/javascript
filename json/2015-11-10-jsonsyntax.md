###json语法

**简单值：**

字符串类型的必须用双引号，否则就会导致语法错误

**json对象：**

json要求给属性加双引号,属性的之可以是简单类型的，也可以是复杂类型值

	{
		"name":"xiahua",
		"age":22,
		"school":{
			"name":"jialidun",
			"location":"jinhailu"
		}
	}

**json数组：**

	[25,"hi",true]

把数组和对象结合使用

	{
		"name":"xiahua",
		"age":22,
		"school":{
			"name":"jialidun",
			"location":"jinhailu"
		},
		"pre":["a","b","c"]
	}

###方法

**序列化**

stringify（）把javascript对象序列化为json字符串

	<script type="text/javascript">
		var book={
			title:'javascript',
			authors:['xiahua','xiatian'],
			edition:3,
			year:2011
		};
		var jsonText=JSON.stringify(book);
		console.log(jsonText);//{title:'javascript',authors:['xiahua','xiatian'],edition:3,year:2011};
		var jsonText2 = JSON.stringify(book, ["title", "edition"], 4);
        console.log(jsonText2);
        //{title:'javascript',edition:3};每个级别缩进四个字符

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

        var jsonText4 = JSON.stringify(book,null,"--");
        console.log(jsonText4);
        //第三个参数传入符号，返回的值符号代替缩进的空格
	</script>

**parse（）**

parse（）把json字符串解析为javascript对象

	var jsoncopy4=JSON.parse(jsonText);
    console.log(jsoncopy4);

第二个参数还原函数

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

**toJSON（）**

执行顺序很重要

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
    console.log(jsonText5);