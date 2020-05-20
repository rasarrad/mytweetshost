
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function removetweet(obj) {
    if (obj)
        fixfocus(obj);

    if ($('#linkChange').attr("cid") != "new") {
        jsonvar = getJsonbyid($('#linkChange').attr("cid"));

        if (jsonvar) {
            if (jsonvar.deleted.length > 0) {
                try {
                    $( "#dialog-confirm-delete" ).dialog({
                        resizable: false,
                        height: "auto",
                        width: 400,
                        modal: true,
                        buttons: {
                          "Yes": function() {
                            jsonvar.deleted = "yes";
                            createCookie2(jsonvar.id, "isdeleted", "yes");
    
                            $("#main").empty();
                            $('#tweetcount').hide(); 
    
                            showMessage("Link Deleted Forever");
                            closeSettingsPopup();
                            $("#mask").fadeOut(500);
                            $("#dialog-confirm-delete").parent().fadeOut( 800, function() {
                              $("#dialog-confirm-delete").parent().remove();
                            });
                          },
                          "Restore": function() {
                            createCookie2($('#linkChange').attr("cid"), "isdeleted", "", null, true);
            
                            jsonvar.deleted = "";
                            updateLinkColor(jsonvar);
                            showMessage("Link Marked To Delete Reverted");
                              $("#mask").fadeOut(500);
                              $("#dialog-confirm-delete").parent().fadeOut( 800, function() {
                                $("#dialog-confirm-delete").parent().remove();
                              });
    
                          },
                          Cancel: function() {
                              $("#mask").fadeOut(500);
                              $("#dialog-confirm-delete").parent().fadeOut( 800, function() {
                                $("#dialog-confirm-delete").parent().remove();
                              });
                          }
                        }
                      });
                    } catch (error) {
                        
                    }
                    $("#dialog-confirm-delete").parent().css("top", ((window.innerHeight/2) - 100) + "px")
                    $("#mask").fadeIn(500);
                    $("#dialog-confirm-delete").parent().fadeIn(800);
            } 
            else {
                createCookie2($('#linkChange').attr("cid"), "isdeleted", "a");
                jsonvar.deleted = "a";
                updateLinkColor(jsonvar);

                showMessage("Link Marked To Delete");
            }
        }
        else {
            showMessage("Unknown System Error");
        }
    }
    else {
        create();
    }
}    

function updateLinkCookie(obj) {
    var link = "{\r\n\"id\": \"" + obj.id + "\",\r\n\"creationdate\": \"" + obj.creationdate  + "\",\r\n\"type\": \"" + obj.type  + "\",\r\n\"url\": \"" + obj.url  + "\",\r\n\"ishidden\": \"" + obj.ishidden  + "\",\r\n\"date\": \"" + obj.date + "\",\r\n\"author\": \"" + obj.author  + "\",\r\n\"categories\": \"" + obj.categories + "\",\r\n\"tags\": \"" + obj.tags + "\",\r\n\"info\": \"" + obj.info.replace(/"/g, "").replace(/(\r\n|\n|\r)/gm, "").trim() + "\",\r\n\"classif\": \"" + obj.classif + "\",\r\n\"deleted\": \"" + obj.deleted + "\",\r\n\"tweet\": \"" + obj.tweet + "\"\r\n},";

    var mlink = encodeURIComponent(JSON.stringify(link));
    
    createCookie(obj.id + "templink", mlink);
}

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function changetag(obj, id) {

    var text = readCookie(id + "tagchanged");

    $("#changetags").find('span.poptitle').text("Change tags")

    if (text)
        $("#changetags").find('input').val(text);
    else
        $("#changetags").find('input').val($(obj).attr('tagactual'));

    $("#changetags").attr('currid', id);
    $("#changetags").attr('iscat', "no");

    $("#changetags").fadeIn();
}   


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function acceptTag(obj) {
    var id = $(obj).parent().parent().attr("currid");

    var iscat = $("#changetags").attr('iscat');

    if (iscat && iscat == "yes") { 
        createCookie2(id, "catchanged", $(obj).parent().find('input').val());
    
        var text = readCookie(id + "tagchanged");
        if (text) {
            $('#' + id).find('.tags').css('background-image', 'linear-gradient(to right, rgb(247, 205, 205), rgb(177, 0, 0), rgb(247, 205, 205))');
        }
        else {
            $('#' + id).find('.tags').css('background-image', 'linear-gradient(to left, rgb(177, 0, 0), rgb(247, 205, 205))');
        }

        $('#' + id).find('.newcat').html('<b> New categories </b>' + $(obj).parent().find('input').val());   

        showMessage("Category Marked To Change");
    }
    else {
        createCookie2(id, "tagchanged", $(obj).parent().find('input').val());
    
        var text = readCookie(id + "catchanged");
        if (text) {
            $('#' + id).find('.tags').css('background-image', 'linear-gradient(to right, rgb(247, 205, 205), rgb(177, 0, 0), rgb(247, 205, 205))');
        }
        else {
            $('#' + id).find('.tags').css('background-image', 'linear-gradient(to right, rgb(177, 0, 0), rgb(247, 205, 205))');
        }

        $('#' + id).find('.newtag').html('<b> New tags </b>' + $(obj).parent().find('input').val());

        showMessage("Tag Marked To Change");
    }

    $("#changetags").fadeOut();
}   


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function undotag(obj) {
    var id = $(obj).parent().parent().attr("currid");

    var iscat = $("#changetags").attr('iscat');

    if (iscat && iscat == "yes") {
        eraseCookie(id + "catchanged");

        $(obj).parent().find('input').val($(obj).parent().find('#changecat').attr('catactual'));
        $('#' + id).find('.newcat').html('');

        var text = readCookie(id + "tagchanged");
        if (text) {
            $('#' + id).find('.tags').css('background-image', 'linear-gradient(to right, rgb(177, 0, 0), rgb(247, 205, 205))');
        }
        else {
            $('#' + id).find('.tags').css('background', '#00000021').css('border-bottom', '1px solid #00000038');
        }

        showMessage("Tag Marked To Change Reverted");
    }
    else {
        eraseCookie(id + "tagchanged");

        $(obj).parent().find('input').val($(obj).parent().find('#changetag').attr('tagactual'));
        $('#' + id).find('.newtag').html('');

        var text = readCookie(id + "catchanged");
        if (text) {
            $('#' + id).find('.tags').css('background-image', 'linear-gradient(to left, rgb(177, 0, 0), rgb(247, 205, 205))');
        }
        else {
            $('#' + id).find('.tags').css('background', '#00000021').css('border-bottom', '1px solid #00000038');
        }
        showMessage("Category Marked To Change Reverted");
    }

    $("#changetags").fadeOut();
}  


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function changecat(obj, id) {

    var text = readCookie(id + "catchanged");

    $("#changetags").find('span.poptitle').text("Change categories")

    if (text)
        $("#changetags").find('input').val(text);
    else
        $("#changetags").find('input').val($(obj).attr('catactual'));

    $("#changetags").attr('currid', id);

    $("#changetags").attr('iscat', "yes");

    $("#changetags").fadeIn();
}   


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

function countalltweets() {
    var path = "./data.json";
    allLinks = new Array();
    counterAllLinks = 0;
    nextid = null;
    try {
        nextid = parseInt(readCookie("maxid"));
    }
    catch(err) {
    }
    finally {
        if (nextid) {
            $("#maxid").val(nextid);
            nextid = nextid - 1;
        }
        else {
            nextid = parseInt($("#maxid").val());
            createCookie("maxid", nextid);
            nextid = nextid - 1;
        }
    }
    $.getJSON(path, function(data) 
    {
        if (showAll) {
            allLinks = data.Tweets;
        }

        var tempLinks = new Array();
        var tempCounter = 0;
        var processtmp = true;

        do {
            var linkcontent = readCookie(nextid + "templink");
            if (linkcontent) {
                var linktmp = decodeURIComponent(linkcontent);
                
                linktmp = linktmp.replace(/(?:\\[rn])+/g, "\\n");
                linktmp = linktmp.substring(1, linktmp.length - 2).replace(/(\\n)/gm, ""); 
                linktmp = linktmp.replace(/(\\)/gm, ""); 
                linktmp = JSON.parse(linktmp);
                    console.log(linktmp)
                tempLinks[tempCounter] = linktmp;
                tempCounter++;

                nextid--;
            }
            else {
                processtmp = false;
            }
        }
        while (processtmp);

        allLinks = tempLinks.concat(allLinks); 
        
        if (showAll) {
            allLinks.pop();
        }

        $( "#mask" ).fadeOut( 800, function() {
            var style = window.getComputedStyle(body, null);

            $("#mask").css("background", style.getPropertyValue('--soft-transp-color'));
            $("#mask .fa-folder-open").hide();
            $("#mask > div" ).hide();
            $("#mask > .fa-circle-o-notch").show();
        });

        processCountBlock(false, true);
    }); 
} 


function processCountBlock(hasAnyLinkChange, execParamId) {
    var i = counterAllLinks;

    try {
        if (execParamId) {
            for (i; i < counterAllLinks + 5; i++) {
                var val = allLinks[i];
        
                if (val.deleted != "yes") {
                    var haschanges = readCookie(val.id + "haschanges");
                    
                    if (haschanges) {
                        hasAnyLinkChange = true;
                        var isdeleted = readCookie(val.id + "isdeleted");
                        if (!(isdeleted && isdeleted == "yes")) {
                
                            val.deletedOri = val.deleted;
                            if (isdeleted) {
                                val.deleted = isdeleted;
                            } 
                
                            var cat = readCookie(val.id + "catchanged");
                            val.categoriesOri = val.categories;
                            if (cat) {
                                val.categories = cat;
                            }
    
                            var tag = readCookie(val.id + "tagchanged");
                            val.tagsOri = val.tags;
                            if (tag) {
                                val.tags = tag;
                            }
                
                            var info = readCookie(val.id + "info");
                            val.infoOri = val.info;
                            if (info) {
                                val.info = info;
                            }
                
                            var classif = readCookie(val.id + "classif");
                            val.classifOri = val.classif;
                            if (classif) {
                                val.classif = classif;
                            }
                            
                            var author = readCookie(val.id + "author");
                            val.authorOri = val.author;
                            if (author) {
                                val.author = author;
                            }
    
                            var datechanged = readCookie(val.id + "datechanged");
                            val.dateOri = val.date;
                            if (datechanged) {
                                val.date = datechanged;
                            }
                        } 
                    }
                    else {
                        val.deletedOri = val.deleted;
                        val.tagsOri = val.tags;
                        val.categoriesOri = val.categories;
                        val.infoOri = val.info;
                        val.classifOri = val.classif;
                        val.authorOri = val.author;
                        val.dateOri = val.date;

                        var isnew = readCookie(val.id + "isnew");
                        if (isnew) {
                            hasAnyLinkChange = true;
                        }
                    } 
                    allLinks[i] = val;  
                }
            }
        }
        else {
            for (i; i < counterAllLinks + 5; i++) {
                var val = allLinks[i];
        
                if (val.deleted != "yes") {
                    var haschanges = readCookie(val.id + "haschanges");
        
                    if (haschanges) {
                        hasAnyLinkChange = true;
                        var isdeleted = readCookie(val.id + "isdeleted");
                        if (!(isdeleted && isdeleted == "yes")) {
                
                            val.deletedOri = val.deleted;
                            if (isdeleted) {
                                val.deleted = isdeleted;
                            } 
                
                            var cat = readCookie(val.id + "catchanged");
                            if (cat) {
                                val.categories = cat;
                            }
    
                            var tag = readCookie(val.id + "tagchanged");
                            if (tag) {
                                val.tags = tag;
                            }
                
                            var info = readCookie(val.id + "info");
                            if (info) {
                                val.info = info;
                            }
                
                            var classif = readCookie(val.id + "classif");
                            if (classif) {
                                val.classif = classif;
                            }
                            
                            var author = readCookie(val.id + "author");
                            if (author) {
                                val.author = author;
                            }
    
                            var datechanged = readCookie(val.id + "datechanged");
                            if (datechanged) {
                                val.date = datechanged;
                            }
                        } 
                    }
                    else if (readCookie(val.id + "isnew")) {
                        hasAnyLinkChange = true;
                    } 
                    allLinks[i] = val;  
                }
            }
        }
    }
    catch(err) {
    }

    startCLWorker(JSON.stringify(allLinks.slice(counterAllLinks, counterAllLinks + 5)), hasAnyLinkChange, execParamId);
    
    counterAllLinks = counterAllLinks + 5;
} 




function processCountUpdate(countersParam, hasAnyLinkChange, execParamId) {

    if (hasAnyLinkChange) {
        if (showColorsAdv) {
            $("#generateicon").addClass("haschanges");
            if (showColors) {
                $("#settings").addClass("haschanges");
            }
        } 
    }
    else {
        $("#generateicon").removeClass("haschanges");
        $("#settings").removeClass("haschanges");
    }

    var tagsmap = new Map(JSON.parse(countersParam.tagsmap));
    var counters = new Map(JSON.parse(countersParam.counters));

    var o = new Option("notag", "notag");
    $(o).html("All Tags");
    $("#tagsselect").append(o);
    $("#tagsearchselect").append(o);
    var mapAsc = new Map([...tagsmap.entries()].sort());

    for (let [key, value] of mapAsc) {   
        o = new Option(key, key);
        $(o).html(key);
        $("#tagsselect").append(o);
        $("#tagsearchselect").append(o);
    }

    tagsmap[Symbol.iterator] = function* () {

        yield* [...this.entries()].sort((a, b) => b[1] - a[1]);
    
    }
    /*
    for (let [key, value] of tagsmap) {     // get data sorted
        o = new Option(key, key);
        $(o).html(key);
        $("#tagsselect").append(o);
    }*/


    $("#addpopup").css("top", "4000px");
    $("#addpopup").show();
    var hasOverflow = false;

    for (let [key, value] of tagsmap) {     // get data sorted
        /*
        if (!hasOverflow) {
            var elem = $("<li  onclick='javascript: clickLiTag(event, this)' class='litags'>" + key + "</li>");
            $("#tagsul").append(elem);
            if ($('#tagsul').isChildOverflowing(elem)) {
                hasOverflow = true;
                elem.remove();
            }
        }
            */
        var elem = $("<li  onclick='javascript: clickLiTag(event, this)' class='litags'>" + key + "</li>");
        $("#tagsul").append(elem);
        var elem2 = $("<li  onclick='javascript: clickLiTag(event, this)' class='litags'>" + key + "</li>");
        $('#tagsearchul').append(elem2);
    }  

    // All Links
    $("#all").text(countersParam.total);
    $("#all2").text(countersParam.total);
    $("#all").parent().attr("title", "Twitter: " + countersParam.total_t + " - Youtube: " + countersParam.total_y + " - Website: " + countersParam.total_h);
    $("#all2").parent().attr("title", "Twitter: " + countersParam.total_t + " - Youtube: " + countersParam.total_y + " - Website: " + countersParam.total_h);

    // New / Ongoing
    var toview = 0;
    var toviewT = 0;
    var toviewY = 0;
    var toviewH = 0;
    if (counters.has("Ttvn")) {
        toviewT = counters.get("Ttvn");
        toview = counters.get("Ttvn");
    }
    if (counters.has("Ytvn")) {
        toviewY = counters.get("Ytvn");
        toview = toview + counters.get("Ytvn");
    }
    if (counters.has("Htvn")) {
        toviewH = counters.get("Htvn");
        toview = toview + counters.get("Htvn");
    }

    $("#tvn").text(toview);
    $("#tvn").parent().attr("title", "Twitter: " + toviewT + " - Youtube: " + toviewY + " - Website: " + toviewH);
    $("#tvn2").text(toview);
    $("#tvn2").parent().attr("title", "Twitter: " + toviewT + " - Youtube: " + toviewY + " - Website: " + toviewH);

    // Hot / Trending
    var trending = 0;
    var trendingT = 0;
    var trendingY = 0;
    var trendingH = 0;
    if (counters.has("Ttrn")) {
        trendingT = counters.get("Ttrn");
        trending = counters.get("Ttrn");
    }
    if (counters.has("Ytrn")) {
        trendingY = counters.get("Ytrn");
        trending = trending + counters.get("Ytrn");
    }
    if (counters.has("Htrn")) {
        trendingH = counters.get("Htrn");
        trending = trending + counters.get("Htrn");
    }

    $("#trn").text(trending);
    $("#trn").parent().attr("title", "Twitter: " + trendingT + " - Youtube: " + trendingY + " - Website: " + trendingH);
    $("#trn2").text(trending);
    $("#trn2").parent().attr("title", "Twitter: " + trendingT + " - Youtube: " + trendingY + " - Website: " + trendingH);

    // To Watch
    var toview = 0;
    var toviewT = 0;
    var toviewY = 0;
    var toviewH = 0;
    if (counters.has("Ttvi")) {
        toviewT = counters.get("Ttvi");
        toview = counters.get("Ttvi");
    }
    if (counters.has("Ytvi")) {
        toviewY = counters.get("Ytvi");
        toview = toview + counters.get("Ytvi");
    }
    if (counters.has("Htvi")) {
        toviewH = counters.get("Htvi");
        toview = toview + counters.get("Htvi");
    }

    $("#tvi").text(toview);
    $("#tvi").parent().attr("title", "Twitter: " + toviewT + " - Youtube: " + toviewY + " - Website: " + toviewH);
    $("#tvi2").text(toview);
    $("#tvi2").parent().attr("title", "Twitter: " + toviewT + " - Youtube: " + toviewY + " - Website: " + toviewH);


    // Documentaries / Films
    var toview = 0;
    var toviewT = 0;
    var toviewY = 0;
    var toviewH = 0;
    if (counters.has("Ttvl")) {
        toviewT = counters.get("Ttvl");
        toview = counters.get("Ttvl");
    }
    if (counters.has("Ytvl")) {
        toviewY = counters.get("Ytvl");
        toview = toview + counters.get("Ytvl");
    }
    if (counters.has("Htvl")) {
        toviewH = counters.get("Htvl");
        toview = toview + counters.get("Htvl");
    }

    $("#tvl").text(toview);
    $("#tvl").parent().attr("title", "Twitter: " + toviewT + " - Youtube: " + toviewY + " - Website: " + toviewH);
    $("#tvl2").text(toview);
    $("#tvl2").parent().attr("title", "Twitter: " + toviewT + " - Youtube: " + toviewY + " - Website: " + toviewH);

    // Fast Reading
    var toread = 0;
    var toreadT = 0;
    var toreadY = 0;
    var toreadH = 0;
    if (counters.has("Ttre")) {
        toreadT = counters.get("Ttre");
        toread = counters.get("Ttre");
    }
    if (counters.has("Ytre")) {
        toreadY = counters.get("Ytre");
        toread = toread + counters.get("Ytre");
    }
    if (counters.has("Htre")) {
        toreadH = counters.get("Htre");
        toread = toread + counters.get("Htre");
    }
    $("#tre").text(toread);
    $("#tre").parent().attr("title", "Twitter: " + toreadT + " - Youtube: " + toreadY + " - Website: " + toreadH);
    $("#tre2").text(toread);
    $("#tre2").parent().attr("title", "Twitter: " + toreadT + " - Youtube: " + toreadY + " - Website: " + toreadH);

    // Long Reading
    var toread = 0;
    var toreadT = 0;
    var toreadY = 0;
    var toreadH = 0;
    if (counters.has("Ttrl")) {
        toreadT = counters.get("Ttrl");
        toread = counters.get("Ttrl");
    }
    if (counters.has("Ytrl")) {
        toreadY = counters.get("Ytrl");
        toread = toread + counters.get("Ytrl");
    }
    if (counters.has("Htrl")) {
        toreadH = counters.get("Htrl");
        toread = toread + counters.get("Htrl");
    }
    $("#trl").text(toread);
    $("#trl").parent().attr("title", "Twitter: " + toreadT + " - Youtube: " + toreadY + " - Website: " + toreadH);
    $("#trl2").text(toread);
    $("#trl2").parent().attr("title", "Twitter: " + toreadT + " - Youtube: " + toreadY + " - Website: " + toreadH);

    // Important / To Keep
    var tokeep = 0;
    var tokeepT = 0;
    var tokeepY = 0;
    var tokeepH = 0;
    if (counters.has("Ttke")) {
        tokeepT = counters.get("Ttke");
        tokeep = counters.get("Ttke");
    }
    if (counters.has("Ytke")) {
        tokeepY = counters.get("Ytke");
        tokeep = tokeep + counters.get("Ytke");
    }
    if (counters.has("Htke")) {
        tokeepH = counters.get("Htke");
        tokeep = tokeep + counters.get("Htk");
    }
    $("#tke").text(tokeep);
    $("#tke").parent().attr("title", "Twitter: " + tokeepT + " - Youtube: " + tokeepY + " - Website: " + tokeepH);
    $("#tke2").text(tokeep);
    $("#tke2").parent().attr("title", "Twitter: " + tokeepT + " - Youtube: " + tokeepY + " - Website: " + tokeepH);

    var imp = 0;
    var impT = 0;
    var impY = 0;
    var impH = 0;
    if (counters.has("Timp")) {
        impT = counters.get("Timp");
        imp = counters.get("Timp");
    }
    if (counters.has("Yimp")) {
        impY = counters.get("Yimp");
        imp = imp + counters.get("Yimp");
    }
    if (counters.has("Himp")) {
        impH = counters.get("Himp");
        imp = imp + counters.get("Himp");
    }
    $("#imp").text(imp);
    $("#imp").parent().attr("title", "Twitter: " + impT + " - Youtube: " + impY + " - Website: " + impH);
    $("#imp2").text(imp);
    $("#imp2").parent().attr("title", "Twitter: " + impT + " - Youtube: " + impY + " - Website: " + impH);

    var climate = 0;
    var climateT = 0;
    var climateY = 0;
    var climateH = 0;
    if (counters.has("Tcli")) {
        climateT = counters.get("Tcli");
        climate = counters.get("Tcli");
    }
    if (counters.has("Ycli")) {
        climateY = counters.get("Ycli");
        climate = climate + counters.get("Ycli");
    }
    if (counters.has("Hcli")) {
        climateH = counters.get("Hcli");
        climate = climate + counters.get("Hcli");
    }
    $("#cli").text(climate);
    $("#cli").parent().attr("title", "Twitter: " + climateT + " - Youtube: " + climateY + " - Website: " + climateH);
    $("#cli2").text(climate);
    $("#cli2").parent().attr("title", "Twitter: " + climateT + " - Youtube: " + climateY + " - Website: " + climateH);

    if (execParamId) {
        dblFlag = false;  

        var paramid = getParameterByName('tweetid');
        if (paramid) {
            getInformationbyid(paramid);   
        }
    }
} 


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function undogenerate(obj) {

    if (obj)
        fixfocus(obj);

    var idF = null;
    
    try {
        idF = parseInt(readCookie("maxid"));
    }
    catch(err) {
    }
    finally {
        if (idF) {
            $("#maxid").val(idF);
            idF = idF - 1;
        }
        else {
            idF = parseInt($("#maxid").val());
            createCookie("maxid", idF);
            idF = idF - 1;
        }
    }
    if (isMy) {
        var r = confirm("Remove all Changes?");
        if (r == true) {
            resetFields(false);
    
            do {
    
                eraseCookie(idF + "templink");
        
                eraseCookie(idF + "isdeleted");
        
                eraseCookie(idF + "catchanged");
        
                eraseCookie(idF + "tagchanged");

                eraseCookie(idF + "datechanged");
                
                eraseCookie(idF + "author");

                eraseCookie(idF + "info");
        
                eraseCookie(idF + "classif");
    
                eraseCookie(idF + "haschanges");
    
                idF = idF - 1;
            }
            while (idF >= 0);        
        
            createCookie("haschanges", "", null, true);
            $("#settings").removeClass("haschanges");
            $("#generateicon").removeClass("haschanges");
        
            showMessage("Changes Were Cleaned"); 
        }
    }   
    else {
        do {
    
            eraseCookie(idF + "templink");
    
            eraseCookie(idF + "isdeleted");
    
            eraseCookie(idF + "catchanged");
    
            eraseCookie(idF + "tagchanged");
    
            eraseCookie(idF + "info");
    
            eraseCookie(idF + "classif");
                
            eraseCookie(idF + "datechanged");
            
            eraseCookie(idF + "author");

            eraseCookie(idF + "haschanges");

            idF = idF - 1;
        }
        while (idF >= 100000);  // xyzz      
        createCookie("haschanges", "", null, true);
        $("#settings").removeClass("haschanges");
        $("#generateicon").removeClass("haschanges");
    } 
}

function eraseAllTmpData(obj) {

    if (obj)
        fixfocus(obj);

    var idF = null;
    
    try {
        idF = parseInt(readCookie("maxid"));
    }
    catch(err) {
    }
    finally {
        if (idF) {
            $("#maxid").val(idF);
            idF = idF - 1;
        }
        else {
            idF = parseInt($("#maxid").val());
            createCookie("maxid", idF);
            idF = idF - 1;
        }
    }

    do {
        eraseLinkTmpData(idF);

        idF = idF - 1; 
    }
    while (idF >= 99999);        

    createCookie("haschanges", "", null, true);

    createCookie("maxid", 100000);
    
    $("#settings").removeClass("haschanges");
    $("#generateicon").removeClass("haschanges");
}

function eraseLinkTmpData(idF, flag) {

    if (flag) {
        eraseCookie(idF + "templink");
    }

    eraseCookie(idF + "isdeleted");

    eraseCookie(idF + "catchanged");

    eraseCookie(idF + "tagchanged");

    eraseCookie(idF + "info");

    eraseCookie(idF + "classif");

    eraseCookie(idF + "author");

    eraseCookie(idF + "datechanged");

    eraseCookie(idF + "isnew");
    
    eraseCookie(idF + "haschanges");
}


function eraseAllDeleted(idF, flag) {
    try {
        $( "#dialog-confirm-deleteall" ).dialog({
            resizable: false,
            height: "auto",
            width: 400,
            modal: true,
            buttons: {
              "Yes": function() {
                eraseAllDeletedFunc();
              },
              Cancel: function() {
                  $("#mask").fadeOut(500);
                  $("#dialog-confirm-deleteall").parent().fadeOut( 800, function() {
                    $("#dialog-confirm-deleteall").parent().remove();
                  });
              }
            }
          });
    } catch (error) {
        
    }
    $("#dialog-confirm-deleteall").parent().addClass("purgedialog");
    $("#dialog-confirm-deleteall").parent().css("top", ((window.innerHeight/2) - 100) + "px")
    $("#mask").fadeIn(500);
    $("#dialog-confirm-deleteall").parent().fadeIn(800);
}



var eraseAllDeletedFunc = function(text, type, functorun) {

    var path = "./data.json";

    nextid = null;
    try {
        nextid = parseInt(readCookie("maxid"));
    }
    catch(err) {
        //cnonsole.log("eraseAllDeletedFunc - Error parsing next id");
    }
    finally {
        if (nextid) {
            $("#maxid").val(nextid);
            //cnonsole.log("eraseAllDeletedFunc - nextid vem do cookie: " + nextid);
            nextid = nextid - 1;
        }
        else {
            nextid = parseInt($("#maxid").val());
            createCookie("maxid", nextid);
            //cnonsole.log("eraseAllDeletedFunc - nextid vem do hidden field: " + nextid);
            nextid = nextid - 1;
        }
    }

    $.getJSON(path, function(data) {
        var processtmp = true;

        $.each(data.Tweets, function(key, val) {
            var recordfromdata = val;
            var linkcontent = null;

            do {
                if (processtmp) {
                    linkcontent = readCookie(nextid + "templink");
                    if (linkcontent) {
                        var linktmp = decodeURIComponent(linkcontent);
                        linktmp = linktmp.replace(/(?:\\[rn])+/g, "\\n");
                        linktmp = linktmp.substring(1, linktmp.length - 2).replace(/(\\n)/gm, ""); 
                        linktmp = linktmp.replace(/(\\)/gm, ""); 
                        linktmp = JSON.parse(linktmp);
    
                        val = linktmp;
                        nextid = nextid - 1;
                    }
                    else {
                        if (showAll) {
                            val = recordfromdata;
                        }
                        else {
                            val.id = "0";
                        }
                        
                        processtmp = false;
                    }
                }
                else {
                    if (showAll) {
                        val = recordfromdata;
                    }
                    else {
                        val.id = "0";
                    }
                }

                var isdeleted = readCookie(val.id + "isdeleted");

                if (((val && val.deleted.length > 0) || (isdeleted)) && val.id != "0") {
                    /*val.deleted = "yes";
                    createCookie2(val.id, "isdeleted", "yes");
                    updateLinkCookie(val);
                    */
                    // xyz eraseall
                }
            }
            while (processtmp);
        });   
        
        $("#mask").fadeOut(500);
        $("#dialog-confirm-deleteall").parent().fadeOut( 800, function() {
          $("#dialog-confirm-deleteall").parent().remove();
        });
        
        showMessage("Deleted Links Successfully Purged");
    }); 
}

/* function undogenerate() {
  var ind = false;
  resetFields(false);

  $.getJSON(path, function(data) 
  {
    var processtmp = true;
    nextid = parseInt(readCookie("maxid")) - 1;

    $.each(data.Tweets, function(key, val) 
      {
        var recordfromdata = val;
        var linkcontent = null;
        
        do {
            if (processtmp) {
                linkcontent = readCookie(nextid + "templink_bk");
                if (linkcontent && linkcontent.length > 0) {
                    var linktmp = decodeURIComponent(linkcontent);
                    linktmp = linktmp.replace(/(?:\\[rn])+/g, "\\n");
                    linktmp = linktmp.substring(1, linktmp.length - 2).replace(/(\\n)/gm, ""); 
                    linktmp = linktmp.replace(/(\\)/gm, ""); 
                    linktmp = JSON.parse(linktmp);
                    ind = true;
                    val = linktmp;
                    createCookie(nextid + "templink", linktmp, 99999);
                    createCookie(nextid + "templink_bk", "", 99999);
                    nextid = nextid - 1;
                }
                else {
                    val = recordfromdata;
                    processtmp = false;
                }
            }
            else {
                val = recordfromdata;
            }

            var cat = readCookie(val.id + "catchanged_bk");
            if (cat && cat.length > 0) {
                ind = true;
                createCookie2(val.id, "catchanged_bk", "", 99999);
                createCookie2(val.id, "catchanged", cat, 99999);
            }
            else {
                createCookie2(val.id, "catchanged", "", 99999);
            }

            var tag = readCookie(val.id + "tagchanged_bk");
            if (tag && tag.length > 0) {
                ind = true;
                val.tags = tag;
                createCookie2(val.id, "tagchanged", tag, 99999);
                createCookie2(val.id, "tagchanged_bk", "", 99999);
            }
            else {
                createCookie2(val.id, "tagchanged", "", 99999);
            }

            var info = readCookie(val.id + "info_bk");
            if (info && info.length > 0) {
                ind = true;
                val.info = info;
                createCookie2(val.id, "info", info, 99999);
                createCookie2(val.id, "info_bk", "", 99999);
            }
            else {
                createCookie2(val.id, "info", "", 99999);
            }

            var classif = readCookie(val.id + "classif_bk");
            if (classif && classif.length > 0) {
                ind = true;
                val.classif = classif;
                createCookie2(val.id, "classif", classif, 99999);
                createCookie2(val.id, "classif_bk", "", 99999);
            }
            else {
                createCookie2(val.id, "classif", "", 99999);
            }

            var isdeleted = readCookie(val.id + "isdeleted_bk");
            if (isdeleted && isdeleted.length > 0) {
                ind = true;
                createCookie2(val.id, "isdeleted", "yes", 99999);
                createCookie2(val.id, "isdeleted_bk", "", 99999);
            } 
            else {
                createCookie2(val.id, "isdeleted", "", 99999);
            }    
        }
        while (processtmp);        
      });

      if (ind) {
        createCookie("haschanges", "yes");
            if (showColorsAdv) {
                $("#generateicon").addClass("haschanges");
                if (showColors) {
                    $("#settings").addClass("haschanges");
                }
            } 
      }

      showMessage("Processed Changes Were Reverted");
  }); 
} */ 


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function generate(obj) {
    if (obj)
        fixfocus(obj);

    resetFields(false);
    var path = "./data.json";
    var text = '';
    if (isMy) text = '{"Tweets": [';
    else text = '[';

    var ind = false;
    var processtmp = true;
    
    nextid = null;
    try {
        nextid = parseInt(readCookie("maxid"));
    }
    catch(err) {
        //cnonsole.log("generate - Error parsing next id");
    }
    finally {
        if (nextid) {
            $("#maxid").val(nextid);
            //cnonsole.log("generate - nextid vem do cookie: " + nextid);
            nextid = nextid - 1;
        }
        else {
            nextid = parseInt($("#maxid").val());
            createCookie("maxid", nextid);
            //cnonsole.log("generate - nextid vem do hidden field: " + nextid);
            nextid = nextid - 1;
        }
    }

    $.getJSON(path, function(data) 
    {
      $.each(data.Tweets, function(key, val) 
        {
            var recordfromdata = val;
            var linkcontent = null;
            var linktmp = null;

            var fromWeb = true; 

            do {
                if (processtmp) {
                    fromWeb = false; 

                    linkcontent = readCookie(nextid + "templink");

                    if (linkcontent) {
                        linktmp = decodeURIComponent(linkcontent);
                        linktmp = linktmp.replace(/(?:\\[rn])+/g, "\\n");
                        linktmp = linktmp.substring(1, linktmp.length - 2).replace(/(\\n)/gm, ""); 
                        linktmp = linktmp.replace(/(\\)/gm, ""); 

                        linktmp = JSON.parse(linktmp);
                        
                        val = linktmp;
                        nextid = nextid - 1;
                    }
                    else {
                        val = recordfromdata;
                        processtmp = false;
                        fromWeb = true; 
                    }
                }
                else {
                    fromWeb = true; 
                    val = recordfromdata;
                }

                if (val.id != "0") {
                    var auxLink = {};

                    var cat = readCookie(val.id + "catchanged");
                    if (cat) {
                        val.categories = cat;
                        auxLink.categories = cat;
                    }
        
                    var tag = readCookie(val.id + "tagchanged");
                    if (tag) {
                        val.tags = tag;
                        auxLink.tags = tag;
                    }
        
                    var info = readCookie(val.id + "info");
                    if (info) {
                        val.info = info;
                        auxLink.info = info;
                    }
        
                    var classif = readCookie(val.id + "classif");
                    if (classif) {
                        val.classif = classif;
                        auxLink.classif = classif;
                    }
    
                    var datechanged = readCookie(val.id + "datechanged");
                    if (datechanged) {
                        val.date = datechanged;
                        auxLink.date = datechanged;
                    }
    
                    var author = readCookie(val.id + "author");
                    if (author) {
                        val.author = author;
                        auxLink.author = author;
                    }
    
                    var isdeleted = readCookie(val.id + "isdeleted");
    
                    if (isMy) {
                        if (isdeleted) {
                        } 
                        else {
                            if (ind) {
                                text = text + ",";
                            }
                            else {
                                ind = true;
                            }
                            text = text + JSON.stringify(val, null, " ");  
                        }
                    }
                    else {
                        if (val.deleted != "" || (isdeleted && isdeleted.length > 0)) {
                            if (val.deleted == "yes" || (isdeleted && isdeleted == "yes")) {
                                val.deleted = "yes";
                                auxLink.deleted = "yes";
                            }
                            else {
                                auxLink.deleted = "a";
                                val.deleted = "a";
                            }
    
                        }
                        else {
                            val.deleted = "";
                        }
    
                        if (ind) {
                            text = text + ",";
                        }
                        else {
                            ind = true;
                        }
    
                        if (!fromWeb) {
                            text = text + JSON.stringify(val, null, " ");  
                        }
                        else if (!jQuery.isEmptyObject(auxLink)) {
                            auxLink.id = val.id;
                            
                            text = text + JSON.stringify(auxLink, null, " ");
                        }
                        else {
                            text = text.substring(0, text.length - 1);
                        }
                    } 
                }
            }
            while (processtmp);
          
        });

        if (isMy) {
            text = text + ']}';
            $('#linkresult').val(text);
            $("#linkresult").select();
            document.execCommand('copy'); 
            $("#linkresult").blur();
            showMessage("Changes Processed And Copied To Clipboard");
        }
        else {
            var date = new Date();
            text = text + ']';
            
            download("BookmarksStationLinks_" + formatDate(date) + ".txt", text);
        }
    }); 
} 
