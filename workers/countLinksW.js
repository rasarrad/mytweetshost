var currTimer = 200;

self.addEventListener("message", function(e) {
  console.log(e);

}, false);

function timedCount() {
  postMessage("exec");


}
