

function expandCat(obj) {
    openSettingsPopup($(obj).parent());
}

var openSettingsPopup = function(obj) 
{


    var functorun = function(jsonvar) 
    {
        if (jsonvar && jsonvar.length > 0) {
            console.log(json);
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