



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


var openSettingsPopup = function(jsonobj) 
{
    // GENERAL

    $('#linkChange').find("table:not(.buttonstable)").each( function( index, element ) {
        var table = $(element);
        table.css('transition', 'max-height .01s');
        table.css('max-height', '21px');
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

    $(".buttonstable tr:first-child td .id").html(jsonobj.id);

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
    $('.originaltags').html(parseTags(jsonobj.tags));  

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
    $('.originalcats').html(parseCats(jsonobj.categories));  

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

    $('#linkChange').fadeIn();  
} 


function closeSettingsPopup(obj) {
    $('body, html').css('overflow-y', 'auto');
    $('#linkChange').fadeOut();
}


function editSetting(e, obj) {
    e.stopPropagation();
    $('#linkChange').find("table:not(.buttonstable)").each( function( index, element ) {
        var table = $(element);
        table.css('transition', 'max-height .01s');
        table.css('max-height', '21px');
        table.find('.sectionedittd i').addClass('fa-edit').removeClass('fa-angle-up').attr('style', '');
        table.find('td.el').addClass('ellipsis');
    });
    
    var table = $(obj).parent().parent();
    if (table.css('max-height') == '21px') {
        table.css('transition', 'max-height 1.5s');
        table.css('max-height', '450px');
        table.find('.sectionedittd i').addClass('fa-angle-up').removeClass('fa-edit').attr('style', 'font-size: 22px;position: relative;top: -6px;');
        table.find('td.el').removeClass('ellipsis');
    }
    else {
        table.css('transition', 'max-height .5s');
        table.css('max-height', '21px');
        table.find('.sectionedittd i').addClass('fa-edit').removeClass('fa-angle-up').attr('style', '');
        setTimeout(function() { 
            table.find('td.el').addClass('ellipsis');
          }, 500);
        
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
/////////////////////////////////////////////////////////////////////////