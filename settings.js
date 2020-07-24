



/////////////////////////////////////////////////////////////////////////
//                             GENERAL                                 //
/////////////////////////////////////////////////////////////////////////

function expandCatPre() {
    expandCat(null, $("#fsPopup iframe").attr("cid"));
}

function expandCat(obj, idparam, valid) {

    var id = null;

    if (obj)
        vibrateApp(300);
    
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

    var jsonvar = getJsonbyid(id);
    
    if (jsonvar != null) {
        openDetailPopup(jsonvar);
    }
}

function fixfocus(el, flag, otherproperty)
{
    var newel = $(el).clone(el).insertAfter($(el));
    $(el).remove();

    if (flag) {

    }
    else {
        var property = "color";
        if (otherproperty)
            property = otherproperty;

        newel.css("transition", property + " 0.3s").css(property, "#ffff6c");
        setTimeout(function(){
            newel.css(property, "").css("transition", "");
        }, 400);  
    }
}

function fixfocusli(el)
{
    var newel = $(el);

    newel.addClass("yeffect");
    setTimeout(function(){    
        newel.removeClass("yeffect");
    }, 400);  
}

function zoom(obj, flag) {
    if (obj) fixfocus(obj);
    
    $('body').addClass('notransit');

    if (flag || !$('body').hasClass('big')) {
        $('#zoomin').addClass('fa-search-minus');
        $('#zoomin').removeClass('fa-search-plus');
        $('body').addClass('big');
        createCookie("hasZoom", true);
    }
    else {
        $('#zoomin').addClass('fa-search-plus');
        $('#zoomin').removeClass('fa-search-minus');
        $('body').removeClass('big');
        createCookie("hasZoom", "", null, true);
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



var openDetailPopup = function(jsonobj, flag) 
{
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

        $('#editInfo').css('max-height', '300px');
        $('#editInfo').find('.sectionedittd i').addClass('fa-angle-up').removeClass('fa-angle-down').show();
        $('#editInfo').find('td.el').removeClass('ellipsis');
        $('#editInfo').find('.trcontent:not(.originaltr)').show();

        $(".fa-angle-up").show();  

        $('#linktable').hide();

        $('#previewtable').hide();

        $('#linkChange').attr("cid", jsonobj.id);
        $('#linkChange').attr("clink", jsonobj.url);
        $('#linkChange').removeClass("new");
        
        $('#editTags').css('margin-top', '100px');  
                
        $("#linkChange #seticon").attr('class','');

        $("#linkChange #seticon").addClass('fa').addClass('fa-twitter');
    
        $('#infoinput').prop('readonly', null);

        if (jsonobj.type == "H") {
            $("#linkChange #seticon").removeClass('fa-twitter').addClass('fa-internet-explorer');
        }
        else if (jsonobj.type == "Y") {
            $("#linkChange #seticon").removeClass('fa-twitter').addClass('fa-youtube-play');
        }   
        else if (jsonobj.type == "N") {
            $("#linkChange #seticon").removeClass('fa-twitter').addClass('fa-file-text');
        
            $('#infoinput').prop('readonly', 'true');
        }  

        $("#linkChange .buttonstable tr:first-child td .author").show();
        $("#linkChange .buttonstable tr:first-child td .authorinput").hide(); 

        $('#postedby').attr("cauthor", jsonobj.authorOri);
        if (jsonobj.authorOri != jsonobj.author && showColors) {
            $("#linkChange .buttonstable tr:first-child td .author").css('color','#00ff72');
        } 
        else {
            $("#linkChange .buttonstable tr:first-child td .author").css('color','');
        }
        if (jsonobj.author.length > 0) {
            $("#linkChange .buttonstable tr:first-child td .author").html(jsonobj.author);
            $("#linkChange .buttonstable tr:first-child td .authorinput").val(jsonobj.author);
        }
        else {
            $("#linkChange .buttonstable tr:first-child td .author").html("--&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
            $("#linkChange .buttonstable tr:first-child td .authorinput").val("");
        }

        $("#linkChange .buttonstable tr:first-child td .datetoshow").removeClass('extended');
        $("#linkChange .buttonstable tr:first-child td .date").show();
        $("#linkChange .buttonstable tr:first-child td .dateinput").hide(); 
        $("#linkChange .buttonstable tr:first-child td .datetoshow").hide(); 
        
        $('#date').attr("cdate", jsonobj.dateOri);
        if (jsonobj.dateOri != jsonobj.date) {
            if (showColors) {
                $("#linkChange .buttonstable tr:first-child td .date").css('color','#00ff72');
            }
            else {
                $("#linkChange .buttonstable tr:first-child td .date").css('color','');
            }
        } 
        else {
            $("#linkChange .buttonstable tr:first-child td .date").css('color','');
        }  
        if (jsonobj.date && jsonobj.date.trim().length > 0) {
            $("#linkChange .buttonstable tr:first-child td .date").html(formatDateFromNum(jsonobj.date));
            $("#linkChange .buttonstable tr:first-child td .dateinput").val(jsonobj.date);
        }
        else {
            $("#linkChange .buttonstable tr:first-child td .date").html("--&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
            $("#linkChange .buttonstable tr:first-child td .dateinput").val("");
        }


        $("#linkChange #editTags .fa-chevron-down").show();    
        
        $(".buttontdtohide").show();
        
        $('#removetweetp2').attr('class','').addClass('fa').addClass('fa-eraser').addClass('fa-flip-horizontal');

    
        // TAGS

        $('#tagsinput').attr("ctags", jsonobj.tagsOri);

        var currenttagdisplay = $('.currenttags');
        
        $('.originaltags').html(parseTags(jsonobj.tagsOri));

        if (!compareStringArrays(jsonobj.tags, jsonobj.tagsOri)) {

            if (showColors) {
                currenttagdisplay.css('color','#00ff72');
            }

            $('#tagsinput').val(jsonobj.tags);
            $('#originaltagtd i').show();
            
            $("#editTags .originaltr").show();
        } 
        else {
            currenttagdisplay.css("color","");
            $('#tagsinput').val(jsonobj.tags);
            $('#originaltagtd i').hide();
            
            $("#editTags .originaltr").hide();
        }
        currenttagdisplay.html(parseTags(jsonobj.tags));

        removeNonExistentLi();

        createNonExistentLi();

        // CAGTEGORIES

        $('#catsinput').attr("ccats", jsonobj.categoriesOri);

        var currentcatdisplay = $('.currentcats');

        $('.originalcats').html(parseCats(jsonobj.categoriesOri)); 

        if (!compareStringArrays(jsonobj.categories, jsonobj.categoriesOri)) {
            if (showColors) {
                currentcatdisplay.css('color','#00ff72');
            }
            $('#originalcattd i').show();
              
            $("#editCats .originaltr").show();
            
        } 
        else {
            currentcatdisplay.css("color","");
            $('#originalcattd i').hide();

            $("#editCats .originaltr").hide();
        }
        currentcatdisplay.html(parseCats(jsonobj.categories));
        $('#catsinput').val(jsonobj.categories);
        
        markCategoriesCheckBoxs();

        // CLASSIFICATION zz
        $('#classifinput').attr("cclassif", jsonobj.classifOri);

        var currentclassifdisplay = $('.currentclassif');

        if (jsonobj.classifOri != "0") {
            $('.originalclassif').html(jsonobj.classifOri); 
        }
        else {
            $('.originalclassif').html("--&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"); 
        }

        if (jsonobj.classif != jsonobj.classifOri) {

            if (showColors) {            
                currentclassifdisplay.css('color','#00ff72');
            }

            currentclassifdisplay.html(jsonobj.classif);
            $('#classifinput').val(jsonobj.classif);
            $('#originalclassiftd i').show();
            $("#editClassif .originaltr").show();
            markClassif(jsonobj.classif);
        } 
        else {
            $('#originalclassiftd i').hide();
            $("#editClassif .originaltr").show();
            
            currentclassifdisplay.css("color","");
            if (jsonobj.classif != 0) {
                currentclassifdisplay.html(jsonobj.classif);
                $('#classifinput').val(jsonobj.classif);
                markClassif(jsonobj.classif);
            }
            else {
                currentclassifdisplay.html("--&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
                $('#classifinput').val(0);
                markClassif(0);
            }
        }

        
        // INFO
        $('#infoinput').attr("cinfo", jsonobj.infoOri);

        var currentinfodisplay = $('.currentinfo');

        if (jsonobj.info != jsonobj.infoOri) {
            if (showColors) {            
                currentinfodisplay.css('color','#00ff72');
            }
            else {
                currentinfodisplay.css('color','');
            }
            
            $('#originalinfotd i').show();
            
            $("#editInfo .originaltr").show();

            if (jsonobj.info.length > 0)
                $('.originalinfo').html(decodeURIComponent(jsonobj.infoOri)); 
            else
                $('.originalinfo').html("--&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
        }
        else {
            currentinfodisplay.css('color','');
            $('#originalinfotd i').hide();
            $("#editInfo .originaltr").hide();
        }

        $('#infoinput').val(decodeURIComponent(jsonobj.info));
        
        if (jsonobj.info.length > 0)
            currentinfodisplay.html(decodeURIComponent(jsonobj.info));
        else
            currentinfodisplay.html("--&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");

        updateLinkColor(jsonobj);
    }
    else {
        $("#linkChange .originaltr").hide();
        $('#linkChange td.el').removeClass('ellipsis');

        dblFlag = false;
        
        $("#linkChange #seticon").attr('class','');

        $("#linkChange #seticon").addClass('fa').addClass('fa-twitter');
    
        if (addType == "H") {
            $("#linkChange #seticon").removeClass('fa-twitter').addClass('fa-internet-explorer');
        }
        else if (addType == "Y") {
            $("#linkChange #seticon").removeClass('fa-twitter').addClass('fa-youtube-play');
        }   
        else if (addType == "N") {
            $("#linkChange #seticon").removeClass('fa-twitter').addClass('fa-file-text');
            $('#linktable #tweet').val("");
            $('#linktable').show();
        }  

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

            table.find('.trcontent:not(.originaltr)').css("display", "table-row");
            
            table.find('.sectionedittd i').hide();
        });
        
        var setHeight = "26px";

        if ($('body').hasClass('big'))
            setHeight = "37px";
        
        $('#linktable').css('max-height', setHeight);

        $('#linkChange').attr("cid", "new");
        $('#linkChange').addClass("new");

        $('#previewtable').hide();

        $('.currenttags').html("--&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");  
        $('.currentcats').html("--&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");  
        $('.currentinfo').html("--&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");  
        $('.currentclassif').html("--&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");  

            //$("#linkChange .buttonstable tr:first-child td .id").html(jsonobj.id);
        $("#linkChange .buttonstable tr:first-child td .author").hide();
        $("#linkChange .buttonstable tr:first-child td .authorinput").show(); 

        $("#linkChange .buttonstable tr:first-child td .date").hide();

        $("#linkChange .buttonstable tr:first-child td .datetoshow").addClass('extended');
        $("#linkChange .buttonstable tr:first-child td .datetoshow").show(); 

        $(".buttontdtohide").hide();
        $('#removetweetp2').attr('class','').addClass('fa').addClass('fa-floppy-o');

        $("#linkChange #editTags .fa-chevron-down").show();    

        $('#editTags').css('margin-top', '6px');  
                
        $('#infoinput').prop('readonly', null);

        setTimeout(function(){

            $('#infoinput').focus();
            var elmnt = document.getElementById("infoinput");
                elmnt.scrollIntoView();
        }, 800);
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
    }, 800);
} 

var openMainSettingsPopup = function(jsonobj) 
{
    closeallnewlayout();

    $('body, html').css('overflow-y', 'hidden');

    // xyzz
    /* if (!isMy) {
        $("#mainsettings table.ismy").each( function( index, element ) {
            $(element).css('display', 'none');
        });
    } */

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

    // Tweet counter
    value = null;
    var valuegotop = null;

    value = readCookie("tweetCounter");

    if (value) {

        if (value == "hidall") {
            value = "No";
            valuegotop = "No";
        }
        else if (value == "hidcontent") {
            value = "No";
            valuegotop = "Yes";
        }
        else {
            value = "Yes";
            valuegotop = "No";
        }
    }
    else {
        value = "Yes";
        valuegotop = "Yes";
    }
    
    $('#linkscounterul').find(".litags").each( function( index, element ) {
        if($(element).html().trim() == value) {
            $(element).addClass("selectedtag");
        }
        else {
            $(element).removeClass("selectedtag");
        }
    });

    $('#gotopul').find(".litags").each( function( index, element ) {
        if($(element).html().trim() == valuegotop) {
            $(element).addClass("selectedtag");
        }
        else {
            $(element).removeClass("selectedtag");
        }
    });


    // Open links inside
    value = null;

    value = readCookie("linksinside");

    if (value) {
        value = "Yes";

        $('#maximumfstr').css("opacity", 1);
        $('#maximumfsul').find(".litags").each( function( index, element ) {
            $(element).removeClass("disable");
        });
    }
    else {
        value = "No";

        $('#maximumfstr').css("opacity", 0.5);
        $('#maximumfsul').find(".litags").each( function( index, element ) {
            $(element).addClass("disable");
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


    // double and click changed
    value = null;

    value = readCookie("doublefs");

    if (value) {
        value = "Yes";
    }
    else {
        value = "No";
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

    if (value) {
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

    // Top Menu
    value = null;

    if (topMenuMode > 0) {
        if (topMenuMode > 1) {
            value = "Auto Hide";
        }
        else {
            value = "Fixed On Top";
        }
    }
    else {
        value = "Visible";
    }

    $('#topmenuul').find(".litags").each( function( index, element ) {
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
    
    if (ceec) {
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
    }, 800);

} 


var getLinkColor = function(id) 
{
    var jsonvar = getJsonbyid(id);

    if (jsonvar) {
        if (jsonvar.deleted.length > 0) {
            return "red";
        }
        else {
            if (jsonvar.isnew && jsonvar.isnew != "") {
                return "#00dc00";
            }
            else {
                var hasChanges = readCookie(id + "haschanges");
                
                if (hasChanges) 
                    return "#f18618";
                else 
                    return "";
            }
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


function closeAuthor(obj) {
    $(obj).parent().parent().find(".authorinput").hide();
    $(obj).parent().parent().find(".author").show();
    $(obj).parent().fadeOut(700);
}


function showAuthor(obj) {
    $(obj).hide();
    var otherObj = $(obj).parent().find(".authorinput");
    var spanObj = $(obj).parent().find(".author");

    otherObj.val(spanObj.text());

    if ($('#postedby').attr("cauthor") != otherObj.val())
        $(obj).parent().find(".authorbuttons").fadeIn(700).removeClass("noundo");
    else
        $(obj).parent().find(".authorbuttons").fadeIn(700).addClass("noundo");
    
    otherObj.show();
    otherObj.focus();
}

function undoAuthor(obj) {
    $(obj).parent().parent().find(".authorinput").val($('#postedby').attr("cauthor"));
    saveAuthor(obj);
}

function saveAuthor(obj) {
    if ($('#linkChange').attr("cid") != "new") {
        var inputObj = $(obj).parent().parent().find(".authorinput");
        inputObj.hide();
        $(obj).parent().fadeOut(700);

        var otherObj = $(obj).parent().parent().find(".author");
        if (inputObj.val() != $('#postedby').attr("cauthor")) {
            createCookie2($('#linkChange').attr("cid"), "author", $(obj).val());
            if (showColors) {
                otherObj.css('color','#00ff72');
            }
            else {
                otherObj.css('color','');
            }
        }
        else {
            createCookie2($('#linkChange').attr("cid"), "author", "", null, true);
            otherObj.css('color','');
        }

        if (inputObj.val().length > 0) {
            otherObj.html(inputObj.val());
        }
        else
            otherObj.html("--&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"); 

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

        var doShowReset = true;
        if ($('#date').attr("cdate").trim() == otherObj.val()) 
            doShowReset = false;

        openCalendar("linkdate", date, doShowReset);
    }
    else {
        var doShowReset = true;
        if ($('#date').attr("cdate").trim() == otherObj.val()) 
            doShowReset = false;

        openCalendar("linkdate", null, doShowReset);
    }
    
}


function datepickerAuthorChange(date) {
    if ($('#linkChange').attr("cid") != "new") {
        var otherObj = $("#linkChange").find(".date");
        if (date) {
            otherObj.html(formatDate(date));
            $("#linkChange").find(".dateinput").val(formatNumDate(date));
            
            if (formatNumDate(date) != $('#date').attr("cdate")) {
                createCookie2($('#linkChange').attr("cid"), "datechanged", formatNumDate(date));
                if (showColors) {
                    otherObj.css('color','#00ff72');
                }
                else {
                    otherObj.css('color','');
                }
            }
            else {
                createCookie2($('#linkChange').attr("cid"), "datechanged", "", null, true);
                otherObj.css('color','');
            }
        }
        else {
            otherObj.html("--&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"); 
            $("#linkChange").find(".dateinput").val("");

            if ($('#date').attr("cdate") != "") {
                createCookie2($('#linkChange').attr("cid"), "datechanged", "");
                if (showColors) {
                    otherObj.css('color','#00ff72');
                }
                else {
                    otherObj.css('color','');
                }
            }
            else {
                createCookie2($('#linkChange').attr("cid"), "datechanged", "", null, true);
                otherObj.css('color','');
            }
        }

        updateLinkColor(null, $('#linkChange').attr("cid"));
    }
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
    
        $('#linkChange').find("table:not(.buttonstable):not(.nocol)").each( function( index, element ) {
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
    
    countAllLinks();
}


function countAllLinks() {
    if (typeof(clWorker) !== "undefined") {
        clWorker.terminate();
            clWorker = undefined;
    }
    
    counterAllLinks = 0;

    processCountBlock(false);
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
    countAllLinks();
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
    
    countAllLinks();
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

function closeMenuPopup(obj, timer) {

    if (obj)
        fixfocus(obj);

    if ($('#mainmenu').attr("fromsearch") == "yes") {
        var style = window.getComputedStyle(body, null);
        $('#searchpopup').css("background", style.getPropertyValue('--soft-transp-color'));
        $('#mainmenu').attr("fromsearch", "");
    }
    else {
        $('body, html').css('overflow-y', 'auto');
    }
        
    var delay = "1.7";

    if (timer)
        delay = timer;

    $('#mainmenu').css('transition', 'all ' + delay + 's');
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

        var titletext = table.find(".titletext");
        titletext.css('transition', 'none');
        titletext.css("opacity", 0); 

        if (table.css('max-height') == setHeight) {
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
            
            if (table.attr('id') != 'editInfo')
                table.find('td.el').removeClass('ellipsis');

            table.find('.sectionedittd i').addClass('fa-angle-up').removeClass('fa-angle-down'); 

            table.find('.trcontent:not(.originaltr)').css("display", "table-row");

            setTimeout(function() {
                titletext.css('transition', 'opacity .6s ease');
                titletext.css("opacity", 1); 
                $('#linkChange').find("table:not(.buttonstable)").each( function( index, element ) {
                    var table2 = $(element);

                    if (table2.attr("id") != table.attr("id"))
                        table2.find('.trcontent').css("display", "none");
                });
            }, 700);
        }
        else {
            table.css('transition', 'transition: all 0.7s !important');
            table.css('max-height', setHeight);
            table.find('.sectionedittd i').addClass('fa-angle-down').removeClass('fa-angle-up');
            table.find('td.el').addClass('ellipsis');

            setTimeout(function() { 
                titletext.css('transition', 'opacity .6s ease');
                titletext.css("opacity", 1); 
                table.find('.trcontent').css("display", "none");
            }, 700);
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
    
    if (!$('#linkChange').hasClass("new")) { 
        if (compareStringArrays(oldtags, $(obj).val())) {
            currenttagdisplay.css('color', '');
            createCookie2($('#linkChange').attr("cid"), "tagchanged", "", null, true);
            $('#originaltagtd i').hide();
        }
        else {
            currenttagdisplay.css('color','#00ff72');
            createCookie2($('#linkChange').attr("cid"), "tagchanged", $(obj).val());
            $('#originaltagtd i').show();
        }
    }

    currenttagdisplay.html(parseTags($(obj).val()));

    removeNonExistentLi();

    createNonExistentLi();
    
    updateTagsText($(obj).val(), $('#linkChange').attr("cid"));
    if (!$('#linkChange').hasClass("new")) 
        updateLinkColor(null, $('#linkChange').attr("cid"));
}


function updateLinkColor(val, id) {
    if (id) {
        val = getJsonbyid(id);
    }

    if (val.deleted.length > 0) { 
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
            
            if (hasChanges) { // HAS CHAMGES
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

    if (tags) {
        var res = tags.trim().split(" ");

        if (res.length == 1 && (res[0].trim() == 0 || res[0].trim() == "undefined")) {
            return "--&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        } 
    
        for (var i = 0; i < res.length; i++) {
            result = result + res[i] + " - ";
        }
    
        return result.substring(0, result.length - 3);
    }
    else {
        return "--&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    } 
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
            $(obj).addClass("selectedtag");
            $('#filtertag').val(($('#filtertag').val().trim() + " " + $(obj).html()).trim());
            $('#filtertag').trigger("change");
        }

    }

    if (obj)
        fixfocusli(obj);

}


/////////////////////////////////////////////////////////////////////////
//                       CATEGORIES SETTINGS                           //
/////////////////////////////////////////////////////////////////////////


function catsInputOnChange(obj) {

    var oldcats = $(obj).attr("ccats");
    var currentcatdisplay = $('.currentcats'); 
    currentcatdisplay.html(parseCats($(obj).val()));
        
    if (!$('#linkChange').hasClass("new")) { 
        if (compareStringArrays(oldcats, $(obj).val())) {
            currentcatdisplay.css('color', '');
            createCookie2($('#linkChange').attr("cid"), "catchanged", "", null, true);
            $('#originalcattd i').hide();
            
            $("#editCats .originaltr").hide();
        }
        else {
            currentcatdisplay.css('color','#00ff72');
            createCookie2($('#linkChange').attr("cid"), "catchanged", $(obj).val());
            $('#originalcattd i').show();
            
            $("#editCats .originaltr").show();
        }
    }

    markCategoriesCheckBoxs();
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
    $('#catsinput').trigger("change");

    markCategoriesCheckBoxs();

    showMessage("Categories reverted", null, "fa-undo", "", null, "undo");
}

function parseCats(cats) {
    var result = "";
    
    if (cats) {
        var res = cats.trim().split(" ");

        if (res.length == 1 && (res[0].trim() == 0 || res[0].trim() == "undefined")) {
            return "--&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        } 
    
        for (var i = 0; i < res.length; i++) {
            result = result + catsmap.get(res[i]) + " - ";
        }
    
        return result.substring(0, result.length - 3);
    }
    else {
        return "--&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    }
}

function compareStringArrays(array, arrayOri) {
    var res = new Array();
    if (array)
        res = array.trim().split(" ");
    
    var resOri = new Array();
    if (arrayOri)
        resOri = arrayOri.trim().split(" ");

    var response = true;

    for (var i = 0; i < res.length; i++) {
        if (!resOri.includes(res[i])) 
            response = false;
    }

    if (response && res.length != resOri.length )
        response = false;

    return response;
}


/////////////////////////////////////////////////////////////////////////
//                     CLASSIFICATION SETTINGS                         //
/////////////////////////////////////////////////////////////////////////

function classifInputOnChange(obj) {
    var oldclassif = $(obj).attr("cclassif");
    var currentclassifdisplay = $('.currentclassif'); 
    
    if (!$('#linkChange').hasClass("new")) { 
        if (oldclassif == $(obj).val().trim()) {
            currentclassifdisplay.css('color', '');
            createCookie2($('#linkChange').attr("cid"), "classif", "", null, true);
            $('#originalclassiftd i').hide();
        }
        else {
            currentclassifdisplay.css('color','#00ff72');
            createCookie2($('#linkChange').attr("cid"), "classif", $(obj).val().trim());
            $('#originalclassiftd i').show();
        }
    }

    if ($(obj).val().trim().length > 0 && $(obj).val().trim() != "0")
        currentclassifdisplay.html($(obj).val().trim());
    else 
        currentclassifdisplay.html("--&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");

    if (!$('#linkChange').hasClass("new")) 
        updateLinkColor(null, $('#linkChange').attr("cid"));

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
            var currentinfodisplay = $('.currentinfo');
            if (!$('#linkChange').hasClass("new")) { 
                var oldinfo = cid;
                
                if (oldinfo == val) {
                    currentinfodisplay.css('color', '');
                    createCookie2($('#linkChange').attr("cid"), "info", "", null, true);
                    $('#originalinfotd i').hide();
                }
                else {
                    currentinfodisplay.css('color','#00ff72');
                    createCookie2($('#linkChange').attr("cid"), "info", val);
                    $('#originalinfotd i').show();
                }

                updateLinkColor(null, $('#linkChange').attr("cid"));
            } 
            
            if (val.trim().length > 0) 
                currentinfodisplay.html(val);
            else
                currentinfodisplay.html("--&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");

            dblFlag = false;
        }, 300);
    }
}


function undoInfo(e, obj) {
    e.stopPropagation();
    fixfocus(obj);

    $('#infoinput').val($('#infoinput').attr("cinfo"));
    $(obj).hide();

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
        createCookie("colors", value);

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
                showMessage("Change click/press and double click/long press functions on", null, null, null, null, null);
                
                createCookie("doublefs", "s");
            }
            else {
                showMessage("Change click/press and double click/long press functions off", null, null, null, null, null); 
                createCookie("doublefs", "", true);
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
                
                createCookie("maximumfs", "aa");
            }
            else {
                showMessage("Use maximum available space in fullscreen off", null, null, null, null, null); 
                createCookie("maximumfs", "", true);
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
            showMessage("Double click/long press opens the link in fullscreen inside the app on", null, null, null, null, null);
            
            $('#maximumfstr').css("opacity", 1);

            $('#maximumfsul').find(".litags").each( function( index, element ) {
                $(element).removeClass("disable");
            });

            createCookie("linksinside", "s");
        }
        else {
            showMessage("Double click/long press opens the link in fullscreen inside the app off", null, null, null, null, null); 
            createCookie("linksinside", "", true);
                    
            $('#maximumfstr').css("opacity", 0.5);

            $('#maximumfsul').find(".litags").each( function( index, element ) {
                $(element).addClass("disable");
            });    
        }
    }  

}

function clickLiLinkscounter(e, obj) {
    e.stopPropagation();

    if (!$(obj).hasClass("selectedtag")) {
        var value = $(obj).html().trim();
        $('#linkscounterul').find(".litags").each( function( index, element ) {
            if($(element).html().trim() == value) {
                $(element).addClass("selectedtag");
            }
            else {
                $(element).removeClass("selectedtag");
            }
        });

        if (value == "Yes") {
            showMessage("Show links counter when displaying the links on", null, null, null, null, null);
            
            if (getGotopulValue() == "Yes") {
                createCookie("tweetCounter", "", true);

                $('#tweetcount').attr("class", "pobj"); 
            }
            else {
                createCookie("tweetCounter", "hidicon");

                $('#tweetcount').attr("class", "hidicon pobj"); 
            }
        }
        else {
            showMessage("Show links counter when displaying the links off", null, null, null, null, null); 
             
            if (getGotopulValue() == "Yes") {
                createCookie("tweetCounter", "hidcontent");

                $('#tweetcount').attr("class", "hidcontent pobj"); 
            }
            else {
                createCookie("tweetCounter", "hidall");

                $('#tweetcount').attr("class", "hidall pobj"); 
            }
        }
    }  
}

function getGotopulValue() {
    var value = "";
    $('#gotopul').find(".litags").each( function( index, element ) {
        if($(element).hasClass("selectedtag")) {
            value = $(element).html().trim();
        }
    });

    return value;
}

function clickLiGotop(e, obj) {
    e.stopPropagation();

    if (!$(obj).hasClass("selectedtag")) {
        var value = $(obj).html().trim();
        $('#gotopul').find(".litags").each( function( index, element ) {
            if($(element).html().trim() == value) {
                $(element).addClass("selectedtag");
            }
            else {
                $(element).removeClass("selectedtag");
            }
        });

        if (value == "Yes") {
            showMessage("Show GoTop button when displaying the links on", null, null, null, null, null);
            
            if (getLinksCounterValue() == "Yes") {
                createCookie("tweetCounter", "", true);

                $('#tweetcount').attr("class", "pobj"); 
            }
            else {
                createCookie("tweetCounter", "hidcontent");

                $('#tweetcount').attr("class", "hidcontent pobj"); 
            }
        }
        else {
            showMessage("Show GoTop button when displaying the links off", null, null, null, null, null); 
             
            if (getLinksCounterValue() == "Yes") {
                createCookie("tweetCounter", "hidicon");

                $('#tweetcount').attr("class", "hidicon pobj"); 
            }
            else {
                createCookie("tweetCounter", "hidall");

                $('#tweetcount').attr("class", "hidall pobj"); 
            }
        }
    }  
}

function clickLiTopmenu(e, obj) {
    e.stopPropagation();
    
    if (!$(obj).hasClass("selectedtag")) {
        var value = $(obj).html().trim();
        $('#topmenuul').find(".litags").each( function( index, element ) {
            if($(element).html().trim() == value) {
                $(element).addClass("selectedtag");
            }
            else {
                $(element).removeClass("selectedtag");
            }
        });

        if (value == "Visible") {
            showMessage("Top menu visibility: " + value, null, null, null, null, null);
            
            createCookie("topmenu", "0");
            topMenuMode = 0;
            $("#recoilback").css("position", "fixed");  
        }
        else if (value == "Fixed On Top") {
            showMessage("Top menu visibility: " + value, null, null, null, null, null);
            
            createCookie("topmenu", "1");
            topMenuMode = 1;
            $("#recoilback").css("position", "absolute");   
        }
        else {
            showMessage("Top menu visibility: " + value, null, null, null, null, null);
            
            createCookie("topmenu", "", true);
            topMenuMode = 2;
            $("#recoilback").css("position", "fixed"); 
        }
    }  
}

function getLinksCounterValue() {
    var value = "";
    $('#linkscounterul').find(".litags").each( function( index, element ) {
        if($(element).hasClass("selectedtag")) {
            value = $(element).html().trim();
        }
    });

    return value;
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
        createCookie("swipes", value);
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
            createCookie("help", "", true);
        else
            createCookie("help", value);
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
            createCookie("cat-cli", "", true);

            showMessage("VictoryWillCome Tweets Shown", null, null, null, null, null);
            showAll = true;

            changeCatsText(false);
        }
        else {
            createCookie("cat-cli", "aaa");

            showMessage("VictoryWillCome Tweets Hidden", null, null, null, null, null);
            showAll = false;  

            changeCatsText(true);
        }

        $("#VWCdisplay").text(value);
        createCookie("vwc", value);
        countalltweets();
    }  
}

function changeCatsText(changed) {
    if (changed) {
        createCookie("cat-cli", "My Tweets");
        $(".cat-cli").text("My Tweets");
        catsmap.set("cli", "My Tweets");
    }
    else {
        createCookie("cat-cli", "", true);
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
        
        createCookie("eec", "", true);
        showMessage("Invalid Code"); 
    }
}

function dunl() {
    var ceec = readCookie("eec");

    if (ceec) {
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

function openGitHub(obj) {
    if (obj)
        fixfocus(obj);
    
     var win = window.open('https://github.com/rasarrad/mytweetshost/edit/master/data.json', '_blank');
     win.focus();               
}