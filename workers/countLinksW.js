
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
  
    console.log(inputArray)
    for (var i = 0; i < inputArray.length - 1; i++) {
        var val = inputArray[i];
        console.log(val.id)
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
