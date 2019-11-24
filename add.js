
function parseTweet(type) {
    
    nextid = parseInt(readCookie("maxid"));
    
    if (!nextid)
        nextid = parseInt($("#maxid").val());

    setTimeout(function(){
        $('#tweetid').val(nextid);

        text = $('#tweet').val();

        if (text.substring(0,4) == "<blo") {
            addType = "T";

            $("#linkChange .buttonstable tr:first-child td i.fa").attr('class','').attr('style','margin-right: 9px;font-size: 18px;position: relative;top: 2px;');

            $("#linkChange .buttonstable tr:first-child td i").addClass('fa').addClass('fa-twitter').attr('style','margin-right: 9px;font-size: 18px;position: relative;top: 2px;');

            text = "\"" + text.replace(/"/g, '').replace('<\/script>', '<&#47;script>') + "\"";
            
            origin = text.substring(text.indexOf('&mdash;') + 8, text.lastIndexOf(' <a href=https')); 
    
            $('#postedby').val(origin);
            
            url = text.substring(text.lastIndexOf('https://twitter'), text.lastIndexOf('?ref_src=')); 
    
            var date = text.substring(text.lastIndexOf('ref_src=twsrc%5Etfw>') + 20, text.lastIndexOf('</a></blockquote>')); 
            
            var year = date.substring(date.length - 4);
            var month = date.substring(0, date.indexOf(' ')); 
            var day = date.substring(date.indexOf(' ') + 1, date.lastIndexOf(' ') -1); 
    
            $('#date').val(year + pad(getMonthFromString(month), 2) + pad(day, 2));

            if (type && type == 2) {
                create();
                showMessage("Tweet Link Successfully Parsed And Created"); 
            }
            else {
                if (type && type == 1) {
                    if ($(".addpopup").css('display') == 'none') {
                        openCreatePopup(true);
                        
                        createPreview();
                    }
                }
                if ($(window).width() > 1200) {
                    $('#postedby').focus();
                }

                showMessage("Tweet Link Successfully Parsed"); 
            }     
            $('#mask').fadeOut(600);  
            return false;
        }
        else if (text.indexOf("youtube.com/embed") >= 0) {
            addType = "Y";
            $("#linkChange .buttonstable tr:first-child td i.fa").attr('class','').attr('style','margin-right: 9px;font-size: 18px;position: relative;top: 2px;');
            $("#linkChange .buttonstable tr:first-child td i").addClass('fa').addClass('fa-youtube-play').attr('style','margin-right: 9px;font-size: 15px;position: relative;top: 1px;');
            
            var date = new Date();
            
            $('#date').val(date.getFullYear() + "" + pad((date.getMonth() + 1), 2) + pad(date.getDate(), 2));
            
            url = text.substring(text.indexOf('https://www.youtube'), text.indexOf('frameborder') - 2); 
            
            urldirect = "https://www.youtube.com/watch?v=" + text.substring(text.indexOf('embed') + 6, text.indexOf('frameborder') - 2); 

            text = "\"" + ("<iframe " 
                    + text.substring(8)).replace(/"/g, "'")  + "\""; 

            if (type && type == 2) {
                create();
                showMessage("Youtube Link Successfully Parsed And Created"); 
            }
            else {
                if (type && type == 1) {
                    if ($(".addpopup").css('display') == 'none') {
                        openCreatePopup(true);
                        
                        createPreview();
                    }
                }
                if ($(window).width() > 1200) {
                    $('#postedby').focus();
                }
                showMessage("Youtube Link Successfully Parsed"); 
            }             
            $('#mask').fadeOut(600);  
            return false;
            
        }
        else if (text.indexOf("youtube") >= 0) {
            addType = "Y";
            $("#linkChange .buttonstable tr:first-child td i.fa").attr('class','').attr('style','margin-right: 9px;font-size: 18px;position: relative;top: 2px;');
            $("#linkChange .buttonstable tr:first-child td i").addClass('fa').addClass('fa-youtube-play').attr('style','margin-right: 9px;font-size: 15px;position: relative;top: 1px;');

            var date = new Date();
            
            $('#date').val(date.getFullYear() + "" + pad((date.getMonth() + 1), 2) + pad(date.getDate(), 2));
            
            url = text.substring(text.indexOf('https://www.youtube'), text.indexOf('frameborder') - 2); 
            
            urldirect = text; 
            
            var urltemp = text.substring(text.indexOf('watch?v=') + 8);

            if (urltemp.indexOf("&t=") > 0) {
                urltemp = urltemp.replace("&t=","?start=");
                urltemp = urltemp.substring(0, urltemp.length -1);
            }

            text = "\"<iframe src='https://www.youtube.com/embed/" 
            + urltemp + "' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>\""; 

             
            if (type && type == 2) {
                create();
                showMessage("Youtube Link Successfully Parsed And Created"); 
            }
            else {
                if (type && type == 1) {
                    if ($(".addpopup").css('display') == 'none') {
                        openCreatePopup(true);
                        
                        createPreview();
                    }
                }
                if ($(window).width() > 1200) {
                    $('#postedby').focus();
                }
                showMessage("Youtube Link Successfully Parsed"); 
            }     
            $('#mask').fadeOut(600);  
            return false;
            
        }
        else if (text.substring(0,4) == "http") {
            addType = "H";
            $("#linkChange .buttonstable tr:first-child td i.fa").attr('class','').attr('style','margin-right: 9px;font-size: 18px;position: relative;top: 2px;');
            $("#linkChange .buttonstable tr:first-child td i").addClass('fa').addClass('fa-internet-explorer').attr('style','margin-right: 9px;font-size: 15px;position: relative;top: 1px;');

            var date = new Date();
            
            $('#date').val(date.getFullYear() + "" + pad((date.getMonth() + 1), 2) + pad(date.getDate(), 2));
            
            url = text; 

            text = "\"<iframe src='" 
                    + text + "'></iframe><div style='position: relative;left: 0px;width: 100px;height: 0px;top: -451px;'><div style='position: relative;left: 0px;width: 83px;height: 62vh;top: 0px;'></div></div><div style='position: relative;right: -16px !important;width: 100px;height: 0px;top: -451px;float: right;'><div style='position: relative;left: 0px;width: 83px;height: 62vh;top: 0px;'></div></div>\""; 

            if (type && type == 2) {
                create();
                showMessage("HTTP Link Successfully Parsed And Created"); 
            }
            else {
                if (type && type == 1) {
                    if ($(".addpopup").css('display') == 'none') {
                        openCreatePopup(true);
                        
                        createPreview();
                    }
                }

                /*$('#date').focus(function(){
                    var that = this;
                    setTimeout(function(){ that.selectionStart = that.selectionEnd = 10000; }, 0);
                });*/
                if ($(window).width() > 1200) {
                    $('#postedby').focus();
                }
                showMessage("HTTP Link Successfully Parsed"); 
            }
            $('#mask').fadeOut(600);  
            return false;
        }
        $('#mask').fadeOut(600);  

        if (type) {
            if (type == 2) {
                showMessage("Link Parse Failed And Was Not Created"); 
            }
            else {
                $('#tweet').val("");
                if ($(".addpopup").css('display') == 'none') {
                    $('#tweet').focus();
                    $("#linkChange .buttonstable tr:first-child td i.fa").attr('class','').attr('style','margin-right: 9px;font-size: 18px;position: relative;top: 2px;');

                    $("#linkChange .buttonstable tr:first-child td i").addClass('fa').addClass('fa-question').attr('style','');
                
                    dblFlag = true;
                    openCreatePopup(true);

                }
            }
        }
        else {
            showMessage("Link Parse Failed"); 
        }
    }, 700);
} 


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

function createPreview() {
    var xclass = "";
    var typefa = "twitter"
    if (addType == "H") {
        xclass = " html";
        typefa = "internet-explorer"
    }
    else if (addType == "Y") {
        xclass = " yt";
        typefa = "youtube-play"
    }
    $('#previewtd').empty();

    var newtweet = $('#previewtd').append($('<div id="inid" style="overflow: hidden;margin-top: 0px;" class="tweet' + xclass + '"></div>'));
    var newtweetobj = $('#inid');
    $('#previewtd').css('height', '');    

    if (addType == "T") {
        newtweetobj.append($('<div class="innertweet" style="max-height: 290px;min-height: 200px;"><i class="fa fa-circle-o-notch fa-spin" style="font-size: 14px;position: absolute;top: 0px;height: 33px;width: 33px;top: 69px;color: var(--high-color);font-size: 33px;/* display: none; */"></i></div>'));
        newtweetobj.find('.innertweet').append(text.substring(1, text.length -1))
        setTimeout(function(){ customizeTweets(null, true, null, 1); }, 1300);

    }
    else {
        newtweetobj.attr('style', 'top: -10px;margin-top: 0px;')
        newtweetobj.append('<i class="fa fa-circle-o-notch fa-spin" style="font-size: 14px;position: absolute;top: 0px;left: height: 33px;width: 33px;top: 69px;color: var(--high-color);font-size: 33px;/* display: none; */"></i>' + text.substring(1, text.length -1));

        setTimeout(function(){$('#previewtd > div iframe').show().css('opacity', 1);}, 1300);
        
        $('#previewtd').css('height', '212px');
    }

    $('#linktable').hide();

    $('#previewtable').show();
}



function create() {
    var ishidden = "0";
    if ($("#ishidden").is(":checked")) {
        ishidden = "1";
    } 
    var resinfo = $('#infoinput').val().replace(/"/g, "");
    resinfo = resinfo.replace(/(\r\n|\n|\r)/gm, "");

    var cats = $('#catsinput').val();

    if (cats == "undefined" || cats.length == 0) {
        cats = "";
    }

    var classif = $('#classifinput').val();
    if (classif == "undefined" || classif.length == 0) {
        classif = "0";
    }

    var tags = $('#tagsinput').val();
    if (tags == "undefined" || tags.length == 0) {
        tags = "";
    }

    if (addType == "T") {
        $('#result').val("{\r\n\"id\": \"" + nextid + "\",\r\n\"type\": \"" + addType  + "\",\r\n\"url\": \"" + url  + "\",\r\n\"ishidden\": \"" + ishidden  + "\",\r\n\"date\": \"" + $('#date').val() + "\",\r\n\"author\": \"" + origin  + "\",\r\n\"categories\": \"" + cats + "\",\r\n\"tags\": \"" + tags + "\",\r\n\"info\": \"" + resinfo + "\",\r\n\"classif\": \"" + classif + "\",\r\n\"tweet\": " + text + "\r\n},");
    }
    else if (addType == "Y") {
        $('#result').val("{\r\n\"id\": \"" + nextid + "\",\r\n\"type\": \"" + addType  + "\",\r\n\"url\": \"" + urldirect  + "\",\r\n\"ishidden\": \"" + ishidden  + "\",\r\n\"date\": \"" + $('#date').val() + "\",\r\n\"author\": \"" + $('#postedby').val() + "\",\r\n\"categories\": \"" + cats + "\",\r\n\"tags\": \"" + tags + "\",\r\n\"info\": \"" + resinfo + "\",\r\n\"classif\": \"" + classif + "\",\r\n\"tweet\": " + text + "\r\n},");
    }
    else {
        $('#result').val("{\r\n\"id\": \"" + nextid + "\",\r\n\"type\": \"" + addType  + "\",\r\n\"url\": \"" + url  + "\",\r\n\"ishidden\": \"" + ishidden  + "\",\r\n\"date\": \"" + $('#date').val() + "\",\r\n\"author\": \"" + $('#postedby').val() + "\",\r\n\"categories\": \"" + cats + "\",\r\n\"tags\": \"" + tags + "\",\r\n\"info\": \"" + resinfo + "\",\r\n\"classif\": \"" + classif + "\",\r\n\"tweet\": " + text + "\r\n},");
    }

    var result = $('#result').val();
    
    $('#linkresult').val(result);
    $("#linkresult").select();

    document.execCommand('copy');

    //resetFieldsPopup();

    /*
    if ($("#onemore").is(":checked")) {
        showMessage("New Link Created And Copied To Clipboard. You Can Add One More Now");
        $('#tweet').focus();
    } 
    else {
        showMessage("New Link Created And Copied To Clipboard");
        $('.addpopup').fadeOut(2000);
    }        */
    showMessage("New Link Created And Copied To Clipboard");
    closeSettingsPopup();
    
    
    //if ($("#preview").is(":checked")) {
        createCookie(nextid + "templink", encodeURIComponent(JSON.stringify(result)), 99999);
        createCookie("hasChanges", "Yes");
        $("#generateicon").addClass("haschanges");
    //} 

    createCookie("maxid", pad(nextid + 1, 4));

    resetFields(false);
    countalltweets();

}


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


var openCreatePopup = function(flag) 
{
    /*
    if (flag) {
        $("#onemore").prop("checked", false);
    }
    else {
        $("#onemore").prop("checked", true);
        $('#tweet').focus();
    } */
    $('#tweet').focus();

    openSettingsPopup();

} 

function resetFieldsPopup() 
{
    $('#tweet').val('');
    $('#date').val('');
    $('#tweetid').val('');
    $('#postedby').val('');
    $('#catsinput').val('');
    $('#tagsinput').val('');
    $('#infoinput').val('');
    $('#result').val('');  
    $('#classifinput').val('0');     
    $('#typeTT').css('border-color', 'white'); 
    $('#typeHH').css('border-color', 'white'); 
    $('#typeYY').css('border-color', 'white');   

    $( ".litags" ).each( function( index, element ){
        $(this).removeClass("selectedtag");
    });

    $('#cattvn').prop("checked", false);
    $('#cattrn').prop("checked", false);
    $('#cattvi').prop("checked", false);
    $('#cattvl').prop("checked", false);
    $('#cattre').prop("checked", false);
    $('#cattrl').prop("checked", false);
    $('#cattke').prop("checked", false);
    $('#catimp').prop("checked", false);
    $('#catcli').prop("checked", false);

}  

var closePopup = function() 
{
    $('#tweet').val('');
    $('#date').val('');
    $('#tweetid').val('');
    $('#postedby').val('');
    $('#catsinput').val('');
    $('#tagsinput').val('');
    $('#infoinput').val('');
    $('#result').val('');  
    $('.addpopup').fadeOut();
    $('#typeTT').css('border-color', 'white'); 
    $('#typeHH').css('border-color', 'white'); 
    $('#typeYY').css('border-color', 'white');  
}  
/*
function clickCheckCat(obj, type) 
{
    if ($(obj).is(":checked")) {
        $('#categories').val($('#categories').val() + type + " ");
    } 
    else {
        $('#categories').val($('#categories').val().replace(type + " ", ""));
    }
} 

 */