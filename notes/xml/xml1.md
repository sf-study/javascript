##浏览器对XML DOM的支持

###DOM2级核心

创建空白的XML文档

```javascript
var xmldom = document.implementation.createDocument('', 'root', null);
console.log('name of xmldom is:' + xmldom.documentElement.tagName);//name of xmldom is:root
var child = xmldom.createElement('child');
xmldom.documentElement.appendChild(child);
```

变量xmldom中保存着一个DOM2级的Document类型的实例，带有多有DOM方法和属性

在实际开发中，很少需要从头开始创建一个XML文档，然后再使用DOM文档为其添加元素，更常见的情况往往是将某个XML文档解析为DOM结构，或者反之

###DOMParser类型

为了将DOM文档解析为DOM文档，首先应先创建一个DOMParser的实例，然后在调用parseFromString()方法，这个方法接受两个参数：要解析的XML字符串和内容类型，返回一个Document的实例，所以可以DOM方法操作返回的这个文档

```javascript
var parser = new DOMParser();
var xmldom2 = parser.parseFromString('<root><child></child></root>', 'text/xml');
console.log('name of xmldom2 is:' + xmldom2.documentElement.tagName);
console.log('xmldom2 firstChild is:' + xmldom2.documentElement.firstChild.tagName);
var anotherchild = xmldom2.createElement('child');
xmldom2.documentElement.appendChild(anotherchild);
var child2 = xmldom2.getElementsByTagName('child');
console.log('xmldom2 child length:' + child2.length);
```

DOMParser，只能解析格式良好的XML，因此不能把HTML解析问HTML文档，在发生错误时，仍然会从parseFromString()返回一个Document对象，但这个对象的文档元素是parsererror，文档元素的内容是对解析错误的描述

```javascript
var parser3 = new DOMParser(), xmldom3, errors3;
try {
    xmldom3 = parser3.parseFromString('<root>', 'text/xml');
    errors3 = xmldom3.getElementsByTagName('parsererror');
    if (errors3.length > 0) {
        throw new Error('parser error');
    }

} catch (e) {
    console.log('parser error!!');
}
```

####浏览器兼容

ie9,safari,chrome,firefox,opera

###XMLSerializer类型

XMLSerializer类型：将DOM文档序列化为字符串

要序列化DOM文档，首先必须创建XMLSerializer类型的实例，然后将文档传入其serializeToString()方法

```javascript
var serializer = new XMLSerializer();
var xml = serializer.serializeToString(xmldom);
console.log(xml);
```

将非DOM对象传入serializeToString()方法，将会报错

####浏览器兼容

ie9+,safari,chrome,firefox,opera

###IE8及之前版本的XML

通过这个AxtiveXObject类型，可以创建ACtiveX对象的实例，同样，要创建XML文档的实例，也要使用AxtiveXObject类型构造函数，为其传入一个表示XML文档版本的字符串，有六种不同的XML文档版本可以使用：

+ Microsoft.XmlDom:最初随同IE发布，不建议使用

+ MSXML2.DOMDocument:为方便脚本处理而更新的版本，建议在特殊情况下作为后背版本使用

+ MSXML2.DOMDocument.3.0:为了在javascript中使用，这是最低的新建版本

+ MSXML2.DOMDocument.4.0:在通过脚本处理时并不可靠，使用这个版本可能导致安全警告

+ MSXML2.DOMDocument.5.0:在通过脚本处理时并不可靠，使用这个版本可能导致安全警告

+ MSXML2.DOMDocument.6.0：通过脚本能够可靠处理的最新版本

在这六个版本中，微软只推荐使用MSXML2.DOMDocument.6.0或MSXML2.DOMDocument.3.0，前者是最新最可靠的版本，而后者是大多数Windows操作系统都支持的版本。

作为后背版本使用的MSXML2.DOMDocument，仅在针对IE5.5之前的浏览器开发时才有必要使用

通过尝试创建每个版本的实例，并观察是否有错发生，可以确定使用哪个版本

```javascript
function createDocument() {
if ( typeof arguments.callee.activeXString != 'string') {
    var versions = ['MSXML2.DOMDocument.6.0', 'MSXML2.DOMDocument.3.0', 'MSXML2.DOMDocument.6.0'], i, len;
    for ( i = 0, len = versions.length; i < len; i++) {
        try {
            new ActiveXObject(versions[i]);
            arguments.callee.activeXString = versions[i];
            break;
        } catch(e) {
            //
        }
    }
}
return new ActiveXObject(arguments.callee.activeXString);
}

createDocument();
```

####在IE中解析XML

首先必须创建一个DOM文档，然后调用loadXML()方法，然后才可以像操作DOM文档一样操作他

```javascript
var xmldom = createDocument();
xmldom.loadXML('<root><child></child></root>');

console.log('dom tagname:' + xmldom.documentElement.tagName);
console.log('first tag Name :' + xmldom.documentElement.firstChild.tagName);
```

如果解析过程中出错，可以在parseError属性中找到错误消息，该属性保存着错误消息的某一方面的特征：

+ errorCode:发生错误的数值编码，在没有发生错误的时候值为0

+ filePos:文件中导致错误发生的位置

+ line:发生错误的行

+ linepos:发生错误的行中的字符

+ reason:对错误的文本解释

+ srcText:导致错误的代码

+ url:导致错误的文件的URL

parseError属性的valueOf()方法返回errorCode的值

####序列化XML

IE将序列化XML的能力内置在了DOM文档中，每个DOM节点都有一个xml属性，其中保存着该节点的XML字符串

	console.log('序列化xmldom:' + xmldom.xml);

####加载XML文件

IE的XML对象也可以加载来自服务器的文件，要加载的XML文档必须与页面中运行的Javascript代码来自同一台服务器

加载文档的方式分为同步和异步两种

确定了加载文档的方式后，调用load()可以启动下载过程，这个方法接受一个参数：要加载的XML文件的URL

同步加载方式下，调用load后可以立即检测解析错误并执行相关的XML处理

```javascript
var xmldom3 = createDocument();
xmldom3.async = false;
//同步加载
xmldom3.load('student.xml');
if (xmldom3.parseError != 0) {
    //
} else {
    console.log(xmldom3.documentElement.tagName);
    console.log(xmldom3.documentElement.firstChild.tagName);
    var anc = xmldom3.createElement('age');
    xmldom3.documentElement.appendChild(anc);
    var children = xmldom3.getElementsByTagName('name');
    console.log('name子元素的个数' + children.length);
    console.log(xmldom3.xml);
}
```

在异步加载方式下，需要为XML DOM文档的onreadystatechange事件指定处理程序，该事件处理程序有四个就绪状态：

+ 1：DOM正在加载数据

+ 2：DOM已经加载数据

+ 3 ：DOM已经可以使用，但某些部分可能还无法访问

+ 4：DOM已经完全可以使用

```javascript
var xmldom4 = createDocument();
xmldom4.async = true;
//异步加载

xmldom4.onreadystatechange = function() {
    if (xmldom4.readyState == 4) {
        if (xmldom4.parseError != 0) {
            alert(1);
        } else {
            console.log(xmldom4.documentElement.tagName);
            console.log(xmldom4.documentElement.firstChild.tagName);
            var anc = xmldom4.createElement('age');
            xmldom4.documentElement.appendChild(anc);
            var children = xmldom4.getElementsByTagName('color');
            console.log('color子元素的个数' + children.length);
            console.log(xmldom4.xml);
        }
    }
};
xmldom4.load('dress.xml');
```

onreadystatechange事件指定处理程序的语句，必须在调用load()方法语句之前

在事件处理程序的内部，必须使用XML文档变量的名称，不能使用this对象，元婴是ActiveX空间为预防安全问题，不允许使用this对象

###跨浏览器处理XML

####解析XML

parseXml()，接受一个参数：可解析的XML字符串

####序列化XML

serializeXml()，接受一个参数：要序列化的XML DOM文档