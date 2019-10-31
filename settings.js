

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
    
    if (tagchanged && tagchanged.length > 0) {
        $('#editTags').css('height', '100%');
        $('.currenttags').css('color','#00ff72');
    } 
    else {
        $('#editTags').css('height', '21px');
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
    if (table.css('height') == '21px') {
        table.css('height', '100%');
    }
    else {
        table.css('height', '21px');
    }

}

function tagsInputChange(obj) {


}



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////



