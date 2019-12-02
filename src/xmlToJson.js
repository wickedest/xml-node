const convert = require('xml-js');

exports = module.exports = function (req, cb) {
	var convertAsString = false;
	var xmlData = req.params.xmlData;
	var asString = req.params.asString;

	const removeJsonTextAttribute = function(value, parentElement) {
	  try {
	    const parentOfParent = parentElement._parent;
	    const pOpKeys = Object.keys(parentElement._parent);
	    const keyNo = pOpKeys.length;
	    const keyName = pOpKeys[keyNo - 1];
	    const arrOfKey = parentElement._parent[keyName];
	    const arrOfKeyLen = arrOfKey.length;
	    if (arrOfKeyLen > 0) {
	      const arr = arrOfKey;
	      const arrIndex = arrOfKey.length - 1;
	      arr[arrIndex] = value;
	    } else {
	      parentElement._parent[keyName] = value;
	    }
	  } catch (e) {}
	};

	var options = {
    compact: true,
    trim: true,
    nativeType: true,
    ignoreDeclaration: true,
    ignoreInstruction: true,
    ignoreAttributes: true,
    ignoreComment: true,
    ignoreCdata: true,
    ignoreDoctype: true,
    textFn: removeJsonTextAttribute
  };

	if (!xmlData) {
		// invoking the callback with an error will terminate the flow.
		return cb('invalid argument');
	}
	if(asString) {
		var convertAsString = true;
	}
	if(convertAsString) {
		console.log("Converting given XML data into a JSON-String.");
		var result1 = convert.xml2json(xmlData, options);
	} else {
		console.log("Converting given XML data into a JS-Object.");
		var result1 = convert.xml2js(xmlData, options);
	}
	cb.next(null, result1);
};
