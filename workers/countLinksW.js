
self.addEventListener("message", function(e) {
    var aaa = JSON.parse(e.data);

    console.log("------esta no worker------");

    var result = "";

    if (aaa[aaa.length -1]) {
        result = "tamanho: " + aaa.length + " - id 1: " + aaa[0].id + " - id 2: " + aaa[aaa.length - 1].id;
        self.postMessage({ "finnish": "no", "msg": result});
    }
    else {
        result = "tamanho: " + aaa.length + " - id 1: " + aaa[0].id + " - id 2: --";

        self.postMessage({ "finnish": "yes", "msg": result});
    }

}, false);
