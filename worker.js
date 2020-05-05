var currTimer = 200;

self.addEventListener("message", function(e) {
  currTimer = Number(e.data.args);
}, false);

function timedCount() {
  postMessage("exec");

  console.log(currTimer);

  currTimeout = setTimeout("timedCount()", currTimer);
}

timedCount();