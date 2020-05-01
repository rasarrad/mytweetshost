



/////////////////////////////////////////////////////////////////////////
//                             GENERAL                                 //
/////////////////////////////////////////////////////////////////////////

function expandCatPre() {
    expandCat(null, $("#fsPopup iframe").attr("cid"));
}

function expandCat(obj, idparam, valid) {

    var id = null;

    if (idparam) {
        id = idparam;
    }
    else {
        id = $(obj).parent().attr("id");
        fixfocus(obj);
    }
    
    // security check
    /* xyz splash 
    if (valid) {
    }
    else if (ceec != 4) {
        ceec++;
    }
    else {
        ceec = 0;

        if (!dunl()) {
            funcg = function() 
            { 
                expandCat(null, id, true);
            } 

            $("#splashbutton").attr("ceec", "yes");
            showSplash();

            return false;
        }
    }
    */

    var functorun = function(jsonvar) 
    { 
        
        if (jsonvar != null) {
            openSettingsPopup(jsonvar);
        }
    } 
    getJsonbyid(id, functorun);
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
    var setHeight = "26px";
    var setHeight2 = "26px";
    if ($('body').hasClass('big')) {
        setHeight = "37px";
        setHeight2 = "36px";
    }

    // search
    updateSearchTablesHeight();

    // settings
    $("#mainsettings table")
    .css('max-height', setHeight)
    .find('.sectionedittd i.fa-angle-up').addClass('fa-angle-down').removeClass('fa-angle-up').show()
    .find('td.el').addClass('ellipsis');

    $(".newLayout table.defaulttablerow").each( function( index, element ) {
        var table = $(element);
        table.css('max-height', setHeight);
    });

    $("#mainmenu.newLayout table.defaulttablerow").each( function( index, element ) {
        var table = $(element);
        
        table.css('max-height', setHeight2);
    });

    if ($('#linkChange').attr("cid") != "new") {
        $('#linkChange').find("table:not(.defaulttablerow):not(.newlinktable)").each( function( index, element ) {
            var table = $(element);
        
            table.css('max-height', setHeight);
            table.find('.sectionedittd i').addClass('fa-angle-down').removeClass('fa-angle-up');
            table.find('td.el').addClass('ellipsis');
        });
    }
    
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
        var setHeight = "26px";

        if ($('body').hasClass('big'))
            setHeight = "37px";
    
        $('#linkChange').find("table:not(.buttonstable)").each( function( index, element ) {
            var table = $(element);

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
        
        $('#editTags').css('margin-top', '75px');  
        
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

        $('#postedby').attr("cauthor", jsonobj.author);
        var authorchanged = readCookie(jsonobj.id + "author");
        if (authorchanged && authorchanged.length > 0) {
            $("#linkChange .buttonstable tr:first-child td .author").html(authorchanged);
            if (showColors && jsonobj.author != authorchanged) {
                $("#linkChange .buttonstable tr:first-child td .author").css('color','#00ff72');
            }
            else {
                $("#linkChange .buttonstable tr:first-child td .author").css('color','');
            }
            $("#linkChange .buttonstable tr:first-child td .authorinput").val(authorchanged);
        } 
        else {
            $("#linkChange .buttonstable tr:first-child td .author").css('color','');

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
        $('#date').attr("cdate", jsonobj.date);
        if (datechanged && datechanged.length > 0) {
            $("#linkChange .buttonstable tr:first-child td .date").html(formatDateFromNum(datechanged));
            
            if (showColors && jsonobj.date != datechanged) {
                $("#linkChange .buttonstable tr:first-child td .date").css('color','#00ff72');
            }
            else {
                $("#linkChange .buttonstable tr:first-child td .date").css('color','');
            }
            $("#linkChange .buttonstable tr:first-child td .dateinput").val(datechanged);
        } 
        else {
            $("#linkChange .buttonstable tr:first-child td .date").css('color','');
            console.log(44444);
            var date = jsonobj.date.toString();
            if (date.length > 0) {
                console.log(55555);
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

        if (tagchanged && tagchanged.length > 0) {
            hasChanges = true;

            if (showColors && jsonobj.tags != tagchanged) {
                currenttagdisplay.css('color','#00ff72');
            }

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

        if (catchanged && catchanged.length > 0) {
            hasChanges = true;
            
            if (showColors && jsonobj.categories != catchanged) {
                currentcatdisplay.css('color','#00ff72');
            }

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

        if (classifchanged && classifchanged.length > 0) {
            hasChanges = true;

            if (showColors && jsonobj.classif != classifchanged) {            
                currentclassifdisplay.css('color','#00ff72');
            }

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

        if (infochanged && infochanged.length > 0) {
            hasChanges = true;
            
            if (showColors && jsonobj.info != infochanged) {
                currentinfodisplay.css('color','#00ff72');
            }

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

        updateLinkColor(jsonobj);
    }
    else {

        dblFlag = false;

        $('#linkChange').find("table:not(.defaulttablerow):not(.newlinktable)").each( function( index, element ) {
            var table = $(element);

            table.css('transition', 'none !important');
            if (table.attr("cmaxheight")) {
                if ($('body').hasClass('big')) {
                    table.css('max-height', table.attr("cmaxheightbig"));
                }
                else {
                    table.css('max-height', table.attr("cmaxheight"));
                }
            }
            else {
                table.css('max-height', "fit-content");
            }

            table.find('.sectionedittd i').hide();
        });
        
        var setHeight = "26px";

        if ($('body').hasClass('big'))
            setHeight = "37px";
        
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

    if (showColors) {
        $(".originaltr").show();
    }
    else {
        $(".originaltr").hide();
    }

    //$('#linkChange').fadeIn(); 

    //updateTopPosition("linkChange"); 
    
    $('#linkChange').css('transition', 'transition: all 0.01s');
    $('#linkChange').css("height", "calc(100%)");


    if ($('#linkChange').hasClass("new")) {
        if ($('body').hasClass('big')) {
            $('#linkChange').css("top", "-815px");
        }
        else {
            $('#linkChange').css("top", "-715px");
        }
    }     
    else {
        if ($('body').hasClass('big')) {
            $('#linkChange').css("top", "-300px");
        }
        else {
            $('#linkChange').css("top", "-233px");
        } 
    }
        
    $('#linkChange').css("background", "transparent");

    $('#linkChange').slideDown();

    $('#linkChange').attr("style", "top: 0px;transition: all 0.8s cubic-bezier(0.01, 0.76, 0.65, 0.96) 0.5s, background 1.1s, height 0.2s;");

    setTimeout(function(){
        $('#linkChange').css('background', 'var(--soft-transp-color)');
    }, 600);
} 

var openMainSettingsPopup = function(jsonobj) 
{
    closeallnewlayout();

    $('body, html').css('overflow-y', 'hidden');

    if (!isMy) {
        $("#mainsettings table.ismy").each( function( index, element ) {
            $(element).css('display', 'none');
        });
    }

    var setHeight = "26px";

    if ($('body').hasClass('big'))
        setHeight = "37px";

    $("#mainsettings table.expd").each( function( index, element ) {
        var table = $(element);

        table.css('max-height', setHeight);
        table.find('.sectionedittd i').addClass('fa-angle-down').removeClass('fa-angle-up').show();
        table.find('td.el').addClass('ellipsis');
    });

    $("#mainsettings table.single").each( function( index, element ) {
        var table = $(element);

        table.css('max-height', setHeight);
    });

    

    putChoosedThemTop();


    // Show colors
    var value = null;
    if (showColorsAdv) {
        if (showColors) {
            value = "All";
        }
        else {
            value = "Medium";
        }
    }
    else {
        value = "Minimal";
    }

    $("#colordisplay").text(value);

    $('#colorul').find(".litags").each( function( index, element ) {
        if($(element).html().trim() == value) {
            $(element).addClass("selectedtag");
        }
        else {
            $(element).removeClass("selectedtag");
        }
    });


    // Use help
    value = null;

    value = readCookie("help");
    value = value == "" ? "Yes" : "No";

    $("#helpdisplay").text(value);
    
    $('#helpul').find(".litags").each( function( index, element ) {
        if($(element).html().trim() == value) {
            $(element).addClass("selectedtag");
        }
        else {
            $(element).removeClass("selectedtag");
        }
    });

    if (value == "No") {
        $( ".fa-question-circle:not(.ashow)" ).each( function( index, element ){
            $(element).css("display", "none");
        });
    }

    // Open links inside
    value = null;

    value = readCookie("linksinside");

    if (value && value.length > 0) {
        value = "No";

        $('#doublefstr').css("opacity", 0.5);
        $('#doublefsul').find(".litags").each( function( index, element ) {
            $(element).addClass("disable");
        });
        
        $('#maximumfstr').css("opacity", 0.5);
        $('#maximumfsul').find(".litags").each( function( index, element ) {
            $(element).addClass("disable");
        });
    }
    else {
        value = "Yes";

        $('#doublefstr').css("opacity", 1);
        $('#doublefsul').find(".litags").each( function( index, element ) {
            $(element).removeClass("disable");
        });

        $('#maximumfstr').css("opacity", 1);
        $('#maximumfsul').find(".litags").each( function( index, element ) {
            $(element).removeClass("disable");
        });
    }
    
    $('#linksinsideul').find(".litags").each( function( index, element ) {
        if($(element).html().trim() == value) {
            $(element).addClass("selectedtag");
        }
        else {
            $(element).removeClass("selectedtag");
        }
    });


    // double click outside
    value = null;

    value = readCookie("doublefs");

    if (value && value.length > 0) {
        value = "No";
    }
    else {
        value = "Yes";
    }
    $('#doublefsul').find(".litags").each( function( index, element ) {
        if($(element).html().trim() == value) {
            $(element).addClass("selectedtag");
        }
        else {
            $(element).removeClass("selectedtag");
        }
    });
   

    // maximum fs
    value = null;

    value = readCookie("maximumfs");

    if (value && value.length > 0) {
        value = "Yes";
    }
    else {
        value = "No";
    }
    $('#maximumfsul').find(".litags").each( function( index, element ) {
        if($(element).html().trim() == value) {
            $(element).addClass("selectedtag");
        }
        else {
            $(element).removeClass("selectedtag");
        }
    });


    // Use swipes
    value = null;

    if (useSwipes) {
        value = "Yes";
    }
    else {
        value = "No";
    }

    $("#swipedisplay").text(value);
    
    $('#swipeul').find(".litags").each( function( index, element ) {
        if($(element).html().trim() == value) {
            $(element).addClass("selectedtag");
        }
        else {
            $(element).removeClass("selectedtag");
        }
    });
    
    // See victorywillcome tweets
    value = null;

    if (showAll) {
        value = "Yes";
    }
    else {
        value = "No";
    }

    $("#VWCdisplay").text(value);
    
    $('#VWCul').find(".litags").each( function( index, element ) {
        if($(element).html().trim() == value) {
            $(element).addClass("selectedtag");
        }
        else {
            $(element).removeClass("selectedtag");
        }
    });
    
    // premium
    var ceec = readCookie("eec");

    // xyz fakepass
    $('#unlockinput').val("x20#002e");
    
    if (ceec && ceec.length > 0 ) {
        $('#unlockdisplay').text("Unlocked");
    }
    else {
        $('#unlockdisplay').text("Locked");
    }
    


    $('#mainsettings').css('transition', 'transition: all 0.01s');
    $('#mainsettings').css("height", "calc(100%)");

    if ($('body').hasClass('big')) {
        $('#mainsettings').css("top", "-275px");
    }
    else {
        $('#mainsettings').css("top", "-215px");
    }

    $('#mainsettings').css("background", "transparent");

    $('#mainsettings').slideDown();

    $('#mainsettings').attr("style", "top: 0px;transition: all 0.8s cubic-bezier(0.01, 0.76, 0.65, 0.96) 0.5s, background 1.1s, height 0.2s;");

    setTimeout(function(){
        $('#mainsettings').css('background', 'var(--soft-transp-color)');
    }, 600);

} 


var getLinkColor = function(id) 
{
    var functorun = function(jsonvar) 
    { 
        var isdeleted = readCookie(id + "isdeleted");
        if (jsonvar.deleted != "" || (isdeleted && isdeleted.length > 0)) {
            return "red";
        }
        else {
    
            if (jsonvar.isnew && jsonvar.isnew != "") {
                return "#00dc00";
            }
            else {
                var hasChanges = false;
    
                var tagchanged = readCookie(id + "tagchanged");
                if (tagchanged && tagchanged.length > 0) {
                    hasChanges = true;
                } 
            
                var catchanged = readCookie(id + "catchanged");
                if (catchanged && catchanged.length > 0) {
                    hasChanges = true;
                } 
            
                var classifchanged = readCookie(id + "classif");
                if (classifchanged && classifchanged.length > 0) {
                    hasChanges = true;
                } 
            
                var infochanged = readCookie(id + "info");
                if (infochanged && infochanged.length > 0) {
                    hasChanges = true;
                }
    
                var author = readCookie(id + "author");
                if (author && author.length > 0) {
                    hasChanges = true;
                }

                var datechanged = readCookie(id + "datechanged");
                if (datechanged && datechanged.length > 0) {
                    hasChanges = true;
                }
                
                if (hasChanges) 
                    return "#f18618";
                else 
                   return "";
            }
        }
    } 
    getJsonbyid(id, functorun);
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
        if ($(obj).val().length > 0) {
            if ($(obj).val() != $('#postedby').attr("cauthor")) {
                createCookie($('#linkChange').attr("cid") + "haschanges", "yes");
                createCookie($('#linkChange').attr("cid") + "author", $(obj).val());
                if (showColors) {
                    otherObj.css('color','#00ff72');
                }
            }
            else {
                createCookie($('#linkChange').attr("cid") + "author", "");
            }
            otherObj.html($(obj).val());
        }
        else
            otherObj.html("--"); 

        updateLinkColor(null, $('#linkChange').attr("cid"));

        otherObj.show();
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

    $('#linkChange').css('transition', 'all 1.7s');
    $('#linkChange').css('opacity', 0);

    setTimeout(function(){
        $('#linkChange').hide();
        $('#linkChange').css('opacity', 1);

        var setHeight = "26px";

        if ($('body').hasClass('big'))
            setHeight = "37px";
    
        $('#linkChange').find("table:not(.buttonstable)").each( function( index, element ) {
            var table = $(element);
            
            table.css('transition', 'transition: all 0.7s !important');
            table.css('max-height', setHeight);
            table.find('.sectionedittd i').addClass('fa-angle-down').removeClass('fa-angle-up').attr('style', '');
            table.find('td.el').addClass('ellipsis');
        });
    }, 700);

}




function closeMainSettingsPopup(obj) {
    if (obj)
        fixfocus(obj);
    $('body, html').css('overflow-y', 'auto');
    //$('#mainsettings').fadeOut(600);

    $('#mainsettings').css('transition', 'all 1.7s');
    $('#mainsettings').css('opacity', 0);

    setTimeout(function(){
        $('#mainsettings').hide();
        $('#mainsettings').css('opacity', 1);

        var setHeight = "26px";

        if ($('body').hasClass('big'))
            setHeight = "37px";
    
        $('#mainsettings').find("table.sectionexpandable:not(.buttonstable)").each( function( index, element ) {
            var table = $(element);
            
            table.css('transition', 'transition: all 0.7s !important');
            table.css('max-height', setHeight);
            table.find('.sectionedittd i').addClass('fa-angle-down').removeClass('fa-angle-up').attr('style', '');
            table.find('td.el').addClass('ellipsis');
        });
    }, 700);
}





function toggleShowDeleted() {
    if (!$("#showdeleted").is(":checked")) {
        $("#showdeleted").prop('checked', false);
        $("#showdeleted2").prop('checked', false);
        setshowdeletedcookie("false");
    }
    else {
        $("#showdeleted").prop('checked', true);
        $("#showdeleted2").prop('checked', true);
        setshowdeletedcookie("true");
    }
    countalltweets();
}

function toggleShowDeleted2() {

    if (!$("#showdeleted2").is(":checked")) {
        $("#showdeleted").prop('checked', false);
        $("#showdeleted2").prop('checked', false);
        setshowdeletedcookie("false");
    }
    else {
        $("#showdeleted").prop('checked', true);
        $("#showdeleted2").prop('checked', true);
        setshowdeletedcookie("true");
    }
    countalltweets();
}

function toggleShowDeletedAll() {

    if ($("#showdeleted2").is(":checked")) {
        $("#showdeleted").prop('checked', false);
        $("#showdeleted2").prop('checked', false);
        setshowdeletedcookie("false");
    }
    else {
        $("#showdeleted").prop('checked', true);
        $("#showdeleted2").prop('checked', true);
        setshowdeletedcookie("true");
    }
    countalltweets();
}

function setShowDeleted(flag) {

    if (flag == "false") {
        $("#showdeleted").prop('checked', false);
        $("#showdeleted2").prop('checked', false);
        setshowdeletedcookie("false");
    }
    else {
        $("#showdeleted").prop('checked', true);
        $("#showdeleted2").prop('checked', true);
        setshowdeletedcookie("true");
    }
    countalltweets();
}

function closeMenuPopup(obj) {

    if (obj)
        fixfocus(obj);
 
    $('body, html').css('overflow-y', 'auto');

    $('#mainmenu').css('transition', 'all 1.7s');
    $('#mainmenu').css('opacity', 0);

    setTimeout(function(){
        $('#mainmenu').hide();
        $('#mainmenu').css('opacity', 1);
    }, 700);
    /*
        $('body, html').css('overflow-y', 'auto');

    $('#mainmenu').css('transition', 'transition: all 0.01s');

    $('#mainmenu').css("background", "transparent");

    $('#mainmenu').attr("style", "top: -391px;height: 405px;background: transparent;transition: all 0.3s cubic-bezier(0.01, 0.76, 0.65, 0.96) 0.5s;");

    setTimeout(function(){
        $('#mainmenu').hide();
    }, 1100);
    */
}

function editSetting(e, obj, flag) {
    e.stopPropagation();

    if ($('#linkChange').attr("cid") != "new" || flag) {
        var setHeight = "26px";

        if ($('body').hasClass('big'))
            setHeight = "37px";
    
        var table = $(obj).parent().parent();
        if (table.css('max-height') == setHeight) {
            var hasExpanded = false;
            $("#mainsettings table.expd").each( function( index, element ) {
                var table = $(element);
        
                table.css('max-height', setHeight);
                table.find('.sectionedittd i').addClass('fa-angle-down').removeClass('fa-angle-up').show();
                table.find('td.el').addClass('ellipsis');
            });

            $("#mainsettings table.single").each( function( index, element ) {
                var table = $(element);
        
                table.css('max-height', setHeight);
            });

            $('#linkChange').find("table:not(.buttonstable)").each( function( index, element ) {
                var table = $(element);
                
                table.css('transition', 'transition: all 0.7s !important');
                table.css('max-height', setHeight);
                table.find('.sectionedittd i').addClass('fa-angle-down').removeClass('fa-angle-up').attr('style', '');
                table.find('td.el').addClass('ellipsis');
            });
            
            table.css('transition', 'transition: all 0.7s !important');
            if (table.attr("cmaxheight")) {
                if ($('body').hasClass('big')) {
                    table.css('max-height', table.attr("cmaxheightbig"));
                }
                else {
                    table.css('max-height', table.attr("cmaxheight"));
                }
            }
            else {
                table.css('max-height', "fit-content");
            }
            
            if (table.attr("extrastyle")) {
                table.css('overflow-y', "auto");
            }
            else {
                table.css('overflow-y', "hidden");
            }

            if (table.attr('id') != 'editInfo')
                table.find('td.el').removeClass('ellipsis');

            table.find('.sectionedittd i').addClass('fa-angle-up').removeClass('fa-angle-down');
        }
        else {
            table.css('transition', 'transition: all 0.7s !important');
            table.css('overflow-y', "hidden");
            table.css('max-height', setHeight);
            table.find('.sectionedittd i').addClass('fa-angle-down').removeClass('fa-angle-up');
            table.find('td.el').addClass('ellipsis');
        }
    }
    
    //updateTopPosition("linkChange"); 
}

function updateTopPosition(obj) { 
    return false;

    setTimeout(function(){
        var isLandscape = window.innerWidth < 1200 && window.innerWidth > 700;
        var innerHeight = window.innerHeight;
        var htmlElem = $("#" + obj + " > div");
        var maxHeightStyle = "max-height: " + (innerHeight - 125) + "px !important;";

        if (obj == "linkChange") {
            if (isLandscape) {

                maxHeightStyle = "margin-top: -1px !important;max-height: " + (innerHeight - 67) + "px !important;";
    
                htmlElem.attr("style", maxHeightStyle);     
    
                htmlElem.attr("style", maxHeightStyle + "top: " + (155 - (htmlElem.height() / 2)) + "px !important;"); 
            }
            else {
    
                if ($('body').hasClass('big')) {
                    maxHeightStyle = "max-height: " + (innerHeight - 137) + "px !important;";
                }
                htmlElem.attr("style", "margin-top: -1px !important;" + maxHeightStyle);     
    
                htmlElem.attr("style", "margin-top: -1px !important;" + maxHeightStyle + "top: " + ((innerHeight / 2) - (htmlElem.height() / 2)) + "px !important;"); 
            }
        }
        else {
            if ($('body').hasClass('big')) {
                maxHeightStyle = "max-height: " + (innerHeight - 137) + "px !important;";
            }
            htmlElem.attr("style", maxHeightStyle);     

            htmlElem.attr("style", maxHeightStyle + "margin-top: " + ((innerHeight / 2) - (htmlElem.height() / 2) - 65) + "px !important;"); 

        }
        
    }, 140);
    
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
        createCookie($('#linkChange').attr("cid") + "tagchanged", "");
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
        createCookie($('#linkChange').attr("cid") + "haschanges", "");

    updateLinkColor(null, $('#linkChange').attr("cid"));
    
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

function updateLinkColor(val, id) {
    var functorun = function(val) 
    { 
        var isdeleted = readCookie(val.id + "isdeleted");
        if (val.deleted != "" || (isdeleted && isdeleted.length > 0)) { 
            if (showColors) {
                $("#" + val.id).find("i.linkbar").css("color", "red"); 
                $("#seticon").attr("style", "color: red;");
            }
            else {
                if (showColorsAdv) {
                    $("#seticon").attr("style", "color: red;");
                }
            }
        } 
        else if (showColors) {
            if (val.isnew && val.isnew != "") { 
                $(".tweet#" + val.id).find("i.linkbar").css("color", "#00dc00"); 
                $("#seticon").attr("style", "color: #00dc00;");
            }
            else {
                var hasChanges = readCookie(val.id + "haschanges");
                if (hasChanges && hasChanges.length > 0) { // HAS CHAMGES
                    $(".tweet#" + val.id).find("i.linkbar").css("color", "#f18618"); 
                    $("#seticon").attr("style", "color: #f18618;");
                } 
                else {
                    $(".tweet#" + val.id).find("i.linkbar").css("color", ""); 
                    $("#seticon").css("color", ""); 
                }
            }
        }
        else {
            if (showColorsAdv) {
                if (val.isnew && val.isnew != "") { 
                    $("#seticon").attr("style", "color: #00dc00;");
                }
                else {
                    $(".tweet#" + val.id).find("i.linkbar").css("color", ""); 
                    $("#seticon").css("color", ""); 
                }
            }
            else {
                $(".tweet#" + val.id).find("i.linkbar").css("color", ""); 
                $("#seticon").css("color", ""); 
            }
        }
    } 

    if (id) {
        getJsonbyid(id, functorun);
    }
    else {
        functorun(val);
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
        createCookie($('#linkChange').attr("cid") + "catchanged", "");
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
        createCookie($('#linkChange').attr("cid") + "haschanges", "");

    updateLinkColor(null, $('#linkChange').attr("cid"));

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
        createCookie($('#linkChange').attr("cid") + "classif", "");
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
        createCookie($('#linkChange').attr("cid") + "haschanges", "");

    updateLinkColor(null, $('#linkChange').attr("cid"));
    
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
                createCookie($('#linkChange').attr("cid") + "info", "");
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
                createCookie($('#linkChange').attr("cid") + "haschanges", "");

            updateLinkColor(null, $('#linkChange').attr("cid"));

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
    } 
    $('#infoinput').trigger("keyup");

    showMessage("Information reverted", null, "fa-undo", "", null, "undo");
}



function clickLiColors(e, obj) {
    e.stopPropagation();

    if (!$(obj).hasClass("selectedtag")) {
        var value = $(obj).html().trim();
        $('#colorul').find(".litags").each( function( index, element ) {
            if($(element).html().trim() == value) {
                $(element).addClass("selectedtag");
            }
            else {
                $(element).removeClass("selectedtag");
            }
        });

        if (value == "All") {
            showColors = true;
            showColorsAdv = true;
        }
        else if (value == "Medium") {
            showColors = false;
            showColorsAdv = true;   
        }
        else {
            showColors = false;
            showColorsAdv = false;
        }

        $("#colordisplay").text(value);
        createCookie("colors", value, 99999);

        showMessage("Color Mode Changed To " + value, null, null, null, null, null);
    }  
}


function clickLiDoublefs(e, obj) {
    e.stopPropagation();

    if (!$(obj).hasClass("disable")) {
        if (!$(obj).hasClass("selectedtag")) {
            var value = $(obj).html().trim();
            $('#doublefsul').find(".litags").each( function( index, element ) {
                if($(element).html().trim() == value) {
                    $(element).addClass("selectedtag");
                }
                else {
                    $(element).removeClass("selectedtag");
                }
            });
    
            if (value == "Yes") {
                showMessage("Double click/long press opens the link outside on", null, null, null, null, null);
                
                createCookie("doublefs", "", 99999);
            }
            else {
                showMessage("Double click/long press opens the link outside off", null, null, null, null, null); 
                createCookie("doublefs", "s", 99999);
            }
        }  
    }

}

function clickLiMaximumfs(e, obj) {
    e.stopPropagation();

    if (!$(obj).hasClass("disable")) {
        if (!$(obj).hasClass("selectedtag")) {
            var value = $(obj).html().trim();
            $('#maximumfsul').find(".litags").each( function( index, element ) {
                if($(element).html().trim() == value) {
                    $(element).addClass("selectedtag");
                }
                else {
                    $(element).removeClass("selectedtag");
                }
            });
    
            if (value == "Yes") {
                showMessage("Use maximum available space in fullscreen on", null, null, null, null, null);
                
                createCookie("maximumfs", "", 99999);
            }
            else {
                showMessage("Use maximum available space in fullscreen off", null, null, null, null, null); 
                createCookie("maximumfs", "s", 99999);
            }
        }  
    }

}

function clickLiLinksinside(e, obj) {
    e.stopPropagation();


    if (!$(obj).hasClass("selectedtag")) {
        var value = $(obj).html().trim();
        $('#linksinsideul').find(".litags").each( function( index, element ) {
            if($(element).html().trim() == value) {
                $(element).addClass("selectedtag");
            }
            else {
                $(element).removeClass("selectedtag");
            }
        });

        if (value == "Yes") {
            showMessage("Open HTLM/Youtube links inside the application on", null, null, null, null, null);
            
            $('#doublefstr').css("opacity", 1);

            $('#doublefsul').find(".litags").each( function( index, element ) {
                $(element).removeClass("disable");
            });
            $('#maximumfstr').css("opacity", 1);

            $('#maximumfsul').find(".litags").each( function( index, element ) {
                $(element).removeClass("disable");
            });

            createCookie("linksinside", "", 99999);
        }
        else {
            showMessage("Open HTLM/Youtube links inside the application off", null, null, null, null, null); 
            createCookie("linksinside", "s", 99999);

            $('#doublefstr').css("opacity", 0.5);

            $('#doublefsul').find(".litags").each( function( index, element ) {
                $(element).addClass("disable");
            });
                    
            $('#maximumfstr').css("opacity", 0.5);

            $('#maximumfsul').find(".litags").each( function( index, element ) {
                $(element).addClass("disable");
            });    
        }
    }  

}






function clickLiSwipes(e, obj) {
    e.stopPropagation();

    if (!$(obj).hasClass("selectedtag")) {
        var value = $(obj).html().trim();
        $('#swipeul').find(".litags").each( function( index, element ) {
            if($(element).html().trim() == value) {
                $(element).addClass("selectedtag");
            }
            else {
                $(element).removeClass("selectedtag");
            }
        });

        if (value == "Yes") {
            showMessage("Swipes turned On", null, null, null, null, null);
            useSwipes = true;
        }
        else {
            showMessage("Swipes turned Off", null, null, null, null, null);
            useSwipes = false;  
        }

        $("#swipedisplay").text(value);
        createCookie("swipes", value, 99999);
    }  
}

function clickLiHelp(e, obj) {
    e.stopPropagation();

    if (!$(obj).hasClass("selectedtag")) {
        var value = $(obj).html().trim();
        $('#helpul').find(".litags").each( function( index, element ) {
            if($(element).html().trim() == value) {
                $(element).addClass("selectedtag");
            }
            else {
                $(element).removeClass("selectedtag");
            }
        });

        if (value == "Yes") {
            showMessage("Help icons are shown", null, null, null, null, null);
            $( ".fa-question-circle:not(.ashow)" ).each( function( index, element ){
                $(element).css("display", "block");
            });
        }
        else {
            showMessage("Help icons are hidden", null, null, null, null, null);
            $( ".fa-question-circle:not(.ashow)" ).each( function( index, element ){
                $(element).css("display", "none");
            });
        }

        $("#helpdisplay").text(value);

        if (value == "Yes")
            createCookie("help", "", 99999);
        else
            createCookie("help", value, 99999);
    }  
}

function clickLiVWC(e, obj) {
    e.stopPropagation();

    if (!$(obj).hasClass("selectedtag")) {
        var value = $(obj).html().trim();
        $('#VWCul').find(".litags").each( function( index, element ) {
            if($(element).html().trim() == value) {
                $(element).addClass("selectedtag");
            }
            else {
                $(element).removeClass("selectedtag");
            }
        });

        if (value == "Yes") {
            

            // START mapa categorias
            var catschanged = readCookie("cat-cli");

            showMessage("VictoryWillCome Tweets Shown", null, null, null, null, null);
            showAll = true;

            changeCatsText(false);
        }
        else {
            createCookie("cat-cli", "", 99999);

            showMessage("VictoryWillCome Tweets Hidden", null, null, null, null, null);
            showAll = false;  

            changeCatsText(true);
        }

        $("#VWCdisplay").text(value);
        createCookie("vwc", value, 99999);
        countalltweets();
    }  
}

function changeCatsText(changed) {
    if (changed) {
        createCookie("cat-cli", "My Tweets", 99999);
        $(".cat-cli").text("My Tweets");
        catsmap.set("cli", "My Tweets");
    }
    else {
        createCookie("cat-cli", "", 99999);
        $(".cat-cli").text("VictoryWillCome Tweets");
        catsmap.set("cli", "VictoryWillCome Tweets");
    }
}

function triggerUpload() {
    $('#files').trigger("click");  
}

function unl() {
     
    var ded = CryptoJS.AES.decrypt("U2FsdGVkX18wrpX9qtgpVRefS/x73IjGWl7asgInrKw=", $('#unlockinput').val());

    if (ded.toString(CryptoJS.enc.Utf8) == "x20#0000002e") {
        createCookie("eec", $('#unlockinput').val());

        $('#unlockdisplay').text("Unlocked");
        
        showMessage("You Are Now A Primium User!"); 
    }
    else {
        $('#unlockdisplay').text("Locked");
        
        createCookie("eec", "");
        showMessage("Invalid Code"); 
    }
}

function dunl() {
    var ceec = readCookie("eec");

    if (ceec && ceec.length > 0 ) {
        var ded = CryptoJS.AES.decrypt("U2FsdGVkX18wrpX9qtgpVRefS/x73IjGWl7asgInrKw=", ceec);

        if (ded.toString(CryptoJS.enc.Utf8) == "x20#0000002e") {
            return true; 
        }
    }
                    
    return false;                
}




function openHelp(obj, type) {
    if (obj)
        fixfocus(obj);

    switch(type) {
        case "help":
            $('#helpcontent').html("<span>If selected the user will see the help icons throughout the aplication."
                + "</span>"
                + "<span style=\"display: block;height: 8px;\"></span>" 
                + "<span>Clicking in one of the icons will open a pop-up with information about the functionality where it is displayed."
                + "</span>");

            $('#helptitle').text("Help About Functionalities");
            $('#helpicon').attr("class", "fa fa-question-circle");

            break; 

        case "unlock":
            $('#helpcontent').html("<span>If you have a premium code, enter it and press the button to unlock the app."
                + "</span>"
                + "<span style=\"display: block;height: 8px;\"></span>" 
                + "<span>If you don't have it, go to the donate section in these settings to get one."
                + "</span>");

            $('#helptitle').text("Unlocking The App");
            $('#helpicon').attr("class", "fa fa-unlock");

            break;   

        case "download":
            $('#helpcontent').html("<span>Allows to make a backup of the links created, modified and changed by the user."
                + "</span>"
                + "<span style=\"display: block;height: 8px;\"></span>" 
                + "<span>As the links are stored in the browser cookies, so it is advisable to make a backup once in a while."
                + "</span>"                    
                + "<span style=\"display: block;height: 8px;\"></span>" 
                + "<span>If you want to use in different devices, to pass the links to another one, you have to make this download and upload it the desired device."
                + "</span>");

            $('#helptitle').text("Downloading Links");
            $('#helpicon').attr("class", "fa fa-download");
            break;
            
            case "upload":
                $('#helpcontent').html("<span>Allows to upload a previous backup."
                    + "</span>"
                    + "<span style=\"display: block;height: 8px;\"></span>" 
                    + "<span>This upload will erase all the current changes in the application and apply the ones in this backup file."
                    + "</span>");
    
                $('#helptitle').text("Uploading Links");
                $('#helpicon').attr("class", "fa fa-upload");
                break;    
                
            case "purge":
                $('#helpcontent').html("<span>It will remove forever the links marked as deleted."
                    + "</span>");
    
                $('#helptitle').text("Purge Deleted Links");
                $('#helpicon').attr("class", "fa fa-times-circle");
                break;   
                
            case "vwc":
                $('#helpcontent').html("<span>If selected, Victory Will Come Links will be shown."
                + "</span>"
                + "<span style=\"display: block;height: 8px;\"></span>" 
                + "<span>If not, only the ones added by the user will be shown."
                + "</span>");
    
                $('#helptitle').text("Show Victory Will Come Links");
                $('#helpicon').attr("class", "fa fa-star");
                break; 
                
            case "swipe":
                $('#helpcontent').html("<span>If selected, the user can make gestures to execute functions on certain screens. Different functions and swipes:"
                + "</span>"
                + "<span style=\"display: block;height: 8px;\"></span>" 
                + "<span>MAIN SCREEN</span><br>"
                + "<span>up or right - open search screen</span><br>" 
                + "<span>bottom or left - open categories menu</span>"
                + "<span style=\"display: block;height: 8px;\"></span>" 
                + "<span>CATEGORIES MENU</span><br>"
                + "<span>up or down - close menu</span><br>"
                + "<span>left - toggle show deleted links</span>" 
                + "<span>right - open all links</span>"
                + "<span style=\"display: block;height: 8px;\"></span>" 
                + "<span>SEARCH SCREEN</span><br>"
                + "<span>up or down - close screen</span><br>"
                + "<span>left - reset search fields</span>" 
                + "<span>right - execute search</span>"
                + "<span style=\"display: block;height: 8px;\"></span>" 
                + "<span>LINK DISPLAY AREA</span><br>"
                + "<span>up - go to top</span><br>"
                + "<span>down - close search</span><br>"
                + "<span>left - copy current link to clipboard</span><br>" 
                + "<span>right - open current link detail</span>"
                + "<span style=\"display: block;height: 8px;\"></span>" 
                + "<span>LINK DETAIL SCREEN</span><br>"
                + "<span>up, down, left or right - close screen</span><br>"
                + "<span style=\"display: block;height: 8px;\"></span>" 
                + "<span>CALENDAR POP-UP</span><br>"
                + "<span>up or down - close pop-up</span><br>"
                + "<span>left - previous month</span><br>" 
                + "<span>right - next month</span>"
                + "<span style=\"display: block;height: 8px;\"></span>" 
                + "<span>SETTINGS SCREEN</span><br>"
                + "<span>up, down, left or right - close screen</span><br>"
                + "<span style=\"display: block;height: 8px;\"></span>" 
                + "<span>HELP POP-UP</span><br>"
                + "<span>up, down, left or right - close pop-up</span><br>");

                $('#helptitle').text("Use swipes");
                $('#helpicon').attr("class", "fa fa-arrows");
                break;   
                
            case "colors":
                $('#helpcontent').html("<span>Colors are used to mark the changes made by the user. Changed link field, newly created link or a deleted link."
                + "</span>"
                + "<span style=\"display: block;height: 8px;\"></span>" 
                + "<span>minimal - almost no color is shown"
                + "</span>"
                + "<span style=\"display: block;height: 8px;\"></span>" 
                + "<span>medium - the colors are shown only in the link detail"
                + "</span>"
                + "<span style=\"display: block;height: 8px;\"></span>" 
                + "<span>all - the colors are shown in both link display area and link detail"
                + "</span>");
    
                $('#helptitle').text("Colors display");
                $('#helpicon').attr("class", "fa fa-paint-brush");
                break;
    }   

    $("#helppop").fadeIn(800);              
}


function closeHelpPopup(obj) {
    if (obj)
        fixfocus(obj);
    
    $("#helppop").fadeOut(800);               
}

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////