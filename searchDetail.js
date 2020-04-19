

function closeSearchPopup(obj) {
    if (obj)
        fixfocus(obj);

    $('body, html').css('overflow-y', 'auto');

    $('#searchpopup').css('transition', 'all 1.7s');
    $('#searchpopup').css('opacity', 0);

    setTimeout(function(){
        $('#searchpopup').hide();
        $('#searchpopup').css('opacity', 1);

        var setHeight = "18px";

        if ($('body').hasClass('big'))
            setHeight = "30px";
    
        $("#searchpopup table").each( function( index, element ) {
            var table = $(element);
    
            table.css('max-height', setHeight);
            table.find('.sectionedittd i').addClass('fa-angle-down').removeClass('fa-angle-up').show();
            table.find('td.el').addClass('ellipsis');
        });
    }, 700);
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
    setTimeout(function() { 
        //updateTopPosition("searchpopup"); 
    }, 1000);
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
                    
                    if (formatNumDate(date) != $('#date').attr("cdate")) {
                        console.log(999)
                        createCookie($('#linkChange').attr("cid") + "datechanged", formatNumDate(date));
                        createCookie($('#linkChange').attr("cid") + "haschanges", "yes");
                        if (showColors) {
                            otherObj.css('color','#00ff72');
                        }
                    }
                    else {
                        createCookie($('#linkChange').attr("cid") + "datechanged", "");
                        otherObj.css('color','');
                    }
                }
                else {
                    otherObj.html("--"); 
                }

                updateLinkColor(null, $('#linkChange').attr("cid"));
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
    
    $('#titlesearch').html("(" + $('#selectedcattext').val() + ")");

    updateSearchTablesHeight();
    
    $('#searchpopup').css('transition', 'transition: all 0.01s');
    $('#searchpopup').css("height", "calc(100%)");

    if ($('body').hasClass('big')) {
        $('#searchpopup').css("top", "-375px");
    }
    else {
        $('#searchpopup').css("top", "-320px");
    }

    $('#searchpopup').css("background", "transparent");

    $('#searchpopup').slideDown();

    $('#searchpopup').attr("style", "top: 0px;transition: all 0.8s cubic-bezier(0.01, 0.76, 0.65, 0.96) 0.5s, background 1.1s, height 0.2s;");

    setTimeout(function(){
        $('#searchpopup').css('background', 'var(--soft-transp-color)');
    }, 600);

    //updateTopPosition("searchpopup"); 

    $('#searchpopup').fadeIn(); 
} 

function updateSearchTablesHeight() {
    var setHeight = "18px";
    if ($('body').hasClass('big'))
        setHeight = "29px";

    $('#searchpopup').find("table:not(.buttonstable)").each( function( index, element ) {
        var table = $(element);
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
    var dofiltertext = $('#filtertext').val().trim().length > 0; 
    var dofilterdate1 = $('#filterdate1').val().trim().length > 0; 
    var dofilterdate2 = $('#filterdate2').val().trim().length > 0; 
    var dofiltertag = $('#filtertag').val().trim().length > 0; 
    var dofilterauthor = $('#filterauthor').val().trim().length > 0;
    var dofiltercat = $('#selectedcat').val().length > 0 && $('#selectedcat').val() != 'all';  
    var dofiltertype = $('#selectedtype').val().trim() != "all"; 
    var dofilterclassif = $('#selectedclassif').val().trim() != "all"; 
    searchtotal = 0;

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

        $("html").scrollTop(0);
        $("#main").empty();
    }

    currpage = currpage + 1;

    nextid = null;
    try {
        nextid = parseInt(readCookie("maxid"));
    }
    catch(err) {
    }
    finally {
        if (nextid) {
            $("#maxid").val(nextid);
            nextid = nextid - 1;
        }
        else {
            nextid = parseInt($("#maxid").val());
            createCookie("maxid", nextid);
            nextid = nextid - 1;
        }
    }

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
                    if (processtmp) {
                        linkcontent = readCookie(nextid + "templink");
                        if (linkcontent && linkcontent.length > 0) {
                            var linktmp = decodeURIComponent(linkcontent);
                            linktmp = linktmp.replace(/(?:\\[rn])+/g, "\\n");
                            linktmp = linktmp.substring(1, linktmp.length - 2).replace(/(\\n)/gm, ""); 
                            linktmp = linktmp.replace(/(\\)/gm, ""); 
                            linktmp = JSON.parse(linktmp);
        
                            val = linktmp;
                            nextid = nextid - 1;
                        }
                        else {
                            if (showAll || val.id == "0") {
                                val = recordfromdata;
                            }
                            else {
                                val = null;
                            }
                            
                            processtmp = false;
                        }
                    }
                    else {
                        if (showAll || val.id == "0") {
                            val = recordfromdata;
                        }
                        else {
                            val = null;
                        }
                    }

                    var isdeleted = readCookie(val.id + "isdeleted");
                    if (!(val && val.deleted == "yes") && !(isdeleted && isdeleted == "yes") && val.id != "0") {
                        var cat = readCookie(val.id + "catchanged");
                        if (cat && cat.length > 0) {
                            val.categories = cat;
                        }
            
                        var tag = readCookie(val.id + "tagchanged");
                        if (tag && tag.length > 0) {
                            val.tags = tag;
                        }
            
                        var info = readCookie(val.id + "info");
                        if (info && info.length > 0) {
                            val.info = info;
                        }
            
                        var classif = readCookie(val.id + "classif");
                        if (classif && classif.length > 0) {
                            val.classif = classif;
                        }
    
                        var author = readCookie(val.id + "author");
                        if (author && author.length > 0) {
                            val.author = author;
                        }
            
                        var datechanged = readCookie(val.id + "datechanged");
                        if (datechanged && datechanged.length > 0) {
                            val.date = datechanged;
                        }
                        
                        dofiltertextfinal = !dofiltertext || searchInfo(val.info.toLowerCase(), val.tweet.toLowerCase(), $('#filtertag').val().toLowerCase());
                        dofilterdate1final = !dofilterdate1 || val.date >= Number($('#filterdate1').val());
                        dofilterdate2final = !dofilterdate2 || val.date <= Number($('#filterdate2').val());
                        dofiltertagfinal = !dofiltertag || searchTags(val.tags.toLowerCase(), $('#filtertag').val().toLowerCase());
                        dofiltercatfinal = !dofiltercat || val.categories.includes($('#selectedcat').val());
                        dofilterauthorfinal = !dofilterauthor || val.author.toLowerCase().includes($('#filterauthor').val().toLowerCase());
                        dofiltertypefinal = !dofiltertype || val.type == $('#selectedtype').val();
                        dofilterclassiffinal = !dofilterclassif || searchClassif(val.classif, $('#selectedclassif').val(), $('#selectedclassifcombo').val());
                        
                        var doShowDeletedLink = true;  
                        if (!$("#showdeleted2").is(":checked")) {
                            if (val.deleted != "" || (isdeleted && isdeleted.length > 0)) {
                                doShowDeletedLink = false; 
                            } 
                        }
    
                        if (dofiltertextfinal && dofilterdate1final && dofiltertagfinal && dofilterdate2final
                            && dofilterauthorfinal && dofiltercatfinal && dofiltertypefinal && dofilterclassiffinal && doShowDeletedLink) {
          
    
                            searchtotal = searchtotal + 1;
    
    
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

        nextid = null;
        try {
            nextid = parseInt(readCookie("maxid"));
        }
        catch(err) {
        }
        finally {
            if (nextid) {
                $("#maxid").val(nextid);
                nextid = nextid - 1;
            }
            else {
                nextid = parseInt($("#maxid").val());
                createCookie("maxid", nextid);
                nextid = nextid - 1;
            }
        }

        processtmp = true;

        /*
        var sortByProperty = function (property) {
            return function (x, y) {
                return y.property - x.property;
            };
        };
        data.Tweets.sort(sortByProperty(''));

        var sortByDate = function () {
            return function (x, y) {
                return Number(y.date) - Number(x.date);
            };
        };
        data.Tweets.sort(sortByDate());
        */


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
                        linktmp = linktmp.replace(/(?:\\[rn])+/g, "\\n");
                        linktmp = linktmp.substring(1, linktmp.length - 2).replace(/(\\n)/gm, ""); 
                        linktmp = linktmp.replace(/(\\)/gm, ""); 
                        linktmp = JSON.parse(linktmp);
    
                        val = linktmp;
                        nextid = nextid - 1;
                    }
                    else {
                        if (showAll || val.id == "0") {
                            val = recordfromdata;
                        }
                        else {
                            val = null;
                        }
                        
                        processtmp = false;
                    }
                }
                else {
                    if (showAll || val.id == "0") {
                        val = recordfromdata;
                    }
                    else {
                        val = null;
                    }
                }

                var isdeleted = readCookie(val.id + "isdeleted");
                if (!(val && val.deleted == "yes") && !(isdeleted && isdeleted == "yes") && val.id != "0") {
                    var cat = readCookie(val.id + "catchanged");
                    if (cat && cat.length > 0) {
                        val.categories = cat;
                    }
        
                    var tag = readCookie(val.id + "tagchanged");
                    if (tag && tag.length > 0) {
                        val.tags = tag;
                    }
        
                    var info = readCookie(val.id + "info");
                    if (info && info.length > 0) {
                        val.info = info;
                    }
        
                    var classif = readCookie(val.id + "classif");
                    if (classif && classif.length > 0) {
                        val.classif = classif;
                    }
    
                    var author = readCookie(val.id + "author");
                    if (author && author.length > 0) {
                        val.author = author;
                    }
        
                    var datechanged = readCookie(val.id + "datechanged");
                    if (datechanged && datechanged.length > 0) {
                        val.date = datechanged;
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
                        
                        var doShowDeletedLink = true;  
                        if (!$("#showdeleted").is(":checked")) {
                            if (val.deleted != "" || (isdeleted && isdeleted.length > 0)) {
                                doShowDeletedLink = false; 
                            } 
                        }
    
                        if (dofiltertextfinal && dofilterdate1final && dofiltertagfinal && dofilterdate2final
                            && dofilterauthorfinal && dofiltercatfinal && dofiltertypefinal && dofilterclassiffinal && doShowDeletedLink) {
                            
                            var tagdispalay = " --";
                            var expandclass = "";
                            var color = "";
                            if (val.deleted != "" || (isdeleted && isdeleted.length > 0)) { // ID DELETED
                                expandclass = hideMode ? "" : "isdeleted";    
                                if (showColors)
                                    color = "color: red;";
                            } 
                            else if (showColors) {
                                if (val.isnew && val.isnew != "") { // IS NEW

                                    expandclass = hideMode ? "" : "isnew";  
                                    color = "color: #00dc00;";
        
                                    var tagchanged = readCookie(val.id + "tagchanged");
            
                                    if (tagchanged && tagchanged.length > 0) {
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
            
                                        if (tagchanged && tagchanged.length > 0) {
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
                            else {
                                tagdispalay = parseTags(val.tags);
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
                            
                            var newtweet = $('#main').append($('<div id="inid" cdate="' + val.date + '" curl="' + val.url + '" class="pobj tweet' + xclass + '"></div>'));
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
                                $('#tcnumber').text(totalLinkss + " Links");
                                $('#tccateg').text("In " + $('#selectedcattext').val());
                    
                                var aux = ind;
                    
                                setTimeout(function(){ 
                                    if (aux == toindex) { 
                                        $('#tcnumber').text(totalLinkss + " Links");
                                        $('#tccateg').text("In " + $('#selectedcattext').val());
                                    }
                                    else {
                                        //$('#tcnumber').text(toindex + " of " + aux);
                                        $('#tcnumber').text(totalLinkss + " Links");
                                        $('#tccateg').text("In " + $('#selectedcattext').val());
                                    }   
                                    
                                    //$('#tweetcount').css('background', 'white');
                                }, 3000);
                    
                            }
                            else {  
                                $('#tcnumber').text(totalLinkss + " Links");
                                $('#tccateg').text("In " + $('#selectedcattext').val());
                            }
                    
                            $('#tct').text(total_tt);
                            $('#tcy').text(total_yy);
                            $('#tch').text(total_hh);                        
    
                            return false;
                        }
                    }
                    if (val.id == 0) {
    
                        return;
    
                    }
                }
                else {
                    var isdeleted = readCookie(val.id + "isdeleted");
                    if (!(val && val.deleted == "yes") && !(isdeleted && isdeleted == "yes") && val.id != "0") {
                        return;
                    }
                }
            }
            while (processtmp);

        });
        processedCount = ind;
        if (Number($('#recordspersearch').val()) < ind) {
        
            //$('#tweetcount').css('background', '#fff900');
            
            //$('#tcnumber').text((currentIndex + 1)  + " to " + toindex + " of " + ind);
            $('#tcnumber').text(totalLinkss + " Links");
            $('#tccateg').text("In " + $('#selectedcattext').val());

            var aux = ind;

            setTimeout(function(){ 
                if (aux == toindex) { 
                    $('#tcnumber').text(totalLinkss + " Links");
                    $('#tccateg').text("In " + $('#selectedcattext').val());
                }
                else {
                    //$('#tcnumber').text(toindex + " of " + aux);
                    $('#tcnumber').text(totalLinkss + " Links");
                    $('#tccateg').text("In " + $('#selectedcattext').val());
                }   
                
                //$('#tweetcount').css('background', 'white');
            }, 3000);

        }
        else {  
            $('#tcnumber').text(totalLinkss + " Links");
            $('#tccateg').text("In " + $('#selectedcattext').val());
        }

        $('#tct').text(total_tt);
        $('#tcy').text(total_yy);
        $('#tch').text(total_hh);

        $('#main').find('.tweet').sort(function (a, b) {
            return Number($(b).attr('cdate')) - Number($(a).attr('cdate'));
        }).appendTo('#main');
        
        setTimeout(function() { 
            var found = customizeTweets(1);

            sleep(100);  

            if (!found) {
                setTimeout(function() { 
                    found = customizeTweets(1);
        
                    sleep(100);  
        
                    if (!found) {
                        setTimeout(function() { 
                            var found = customizeTweets(1);
                            if (!found) {
                                $('#tweetcount').fadeIn(800);
                                $('#mask').fadeOut(700);
                                          
                                $('#moretweets').fadeOut(300);
                                $('#moretweets').css('opacity', 0);
                            }
                        }, 2500); 
                    }
                }, 1500);
            }
        }, 500);

        if (!ismoretweets) {
            if (totalLinkss > 0) {
                //if (wasfiltered != 2)
                    //showMessage("Search Results", 2000);
            }
            else {

                $('#mask').fadeOut(600);  
                $('#tweetcount').fadeOut(800);
                $('#moretweets').fadeOut(300);
                $('#moretweets').css('opacity', 0);
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
 
  
var getInformationbyid = function(id, flag) {
    $('#mask').fadeIn(300);  
    var path = "./data.json";

    nextid = null;
    try {
        nextid = parseInt(readCookie("maxid"));
    }
    catch(err) {
        console.log("getInformationbyid - Error parsing next id");
    }
    finally {
        if (nextid) {
            $("#maxid").val(nextid);
            console.log("getInformationbyid - nextid vem do cookie: " + nextid);
            nextid = nextid - 1;
        }
        else {
            nextid = parseInt($("#maxid").val());
            createCookie("maxid", nextid);
            console.log("getInformationbyid - nextid vem do hidden field: " + nextid);
            nextid = nextid - 1;
        }
    }

    $.getJSON(path, function(data) {
        var processtmp = true;

        $.each(data.Tweets, function(key, val) {
            var newtweet = null;
            var recordfromdata = val;
            var linkcontent = null;

            do {
                if (processtmp) {
                    linkcontent = readCookie(nextid + "templink");
                    if (linkcontent && linkcontent.length > 0) {
                        var linktmp = decodeURIComponent(linkcontent);
                        linktmp = linktmp.replace(/(?:\\[rn])+/g, "\\n");
                        linktmp = linktmp.substring(1, linktmp.length - 2).replace(/(\\n)/gm, ""); 
                        linktmp = linktmp.replace(/(\\)/gm, ""); 
                        linktmp = JSON.parse(linktmp);
    
                        val = linktmp;
                        nextid = nextid - 1;
                    }
                    else {
                        if (showAll || val.id == "0") {
                            val = recordfromdata;
                        }
                        else {
                            val = null;
                        }
                        
                        processtmp = false;
                    }
                }
                else {
                    if (showAll || val.id == "0") {
                        val = recordfromdata;
                    }
                    else {
                        val = null;
                    }
                }
                var isdeleted = readCookie(val.id + "isdeleted");

                if (!(val && val.deleted == "yes") && !(isdeleted && isdeleted == "yes") && val.id.includes(id) && val.id != "0") {
                    $("#main").empty();
                    $('#moretweets').hide();
                    $('#tweetcount').hide();  
    
    
                    var tagdispalay = " --";
                    var expandclass = "";
                    var color = "";

                    if (val.deleted != "" || (isdeleted && isdeleted.length > 0)) { // ID DELETED
                        expandclass = hideMode ? "" : "isdeleted";    
                        color = "color: red;";
                    } 
                    else {
                        if (val.isnew && val.isnew != "") { // IS NEW
                            expandclass = hideMode ? "" : "isnew";  
                            color = "color: #00dc00;";
    
                            var tagchanged = readCookie(val.id + "tagchanged");
    
                            if (tagchanged && tagchanged.length > 0 && tagchanged) {
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
    
                                if (tagchanged && tagchanged.length > 0 && tagchanged) {
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
    
                    var newtweetobjaction = newtweetobj;
                    
                    $('#mask').fadeOut(300);
    
                    if (flag)
                        showMessage("This Link is the same as the one you are trying to add", 6000); 

                    setTimeout(function() { 
                            customizeTweets(2);
                            $('#tweetcount').hide();
                            $('body, html').css('overflow-y', 'auto');
                      }, 1000);
                    return false;
                }
            }
            while (processtmp);
        });
    }); 
}


var getJsonbyid = function(id, functorun) {
    var path = "./data.json";

    $.getJSON(path, function(data) {
        var processtmp = true;
        
        nextid = null;
        try {
            nextid = parseInt(readCookie("maxid"));
        }
        catch(err) {
            console.log("getJsonbyid - Error parsing next id");
        }
        finally {
            if (nextid) {
                $("#maxid").val(nextid);
                console.log("getJsonbyid - nextid vem do cookie: " + nextid);
                nextid = nextid - 1;
            }
            else {
                nextid = parseInt($("#maxid").val());
                createCookie("maxid", nextid);
                console.log("getJsonbyid - nextid vem do hidden field: " + nextid);
                nextid = nextid - 1;
            }
        }
        var retObj = null;

        $.each(data.Tweets, function(key, val) {
            var recordfromdata = val;
            var linkcontent = null;

            do {
                if (processtmp) {
                    linkcontent = readCookie(nextid + "templink");
                    if (linkcontent && linkcontent.length > 0) {
                        var linktmp = decodeURIComponent(linkcontent);
                        linktmp = linktmp.replace(/(?:\\[rn])+/g, "\\n");
                        linktmp = linktmp.substring(1, linktmp.length - 2).replace(/(\\n)/gm, ""); 
                        linktmp = linktmp.replace(/(\\)/gm, ""); 
                        linktmp = JSON.parse(linktmp);
    
                        val = linktmp;
                        nextid = nextid - 1;
                    }
                    else {
                        if (showAll || val.id == "0") {
                            val = recordfromdata;
                        }
                        else {
                            val = null;
                        }
                        
                        processtmp = false;
                    }
                }
                else {
                    if (showAll || val.id == "0") {
                        val = recordfromdata;
                    }
                    else {
                        val = null;
                    }
                }

                var isdeleted = readCookie(val.id + "isdeleted");
                if (!(val && val.deleted == "yes") && !(isdeleted && isdeleted == "yes") && val.id.includes(id) && val.id != "0") {
                    var cat = readCookie(val.id + "catchanged");
                    if (cat && cat.length > 0) {
                        val.categories = cat;
                    }
        
                    var tag = readCookie(val.id + "tagchanged");
                    if (tag && tag.length > 0) {
                        val.tags = tag;
                    }
        
                    var info = readCookie(val.id + "info");
                    if (info && info.length > 0) {
                        val.info = info;
                    }
        
                    var classif = readCookie(val.id + "classif");
                    if (classif && classif.length > 0) {
                        val.classif = classif;
                    }

                    if (val.id == id) {
                        processtmp = false;
                        retObj = val;
                    }
                }
            }
            while (processtmp);
        }); 

        if (retObj) {
            if (functorun)
                functorun(retObj);
            return null;
        }
        else {
            return null;
        }
    }); 

    return null;
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



var existsLink = function(text, type, functorun) {

    var path = "./data.json";

    nextid = null;
    try {
        nextid = parseInt(readCookie("maxid"));
    }
    catch(err) {
        console.log("existsLink - Error parsing next id");
    }
    finally {
        if (nextid) {
            $("#maxid").val(nextid);
            console.log("existsLink - nextid vem do cookie: " + nextid);
            nextid = nextid - 1;
        }
        else {
            nextid = parseInt($("#maxid").val());
            createCookie("maxid", nextid);
            console.log("existsLink - nextid vem do hidden field: " + nextid);
            nextid = nextid - 1;
        }
    }
    existingId = "no";

    $.getJSON(path, function(data) {
        var processtmp = true;

        $.each(data.Tweets, function(key, val) {
            var recordfromdata = val;
            var linkcontent = null;

            do {
                if (processtmp) {
                    linkcontent = readCookie(nextid + "templink");
                    if (linkcontent && linkcontent.length > 0) {
                        var linktmp = decodeURIComponent(linkcontent);
                        linktmp = linktmp.replace(/(?:\\[rn])+/g, "\\n");
                        linktmp = linktmp.substring(1, linktmp.length - 2).replace(/(\\n)/gm, ""); 
                        linktmp = linktmp.replace(/(\\)/gm, ""); 
                        linktmp = JSON.parse(linktmp);
    
                        val = linktmp;
                        nextid = nextid - 1;
                    }
                    else {
                        if (showAll || val.id == "0") {
                            val = recordfromdata;
                        }
                        else {
                            val = null;
                        }
                        
                        processtmp = false;
                    }
                }
                else {
                    if (showAll || val.id == "0") {
                        val = recordfromdata;
                    }
                    else {
                        val = null;
                    }
                }

                var isdeleted = readCookie(val.id + "isdeleted");

                if (!(val && val.deleted == "yes") && !(isdeleted && isdeleted == "yes") && val.id != "0") {
                    if (val.type == "T") {
                        if (   
                            (text.substring(0,20) != "" && val.tweet.includes(text.substring(0,20)))
                            &&
                            (text.substring(40,60) != "" && val.tweet.includes(text.substring(40,60)))                        
                            &&
                            (text.substring(80,100) != "" && val.tweet.includes(text.substring(80,100)))                     
                        ) {
    
                            existingId = val.id;
                        }
                    }
                    else {
                        if (val.url.localeCompare(text) == 0) {
                            existingId = val.id;
                        }
                    }
    
                    if (val.id == "0") {
                        if (functorun)
                            functorun();
                    }
                }
                else { 
                    var isdeleted = readCookie(val.id + "isdeleted");

                    if (!(val && val.deleted == "yes") && !(isdeleted && isdeleted == "yes" && val.id != "0") && functorun) {
                        functorun();
                    }
                }
            }
            while (processtmp);
        });     
    }); 
}
