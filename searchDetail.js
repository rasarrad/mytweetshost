

function closeSearchPopup(obj) {
    if (obj)
        fixfocus(obj);

    $('body, html').css('overflow-y', 'auto');
    $('#searchpopup').fadeOut(600);
}

function expandsection(obj, table) {
    if ($(obj).hasClass("fa-chevron-down")) {
        $(obj).removeClass("fa-chevron-down");
        $(obj).addClass("fa-chevron-up");
        $(obj).css("top", "auto");
        $(obj).css("bottom", "4px");
        $("#" + table).css("max-height", "fit-content");
    }   
    else {
        $(obj).removeClass("fa-chevron-up");
        $(obj).addClass("fa-chevron-down");  
        
        if ($('body').hasClass('big')) {
            $("#" + table).css("max-height", $("#" + table).attr("cmaxheightbig"));
            $(obj).css("top", "-63px");
        }
        else {
            $("#" + table).css("max-height", $("#" + table).attr("cmaxheight"));
            $(obj).css("top", "-59px");
        }
        top: ;
        bottom: auto;
        $(obj).css("bottom", "auto");
    } 

    if (table == "searchtags") {
        //updateTopPosition("searchpopup"); 
    }
    else {
        updateTopPosition("linkChange"); 
    }
}


function changecriteria(e, obj, tableparam) {
    var table = null;
    if (obj) {
        table = $(obj).parent().parent();
    }
    else {
        table = $("#" + tableparam);
    }

    var maindiv = table.parent();
    
    if (e)
        e.stopPropagation();

    var setHeight = "18px";

    if ($('body').hasClass('big'))
        setHeight = "29px";

    if (table.css('max-height') == setHeight) {
        if (obj) {
            var hasExpanded = false;
            $('#searchpopup').find("table:not(.buttonstable)").each( function( index, element ) {
                var othertable = $(element);
                
                othertable.css('transition', 'max-height 0.01s');
                othertable.css('max-height', setHeight);
                othertable.find('.sectionedittd i').addClass('fa-angle-down').removeClass('fa-angle-up').css("top", "0px");
                othertable.find('td.el').addClass('ellipsis');
            });
            
            table.css('transition', 'max-height 1s');
    
            if (table.attr("cmaxheight")) {
                if ($('body').hasClass('big')) {
                    table.css('max-height', table.attr("cmaxheightbig"));
                }
                else {
                    table.css('max-height', table.attr("cmaxheight"));
                }
            }   
            else {
                table.css('max-height', "fit-content");
            }
    
            table.find('.sectionedittd i').addClass('fa-angle-up').removeClass('fa-angle-down').css("top", "-6px");
    
            table.find('td.el').removeClass('ellipsis');
            setTimeout(function() { 
                var offset = 0;
                if (table.attr("cheight") && table.attr("cheight").trim() != "")
                    offset = Number(table.attr("cheight"));   
                $("#sear").css("top", (table.offset().top - 69 + offset) + "px");
            }, 100);
        }
    }
    else {
        table.css('transition', 'max-height 1s');
        table.css('max-height', setHeight);
        table.find('.sectionedittd i').addClass('fa-angle-down').removeClass('fa-angle-up').css("top", "0px");
        table.find('td.el').addClass('ellipsis');
        setTimeout(function() { 
            $("#sear").css("top", "calc(100% - 53px)");
        }, 100);
    }
    //updateTopPosition("searchpopup"); 
}

function filtertagOnChange(obj) {
    var currenttagdisplay = $('.currenttagsearch'); 
        
    if ($(obj).val().trim() == "") {
        currenttagdisplay.html("all");
        currenttagdisplay.addClass("emptyvalue");
        $("#searchtags").addClass("emptyvalue");
        $("#searchtags").removeClass("withvalue");
    }
    else {
        currenttagdisplay.html($(obj).val().trim() + "<i onclick='clearcriterion(event,this, \"filtertag\", \"searchtags\")' class='fa fa-times-circle'></i>");
        currenttagdisplay.removeClass("emptyvalue");
        $("#searchtags").removeClass("emptyvalue");
        $("#searchtags").addClass("withvalue");
    }

    removeNonExistentLi("tagsearchul", "filtertag");

    createNonExistentLi("tagsearchul", "filtertag");
}

function filterinfoOnChange(obj) {
    var currentinfosearchdisplay = $('.currentinfosearch'); 
    console.log("1 - " + $(obj).val().trim())    
    if ($(obj).val().trim() == "") {
        currentinfosearchdisplay.html("all");
        currentinfosearchdisplay.addClass("emptyvalue");
        $("#searchinfo").addClass("emptyvalue");
        $("#searchinfo").removeClass("withvalue");
    }
    else {
        currentinfosearchdisplay.html($(obj).val().trim() + "<i onclick='clearcriterion(event,this, \"filtertext\", \"searchinfo\")' class='fa fa-times-circle'></i>");
        currentinfosearchdisplay.removeClass("emptyvalue");
        $("#searchinfo").removeClass("emptyvalue");
        $("#searchinfo").addClass("withvalue");
    }
}

function filterauthorOnChange(obj) {
    var currentinfosearchdisplay = $('.currentauthorsearch'); 

    if ($(obj).val().trim() == "") {
        currentinfosearchdisplay.html("all");
        currentinfosearchdisplay.addClass("emptyvalue");
        $("#searchinfo").addClass("emptyvalue");
        $("#searchinfo").removeClass("withvalue");
    }
    else {
        currentinfosearchdisplay.html($(obj).val().trim() + "<i onclick='clearcriterion(event,this, \"filterauthor\", \"searchauthor\")' class='fa fa-times-circle'></i>");
        currentinfosearchdisplay.removeClass("emptyvalue");
        $("#searchinfo").removeClass("emptyvalue");
        $("#searchinfo").addClass("withvalue"); 
    }
}


function formatDate(date) {
    return pad(date.getDate(), 2) + "/" + pad((date.getMonth() + 1), 2) + "/" + date.getFullYear();
}

function formatDateFromNum(date) {
    return pad(date.substring(6,8), 2) + "/" + pad(date.substring(4,6), 2) + "/" + date.substring(0,4);
}

function formatNumDate(date) {
    return date.getFullYear() + "" + pad((date.getMonth() + 1), 2) + pad(date.getDate(), 2);
}
function closeCalendarPopup(e) {
    if (e)
        e.stopPropagation();
    
    $('body, html').css('overflow-y', 'auto');

    var style = window.getComputedStyle(body, null);
    switch($('#calendardiv').attr("targetObj")) {
        case "filterdate1":
        case "filterdate2":
            $('#searchpopup').css("background", style.getPropertyValue('--soft-transp-color'));
            break; 
        case "linkdate":
        case "linkcreatedate":    
            $('#linkChange').css("background", style.getPropertyValue('--soft-transp-color'));
            break;     
    }

    $('#calendardiv').fadeOut(600);
}

function openCalendar(targetObj, date) {
    $('body, html').css('overflow-y', 'hidden');

    var currDate = null;

    if (date)
        currDate = date;
    else
        currDate = new Date();

    calendar = new VanillaCalendar({
        selector: "#myCalendar",
        //months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        //shortWeekday: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
        date: currDate,
        onSelect: (data, elem) => {
            var date = new Date("" + data.date);
            calendarChanged(date);
        }
    });

    $('#calendardiv').attr("targetObj", targetObj);

    $('#calendardiv').fadeIn(600);
}

function filterdate1change() {
    updatedatedisplay();

    $( "#filterdate1display" ).blur();
    closeCalendarPopup();
}    

function filterdate2change() {
    updatedatedisplay();

    $( "#filterdate2display" ).blur();
    closeCalendarPopup();
} 

function cleandate1() {
    $('#filterdate1').val("");
    $('#filterdate1display').val("");
    filterdate1date = new Date();

    updatedatedisplay();
} 
function cleandate2() {
    $('#filterdate2').val("");
    $('#filterdate2display').val("");
    filterdate2date = new Date();
    
    updatedatedisplay();
} 
function updatedatedisplay() {
    $( ".currentdate" ).removeClass("emptyvalue");
    $("#searchdate").removeClass("emptyvalue");
    $("#searchdate").addClass("withvalue");
    $( ".currentdate" ).css("font-size", "fff");
    if ($( "#filterdate1display" ).val().trim().length > 0) {
        if ($( "#filterdate2display" ).val().trim().length > 0) {
            if ($( "#filterdate2display" ).val().trim() == $( "#filterdate1display" ).val().trim()) {
                $( ".currentdate" ).html("On " + $( "#filterdate1display" ).val() + "<i onclick='clearcriterion(event,this, \"filterdate1\", \"searchdate\")' class='fa fa-times-circle'></i>");
            }
            else {
                $( ".currentdate" ).css("font-size", "13px");
                $( ".currentdate" ).html("Between " + $( "#filterdate1display" ).val() + " & " + $( "#filterdate2display" ).val() + "<i onclick='clearcriterion(event,this, \"filterdate1\", \"searchdate\")' class='fa fa-times-circle'></i>");
            }
            $( "#filterdate1clean" ).show();
            $( "#filterdate2clean" ).show();
        }
        else {
            $( "#filterdate1clean" ).show();
            $( "#filterdate2clean" ).hide();
            $( ".currentdate" ).html("After " + $( "#filterdate1display" ).val() + "<i onclick='clearcriterion(event,this, \"filterdate1\", \"searchdate\")' class='fa fa-times-circle'></i>");
        }
    }
    else if ($( "#filterdate2display" ).val().trim().length > 0) {
        $( "#filterdate1clean" ).hide();
        $( "#filterdate2clean" ).show();
        $( ".currentdate" ).html("Before " + $( "#filterdate2display" ).val() + "<i onclick='clearcriterion(event,this, \"filterdate1\", \"searchdate\")' class='fa fa-times-circle'></i>");
    }
    else {
        $( "#filterdate1clean" ).hide();
        $( "#filterdate2clean" ).hide();
        $( ".currentdate" ).addClass("emptyvalue");
        $("#searchdate").addClass("emptyvalue");
        $("#searchdate").removeClass("withvalue");

        $( ".currentdate" ).html("all");
    }

   
} 

function calendarChanged(date) {
    $('body, html').css('overflow-y', 'hidden');
    var style = window.getComputedStyle(body, null);
    switch($('#calendardiv').attr("targetObj")) {
        case "filterdate1":
            $('#filterdate1display').val(formatDate(date));
            filterdate1date = date;
            $('#filterdate1').val(formatNumDate(date));
            $('#filterdate1').trigger("change");
            $('#searchpopup').css("background", style.getPropertyValue('--soft-transp-color'));
            break; 
        case "filterdate2":
            $('#filterdate2display').val(formatDate(date));
            filterdate2date = date;
            $('#filterdate2').val(formatNumDate(date));
            $('#filterdate2').trigger("change");
            $('#searchpopup').css("background", style.getPropertyValue('--soft-transp-color'));
            break; 
        case "linkdate":
            if ($('#linkChange').attr("cid") != "new") {
                var otherObj = $("#linkChange").find(".date");
                
                if (date) {
                    otherObj.html(formatDate(date));
                    $("#linkChange").find(".dateinput").val(formatNumDate(date));
                    createCookie($('#linkChange').attr("cid") + "datechanged", formatNumDate(date));
                }
                else {
                    otherObj.html("--"); 
                }
            }
            closeCalendarPopup();
            break;    

        case "linkcreatedate":            
            if (date) {
                $("#linkChange").find(".dateinput").val(formatNumDate(date));
                $("#linkChange").find(".datetoshow").val(formatDate(date));
            }

            closeCalendarPopup();

            break;             
    }
}          






function clearcriterion(e, obj, affectedobj, affectedtable) {
    switch(affectedobj) {
        case "selectedtype":
            $('#' + affectedobj).val("all");
            $( ".iconul li" ).each( function( index, element ){
                $(this).removeClass("selected");
            });
            $('.currenttype').html("all");
            $('#alltypesoption').addClass("selected");
            $('.currenttype').addClass("emptyvalue");
            $("#searchtypes").addClass("emptyvalue");
            $("#searchtypes").removeClass("withvalue");
            break;

        case "selectedclassif":
            $('#classifsearchul').find(".litags").each( function( index, element ) {
                $(element).removeClass("selectedtag");
            });
    
            $(".currentsearchclassif").html("all");
            $(".currentsearchclassif").addClass("emptyvalue");
            $("#searchclassif").addClass("emptyvalue");
            $("#searchclassif").removeClass("withvalue");
            break;

        case "filterdate1":
            $('#filterdate1').val("");
            $('#filterdate2').val("");
            $('#filterdate1display').val("");
            $('#filterdate2display').val("");
            filterdate1date = new Date();
            filterdate2date = new Date();
            $('.' + affectedobj).addClass("emptyvalue");
            $("#" + affectedtable).addClass("emptyvalue");
            $("#" + affectedtable).removeClass("withvalue");
    
            $('#filterdate1').trigger("change");
            break;

        default:
            $('.' + affectedobj).addClass("emptyvalue");
            $("#" + affectedtable).addClass("emptyvalue");
            $("#" + affectedtable).removeClass("withvalue");
    
            $('#' + affectedobj).val("");
            $('#' + affectedobj).trigger("change");
            break; 
    }

    changecriteria(null,null, affectedtable);

    if (e)
        e.stopPropagation();
}

function changesearchtype(e, obj, code, desc) {
    $('#selectedtype').val(code);

    var currenttagdisplay = $('.currenttype'); 
    
    $( ".iconul li" ).each( function( index, element ){
        $(element).removeClass("selected");
    });

    $(obj).addClass("selected");

    if (code == "all") {
        currenttagdisplay.html("all");
        currenttagdisplay.addClass("emptyvalue");
        $("#searchtypes").addClass("emptyvalue");
        $("#searchtypes").removeClass("withvalue");
    }
    else {
        currenttagdisplay.html(desc + "<i onclick='clearcriterion(event,this, \"selectedtype\", \"searchtypes\")' class='fa fa-times-circle'></i>");
        currenttagdisplay.removeClass("emptyvalue");
        $("#searchtypes").removeClass("emptyvalue");
        $("#searchtypes").addClass("withvalue");
    }
    e.stopPropagation();
}

var openSearchPopup = function(jsonobj) 
{
    $('body, html').css('overflow-y', 'hidden');
    $('#searchpopup').css('display', 'flex');  
    
    $('#titlesearch').html("(" + $('#selectedcattext').val() + ")");

    updateSearchTablesHeight();

    //updateTopPosition("searchpopup"); 

    $('#searchpopup').fadeIn(); 
} 

function updateSearchTablesHeight() {
    var setHeight = "18px";
    if ($('body').hasClass('big'))
        setHeight = "29px";

    $('#searchpopup').find("table:not(.buttonstable)").each( function( index, element ) {
        var table = $(element);
        table.css('transition', 'max-height .01s');
        table.css('max-height', setHeight);
        table.find('.sectionedittd i').addClass('fa-angle-down').removeClass('fa-angle-up').show();
        table.find('td.el').addClass('ellipsis');
    });
} 

function clickSearchLiClassif(e, obj) {
    e.stopPropagation();

    $('#classifsearchul').find(".litags").each( function( index, element ) {
        $(element).removeClass("selectedtag");
    });

    $('#selectedclassif').val($(obj).html().trim());
    $(obj).addClass("selectedtag");

    var desc = "Greater than ";

    if ($("#classifselect").val() == "=") {
        desc = "Equal to ";
    }
    else if ($("#classifselect").val() == "<") {
        desc = "Less than ";
    }

    $(".currentsearchclassif").html(desc + $(obj).html().trim() + "<i onclick='clearcriterion(event,this, \"selectedclassif\", \"searchclassif\")' class='fa fa-times-circle'></i>");
    $(".currentsearchclassif").removeClass("emptyvalue");
    $("#searchclassif").removeClass("emptyvalue");
    $("#searchclassif").addClass("withvalue");
}

var getInformation = function(ismoretweets, wasfiltered) {

    closeSearchPopup();

    if (wasfiltered == 1) {
        $('#countfilter').show();
    }
    else if (wasfiltered == 2) {
        $('#countfilter').hide();
    }

    var path = "./data.json";
    var endIndex = currentIndex + Number($('#recordspersearch').val());
    var objToFocus = -1;
    var ind = 0;
    var hasFinished = false;

    var dofiltertext = $('#filtertext').val().trim().length > 0; 
    var dofilterdate1 = $('#filterdate1').val().trim().length > 0; 
    var dofilterdate2 = $('#filterdate2').val().trim().length > 0; 
    var dofiltertag = $('#filtertag').val().trim().length > 0; 
    var dofilterauthor = $('#filterauthor').val().trim().length > 0;
    var dofiltercat = $('#selectedcat').val().length > 0 && $('#selectedcat').val() != 'all';  
    var dofiltertype = $('#selectedtype').val().trim() != "all"; 
    var dofilterclassif = $('#selectedclassif').val().trim() != "all"; 

    if (!ismoretweets) {
        $('#mask').fadeIn(300);  
        $('#moretweets').hide();
        currentIndex = 0;
        endIndex = currentIndex + Number($('#recordspersearch').val());
        processedCount = 0;
        totalLinkss = 0;
        total_yy = 0;
        total_tt = 0;
        total_hh = 0;
        totalGlobalLinks = 0;
        $("#main").empty();
    }

    currpage = currpage + 1;
    nextid = parseInt(readCookie("maxid")) - 1;
    if (!nextid)
        nextid = parseInt($("#maxid").val()) - 1;

    $.getJSON(path, function(data) {
        var processtmp = true;

        if (!ismoretweets) {
            $.each(data.Tweets, function(key, val) {
                var newtweet = null;
                var dofiltertextfinal = false;
                var dofilterdate1final = false;
                var dofilterdate2final = false;
                var dofiltertagfinal = false;
                var dofiltercatfinal = false;
                var dofilterauthorfinal = false;
                var recordfromdata = val;
                var linkcontent = null;
                var dofiltertypefinal = false;
                var dofilterclassiffinal = false;

                do {
                    totalGlobalLinks = totalGlobalLinks + 1;
                    if (processtmp) {
                        linkcontent = readCookie(nextid + "templink");
                        if (linkcontent && linkcontent.length > 0) {
                            var linktmp = decodeURIComponent(linkcontent);
                            linktmp = linktmp.substring(1, linktmp.length - 2).replace(/(\\n)/gm, ""); 
                            linktmp = linktmp.replace(/(\\)/gm, ""); 
                            linktmp = JSON.parse(linktmp);
        
                            val = linktmp;
                            nextid = nextid - 1;
                        }
                        else {
                            val = recordfromdata;
                            processtmp = false;
                        }
                    }
                    else {
                        val = recordfromdata;
                    }
                    
                    dofiltertextfinal = !dofiltertext || searchInfo(val.info.toLowerCase(), val.tweet.toLowerCase(), $('#filtertag').val().toLowerCase());
                    dofilterdate1final = !dofilterdate1 || val.date >= Number($('#filterdate1').val());
                    dofilterdate2final = !dofilterdate2 || val.date <= Number($('#filterdate2').val());
                    dofiltertagfinal = !dofiltertag || searchTags(val.tags.toLowerCase(), $('#filtertag').val().toLowerCase());
                    dofiltercatfinal = !dofiltercat || val.categories.includes($('#selectedcat').val());
                    dofilterauthorfinal = !dofilterauthor || val.author.toLowerCase().includes($('#filterauthor').val().toLowerCase());
                    dofiltertypefinal = !dofiltertype || val.type == $('#selectedtype').val();
                    dofilterclassiffinal = !dofilterclassif || searchClassif(val.classif, $('#selectedclassif').val(), $('#selectedclassifcombo').val());
                    
                    if (dofiltertextfinal && dofilterdate1final && dofiltertagfinal && dofilterdate2final
                        && dofilterauthorfinal && dofiltercatfinal && dofiltertypefinal && dofilterclassiffinal) {
      
                        ind = ind + 1;
    
                        if (val.type == "T") {
                            total_tt = total_tt + 1;
                        }
                        else if (val.type == "Y") {
                            total_yy = total_yy + 1;
                        }
                        else {
                            total_hh = total_hh + 1;
                        }
                    }
                }
                while (processtmp);
            });     
            totalLinkss = ind; 
        }


        var toindex = 0;
        if (currentIndex + Number($('#recordspersearch').val()) < totalLinkss)
            toindex = currentIndex + Number($('#recordspersearch').val());
        else 
            toindex = totalLinkss;

        ind = 0;
        nextid = parseInt(readCookie("maxid")) - 1;
        if (!nextid)
            nextid = parseInt($("#maxid").val()) - 1;

        processtmp = true;

        $.each(data.Tweets, function(key, val) {
            var newtweet = null;
            var dofiltertextfinal = false;
            var dofilterdate1final = false;
            var dofilterdate2final = false;
            var dofiltertagfinal = false;
            var dofiltercatfinal = false;
            var dofilterauthorfinal = false;
            var dofiltertypefinal = false;
            var dofilterclassiffinal = false;
            recordfromdata = val;
            
            linkcontent = null;

            do {


                if (processtmp) {
                    linkcontent = readCookie(nextid + "templink");
                    if (linkcontent && linkcontent.length > 0) {
                        var linktmp = decodeURIComponent(linkcontent);
                        linktmp = linktmp.substring(1, linktmp.length - 2).replace(/(\\n)/gm, ""); 
                        linktmp = linktmp.replace(/(\\)/gm, ""); 
                        linktmp = JSON.parse(linktmp);
    
                        val = linktmp;
                        nextid = nextid - 1;
                    }
                    else {
                        val = recordfromdata;
                        processtmp = false;
                    }
                }
                else {
                    val = recordfromdata;
                }
                
                ind = ind + 1;
                if (ind < processedCount ) {
                    return;

                }

                if (currentIndex < endIndex) {
                    dofiltertextfinal = !dofiltertext || searchInfo(val.info.toLowerCase(), val.tweet.toLowerCase(), $('#filtertag').val().toLowerCase());
                    dofilterdate1final = !dofilterdate1 || val.date >= Number($('#filterdate1').val());
                    dofilterdate2final = !dofilterdate2 || val.date <= Number($('#filterdate2').val());
                    dofiltertagfinal = !dofiltertag || searchTags(val.tags.toLowerCase(), $('#filtertag').val().toLowerCase());
                    dofiltercatfinal = !dofiltercat || val.categories.includes($('#selectedcat').val());
                    dofilterauthorfinal = !dofilterauthor || val.author.toLowerCase().includes($('#filterauthor').val().toLowerCase());
                    dofiltertypefinal = !dofiltertype || val.type == $('#selectedtype').val();
                    dofilterclassiffinal = !dofilterclassif || searchClassif(val.classif, $('#selectedclassif').val(), $('#selectedclassifcombo').val());
                    
                    if (dofiltertextfinal && dofilterdate1final && dofiltertagfinal && dofilterdate2final
                        && dofilterauthorfinal && dofiltercatfinal && dofiltertypefinal && dofilterclassiffinal) {
                        
                        var tagdispalay = " --";
                        var expandclass = "";
                        var color = "";

                        var isdeleted = readCookie(val.id + "isdeleted");
                        if (isdeleted && isdeleted.length > 0) { // ID DELETED
                            expandclass = hideMode ? "" : "isdeleted";    
                            color = "color: red;";
                        } 
                        else {
                            if (linkcontent && linkcontent.length > 0) { // IS NEW
                                expandclass = hideMode ? "" : "isnew";  
                                color = "color: #00dc00;";
    
                                var tagchanged = readCookie(val.id + "tagchanged");
        
                                if (tagchanged && tagchanged.length > 0 && tagchanged != 'null' && tagchanged != 'undefined') {
                                    tagdispalay = '<span class="newtag">' + tagchanged + '</span>';
                                    tagdispalay = '<span>' + parseTags(tagchanged) + '</span>';
                                } 
                                else {
                                    if (val.tags.length > 0 && val.tags != 'undefined') {
                                        tagdispalay = parseTags(val.tags);
                                    }
                                }
                            }
                            else {
                                var hasChanges = readCookie(val.id + "haschanges");
                                if (hasChanges && hasChanges.length > 0) { // HAS CHAMGES
                                    color = "color: #f18618;";
                                    if (expandclass == "isnew")
                                        expandclass = hideMode ? "" : "isnewmodified";  
                                    else 
                                        expandclass = hideMode ? "" : "ismodified";  
    
                                    var tagchanged = readCookie(val.id + "tagchanged");
        
                                    if (tagchanged && tagchanged.length > 0 && tagchanged != 'null' && tagchanged != 'undefined') {
                                        tagdispalay = '<span class="newtag">' + tagchanged + '</span>';
                                        tagdispalay = '<span>' + parseTags(tagchanged) + '</span>';
                                    } 
                                    else {
                                        if (val.tags.length > 0 && val.tags != 'undefined') {
                                            tagdispalay = parseTags(val.tags);
                                        }
                                    }
                                } 
                                else if (val.tags.length > 0 && val.tags != 'undefined') {
                                    tagdispalay = parseTags(val.tags);
                                }
                            }
                        }

                        var xclass = "";
                        var typefa = "twitter"
                        if (val.type == "H") {
                            xclass = " html";
                            typefa = "internet-explorer"
                        }
                        else if (val.type == "Y") {
                            xclass = " yt";
                            typefa = "youtube-play"
                        }

                        var newtweet = $('#main').append($('<div id="inid" class="tweet' + xclass + '"></div>'));
                        var newtweetobj = $('#inid');

                        newtweetobj.append($('<div style="z-index: 0;background: var(--soft-color);height: 39px;" class="innermask"><i class="fa fa-circle-o-notch fa-spin" style="display:none;"></i></div><div class="gradiantback"></div><div class="bottomgradiantback"></div><i onclick="javascript: expandCat(this)" id="expand" class="clicable fa fa-edit ' + expandclass + '"></i><i class="linkbar clicable fa fa-' + typefa + '" style="' + color + '" onclick="javascript: externallinkopen(this, \'' + val.url + '\', \'' + val.id + '\')"></i>'));
                        
                        newtweetobj.append($('<div class="tags"><i onclick="javascript: expandscreen(this)" class="fa fa-square-o"></i><b>Tags: </b>' + tagdispalay + '</div>'));
                        
                        if (val.type == "T") {
                            newtweetobj.append($('<div class="innertweet"></div>'));
                            newtweetobj.find('.innertweet').append(val.tweet);
                        }
                        else {
                            newtweetobj.append($(val.tweet));
                        }
            
                        newtweetobj.attr('id', val.id);
        
                        if (objToFocus < 0) {
        
                            objToFocus = currentIndex;
                            var newtweetobjaction = newtweetobj;
/*                             $('html, body').animate({
                                scrollTop: $(newtweetobjaction).offset().top - 60
                            }, 100); */
        
                        }
                        currentIndex = currentIndex + 1;
                    }   
                }
                else {
                    if (currentIndex >= endIndex) {

                        $('#moretweets').attr('doshow', 'yes');
                   
                        
            /*               setTimeout(function(){
                            $('#mask').fadeOut(300);
                        }, 300);
                        showMessage("Search Results"); */

                        if (Number($('#recordspersearch').val()) < ind) {
            
                            //$('#tweetcount').css('background', '#fff900');
                            
                            //$('#tcnumber').text((currentIndex + 1)  + " to " + toindex + " of " + ind);
                            $('#tcnumber').text(toindex + " of " + totalLinkss + " Links");
                            $('#tccateg').text("In " + $('#selectedcattext').val());
                
                            var aux = ind;
                
                            setTimeout(function(){ 
                                if (aux == toindex) { 
                                    $('#tcnumber').text(aux + " of " + totalLinkss + " Links");
                                    $('#tccateg').text("In " + $('#selectedcattext').val());
                                }
                                else {
                                    //$('#tcnumber').text(toindex + " of " + aux);
                                    $('#tcnumber').text(toindex + " of " + totalLinkss + " Links");
                                    $('#tccateg').text("In " + $('#selectedcattext').val());
                                }   
                                
                                //$('#tweetcount').css('background', 'white');
                            }, 3000);
                
                        }
                        else {  
                            $('#tcnumber').text(ind + " of " + totalLinkss + " Links");
                            $('#tccateg').text("In " + $('#selectedcattext').val());
                        }
                
                        $('#tct').text(total_tt);
                        $('#tcy').text(total_yy);
                        $('#tch').text(total_hh);

                        setTimeout(function() { 
                            if (!hasFinished) {
                                hasFinished = true;
                                customizeTweets(2);
                            }
                          }, 1000);
                        

                        return false;
                    }
                }

            }
            while (processtmp);

        });
        processedCount = ind;
        if (Number($('#recordspersearch').val()) < ind) {
        
            //$('#tweetcount').css('background', '#fff900');
            
            //$('#tcnumber').text((currentIndex + 1)  + " to " + toindex + " of " + ind);
            $('#tcnumber').text(toindex + " of " + totalLinkss + " Links");
            $('#tccateg').text("In " + $('#selectedcattext').val());

            var aux = ind;

            setTimeout(function(){ 
                if (aux == toindex) { 
                    $('#tcnumber').text(aux + " of " + totalLinkss + " Links");
                    $('#tccateg').text("In " + $('#selectedcattext').val());
                }
                else {
                    //$('#tcnumber').text(toindex + " of " + aux);
                    $('#tcnumber').text(toindex + " of " + totalLinkss + " Links");
                    $('#tccateg').text("In " + $('#selectedcattext').val());
                }   
                
                //$('#tweetcount').css('background', 'white');
            }, 3000);

        }
        else {  
            $('#tcnumber').text(ind + " of " + totalLinkss + " Links");
            $('#tccateg').text("In " + $('#selectedcattext').val());
        }

        $('#tct').text(total_tt);
        $('#tcy').text(total_yy);
        $('#tch').text(total_hh);

        setTimeout(function() { 
            if (!hasFinished) {
                
                hasFinished = true;
                customizeTweets(1);
            }
        }, 1000);

        if (!ismoretweets) {
            if (totalLinkss > 0) {
                //if (wasfiltered != 2)
                    //showMessage("Search Results", 2000);
            }
            else {
                $('#mask').fadeOut(600);  
                showMessage("No Links Found", 2000);
            }
        }
    }); 
}
  

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


var getInformationOld = function(ismoretweets) {
    
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

    $.getJSON(path, function(data) 
    {
    $.each(data.Tweets, function(key, val) 
        {
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
        }
        });
        
        var toindex = 0;
        if (currentIndex + Number($('#recordspersearch').val()) < ind)
            toindex = currentIndex + Number($('#recordspersearch').val());
        else 
            toindex = ind;

        if (Number($('#recordspersearch').val()) < ind) {
            $('#tweetcount').css('background', '#fff900');
            $('#tweetcount').html((currentIndex + 1)  + " to " + toindex + " of " + ind + "<br>In " + $('#selectedcattext').val());    
            var aux = ind;

            setTimeout(function(){ 
                if (aux == toindex) { 
                $('#tweetcount').html(aux + " Tweets<br>In " + $('#selectedcattext').val());  
                }
                else {
                $('#tweetcount').html(toindex + " of " + aux + "<br>In " + $('#selectedcattext').val());  
                }   
                
                $('#tweetcount').css('background', 'white');
            }, 3000);

        }
        else {
            $('#tweetcount').html(ind + " Tweets<br>In " + $('#selectedcattext').val());  
        }

        ind = 0;
        $.each(data.Tweets, function(key, val) 
        {
        var newtweet = null;
        var dofiltertextfinal = false;
        var dofilterdate1final = false;
        var dofilterdate2final = false;
        var dofilteridfinal = false;
        var dofiltertagfinal = false;
        var dofiltercatfinal = false;
        var dofilterauthorfinal = false;

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


            var tagdispalay = " --";
            if (val.tags.length > 0) {
                tagdispalay = val.tags;
            }


            //$('#moretweets').hide();
            var newtweet = $('#main').append($('<div style="' + isdeleted + '" id="inid" class="tweet"></div>'));
            var newtweetobj = $('#inid');
            newtweetobj.append($('<i onclick="javascript: expandCat(this)" id="expand" class="fa fa-edit ' + expandclass + '"></i>' 
                + '<div class="categorias">' 
                    + '<i onclick="javascript: removetweet(this,\'' + val.id + '\')" id="removetweet" class="fa fa-remove"></i>' 
                    + '<i tagactual="' + val.tags + '" onclick="javascript: changetag(this, \'' + val.id + '\')" id="changetag" class="fa fa-tags"></i>' 
                    + '<i catactual="' + val.categories + '" onclick="javascript: changecat(this,\'' + val.id + '\')" id="changecat" class="fa fa-bookmark"></i>' 
                    + '<b>Id </b>' + val.id + '<b> Categories </b>' + val.categories + catchanged 
                    + '<div style="width: 0px;height: 0px;position: relative;left: calc(50% - 282px);z-index: 11;display: block;top: 19px;border: 0;">'
                    + '<input  id="' + val.id + 'classif" class="info" type="text" value="' + hasClassif + '"style="width: 25px;height: 19px;position: relative;left: calc(50% - 90px);z-index: 11;display: block;border: 1px solid white;margin-top: 4px;background: #2baffa;text-align: center;' + textboxExtraStyle + '"></input>'
                    + '<i onclick="javascript: saveclassif(this,\'' + val.id + '\')" class="fa fa-check" style="position: relative;cursor: pointer;background: white;color: #0082cd;padding: 3px 6px;font-size: 21px;border-radius: 4px;left: -46px;top: -24px;width: 18px;"></i>'
                    + '<i onclick="javascript: undosaveclassif(this,\'' + val.id + '\')" id ="' + val.id + 'undoclassif" class="fa fa-undo" style="position: relative;cursor: pointer;background: white;color: #0082cd;padding: 3px 6px;font-size: 21px;border-radius: 4px;left: -231px;top: -17px;' + displayundoclassif + '"></i>'
                    + val.classif // vai conter a div com a classificacao antiga - caso exista
                    + '</div>'
                    + '<textarea class="info" style="width: 558px;height: 216px;position: relative;left: calc(50% - 282px);z-index: 11;display: block; margin-top: 4px;' + textareaExtraStyle + '" id="' + val.id + 'info" type="text">' 
                    + hasinfo + '</textarea>' 
                    + '<i onclick="javascript: saveinfo(this,\'' + val.id + '\')" class="fa fa-check" style="position: relative;left: 330px;top: -221px;cursor: pointer;background: white;color: #0082cd;padding: 3px 6px;font-size: 21px;border-radius: 4px;width: 18px;"></i>' 
                    + '<i onclick="javascript: undosaveinfo(this,\'' + val.id + '\')" id ="' + val.id + 'undoinfo" class="fa fa-undo" style="position: relative;cursor: pointer;background: white;color: #0082cd;' + displayundo + 'padding: 3px 6px;font-size: 21px;border-radius: 4px;left: 300px;top: -188px;"></i>' 
                    + val.info // vai conter a div com o texto antigo - caso exista
                + '</div>'));
            
            newtweetobj.append($('<div style="' + tagstyle + '" class="tags"><i onclick="javascript: internallinkcopy(\'' + val.id + '\')" id="internallink" class="fa fa-link"></i><i onclick="javascript: externallinkcopy(\'' + val.url + '\', \'' + val.id + '\')" id="externallink" class="fa fa-external-link"></i><i onclick="javascript: expandscreen(this)" class="fa fa-square-o"></i><b>Tags </b>' + tagdispalay + tagchanged + '</div>'));
            
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
        });

        if (!ismoretweets || $('#moretweets').css('opacity') != 1) {
            //showMessage("Search Results", 2000);
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
                newtweetobj.append($('<i onclick="javascript: expandCat(this)" id="expand" class="fa fa-edit"></i><div class="categorias"><b>Id </b>' + val.id + '<b> Categories </b>' + val.categories + '</div>'));
                newtweetobj.append($('<div class="tags"><i onclick="javascript: internallinkcopy(\'' + val.id + '\')" id="internallink" class="fa fa-link"></i><i onclick="javascript: externallinkcopy(\'' + val.url + '\')" id="externallink" class="fa fa-external-link"></i><i onclick="javascript: expandscreen(this)" class="fa fa-square-o"></i><b>Tags </b>' + val.tags + '</div>'));
                newtweetobj.append($('<div class="innertweet"></div>'));
                newtweetobj.find('.innertweet').append(val.tweet);
                newtweetobj.attr('id', val.id);

                var newtweetobjaction = newtweetobj;
                $('html, body').animate({
                scrollTop: $(newtweetobjaction).offset().top
                }, 700);

                $('#mask').fadeOut(300);

                //showMessage("Link Loaded"); 

                return false;
            }
        });
    }); 
}


var getJsonbyid = function(id, functorun) {
    var path = "./data.json";

    $.getJSON(path, function(data) {
        var processtmp = true;
        nextid = parseInt(readCookie("maxid")) - 1;
        if (!nextid)
            nextid = parseInt($("#maxid").val()) - 1;

        processtmp = true;

        $.each(data.Tweets, function(key, val) {
            var recordfromdata = val;
            var linkcontent = null;

            do {
                if (processtmp) {
                    linkcontent = readCookie(nextid + "templink");
                    if (linkcontent && linkcontent.length > 0) {
                        var linktmp = decodeURIComponent(linkcontent);
                        linktmp = linktmp.substring(1, linktmp.length - 2).replace(/(\\n)/gm, ""); 
                        linktmp = linktmp.replace(/(\\)/gm, ""); 
                        linktmp = JSON.parse(linktmp);
    
                        val = linktmp;
                        nextid = nextid - 1;
                    }
                    else {
                        val = recordfromdata;
                        processtmp = false;
                    }
                }
                else {
                    val = recordfromdata;
                }
                if (val.id == id) {
                    processtmp = false;

                    if (functorun)
                        functorun(val);
                    return false;
                }
            }
            while (processtmp);
        }); 
    }); 

    return null;
}
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
 
  
var countalltweets = function(id) {
    console.log('-------------- countalltweets - BEGIN --------------');

    // xyz
    //return false;

    var path = "./data.json";
    var counters = new Map();
    var tagsmap = new Map();
    var total = 0;
    var total_y = 0;
    var total_t = 0;
    var total_h = 0;    
    var processtmp = true;
    nextid = parseInt(readCookie("maxid")) - 1;
    if (!nextid)
        nextid = parseInt($("#maxid").val()) - 1;

    $.getJSON(path, function(data) {
        $.each(data.Tweets, function(key, val) {
            var recordfromdata = val;
            var linkcontent = null;
    
            do {
                if (processtmp) {
                    linkcontent = readCookie(nextid + "templink");
                    if (linkcontent && linkcontent.length > 0) {
                        var linktmp = decodeURIComponent(linkcontent);
                        linktmp = linktmp.substring(1, linktmp.length - 2).replace(/(\\n)/gm, ""); 
                        linktmp = linktmp.replace(/(\\)/gm, ""); 
                        linktmp = JSON.parse(linktmp);
                        val = linktmp;
                        nextid = nextid - 1;
                    }
                    else {
                        val = recordfromdata;
                        processtmp = false;
                    }
                }
                else {
                    val = recordfromdata;
                }
////////////* 
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
//////////*/
                if (!tagssloaded) {
                    var tags = val.tags.split(" ");
        
                    for (var i = 0; i < tags.length; i++) {
                        if (tags[i].trim().length > 0) {
                            if (tagsmap.has(tags[i].trim())) {
                                var aux = Number(tagsmap.get(tags[i]));
        
                                tagsmap.set(tags[i].trim(), aux + 1);
                            }
                            else {
                                tagsmap.set(tags[i].trim(), 1);
                            }
                        }
                    }
                }
    ///////////* 
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
    //////////////*/
            }
            while (processtmp);
        });
        console.log('-------------- 88888888888888888 --------------');
        if (!tagssloaded) {
            var o = new Option("notag", "notag");
            $(o).html("All Tags");
            $("#tagsselect").append(o);
            $("#tagsearchselect").append(o);
            var mapAsc = new Map([...tagsmap.entries()].sort());
    
            for (let [key, value] of mapAsc) {   
                o = new Option(key, key);
                $(o).html(key);
                $("#tagsselect").append(o);
                $("#tagsearchselect").append(o);
            }
    
            tagsmap[Symbol.iterator] = function* () {
    
                yield* [...this.entries()].sort((a, b) => b[1] - a[1]);
            
            }
            /*
            for (let [key, value] of tagsmap) {     // get data sorted
                o = new Option(key, key);
                $(o).html(key);
                $("#tagsselect").append(o);
            }*/
    
    
            $("#addpopup").css("top", "4000px");
            $("#addpopup").show();
            var hasOverflow = false;
    
            for (let [key, value] of tagsmap) {     // get data sorted
                /*
                if (!hasOverflow) {
                    var elem = $("<li  onclick='javascript: clickLiTag(event, this)' class='litags'>" + key + "</li>");
                    $("#tagsul").append(elem);
                    if ($('#tagsul').isChildOverflowing(elem)) {
                        hasOverflow = true;
                        elem.remove();
                    }
                }
                 */
                var elem = $("<li  onclick='javascript: clickLiTag(event, this)' class='litags'>" + key + "</li>");
                $("#tagsul").append(elem);
                var elem2 = $("<li  onclick='javascript: clickLiTag(event, this)' class='litags'>" + key + "</li>");
                $('#tagsearchul').append(elem2);
            }  
    
            $("#addpopup").hide();
            
            $("#addpopup").css("top", "calc(50% - 189px)");

            tagssloaded = true;

            console.log('-------------- 9999999999 --------------');
        }

        /////* 

        // All Links
        $("#all").text(total);
        $("#all2").text(total);
        $("#all").parent().attr("title", "Twitter: " + total_t + " - Youtube: " + total_y + " - Website: " + total_h);
        $("#all2").parent().attr("title", "Twitter: " + total_t + " - Youtube: " + total_y + " - Website: " + total_h);

        // To View Now
        var toview = 0;
        var toviewT = 0;
        var toviewY = 0;
        var toviewH = 0;
        if (counters.has("Ttvn")) {
            toviewT = counters.get("Ttvn");
            toview = counters.get("Ttvn");
        }
        if (counters.has("Ytvn")) {
            toviewY = counters.get("Ytvn");
            toview = toview + counters.get("Ytvn");
        }
        if (counters.has("Htvn")) {
            toviewH = counters.get("Htvn");
            toview = toview + counters.get("Htvn");
        }

        $("#tvn").text(toview);
        $("#tvn").parent().attr("title", "Twitter: " + toviewT + " - Youtube: " + toviewY + " - Website: " + toviewH);
        $("#tvn2").text(toview);
        $("#tvn2").parent().attr("title", "Twitter: " + toviewT + " - Youtube: " + toviewY + " - Website: " + toviewH);

        // Trending
        var trending = 0;
        var trendingT = 0;
        var trendingY = 0;
        var trendingH = 0;
        if (counters.has("Ttrn")) {
            trendingT = counters.get("Ttrn");
            trending = counters.get("Ttrn");
        }
        if (counters.has("Ytrn")) {
            trendingY = counters.get("Ytrn");
            trending = trending + counters.get("Ytrn");
        }
        if (counters.has("Htrn")) {
            trendingH = counters.get("Htrn");
            trending = trending + counters.get("Htrn");
        }

        $("#trn").text(trending);
        $("#trn").parent().attr("title", "Twitter: " + trendingT + " - Youtube: " + trendingY + " - Website: " + trendingH);
        $("#trn2").text(trending);
        $("#trn2").parent().attr("title", "Twitter: " + trendingT + " - Youtube: " + trendingY + " - Website: " + trendingH);

        // To View
        var toview = 0;
        var toviewT = 0;
        var toviewY = 0;
        var toviewH = 0;
        if (counters.has("Ttvi")) {
            toviewT = counters.get("Ttvi");
            toview = counters.get("Ttvi");
        }
        if (counters.has("Ytvi")) {
            toviewY = counters.get("Ytvi");
            toview = toview + counters.get("Ytvi");
        }
        if (counters.has("Htvi")) {
            toviewH = counters.get("Htvi");
            toview = toview + counters.get("Htvi");
        }

        $("#tvi").text(toview);
        $("#tvi").parent().attr("title", "Twitter: " + toviewT + " - Youtube: " + toviewY + " - Website: " + toviewH);
        $("#tvi2").text(toview);
        $("#tvi2").parent().attr("title", "Twitter: " + toviewT + " - Youtube: " + toviewY + " - Website: " + toviewH);


        // To View Long
        var toview = 0;
        var toviewT = 0;
        var toviewY = 0;
        var toviewH = 0;
        if (counters.has("Ttvl")) {
            toviewT = counters.get("Ttvl");
            toview = counters.get("Ttvl");
        }
        if (counters.has("Ytvl")) {
            toviewY = counters.get("Ytvl");
            toview = toview + counters.get("Ytvl");
        }
        if (counters.has("Htvl")) {
            toviewH = counters.get("Htvl");
            toview = toview + counters.get("Htvl");
        }

        $("#tvl").text(toview);
        $("#tvl").parent().attr("title", "Twitter: " + toviewT + " - Youtube: " + toviewY + " - Website: " + toviewH);
        $("#tvl2").text(toview);
        $("#tvl2").parent().attr("title", "Twitter: " + toviewT + " - Youtube: " + toviewY + " - Website: " + toviewH);

        // To read
        var toread = 0;
        var toreadT = 0;
        var toreadY = 0;
        var toreadH = 0;
        if (counters.has("Ttre")) {
            toreadT = counters.get("Ttre");
            toread = counters.get("Ttre");
        }
        if (counters.has("Ytre")) {
            toreadY = counters.get("Ytre");
            toread = toread + counters.get("Ytre");
        }
        if (counters.has("Htre")) {
            toreadH = counters.get("Htre");
            toread = toread + counters.get("Htre");
        }
        $("#tre").text(toread);
        $("#tre").parent().attr("title", "Twitter: " + toreadT + " - Youtube: " + toreadY + " - Website: " + toreadH);
        $("#tre2").text(toread);
        $("#tre2").parent().attr("title", "Twitter: " + toreadT + " - Youtube: " + toreadY + " - Website: " + toreadH);

        // To read long
        var toread = 0;
        var toreadT = 0;
        var toreadY = 0;
        var toreadH = 0;
        if (counters.has("Ttrl")) {
            toreadT = counters.get("Ttrl");
            toread = counters.get("Ttrl");
        }
        if (counters.has("Ytrl")) {
            toreadY = counters.get("Ytrl");
            toread = toread + counters.get("Ytrl");
        }
        if (counters.has("Htrl")) {
            toreadH = counters.get("Htrl");
            toread = toread + counters.get("Htrl");
        }
        $("#trl").text(toread);
        $("#trl").parent().attr("title", "Twitter: " + toreadT + " - Youtube: " + toreadY + " - Website: " + toreadH);
        $("#trl2").text(toread);
        $("#trl2").parent().attr("title", "Twitter: " + toreadT + " - Youtube: " + toreadY + " - Website: " + toreadH);

        // To keep
        var tokeep = 0;
        var tokeepT = 0;
        var tokeepY = 0;
        var tokeepH = 0;
        if (counters.has("Ttke")) {
            tokeepT = counters.get("Ttke");
            tokeep = counters.get("Ttke");
        }
        if (counters.has("Ytke")) {
            tokeepY = counters.get("Ytke");
            tokeep = tokeep + counters.get("Ytke");
        }
        if (counters.has("Htke")) {
            tokeepH = counters.get("Htke");
            tokeep = tokeep + counters.get("Htk");
        }
        $("#tke").text(tokeep);
        $("#tke").parent().attr("title", "Twitter: " + tokeepT + " - Youtube: " + tokeepY + " - Website: " + tokeepH);
        $("#tke2").text(tokeep);
        $("#tke2").parent().attr("title", "Twitter: " + tokeepT + " - Youtube: " + tokeepY + " - Website: " + tokeepH);

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
        $("#imp2").text(imp);
        $("#imp2").parent().attr("title", "Twitter: " + impT + " - Youtube: " + impY + " - Website: " + impH);

        var climate = 0;
        var climateT = 0;
        var climateY = 0;
        var climateH = 0;
        if (counters.has("Tcli")) {
            climateT = counters.get("Tcli");
            climate = counters.get("Tcli");
        }
        if (counters.has("Ycli")) {
            climateY = counters.get("Ycli");
            climate = climate + counters.get("Ycli");
        }
        if (counters.has("Hcli")) {
            climateH = counters.get("Hcli");
            climate = climate + counters.get("Hcli");
        }
        $("#cli").text(climate);
        $("#cli").parent().attr("title", "Twitter: " + climateT + " - Youtube: " + climateY + " - Website: " + climateH);
        $("#cli2").text(climate);
        $("#cli2").parent().attr("title", "Twitter: " + climateT + " - Youtube: " + climateY + " - Website: " + climateH);
        
        /////* 
        /* */
        dblFlag = false;  

        if (dosearchmore) {
            $( "#mask" ).fadeOut( 800, function() {
                var style = window.getComputedStyle(body, null);
        
                $("#mask").css("background", style.getPropertyValue('--soft-transp-color'));
                $("#mask .fa-folder-open").hide();
                $("#mask > div" ).hide();
                $("#mask > .fa-circle-o-notch").show();
            });
        }
    }); 

    console.log('-------------- countalltweets - END --------------');
}


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


var togglecriterions = function(obj) {
    closeallnewlayout();

    if ($("#searchpopup").css("display") == "none")
        openSearchPopup();
    else
        closeSearchPopup();

    /*    
    fixfocus(obj);

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
     */
}   


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function resetFields(flag) {
    $("#main").empty();
    $('#moretweets').hide();
    $('#tweetcount').hide();  
    clearcriterion(null,null, "filterdate1", "searchdate");
    clearcriterion(null,null, "filterdate2", "searchdate");
    clearcriterion(null,null, "selectedtype", "searchtypes");
    clearcriterion(null,null, "filterauthor", "searchauthor");
    clearcriterion(null,null, "filtertext", "searchinfo");
    clearcriterion(null,null, "filtertag", "searchtags");
    clearcriterion(null,null, "selectedclassif", "searchclassif");
    filterdate1date = null;
    filterdate2date = null;
    
    if (flag) 
        showMessage("Search Criterions Cleaned"); 
} 

