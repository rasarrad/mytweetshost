



/////////////////////////////////////////////////////////////////////////
//                             GENERAL                                 //
/////////////////////////////////////////////////////////////////////////

function expandCat(obj) {
    var functorun = function(jsonvar) 
    { 
        if (jsonvar != null) {
            openSettingsPopup(jsonvar);
        }
    } 

    //getJsonbyid($(obj).parent().attr("id"), functorun);
    getJsonbyid(28, functorun);
}


function zoom() {
    $('body').addClass('notransit');

    if ($('body').hasClass('big')) {
        customizeTweets(null, true, false);
        $('body').removeClass('big');
    }
    else {
        customizeTweets(null, true, true);
        $('body').addClass('big');
    }
    var setHeight = "18px";

    if ($('body').hasClass('big'))
        setHeight = "31px";

    $('#linkChange').find("table:not(.buttonstable)").each( function( index, element ) {
        var table = $(element);
        table.css('transition', 'max-height .01s');
        table.css('max-height', setHeight);
        table.find('.sectionedittd i').addClass('fa-edit').removeClass('fa-angle-up').attr('style', '');
        table.find('td.el').addClass('ellipsis');
    });
    $('body').removeClass('notransit');   
}



var openSettingsPopup = function(jsonobj) 
{
    // GENERAL
    var setHeight = "18px";

    if ($('body').hasClass('big'))
        setHeight = "31px";

    $('#linkChange').find("table:not(.buttonstable)").each( function( index, element ) {
        var table = $(element);
        table.css('transition', 'max-height .01s');
        table.css('max-height', setHeight);
        table.find('.sectionedittd i').addClass('fa-edit').removeClass('fa-angle-up').attr('style', '');
        table.find('td.el').addClass('ellipsis');
    });

    // OTHER SETTINGS
    $('body, html').css('overflow-y', 'hidden');
    $('#linkChange').attr("cid", jsonobj.id);
    $('#linkChange').attr("clink", jsonobj.url);

    $(".buttonstable tr:first-child td i.fa").attr('class','').attr('style','margin-right: 9px;font-size: 18px;position: relative;top: 2px;');

    $(".buttonstable tr:first-child td i").addClass('fa').addClass('fa-twitter').attr('style','margin-right: 9px;font-size: 18px;position: relative;top: 2px;');

    if (jsonobj.type == "H") {
        $(".buttonstable tr:first-child td i").addClass('fa').addClass('fa-internet-explorer').attr('style','margin-right: 9px;font-size: 15px;position: relative;top: 1px;');
    }
    else if (jsonobj.type == "Y") {
        $(".buttonstable tr:first-child td i").addClass('fa').addClass('fa-youtube-play').attr('style','margin-right: 9px;font-size: 15px;position: relative;top: 1px;');
    }

    //$(".buttonstable tr:first-child td .id").html(jsonobj.id);

    if (jsonobj.author.length > 0)
        $(".buttonstable tr:first-child td .author").html(jsonobj.author);
    else
        $(".buttonstable tr:first-child td .author").html("--");
    
    var date = jsonobj.date.toString();
    if (date.length > 0)
        $(".buttonstable tr:first-child td .date").html(date.substring(6,8) + "/" + date.substring(4,6) + "/" + date.substring(0,4));
    else
        $(".buttonstable tr:first-child td .date").html("--");
    
    // TAGS

    $('#tagsinput').attr("ctags", jsonobj.tags);

    var tagchanged = readCookie(jsonobj.id + "tagchanged");
    var currenttagdisplay = $('.currenttags');
    
    if (jsonobj.tags.length > 0) {
        $('.originaltags').html(parseTags(jsonobj.tags));  
    }
    else {
        $('.originaltags').html("--");  
    }

    if (tagchanged != null && tagchanged != 'null') {
        currenttagdisplay.css('color','#00ff72');
        currenttagdisplay.html(parseTags(tagchanged));
        $('#tagsinput').val(tagchanged);
        $('#originaltagtd i').show();
    } 
    else {
        currenttagdisplay.html(parseTags(jsonobj.tags));
        $('#tagsinput').val(jsonobj.tags);
    }

    removeNonExistentLi();

    createNonExistentLi();

    // CAGTEGORIES

    $('#catsinput').attr("ccats", jsonobj.categories);

    var catchanged = readCookie(jsonobj.id + "catchanged");
    var currentcatdisplay = $('.currentcats');

    if (jsonobj.categories.length > 0) {
        $('.originalcats').html(parseCats(jsonobj.categories));  
    }
    else {
        $('.originalcats').html("--"); 
    }

    if (catchanged != null && catchanged != 'null') {
        currentcatdisplay.css('color','#00ff72');
        currentcatdisplay.html(parseCats(catchanged));
        $('#catsinput').val(catchanged);
        $('#originalcattd i').show();
    } 
    else {
        currentcatdisplay.html(parseCats(jsonobj.categories));
        $('#catsinput').val(jsonobj.categories);
    }
    
    markCategoriesCheckBoxs();

    // CLASSIFICATION
    $('#classifinput').attr("cclassif", jsonobj.classif);

    var classifchanged = readCookie(jsonobj.id + "classif");
    var currentclassifdisplay = $('.currentclassif');

    if (jsonobj.classif.length > 0 && jsonobj.classif != 0) {
        $('.originalclassif').html(jsonobj.classif); 
    }
    else {
        $('.originalclassif').html("--"); 
    }

    if (classifchanged != null && classifchanged != 'null') {
        currentclassifdisplay.css('color','#00ff72');
        currentclassifdisplay.html(classifchanged);
        $('#classifinput').val(classifchanged);
        $('#originalclassiftd i').show();
        markClassif(classifchanged);
    } 
    else {
        if (jsonobj.classif.length > 0 && jsonobj.classif != 0) {
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

    if (jsonobj.info.length > 0) {
        $('.originalinfo').html(decodeURIComponent(jsonobj.info)); 
    }
    else {
        $('.originalinfo').html("--"); 
    }

    if (infochanged != null && infochanged != 'null') {
        currentinfodisplay.css('color','#00ff72');
        currentinfodisplay.html(decodeURIComponent(infochanged));
        $('#infoinput').val(decodeURIComponent(infochanged));
        $('#originalinfotd i').show();
    } 
    else {
        if (jsonobj.info.length > 0 && jsonobj.info != 0) {
            currentinfodisplay.html(decodeURIComponent(jsonobj.info));
            $('#infoinput').val(decodeURIComponent(jsonobj.info));
        }
        else {
            currentinfodisplay.html("--");
            $('#infoinput').val("");
        }
    }


    $('#linkChange').fadeIn();  
} 


function closeSettingsPopup(obj) {
    $('body, html').css('overflow-y', 'auto');
    $('#linkChange').fadeOut();
}


function editSetting(e, obj) {
    e.stopPropagation();
    var setHeight = "18px";

    if ($('body').hasClass('big'))
        setHeight = "31px";

    var table = $(obj).parent().parent();
    if (table.css('max-height') == setHeight) {
        var hasExpanded = false;
        $('#linkChange').find("table:not(.buttonstable)").each( function( index, element ) {
            var table = $(element);
            
            table.css('transition', 'max-height 0.01s');
            table.css('max-height', setHeight);
            table.find('.sectionedittd i').addClass('fa-edit').removeClass('fa-angle-up').attr('style', '');
            table.find('td.el').addClass('ellipsis');
        });
    
        table.css('transition', 'max-height 1.3s');
        table.css('max-height', '450px');
        table.find('.sectionedittd i').addClass('fa-angle-up').removeClass('fa-edit').attr('style', 'font-size: 22px;position: relative;top: -6px;');
        if (table.attr('id') != 'editInfo')
            table.find('td.el').removeClass('ellipsis');
  
    }
    else {
        table.css('transition', 'max-height .5s');
        table.css('max-height', setHeight);
        table.find('.sectionedittd i').addClass('fa-edit').removeClass('fa-angle-up').attr('style', '');
        table.find('td.el').addClass('ellipsis');
        /*setTimeout(function() { 
            table.find('td.el').addClass('ellipsis');
        }, 500);
        */
    }
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
}

 
function addTextTag(obj) {
    if ($('#addtaginput').val() != "") {
        $('#tagsinput').val($('#tagsinput').val() + " " + $('#addtaginput').val());
        $('#tagsinput').trigger("change");
        $('#addtaginput').val("");
    }
}


function undoTags(e, obj) {
    e.stopPropagation();
    
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
function createLi(text) {
    $('#tagsul').prepend('<li onclick="javascript: clickLiTag(event, this)" class="litags selectedtag new">' + text + '</li>');
}

function createNonExistentLi() {
    var res = $('#tagsinput').val().trim().split(" ");

    if (res.length == 1 && res[0].trim() == 0) {
        return false;
    }

    for (var i = res.length; i > 0; i--) {
        var li = existsLi(res[i-1]);
        if (li == "") {
            createLi(res[i-1]);
        }
        else {
            li.clone().addClass("selectedtag").prependTo("#tagsul");
            li.remove();
        }
    }
}

function existsLi(text) { 
    var hasLi = "";

    $('#tagsul').find(".litags").each( function( index, element ){
        if ($(element).html() == text) {
            hasLi = $(element);
            return false;
        }
    });

    return hasLi;
}

function removeNonExistentLi() {
    var tags = $('#tagsinput').val();

    $('#tagsul').find(".litags").each( function( index, element ) {
        $(element).removeClass("selectedtag");
        if ($(element).hasClass("new") && tags.indexOf($(element).html()) < 0) {
            $(element).remove();
        }
    });
}

function parseTags(tags) {
    var result = "";
    var res = tags.trim().split(" ");

    if (res.length == 1 && res[0].trim() == 0) {
        return "--";
    } 

    for (var i = 0; i < res.length; i++) {
        result = result + res[i] + " - ";
    }

    return result.substring(0, result.length - 3);
}


function clickLiTag(e, obj) {
    e.stopPropagation();

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

    if (res.length == 1 && res[0].trim() == 0) {
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

    markClassif($(obj).val().trim());
}

function markClassif(value) {

    $('#classiful').find(".litags").each( function( index, element ) {
        console.log("-" + $(element).html().trim() + "-");
        console.log("-" + value + "-");
        console.log("-" + ($(element).html().trim() == value) + "-");
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
            dblFlag = false;
        }, 300);
    }
}


function undoInfo(e, obj) {
    e.stopPropagation();
    
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