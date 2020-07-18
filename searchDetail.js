

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
    
        $("#searchpopup table:not(.buttonstable)").each( function( index, element ) {
            var table = $(element);
    
            table.css('max-height', setHeight);
            table.find('.sectionedittd i').addClass('fa-angle-down').removeClass('fa-angle-up').show();
            table.find('td.el').addClass('ellipsis');
        });
    }, 700);
}

function expandsection(obj, e) {
    e.stopPropagation();
    var tagstable = $('#editTags'); 
        
    if ($(obj).hasClass("fa-chevron-down")) {
        $(obj).removeClass("fa-chevron-down");
        $(obj).addClass("fa-chevron-up");

        $(obj).css("top", "auto");
        $(obj).css("bottom", "0px");
        tagstable.css("max-height", "4000px");
    }
    else {
        $(obj).removeClass("fa-chevron-up");
        $(obj).addClass("fa-chevron-down");
        tagstable.css('transition', 'all 0.01s');
        setTimeout(function(){
            tagstable.css('transition', 'max-height 0.7s ease');
        }, 800);
        $(obj).css("top", "");

        if ($('body').hasClass('big'))
            tagstable.css("max-height", tagstable.attr("cmaxheightbig"));
        else
            tagstable.css("max-height", tagstable.attr("cmaxheight"));
    }
}


function changecriteria(e, obj, tableparam, flag) {

    if (flag) {

    }
    else if (dblTapFlag)
        return false;

    dblTapFlag = true;
    
    var table = null;
    if (obj) {
        table = $(obj).parent().parent();
    }
    else {
        table = $("#" + tableparam);
    }

    if (e)
        e.stopPropagation();

    var searchbutton = $("#sear");
    var iTop = "-2px";
    var setHeight = "26px";
    var offset = 0;
    if ($('body').hasClass('big')) {
        setHeight = "37px";
        iTop = "-1px";
        offset = 5;
    }

    var titletext = table.find(".titletext");
		
    if (table.css('max-height') == setHeight) {
        if (obj) {
            titletext.css('transition', 'none');
            titletext.css("opacity", 0); 

            $('#searchpopup').find("table:not(.buttonstable)").each( function( index, element ) {
                var othertable = $(element);
                othertable.css('transition', 'max-height .7s');
                othertable.css('max-height', setHeight);
                othertable.find('.sectionedittd i').addClass('fa-angle-down').removeClass('fa-angle-up').css("top", iTop);

            });
    
            setTimeout(function() { 
                $('#searchpopup').find("table:not(.buttonstable)").each( function( index, element ) {
                    var othertable = $(element);
    
                    if (othertable.attr("id") != table.attr("id")) {
                        othertable.find(".togglepos").css("position", "absolute"); 
                        othertable.find('td.el').addClass('ellipsis');
                    }
                });
            }, 701);

            table.find(".togglepos").css("position", ""); 

            table.css('transition', 'max-height .7s');
    
            if (table.attr("cmaxheight")) {
                if ($('body').hasClass('big')) {
                    table.css('max-height', table.attr("cmaxheightbig"));
                }
                else {
                    table.css('max-height', table.attr("cmaxheight"));
                }
            }   

    
            table.find('.sectionedittd i').addClass('fa-angle-up').removeClass('fa-angle-down').css("top", "-4px");
            
            table.find('td.el').removeClass('ellipsis');
            setTimeout(function() { 
                dblTapFlag = false;

                searchbutton.css('transition', 'all .8s ease');

                if (table.attr("cheight"))
                    offset = offset + Number(table.attr("cheight"));  
        
                searchbutton.css("top", (table.offset().top + 15 + offset) + "px");

                titletext.css('transition', 'opacity .7s ease');
                titletext.css("opacity", 1); 
            }, 701);
        }
    }
    else {
        titletext.css('transition', 'none');
        titletext.css("opacity", 0); 
        table.css('transition', 'max-height 0.7s');
        table.css('max-height', setHeight);
        table.find('.sectionedittd i').addClass('fa-angle-down').removeClass('fa-angle-up').css("top", iTop);

        searchbutton.css('transition', 'all .7s ease');
        setTimeout(function() { 
            table.find('td.el').addClass('ellipsis');
            table.find(".togglepos").css("position", "absolute"); 
            if ($('body').hasClass('big')) 
                searchbutton.css("top", ($("#searchpopup > div").height() - 53) + "px");
            else
                searchbutton.css("top", ($("#searchpopup > div").height() - 41) + "px");
            
            dblTapFlag = false;        
            titletext.css('transition', 'opacity .7s ease');
            titletext.css("opacity", 1); 
        }, 701);
    }
}

function changecriteriasilent(tableparam) {

    var table = $("#" + tableparam);

    var setHeight = "26px";
    var iTop = "-2px";
    if ($('body').hasClass('big')) {
        setHeight = "37px";
        iTop = "-1px";
    }

    var searchbutton = $("#sear");

    table.css('transition', 'max-height 0.01s');
    searchbutton.css('transition', 'all .01s ease');

    if (table.css('max-height') == setHeight) {

    }
    else {

        table.css('max-height', setHeight);
        table.find('.sectionedittd i').addClass('fa-angle-down').removeClass('fa-angle-up').css("top", iTop);
        table.find('td.el').addClass('ellipsis');
        table.find(".togglepos").css("position", "absolute");
        if ($('body').hasClass('big')) 
            searchbutton.css("top", ($("#searchpopup > div").height() - 53) + "px");
        else
            searchbutton.css("top", ($("#searchpopup > div").height() - 41) + "px");
    }
    
    table.css('transition', 'max-height 0.7s');
    searchbutton.css('transition', 'all .8s ease');
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
        currenttagdisplay.html("<i onclick='clearcriterion(event,this, \"filtertag\", \"searchtags\")' class='fa fa-times-circle'></i>" + $(obj).val().trim());
        currenttagdisplay.removeClass("emptyvalue");
        $("#searchtags").removeClass("emptyvalue");
        $("#searchtags").addClass("withvalue");
    }

    removeNonExistentLi("tagsearchul", "filtertag");

    createNonExistentLi("tagsearchul", "filtertag");
}

function expandtags(e, obj) {
    e.stopPropagation();
    var tagstable = $('#searchtags'); 
         
    if ($(obj).hasClass("fa-chevron-down")) {
        $(obj).removeClass("fa-chevron-down");
        $(obj).addClass("fa-chevron-up");

        $(obj).css("top", "auto");
        $(obj).css("bottom", "0px");
        tagstable.css("max-height", "4000px");
    }
    else {
        $(obj).removeClass("fa-chevron-up");
        $(obj).addClass("fa-chevron-down");
        tagstable.css('transition', 'all 0.01s');
        setTimeout(function(){
            tagstable.css('transition', 'max-height 0.7s ease');
        }, 800);
        $(obj).css("top", "");

        if ($('body').hasClass('big'))
            tagstable.css("max-height", tagstable.attr("cmaxheightbig"));
        else
            tagstable.css("max-height", tagstable.attr("cmaxheight"));
    }
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
        currentinfosearchdisplay.html("<i onclick='clearcriterion(event,this, \"filtertext\", \"searchinfo\")' class='fa fa-times-circle'></i>" + $(obj).val().trim());
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
        currentinfosearchdisplay.html("<i onclick='clearcriterion(event,this, \"filterauthor\", \"searchauthor\")' class='fa fa-times-circle'></i>" + $(obj).val().trim());
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

function resetCalendar(e) {
    if (e)
        e.stopPropagation();
    
    switch($('#calendardiv').attr("targetObj")) {
        case "filterdate1":
        case "filterdate2":
            break; 
        case "linkdate":
            datepickerAuthorChange(null);
            break; 
        case "linkcreatedate":    
            break;     
    }

    closeCalendarPopup();
}

function undoCalendar(e) {
    if (e)
        e.stopPropagation();
    
    switch($('#calendardiv').attr("targetObj")) {
        case "filterdate1":
        case "filterdate2":
            break; 
        case "linkdate":

            var date = $('#date').attr("cdate");

            if (date && date.trim().length > 0) {
                var dateFinal = new Date();
                dateFinal.setDate(Number(date.substring(6, 8)));
                dateFinal.setMonth(Number(date.substring(4, 6)) - 1);
                dateFinal.setFullYear(Number(date.substring(0, 4)));
                datepickerAuthorChange(dateFinal);
            }
            else {
                datepickerAuthorChange(null);
            }
            break; 
        case "linkcreatedate":    
            break;     
    }

    closeCalendarPopup();
}

function openCalendar(targetObj, date, doShowReset) {
    $('body, html').css('overflow-y', 'hidden');

    var currDate = null;

    if (date) {
        currDate = date;
        if (targetObj == "linkdate") {
            $("#calendardiv .fa-times-circle").show(); 
            $("#calendardiv .currdate").html("Current value: " + formatDate(date)); 
        }
        else {
            $("#calendardiv .fa-times-circle").hide(); 
        }
            
        if (doShowReset)
            $("#calendardiv .fa-undo").show();  
        else
            $("#calendardiv .fa-undo").hide(); 
    }
    else {
        if (targetObj == "linkdate") {
            $("#calendardiv .fa-times-circle").show(); 
            $("#calendardiv .currdate").html("Current value: --"); 
        }
        else {
            $("#calendardiv .fa-times-circle").hide(); 
        }
            
        if (doShowReset)
            $("#calendardiv .fa-undo").show();  
        else
            $("#calendardiv .fa-undo").hide();
                    
        currDate = new Date();
    }

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
                $( ".currentdate" ).html("<i onclick='clearcriterion(event,this, \"filterdate1\", \"searchdate\")' class='fa fa-times-circle'></i>" + "On " + $( "#filterdate1display" ).val());
            }
            else {
                $( ".currentdate" ).css("font-size", "13px");
                $( ".currentdate" ).html("<i onclick='clearcriterion(event,this, \"filterdate1\", \"searchdate\")' class='fa fa-times-circle'></i>" + "Between " + $( "#filterdate1display" ).val() + " & " + $( "#filterdate2display" ).val());
            }
            $( "#filterdate1clean" ).show();
            $( "#filterdate2clean" ).show();
        }
        else {
            $( "#filterdate1clean" ).show();
            $( "#filterdate2clean" ).hide();
            $( ".currentdate" ).html("<i onclick='clearcriterion(event,this, \"filterdate1\", \"searchdate\")' class='fa fa-times-circle'></i>" + "After " + $( "#filterdate1display" ).val());
        }
    }
    else if ($( "#filterdate2display" ).val().trim().length > 0) {
        $( "#filterdate1clean" ).hide();
        $( "#filterdate2clean" ).show();
        $( ".currentdate" ).html("<i onclick='clearcriterion(event,this, \"filterdate1\", \"searchdate\")' class='fa fa-times-circle'></i>" + "Before " + $( "#filterdate2display" ).val());
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
            datepickerAuthorChange(date);
            
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

function clearcriterion(e, obj, affectedobj, affectedtable, silent) {
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

    if (silent)
        changecriteriasilent(affectedtable);
    else 
        changecriteria(null,null, affectedtable, true);

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
        currenttagdisplay.html("<i onclick='clearcriterion(event,this, \"selectedtype\", \"searchtypes\")' class='fa fa-times-circle'></i>" + desc);
        currenttagdisplay.removeClass("emptyvalue");
        $("#searchtypes").removeClass("emptyvalue");
        $("#searchtypes").addClass("withvalue");
    }
    e.stopPropagation();
}

var openSearchPopup = function(jsonobj) 
{
    $('body, html').css('overflow-y', 'hidden');
    
    $('#titlesearch .span2').html($('#selectedcattext').val());

    updateSearchTablesHeight();
    
    $('#searchpopup').css('transition', 'transition: all 0.01s');
    $('#searchpopup').css("height", "calc(100%)");

    if ($('body').hasClass('big')) {
        $('#searchpopup').css("top", "-415px");
    }
    else {
        $('#searchpopup').css("top", "-330px");
    }

    $('#searchpopup').css("background", "transparent");

    $('#searchpopup').slideDown();

    $('#searchpopup').attr("style", "top: 0px;transition: all 0.8s cubic-bezier(0.01, 0.76, 0.65, 0.96) 0.5s, background 1.1s, height 0.2s;");

    setTimeout(function(){
        $('#searchpopup').css('background', 'var(--soft-transp-color)');
    }, 800);

    //updateTopPosition("searchpopup"); 

    $('#searchpopup').fadeIn(); 
} 

function updateSearchTablesHeight() {
    var setHeight = "26px";
    var iTop = "-2px";
    var ibuttontop = "calc(100% - -14px)";
    if ($('body').hasClass('big')) {
        ibuttontop = "calc(100% - -14px)";
        setHeight = "37px";
        iTop = "-1px";
    }

    setTimeout(function() { 
        var searchbutton = $("#sear");
        searchbutton.css('transition', 'all 0.01s ease');

        if ($('body').hasClass('big')) 
            searchbutton.css("top", ($("#searchpopup > div").height() - 53) + "px");
        else
            searchbutton.css("top", ($("#searchpopup > div").height() - 41) + "px");
    
        searchbutton.css('transition', 'all 0.6s ease');
    }, 701);

    $('#searchpopup').find("table:not(.buttonstable)").each( function( index, element ) {
        var table = $(element);
        table.css('max-height', setHeight);
        table.find('.sectionedittd i').addClass('fa-angle-down').removeClass('fa-angle-up').css("top", iTop).show();
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

    $(".currentsearchclassif").html("<i onclick='clearcriterion(event,this, \"selectedclassif\", \"searchclassif\")' class='fa fa-times-circle'></i>" + desc + $(obj).html().trim());
    $(".currentsearchclassif").removeClass("emptyvalue");
    $("#searchclassif").removeClass("emptyvalue");
    $("#searchclassif").addClass("withvalue");
}




var getInformation = function(wasfiltered, valid) {

    $('#mask').fadeIn(100);
    stopWorker();

    if (wasfiltered == 1) {
        $('#countfilter').show();
    }
    else if (wasfiltered == 2) {
        $('#countfilter').hide();
    }

    var dofiltertext = $('#filtertext').val().trim().length > 0; 
    var dofilterdate1 = $('#filterdate1').val().trim().length > 0; 
    var dofilterdate2 = $('#filterdate2').val().trim().length > 0; 
    var dofiltertag = $('#filtertag').val().trim().length > 0; 
    var dofilterauthor = $('#filterauthor').val().trim().length > 0;
    var dofiltercat = $('#selectedcat').val().length > 0 && $('#selectedcat').val() != 'all';  
    var dofiltertype = $('#selectedtype').val().trim() != "all"; 
    var dofilterclassif = $('#selectedclassif').val().trim() != "all"; 
    searchtotal = 0;
    currrenderedtweets = 0;
    linkArray = new Array();
    linkArrayToRender = new Array();
    var total_yy = 0; 
    var total_tt = 0;
    var total_hh = 0;

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

    startWorker();

    try {
        var i = 0;

        var doShowDeletedLink = true;  
        if (!$("#showdeleted2").is(":checked")) {
            doShowDeletedLink = false; 
        }
        
        while (allLinks[i]) {
            var val = allLinks[i];
        
            //startWorker();
            var dofiltertextfinal = false;
            var dofilterdate1final = false;
            var dofilterdate2final = false;
            var dofiltertagfinal = false;
            var dofiltercatfinal = false;
            var dofilterauthorfinal = false;
            var dofiltertypefinal = false;
            var dofilterclassiffinal = false;
                    
            dofiltertextfinal = !dofiltertext || searchInfo(val.info.toLowerCase(), val.tweet.toLowerCase(), $('#filtertag').val().toLowerCase());
            dofilterdate1final = !dofilterdate1 || val.date >= Number($('#filterdate1').val());
            dofilterdate2final = !dofilterdate2 || val.date <= Number($('#filterdate2').val());
            dofiltertagfinal = !dofiltertag || searchTags(val.tags.toLowerCase(), $('#filtertag').val().toLowerCase());
            dofiltercatfinal = !dofiltercat || val.categories.includes($('#selectedcat').val());
            dofilterauthorfinal = !dofilterauthor || val.author.toLowerCase().includes($('#filterauthor').val().toLowerCase());
            dofiltertypefinal = !dofiltertype || val.type == $('#selectedtype').val();
            dofilterclassiffinal = !dofilterclassif || searchClassif(val.classif, $('#selectedclassif').val(), $('#selectedclassifcombo').val());
        
            if (val.deleted == "yes")
                dofiltertextfinal = false;

            if (dofiltertextfinal && dofilterdate1final && dofiltertagfinal && dofilterdate2final
                && dofilterauthorfinal && dofiltercatfinal && dofiltertypefinal && dofilterclassiffinal
                && (doShowDeletedLink || val.deleted == "")) {

                if (val.type == "T") {
                    total_tt = total_tt + 1;
                    linkArray[searchtotal] = val.type;
                }
                else if (val.type == "Y") {
                    total_yy = total_yy + 1;
                    linkArray[searchtotal] = val.id;
                }
                else if (val.type == "H") {
                    total_hh = total_hh + 1;
                    linkArray[searchtotal] = val.id;
                }
                else {
                    linkArray[searchtotal] = val.id;
                }
/*
                if (searchtotal < 5) {
                    renderLink(val);
                } 
                else {
                    linkArrayToRender[searchtotal] = val;
                }
 */
                linkArrayToRender[searchtotal] = val;
                searchtotal++;
            }  
            i++;
        }
    }
    catch(err) {
    }

    $('#tcnumber').text(searchtotal + " Links");
    $('#tccateg').text("In " + $('#selectedcattext').val());

    $('#tct').text(total_tt);
    $('#tcy').text(total_yy);
    $('#tch').text(total_hh);


    /*
        SORT!!! 
    $('#main').find('.tweet').sort(function (a, b) {
        return Number($(b).attr('cdate')) - Number($(a).attr('cdate'));
    }).appendTo('#main'); */

    if (searchtotal > 0) {
        //if (wasfiltered != 2)
            //showMessage("Search Results", 2000);
    }
    else {
        //stopWorker();
        $('#mask').fadeOut(2000);  
        $('#tweetcount').fadeOut(1000);
        showMessage("No Links Found", 2000);
    }
}
  



function renderLink(val, flag) {
    var tagdispalay = " --";
    var expandclass = "";
    var color = "";
                    
    if (val.deleted != "") { // ID DELETED
        expandclass = hideMode ? "" : "isdeleted";    
        if (showColors)
            color = "color: red;";
    } 
    else if (showColors) {
        if (val.isnew && val.isnew != "") { // IS NEW

            expandclass = hideMode ? "" : "isnew";  
            color = "color: #00dc00;";

            tagdispalay = parseTags(val.tags);
        }
        else {
            var hasChanges = readCookie(val.id + "haschanges");
            if (hasChanges) { // HAS CHAMGES
                color = "color: #f18618;";
                if (expandclass == "isnew")
                    expandclass = hideMode ? "" : "isnewmodified";  
                else 
                    expandclass = hideMode ? "" : "ismodified";  
            } 
        }
    }
    
    tagdispalay = parseTags(val.tags);

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
    else if (val.type == "N") {
        xclass = " yt text";
        typefa = "file-text"
    }

    var newtweetobj = $('<div style="display: none;" id="inid" cdate="' + val.date + '" curl="' + val.url + '" class="pobj tweet' + xclass + '"></div>');

    if (flag) {
        $('#main').append(newtweetobj);

        if (val.type != "T") {

            newtweetobj.fadeIn(1500);

            setTimeout(function(){
                if (!isMobile) {
                    setTimeout(function(){
                        document.getElementById("contentin" + val.id).addEventListener("click", clickHandler);
                    }, 170);
                } 
            }, 1300);
        }
    }
    else {
        $('#hiddendiv').append(newtweetobj);  
    }

    newtweetobj.append($('<div style="z-index: 0;background: var(--soft-color);height: 39px;" class="innermask"><i class="fa fa-circle-o-notch fa-spin" style="display:none;"></i></div><div class="gradiantback"></div><div class="bottomgradiantback"></div><i onclick="javascript: expandCat(this)" id="expand" class="clicable fa fa-edit ' + expandclass + '"></i><i class="linkbar clicable fa fa-' + typefa + '" style="' + color + '" onclick="javascript: externallinkopen(this, \'' + val.url + '\', \'' + val.id + '\')"></i>'));
    
    newtweetobj.append($('<div class="tags"><i onclick="javascript: expandscreen(this)" class="fa fa-square-o"></i><b>Tags: </b>' + tagdispalay + '</div>'));
    
    if (val.type == "T") {
        newtweetobj.append($('<div id="tw' + val.id + '" class="innertweet"></div>'));
        var tweet = document.getElementById("tw" + val.id);

        twttr.widgets.createTweet(
            val.url.substring(val.url.indexOf("status/") + 7),  tweet,
            {
              conversation : 'none',    // or all
              cards        : 'hidden',  // or visible
              linkColor    : '#cc0000', // default is blue
              theme        : 'light'    // or dark
            })
          .then (function (el) {
            console.log("renderizou o tweet numero: " + val.id);
          });

        newtweetobj.attr('id', val.id);
    }
    else if (val.type == "N") {
        newtweetobj.append($(val.tweet));
        
        newtweetobj.attr('id', val.id);

        var displayValue = unescape(val.info).replace(/[\n\r]/g, '<br />');
        var displayValueAux = displayValue;
        var lnkmap = new Map();
        var firstindex = 0;
        var secondindex = 0;
        var linksCounter = 0;

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

        newtweetobj.find(".contentin > div").html(displayValue)
    }
    else {
        newtweetobj.append($(val.tweet));
        newtweetobj.find(".bottomstripline.line1").html(val.info);
        
        newtweetobj.attr('id', val.id);
    }
}


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
 
  
var getInformationbyid = function(id, flag) {
    $('#mask').fadeIn(300);  

    var i = 0;

    var notFound = true;
    while (allLinks[i]) {
        var val = allLinks[i];

        if (id == val.id) {

            notFound = false;
            renderLink(val, true);

            $('#mask').fadeOut(2000);
    
            if (flag)
                showMessage("This Link is the same as the one you are trying to add", 6000); 

            $('#tweetcount').hide();
            $('body, html').css('overflow-y', 'auto');
            
            break;       
        } 
         
        i++;
    }

    if (notFound) {
        $('#mask').fadeOut(300);
        showMessage("Link Not Found");
    } 
}


var getJsonbyid = function(id) {
    for (var i = 0; i < allLinks.length; i++) {
        var val = allLinks[i];

        if (val.id == id) {
            return val;
        }
    }

    return null;
}


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


var togglecriterions = function(obj) {
    if (obj)
        fixfocus(obj);
    
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


function resetFields(flag, obj) {
    if (obj)
        fixfocusli(obj);
        
    resetMainDiv();
    
    clearcriterion(null,null, "filterdate1", "searchdate", true);
    clearcriterion(null,null, "filterdate2", "searchdate", true);
    clearcriterion(null,null, "selectedtype", "searchtypes", true);
    clearcriterion(null,null, "filterauthor", "searchauthor", true);
    clearcriterion(null,null, "filtertext", "searchinfo", true);
    clearcriterion(null,null, "filtertag", "searchtags", true);
    clearcriterion(null,null, "selectedclassif", "searchclassif", true);
    filterdate1date = null;
    filterdate2date = null;
    
/*     $('#selectedcat').val("all");
    $('#selectedcattext').val("All Links");
    $('#titlesearch .span2').html("All Links"); */

    if (flag) 
        showMessage("Search Criterions Cleaned"); 
} 

function resetMainDiv() {
    $("#main").empty();
    $('#tweetcount').hide();  
} 


var existsLink = function(text, type) {
    for (var i = 0; i < allLinks.length; i++) {
        var val = allLinks[i];

        if (val.deleted == "yes") {
            if (val.type == "T") {
                if (val.tweet.includes(text.substring(1,130))) {
                    return val.id;
                }
            }
            else {
                if (val.url.localeCompare(text) == 0) {
                    return val.id;
                }
            }
        }
    }

    return null;
}



