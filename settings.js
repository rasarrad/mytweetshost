

function expandCat(obj) {
    openSettingsPopup($(obj).parent());
}

var openSettingsPopup = function(obj) 
{
    var functorun = function(jsonvar) 
    {
        console.log(jsonvar); 
        if (jsonvar && jsonvar.length > 0) {
            $('#linkChange').fadeIn();
        }
    } 

    var jsonvar = getJsonbyid(obj.attr("id"), functorun);
} 

function closeSettingsPopup(obj) {
    $('#linkChange').fadeOut();
}


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////