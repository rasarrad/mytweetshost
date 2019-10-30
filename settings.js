

function expandCat(obj) {
    openSettingsPopup($(obj).parent());
}

var openSettingsPopup = function(obj) 
{


    var functorun = function(jsonvar) 
    {
        alert(2)
        if (jsonvar && jsonvar.length > 0) {
            alert(3)
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