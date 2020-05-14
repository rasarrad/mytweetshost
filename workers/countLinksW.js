var currTimer = 200;

self.addEventListener("message", function(e) {
  console.log(e.data);

  var aaa = JSON.parse(e.data);

  console.log("------------");
  console.log(aaa.length);
}, false);

function timedCount() {
  postMessage("exec");


}
