
function parseTweet(type) {
    hasProcessedDescription = false;
    nextid = null;
    try {
        nextid = parseInt(readCookie("maxid"));
    }
    catch(err) {
        console.log("parseTweet - Error parsing next id");
    }
    finally {
        if (nextid) {
            $("#maxid").val(nextid);
            console.log("parseTweet - nextid vem do cookie: " + nextid);
        }
        else {
            nextid = parseInt($("#maxid").val());
            createCookie("maxid", nextid);
            console.log("parseTweet - nextid vem do hidden field: " + nextid);
        }
    }

    setTimeout(function() {
        $('#tweetid').val(nextid);
        youtubeId = "";

        text = $('#tweet').val();

        if (text.substring(0,4) == "<blo") {
            addType = "T";

            $("#linkChange .buttonstable tr:first-child td i.fa").attr('class','').attr('style','margin-right: 9px;font-size: 18px;position: relative;top: 2px;');

            $("#linkChange .buttonstable tr:first-child td i").addClass('fa').addClass('fa-twitter').attr('style','margin-right: 9px;font-size: 18px;position: relative;top: 2px;');

            text = "\"" + text.replace(/"/g, '').replace('<\/script>', '<&#47;script>') + "\"";

            var functorun = function() 
            { 
                if (existingId != "no") {
                    getInformationbyid(existingId, true);
                }
                else {
                    origin = text.substring(text.indexOf('&mdash;') + 8, text.lastIndexOf(' <a href=https')); 
            
                    $('#postedby').val(origin);
                    
                    url = text.substring(text.lastIndexOf('https://twitter'), text.lastIndexOf('?ref_src=')); 
            
                    var date = text.substring(text.lastIndexOf('ref_src=twsrc%5Etfw>') + 20, text.lastIndexOf('</a></blockquote>')); 
                    
                    var year = date.substring(date.length - 4);
                    var month = date.substring(0, date.indexOf(' ')); 
                    var day = date.substring(date.indexOf(' ') + 1, date.lastIndexOf(' ') -1); 
            
                    $('#date').val(year + pad(getMonthFromString(month), 2) + pad(day, 2));
                    
                    $('#datetoshow').val(formatDateFromNum($('#date').val()));
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
                        else {
                            createPreview();
                        }
        
                        if ($(window).width() > 1200) {
                            $('#postedby').focus();
                        }
        
                        showMessage("Tweet Link Successfully Parsed"); 
                    }     
                    $('#mask').fadeOut(600);  
                }
            } 

            existsLink(text, "T", functorun);

            return false;
        }
        else if (text.indexOf("youtube.com/embed") >= 0) {
            addType = "Y";
            $("#linkChange .buttonstable tr:first-child td i.fa").attr('class','').attr('style','margin-right: 9px;font-size: 18px;position: relative;top: 2px;');
            $("#linkChange .buttonstable tr:first-child td i").addClass('fa').addClass('fa-youtube-play').attr('style','margin-right: 9px;font-size: 15px;position: relative;top: 1px;');
            
            var date = new Date();
            
            $('#date').val(formatNumDate(date));
            
            $('#datetoshow').val(formatDate(date));

            url = text.substring(text.indexOf('https://www.youtube'), text.indexOf('frameborder') - 2); 
            
            youtubeId = text.substring(text.indexOf('embed') + 6, text.indexOf('frameborder') - 2);

            urldirect = "https://www.youtube.com/watch?v=" + youtubeId; 

            text = "\"<div class='contentin' style='background: url(https://img.youtube.com/vi/" 
                    + youtubeId  + "/0.jpg); background-size: 100%;'></div>\""; 

            var functorun = function() 
            { 
                if (existingId != "no") {
                    getInformationbyid(existingId, true);
                }
                else {
                    if (type && type == 2) {
                        create();
                        showMessage("Youtube Link Successfully Parsed And Created"); 
                    }
                    else {
                        if (type && type == 1) {
                            if ($(".addpopup").css('display') == 'none') {
                                openCreatePopup(true);
                                hasProcessedDescription = true;
                                getYoutubeData();

                                createPreview();
                            }
                        }
                        else {
                            createPreview();
                        }
                        
                        if ($(window).width() > 1200) {
                            $('#postedby').focus();
                        }
                        showMessage("Youtube Link Successfully Parsed"); 
                    }             
                    $('#mask').fadeOut(600);  
                }
            } 

            existsLink(url, "Y", functorun);

            return false;
            
        }
        else if (text.indexOf("youtube") >= 0) {
            addType = "Y";
            $("#linkChange .buttonstable tr:first-child td i.fa").attr('class','').attr('style','margin-right: 9px;font-size: 18px;position: relative;top: 2px;');
            $("#linkChange .buttonstable tr:first-child td i").addClass('fa').addClass('fa-youtube-play').attr('style','margin-right: 9px;font-size: 15px;position: relative;top: 1px;');

            var date = new Date();
            
            $('#date').val(formatNumDate(date));
            
            $('#datetoshow').val(formatDate(date));
            url = text; 
            
            urldirect = text; 
            
            youtubeId = text.substring(text.indexOf('watch?v=') + 8);

            if (youtubeId.indexOf("&t=") > 0) {
                youtubeId = youtubeId.replace("&t=","?start=");
                youtubeId = youtubeId.substring(0, youtubeId.length -1);
            }
            
            text = "\"<div class='contentin' style='background: url(https://img.youtube.com/vi/" 
                    + youtubeId  + "/0.jpg); background-size: 100%;'></div>\""; 

            var functorun = function() 
            { 
                if (existingId != "no") {
                    getInformationbyid(existingId, true);
                }
                else {
                    if (type && type == 2) {
                        create();
                        showMessage("Youtube Link Successfully Parsed And Created"); 
                    }
                    else {
                        if (type && type == 1) {
                            if ($(".addpopup").css('display') == 'none') {
                                openCreatePopup(true);
                                getYoutubeData();
                                hasProcessedDescription = true;
                                createPreview();
                            }
                        }
                        else {
                            createPreview();
                        }
        
                        if ($(window).width() > 1200) {
                            $('#postedby').focus();
                        }
                        showMessage("Youtube Link Successfully Parsed"); 
                    }     
                    $('#mask').fadeOut(600);  
                }
            } 

            existsLink(url, "Y", functorun);

            return false;  
        }
        else if (text.substring(0,4) == "http") {
            addType = "H";
            $("#linkChange .buttonstable tr:first-child td i.fa").attr('class','').attr('style','margin-right: 9px;font-size: 18px;position: relative;top: 2px;');
            $("#linkChange .buttonstable tr:first-child td i").addClass('fa').addClass('fa-internet-explorer').attr('style','margin-right: 9px;font-size: 15px;position: relative;top: 1px;');

            var date = new Date();
            
            $('#date').val(formatNumDate(date));
            
            $('#datetoshow').val(formatDate(date));

            url = text; 

            text = "\"<div class='contentin' style='background: url(https://s.wordpress.com/mshots/v1/" 
                    + text + "); background-size: 100%;'></div>\""; 

            var functorun = function() 
            { 
                if (existingId != "no") {
                    getInformationbyid(existingId, true);
                }
                else {
                    if (type && type == 2) {
                        create();
                        showMessage("HTTP Link Successfully Parsed And Created"); 
                    }
                    else {
                        if (type && type == 1) {
                            if ($(".addpopup").css('display') == 'none') {
                                openCreatePopup(true);
                                
                                createPreview();

                                getWebsiteData();

                                hasProcessedDescription = true;
                            
                            }
                        }
                        else {
                            createPreview();
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
                }
            } 

            existsLink(url, "Y", functorun);

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
        newtweetobj.append($('<div class="innertweet" style="max-height: 290px;min-height: 200px;margin-left: 0 !important;"><i class="fa fa-circle-o-notch fa-spin" style="font-size: 14px;position: absolute;top: 0px;height: 33px;width: 33px;top: 69px;color: var(--high-color);font-size: 33px; display: none; "></i></div>'));
        newtweetobj.find('.innertweet').append(text.substring(1, text.length -1));
        setTimeout(function(){ customizeTweets(null, true, null, 1); }, 1300);

    }
    else {
        newtweetobj.attr('style', 'top: -3px;margin-top: 0px;overflow: hidden;')
        newtweetobj.append('<i class="fa fa-circle-o-notch fa-spin" style="font-size: 14px;position: absolute;top: 0px;left: height: 33px;width: 33px;top: 69px;color: var(--high-color);font-size: 33px; display: none; "></i>' + text.substring(1, text.length -1));

        setTimeout(function(){$('#previewtd > div iframe').show().css('opacity', 1);}, 1300);
    }
    newtweetobj.append('<div class="glasscover" style="position: absolute;left: -16px;width: calc(100% + 16px);height: 100%;top: 0px;"></div>');
    $('#linktable').hide();

    $('#previewtable').show();
}



function create() {
    nextid = null;
    try {
        nextid = parseInt(readCookie("maxid"));
    }
    catch(err) {
        console.log("create - Error parsing next id");
    }
    finally {
        if (nextid) {
            $("#maxid").val(nextid);
            console.log("create - nextid vem do cookie: " + nextid);
        }
        else {
            nextid = parseInt($("#maxid").val());
            createCookie("maxid", nextid);
            console.log("create - nextid vem do hidden field: " + nextid);
        }
    }

    var ishidden = "0";
    if ($("#ishidden").is(":checked")) {
        ishidden = "1";
    } 
    var resinfo = $('#infoinput').val().replace(/"/g, "");
    resinfo = resinfo.replace(/(\r\n|\n|\r)/gm, "").trim();

    var cats = $('#catsinput').val();

    if (cats == "undefined" || cats.length == 0) {
        cats = "tvn";
    }
    else {
        cats = cats.trim();
    }

    var classif = $('#classifinput').val();
    if (classif == "undefined" || classif.length == 0) {
        classif = "0";
    }

    var tags = $('#tagsinput').val();
    if (tags == "undefined" || tags.length == 0) {
        tags = "";
    }
    else {
        tags = tags.trim();
    }

    var date = new Date();
            
    var creationdate = formatNumDate(date);


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

    
    //if ($("#preview").is(":checked")) {
    
    eraseLinkTmpData(nextid, true);
    showMessage("New Link Created And Copied To Clipboard");
    closeSettingsPopup();

    if (hasProcessedDescription || addType == "T") {

        $('#result').val("{\r\n\"id\": \"" + nextid + "\",\r\n\"creationdate\": \"" + creationdate  + "\",\r\n\"type\": \"" + addType  + "\",\r\n\"url\": \"" + url  + "\",\r\n\"ishidden\": \"" + ishidden  + "\",\r\n\"date\": \"" + $('#date').val() + "\",\r\n\"author\": \"" + origin  + "\",\r\n\"categories\": \"" + cats + "\",\r\n\"tags\": \"" + tags + "\",\r\n\"info\": \"" + resinfo + "\",\r\n\"classif\": \"" + classif + "\",\r\n\"deleted\": \"\",\r\n\"isnew\": \"aaa\",\r\n\"tweet\": " + text + "\r\n},");
    
        var result = $('#result').val();
        
        $('#linkresult').val(result);
        $("#linkresult").select();
    
        document.execCommand('copy');
    
        $("#linkresult").blur();

        var mlink = encodeURIComponent(JSON.stringify(result));
    
        createCookie(nextid + "templink", mlink, 99999);
        createCookie("haschanges", "yes");
    
    
        if (showColorsAdv) {
            $("#generateicon").addClass("haschanges");
            if (showColors) {
                $("#settings").addClass("haschanges");
            }
        }  
    
        //} 
        createCookie("maxid", nextid + 1);
    
        resetFields(false);
        countalltweets();
    }
    else {
        getLinkDescriptionAndCreate(creationdate, cats, tags, resinfo, classif);
    }
}


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

var getLinkDescriptionAndCreate = function(creationdate, cats, tags, resinfo, classif) 
{
    if (addType == "Y") {
        getYoutubeData()
    }
    else {
        getWebsiteData()
    }

    dblFlag = true;
    dblClickTimeout = setTimeout(function() {     
        createLinkAfterDescription(creationdate, cats, tags, resinfo, classif);
        dblFlag = false;  
    }, 5500);

} 

function createLinkAfterDescription(creationdate, cats, tags, resinfo, classif) {       
    resinfo = resinfo.replace(/"/g, "");
    resinfo = resinfo.replace(/(\r\n|\n|\r)/gm, "").trim();

    if (addType == "Y") {
        text = text + "<div class='bottomstrip'><span onclick='javascript: showTooltip(event, this)' class='bottomstripline line1'>" + resinfo + "</span><span onclick='javascript: showTooltip(event, this)' class='bottomstripline line2'>" + urldirect + "</span></div>\""; 
        $('#result').val("{\r\n\"id\": \"" + nextid + "\",\r\n\"creationdate\": \"" + creationdate  + "\",\r\n\"type\": \"" + addType  + "\",\r\n\"url\": \"" + urldirect  + "\",\r\n\"ishidden\": \"0\",\r\n\"date\": \"" + $('#date').val() + "\",\r\n\"author\": \"" + $('#postedby').val() + "\",\r\n\"categories\": \"" + cats + "\",\r\n\"tags\": \"" + tags + "\",\r\n\"info\": \"" + resinfo + "\",\r\n\"classif\": \"" + classif + "\",\r\n\"deleted\": \"\",\r\n\"isnew\": \"aaa\",\r\n\"tweet\": " + text + "\r\n},");
    }
    else {
        text = text + "<div class='bottomstrip'><span onclick='javascript: showTooltip(event, this)' class='bottomstripline line1'>" + resinfo + "</span><span onclick='javascript: showTooltip(event, this)' class='bottomstripline line2'>" + url + "</span></div>\""; 
        $('#result').val("{\r\n\"id\": \"" + nextid + "\",\r\n\"creationdate\": \"" + creationdate  + "\",\r\n\"type\": \"" + addType  + "\",\r\n\"url\": \"" + url  + "\",\r\n\"ishidden\": \"0\",\r\n\"date\": \"" + $('#date').val() + "\",\r\n\"author\": \"" + $('#postedby').val() + "\",\r\n\"categories\": \"" + cats + "\",\r\n\"tags\": \"" + tags + "\",\r\n\"info\": \"" + resinfo + "\",\r\n\"classif\": \"" + classif + "\",\r\n\"deleted\": \"\",\r\n\"isnew\": \"aaa\",\r\n\"tweet\": " + text + "\r\n},");
    }

    var result = $('#result').val();
        
    $('#linkresult').val(result);
    $("#linkresult").select();

    document.execCommand('copy');

    $("#linkresult").blur();

    var mlink = encodeURIComponent(JSON.stringify(result));
    
    createCookie(nextid + "templink", mlink, 99999);
    createCookie("haschanges", "yes");


    if (showColorsAdv) {
        $("#generateicon").addClass("haschanges");
        if (showColors) {
            $("#settings").addClass("haschanges");
        }
    }  

    //} 
    createCookie("maxid", nextid + 1);

    resetFields(false);
    countalltweets();
}

function getYoutubeData(creationdate, cats, tags, resinfo, classif) {
    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/https://youtube.com/get_video_info?video_id=" + youtubeId,
        success: function (data, status, xhr) {// success callback function
            var result = decodeURIComponent(data); 
            //console.log('---------------YOUTUBE ' + videoId + ' ----------------');
            //console.log("Titulo: " + result.substring(result.indexOf(",\"title\":\"") + 10, result.indexOf("\",\"lengthSeconds\"")).replace(/\+/g, ' '))
            //console.log(result.substring(result.indexOf("\",\"lengthSeconds\":\"") + 19, result.indexOf("\",\"keywords\":")).replace(/\+/g, ' '));

            let totalSeconds = parseInt(result.substring(result.indexOf("\",\"lengthSeconds\":\"") + 19, result.indexOf("\",\"keywords\":")).replace(/\+/g, ' '));
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = totalSeconds % 60;

            minutes = String(minutes).padStart(2, "0");
            hours = String(hours).padStart(2, "0");
            seconds = String(seconds).padStart(2, "0");
            
            // checar se há horas e minutos
            //console.log("Time: " + hours + ":" + minutes + ":" + seconds);

            resinfo = resinfo + " " + (hours != "00" ? hours : "") + minutes + seconds + " - " + result.substring(result.indexOf(",\"title\":\"") + 10, result.indexOf("\",\"lengthSeconds\"")).replace(/\+/g, ' ');
            
            $("#infoinput").val(resinfo);

            if (dblFlag) {
                clearTimeout(dblClickTimeout);
                console.log("created youtube link in getYoutubeData");

                createLinkAfterDescription(creationdate, cats, tags, resinfo, classif);
            }
        }
    });
}

function getWebsiteData(creationdate, cats, tags, resinfo, classif) {

    $.ajax({
        url: 'https://cors-anywhere.herokuapp.com/' + url
      }).then(function(data) {
        //console.log('---------------WEBSITE ' + url + ' ----------------');
        // titulo - checar se é vazia         
        //console.log("Titulo: " + data.substring(data.indexOf("<title>") + 7, data.indexOf("</title>")));
        var html = $(data);
        // descricao - checar se é vazia
        //console.log("Descricao: " + getMetaContent(html, 'description') );
        resinfo = resinfo + " " + data.substring(data.indexOf("<title>") + 7, data.indexOf("</title>")) + " " + getMetaContent(html, 'description')
        $("#infoinput").val(resinfo);

        if (dblFlag) {
            clearTimeout(dblClickTimeout);
            console.log("created html link in getWebsiteData")
            createLinkAfterDescription(creationdate, cats, tags, resinfo, classif);
        }

      });

}

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
    $('#datetoshow').val('');
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
    $('#datetoshow').val('');
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