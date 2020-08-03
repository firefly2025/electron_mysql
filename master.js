var fs = require("fs"),
  watch = require('watch'),
  childProcess = require('child_process'),

  serverName = "server.js",

  server = childProcess.fork(serverName, ['normal']); //子进程启动server

//监听config文件的改动
fs.watchFile(serverName, serverChange);

server.on('uncaughtException', function(e) {
  console.log("master on error");　　
  console.log(e);
  serverChange();
});

process.on('exit', function() {　　
  console.log('master exit!');　　
  console.log('Bye.');
});

process.on('uncaughtException', function(e) {
  console.log("master on error");
  console.log(e);
  serverChange();
});

function serverChange() {
  console.log("master: ", "server change!");
  killServer();

  server = childProcess.fork(serverName, ['normal']);
  console.log("master: ", "new server is built!");
}

function killServer() {
  try {
    process.kill(server.pid);
  } catch (ex) {
    console.log("master: ", ex);
  }
}


if (/windows/ig.test(process.env.OS)) {
  /*自动化监视代码 并更新缓存  仅在windows下启动*/
  // watch.watchTree(__dirname + "/lib/", handlerChange); //lib文件发生变化清除该项缓存
  // watch.watchTree(__dirname + "/handler/", handlerChange); //handler文件发生变化清除该项缓存
  // watch.watchTree(__dirname + "/conf/", handlerChange); //conf文件发生变化清除该项缓存
  // watch.watchTree(__dirname + "/sql/", handlerChange); //conf文件发生变化清除该项缓存
  // watch.watchTree(__dirname + "/api/", handlerChange); //conf文件发生变化清除该项缓存

  function handlerChange(f, curr, prev) { //服务变化
    if (typeof f == "object" && prev === null && curr === null) {
      // Finished walking the tree
    } else if (prev === null) {
      // f is a new file
      // var rs=require(f);
    } else if (curr.nlink === 0) {
      console.log("handler file delete " + f);
      delete require.cache[f]; //删除

    } else {
      serverChange();
      //var rs = require(f); //重新加载改资源  确保下次使用能快速
      //console.log(rs.toString());
    }
  }
}