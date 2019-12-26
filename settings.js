



/////////////////////////////////////////////////////////////////////////
//                             GENERAL                                 //
/////////////////////////////////////////////////////////////////////////

function expandCat(obj) {
    var id = $(obj).parent().attr("id");
    fixfocus(obj);

    var functorun = function(jsonvar) 
    { 
        
        if (jsonvar != null) {
            openSettingsPopup(jsonvar);
        }
    } 
    getJsonbyid(id, functorun);
    // getJsonbyid(28, functorun); // xyz
}

function fixfocus(el)
{
    $(el).clone(el).insertAfter($(el));
    $(el).remove();
}

function zoom(obj, flag) {
    if (obj) fixfocus(obj);
    
    $('body').addClass('notransit');

    if (flag || !$('body').hasClass('big')) {
        $('#zoomin').addClass('fa-search-minus');
        $('#zoomin').removeClass('fa-search-plus');
        $('body').addClass('big');
        customizeTweets(null, true, true);
        createCookie("hasZoom", true);
    }
    else {
        $('#zoomin').addClass('fa-search-plus');
        $('#zoomin').removeClass('fa-search-minus');
        $('body').removeClass('big');
        customizeTweets(null, true, false);
        createCookie("hasZoom", "");
    }

    // create
    var setHeight = "18px";
    var setHeight2 = "18px";
    if ($('body').hasClass('big')) {
        setHeight = "30px";
        setHeight2 = "28px";
    }

    if ($('#linkChange').attr("cid") != "new") {
        $('#linkChange').find("table:not(.buttonstable:not(.newlinktable)").each( function( index, element ) {
            var table = $(element);
            table.css('transition', 'max-height .01s');
            table.css('max-height', setHeight);
            table.find('.sectionedittd i').addClass('fa-angle-down').removeClass('fa-angle-up');
            table.find('td.el').addClass('ellipsis');
        });
    }

    // search
    updateSearchTablesHeight();

    // settings
    $("#mainsettings table#theme")
    .css('transition', 'max-height .01s')
    .css('max-height', setHeight)
    .find('.sectionedittd i').addClass('fa-angle-down').removeClass('fa-angle-up').show()
    .find('td.el').addClass('ellipsis');

    $(".newLayout table.defaulttablerow").each( function( index, element ) {
        var table = $(element);
        table.css('transition', 'max-height .01s');
        table.css('max-height', setHeight);
    });

    $("#mainmenu.newLayout table.defaulttablerow").each( function( index, element ) {
        var table = $(element);
        table.css('transition', 'max-height .01s');
        table.css('max-height', setHeight2);
    });

    setTimeout(function(){
        $('body').removeClass('notransit'); 
    }, 1400);  
}



var openSettingsPopup = function(jsonobj) 
{
    // GENERAL
    var hasChanges = false;

    
    // OTHER SETTINGS
    $('body, html').css('overflow-y', 'hidden');

    if (jsonobj) {
        var setHeight = "18px";

        if ($('body').hasClass('big'))
            setHeight = "30px";
    
        $('#linkChange').find("table:not(.buttonstable)").each( function( index, element ) {
            var table = $(element);
            table.css('transition', 'max-height .01s');
            table.css('max-height', setHeight);
            table.find('.sectionedittd i').addClass('fa-angle-down').removeClass('fa-angle-up').show();
            table.find('td.el').addClass('ellipsis');
        });

        $(".fa-angle-up").show();  

        $('#linktable').hide();

        $('#previewtable').hide();

        $('#linkChange').attr("cid", jsonobj.id);
        $('#linkChange').attr("clink", jsonobj.url);
        $('#linkChange').removeClass("new");
        $('#linktable').hide();
        $('#editTags').css('margin-top', '80px');  
        $("#linkChange .buttonstable tr:first-child td i.fa").attr('class','').attr('style','margin-right: 9px;font-size: 18px;position: relative;top: 2px;');

        $("#linkChange .buttonstable tr:first-child td i").addClass('fa').addClass('fa-twitter').attr('style','margin-right: 9px;font-size: 18px;position: relative;top: 2px;');
    
        if (jsonobj.type == "H") {
            $("#linkChange .buttonstable tr:first-child td i").addClass('fa').addClass('fa-internet-explorer').attr('style','margin-right: 9px;font-size: 15px;position: relative;top: 1px;');
        }
        else if (jsonobj.type == "Y") {
            $("#linkChange .buttonstable tr:first-child td i").addClass('fa').addClass('fa-youtube-play').attr('style','margin-right: 9px;font-size: 15px;position: relative;top: 1px;');
        }   

            //$("#linkChange .buttonstable tr:first-child td .id").html(jsonobj.id);
        $("#linkChange .buttonstable tr:first-child td .author").show();
        $("#linkChange .buttonstable tr:first-child td .authorinput").hide(); 
        var authorchanged = readCookie(jsonobj.id + "authorchanged");
        if (authorchanged != null && authorchanged != 'null') {
            if (authorchanged.length > 0) {
                $("#linkChange .buttonstable tr:first-child td .author").html(authorchanged);
                $("#linkChange .buttonstable tr:first-child td .authorinput").val(authorchanged);
            }
            else {
                $("#linkChange .buttonstable tr:first-child td .author").html("--");
                $("#linkChange .buttonstable tr:first-child td .authorinput").val("");
            }
        } 
        else {
            if (jsonobj.author.length > 0) {
                $("#linkChange .buttonstable tr:first-child td .author").html(jsonobj.author);
                $("#linkChange .buttonstable tr:first-child td .authorinput").val(jsonobj.author);
            }
            else {
                $("#linkChange .buttonstable tr:first-child td .author").html("--");
                $("#linkChange .buttonstable tr:first-child td .authorinput").val("");
            }
        }
        $("#linkChange .buttonstable tr:first-child td .datetoshow").removeClass('extended');
        $("#linkChange .buttonstable tr:first-child td .date").show();
        $("#linkChange .buttonstable tr:first-child td .dateinput").hide(); 
        $("#linkChange .buttonstable tr:first-child td .datetoshow").hide(); 
        var datechanged = readCookie(jsonobj.id + "datechanged");
        if (datechanged != null && datechanged != 'null') {
            if (datechanged.length > 0) {
                $("#linkChange .buttonstable tr:first-child td .date").html(formatDateFromNum(datechanged));
            
                $("#linkChange .buttonstable tr:first-child td .dateinput").val(datechanged);
            }
            else {
                $("#linkChange .buttonstable tr:first-child td .date").html("--");
                $("#linkChange .buttonstable tr:first-child td .dateinput").val("");
            }
        } 
        else {
            var date = jsonobj.date.toString();
            if (date.length > 0) {
                $("#linkChange .buttonstable tr:first-child td .date").html(formatDateFromNum(date));
            
                $("#linkChange .buttonstable tr:first-child td .dateinput").val(date);
            }
            else {
                $("#linkChange .buttonstable tr:first-child td .date").html("--");
                $("#linkChange .buttonstable tr:first-child td .dateinput").val("");
            }
        }  
        $("#linkChange #editTags .fa-chevron-down").show();    
        
        $(".buttontdtohide").show();  
        $(".originaltr").show();
        $('#removetweetp').attr('class','').addClass('fa').addClass('fa-eraser').addClass('fa-flip-horizontal');

    
        // TAGS

        $('#tagsinput').attr("ctags", jsonobj.tags);

        var tagchanged = readCookie(jsonobj.id + "tagchanged");
        var currenttagdisplay = $('.currenttags');
        
        if (jsonobj.tags.length > 0 && jsonobj.tags != "undefined") {
            $('.originaltags').html(parseTags(jsonobj.tags));  
        }
        else {
            $('.originaltags').html("--");  
        }

        if (tagchanged != null && tagchanged != 'null') {
            hasChanges = true;
            currenttagdisplay.css('color','#00ff72');
            if (tagchanged.length > 0)
                currenttagdisplay.html(parseTags(tagchanged));
            else
                currenttagdisplay.html("--");

            $('#tagsinput').val(tagchanged);
            $('#originaltagtd i').show();
        } 
        else {
            currenttagdisplay.css('color',"");
            currenttagdisplay.html(parseTags(jsonobj.tags));
            $('#tagsinput').val(jsonobj.tags);
        }

        removeNonExistentLi();

        createNonExistentLi();

        // CAGTEGORIES

        $('#catsinput').attr("ccats", jsonobj.categories);

        var catchanged = readCookie(jsonobj.id + "catchanged");
        var currentcatdisplay = $('.currentcats');

        if (jsonobj.categories.length > 0 && jsonobj.categories != "undefined") {
            $('.originalcats').html(parseCats(jsonobj.categories));  
        }
        else {
            $('.originalcats').html("--"); 
        }

        if (catchanged != null && catchanged != 'null') {
            hasChanges = true;
            currentcatdisplay.css('color','#00ff72');
            if (catchanged.length > 0)
                currentcatdisplay.html(parseCats(catchanged));
            else
                currentcatdisplay.html("--");
            
            $('#catsinput').val(catchanged);
            $('#originalcattd i').show();
        } 
        else {
            currentcatdisplay.css('color',"");
            currentcatdisplay.html(parseCats(jsonobj.categories));
            $('#catsinput').val(jsonobj.categories);
        }
        
        markCategoriesCheckBoxs();

        // CLASSIFICATION
        $('#classifinput').attr("cclassif", jsonobj.classif);

        var classifchanged = readCookie(jsonobj.id + "classif");
        var currentclassifdisplay = $('.currentclassif');

        if (jsonobj.classif.length > 0 && jsonobj.classif != 0 && jsonobj.classif != "undefined") {
            $('.originalclassif').html(jsonobj.classif); 
        }
        else {
            $('.originalclassif').html("--"); 
        }

        if (classifchanged != null && classifchanged != 'null') {
            hasChanges = true;
            currentclassifdisplay.css('color','#00ff72');
            currentclassifdisplay.html(classifchanged);
            $('#classifinput').val(classifchanged);
            $('#originalclassiftd i').show();
            markClassif(classifchanged);
        } 
        else {
            currentclassifdisplay.css('color',"");
            if (jsonobj.classif.length > 0 && jsonobj.classif != 0 && jsonobj.classif != "undefined") {
                currentclassifdisplay.html(jsonobj.classif);
                $('#classifinput').val(jsonobj.classif);
                markClassif(jsonobj.classif);
            }
            else {
                currentclassifdisplay.html("--");
                $('#classifinput').val(0);
            }

        }

        
        // INFO
        $('#infoinput').attr("cinfo", jsonobj.info);

        var infochanged = readCookie(jsonobj.id + "info");
        var currentinfodisplay = $('.currentinfo');

        if (jsonobj.info.length > 0 && jsonobj.info != "undefined") {
            $('.originalinfo').html(decodeURIComponent(jsonobj.info)); 
        }
        else {
            $('.originalinfo').html("--"); 
        }

        if (infochanged != null && infochanged != 'null') {
            hasChanges = true;
            currentinfodisplay.css('color','#00ff72');

            if (infochanged.length > 0)
                currentinfodisplay.html(decodeURIComponent(infochanged));
            else
                currentinfodisplay.html("--");

            $('#infoinput').val(decodeURIComponent(infochanged));
            $('#originalinfotd i').show();
        } 
        else {
            currentinfodisplay.css('color',"");
            if (jsonobj.info.length > 0 && jsonobj.info != "" && jsonobj.info != "undefined") {
                currentinfodisplay.html(decodeURIComponent(jsonobj.info));
                $('#infoinput').val(decodeURIComponent(jsonobj.info));
            }
            else {
                currentinfodisplay.html("--");
                $('#infoinput').val("");
            }
        }

        var isdeleted = readCookie(jsonobj.id + "isdeleted");
        if (isdeleted && isdeleted.length > 0) {
            $("#seticon").attr("style", "color: red;");
        }
        else {
            var linkcontent = readCookie(jsonobj.id + "templink");
            if (linkcontent && linkcontent.length > 0) {
                $("#seticon").attr("style", "color: #00dc00;");
            }
            else {
                if (hasChanges) 
                    $("#seticon").attr("style", "color: #f18618;");
                else 
                    $("#seticon").attr("style", "");
            }
        }


    }
    else {

        dblFlag = false;

        $('#linkChange').find("table:not(.buttonstable):not(.newlinktable)").each( function( index, element ) {
            var table = $(element);

            table.css('transition', 'none !important');
            if (table.attr("cmaxheight"))
                table.css('max-height', table.attr("cmaxheight"));
            else {
                table.css('max-height', "fit-content");
            }

            table.find('.sectionedittd i').hide();
        });
        
        var setHeight = "18px";

        if ($('body').hasClass('big'))
            setHeight = "30px";
        
        $('#linktable').css('transition', 'max-height 0.01s');
        $('#linktable').css('max-height', setHeight);

        $('#linkChange').attr("cid", "new");
        $('#linkChange').addClass("new");
        $('#editTags').css('margin-top', '6px');  
        $('#linktable').show();

        $('#previewtable').hide();

        $('.currenttags').html("--");  
        $('.currentcats').html("--");  
        $('.currentinfo').html("--");  
        $('.currentclassif').html("--");  

            //$("#linkChange .buttonstable tr:first-child td .id").html(jsonobj.id);
        $("#linkChange .buttonstable tr:first-child td .author").hide();
        $("#linkChange .buttonstable tr:first-child td .authorinput").show(); 

        $("#linkChange .buttonstable tr:first-child td .date").hide();

        $("#linkChange .buttonstable tr:first-child td .datetoshow").addClass('extended');
        $("#linkChange .buttonstable tr:first-child td .datetoshow").show(); 

        $(".buttontdtohide").hide();
        $(".originaltr").hide();
        $('#removetweetp').attr('class','').addClass('fa').addClass('fa-floppy-o');

        $("#linkChange #editTags .fa-chevron-down").show();    
    }

    $('#linkChange').fadeIn(); 
    $('#linkChange').css('display', 'flex');  

    updateTopPosition("linkChange"); 
} 

var openMainSettingsPopup = function(jsonobj) 
{
    closeallnewlayout();

    $('body, html').css('overflow-y', 'hidden');
    var setHeight = "18px";

    if ($('body').hasClass('big'))
        setHeight = "30px";

    $("#mainsettings table#theme").each( function( index, element ) {
        var table = $(element);
        table.css('transition', 'max-height .01s');
        table.css('max-height', setHeight);
        table.find('.sectionedittd i').addClass('fa-angle-down').removeClass('fa-angle-up').show();
        table.find('td.el').addClass('ellipsis');
    });

    $('#mainsettings').fadeIn(600); 
} 


var getLinkColor = function(id) 
{
    var isdeleted = readCookie(id + "isdeleted");
    if (isdeleted && isdeleted.length > 0) {
        return "red";
    }
    else {
        var linkcontent = readCookie(id + "templink");
        if (linkcontent && linkcontent.length > 0) {
            return "#00dc00";
        }
        else {
            var hasChanges = false;

            var tagchanged = readCookie(id + "tagchanged");
            if (tagchanged != null && tagchanged != 'null') {
                hasChanges = true;
            } 
        
            var catchanged = readCookie(id + "catchanged");
            if (catchanged != null && catchanged != 'null') {
                hasChanges = true;
            } 
        
            var classifchanged = readCookie(id + "classif");
            if (classifchanged != null && classifchanged != 'null') {
                hasChanges = true;
            } 
        
            var infochanged = readCookie(id + "info");
            if (infochanged != null && infochanged != 'null') {
                hasChanges = true;
            }

            if (hasChanges) 
                return "#f18618";
            else 
               return "";
        }
    }
} 


function searchTags(tags, text) {
    var res = text.split(" ");
    for (var i = 0; i < res.length; i++) {
        if (!tags.includes(res[i])) {
            return false;
        }
    }
    return true;
}

function searchInfo(info, tweet, text) {
    var res = text.split(" ");
    var ret = true;
    for (var i = 0; i < res.length; i++) {
        if (!(info.includes(res[i]) || tweet.includes(res[i]))) {
            ret = false;
            return false;
        }
    }
    return ret;
}

function searchClassif(val, selectedclassif, selectedclassiftype) {
    if (selectedclassiftype == "equal") {
        return Number(val) == Number(selectedclassif)
    }
    else if (selectedclassiftype == "greater") {
        return Number(val) > Number(selectedclassif)
    }
    else {
        return Number(val) < Number(selectedclassif)
    }
}



function showAuthor(obj) {
    $(obj).hide();
    var otherObj = $(obj).parent().find(".authorinput");
    otherObj.show();
    otherObj.focus();
}
function saveAuthor(obj) {
    if ($('#linkChange').attr("cid") != "new") {
        $(obj).hide();
        var otherObj = $(obj).parent().find(".author");
        if ($(obj).val().length > 0) 
            otherObj.html($(obj).val());
        else
            otherObj.html("--"); 
        otherObj.show();
        
        createCookie($('#linkChange').attr("cid") + "authorchanged", $(obj).val());
    }
}

function showDate(obj) {
    //$(obj).hide();
    $('#linkChange').css("background", "transparent");
    var otherObj = $('#linkChange').find(".dateinput");
    //otherObj.show();
    //otherObj.focus();
    var date = new Date();
    if (otherObj.val().trim() != "") {
        date.setDate(Number(otherObj.val().substring(6, 8)));
        date.setMonth(Number(otherObj.val().substring(4, 6)) - 1);
        date.setFullYear(Number(otherObj.val().substring(0, 4)));
    }
    openCalendar("linkdate", date);
}

function closeSettingsPopup(obj) {
    if (obj)
        fixfocus(obj);
    $('body, html').css('overflow-y', 'auto');
    $('#linkChange').fadeOut(600);
}
function closeMainSettingsPopup(obj) {
    if (obj)
        fixfocus(obj);
    $('body, html').css('overflow-y', 'auto');
    $('#mainsettings').fadeOut(600);
}
function closeMenuPopup(obj) {
    if (obj)
        fixfocus(obj);
    $('body, html').css('overflow-y', 'auto');
    $('#mainmenu').fadeOut(600);
}
function editSetting(e, obj, flag) {
    e.stopPropagation();

    if ($('#linkChange').attr("cid") != "new" || flag) {
        var setHeight = "18px";

        if ($('body').hasClass('big'))
            setHeight = "30px";
    
        var table = $(obj).parent().parent();
        if (table.css('max-height') == setHeight) {
            var hasExpanded = false;
            $('#linkChange').find("table:not(.buttonstable)").each( function( index, element ) {
                var table = $(element);
                
                table.css('transition', 'none !important');
                table.css('max-height', setHeight);
                table.find('.sectionedittd i').addClass('fa-angle-down').removeClass('fa-angle-up').attr('style', '');
                table.find('td.el').addClass('ellipsis');
            });
            
            table.css('transition', 'none !important');
            if (table.attr("cmaxheight"))
                table.css('max-height', table.attr("cmaxheight"));
            else {
                table.css('max-height', "fit-content");
            }
            
            if (table.attr('id') != 'editInfo')
                table.find('td.el').removeClass('ellipsis');

            table.find('.sectionedittd i').addClass('fa-angle-up').removeClass('fa-angle-down');
        }
        else {
            table.css('transition', 'none !important');
            table.css('max-height', setHeight);
            table.find('.sectionedittd i').addClass('fa-angle-down').removeClass('fa-angle-up');
            table.find('td.el').addClass('ellipsis');
        }
    }
    
    updateTopPosition("linkChange"); 
}

function updateTopPosition(obj) {
    setTimeout(function(){
        var innerHeight = window.innerHeight;
        var htmlElem = $("#" + obj + " > div");
        var maxHeightStyle = "max-height: " + (innerHeight - 125) + "px !important;"
        if ($('body').hasClass('big')) {
            maxHeightStyle = "max-height: " + (innerHeight - 137) + "px !important;"
        }
        htmlElem.attr("style", "margin-top: 0px !important;" + maxHeightStyle);     
    
        htmlElem.attr("style", "margin-top: 0px !important;" + maxHeightStyle + "top: " + ((innerHeight / 2) - (htmlElem.height() / 2)) + "px !important;"); 
    }, 40);
    
}

/////////////////////////////////////////////////////////////////////////
//                           TAGS SETTINGS                             //
/////////////////////////////////////////////////////////////////////////

function tagsInputOnChange(obj) {
    var oldtags = $(obj).attr("ctags");
    var currenttagdisplay = $('.currenttags'); 
    currenttagdisplay.html(parseTags($(obj).val()));
    
    if (oldtags == $(obj).val()) {
        currenttagdisplay.css('color', '');
        createCookie($('#linkChange').attr("cid") + "tagchanged", null);
        $('#originaltagtd i').hide();
    }
    else {
        currenttagdisplay.css('color','#00ff72');
        createCookie($('#linkChange').attr("cid") + "tagchanged", $(obj).val());
        $('#originaltagtd i').show();
    }
    removeNonExistentLi();

    createNonExistentLi();
    
    updateTagsText($(obj).val(), $('#linkChange').attr("cid"));

    var color = getLinkColor($('#linkChange').attr("cid"));
    if (color == "#f18618")
        createCookie($('#linkChange').attr("cid") + "haschanges", "yes");
    else
        createCookie($('#linkChange').attr("cid") + "haschanges", null);

    updateLinkColor(color, $('#linkChange').attr("cid"));
    updateSettingsColor(color);

    var callback = function(flag) {      
        if (flag) {
            createCookie("hasChanges", "Yes");
            $("#generateicon").addClass("haschanges");
        }
        else {
            createCookie("hasChanges", "");
            $("#generateicon").removeClass("haschanges");
        }
    } 
    hasTweetChanges(callback);
}

 
function updateSettingsColor(color) {
    if (color != "") {
        $('#seticon').css("color", color); 
    }
    else {
        $('#seticon').css("color", ""); 
    }
}

function updateLinkColor(color, id) {
    if (color != "") {
        $(".tweet#" + id).find("i.linkbar").css("color", color); 
    }
    else {
        $(".tweet#" + id).find("i.linkbar").css("color", ""); 
    }
}
function updateTagsText(text, id) {
    if (text.trim().length > 0 && text != "undefined")
        $(".tweet#" + id).find(".tags").html("<b>Tags: </b>" + text); 
    else
        $(".tweet#" + id).find(".tags").html("<b>Tags: </b>--");     
}


function addTextTag(obj) {
    //fixfocus(obj);
    if ($('#addtaginput').val() != "") {
        $('#tagsinput').val($('#tagsinput').val() + " " + $('#addtaginput').val());
        $('#tagsinput').trigger("change");
        $('#addtaginput').val("");
    }
}


function undoTags(e, obj) {
    e.stopPropagation();
    fixfocus(obj);

    $('#tagsinput').val($('#tagsinput').attr("ctags"));
    $(obj).hide();
    var functorun = function() 
    { 
        alert(1);
    } 
    $('#tagsinput').trigger("change");
    removeNonExistentLi();

    createNonExistentLi();

    showMessage("Tags reverted", null, "fa-undo", "", null, "undo");
}

/*
function addtag(text) {
    var hasLi = existsLi(text);

    if (hasLi == "") {
        createLi();
    }
    else {
        hasLi.addClass("selectedtag");
    }

    $('#tagsinput').val($('#tagsinput').val() + text + " ");
}
*/
function createLi(text, obj) {
    var objToUse = "tagsul";
    if (obj)
        objToUse = obj;
    $('#'+ objToUse).prepend('<li onclick="javascript: clickLiTag(event, this)" class="litags selectedtag new">' + text + '</li>');
}

function createNonExistentLi(obj, obj2) {
    var objToUse = "tagsul";
    var objToUse2 = "tagsinput";
    if (obj) {
        objToUse = obj;
        objToUse2 = obj2;
    }
           
    var res = $('#' + objToUse2).val().trim().split(" ");

    if (res.length == 1 && res[0].trim() == 0) {
        return false;
    }

    for (var i = res.length; i > 0; i--) {
        var li = existsLi(res[i-1], objToUse);
        if (li == "") {
            createLi(res[i-1], objToUse);
        }
        else {
            li.clone().addClass("selectedtag").prependTo("#"+ objToUse);
            li.remove();
        }
    }
}

function existsLi(text, obj) {
    var objToUse = "tagsul";
    if (obj)
        objToUse = obj;

    var hasLi = "";

    $('#' + objToUse).find(".litags").each( function( index, element ){
        if ($(element).html() == text) {
            hasLi = $(element);
            return false;
        }
    });

    return hasLi;
}

function removeNonExistentLi(obj, obj2) {
    var objToUse = "tagsul";
    var objToUse2 = "tagsinput";
    if (obj) {
        objToUse = obj;
        objToUse2 = obj2;
    }
    var tags = $('#' + objToUse2).val();
    var res = tags.trim().split(" ");

    $('#' + objToUse).find(".litags").each( function( index, element ) {
        $(element).removeClass("selectedtag");

        if ($.inArray( $(element).text().trim(), res ) < 0 && $(element).hasClass("new")) {
            $(element).remove();
        }
    });

}

function parseTags(tags) {
    var result = "";
    var res = tags.trim().split(" ");

    if (res.length == 1 && (res[0].trim() == 0 || res[0].trim() == "undefined")) {
        return "--";
    } 

    for (var i = 0; i < res.length; i++) {
        result = result + res[i] + " - ";
    }

    return result.substring(0, result.length - 3);
}


function clickLiTag(e, obj) {
    e.stopPropagation();

    if ($("#searchpopup").css("display") == "none") {
        if ($(obj).hasClass("selectedtag")) {
            $(obj).removeClass("selectedtag");
            if ($('#tagsinput').val().indexOf($(obj).html() + " ") >= 0) {
                $('#tagsinput').val($('#tagsinput').val().replace($(obj).html() + " ", ""));
            }
            else {
                $('#tagsinput').val($('#tagsinput').val().replace($(obj).html(), "").trim());
            }
            $('#tagsinput').trigger("change");
        }      
        else {
                
            $(obj).attr("class", "litags");
            $(obj).addClass("selectedtag");
            $('#tagsinput').val($('#tagsinput').val().trim() + " " + $(obj).html());
            $('#tagsinput').trigger("change");
        }
    }
    else {
    
        if ($(obj).hasClass("selectedtag")) {
            $(obj).removeClass("selectedtag");
            if ($('#filtertag').val().indexOf($(obj).html() + " ") >= 0) {
                $('#filtertag').val($('#filtertag').val().replace($(obj).html() + " ", ""));
            }
            else {
                $('#filtertag').val($('#filtertag').val().replace($(obj).html(), "").trim());
            }
            $('#filtertag').trigger("change");
        }      
        else {
            $(obj).attr("class", "litags");
            $(obj).addClass("selectedtag");
            $('#filtertag').val(($('#filtertag').val().trim() + " " + $(obj).html()).trim());
            $('#filtertag').trigger("change");
        }

    }
}


/////////////////////////////////////////////////////////////////////////
//                       CATEGORIES SETTINGS                           //
/////////////////////////////////////////////////////////////////////////


function catsInputOnChange(obj) {

    var oldcats = $(obj).attr("ccats");
    var currentcatdisplay = $('.currentcats'); 
    currentcatdisplay.html(parseCats($(obj).val()));
    
    if (oldcats == $(obj).val()) {
        currentcatdisplay.css('color', '');
        createCookie($('#linkChange').attr("cid") + "catchanged", null);
        $('#originalcattd i').hide();
    }
    else {
        currentcatdisplay.css('color','#00ff72');
        createCookie($('#linkChange').attr("cid") + "catchanged", $(obj).val());
        $('#originalcattd i').show();
    }

    markCategoriesCheckBoxs();

    var color = getLinkColor($('#linkChange').attr("cid"));
    if (color == "#f18618")
        createCookie($('#linkChange').attr("cid") + "haschanges", "yes");
    else
        createCookie($('#linkChange').attr("cid") + "haschanges", null);

    updateLinkColor(color, $('#linkChange').attr("cid"));
    updateSettingsColor(color);
    var callback = function(flag) {      
        if (flag) {
            createCookie("hasChanges", "Yes");
            $("#generateicon").addClass("haschanges");
        }
        else {
            createCookie("hasChanges", "");
            $("#generateicon").removeClass("haschanges");
        }
    } 
    hasTweetChanges(callback);
}

function clickCheckCat(obj, cat) {
    if (!$(obj).prop("checked")) {       
        if ($('#catsinput').val().indexOf(cat + " ") >= 0) {
            $('#catsinput').val($('#catsinput').val().replace(cat + " ", ""));
        }
        else {
            $('#catsinput').val($('#catsinput').val().replace(cat, "").trim());
        }
        
        $('#catsinput').trigger("change");
    }      
    else {
        $('#catsinput').val($('#catsinput').val().trim() + " " + cat);

        $('#catsinput').trigger("change");
    }
}

function markCategoriesCheckBoxs() {
    var currCats = $('#catsinput').val();
    for (let [key, value] of catsmap) { 
        
        if (currCats.indexOf(key) < 0) { 
            $("#cat" + key).prop('checked', false);
        }
        else {  
            $("#cat" + key).prop('checked', true);
        }
    }  

}

function undoCats(e, obj) {
    e.stopPropagation();
    fixfocus(obj);

    $('#catsinput').val($('#catsinput').attr("ccats"));
    $(obj).hide();
    var functorun = function() 
    { 
        alert(1);
    } 
    $('#catsinput').trigger("change");

    markCategoriesCheckBoxs();

    showMessage("Categories reverted", null, "fa-undo", "", null, "undo");
}

function parseCats(cats) {
    var result = "";
    var res = cats.trim().split(" ");

    if (res.length == 1 && (res[0].trim() == 0 || res[0].trim() == "undefined")) {
        return "--";
    } 

    for (var i = 0; i < res.length; i++) {
        result = result + catsmap.get(res[i]) + " - ";
    }

    return result.substring(0, result.length - 3);
}

/////////////////////////////////////////////////////////////////////////
//                     CLASSIFICATION SETTINGS                         //
/////////////////////////////////////////////////////////////////////////

function classifInputOnChange(obj) {
    var oldclassif = $(obj).attr("cclassif");
    var currentclassifdisplay = $('.currentclassif'); 
    currentclassifdisplay.html($(obj).val().trim());
    
    if (oldclassif == $(obj).val().trim()) {
        currentclassifdisplay.css('color', '');
        createCookie($('#linkChange').attr("cid") + "classif", null);
        $('#originalclassiftd i').hide();
    }
    else {
        currentclassifdisplay.css('color','#00ff72');
        createCookie($('#linkChange').attr("cid") + "classif", $(obj).val().trim());
        $('#originalclassiftd i').show();
    }
    var color = getLinkColor($('#linkChange').attr("cid"));
    if (color == "#f18618")
    createCookie($('#linkChange').attr("cid") + "haschanges", "yes");
    else
        createCookie($('#linkChange').attr("cid") + "haschanges", null);

    updateLinkColor(color, $('#linkChange').attr("cid"));
    updateSettingsColor(color);
    
    var callback = function(flag) {      
        if (flag) {
            createCookie("hasChanges", "Yes");
            $("#generateicon").addClass("haschanges");
        }
        else {
            createCookie("hasChanges", "");
            $("#generateicon").removeClass("haschanges");
        }
    } 
    hasTweetChanges(callback);

    markClassif($(obj).val().trim());
}

function markClassif(value) {

    $('#classiful').find(".litags").each( function( index, element ) {
        if($(element).html().trim() == value) {
            $(element).addClass("selectedtag");
        }
        else {
            $(element).removeClass("selectedtag");
        }
    });

}


function clickLiClassif(e, obj) {
    e.stopPropagation();

    if (!$(obj).hasClass("selectedtag")) {
        $('#classifinput').val($(obj).html().trim());

        $('#classifinput').trigger("change");
    }  

}


function undoClassif(e, obj) {
    e.stopPropagation();
    fixfocus(obj);

    $('#classifinput').val($('#classifinput').attr("cclassif"));
    $(obj).hide();
    var functorun = function() 
    { 
        alert(1);
    } 
    $('#classifinput').trigger("change");

    showMessage("Classification reverted", null, "fa-undo", "", null, "undo");
}

/////////////////////////////////////////////////////////////////////////
//                            INFO SETTINGS                            //
/////////////////////////////////////////////////////////////////////////

function infoInputOnKeyup(obj) {
    var cid = $("#infoinput").attr("cinfo");
    var val = $("#infoinput").val();
    if (!dblFlag) {
        dblFlag = true;
        setTimeout(function() {     
            var oldinfo = cid;
            var currentinfodisplay = $('.currentinfo'); 
            currentinfodisplay.html(val);
            
            if (oldinfo == val) {
                currentinfodisplay.css('color', '');
                createCookie($('#linkChange').attr("cid") + "info", null);
                $('#originalinfotd i').hide();
            }
            else {
                currentinfodisplay.css('color','#00ff72');
                createCookie($('#linkChange').attr("cid") + "info", val);
                $('#originalinfotd i').show();
            }

            var color = getLinkColor($('#linkChange').attr("cid"));

            if (color == "#f18618")
                createCookie($('#linkChange').attr("cid") + "haschanges", "yes");
            else
                createCookie($('#linkChange').attr("cid") + "haschanges", null);

            updateLinkColor(color, $('#linkChange').attr("cid"));
            updateSettingsColor(color);
            var callback = function(flag) {      
                if (flag) {
                    createCookie("hasChanges", "Yes");
                    $("#generateicon").addClass("haschanges");
                }
                else {
                    createCookie("hasChanges", "");
                    $("#generateicon").removeClass("haschanges");
                }
            } 
            hasTweetChanges(callback);
            dblFlag = false;
        }, 300);
    }
}


function undoInfo(e, obj) {
    e.stopPropagation();
    fixfocus(obj);

    $('#infoinput').val($('#infoinput').attr("cinfo"));
    $(obj).hide();
    var functorun = function() 
    { 
        alert(1);
    } 
    $('#infoinput').trigger("keyup");

    showMessage("Information reverted", null, "fa-undo", "", null, "undo");
}

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////