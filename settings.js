

function expandCat(obj) {
    openSettingsPopup($(obj).parent());
}

var openSettingsPopup = function(obj) 
{
    var jsonvar = getJsonbyid(obj.attr("id"));
    console.log(jsonvar);
    if (jsonvar && jsonvar.length > 0) {
        console.log(json);
        $('#linkChange').fadeIn();
    }
} 

function closeSettingsPopup(obj) {
    $('#linkChange').fadeOut();
}


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////