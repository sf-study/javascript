function createDocuments() {
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

// 解析
function parseXml(xml) {
    var xmldom = null;
    if ( typeof DOMParser != 'undefined') {
        //其他浏览器中处理xml
        xmldom = (new DOMParser()).parseFromString(xml, 'text/xml');
        var error = xmldom.getElementsByTagName('parsererror');
        if (error.length) {
            throw new Error('XML parsing error:' + error[0].textContent);
        }
    } else if ( typeof ActiveXObject != 'undefined') {
        //在ie中处理xml
        xmldom = createDocuments();
        xmldom.load(xml);
        if (xmldom.parseError != 0) {
            throw new Error('XML parsing error:' + xmldom.parseError.reason);
        }
    } else {
        throw new Error('No XML parser available');
    }
    return xmldom;
}

// 序列化
function serializeXml(xmldom){
   
    if (typeof XMLSerializer != "undefined"){
        return (new XMLSerializer()).serializeToString(xmldom);
    } else if (typeof xmldom.xml != "undefined"){
        return xmldom.xml;
    } else {
        throw new Error("Could not serialize XML DOM.");
    }
}