
function timedCount() {
  postMessage("exec");
  console.log(1111);
  getInformation(1);
  setTimeout("timedCount()",500);
}


function aaa(aa) {
    alert(aa);
}

timedCount();