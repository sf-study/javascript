#浏览器对XPath的支持

XPath是设计用来在DOM文档中查找节点的一种手段

#DOM3级XPath

XPath规范定义的类型中，最重要的两个类型是：XPathEvaluator和XPathResult

##XPathEvaluator

XPathEvaluator用于在特定的上下文中对XPatha表达式求值，该类型有下列三个方法

+ createExpression(expression,nsresolver)，将XPath表达式级响应的命名空间信息转换成一个XPathExpression，这是查询的编译版，在多次使用同一个查询的时候很有用

+ createNSResolver(node)，根据node的命名空间信息创建一个新的XPathNSResolver对象，在基于使用命名空间的XML文档求值时，需要使用XPathNSResolver对象

+ evaluate(expression,context,nsresolver,type,result)，在给定的上下文中，基于特定的命名空间信息来对XPath表达式求值，剩下的参数指定如何返回结果

###evaluate()

evaluate()方法是最常用的，该方法接受5个参数：XPatha表达式，上下文节点，命名空间求解器（如果没有命名空间，则为null），返回结果的类型和保存结果的XPathResult对象，result通常为null

返回结果的类型取值范围：

+ XPathResult.ANY_TYPE，返回与XPath表达式匹配的数据类型

+ XPathResult.NUMBER_TYPE，返回值

+ XPathResult.STRING_TYPE，返回字符串值

+ XPathResult.BOOLEAN_TYPE，返回布尔值

+ XPathResult.UNORDERED_NODE_ITERATOR_TYPE，返回匹配的节点集合，但集合中节点的次序不一定与他们在文档中的次序一致

+ XPathResult.ORDERED_NODE_ITERATOR_TYPE，返回匹配的节点集合，集合中节点的次序与他们在文档中的次序一致，这是最常用的结果类型

+ XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE，返回节点集合的快照，由于是在文档外部捕获节点，因此对文档的后续操作不会影响到这个节点集合，集合中节点的次序不一定与他们在文档中的次序一致

+ XPathResult.ORDERED_NODE_SNAPSHOT_TYPE，返回节点集合的快照，由于是在文档外部捕获节点，因此对文档的后续操作不会影响到这个节点集合，集合中节点的次序与他们在文档中的次序一致

+ XPathResult.ANY_UNORDERED_NODE_TYPE，返回匹配的节点集合，但集合中节点的次序不一定与他们在文档中的次序一致

+ XPathResult.FIRST_ORDERED_NODE_TYPE，返回只包含一个节点的节点集合，包含的这个节点就是文档中第一个匹配的节点

evaluate()方法，如果没有节点匹配XPath表达式，返回null，否则返回一个XPathResult对象

```javascript
var result = xmldom.evaluate('/a/b', xmldom.documentElement, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
console.log(result);
```

这个对象带有属性和方法，可以用来取得特定类型的结果

####单节点结果

XPathResult.FIRST_ORDERED_NODE_TYPE会返回第一个匹配的节点，可以通过singleNodeValue属性来访问节点

```javascript
var result2 = xmldom.evaluate('/a/b', xmldom.documentElement, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
console.log(result2);
if (result2 !== null) {
    console.log('2第一个匹配的节点：' + result2.singleNodeValue.tagName);
}
```

####简单类型结果

XPathResult.NUMBER_TYPE， XPathResult.STRING_TYPE，XPathResult.BOOLEAN_TYPE可以取得简单的非节点数据类型，

```javascript
var result3 = xmldom.evaluate('/a/c', xmldom.documentElement, null, XPathResult.BOOLEAN_TYPE, null);
console.log(result3);
if (result3 !== null) {
    console.log('3存在匹配的节点吗？？？？' + result3.booleanValue);
}

var result4 = xmldom.evaluate('count(/a/b)', xmldom.documentElement, null, XPathResult.NUMBER_TYPE, null);
console.log(result4);
if (result4 !== null) {
    console.log('4匹配的节点个数：' + result4.numberValue);
}

var result5 = xmldom.evaluate('/a/b', xmldom.documentElement, null, XPathResult.STRING_TYPE, null);
console.log(result5);
if (result5 !== null) {
    console.log('5匹配的节点的内容为：' + result5.stringValue);
}
```

####默认类型的结果

XPathResult.ANY_TYPE可以自动确定返回结果的类型，可以通过检测结果的resultType属性，来确定返回的是什么结果类型

```javascript
var result6 = xmldom.evaluate('/a/b', xmldom.documentElement, null, XPathResult.NAY_TYPE, null);
console.log(result6);
if (result6 !== null) {
    switch(result6.resultType) {
        case XPathResult.BOOLEAN_TYPE:
            console.log('6存在匹配的节点吗？？？？' + result6.booleanValue);
            break;

        case XPathResult.NUMBER_TYPE:
            console.log('6匹配的节点个数：' + result6.numberValue);
            break;

        case XPathResult.STRING_TYPE:
            console.log('6匹配的节点的内容为：' + result6.stringValue);
            break;

        case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
            var element6 = result6.iterateNext();
            while (element6) {
                console.log('6匹配的节点：' + element6.tagName);
                element6 = result6.iterateNext();
            }
            break;

        default:
        //
    }
}
```

####命名空间的支持

```javascript
var xmldom = (new DOMParser()).parseFromString("<?xml version=\"1.0\"?><wrox:books xmlns:wrox=\"http://www.wrox.com/\"><wrox:book><wrox:title>Professional JavaScript for Web Developers</wrox:title><wrox:author>Nicholas C. Zakas</wrox:author></wrox:book><wrox:book><wrox:title>Professional Ajax</wrox:title><wrox:author>Nicholas C. Zakas</wrox:author><wrox:author>Jeremy McPeak</wrox:author><wrox:author>Joe Fawcett</wrox:author></wrox:book></wrox:books>", "text/xml");
// 创建XPathNSResolver
var nsresolver = xmldom.createNSResolver(xmldom.documentElement);
console.log(xmldom);
console.log(xmldom.documentElement);
var result = xmldom.evaluate("wrox:book/wrox:author", 
                             xmldom.documentElement, nsresolver,
                             XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
```

###IE中的XPath

IE对XPath的支持是内置在基于ActiveX的XML DOM文档对象中的，为了在IE9之前的版本使用XPath，必须基于ActiveX的实现

这个接口在每个节点上额外定义两个方法：selectSingleNode()和selectNodes()

selectSingleNode()方法接受一个XPath模式，在找到匹配的节点时返回第一个匹配的节点，如果没有，返回null

    var element = xmldom.documentElement.selectSingleNode("/a/b");
    p = element.xml + '<br/>';

selectNodes()，也方法接受一个XPath模式，返回与模式匹配的所有节点的NodeList，如果没有则返回一个为0 的nodelist

    var element = xmldom1.documentElement.selectNodes("/a/b");
    p += element.length + '<br/>';

####IE对命名空间的支持

在IE中处理包含命名空间的XPath表达式，你必须知道自己使用的命名空间，并按照下列的格式创建一个字符串

    "xmlns:prefix1='uri1' xmlns:prefix2='uri2' xmlns:prefix3='uri3'"

然后将这个字符串传入到XML DOM文档对象的setProperty()方法中，这个方法接受两个参数：要设置的属性名和属性值

    xmldom2.setProperty('SelectionNamespaces', "xmlns:b='http://192.168.0.116/'");
    var result = xmldom.documentElement.selectNodes('b:books/b:book');

###跨浏览器使用XPath

####跨浏览器selectSingleNode()

```javascript
function selectSingleNode(context, expression, namespaces){
var doc = (context.nodeType != 9 ? context.ownerDocument : context);

if (typeof doc.evaluate != "undefined"){
    var nsresolver = null;
    if (namespaces instanceof Object){
        nsresolver = function(prefix){
            return namespaces[prefix];
        };
    }
    
    var result = doc.evaluate(expression, context, nsresolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    return (result !== null ? result.singleNodeValue : null);

} else if (typeof context.selectSingleNode != "undefined"){

    //create namespace string
    if (namespaces instanceof Object){
        var ns = "";
        for (var prefix in namespaces){
            if (namespaces.hasOwnProperty(prefix)){
                ns += "xmlns:" + prefix + "='" + namespaces[prefix] + "' ";
            }
        }
        doc.setProperty("SelectionNamespaces", ns);
    }
    return context.selectSingleNode(expression);
} else {
    throw new Error("No XPath engine found.");
}
}
```

selectSingleNode()接受三个参数：上下文节点，XPath表达式和可选的命名空间对象

####跨浏览器selectNodes()

```javascript
function selectNodes(context, expression, namespaces){
var doc = (context.nodeType != 9 ? context.ownerDocument : context);

if (typeof doc.evaluate != "undefined"){
    var nsresolver = null;
    if (namespaces instanceof Object){
        nsresolver = function(prefix){
            return namespaces[prefix];
        };
    }
    
    var result = doc.evaluate(expression, context, nsresolver, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var nodes = new Array();
    
    if (result !== null){
        for (var i=0, len=result.snapshotLength; i < len; i++){
            nodes.push(result.snapshotItem(i));
        }
    }
    
    return nodes;
} else if (typeof context.selectNodes != "undefined"){

    //create namespace string
    if (namespaces instanceof Object){
        var ns = "";
        for (var prefix in namespaces){
            if (namespaces.hasOwnProperty(prefix)){
                ns += "xmlns:" + prefix + "='" + namespaces[prefix] + "' ";
            }
        }
        doc.setProperty("SelectionNamespaces", ns);
    }
    var result = context.selectNodes(expression);
    var nodes = new Array();
    
    for (var i=0,len=result.length; i < len; i++){
        nodes.push(result[i]);
    }
    
    return nodes;
} else {
    throw new Error("No XPath engine found.");
}
}
```

selectNodes()接受三个参数：上下文节点，XPath表达式和可选的命名空间对象