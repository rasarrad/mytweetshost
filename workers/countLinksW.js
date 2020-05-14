var currTimer = 200;

self.addEventListener("message", function(e) {
  console.log(e.data.args);

  var aaa = JSON.parse(e.data.args);

  console.log("------------");
  console.log(aaa.length);
}, false);

function timedCount() {
  postMessage("exec");


}
