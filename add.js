
function parseTweet(nomessage) {
    setTimeout(function(){
        nextid = parseInt(readCookie("maxid"));
        $('#tweetid').val(nextid);

        text = $('#tweet').val();
        
        if (text.substring(0,4) == "<blo") {
            addType = "T";
            $('#typeTT').css('border-color', '#00bc00'); 

            text = "\"" + text.replace(/"/g, '').replace('<\/script>', '<&#47;script>') + "\"";
            
            origin = text.substring(text.indexOf('&mdash;') + 8, text.lastIndexOf(' <a href=https')); 
    
            $('#postedby').val(origin);
            
            url = text.substring(text.lastIndexOf('https://twitter'), text.lastIndexOf('?ref_src=')); 
    
            var date = text.substring(text.lastIndexOf('ref_src=twsrc%5Etfw>') + 20, text.lastIndexOf('</a></blockquote>')); 
            
            var year = date.substring(date.length - 4);
            var month = date.substring(0, date.indexOf(' ')); 
            var day = date.substring(date.indexOf(' ') + 1, date.lastIndexOf(' ') -1); 
    
            $('#date').val(year + pad(getMonthFromString(month), 2) + pad(day, 2));

            showMessage("Twitter Link Successfully Parsed"); 

            $('#categories').focus();

            if (nomessage) {
                $('#tweet').val("");
                if ($(".addpopup").css('display') == 'none') {
                    openCreatePopup(true);
                }
            }

            return false;
        }
        else if (text.indexOf("youtube.com/embed") >= 0) {
            addType = "Y";
            $('#typeYY').css('border-color', '#00bc00'); 

            var date = new Date();
            
            $('#date').val(date.getFullYear() + "" + pad((date.getMonth() + 1), 2) + pad(date.getDate(), 2));
            
            url = text.substring(text.indexOf('https://www.youtube'), text.indexOf('frameborder') - 2); 
            
            urldirect = "https://www.youtube.com/watch?v=" + text.substring(text.indexOf('embed') + 6, text.indexOf('frameborder') - 2); 
            
            text = "\"" + ("<iframe style='position: relative;top: 4px;width: 500px;background: white;margin-top: 6px;height: 446px;margin-left: calc(50% - 250px);margin-right: auto;border: 1px solid white;border-radius: 5px;' " 
                    + text.substring(8)).replace(/"/g, "'")  + "\""; 

            showMessage("Youtube Link Successfully Parsed"); 

            $('#date').focus(function(){
                var that = this;
                setTimeout(function(){ that.selectionStart = that.selectionEnd = 10000; }, 0);
            });

            if (nomessage) {
                $('#tweet').val("");
                if ($(".addpopup").css('display') == 'none') {
                    openCreatePopup(true);
                }
            }

            return false;
            
        }
        else if (text.indexOf("youtube") >= 0) {
            addType = "Y";
            $('#typeYY').css('border-color', '#00bc00'); 

            var date = new Date();
            
            $('#date').val(date.getFullYear() + "" + pad((date.getMonth() + 1), 2) + pad(date.getDate(), 2));
            
            url = text.substring(text.indexOf('https://www.youtube'), text.indexOf('frameborder') - 2); 
            
            urldirect = text; 
            
            text = "\"<iframe style='position: relative;top: 4px;width: 500px;background: white;margin-top: 6px;height: 446px;margin-left: calc(50% - 250px);margin-right: auto;border: 1px solid white;border-radius: 5px;' src='https://www.youtube.com/embed/" 
            + text.substring(text.indexOf('watch?v=') + 8) + "' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>\""; 

            showMessage("Youtube Link Successfully Parsed"); 

            $('#date').focus(function(){
                var that = this;
                setTimeout(function(){ that.selectionStart = that.selectionEnd = 10000; }, 0);
            });
            
            if (nomessage) {
                $('#tweet').val("");
                if ($(".addpopup").css('display') == 'none') {
                    openCreatePopup(true);
                }
            }
            return false;
            
        }
        else if (text.substring(0,4) == "http") {

            addType = "H";
            $('#typeHH').css('border-color', '#00bc00'); 

            var date = new Date();
            
            $('#date').val(date.getFullYear() + "" + pad((date.getMonth() + 1), 2) + pad(date.getDate(), 2));
            
            url = text; 

            text = "\"<iframe style='position: relative;top: 4px;width: 500px;background: white;margin-top: 6px;height: 446px;margin-left: calc(50% - 250px);margin-right: auto;border: 1px solid white;border-radius: 5px;' src='" 
                    + text + "'></iframe><div style='position: relative;left: 0px;width: 100px;height: 0px;top: -451px;'><div style='position: relative;left: 0px;width: 83px;height: 473px;top: 0px;'></div></div><div style='position: relative;right: -16px !important;width: 100px;height: 0px;top: -451px;float: right;'><div style='position: relative;left: 0px;width: 83px;height: 473px;top: 0px;'></div></div>\""; 

                    
            showMessage("HTML Link Successfully Parsed"); 

            $('#date').focus(function(){
                var that = this;
                setTimeout(function(){ that.selectionStart = that.selectionEnd = 10000; }, 0);
            });

            if (nomessage) {
                $('#tweet').val("");
                if ($(".addpopup").css('display') == 'none') {
                    openCreatePopup(true);
                }
            }

            return false;
        }

        if (nomessage) {

        }
        else {
            showMessage("Link Parse Failed"); 
        }
    }, 700);
} 


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function create() {
    var ishidden = "0";
    if ($("#ishidden").is(":checked")) {
        ishidden = "1";
    } 
    var resinfo = $('#info').val().replace(/"/g, "");
    resinfo = resinfo.replace(/(\r\n|\n|\r)/gm, "");

    if (addType == "T") {
        $('#result').val("{\r\n\"id\": \"" + nextid + "\",\r\n\"type\": \"" + addType  + "\",\r\n\"url\": \"" + url  + "\",\r\n\"ishidden\": \"" + ishidden  + "\",\r\n\"date\": \"" + $('#date').val() + "\",\r\n\"author\": \"" + origin  + "\",\r\n\"categories\": \"" + $('#categories').val() + "\",\r\n\"tags\": \"" + $('#tags').val() + "\",\r\n\"info\": \"" + resinfo + "\",\r\n\"classif\": \"" + $('#classifpop').val() + "\",\r\n\"tweet\": " + text + "\r\n},");
    }
    else if (addType == "Y") {
        $('#result').val("{\r\n\"id\": \"" + nextid + "\",\r\n\"type\": \"" + addType  + "\",\r\n\"url\": \"" + urldirect  + "\",\r\n\"ishidden\": \"" + ishidden  + "\",\r\n\"date\": \"" + $('#date').val() + "\",\r\n\"author\": \"" + $('#postedby').val() + "\",\r\n\"categories\": \"" + $('#categories').val() + "\",\r\n\"tags\": \"" + $('#tags').val() + "\",\r\n\"info\": \"" + resinfo + "\",\r\n\"classif\": \"" + $('#classifpop').val() + "\",\r\n\"tweet\": " + text + "\r\n},");
    }
    else {
        $('#result').val("{\r\n\"id\": \"" + nextid + "\",\r\n\"type\": \"" + addType  + "\",\r\n\"url\": \"" + url  + "\",\r\n\"ishidden\": \"" + ishidden  + "\",\r\n\"date\": \"" + $('#date').val() + "\",\r\n\"author\": \"" + $('#postedby').val() + "\",\r\n\"categories\": \"" + $('#categories').val() + "\",\r\n\"tags\": \"" + $('#tags').val() + "\",\r\n\"info\": \"" + resinfo + "\",\r\n\"classif\": \"" + $('#classifpop').val() + "\",\r\n\"tweet\": " + text + "\r\n},");
    }

    var result = $('#result').val();

    $("#result").select();

    document.execCommand('copy');

    resetFieldsPopup();

    if ($("#onemore").is(":checked")) {
        showMessage("New Link Created And Copied To Clipboard. You Can Add One More Now");
        $('#tweet').focus();
    } 
    else {
        showMessage("New Link Created And Copied To Clipboard");
        $('.addpopup').fadeOut(2000);
    }       
    
    if ($("#preview").is(":checked")) {
        createCookie(nextid + "templink", encodeURIComponent(JSON.stringify(result)), 99999);
        createCookie("hasChanges", "Yes");
        $("#generate").addClass("haschanges");

/*         var tmpid = readCookie("tmpid");
        if (tmpid && tmpid.length > 0) {

        }
        else {
            createCookie("tmpid", pad(nextid, 4));
        }  */
    } 
    createCookie("maxid", pad(nextid + 1, 4));

    resetFields(false);
    countalltweets();

}


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


var openCreatePopup = function(flag) 
{
    if (flag) {
        $("#onemore").prop("checked", false);
    }
    else {
        $("#onemore").prop("checked", true);
        $('#tweet').focus();
    }
    $('.addpopup').fadeIn();

} 

function resetFieldsPopup() 
{
    $('#tweet').val('');
    $('#date').val('');
    $('#tweetid').val('');
    $('#postedby').val('');
    $('#categories').val('');
    $('#tags').val('');
    $('#info').val('');
    $('#result').val('');    
    $('#typeTT').css('border-color', 'white'); 
    $('#typeHH').css('border-color', 'white'); 
    $('#typeYY').css('border-color', 'white');   
}  

var closePopup = function() 
{
    $('#tweet').val('');
    $('#date').val('');
    $('#tweetid').val('');
    $('#postedby').val('');
    $('#categories').val('');
    $('#tags').val('');
    $('#info').val('');
    $('#result').val('');  
    $('.addpopup').fadeOut();
    $('#typeTT').css('border-color', 'white'); 
    $('#typeHH').css('border-color', 'white'); 
    $('#typeYY').css('border-color', 'white');  
}  

function clickCheckCat(obj, type) 
{
    if ($(obj).is(":checked")) {
        $('#categories').val($('#categories').val() + type + " ");
    } 
    else {
        $('#categories').val($('#categories').val().replace(type + " ", ""));
    }
} 

