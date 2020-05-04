

function closeSearchPopup(obj) {
    if (obj)
        fixfocus(obj);

    $('body, html').css('overflow-y', 'auto');

    $('#searchpopup').css('transition', 'all 1.7s');
    $('#searchpopup').css('opacity', 0);

    setTimeout(function(){
        $('#searchpopup').hide();
        $('#searchpopup').css('opacity', 1);

        var setHeight = "26px";

        if ($('body').hasClass('big'))
            setHeight = "37px";
    
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

    /*
    if (table == "searchtags") {
        updateTopPosition("searchpopup"); 
    }
    else {
        updateTopPosition("linkChange"); 
    }
     */
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

    var setHeight = "26px";

    if ($('body').hasClass('big'))
        setHeight = "37px";

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
    var setHeight = "26px";
    if ($('body').hasClass('big'))
        setHeight = "37px";

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




var getInformation = function(wasfiltered, valid, flag) {

    closeSearchPopup();

    if (wasfiltered == 1) {
        $('#countfilter').show();
    }
    else if (wasfiltered == 2) {
        $('#countfilter').hide();
    }

    var path = "./data.json";
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

    // security check
    /* xyz splash 
    if (valid) {
    }
    else if (ceec != 4) {
        ceec++;
    }
    else {
        ceec = 0;

        if (!dunl()) {
            funcg = function() 
            { 
                getInformation(1, true);
            } 

            $("#splashbutton").attr("ceec", "yes");
            showSplash();

            return false;
        }
    }
    */
    if (flag) {
    }
    else {
        $("html, body").scrollTop(0);
        setTimeout(function() {    
            getInformation(wasfiltered, null, true); 
        }, 150); 
        
        return false;
    }

    $('#mask').fadeIn(300);  

    var totalLinkss = 0;
    total_yy = 0;
    total_tt = 0;
    total_hh = 0;

    $("#main").empty();
    rendermap = new Map();
    rendermapindex = 0;
    rendermapcurr = 0;
    scrollcurr = 0;

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
                        if (showAll) {
                            val = recordfromdata;
                        }
                        else {
                            val.id = "0";
                        }
                        
                        processtmp = false;
                    }
                }
                else {
                    if (showAll) {
                        val = recordfromdata;
                    }
                    else {
                        val.id = "0";
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
                        if (showAll) {
                            val = recordfromdata;
                        }
                        else {
                            val.id = "0";
                        }
                        
                        processtmp = false;
                    }
                }
                else {
                    if (showAll) {
                        val = recordfromdata;
                    }
                    else {
                        val.id = "0";
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
                        
                        if (ind < 7)
                            renderLink(val);
                        else 
                            storeInMap(val);
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

        $('#tcnumber').text(totalLinkss + " Links");
        $('#tccateg').text("In " + $('#selectedcattext').val());

        $('#tct').text(total_tt);
        $('#tcy').text(total_yy);
        $('#tch').text(total_hh);

        $('#main').find('.tweet').sort(function (a, b) {
            return Number($(b).attr('cdate')) - Number($(a).attr('cdate'));
        }).appendTo('#main');
        
        setTimeout(function() { 
            var found = customizeTweets(1);

            sleep(100);  
            $('#tweetcount').fadeIn(1200);
            $('#mask').fadeOut(1200);

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
                                          
                            }
                        }, 2500); 
                    }
                }, 1500);
            }
        }, 500);

        if (totalLinkss > 0) {
            //if (wasfiltered != 2)
                //showMessage("Search Results", 2000);
        }
        else {

            $('#mask').fadeOut(600);  
            $('#tweetcount').fadeOut(800);
            showMessage("No Links Found", 2000);
        }
    }); 
}
  
function storeInMap(val) {

    rendermap.set(rendermapindex, val);
    rendermapindex = rendermapindex + 1;

    console.log("storeInMap: " + val.id);
}

function renderLink(val, customize) {
    console.log("renderLink: " + val.id);
    var tagdispalay = " --";
    var expandclass = "";
    var color = "";
    var isdeleted = readCookie(val.id + "isdeleted");
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

        newtweetobj.attr('id', val.id);

        if (customize) {
            preCustomize(newtweetobj);
        }
    }
    else {
        newtweetobj.append($(val.tweet));
        
        newtweetobj.find(".bottomstripline.line1").html(val.info);
        
        newtweetobj.attr('id', val.id);

        var currid = val.id;
        //setTimeout( function() {                                 
            // xyzdouble
            if (!isMobile) {
                //document.getElementById("contentin" + currid).addEventListener("click", clickHandler);
            }
        //}, 200 );
    }
}

function preCustomize(newtweetobj) {

    setTimeout(function(){
                
        var tweetId = newtweetobj.find(".twitter-tweet.twitter-tweet-rendered").attr("id");

        if (tweetId && tweetId.length > 0) {
            console.log("Encontrou 1 - " + tweetId);
            customizeSingleTweet(tweetId.substring(15));
        }
        else {
            setTimeout(function(){
                tweetId = newtweetobj.find(".twitter-tweet.twitter-tweet-rendered").attr("id");

                if (tweetId && tweetId.length > 0) {
                    console.log("Encontrou 2 - " + tweetId);
                    customizeSingleTweet(tweetId.substring(15));
                }
                else {
                    setTimeout(function(){
                        console.log("Encontrou 2 - " + tweetId);
                        tweetId = newtweetobj.find(".twitter-tweet.twitter-tweet-rendered").attr("id");

                        if (tweetId && tweetId.length > 0) {
                            customizeSingleTweet(tweetId.substring(15));
                        }
        
                    }, 250);
                }
            }, 250);
        }
    }, 250);

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
                        if (showAll) {
                            val = recordfromdata;
                        }
                        else {
                            val.id = "0";
                        }
                        
                        processtmp = false;
                    }
                }
                else {
                    if (showAll) {
                        val = recordfromdata;
                    }
                    else {
                        val.id = "0";
                    }
                }
                var isdeleted = readCookie(val.id + "isdeleted");

                if (!(val && val.deleted == "yes") && !(isdeleted && isdeleted == "yes") && val.id.includes(id) && val.id != "0") {
                    $("#main").empty();
                    $('#tweetcount').hide();  
    
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
    
                    var newtweet = $('#main').append($('<div id="inid" cdate="' + val.date + '" curl="' + val.url + '" class="pobj tweet' + xclass + '"></div>'));
                    var newtweetobj = $('#inid');
    
                    newtweetobj.append($('<div style="z-index: 0;background: var(--soft-color);height: 39px;" class="innermask"><i class="fa fa-circle-o-notch fa-spin" style="display:none;"></i></div><div class="gradiantback"></div><div class="bottomgradiantback"></div><i onclick="javascript: expandCat(this)" id="expand" class="clicable fa fa-edit ' + expandclass + '"></i><i class="linkbar clicable fa fa-' + typefa + '" style="' + color + '" onclick="javascript: externallinkopen(this, \'' + val.url + '\', \'' + val.id + '\')"></i>'));
                    
                    newtweetobj.append($('<div class="tags"><i onclick="javascript: expandscreen(this)" class="fa fa-square-o"></i><b>Tags: </b>' + tagdispalay + '</div>'));
                    
                    if (val.type == "T") {
                        newtweetobj.append($('<div class="innertweet"></div>'));
                        newtweetobj.find('.innertweet').append(val.tweet);
                        newtweetobj.attr('id', val.id);

                        preCustomize(newtweetobj);
                    }
                    else {
                        newtweetobj.append($(val.tweet));

                        newtweetobj.find(".bottomstripline.line1").html(val.info);
                        
                        newtweetobj.attr('id', val.id);
                
                        var currid = val.id;
                        
                        if (!isMobile) {
                            document.getElementById("contentin" + currid).addEventListener("click", clickHandler);
                        }
                    }
        
                    $('#mask').fadeOut(300);
    
                    if (flag)
                        showMessage("This Link is the same as the one you are trying to add", 6000); 

                    $('#tweetcount').hide();
                    $('body, html').css('overflow-y', 'auto');

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
                        if (showAll) {
                            val = recordfromdata;
                        }
                        else {
                            val.id = "0";
                        }
                        
                        processtmp = false;
                    }
                }
                else {
                    if (showAll) {
                        val = recordfromdata;
                    }
                    else {
                        val.id = "0";
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
                        if (showAll) {
                            val = recordfromdata;
                        }
                        else {
                            val.id = "0";
                        }
                        
                        processtmp = false;
                    }
                }
                else {
                    if (showAll) {
                        val = recordfromdata;
                    }
                    else {
                        val.id = "0";
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



