
function timedCount() {
  postMessage("exec");

  setTimeout("timedCount()",200);
}

timedCount();