
self.addEventListener("message", function(e) {
    var inputArray = JSON.parse(e.data);

    var result = "";

    //result = "tamanho: " + inputArray.length + " - id 1: " + inputArray[0].id + " - id 2: " + inputArray[inputArray.length - 1].id;

    processCount(inputArray);

    if (inputArray[inputArray.length -1]) {
        self.postMessage({ "finnish": "no", "result": ""});
    }
    else {

        var result = {};

        result.counters = JSON.stringify(Array.from(counters.entries()));
        result.tagsmap = JSON.stringify(Array.from(tagsmap.entries()));
        result.total_y = total_y;
        result.total_t = total_t;
        result.total_h = total_h;
        result.total = total;

        
        self.postMessage({ "finnish": "yes", "result": result});

        resetVars();
    }

}, false);


var counters = new Map();
var tagsmap = new Map();
var total_y = 0;
var total_t = 0;
var total_h = 0; 
var total = 0;   

function processCount(inputArray, showDeleted) {
  
/*     setTimeout(function() {     
        var result = {};

        self.postMessage({ "finnish": "yes", "result": result});
    }, 8500); */

    console.log(inputArray)
    for (var i = 0; i < inputArray.length; i++) {
        var val = inputArray[i];
        console.log(val.id)
        if (val.deleted != "yes") {
            

            console.log("aaaaa 22222")
            if (val.type == "T") {
                total_t = total_t + 1;
            }
            else if (val.type == "Y") {
                total_y = total_y + 1;
            }
            else {
                total_h = total_h + 1;
            }
            total = total + 1;
            console.log("aaaaa 333333")
        }   
    }
} 


function resetVars() {
    counters = new Map();
    tagsmap = new Map();
    total_y = 0;
    total_t = 0;
    total_h = 0;  
    total = 0;   
}
