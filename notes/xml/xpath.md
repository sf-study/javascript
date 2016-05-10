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

