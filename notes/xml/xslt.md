XSL 指扩展样式表语言,XSL 可描述如何来显示 XML 文档！

XSLT 是一种用于将 XML 文档转换为 XHTML 文档或其他 XML 文档的语言。

XSLT 使用 XPath 在 XML 文档中进行导航。

一种用于转换 XML 文档的语言。

#IE中的XSLT

##简单的XSLT转换

使用XSLT样式表转换XML文档最简单的方式，就是将它们分别加到一个DOM文档中，然后再使用transformNode()方法。

这个方法存在于文档中的所有节点，它接受一个参数即包含XSLT样式表的文档。返回一个包含转换信息的字符串

