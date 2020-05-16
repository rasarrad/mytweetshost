var currTimer = 200;
var counter = 0;
self.addEventListener("message", function(e) {
  currTimer = Number(e.data.args);
}, false);

function timedCount() {
  postMessage(counter);
  counter = counter + 1;

  setTimeout("timedCount()", currTimer);
}

timedCount();