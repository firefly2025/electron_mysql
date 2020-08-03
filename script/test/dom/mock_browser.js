var cheerio = require("cheerio");
var request = require("request");
// var got = require("got");

function Browser() {
	this.window = {};
	this.document = {};
	this.open = function(url) {

		requestUrl(url).then(function(ret) {
			//console.log("got", ret);

			var $ = cheerio.load(ret);
			console.log($("script").length);
		})

		//如果是本地文件  如果是服务器地址   request拉取内容
		//解析内容  首先是dom的解析
		//然后是script的加载和 运行  
		//script 如何加载
		// 1.片段  2.文件  3.动态文件
		//静态内容 new Function() 把常用对象都传递进去  window  document setInterval 
		//console
		//激发事件  window.onload 
		//
	}
}


function requestUrl(url, option) {
	var opt = option || {};
	opt.method = opt.method || "GET";
	opt.url = url;

	return new Promise(function(resolve, reject) {
		request(opt, function(err, res, body) {
			//console.log("body", body);

			resolve(body);
		})
	})

}

function test() {
	var url = "http://127.0.0.1/web/index.html";
	var browser = new Browser();
	console.log("browser", browser);
	browser.open(url);

}



if (process && process.mainModule && process.mainModule.filename == __filename) {
	test();
}