
function timedCount() {
  postMessage("exec");
  console.log(1111);
  setTimeout("timedCount()",500);
}

timedCount();