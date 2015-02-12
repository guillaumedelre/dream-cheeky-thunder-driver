define([], function(){
	return function(callback, p1, p2) {
	  return function () {
	    callback(p1, p2);
	  };
	};
});