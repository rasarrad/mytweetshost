

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
        $('#editTags').attr('style', 'height: 205px;display: block;width: calc(100% - 24px);');
        $('.currenttags').css('color','#00ff72');
    } 
    else {
        $('#editTags').attr('style', 'height: 0px;width: 0;margin: 0;overflow: hidden;display: block;padding: 0;');
    }
    
    $('#linkChange').fadeIn();

    
} 

function closeSettingsPopup(obj) {
    $('#linkChange').fadeOut();
}


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////




function editTags() {

    if ($('#editTags').css('height') == '205px') {
        $('#editTags').attr('style', 'height: 0px;width: 0;margin: 0;overflow: hidden;display: block;padding: 0;');
    }
    else {
        $('#editTags').attr('style', 'height: 205px;display: block;width: calc(100% - 24px);');
    }

}

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////



