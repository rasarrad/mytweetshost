



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
    $('body, html').css('overflow-y', 'hidden');
    $('#linkChange').attr("cid", jsonobj.id);
    $('#tagsinput').attr("ctags", jsonobj.tags);

    var tagchanged = readCookie(jsonobj.id + "tagchanged");
    var currenttagdisplay = $('.currenttags');
    $('.originaltags').html(parseTags(jsonobj.tags));  
    if (tagchanged && tagchanged.length > 0) {
        currenttagdisplay.css('color','#00ff72');
        currenttagdisplay.val(parseTags(tagchanged));
        $('#tagsinput').val(tagchanged);
        $('#editTags').find('.sectionedittd i').addClass('fa-remove').removeClass('fa-edit');
    } 
    else {
        currenttagdisplay.html(parseTags(jsonobj.tags));
        $('#tagsinput').val(jsonobj.tags);
    }
    
    removeNonExistentLi();

    createNonExistentLi();
    
    $('#linkChange').fadeIn();  
} 


function closeSettingsPopup(obj) {
    $('body, html').css('overflow-y', 'auto');
    $('#linkChange').fadeOut();
}


function editSetting(obj) {

    var table = $(obj).parent().parent();
    if (table.css('max-height') == '21px') {
        table.css('transition', 'max-height 1.5s');
        table.css('max-height', '450px');
        table.find('.sectionedittd i').addClass('fa-angle-up').removeClass('fa-edit').attr('style', 'font-size: 22px;position: relative;top: -6px;');
        
    }
    else {
        table.css('transition', 'max-height .5s');
        table.css('max-height', '21px');
        table.find('.sectionedittd i').addClass('fa-edit').removeClass('fa-angle-up').attr('style', '');
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
}

 
function addTextTag(obj) {
    if ($('#addtaginput').val() != "") {
        $('#tagsinput').val($('#tagsinput').val() + " " + $('#addtaginput').val());
        $('#tagsinput').trigger("change");
        $('#addtaginput').val("");
    }
}


function undoTags(obj) {
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

function createLi(text) {
    $('#tagsul').prepend('<li onclick="javascript: clickLiTag(this)" class="litags selectedtag new">' + text + '</li>');
}

function createNonExistentLi() {
    var res = $('#tagsinput').val().split(" ");
    for (var i = res.length; i > 0; i--) {
        var li = existsLi(res[i-1]);
        if (li == "") {
            createLi(res[i-1]);
        }
        else {
            console.log(li.html());
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
    console.log('-' + tags + '-');
    var result = "";
    var res = tags.trim().split(" ");
    for (var i = 0; i < res.length; i++) {
        result = result + res[i] + " - ";
    }

    return result.substring(0, result.length - 3);
}

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function clickLiTag(obj) {
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
