module.exports = {

  isEmpty: function (obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
    	//console.log(key);
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
  },
  validateString: function(string,pattern) {  
	//var string = input.value;
    var validate = false;
	//console.log("string:"+string+" | pattern:"+pattern);
    //var rule = $(input).data("rule");
	//pattern = pattern || "";
  if( ! pattern) return validate;
	var rules = pattern.toString().split('|');
	var l = rules.length;
	
	rules.forEach(function(rule) {
	  //var rule = rules[i];
	  //console.log(rule+" : "+string);
	  switch(rule) {

        case 'required': 
        validate = (undefined == typeof string || string.length == 0) ? false : true;        
        break;

        case 'email':
        var regExp = /^[\w-\.]+@[\w-]+\.[a-z]{2,10}$/i; 
        validate = regExp.test(string);        
        break;

        case 'phone':
        var regExp = /^\+\d[\d\(\)\ -]{4,20}\d$/; 
        validate = regExp.test(string);        
        break;

      }
      if( ! validate) {
        //$(input).addClass("error");         
        return false;
      }	
	});
	
	return validate;
	
  },
  validateError: null

}