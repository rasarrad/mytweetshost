
function saveinfo(obj, id) {
    createCookie(id + "info", encodeURIComponent($("#" + id + "info").val()), 99999);
    
    $(obj).parent().parent().find("#expand").addClass("infomodified");
    
    $(obj).parent().find("textarea.info").css("border", "2px solid red");

    if ($("#" + id + "oldinfo").length > 0) {
      $("#" + id + "oldinfo").css("border", "2px solid red");

      $("#" + id + "undoinfo").css("display", "inline-block");
    }
    createCookie("hasChanges", "yes");
    $("#settings").addClass("haschanges");
    $("#generateicon").addClass("haschanges");
    showMessage("Information About Link Saved"); 
}   


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function saveclassif(obj, id) {
    createCookie(id + "classif", $("#" + id + "classif").val(), 99999);

    $(obj).parent().parent().parent().find("#expand").addClass("infomodified");

    $(obj).parent().find("#" + id + "classif").css("border", "2px solid red");

    if ($("#" + id + "oldclassif").length > 0) {
        $("#" + id + "oldclassif").show();
        $("#" + id + "oldclassif").css("border", "2px solid red");

        $("#" + id + "undoinfo").css("display", "inline-block");
    }

    createCookie("hasChanges", "yes");
    $("#settings").addClass("haschanges");
    $("#generateicon").addClass("haschanges");
    showMessage("Link Classification Saved"); 
}  


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function undosaveclassif(obj, id) {
    var oldtext = readCookie(id + "classif");

    //if ($(obj).parent().find(".oldclassif"))
       
    if ($("#" + id + "oldclassif")) {
        oldtext = $("#" + id + "oldclassif").text();
        $(obj).css("display", "none");
        $("#" + id + "oldclassif").remove();
    }

    createCookie(id + "classif", "", 99999);
    
    $(obj).parent().parent().parent().find("#expand").removeClass("infomodified");
    
    $(obj).parent().find("#" + id + "classif").val(oldtext);
    $(obj).parent().find("#" + id + "classif").css("border", "none");

    var callback = function(flag) {      
        if (flag) {
            createCookie("hasChanges", "yes");
            $("#settings").addClass("haschanges");
            $("#generateicon").addClass("haschanges");
        }
        else {
            createCookie("hasChanges", "");
            $("#settings").removeClass("haschanges");
            $("#generateicon").removeClass("haschanges");
        }

        showMessage("Link Reclassification Reverted");
    } 

    hasTweetChanges(callback);
}  


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function undosaveinfo(obj, id) {
    var oldtext = readCookie(id + "info");

    if ($("#" + id + "oldinfo").length > 0)
        oldtext = encodeURIComponent($("#" + id + "oldinfo").text());

    createCookie(id + "info", "", 99999);

    $(obj).parent().parent().find("#expand").removeClass("infomodified");

    $(obj).parent().find("textarea.info").val(decodeURIComponent(oldtext));
    $(obj).parent().find("textarea.info").css("border", "none");

    $("#" + id + "undoinfo").css("display", "none");

    if ($("#" + id + "oldinfo").length > 0) {
        $("#" + id + "oldinfo").remove();
    }          
    
    var callback = function(flag) {      
        if (flag) {
            createCookie("hasChanges", "yes");
            $("#settings").addClass("haschanges");
            $("#generateicon").addClass("haschanges");
        }
        else {
            createCookie("hasChanges", "");
            $("#settings").removeClass("haschanges");
            $("#generateicon").removeClass("haschanges");
        }

        showMessage("Information About Link Reverted");
    } 

    hasTweetChanges(callback);
}  


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function removetweet(obj) {
    fixfocus(obj);


    if ($('#linkChange').attr("cid") != "new") {

        var functorun = function(jsonvar) 
        { 
            var isdeleted = readCookie($('#linkChange').attr("cid") + "isdeleted");
            if (jsonvar.deleted != "" || (isdeleted && isdeleted.length > 0)) {
                try {
                    $( "#dialog-confirm-delete" ).dialog({
                        resizable: false,
                        height: "auto",
                        width: 400,
                        modal: true,
                        buttons: {
                          "Yes": function() {
                            jsonvar.deleted = "yes";
                            createCookie(jsonvar.id + "isdeleted", "yes", 99999);
                            updateLinkCookie(jsonvar);
    
                            $("#main").empty();
                            $('#moretweets').hide();
                            $('#tweetcount').hide(); 
    
                            countalltweets();
                            showMessage("Link Deleted Forever");
                            closeSettingsPopup();
                            $("#mask").fadeOut(500);
                            $("#dialog-confirm-delete").parent().fadeOut( 800, function() {
                              $("#dialog-confirm-delete").parent().remove();
                            });
                          },
                          "Restore": function() {
                            createCookie($('#linkChange').attr("cid") + "isdeleted", "", 99999);
            
                            if (hasTweetChanges()) {
                              createCookie("hasChanges", "yes");
                              $("#settings").addClass("haschanges");
                              $("#generateicon").addClass("haschanges");
                            }
                            else {
                              createCookie("hasChanges", "");
                              $("#settings").removeClass("haschanges");
                              $("#generateicon").removeClass("haschanges");
                            }
            
                            jsonvar.deleted = "";
                            updateLinkCookie(jsonvar);
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
                createCookie($('#linkChange').attr("cid") + "isdeleted", "a", 99999);
                jsonvar.deleted = "a";
                updateLinkCookie(jsonvar);
                updateLinkColor(jsonvar);
                $("#settings").addClass("haschanges");
                $("#generateicon").addClass("haschanges");
                createCookie("hasChanges", "yes");
                showMessage("Link Marked To Delete");
            }
        } 
        getJsonbyid($('#linkChange').attr("cid"), functorun);
    }
    else {
        create();
    }
}    

function updateLinkCookie(obj) {
    var link = "{\r\n\"id\": \"" + obj.id + "\",\r\n\"creationdate\": \"" + obj.creationdate  + "\",\r\n\"type\": \"" + obj.type  + "\",\r\n\"url\": \"" + obj.url  + "\",\r\n\"ishidden\": \"" + obj.ishidden  + "\",\r\n\"date\": \"" + obj.date + "\",\r\n\"author\": \"" + obj.author  + "\",\r\n\"categories\": \"" + obj.categories + "\",\r\n\"fromupload\": \"yes\",\r\n\"tags\": \"" + obj.tags + "\",\r\n\"info\": \"" + obj.info.replace(/"/g, "").replace(/(\r\n|\n|\r)/gm, "").trim() + "\",\r\n\"classif\": \"" + obj.classif + "\",\r\n\"deleted\": \"" + obj.deleted + "\",\r\n\"tweet\": \"" + obj.tweet + "\"\r\n},";

    var mlink = encodeURIComponent(JSON.stringify(link));
    
    createCookie(obj.id + "templink", mlink, 99999);
}

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function changetag(obj, id) {

    var text = readCookie(id + "tagchanged");

    $("#changetags").find('span.poptitle').text("Change tags")

    if (text && text.length > 0)
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
        createCookie(id + "catchanged", $(obj).parent().find('input').val());
    
        var text = readCookie(id + "tagchanged");
        if (text && text.length > 0) {
            $('#' + id).find('.tags').css('background-image', 'linear-gradient(to right, rgb(247, 205, 205), rgb(177, 0, 0), rgb(247, 205, 205))');
        }
        else {
            $('#' + id).find('.tags').css('background-image', 'linear-gradient(to left, rgb(177, 0, 0), rgb(247, 205, 205))');
        }

        $('#' + id).find('.newcat').html('<b> New categories </b>' + $(obj).parent().find('input').val());   

        $("#settings").addClass("haschanges");
        $("#generateicon").addClass("haschanges");
        createCookie("hasChanges", "yes");
        showMessage("Category Marked To Change");
    }
    else {
        createCookie(id + "tagchanged", $(obj).parent().find('input').val());
    
        var text = readCookie(id + "catchanged");
        if (text && text.length > 0) {
            $('#' + id).find('.tags').css('background-image', 'linear-gradient(to right, rgb(247, 205, 205), rgb(177, 0, 0), rgb(247, 205, 205))');
        }
        else {
            $('#' + id).find('.tags').css('background-image', 'linear-gradient(to right, rgb(177, 0, 0), rgb(247, 205, 205))');
        }

        $('#' + id).find('.newtag').html('<b> New tags </b>' + $(obj).parent().find('input').val());

        $("#settings").addClass("haschanges");
        $("#generateicon").addClass("haschanges");
        createCookie("hasChanges", "yes");
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
        if (text && text.length > 0) {
            $('#' + id).find('.tags').css('background-image', 'linear-gradient(to right, rgb(177, 0, 0), rgb(247, 205, 205))');
        }
        else {
            $('#' + id).find('.tags').css('background', '#00000021').css('border-bottom', '1px solid #00000038');
        }
        if (hasTweetChanges()) {
          $("#settings").addClass("haschanges");
          $("#generateicon").addClass("haschanges");
          createCookie("hasChanges", "yes");
        }
        else {
          $("#genersettingsateicon").removeClass("haschanges");
          createCookie("hasChanges", "");
        }
        showMessage("Tag Marked To Change Reverted");
    }
    else {
        eraseCookie(id + "tagchanged");

        $(obj).parent().find('input').val($(obj).parent().find('#changetag').attr('tagactual'));
        $('#' + id).find('.newtag').html('');

        var text = readCookie(id + "catchanged");
        if (text && text.length > 0) {
            $('#' + id).find('.tags').css('background-image', 'linear-gradient(to left, rgb(177, 0, 0), rgb(247, 205, 205))');
        }
        else {
            $('#' + id).find('.tags').css('background', '#00000021').css('border-bottom', '1px solid #00000038');
        }
        if (hasTweetChanges()) {
          $("#settings").addClass("haschanges");
          $("#generateicon").addClass("haschanges");
          createCookie("hasChanges", "yes");
        }
        else {
          $("#settings").removeClass("haschanges");
          $("#generateicon").removeClass("haschanges");
          createCookie("hasChanges", "");
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

    if (text && text.length > 0)
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

    resetFields(false);
    var path = "./data.json";
    var counters = new Map();
    var tagsmap = new Map();
    total = 0;
    var total_y = 0;
    var total_t = 0;
    var total_h = 0;    
    var text = '{"Tweets": [';
    var ind = false;
    var processtmp = true;
    nextid = null;
    try {
        nextid = parseInt(readCookie("maxid"));
    }
    catch(err) {
        console.log("countalltweets - Error parsing next id");
    }
    finally {
        if (nextid) {
            $("#maxid").val(nextid);
            console.log("countalltweets - nextid vem do cookie: " + nextid);
            nextid = nextid - 1;
        }
        else {
            nextid = parseInt($("#maxid").val());
            createCookie("maxid", nextid);
            console.log("countalltweets - nextid vem do hidden field: " + nextid);
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
            
            do {
                if (processtmp) {
                    linkcontent = readCookie(nextid + "templink");

                    if (linkcontent && linkcontent.length > 0) {
                        
                        linktmp = decodeURIComponent(linkcontent);
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
                            val = null;
                        }
                        processtmp = false;
                    }
                }
                else {
                    if (showAll) {
                        val = recordfromdata;
                    }
                    else {
                        val = null;
                    }
                }

                if (val && val.deleted != "yes") {
                    var doShowDeletedLink = true;  
                    if (!$("#showdeleted").is(":checked")) {
                        var isdeleted = readCookie(val.id + "isdeleted");
                        if (val.deleted != "" || (isdeleted && isdeleted.length > 0)) {
                            doShowDeletedLink = false; 
                        } 
                    }
    
                    if (doShowDeletedLink) {
    
                        var cat = readCookie(val.id + "catchanged");
                        if (cat && cat.length > 0) {
                            val.categories = cat;
                        }
            
                        var tag = readCookie(val.id + "tagchanged");
                        if (tag && tag.length > 0) {
                            val.tags = tag;
                        }
            
                        var info = readCookie(val.id + "info");
                        if (info && info.length > 0) {
                            val.info = info;
                        }
            
                        var classif = readCookie(val.id + "classif");
                        if (classif && classif.length > 0) {
                            val.classif = classif;
                        }
                    
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
        
                        if (!tagssloaded) {
                            var tags = val.tags.split(" ");
                
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
                        }
        
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
                    }
                }   
            }
            while (processtmp);
          
        });
        if (!tagssloaded) {
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
    
            $("#addpopup").hide();
            
            $("#addpopup").css("top", "calc(50% - 189px)");

            tagssloaded = true;

        }
        
        // All Links
        $("#all").text(total);
        $("#all2").text(total);
        $("#all").parent().attr("title", "Twitter: " + total_t + " - Youtube: " + total_y + " - Website: " + total_h);
        $("#all2").parent().attr("title", "Twitter: " + total_t + " - Youtube: " + total_y + " - Website: " + total_h);

        // New/Ongoing
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

        // New / Hot / Trending
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
        
        dblFlag = false;  

        var paramid = getParameterByName('tweetid');
        if (paramid) {
          getInformationbyid(paramid);   
        }


        /*
        if (dosearchmore) {
            $( "#mask" ).fadeOut( 800, function() {
                var style = window.getComputedStyle(body, null);
        
                $("#mask").css("background", style.getPropertyValue('--soft-transp-color'));
                $("#mask .fa-folder-open").hide();
                $("#mask > div" ).hide();
                $("#mask > .fa-circle-o-notch").show();
            });
        }

         */
    }); 

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
        
            createCookie("hasChanges", "");
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
        while (idF >= 100000);        
        createCookie("hasChanges", "");
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
    while (idF >= 100000);        

    createCookie("hasChanges", "");

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

    eraseCookie(idF + "fromupload");

    eraseCookie(idF + "isnew");
    
    eraseCookie(idF + "haschanges");
}
/* function undogenerate() {
  var path = "./data.json";
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
                createCookie(val.id + "catchanged_bk", "", 99999);
                createCookie(val.id + "catchanged", cat, 99999);
            }
            else {
                createCookie(val.id + "catchanged", "", 99999);
            }

            var tag = readCookie(val.id + "tagchanged_bk");
            if (tag && tag.length > 0) {
                ind = true;
                val.tags = tag;
                createCookie(val.id + "tagchanged", tag, 99999);
                createCookie(val.id + "tagchanged_bk", "", 99999);
            }
            else {
                createCookie(val.id + "tagchanged", "", 99999);
            }

            var info = readCookie(val.id + "info_bk");
            if (info && info.length > 0) {
                ind = true;
                val.info = info;
                createCookie(val.id + "info", info, 99999);
                createCookie(val.id + "info_bk", "", 99999);
            }
            else {
                createCookie(val.id + "info", "", 99999);
            }

            var classif = readCookie(val.id + "classif_bk");
            if (classif && classif.length > 0) {
                ind = true;
                val.classif = classif;
                createCookie(val.id + "classif", classif, 99999);
                createCookie(val.id + "classif_bk", "", 99999);
            }
            else {
                createCookie(val.id + "classif", "", 99999);
            }

            var isdeleted = readCookie(val.id + "isdeleted_bk");
            if (isdeleted && isdeleted.length > 0) {
                ind = true;
                createCookie(val.id + "isdeleted", "yes", 99999);
                createCookie(val.id + "isdeleted_bk", "", 99999);
            } 
            else {
                createCookie(val.id + "isdeleted", "", 99999);
            }    
        }
        while (processtmp);        
      });

      if (ind) {
        createCookie("hasChanges", "yes");
        $("#settings").addClass("haschanges");
        $("#generateicon").addClass("haschanges");
      }

      showMessage("Processed Changes Were Reverted");
  }); 
} */ 


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function hasTweetChanges(callback) {
  var path = "./data.json";
  var ind = false;
  
  $.getJSON(path, function(data) 
  {
    nextid = null;
    try {
        nextid = parseInt(readCookie("maxid"));
    }
    catch(err) {
        console.log("hasTweetChanges - Error parsing next id");
    }
    finally {
        if (nextid) {
            $("#maxid").val(nextid);
            console.log("hasTweetChanges - nextid vem do cookie: " + nextid);
            nextid = nextid - 1;
        }
        else {
            nextid = parseInt($("#maxid").val());
            createCookie("maxid", nextid);
            console.log("hasTweetChanges - nextid vem do hidden field: " + nextid);
            nextid = nextid - 1;
        }
    }

    var processtmp = true;

    $.each(data.Tweets, function(key, val) 
      {
        var recordfromdata = val;
        var linkcontent = null;
        

        do {
            if (processtmp) {
                linkcontent = readCookie(nextid + "templink");
                if (linkcontent && linkcontent.length > 0) {
                    nextid = nextid - 1;
                    
                    ind = true;
                    return false;
                }
                else {
                    val = recordfromdata;
                    processtmp = false;
                }
            }
            else {
                val = recordfromdata;
            }

            var cat = readCookie(val.id + "catchanged");
            if (cat && cat.length > 0) {
                ind = true;
                return false;
            }

            var tag = readCookie(val.id + "tagchanged");
            if (tag && tag.length > 0) {
                ind = true;
                return false;
            }

            var info = readCookie(val.id + "info");
            if (info && info.length > 0) {
                ind = true;
                return false;
            }

            var author = readCookie(val.id + "author");
            if (author && author.length > 0) {
                ind = true;
                return false;
            }

            var datechanged = readCookie(val.id + "datechanged");
            if (datechanged && datechanged.length > 0) {
                ind = true;
                return false;
            }

            var isdeleted = readCookie(val.id + "isdeleted");
            if (val.deleted != "" || (isdeleted && isdeleted.length > 0)) {
                ind = true;
                return false;
            } 
        }
        while (processtmp);
      });

      if (callback)
          callback(ind);

      return ind;
  }); 
  return ind;
} 

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
        console.log("generate - Error parsing next id");
    }
    finally {
        if (nextid) {
            $("#maxid").val(nextid);
            console.log("generate - nextid vem do cookie: " + nextid);
            nextid = nextid - 1;
        }
        else {
            nextid = parseInt($("#maxid").val());
            createCookie("maxid", nextid);
            console.log("generate - nextid vem do hidden field: " + nextid);
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
            
            do {
                if (processtmp) {

                    linkcontent = readCookie(nextid + "templink");

                    if (linkcontent && linkcontent.length > 0) {
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
                    }
                }
                else {
                    val = recordfromdata;
                }

                var cat = readCookie(val.id + "catchanged");
                if (cat && cat.length > 0) {
                    val.categories = cat;
                }
    
                var tag = readCookie(val.id + "tagchanged");
                if (tag && tag.length > 0) {
                    val.tags = tag;
                }
    
                var info = readCookie(val.id + "info");
                if (info && info.length > 0) {
                    val.info = info;
                }
    
                var classif = readCookie(val.id + "classif");
                if (classif && classif.length > 0) {
                    val.classif = classif;
                }

                var datechanged = readCookie(val.id + "datechanged");
                if (datechanged && datechanged.length > 0) {
                    val.date = datechanged;
                }

                var author = readCookie(val.id + "author");
                if (author && author.length > 0) {
                    val.author = author;
                }

                var isdeleted = readCookie(val.id + "isdeleted");

                if (isMy) {
                    if (isdeleted && isdeleted.length > 0) {
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
                        }
                        else {
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
                    text = text + JSON.stringify(val, null, " ");  
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
