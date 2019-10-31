

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

    var tagchanged = readCookie(jsonobj.id + "tagchanged");
    
    if (tagchanged && tagchanged.length > 0) {~
        table.css('transition', 'max-height 1.5s');
        $('#editTags').css('max-height', '450px');
        $('.currenttags').css('color','#00ff72');
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
    }
    else {
        table.css('transition', 'max-height .5s');
        table.css('max-height', '21px');
    }

}

function tagsInputChange(obj) {


}



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////



