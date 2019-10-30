

function expandCat(obj) {
    openSettingsPopup($(obj).parent());
}

var openSettingsPopup = function(flag) 
{
    var json = getJsonbyid(obj.attr("id"));

    if (json) {
        console.log(json);
        $('#linkChange').fadeIn();
    }
} 

function closeSettingsPopup(obj) {
    $('#linkChange').fadeOut();
}


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////