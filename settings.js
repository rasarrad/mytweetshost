

function expandCat(obj) {
    openSettingsPopup($(obj).parent());
}

var openSettingsPopup = function(obj) 
{
    var json = getJsonbyid(obj.attr("id"));
    console.log(json);
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