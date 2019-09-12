


var getInformation = function(ismoretweets) {
    
    var path = "./data.json";
    var endIndex = currentIndex + Number($('#recordspersearch').val());
    var objToFocus = -1;
    var ind = 0;
    

    var dofiltertext = $('#filtertext').val().length > 0; 
    var dofilterdate1 = $('#filterdate1').val().length > 0; 
    var dofilterdate2 = $('#filterdate2').val().length > 0; 
    var dofilterid = $('#filterid').val().length > 0; 
    var dofiltertag = $('#filtertag').val().length > 0; 
    var dofilterauthor = $('#filterauthor').val().length > 0;
    var dofiltercat = $('#selectedcat').val().length > 0 && $('#selectedcat').val() != 'all';  

    
    if (!ismoretweets) {
        $('#mask').fadeIn(300);  
        $('#moretweets').hide();
        currentIndex = 0;
        endIndex = currentIndex + 5;

        $("#main").empty();
    }

    currpage = currpage + 1;

    $.getJSON(path, function(data) {
        var total_y = 0;
        var total_t = 0;
        var total_h = 0;

        $.each(data.Tweets, function(key, val) {
            var newtweet = null;
            var dofiltertextfinal = false;
            var dofilterdate1final = false;
            var dofilterdate2final = false;
            var dofilteridfinal = false;
            var dofiltertagfinal = false;
            var dofiltercatfinal = false;
            var dofilterauthorfinal = false;

            dofiltertextfinal = !dofiltertext || (dofiltertext && val.tweet.toLowerCase().includes($('#filtertext').val().toLowerCase()));
            dofilterdate1final = !dofilterdate1 || (dofilterdate1 && val.date >= Number($('#filterdate1').val()));
            dofilterdate2final = !dofilterdate2 || (dofilterdate2 && val.date <= Number($('#filterdate2').val()));
            dofilteridfinal = !dofilterid || (dofilterid && (Number(val.id) == Number($('#filterid').val())));
            dofiltertagfinal = !dofiltertag || (dofiltertag && val.tags.includes($('#filtertag').val()));
            dofiltercatfinal = !dofiltercat || (dofiltercat && val.categories.includes($('#selectedcat').val()));
            dofilterauthorfinal = !dofilterauthor || (dofilterauthor && val.author.toLowerCase().includes($('#filterauthor').val().toLowerCase()));

            if (dofiltertextfinal && dofilterdate1final && dofiltertagfinal && dofilterdate2final && dofilteridfinal
                && dofilterauthorfinal && dofiltercatfinal) {
                ind = ind + 1;
                
                if (val.type == "T") {
                    total_t = total_t + 1;
                }
                else if (val.type == "Y") {
                    total_y = total_y + 1;
                }
                else {
                    total_h = total_h + 1;
                }
            }
        });
        
        var toindex = 0;
        if (currentIndex + Number($('#recordspersearch').val()) < ind)
        toindex = currentIndex + Number($('#recordspersearch').val());
        else 
        toindex = ind;
        if (Number($('#recordspersearch').val()) < ind) {
        
        $('#tweetcount').css('background', '#fff900');
        
        $('#tcnumber').text((currentIndex + 1)  + " to " + toindex + " of " + ind);
        $('#tccateg').text("In " + $('#selectedcattext').val());

        $('#tct').text(total_t);
        $('#tcy').text(total_y);
        $('#tch').text(total_h);

        var aux = ind;

        setTimeout(function(){ 
            if (aux == toindex) { 
                $('#tcnumber').text(aux + " Links");
                $('#tccateg').text("In " + $('#selectedcattext').val());
            }
            else {
                $('#tcnumber').text(toindex + " of " + aux);
                $('#tccateg').text("In " + $('#selectedcattext').val());
            }   
            
            $('#tweetcount').css('background', 'white');
        }, 3000);

        }
        else {  
            $('#tcnumber').text(ind + " Links");
            $('#tccateg').text("In " + $('#selectedcattext').val());
        }

        ind = 0;
        $.each(data.Tweets, function(key, val) {
            var newtweet = null;
            var dofiltertextfinal = false;
            var dofilterdate1final = false;
            var dofilterdate2final = false;
            var dofilteridfinal = false;
            var dofiltertagfinal = false;
            var dofiltercatfinal = false;
            var dofilterauthorfinal = false;
            var recordfromdata = val;
            var processtmp = true;
            do {
                var linktmp = JSON.parse(decodeURIComponent(readCookie(nextid + "templink")));
        
                if (linktmp && linktmp.length > 0) {
                    val = linktmp;
                    nextid = nextid - 1;
                }
                else {
                    processtmp = false;
                }

                if (currentIndex < endIndex && ((ismoretweets && currentIndex == ind) || !ismoretweets)) {
                    dofiltertextfinal = !dofiltertext || (dofiltertext && val.tweet.toLowerCase().includes($('#filtertext').val().toLowerCase()));
                    dofilterdate1final = !dofilterdate1 || (dofilterdate1 && val.date >= Number($('#filterdate1').val()));
                    dofilterdate2final = !dofilterdate2 || (dofilterdate2 && val.date <= Number($('#filterdate2').val()));
                    dofilteridfinal = !dofilterid || (dofilterid && (Number(val.id) == Number($('#filterid').val())));
                    dofiltertagfinal = !dofiltertag || (dofiltertag && val.tags.includes($('#filtertag').val()));
                    dofiltercatfinal = !dofiltercat || (dofiltercat && val.categories.includes($('#selectedcat').val()));
    
                    dofilterauthorfinal = !dofilterauthor || (dofilterauthor && val.author.toLowerCase().includes($('#filterauthor').val().toLowerCase()));
    
                    if (dofiltertextfinal && dofilterdate1final && dofiltertagfinal && dofilterdate2final && dofilteridfinal
                    && dofilterauthorfinal && dofiltercatfinal) {
    
                    var isdeleted = readCookie(val.id + "isdeleted");
                    if (isdeleted && isdeleted.length > 0) {
                        isdeleted = "background-image: linear-gradient(to bottom, #d60000, #ff2e2e)";
                    } 
                    else {
                        isdeleted ="";
                    }
                    var tagchanged = readCookie(val.id + "tagchanged");
                    var catchanged = readCookie(val.id + "catchanged");
                    var tagstyle = "background-image: linear-gradient(to right, #0082cd, #0082cd)";
                    if (tagchanged && tagchanged.length > 0 && catchanged && catchanged.length > 0) {
                        tagstyle = "background-image: linear-gradient(to right, rgb(247, 205, 205), rgb(177, 0, 0), rgb(247, 205, 205))";
                        tagchanged = '<span class="newtag"><b> New tags </b>' + tagchanged + '</span>';
                        catchanged = '<span class="newcat"><b> New categories </b>' + catchanged + '</span>';
                    } 
                    else {
                        if (tagchanged && tagchanged.length > 0) {
                            tagstyle = "background-image: linear-gradient(to right, rgb(177, 0, 0), rgb(247, 205, 205))";
                            tagchanged = '<span class="newtag"><b> New tags </b>' + tagchanged + '</span>';
                            catchanged = '<span class="newcat"></span>';
                        }
                        else if (catchanged && catchanged.length > 0) {
                            tagstyle = "background-image: linear-gradient(to left, rgb(177, 0, 0), rgb(247, 205, 205))";
                            tagchanged = '<span class="newtag"></span>';
                            catchanged = '<span class="newcat"><b> New categories </b>' + catchanged + '</span>';
                        }
                        else {
                            tagchanged = '<span class="newtag"></span>';
                            catchanged = '<span class="newcat"></span>';
                        }
                    }
    
                    var hasinfo = decodeURIComponent(readCookie(val.id + "info"));
                    var textareaExtraStyle ="";
                    var expandclass = "";
                    var displayundo = "";
                    if (hasinfo && hasinfo.length > 0) {
                        if (val.info && val.info.length > 0) {
                            textareaExtraStyle = "border: 2px solid red;";
                            expandclass = "infomodified";
                            val.info = '<div id ="' + val.id + 'oldinfo" class="oldinfo" style="width: 562px;height: 163px;position: relative;left: calc(50% - 282px);z-index: 11;font-size: 14px;background: #0000002e;text-align: left;display: block;border: 2px solid red;top: -12px;">' 
                            + val.info + '</div>';
                        }
                        else {
                            val.info = "";
                        }
                    } 
                    else {
                        displayundo = "display: none;";
                        if (val.info && val.info.length > 0) {
                            hasinfo = decodeURIComponent(val.info);
                        }
                        else {
                            hasinfo = "";
                        }
                        val.info = "";
                    }
    
                    var hasClassif = readCookie(val.id + "classif");
                    var textboxExtraStyle ="";
                    var displayundoclassif = "";
    
                    if (hasClassif && hasClassif.length > 0) {
                        if (val.classif && val.classif.length > 0) {
                            textboxExtraStyle = "border: 2px solid red;";
                            expandclass = "infomodified";
                            val.classif = '<div class="oldclassif" id ="' + val.id + 'oldclassif" style="position: relative;top: -41px;left: -283px;width: 34px; text-align: center; border: 2px solid red;height: 19px; padding-top: 2px; font-size: 14px;">'
                            + val.classif + '</div>';
                        }
                        else {
                            val.classif = "";
                        }
                    } 
                    else {
                        displayundoclassif = "display: none;";
                        if (val.classif && val.classif.length > 0) {
                        hasClassif = val.classif;
                        }
                        else {
                        hasClassif = "";
                        }
                        val.classif = "";
                    }
    
    
                    var tagdispalay = "none";
                    if (val.tags.length > 0) {
                        tagdispalay = val.tags;
                    }
    
    
                    //$('#moretweets').hide();
                    var newtweet = $('#main').append($('<div style="' + isdeleted + '" id="inid" class="tweet"></div>'));
                    var newtweetobj = $('#inid');
                    newtweetobj.append($('<i onclick="javascript: expandCat(this)" id="expand" class="fa fa-angle-double-down ' + expandclass + '"></i>' 
                        + '<div class="categorias">' 
                            + '<i onclick="javascript: removetweet(this,\'' + val.id + '\')" id="removetweet" class="fa fa-remove"></i>' 
                            + '<i tagactual="' + val.tags + '" onclick="javascript: changetag(this, \'' + val.id + '\')" id="changetag" class="fa fa-tags"></i>' 
                            + '<i catactual="' + val.categories + '" onclick="javascript: changecat(this,\'' + val.id + '\')" id="changecat" class="fa fa-bookmark"></i>' 
                            + '<b>Id </b>' + val.id + '<b> Categories </b>' + val.categories + catchanged 
                            + '<div style="width: 0px;height: 0px;position: relative;left: calc(50% - 282px);z-index: 11;display: block;top: 19px;border: 0;">'
                            + '<input  id="' + val.id + 'classif" class="info" type="text" value="' + hasClassif + '"style="width: 25px;height: 19px;position: relative;left: calc(50% - 282px);z-index: 11;display: block;border: 1px solid white;margin-top: 4px;background: #2baffa;text-align: center;' + textboxExtraStyle + '"></input>'
                            + '<i onclick="javascript: saveclassif(this,\'' + val.id + '\')" class="fa fa-check" style="position: relative;cursor: pointer;background: white;color: #0082cd;padding: 3px 6px;font-size: 21px;border-radius: 4px;left: -230px;top: -24px;width: 18px;"></i>'
                            + '<i onclick="javascript: undosaveclassif(this,\'' + val.id + '\')" id ="' + val.id + 'undoclassif" class="fa fa-undo" style="position: relative;cursor: pointer;background: white;color: #0082cd;padding: 3px 6px;font-size: 21px;border-radius: 4px;left: -231px;top: -17px;' + displayundoclassif + '"></i>'
                            + val.classif // vai conter a div com a classificacao antiga - caso exista
                            + '</div>'
                            + '<textarea class="info" style="width: 558px;height: 216px;position: relative;left: calc(50% - 282px);z-index: 11;display: block; margin-top: 4px;' + textareaExtraStyle + '" id="' + val.id + 'info" type="text">' 
                            + hasinfo + '</textarea>' 
                            + '<i onclick="javascript: saveinfo(this,\'' + val.id + '\')" class="fa fa-check" style="position: relative;left: 330px;top: -221px;cursor: pointer;background: white;color: #0082cd;padding: 3px 6px;font-size: 21px;border-radius: 4px;width: 18px;"></i>' 
                            + '<i onclick="javascript: undosaveinfo(this,\'' + val.id + '\')" id ="' + val.id + 'undoinfo" class="fa fa-undo" style="position: relative;cursor: pointer;background: white;color: #0082cd;' + displayundo + 'padding: 3px 6px;font-size: 21px;border-radius: 4px;left: 300px;top: -188px;"></i>' 
                            + val.info // vai conter a div com o texto antigo - caso exista
                        + '</div>'));
                    
                    newtweetobj.append($('<div style="' + tagstyle + '" class="tags"><i onclick="javascript: internallinkcopy(\'' + val.id + '\')" id="internallink" class="fa fa-link"></i><i onclick="javascript: externallinkcopy(\'' + val.url + '\', \'' + val.id + '\')" id="externallink" class="fa fa-external-link"></i><b>Tags </b>' + tagdispalay + tagchanged + '</div>'));
                    
                    if (val.type == "T") {
                        newtweetobj.append($('<div class="innertweet"></div>'));
                        newtweetobj.find('.innertweet').append(val.tweet);
                    }
                    else {
                        newtweetobj.append($(val.tweet));
                    }
        
                    newtweetobj.attr('id', val.id);
    
                    if (objToFocus < 0) {
    
                        $('#tweetcount').fadeIn(800);
    
                        objToFocus = currentIndex;
                        var newtweetobjaction = newtweetobj;
                        $('html, body').animate({
                        scrollTop: $(newtweetobjaction).offset().top - 60 
                        }, 100);
    
                    }
                    currentIndex = currentIndex + 1;
                    }   
                }
                else {
                    if (currentIndex >= endIndex) {
                    $('#moretweets').css('opacity', 0);
                    $('#moretweets').attr('doshow', 'yes');
                    
        /*               setTimeout(function(){
                        $('#mask').fadeOut(300);
                    }, 300);
                    showMessage("Search Results"); */
                    return false;
                    }
                }
                
                setTimeout(function(){
                    $('#mask').fadeOut(300);
                }, 300);
    
                ind = ind + 1;
            }
            while (processtmp);

        });

        if (!ismoretweets) {
            showMessage("Search Results", 2000);
        }
    }); 
}
  
  

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
 
  
var getInformationbyid = function(id) {
    $('#mask').fadeIn(300);  
    var path = "./data.json";
    var objToFocus = -1;

    $.getJSON(path, function(data) {
        $.each(data.Tweets, function(key, val) {
            if (val.id.includes(id)) {
                $('#moretweets').hide();
                var newtweet = $('#main').append($('<div id="inid" class="tweet"></div>'));
                var newtweetobj = $('#inid');
                newtweetobj.append($('<i onclick="javascript: expandCat(this)" id="expand" class="fa fa-angle-double-down"></i><div class="categorias"><b>Id </b>' + val.id + '<b> Categories </b>' + val.categories + '</div>'));
                newtweetobj.append($('<div class="tags"><i onclick="javascript: internallinkcopy(\'' + val.id + '\')" id="internallink" class="fa fa-link"></i><i onclick="javascript: externallinkcopy(\'' + val.url + '\')" id="externallink" class="fa fa-external-link"></i><b>Tags </b>' + val.tags + '</div>'));
                newtweetobj.append($('<div class="innertweet"></div>'));
                newtweetobj.find('.innertweet').append(val.tweet);
                newtweetobj.attr('id', val.id);

                var newtweetobjaction = newtweetobj;
                $('html, body').animate({
                scrollTop: $(newtweetobjaction).offset().top
                }, 700);

                $('#mask').fadeOut(300);

                showMessage("Link Loaded"); 

                return false;
            }
        });
    }); 
}


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
 
  
var countalltweets = function(id) {
    var path = "./data.json";
    var counters = new Map();
    var total = 0;
    var total_y = 0;
    var total_t = 0;
    var total_h = 0;
    $.getJSON(path, function(data) {
        $.each(data.Tweets, function(key, val) {
            var res = val.categories.split(" ");
            for (var i = 0; i < res.length; i++) {
                if (counters.has(val.type + res[i])) {
                    var aux = counters.get(val.type + res[i]);
                    counters.set(val.type + res[i], aux + 1);
                }
                else {
                    counters.set(val.type + res[i], 1);
                }
            }

            if (val.type == "T") {
                total_t = total_t + 1;
            }
            else if (val.type == "Y") {
                total_y = total_y + 1;
            }
            else {
                total_h = total_h + 1;
            }
            total = total + 1;
        });

        $("#all").text(total);
        $("#all").parent().attr("title", "Twitter: " + total_t + " - Youtube: " + total_y + " - Website: " + total_h);


        var toview = 0;
        var toviewT = 0;
        var toviewY = 0;
        var toviewH = 0;
        if (counters.has("Ttoview")) {
            toviewT = counters.get("Ttoview");
            toview = counters.get("Ttoview");
        }
        if (counters.has("Ytoview")) {
            toviewY = counters.get("Ytoview");
            toview = toview + counters.get("Ytoview");
        }
        if (counters.has("Htoview")) {
            toviewH = counters.get("Htoview");
            toview = toview + counters.get("Htoview");
        }

        $("#toview").text(toview);
        $("#toview").parent().attr("title", "Twitter: " + toviewT + " - Youtube: " + toviewY + " - Website: " + toviewH);

        var toread = 0;
        var toreadT = 0;
        var toreadY = 0;
        var toreadH = 0;
        if (counters.has("Ttoread")) {
            toreadT = counters.get("Ttoread");
            toread = counters.get("Ttoread");
        }
        if (counters.has("Ytoread")) {
            toreadY = counters.get("Ytoread");
            toread = toread + counters.get("Ytoread");
        }
        if (counters.has("Htoread")) {
            toreadH = counters.get("Htoread");
            toread = toread + counters.get("Htoread");
        }
        $("#toread").text(toread);
        $("#toread").parent().attr("title", "Twitter: " + toreadT + " - Youtube: " + toreadY + " - Website: " + toreadH);

        var tokeep = 0;
        var tokeepT = 0;
        var tokeepY = 0;
        var tokeepH = 0;
        if (counters.has("Ttokeep")) {
            tokeepT = counters.get("Ttokeep");
            tokeep = counters.get("Ttokeep");
        }
        if (counters.has("Ytokeep")) {
            tokeepY = counters.get("Ytokeep");
            tokeep = tokeep + counters.get("Ytokeep");
        }
        if (counters.has("Htokeep")) {
            tokeepH = counters.get("Htokeep");
            tokeep = tokeep + counters.get("Htokeep");
        }
        $("#tokeep").text(tokeep);
        $("#tokeep").parent().attr("title", "Twitter: " + tokeepT + " - Youtube: " + tokeepY + " - Website: " + tokeepH);

        var imp = 0;
        var impT = 0;
        var impY = 0;
        var impH = 0;
        if (counters.has("Timp")) {
            impT = counters.get("Timp");
            imp = counters.get("Timp");
        }
        if (counters.has("Yimp")) {
            impY = counters.get("Yimp");
            imp = imp + counters.get("Yimp");
        }
        if (counters.has("Himp")) {
            impH = counters.get("Himp");
            imp = imp + counters.get("Himp");
        }
        $("#imp").text(imp);
        $("#imp").parent().attr("title", "Twitter: " + impT + " - Youtube: " + impY + " - Website: " + impH);

        var climate = 0;
        var climateT = 0;
        var climateY = 0;
        var climateH = 0;
        if (counters.has("Tclimate")) {
            climateT = counters.get("Tclimate");
            climate = counters.get("Tclimate");
        }
        if (counters.has("Yclimate")) {
            climateY = counters.get("Yclimate");
            climate = climate + counters.get("Yclimate");
        }
        if (counters.has("Hclimate")) {
            climateH = counters.get("Hclimate");
            climate = climate + counters.get("Hclimate");
        }
        $("#climate").text(climate);
        $("#climate").parent().attr("title", "Twitter: " + climateT + " - Youtube: " + climateY + " - Website: " + climateH);
    }); 
}


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


var togglecriterions = function() {
    if ($('.toptitle').css('display') == 'none') {
        $(".top").css("transition", "all 0.7s");
        $('.top').css('opacity', '0');
        
        setTimeout(function(){
            $('html').find('.top').each( function( index, element ){
                $(this).css('display', 'none');
            });
            
            $(".toptitle").css("transition", "none");
            $('.toptitle').css('opacity', '1');
            $('.toptitle').fadeIn(500);
        }, 400);
    }
    else {
        $(".toptitle").css("transition", "opacity 0.7s");
        $('.toptitle').css('opacity', '0');
        setTimeout(function(){
            $('.toptitle').css('display', 'none');
            $(".top").css("transition", "none");
            $('.top').css('opacity', '1');
            $('html').find('.top').each( function( index, element ){
            $(this).fadeIn(500);
            
            });
            setTimeout(function(){
            $(".top").css("transition", "all 0.7s");
            }, 1400);
        }, 400);
    } 
}   


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function resetFields(flag) {
    $("#main").empty();
    $('#moretweets').hide();
    $('#selectedcat').val('all');
    $('#selectedcattext').val('All Links');
    $('#tweetcount').hide();  
    $('#filtertext').val('');
    $('#filterdate1').val('');
    $('#filterdate2').val('');
    $('#filterid').val('');
    $('#filterauthor').val('');
    $('#filtertag').val('');

    if (flag) 
        showMessage("Search Criterions Cleaned"); 
} 

