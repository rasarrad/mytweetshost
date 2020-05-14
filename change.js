
function saveinfo(obj, id) {
    createCookie(id + "info", encodeURIComponent($("#" + id + "info").val()), 99999);
    
    $(obj).parent().parent().find("#expand").addClass("infomodified");
    
    $(obj).parent().find("textarea.info").css("border", "2px solid red");

    if ($("#" + id + "oldinfo").length > 0) {
      $("#" + id + "oldinfo").css("border", "2px solid red");

      $("#" + id + "undoinfo").css("display", "inline-block");
    }
    createCookie("haschanges", "yes");
    if (showColorsAdv) {
        $("#generateicon").addClass("haschanges");
        if (showColors) {
            $("#settings").addClass("haschanges");
        }
    }  
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

    createCookie("haschanges", "yes");
    if (showColorsAdv) {
        $("#generateicon").addClass("haschanges");
        if (showColors) {
            $("#settings").addClass("haschanges");
        }
    }  
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
            createCookie("haschanges", "yes");
            if (showColorsAdv) {
                $("#generateicon").addClass("haschanges");
                if (showColors) {
                    $("#settings").addClass("haschanges");
                }
            }  
        }
        else {
            createCookie("haschanges", "");
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
            createCookie("haschanges", "yes");
            if (showColorsAdv) {
                $("#generateicon").addClass("haschanges");
                if (showColors) {
                    $("#settings").addClass("haschanges");
                }
            }  
        }
        else {
            createCookie("haschanges", "");
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
    if (obj)
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
                                createCookie("haschanges", "yes");
                                if (showColorsAdv) {
                                    $("#generateicon").addClass("haschanges");
                                    if (showColors) {
                                        $("#settings").addClass("haschanges");
                                    }
                                }  
                            }
                            else {
                              createCookie("haschanges", "");
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
                if (showColorsAdv) {
                    $("#generateicon").addClass("haschanges");
                    if (showColors) {
                        $("#settings").addClass("haschanges");
                    }
                }  
                createCookie("haschanges", "yes");
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
    var link = "{\r\n\"id\": \"" + obj.id + "\",\r\n\"creationdate\": \"" + obj.creationdate  + "\",\r\n\"type\": \"" + obj.type  + "\",\r\n\"url\": \"" + obj.url  + "\",\r\n\"ishidden\": \"" + obj.ishidden  + "\",\r\n\"date\": \"" + obj.date + "\",\r\n\"author\": \"" + obj.author  + "\",\r\n\"categories\": \"" + obj.categories + "\",\r\n\"tags\": \"" + obj.tags + "\",\r\n\"info\": \"" + obj.info.replace(/"/g, "").replace(/(\r\n|\n|\r)/gm, "").trim() + "\",\r\n\"classif\": \"" + obj.classif + "\",\r\n\"deleted\": \"" + obj.deleted + "\",\r\n\"tweet\": \"" + obj.tweet + "\"\r\n},";

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

        if (showColorsAdv) {
            $("#generateicon").addClass("haschanges");
            if (showColors) {
                $("#settings").addClass("haschanges");
            }
        }  
        createCookie("haschanges", "yes");
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

        if (showColorsAdv) {
            $("#generateicon").addClass("haschanges");
            if (showColors) {
                $("#settings").addClass("haschanges");
            }
        }  
        createCookie("haschanges", "yes");
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
            if (showColorsAdv) {
                $("#generateicon").addClass("haschanges");
                if (showColors) {
                    $("#settings").addClass("haschanges");
                }
            }  
            createCookie("haschanges", "yes");
        }
        else {
          $("#generateicon").removeClass("haschanges");
          $("#settings").removeClass("haschanges");
          createCookie("haschanges", "");
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
            if (showColorsAdv) {
                $("#generateicon").addClass("haschanges");
                if (showColors) {
                    $("#settings").addClass("haschanges");
                }
            }  
          createCookie("haschanges", "yes");
        }
        else {
          $("#settings").removeClass("haschanges");
          $("#generateicon").removeClass("haschanges");
          createCookie("haschanges", "");
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


function countalltweets(webLinksMap) {
    console.log("countalltweets 111111");
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
        //cnonsole.log("countalltweets - Error parsing next id");
    }
    finally {
        if (nextid) {
            $("#maxid").val(nextid);
            //cnonsole.log("countalltweets - nextid vem do cookie: " + nextid);
            nextid = nextid - 1;
        }
        else {
            nextid = parseInt($("#maxid").val());
            createCookie("maxid", nextid);
            //cnonsole.log("countalltweets - nextid vem do hidden field: " + nextid);
            nextid = nextid - 1;
        }
    }
    $.getJSON(path, function(data) 
    {
        console.log("countalltweets 22222");
        
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
                if (!(val && val.deleted == "yes") && !(isdeleted && isdeleted == "yes") && val.id != "0") {

                    if (webLinksMap) {
                        var linkObj = webLinksMap.get(parseInt(val.id));

                        if (linkObj) {
                            updateWebLink(linkObj, val);
                        }
                    }


                    var doShowDeletedLink = true;  
                    if (!$("#showdeleted").is(":checked")) {
                        if (val.deleted != "" || (isdeleted && isdeleted.length > 0)) {
                            doShowDeletedLink = false; 
                        } 
                    }
    
                    if (doShowDeletedLink) {
                        console.log("countalltweets " + total);
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

        startCLWorker(JSON.stringify(data.Tweets));
        console.log("countalltweets 333333");
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
        
            createCookie("haschanges", "");
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
        createCookie("haschanges", "");
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

    createCookie("haschanges", "");

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
                    if (linkcontent && linkcontent.length > 0) {
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

                if (((val && val.deleted.length > 0) || (isdeleted && isdeleted.length > 0)) && val.id != "0") {
                    /*val.deleted = "yes";
                    createCookie(val.id + "isdeleted", "yes", 99999);
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
        //cnonsole.log("hasTweetChanges - Error parsing next id");
    }
    finally {
        if (nextid) {
            $("#maxid").val(nextid);
            //cnonsole.log("hasTweetChanges - nextid vem do cookie: " + nextid);
            nextid = nextid - 1;
        }
        else {
            nextid = parseInt($("#maxid").val());
            createCookie("maxid", nextid);
            //cnonsole.log("hasTweetChanges - nextid vem do hidden field: " + nextid);
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
                    if (cat && cat.length > 0) {
                        val.categories = cat;
                        auxLink.categories = cat;
                    }
        
                    var tag = readCookie(val.id + "tagchanged");
                    if (tag && tag.length > 0) {
                        val.tags = tag;
                        auxLink.tags = tag;
                    }
        
                    var info = readCookie(val.id + "info");
                    if (info && info.length > 0) {
                        val.info = info;
                        auxLink.info = info;
                    }
        
                    var classif = readCookie(val.id + "classif");
                    if (classif && classif.length > 0) {
                        val.classif = classif;
                        auxLink.classif = classif;
                    }
    
                    var datechanged = readCookie(val.id + "datechanged");
                    if (datechanged && datechanged.length > 0) {
                        val.date = datechanged;
                        auxLink.date = datechanged;
                    }
    
                    var author = readCookie(val.id + "author");
                    if (author && author.length > 0) {
                        val.author = author;
                        auxLink.author = author;
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
