

function expandCat(obj) {
    openSettingsPopup($(obj).parent());
}

var openSettingsPopup = function(obj) 
{
    var functorun = function(jsonvar) 
    {
        console.log(jsonvar); 
        console.log(jsonvar != null); 
        if (jsonvar && jsonvar.length > 0) {
            console.log(999999); 
            $('#linkChange').fadeIn();
        }
    } 

    getJsonbyid(94, functorun);
} 

function closeSettingsPopup(obj) {
    $('#linkChange').fadeOut();
}


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////