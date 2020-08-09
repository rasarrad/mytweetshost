
function parseTweet(type) {
    hasProcessedDescription = false;
    nextid = null;
    try {
        nextid = parseInt(readCookie("maxid"));
    }
    catch(err) {
        //cnonsole.log("parseTweet - Error parsing next id");
    }
    finally {
        if (nextid) {
            $("#maxid").val(nextid);
            //cnonsole.log("parseTweet - nextid vem do cookie: " + nextid);
        }
        else {
            nextid = parseInt($("#maxid").val());
            createCookie("maxid", nextid);
            //cnonsole.log("parseTweet - nextid vem do hidden field: " + nextid);
        }
    }
    
    setTimeout(function() {
        $('#tweetid').val(nextid);
        youtubeId = "";
        $("#infoinput").val("");
        text = $('#tweet').val();

        //if (text.substring(0,19) == "https://twitter.com") {
        if (text.includes("twitter.com")) {    
            addType = "T";

            text = text.replace('?s=20', '');
            text = text.replace('?s=19', '');
            var idExisting = existsLink(text, "T");
            if (idExisting) {
                resetMainDiv(); 
    
                getInformationbyid(idExisting, true);
            }
            else {

                url = text; 
        
                var date = text.substring(text.lastIndexOf('ref_src=twsrc%5Etfw>') + 20, text.lastIndexOf('</a></blockquote>')); 
                
                if (type && type == 2) {
                    create();
                    showMessage("Tweet Link Successfully Parsed And Created"); 
                }
                else {
                    if (type && type == 1) {
                        openCreatePopup();
                    }
                    createPreview();

                    if ($(window).width() > 1200) {
                        $('#postedby').focus();
                    }
    
                    showMessage("Tweet Link Successfully Parsed"); 
                }     
                $('#mask').fadeOut(600);  
            }

            return false;
        }
        else if (text.substring(0,4) == "<blo") {
            addType = "T";

            text = text.replace(/"/g, '').replace('<\/script>', '<&#47;script>');

            var idExisting = existsLink(text, "T");
            if (idExisting) {
                resetMainDiv(); 
    
                getInformationbyid(idExisting, true);
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
                        openCreatePopup();
                    }
                    createPreview();

                    if ($(window).width() > 1200) {
                        $('#postedby').focus();
                    }
    
                    showMessage("Tweet Link Successfully Parsed"); 
                }     
                $('#mask').fadeOut(600);  
            }

            return false;
        }
        else if (text.indexOf("youtube.com/embed") >= 0) {
            addType = "Y";
            
            var date = new Date();
            
            $('#date').val(formatNumDate(date));
            
            $('#datetoshow').val(formatDate(date));

            youtubeId = text.substring(text.indexOf('embed') + 6, text.indexOf('embed') + 17);

            url = "https://www.youtube.com/embed/" + youtubeId; 
            
            urldirect = "https://www.youtube.com/watch?v=" + youtubeId; 

            text = "<div class='contentin pobj' id='contentin" + nextid + "' style='background: url(https://img.youtube.com/vi/" 
                    + youtubeId  + "/0.jpg); background-size: 100%;'><i class='logo fa fa-youtube-play'></i></div>"; 

            var idExisting = existsLink(url, "Y");
            if (idExisting) {
                resetMainDiv();
    
                getInformationbyid(idExisting, true);
            }
            else {
                if (type && type == 2) {
                    create();
                    showMessage("Youtube Link Successfully Parsed And Created"); 
                }
                else {
                    if (type && type == 1) {
                        openCreatePopup();
                        hasProcessedDescription = true;
                        getYoutubeData();

                        createPreview();
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

            return false;
            
        }
        else if (text.substring(0, 50).indexOf("youtube") >= 0) {
            addType = "Y";

            var date = new Date();
            
            $('#date').val(formatNumDate(date));
            
            $('#datetoshow').val(formatDate(date));
            url = text; 
            
            urldirect = text; 
            
            youtubeId = text.substring(text.indexOf('watch?v=') + 8, text.indexOf('watch?v=') + 19);

            text = "<div class='contentin pobj' id='contentin" + nextid + "' style='background: url(https://img.youtube.com/vi/" 
                    + youtubeId  + "/0.jpg); background-size: 100%;'><i class='logo fa fa-youtube-play'></i></div>"; 

            var idExisting = existsLink(url, "Y");
            if (idExisting) {
                resetMainDiv();
    
                getInformationbyid(idExisting, true);
            }
            else {
                if (type && type == 2) {
                    create();
                    showMessage("Youtube Link Successfully Parsed And Created"); 
                }
                else {
                    if (type && type == 1) {
                        openCreatePopup();
                        getYoutubeData();
                        hasProcessedDescription = true;
                        createPreview();
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

            return false;  
        }
        else if (text.substring(0,4) == "http") {
            addType = "H";

            var date = new Date();
            
            $('#date').val(formatNumDate(date));
            
            $('#datetoshow').val(formatDate(date));

            //hasAvailableImage(text);

            url = text; 

            text = "<div class='contentin pobj' id='contentin" + nextid + "' style='background: url(https://s.wordpress.com/mshots/v1/" 
                    + text + "); background-size: 100%;'><i class='logo fa fa-html5'></i></div>"; 

            var idExisting = existsLink(url, "Y");
            if (idExisting) {
                resetMainDiv();
    
                getInformationbyid(idExisting, true);
            }
            else {
                if (type && type == 2) {
                    create();
                    showMessage("HTTP Link Successfully Parsed And Created"); 
                }
                else {
                    if (type && type == 1) {
                        openCreatePopup();
                        
                        createPreview();

                        getWebsiteData();

                        hasProcessedDescription = true;
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

            return false;
        }
        else {
            hasProcessedDescription = true;
            addType = "N";

            var date = new Date();
            
            $('#date').val(formatNumDate(date));
            
            $('#datetoshow').val(formatDate(date));

            url = ""; 

            text = "<div class='contentin pobj' id='contentin" + nextid + "' ><div></div><i onclick='javascript: editLinkText(" + nextid + ")' class='edittext fa fa-pencil'></i><i onclick='javascript: copyLinkText(" + nextid + ")' class='edittext fa fa-clone'></i><i onclick='javascript: copyLinkTexSel(" + nextid + ")' class='edittext fa fa-clone clone2'></i></div>"; 

            $('#previewtable').hide();

            openCreatePopup(true);
            
            $('#mask').fadeOut(600); 

            return false;
        }
/* 
        $('#mask').fadeOut(600);  
        if (type) {
            if (type == 2) {
                showMessage("Link Parse Failed And Was Not Created"); 
            }
            else {
                $('#tweet').val("");
            
                $('#tweet').focus();
                $("#linkChange .buttonstable tr:first-child td i.fa").attr('class','').attr('style','margin-right: 9px;font-size: 18px;position: relative;top: 2px;');

                $("#linkChange .buttonstable tr:first-child td i").addClass('fa').addClass('fa-question').attr('style','');
            
                dblFlag = true;
                openCreatePopup();
            }
        }
        else {
            showMessage("Link Parse Failed"); 
        } */
    }, 700);
} 

function saveLinkText() {

    textarea = $("#editinfodiv textarea");

    var finalValue = textarea.val();

    var displayValue = textarea.val().replace(/[\n\r]/g, '<br />');
    var displayValueAux = textarea.val().replace(/[\n\r]/g, '<br />');
    var lnkmap = new Map();
    var firstindex = 0;
    var secondindex = 0;
    var linksCounter = 0;

    /*
    while (displayValueAux.indexOf('http') >= 0) {
        firstindex = displayValueAux.indexOf('http');
        linksCounter++;
        for (x=firstindex; x < displayValueAux.length; x++) {
            if (displayValueAux.substring(x, x + 1) == " ") {
                secondindex = x;
                break;
            }
        }

        lnkmap.set("xxx" + linksCounter, displayValueAux.substring(firstindex, secondindex));

        displayValueAux = displayValueAux.substring(secondindex);
    }

    for (y=0; y < linksCounter; y++) {
        var linkAux = lnkmap.get("xxx" + (y + 1));

        displayValue = displayValue.replace(linkAux, "<a target='_blank' href='" + linkAux + "'>" + linkAux + "</a>")
    }
*/
    $("#contentin" + $('#editinfodiv').attr("cid") + " div").html(displayValue);

    createCookie2($('#editinfodiv').attr("cid"), "info", finalValue);

    closeLinkText(); 
}


function editLinkText(id, obj) {
    var jsonvar = null;

    if (obj)
        jsonvar = obj;
    else
        jsonvar = getJsonbyid(id);

    $('body, html').css('overflow-y', 'hidden').css('position', 'fixed');

    $('#editinfodiv .sectionicontd').css("height", (window.innerHeight - 94) + "px");

    $('#editinfodiv textarea').val(unescape(jsonvar.info))
    $('#editinfodiv').attr("cid", jsonvar.id);
    $('#editinfodiv').fadeIn(800);
}



function closeLinkText() {
    $('body, html').css('overflow-y', 'auto').css('position', 'static');
    $('#editinfodiv').fadeOut(800);
}



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

function createPreview() {
    $("#linkChange #seticon").attr('class','');
    
    var xclass = "";
    if (addType == "H") {
        xclass = " html";
        $("#linkChange #seticon").removeClass('fa-twitter').addClass('fa-internet-explorer');
    }
    else if (addType == "Y") {
        xclass = " yt";
        $("#linkChange #seticon").removeClass('fa-twitter').addClass('fa-youtube-play');
    }
    $('#previewtd').empty();

    $('#previewtd').append($('<div id="inid" style="overflow: hidden;margin-top: 0px;" class="tweet' + xclass + '"></div>'));
    var newtweetobj = $('#inid');
    $('#previewtd').css('height', '');    

    if (addType == "T") {
        $("#linkChange #seticon").addClass('fa').addClass('fa-twitter');

        newtweetobj.append($('<div class="innertweet" style="max-height: 290px;min-height: 200px;width: 100% !important;margin-left: 0 !important;"><i class="fa fa-circle-o-notch fa-spin" style="font-size: 14px;position: absolute;top: 0px;height: 33px;width: 33px;top: 69px;color: var(--high-color);font-size: 33px; display: none; "></i></div>'));
        newtweetobj.find('.innertweet').append(text);
        
        setTimeout(function(){ 
            $('#previewtd > div div.innertweet twitter-widget').show().css('opacity', 1);
        }, 1300);

    }
    else {
        newtweetobj.attr('style', 'top: -3px;margin-top: 0px;overflow: hidden;')
        newtweetobj.append('<i class="fa fa-circle-o-notch fa-spin" style="font-size: 14px;position: absolute;top: 0px;left: height: 33px;width: 33px;top: 69px;color: var(--high-color);font-size: 33px; display: none; "></i>' + text);

        setTimeout(function(){$('#previewtd > div iframe').show().css('opacity', 1);}, 1300);
    }
    newtweetobj.append('<div class="glasscover" style="position: absolute;left: -16px;width: calc(100% + 16px);height: 100%;top: 0px;"></div>');
    //$('#linktable').hide();

    //$('#previewtable').show();
}



function create() {
    nextid = null;
    try {
        nextid = parseInt(readCookie("maxid"));
    }
    catch(err) {
        //cnonsole.log("create - Error parsing next id");
    }
    finally {
        if (nextid) {
            $("#maxid").val(nextid);
            //cnonsole.log("create - nextid vem do cookie: " + nextid);
        }
        else {
            nextid = parseInt($("#maxid").val());
            createCookie("maxid", nextid);
            //cnonsole.log("create - nextid vem do hidden field: " + nextid);
        }
    }

    var ishidden = "0";
    var resinfo = $('#infoinput').val();
    
    var cats = $('#catsinput').val();

    /* if (cats == "undefined" || cats.length == 0) {
        cats = "cli";
    }
    else {
        cats = cats.trim();
    } */
    cats = cats.trim();

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

        var jsonVal = {};
        
        jsonVal.id = nextid;        
        jsonVal.info = escape(resinfo);        
        jsonVal.classif = classif;        
        jsonVal.categories = cats;        
        jsonVal.date = $('#date').val();        
        jsonVal.tags = tags;              
        jsonVal.deleted = "";   
        jsonVal.creationdate = creationdate; 
        jsonVal.type = addType; 
        jsonVal.isnew = "yes";
        jsonVal.ishidden = "0";

        if (addType == "T") {
            $('#result').val("{\r\n\"id\": \"" + nextid + "\",\r\n\"ishidden\": \"" + jsonVal.ishidden  + "\",\r\n\"creationdate\": \"" + creationdate  + "\",\r\n\"type\": \"" + addType  + "\",\r\n\"url\": \"" + url  + "\",\r\n\"ishidden\": \"0\",\r\n\"date\": \"" + $('#date').val() + "\",\r\n\"author\": \"" + origin  + "\",\r\n\"categories\": \"" + cats + "\",\r\n\"tags\": \"" + tags + "\",\r\n\"info\": \"" + resinfo + "\",\r\n\"classif\": \"" + classif + "\",\r\n\"deleted\": \"\",\r\n\"isnew\": \"aaa\",\r\n\"tweet\": " + text + "\r\n},");       
            jsonVal.url = url; 
            jsonVal.author = origin;  
        }
        else if (addType == "N") {
            jsonVal.author = $('#postedby').val(); 
            
            if (isMy)
                jsonVal.ishidden = "1";

            $('#result').val("{\r\n\"id\": \"" + nextid + "\",\r\n\"ishidden\": \"" + jsonVal.ishidden  + "\",\r\n\"creationdate\": \"" + creationdate  + "\",\r\n\"type\": \"" + addType  + "\",\r\n\"url\": \"" + url  + "\",\r\n\"ishidden\": \"0\",\r\n\"date\": \"" + $('#date').val() + "\",\r\n\"author\": \"" + $('#postedby').val() + "\",\r\n\"categories\": \"" + cats + "\",\r\n\"tags\": \"" + tags + "\",\r\n\"info\": \"" + resinfo + "\",\r\n\"classif\": \"" + classif + "\",\r\n\"deleted\": \"\",\r\n\"isnew\": \"aaa\",\r\n\"tweet\": " + text + "\r\n},");
        }
        else if (addType == "Y") {
            jsonVal.url = urldirect; 
            jsonVal.author = $('#postedby').val();  
            text = text + "<div class='bottomstrip'><span onclick='javascript: showTooltip(event, this)' class='bottomstripline line1'>" + $("#infoinput").val() + "</span><span onclick='javascript: showTooltip(event, this)' class='bottomstripline line2'>" + urldirect + "</span></div>"; 
            $('#result').val("{\r\n\"id\": \"" + nextid + "\",\r\n\"ishidden\": \"" + jsonVal.ishidden  + "\",\r\n\"creationdate\": \"" + creationdate  + "\",\r\n\"type\": \"" + addType  + "\",\r\n\"url\": \"" + urldirect  + "\",\r\n\"ishidden\": \"0\",\r\n\"date\": \"" + $('#date').val() + "\",\r\n\"author\": \"" + $('#postedby').val() + "\",\r\n\"categories\": \"" + cats + "\",\r\n\"tags\": \"" + tags + "\",\r\n\"info\": \"" + resinfo + "\",\r\n\"classif\": \"" + classif + "\",\r\n\"deleted\": \"\",\r\n\"isnew\": \"aaa\",\r\n\"tweet\": " + text + "\r\n},");
        }
        else {
            jsonVal.url = url; 
            jsonVal.author = $('#postedby').val();  
            text = text + "<div class='bottomstrip'><span onclick='javascript: showTooltip(event, this)' class='bottomstripline line1'>" + $("#infoinput").val() + "</span><span onclick='javascript: showTooltip(event, this)' class='bottomstripline line2'>" + url + "</span></div>"; 
            $('#result').val("{\r\n\"id\": \"" + nextid + "\",\r\n\"ishidden\": \"" + jsonVal.ishidden  + "\",\r\n\"creationdate\": \"" + creationdate  + "\",\r\n\"type\": \"" + addType  + "\",\r\n\"url\": \"" + url  + "\",\r\n\"ishidden\": \"0\",\r\n\"date\": \"" + $('#date').val() + "\",\r\n\"author\": \"" + $('#postedby').val() + "\",\r\n\"categories\": \"" + cats + "\",\r\n\"tags\": \"" + tags + "\",\r\n\"info\": \"" + resinfo + "\",\r\n\"classif\": \"" + classif + "\",\r\n\"deleted\": \"\",\r\n\"isnew\": \"aaa\",\r\n\"tweet\": " + text + "\r\n},");
        }

        jsonVal.tweet = text;
        
        var result = $('#result').val();
        
        $('#linkresult').val(result);
        $("#linkresult").select();
    
        document.execCommand('copy');

        sleep(100);  
        $("#linkresult").blur();
        $("#linkresult").hide();

        $("#recoilback").focus();
        $("#recoilback").click();
        //zzz var mlink = encodeURIComponent(JSON.stringify(result));

        console.log("ddddddddddddd");
        console.log(JSON.stringify(result));
        console.log(jsonVal);
        var mlink = JSON.stringify(result);
        
        createCookie("maxid", nextid + 1);

        createCookie2(nextid,"templink", mlink, jsonVal);
    
        if (showColorsAdv) {
            $("#generateicon").addClass("haschanges");
            if (showColors) {
                $("#settings").addClass("haschanges");
            }
        }  
    
        //} 
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
        getYoutubeData(creationdate, cats, tags, resinfo, classif)
    }
    else {
        getWebsiteData(creationdate, cats, tags, resinfo, classif)
    }

    dblFlag = true;
    dblClickTimeout = setTimeout(function() {     
        createLinkAfterDescription(creationdate, cats, tags, resinfo, classif);
        dblFlag = false;  
    }, 8500);

} 

function createLinkAfterDescription(creationdate, cats, tags, resinfo, classif) {       

    if (resinfo.length == 0)
        resinfo = "No Info About The Link"

    var jsonVal = {};
    jsonVal.id = nextid;        
    jsonVal.info = escape(resinfo);           
    jsonVal.classif = classif;        
    jsonVal.categories = cats;        
    jsonVal.date = $('#date').val();        
    jsonVal.tags = tags;        
    jsonVal.author = $('#postedby').val();        
    jsonVal.deleted = "";   
    jsonVal.creationdate = creationdate; 
    jsonVal.type = addType; 
    jsonVal.url = url; 
    jsonVal.isnew = "yes";
    jsonVal.ishidden = "0";

    if (addType == "Y") {
        jsonVal.url = urldirect; 
        text = text + "<div class='bottomstrip'><span onclick='javascript: showTooltip(event, this)' class='bottomstripline line1'>" + resinfo + "</span><span onclick='javascript: showTooltip(event, this)' class='bottomstripline line2'>" + urldirect + "</span></div>"; 
        $('#result').val("{\r\n\"id\": \"" + nextid + "\",\r\n\"ishidden\": \"" + jsonVal.ishidden  + "\",\r\n\"creationdate\": \"" + creationdate  + "\",\r\n\"type\": \"" + addType  + "\",\r\n\"url\": \"" + urldirect  + "\",\r\n\"ishidden\": \"0\",\r\n\"date\": \"" + $('#date').val() + "\",\r\n\"author\": \"" + $('#postedby').val() + "\",\r\n\"categories\": \"" + cats + "\",\r\n\"tags\": \"" + tags + "\",\r\n\"info\": \"" + resinfo + "\",\r\n\"classif\": \"" + classif + "\",\r\n\"deleted\": \"\",\r\n\"isnew\": \"aaa\",\r\n\"tweet\": " + text + "\r\n},");
    }
    else {
        jsonVal.url = url; 
        text = text + "<div class='bottomstrip'><span onclick='javascript: showTooltip(event, this)' class='bottomstripline line1'>" + resinfo + "</span><span onclick='javascript: showTooltip(event, this)' class='bottomstripline line2'>" + url + "</span></div>"; 
        $('#result').val("{\r\n\"id\": \"" + nextid + "\",\r\n\"ishidden\": \"" + jsonVal.ishidden  + "\",\r\n\"creationdate\": \"" + creationdate  + "\",\r\n\"type\": \"" + addType  + "\",\r\n\"url\": \"" + url  + "\",\r\n\"ishidden\": \"0\",\r\n\"date\": \"" + $('#date').val() + "\",\r\n\"author\": \"" + $('#postedby').val() + "\",\r\n\"categories\": \"" + cats + "\",\r\n\"tags\": \"" + tags + "\",\r\n\"info\": \"" + resinfo + "\",\r\n\"classif\": \"" + classif + "\",\r\n\"deleted\": \"\",\r\n\"isnew\": \"aaa\",\r\n\"tweet\": " + text + "\r\n},");
    }

    jsonVal.tweet = text;

    var result = $('#result').val();

    $('#linkresult').val(result);
    $("#linkresult").select();

    document.execCommand('copy');

    sleep(100);  
    $("#linkresult").blur();
    $("#linkresult").hide();

    $("#recoilback").focus();
    $("#recoilback").click();


    // zzz var mlink = encodeURIComponent(JSON.stringify(result));
    var mlink = JSON.stringify(result);
    
    createCookie("maxid", nextid + 1);

    createCookie2(nextid, "templink", mlink, jsonVal);
}

function getYoutubeData(creationdate, cats, tags, resinfo, classif) {
    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/https://youtube.com/get_video_info?video_id=" + youtubeId,
        success: function (data, status, xhr) {// success callback function
            var result = decodeURIComponent(data); 

            let totalSeconds = parseInt(result.substring(result.indexOf("\",\"lengthSeconds\":\"") + 19, result.indexOf("\",\"keywords\":")).replace(/\+/g, ' '));
            
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = totalSeconds % 60;

            minutes = String(minutes).padStart(2, "0");
            hours = String(hours);
            seconds = String(seconds).padStart(2, "0");
            
            let resf = ""
            if (hours != "0")
                resf = hours + ":";

            resf = resf + minutes + ":" + seconds;

            resinfo = resinfo + resf + "s - " + result.substring(result.indexOf(",\"title\":\"") + 10, result.indexOf("\",\"lengthSeconds\"")).replace(/\+/g, ' ');

            $("#infoinput").val(resinfo);

            if (dblFlag) {
                clearTimeout(dblClickTimeout);
                createLinkAfterDescription(creationdate, cats, tags, resinfo, classif);
            }
        }
    });
}

function getWebsiteData(creationdate, cats, tags, resinfo, classif) {

    $.ajax({
        url: 'https://cors-anywhere.herokuapp.com/' + url
      }).then(function(data) {
        var html = $(data);
        var title = data.substring(data.indexOf("<title") + 7, data.indexOf("</title>"));
        title = title.substring(title.indexOf(">") + 1, data.indexOf("</title>"));
 
        resinfo = title + " - " + getMetaContent(html, 'description');
        $("#infoinput").val(resinfo);

        if (dblFlag) {
            clearTimeout(dblClickTimeout);
            createLinkAfterDescription(creationdate, cats, tags, resinfo, classif);
        }

      });

}

/* function hasAvailableImage(url) {
    $.ajax({
        url: 'https://cors-anywhere.herokuapp.com/https://s.wordpress.com/mshots/v1/' + url,
        type: 'GET'
    }).always(function(jqXHR, textStatus) {
        if (jqXHR.length > 26570 && jqXHR.length < 26594) {
            text = text.replace("class='contentin", "class='contentin error")
        }
    });
} */


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

    openDetailPopup(null, flag);

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

    $( "#tagsul .litags" ).each( function( index, element ){
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