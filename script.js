
console.log(1); 
 
var text = "";  
var origin = "";
var nextid = "";
var currentIndex = 0;
var currpage = 0;
var dosearchmore = true;
var url = "";
var urldirect = "";
var dblFlag = false;
var dblClickTimeout = null;
var addType = "T";
var processedCount = 0;
var totalLinkss = 0;
var totalGlobalLinks = 0;
var total_yy = 0; 
var total_tt = 0;
var total_hh = 0;
var hideMode = false;
var tagssloaded = false;
var catsmap = new Map();
var calendar = null;
var filterdate1date = null;
var filterdate2date = null;

$( document ).ready(function() { 

    console.log('-------------- app - BEGIN --------------');
    $( "#mask" ).fadeOut( 1100, function() {
        //alert(document.documentElement.style.getPropertyValue('--soft-transp-color'));
        $( "#mask" ).css("background", document.documentElement.style.getPropertyValue('--soft-transp-color'));
    });
    
   //$( "#mask" ).fadeOut(1100);
   //setTimeout(function(){ alert(document.documentElement.style.getPropertyValue('--soft-transp-color')); }, 3300);


    nextid = parseInt(readCookie("maxid"));

    do {
        createCookie(nextid + "templink", "", 99999);
        nextid = nextid - 1;
    }
    while (nextid > 0);
    nextid = parseInt(readCookie("maxid"));

   //createCookie("28tagchanged", null);

   var currTheme = readCookie("currTheme");
   if (currTheme && currTheme.length > 0 && currTheme != 'default') {
        changetheme(currTheme);
   }  

   catsmap.set("tvn", "To View Now");
   catsmap.set("trn", "Trending");
   catsmap.set("tvi", "To View");
   catsmap.set("tvl", "To View Long");
   catsmap.set("tre", "To Read");
   catsmap.set("trl", "To Read Long");
   catsmap.set("tke", "To keep");
   catsmap.set("imp", "Important");
   catsmap.set("cli", "Climate Change");

   countalltweets();
    setviewmode();

    var hasZoom = readCookie("hasZoom");
    if (hasZoom && hasZoom.length > 0)
        zoom(null, true);
    
    setTimeout(function(){
        $('body').removeClass('notransit'); 
    }, 1400);  

    


    openSearchPopup();
    
    

    /*
    var functorun = function(jsonvar) 
   { 
       if (jsonvar != null) {
           openSettingsPopup(jsonvar);
       }
   } 

   getJsonbyid(28, functorun);
 */
    //openMainSettingsPopup();
    
    var hasChanges = readCookie("hasChanges");

    if (hasChanges && hasChanges.length > 0) {
        $("#generateicon").addClass("haschanges");
    }


    ///////////////////////////////////////

    var paramid = getParameterByName('tweetid');
    if (paramid)
      getInformationbyid(paramid);

    ///////////////////////////////////////

    window.onscroll = function(ev) {

        if ((window.innerHeight + window.scrollY + 1800) >= document.body.offsetHeight && dosearchmore) {
            dosearchmore = false;

            if ($('#moretweets').attr('doshow') && $('#moretweets').attr('doshow') == 'yes') {
                $('#moretweets').css('opacity', 1);
                //$('#moretweets').show();

                $('#moretweets').attr('doshow', 'no');
                $("#moretweets").click();
            }
            setTimeout(function() { 
              dosearchmore = true;
            }, 2000);
        }
    };

    ///////////////////////////////////////

    $( "#openadd" ).bind( "click", function( event ) {
        openCreatePopup(); 
    });

    /*
    $( "#addtweet" ).bind( "click", function( event ) {
        if (!dblFlag) {
            dblFlag = true;
            dblClickTimeout = setTimeout(function() {     
              if (dblFlag) {
                  openCreatePopup();
                  dblFlag = false;  
              }
            }, 500);
        }
        else {
            clearTimeout(dblClickTimeout);
            
            var win = window.open('https://github.com/rasarrad/mytweetshost/edit/master/data.json', '_blank');
            win.focus();

            dblFlag = false;
        }    
      
        
    });*/

    ///////////////////////////////////////
    
    $( "#create" ).bind( "click", function( event ) {
        create();      
    });

    ///////////////////////////////////////

    $(window).scroll(function (event) {
        var scroll = $(window).scrollTop();
        if (scroll > 200) {
          $('#gotop').fadeIn(700); 
        }
        else {
          $('#gotop').fadeOut(700);
        }
    });

    ///////////////////////////////////////

    $('#filtertext, #filterauthor, #filtertag').keypress(function(event){
      
        var keycode = (event.keyCode ? event.keyCode : event.which);
      if(keycode == '13' && $(this).val().length > 0){
        getInformation(false, 1);

        if ($(window).width() < 1200) {
            $(this).blur();
        }
      }
    });    

    $('#catsinput, #tagsinput, #infoinput, #filtertext, #filterdate1, #filterdate2, #filterid, #filterauthor, #filtertag').keydown(function(e){
        e.stopPropagation();
      });
      
    /*$("#typeTT, #typeYY, #typeHH").on("click", function() {
        parseTweet();
    });*/ 
    $("#tweet").on("paste", function() {
        parseTweet();
    });

    $("#pasteinput").on("paste", function() {
        setTimeout(function(){ 
            $('#tweet').val($("#pasteinput").val());
            parseTweet(2);
            $("#pasteinput").val("");
            $("#pasteinput").blur()
        }, 0);
        

    });

    ///////////////////////////////////////

    $( "#moretweets" ).bind( "click", function( event ) {
        getInformation(true, 3);
    });

    ///////////////////////////////////////

    $( "#btnsearch" ).bind( "click", function( event ) {
      getInformation(false , 1);
    });

    ///////////////////////////////////////

    $( "#btnreset" ).bind( "click", function( event ) {
      resetFields(true);
    });
 
    ///////////////////////////////////////

    $( "#settings" ).bind( "click", function( event ) {

        fixfocus(this);

        openMainSettingsPopup();
  /* 
        if (!dblFlag) {
            dblFlag = true;
            dblClickTimeout = setTimeout(function() {     
              if (dblFlag) {
                  generate();
                  dblFlag = false;  
              }
            }, 500);
        }
        else {
            clearTimeout(dblClickTimeout);
            undogenerate();
            dblFlag = false;
        }*/
      });

    ///////////////////////////////////////

    $( "#closepopup" ).bind( "click", function( event ) {
      closePopup();
    });

    $( "#updatemaxid" ).bind( "click", function( event ) {
        if ($('#maxidinput').val() != "") {
            createCookie("maxid", pad($('#maxidinput').val(), 4));
           
            showMessage("Current ID: " +  $('#maxidinput').val());
            $('#maxidinput').val('');
        }
        else {
            showMessage("Current ID: " + readCookie("maxid"));
        } 
    });

    $( "#removetmp" ).bind( "click", function( event ) {
        if ($('#removetmpinput').val() != "") {
           
            createCookie($('#removetmpinput').val() + "templink", "", 99999);

            showMessage("Removed link number: " +  $('#removetmpinput').val());
            $('#removetmpinput').val('');
        }
        else {
            nextid = parseInt(readCookie("maxid"));
            if (!nextid)
                nextid = parseInt($("#maxid").val());

            do {
                createCookie(nextid + "templink", "", 99999);
                nextid = nextid - 1;
            }
            while (nextid > 0);
    
            showMessage("Temp Links Removed");
        } 
    });

    
    $( "#catsinput" ).change(function() {
        catsInputOnChange(this);
    });

    $( "#tagsinput" ).change(function() {
        tagsInputOnChange(this);
      });
      $( "#filtertag" ).change(function() {
        filtertagOnChange(this);
      });
      $("#filtertag").keyup(function(e) {
        filtertagOnChange(this);
      });

      $( "#classifinput" ).change(function() {
        classifInputOnChange(this);
      });

      $( ".newLayout > div" ).click(function(event) {
        event.stopPropagation();
      });

      $("#filtertext").keyup(function() {
        filterinfoOnChange(this);
      });
      $("#filtertext").change(function() {
        filterinfoOnChange(this);
      });


      $("#filterauthor").keyup(function() {
        filterauthorOnChange(this);
      });
      $("#filterauthor").change(function() {
        filterauthorOnChange(this);
      });


      $( "#filterdate1display" ).click(function() {
        $( "#filterdate1display" ).blur();  
        var value = new Date();
          if (filterdate1date != null)
            value = filterdate1date;
          $('#searchpopup').css("background", "transparent");
          
          openCalendar("filterdate1", value)
      });

      $( "#filterdate1" ).change(function() {
        filterdate1change();
      });

      $( "#filterdate2display" ).click(function() {
        $( "#filterdate2display" ).blur();

        var value = new Date();
        if (filterdate2date != null)
            value = filterdate2date;

        $('#searchpopup').css("background", "transparent");
        openCalendar("filterdate2", value)
    });

    $( "#filterdate2" ).change(function() {
      filterdate2change();
    });


      $( "#tagsselect" ).change(function() {
        // Check input( $( this ).val() ) for validity here
        if ($( this ).val() != "notag") {
            $( "#tagsinput" ).val($( "#tagsinput" ).val() + " " + $( this ).val());
            $(this).val("notag");
            $('#tagsinput').trigger("change");
            removeNonExistentLi();
        
            createNonExistentLi();
        }
      });

      $( "#classifselect" ).change(function() {
        if ($("#selectedclassif").val() != "all") {
            var desc = "Greater than ";

            if ($("#classifselect").val() == "=") {
                desc = "Equal to ";
            }
            else if ($("#classifselect").val() == "<") {
                desc = "Less than ";
            }
        
            $(".currentsearchclassif").html(desc + $("#selectedclassif").val() + "<i onclick='clearcriterion(event,this, \"selectedclassif\", \"searchclassif\")' class='fa fa-times-circle'></i>");
            
        }
      });


      $( "#tagsearchselect" ).change(function() {
        // Check input( $( this ).val() ) for validity here
        if ($( this ).val() != "notag") {
            $( "#filtertag" ).val($( "#filtertag" ).val() + " " + $( this ).val());
            $(this).val("notag");
            $('#filtertag').trigger("change");

            removeNonExistentLi("tagsearchul", "filtertag");

            createNonExistentLi("tagsearchul", "filtertag");
        }
      });

    document.getElementById("toptitle").addEventListener('click', () => {
        navigator.clipboard.readText()
        .then(text => {
            if (!dblFlag) {
                closeallnewlayout();
                $('body, html').css('overflow-y', 'hidden');
                
                dblFlag = true;
                dblClickTimeout = setTimeout(function() {     
                  if (dblFlag) {
                      openPopupParsed(text, 2);
                      dblFlag = false;  
                  }
                }, 500);
            }
            else {
                clearTimeout(dblClickTimeout);
                
                changeviewmode();
    
                dblFlag = false;
            }  
        })
        .catch(err => {
            console.log('Something went wrong', err);
        })
    });

    document.getElementById("addtweet").addEventListener('click', () => {
        navigator.clipboard.readText()
        .then(text => {
            $( "#addtweet" ).blur();
            closeallnewlayout();
            $('body, html').css('overflow-y', 'hidden');
            
            console.log(document.getElementById("addtweet"))
            //fixfocus(document.getElementById("addtweet"));
            if (!dblFlag) {
                dblFlag = true;
                dblClickTimeout = setTimeout(function() {     
                  if (dblFlag) {
                      openPopupParsed(text, 1);
                      dblFlag = false;  
                  }
                }, 500);
            }
            else {
                clearTimeout(dblClickTimeout);
                
                if (hideMode) {
                    openPopupParsed(text, 1);
                }
                else {
                    var win = window.open('https://github.com/rasarrad/mytweetshost/edit/master/data.json', '_blank');
                    win.focus();
                }
    
                dblFlag = false;
            }  
        })
        .catch(err => {
            console.log('Something went wrong', err);
        })
    });

});

$.fn.isChildOverflowing = function (child) {
    var p = $(this).get(0);
    var el = $(child).get(0);
    return (el.offsetTop < p.offsetTop || el.offsetLeft < p.offsetLeft) ||
      (el.offsetTop + el.offsetHeight > p.offsetTop + p.offsetHeight || el.offsetLeft + el.offsetWidth > p.offsetLeft + p.offsetWidth);
  };

    function openPopupParsed(text, type) {
        $('#mask').fadeIn(600);  
        setTimeout(function() { 
            resetFieldsPopup(); 
            $('#tweet').val(text);

            parseTweet(type);

        }, 300);
    }

    function setviewmode() {
        var hideModeVar = readCookie("hideMode");
        if (hideModeVar && hideModeVar.length > 0) {
            hideMode = true;
            //$("#generate").addClass("hidemode");
        }
    }

    function changeviewmode() {
        if (hideMode) {
            hideMode = false;
            //$("#generate").removeClass("hidemode");
            createCookie("hideMode", "");
            showMessage("Hide Mode Deactivated");
        }
        else {
            hideMode = true;
            //$("#generate").addClass("hidemode");
            createCookie("hideMode", "yes");
            showMessage("Hide Mode Activated");
        }
        resetFields(false);
    }

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

function changetheme(type, desc) {
    var high_color = "";
    var text_color = "";
    var dark_color = "";
    var softdark_color = "";
    var soft_color = "";
    var soft_transp_color = "";
    createCookie("currTheme", type);

    switch(type) {
        case "default":
            high_color = "#45cae7";
            text_color = "#6db0bf";
            dark_color = "#001b30";
            softdark_color = "#003156";
            soft_color = "#004a86";
            soft_transp_color = "#001b30cc";
            document.querySelector('meta[name="theme-color"]').setAttribute('content',  '#003156');
            $('#mainsettings .currenttheme').html('Twitter Lines'); 
            break;

        case "red":
            high_color = "#fdb9b9";
            text_color = "#f79393";
            dark_color = "#630000";
            softdark_color = "#af0000";
            soft_color = "#ea0000";
            soft_transp_color = "#630000c2";  
            document.querySelector('meta[name="theme-color"]').setAttribute('content',  '#af0000');
            $('#mainsettings .currenttheme').html('Red Tide'); 
            break;

        case "gray":
            high_color = "#313131";
            text_color = "#3a3a3a";
            dark_color = "#909090";
            softdark_color = "#bbbbbb";
            soft_color = "#ffffff";
            soft_transp_color = "#3c3c3cbd"; 
            document.querySelector('meta[name="theme-color"]').setAttribute('content',  '#999');
            $('#mainsettings .currenttheme').html('Shades Of Gray'); 
            break;

        case "green":
            high_color = "#fdfd15";
            text_color = "#f7f768";
            dark_color = "#005411";
            softdark_color = "#179631";
            soft_color = "#25c345";
            soft_transp_color = "#04290bc4"; 
            document.querySelector('meta[name="theme-color"]').setAttribute('content',  '#179631');
            $('#mainsettings .currenttheme').html('Green Army'); 
            break; 
    }

    document.documentElement.style.setProperty('--high-color', high_color);
    document.documentElement.style.setProperty('--text-color', text_color);
    document.documentElement.style.setProperty('--dark-color', dark_color);
    document.documentElement.style.setProperty('--softdark-color', softdark_color);
    document.documentElement.style.setProperty('--soft-color', soft_color);
    document.documentElement.style.setProperty('--soft-transp-color', soft_transp_color);
}



function getParameterByName(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}




/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function openmenu(obj, flag) {
    if (obj)
        fixfocus(obj);

    /*
    if ($(window).width() > 1200) {
        if ($('#menu').css('width') == '0px') {
            $('#menu').css('width', '180px');
        }
        else {
            $('#menu').css('width', '0px');
        }
    }
    else { */
        if ($('#mainmenu').css("display") == "none") {
            var setHeight = "18px";
            if ($('body').hasClass('big')) {
                setHeight = "28px";
            }
            $("#mainmenu.newLayout table.defaulttablerow").each( function( index, element ) {
                var table = $(element);
                table.css('transition', 'max-height .01s');
                table.css('max-height', setHeight);
            });

            if (flag) {
                $('#searchpopup').css("background", "transparent");
                $('#mainmenu').attr("fromsearch", "yes");
            }
            else {
                closeallnewlayout();
            }

            $('body, html').css('overflow-y', 'hidden');
    
            $('#mainmenu').fadeIn(600);
        }
        else {
            closeallnewlayout();

            $('body, html').css('overflow-y', 'auto');
        }
    //}
}

function closeallnewlayout(bj) {
    $('.newLayout').fadeOut(300);
}


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function gotop(e) {
    e.stopPropagation();
    $(window).scrollTop( 0 );
}   


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function internallinkcopy(obj) {
    fixfocus(obj);
    
    $('#linkresult').val("https://sleepy-mclean-3aea2d.netlify.com/?tweetid=" + $('#linkChange').attr('cid'));
    $("#linkresult").select();
    document.execCommand('copy');
    $("#linkresult").blur();
    showMessage("Internal Link Copied To Clipboard"); 
}


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function externallinkopen(obj, link, id) {
    fixfocus(obj);
    $('#linkresult').val(link);
    $("#linkresult").select();
    document.execCommand('copy');
    $("#linkresult").blur();
    var win = window.open(link, '_blank');
    win.focus();
    //showMessage("External Link Copied To Clipboard"); 
}

function externallinkcopy(obj) {
    fixfocus(obj);
    $('#linkresult').val($('#linkChange').attr('clink'));
    $("#linkresult").select();
    document.execCommand('copy');
    $("#linkresult").blur();
    showMessage("External Link Copied To Clipboard"); 
}

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


var clickmenu = function(val, text) {    
    resetFields();

    $('#selectedcat').val(val);
    $('#selectedcattext').val(text);

    if ($('#mainmenu').attr("fromsearch") == "yes") {
        closeMenuPopup();
        $('#searchpopup').css("background", document.documentElement.style.getPropertyValue('--soft-transp-color'));
        $('#titlesearch').html("(" + $('#selectedcattext').val() + ")");
        $('#mainmenu').attr("fromsearch", "");
    }
    else {
        if ($(window).width() > 1200) {
            openmenu();
        }
        else {
            closeMenuPopup();
        }
        
        getInformation(false, 2);
    }
} 
  

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function pad (str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
}


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function getMonthFromString(mon){
    return new Date(Date.parse(mon +" 1, 2012")).getMonth()+1
}


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function closetagpopup(obj, id) {
    $("#changetags").fadeOut();
}   


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function showMessage(text, speed, icon, iconstyle, undofunc, undotext) {
    var mainDiv = $("#stripmessage");
    var dospeed = 3500;
    if (speed)
      dospeed = speed;

    mainDiv.find('i.fa').attr('class', 'fa');
    if (icon) {
        mainDiv.find('i.fa').addClass(icon);

        if (iconstyle != '')
            mainDiv.find('i.fa').attr('style', iconstyle);
        mainDiv.find('i.fa').show();
    }
    else {
        mainDiv.find('i.fa').hide();
    }

    $("#stripfunc").unbind("click");
    if (undofunc) {
        $("#stripfunc").bind("click", undofunc);
        $("#stripfunc").text(undotext);
        mainDiv.find('#stripfunc').show();
    }
    else {
        mainDiv.find('#stripfunc').hide();
    }
    
    mainDiv.css("transition", "none");
    $("#stripmessage .striptext").css("transition", "none");
    mainDiv.css("top", "0px");
    mainDiv.css("background", "rgba(0, 0, 0, 0.6)");
    $("#stripmessage .striptext").css("top", "calc(50% - 27px)");
    $("#stripmessage .poptitle").text(text);

    mainDiv.fadeIn("slow", function(){
      setTimeout(function() { 
          mainDiv.css("transition", "top 1s");
          mainDiv.css("top", "100%");
          
          $("#stripmessage .striptext").css("transition", "top 1s");
          mainDiv.css("background", "rgba(0, 0, 0, 0)");
          $("#stripmessage .striptext").css("top", "calc(0% - 71px)");
          setTimeout(function() { 
               mainDiv.fadeOut("slow");
            }, dospeed);
        }, 900);
    });
}   


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";               

    document.cookie = name + "=" + value + expires + "; path=/";
}


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////@ts-check


function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function eraseCookie(name) {
    createCookie(name, null, -1);
}  
    

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
    
var ctrlDown = false,
ctrlKey = 17,
vKey = 86;

$(document).keydown(function(e) {
    if (e.keyCode == ctrlKey) ctrlDown = true;
}).keyup(function(e) {
    if (e.keyCode == ctrlKey) ctrlDown = false;
});


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

/*
$(document).keydown(function(e) {
    if ($(e.currentTarget).is($(document))) {
        if (ctrlDown && (e.keyCode == vKey)) {
            navigator.clipboard.readText().then(text => {
                setTimeout(function() { 
                    resetFieldsPopup(); 
                    $('#tweet').val(text);

                    if ($(".addpopup").css('display') == 'none') {
                      openCreatePopup(true);
                    }
                    parseTweet();
                }, 300);
            }).catch(err => {
                console.error('Failed to read clipboard contents: ', err);
            });
        } 
    }
}); 
*/
$(document).on({
    'dragover dragenter': function(e) {
        e.preventDefault();
        e.stopPropagation();
    },
    'drop': function(e) {
        e.preventDefault();  
        e.stopPropagation();

        e.originalEvent.dataTransfer.items[0].getAsString(function(str)
        {
            if (str.substring(0,3) == "www") {
                showMessage("Invalid Link - Must be HTTPS"); 
            }
            else {
                resetFieldsPopup(); 

                if ($(".addpopup").css('display') == 'none') {
                  openCreatePopup(true);
                }

                $('#tweet').val("https://www." + str);
                parseTweet();
            }
            
        })

    }
});
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function countmove(obj) {
    if (!dblFlag) {
        dblFlag = true;

        $(obj).css('opacity', '0.8');
        
        if ($(obj).css('bottom') == "54px") {
            $(obj).css('bottom', 'calc(100% - 140px)');
        }
        else {
            $(obj).css('bottom', '54px');
        }
        setTimeout(function() { 
            dblFlag = false;
            setTimeout(function() { 
                $(obj).css('opacity', '0.52');
            }, 2500);
        }, 500);
    }
}  



function expandscreen(obj) {
    var tweeetObj = $(obj).parent().parent();

    if (tweeetObj.find(".innertweet").length > 0) {
        var id = tweeetObj.find("twitter-widget").attr("id").substring(tweeetObj.find("twitter-widget").attr("id").lastIndexOf("-") + 1);
        if (tweeetObj.attr("expanded") != "yes") {
            tweeetObj.find(".innertweet").removeClass("linkCollapsed");
            tweeetObj.find(".innertweet").addClass("linkExpanded");
            tweeetObj.attr("expanded","yes");
        }
        else {
            tweeetObj.find(".innertweet").removeClass("linkExpanded");
            tweeetObj.find(".innertweet").addClass("linkCollapsed");
            tweeetObj.attr("expanded", "no");
        }

    }
    else {
        if (tweeetObj.attr("expanded") != "yes") {
            tweeetObj.find("iframe").removeClass("linkIframeCollapsed");
            tweeetObj.find("iframe").addClass("linkIframeExpanded");
            tweeetObj.attr("expanded","yes");
        }
        else {
            tweeetObj.find("iframe").removeClass("linkIframeExpanded");
            tweeetObj.find("iframe").addClass("linkIframeCollapsed");
            tweeetObj.attr("expanded", "no");
        }
    }
}  
