

function expandCat(obj) {
    alert(1)
    openSettingsPopup($(obj).parent());
}

var openSettingsPopup = function(obj) 
{
    alert(2)
    var json = getJsonbyid(obj.attr("id"));
    console.log(obj.attr("id"));
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