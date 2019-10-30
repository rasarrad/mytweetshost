

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
        $('#editTags').css('height', '232px');
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




function editTags() {

    if ($('#editTags').css('height') == '232px') {
        $('#editTags').css('height', '21px');
    }
    else {
        $('#editTags').css('height', '232px');
    }

}

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////



