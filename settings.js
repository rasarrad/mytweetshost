

function expandCat(obj) {
    openSettingsPopup($(obj).parent());
}

var openSettingsPopup = function(obj) 
{
    var functorun = function(jsonvar) 
    {
        console.log(jsonvar); 
        console.log(jsonvar && jsonvar.length > 0); 
        if (jsonvar && jsonvar.length > 0) {
            console.log(999999); 
            $('#linkChange').fadeIn();
        }
    } 

    getJsonbyid(obj.attr("id"), functorun);
} 

function closeSettingsPopup(obj) {
    $('#linkChange').fadeOut();
}


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////