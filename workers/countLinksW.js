
self.addEventListener("message", function(e) {
    var inputArray = JSON.parse(e.data.array);

    processCount(inputArray, e.data.includeDeleted);

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

function processCount(inputArray, includeDeleted) {
    
    sleep(300);

    if (includeDeleted) {
        for (var j = 0; j < inputArray.length; j++) {
            var val = inputArray[j];
    
            if (val.deleted != "yes") {
                var res = val.categories.split(" ");
                for (var i = 0; i < res.length; i++) {
                    if (counters.has(val.type + res[i])) {
                        var aux = counters.get(val.type + res[i]);
                        counters.set(val.type + res[i], aux + 1);
                    }
                    else {
                        counters.set(val.type + res[i], 1);
                    }
                }
                var tags = val.tags.toLowerCase().split(" ");
    
                for (var i = 0; i < tags.length; i++) {
                    if (tags[i].trim().length > 0) {
                        if (tagsmap.has(tags[i].trim())) {
                            var aux = Number(tagsmap.get(tags[i]));
    
                            tagsmap.set(tags[i].trim(), aux + 1);
                        }
                        else {
                            tagsmap.set(tags[i].trim(), 1);
                        }
                    }
                }
                if (val.type == "T") {
                    total_t = total_t + 1;
                }
                else if (val.type == "Y") {
                    total_y = total_y + 1;
                }
                else if (val.type == "H") {
                    total_h = total_h + 1;
                }
                total = total + 1;
            }   
        }
    }
    else  {
        for (var j = 0; j < inputArray.length; j++) {
            var val = inputArray[j];
    
            if (val.deleted == "") {
                
                var res = val.categories.split(" ");
                for (var i = 0; i < res.length; i++) {
                    if (counters.has(val.type + res[i])) {
                        var aux = counters.get(val.type + res[i]);
                        counters.set(val.type + res[i], aux + 1);
                    }
                    else {
                        counters.set(val.type + res[i], 1);
                    }
                }
                var tags = val.tags.toLowerCase().split(" ");
    
                for (var i = 0; i < tags.length; i++) {
                    if (tags[i].trim().length > 0) {
                        if (tagsmap.has(tags[i].trim())) {
                            var aux = Number(tagsmap.get(tags[i]));
    
                            tagsmap.set(tags[i].trim(), aux + 1);
                        }
                        else {
                            tagsmap.set(tags[i].trim(), 1);
                        }
                    }
                }
                if (val.type == "T") {
                    total_t = total_t + 1;
                }
                else if (val.type == "Y") {
                    total_y = total_y + 1;
                }
                else if (val.type == "H") {
                    total_h = total_h + 1;
                }
                total = total + 1;
            }   
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

function sleep(seconds) {
    var e = new Date().getTime() + (seconds);
    while (new Date().getTime() <= e) {}
}
