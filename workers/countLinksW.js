var currTimer = 200;

self.addEventListener("message", function(e) {
  console.log(e.data);

  var aaa = JSON.parse(e.data);

  console.log("------------");
  console.log(aaa.length);
  var isdeleted = readCookie("isdeleted");
  if (isdeleted && isdeleted.length > 0) {
    console.log("-----33333-------");
    console.log(isdeleted);
    createCookie("isdeleted", Number(isdeleted) + 1);
  }
  else {
    createCookie("isdeleted", "0");
  }
}, false);

function timedCount() {
  postMessage("exec");


}

function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";               

    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
