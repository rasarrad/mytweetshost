

function expandCat(obj) {
    var functorun = function(jsonvar) 
    { 
        if (jsonvar != null) {
            openSettingsPopup(jsonvar);
        }
    } 

    getJsonbyid($(obj).parent().attr("id"), functorun);
}

var openSettingsPopup = function(jsonobj) 
{
    console.log(jsonobj); 

    $('#linkChange').attr("cid", jsonobj.id);
    $('#tagsinput').attr("ctags", jsonobj.tags);

    var tagchanged = readCookie(jsonobj.id + "tagchanged");
    var currenttagdisplay = $('.currenttags'); 
    if (tagchanged && tagchanged.length > 0) {
        $('#editTags').css('transition', 'max-height 1.5s');
        $('#editTags').css('max-height', '450px');
        currenttagdisplay.css('color','#00ff72');
        currenttagdisplay.val(tagchanged);
        $('#editTags').find('.sectionedittd i').addClass('fa-remove').removeClass('fa-edit');
    } 
    else {
        currenttagdisplay.html(jsonobj.tags);
    }
    
    $('#linkChange').fadeIn();

    
} 

function closeSettingsPopup(obj) {
    $('#linkChange').fadeOut();
}


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////




function editSetting(obj) {

    var table = $(obj).parent().parent();
    if (table.css('max-height') == '21px') {
        table.css('transition', 'max-height 1.5s');
        table.css('max-height', '450px');
        table.find('.sectionedittd i').addClass('fa-remove').removeClass('fa-edit');
        
    }
    else {
        alert(123)
        table.css('transition', 'max-height .5s');
        table.addClass('max-height', '21px');
        table.find('.sectionedittd i').addClass('fa-edit').removeClass('fa-remove');
    }

}

function tagsInputChange(obj) {
    var oldtags = $(obj).attr("ctags");
    var currenttagdisplay = $('.currenttags'); 
    currenttagdisplay.val($(obj).val());

    if (oldtags == $(obj).val()) {
        currenttagdisplay.css('color', null);
    }
    else {
        currenttagdisplay.css('color','#00ff72');
    }
}



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////



