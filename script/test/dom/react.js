var model = {
	a: 10,
	b: 1
}

var map = {
	dom: function(obj) {
		return `a=[${obj.a}],b=[${obj.b}]`
	}
}


function bindModelMap(obj, map) {

}



var data = bindModelMap(model, map);


model.a = 100;
sss

console.log(data.dom);