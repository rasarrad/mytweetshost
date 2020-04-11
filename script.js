
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
var existingId = null;
var xUp = null;                                    
var yUp = null;  
var xDiff = null;  
var yDiff = null;  
var xDown = null;                                                        
var yDown = null;
var currObjSwipe = null;
var lastTouch = null;
var searchtotal = 0;

var currTheme = readCookie("currTheme");
if (currTheme && currTheme.length > 0 && currTheme != 'default') {
     changetheme(currTheme, true);
}  

dosearchmore = false;
dblFlag = true;

console.log("----window.innerWidth-----window.innerHeight------navigator.userAgent-----");
console.log(window.innerWidth + " - " + window.innerHeight + " - " + navigator.userAgent);
console.log("--------------------------------------------------------------------------");
/* 
setTimeout(function() {
  dosearchmore = true;    
  if (!dblFlag) {
      $( "#mask" ).fadeOut( 800, function() {
            var style = window.getComputedStyle(body, null);

            $("#mask").css("background", style.getPropertyValue('--soft-transp-color'));
            $("#mask .fa-folder-open").hide();
            $("#mask > div" ).hide();
            $("#mask > .fa-circle-o-notch").show();
      });
  }
}, 2500);
*/
function visibilityHandler() {
    var hash = '#bg';
    if (document.hidden && !window.location.hash) {
      window.history.replaceState(null, null, window.location + hash);
    } else if (!document.hidden && window.location.hash == hash) {
      var l = '' + window.location;
      window.history.replaceState(null, null, l.substr(0, l.length - hash.length));
    }
  };

$( document ).ready(function() { 
    /*
    window.mobileAndTabletcheck = function() {
        var check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
      };
    */

    /*
    nextid = parseInt(readCookie("maxid"));

    do {
        createCookie(nextid + "templink", "", 99999);
        nextid = nextid - 1;
    }
    while (nextid > 0);

    nextid = parseInt(readCookie("maxid"));




    document.addEventListener('visibilitychange', visibilityHandler, false);
    visibilityHandler();
    
*/

   //createCookie("28tagchanged", null);

   catsmap.set("tvn", "New/Ongoing");
   catsmap.set("trn", "New / Hot / Trending");
   catsmap.set("tvi", "To Watch");
   catsmap.set("tvl", "Documentaries / Films");
   catsmap.set("tre", "Fast Reading");
   catsmap.set("trl", "Long Reading");
   catsmap.set("tke", "Important / To Keep");
   catsmap.set("imp", "Shocking Truth");
   catsmap.set("cli", "My Tweets");

   $( "input, textarea" ).each( function( index, element ){
        $(element).attr("spellcheck", "false");
        $(element).attr("autocomplete", "none");
        $(element).attr("additionalAttributes", "{autocomplete: 'none'}");
   });

   var showDeleted = getshowdeletedcookie();
   
   if (showDeleted == "true") {
    $("#showdeleted").prop('checked', true);
    $("#showdeleted2").prop('checked', true);
   }
   else {
    $("#showdeleted").prop('checked', false);
    $("#showdeleted2").prop('checked', false);
   }
   
   
    setTimeout(function(){
        countalltweets();

        setTimeout(function(){
            $( "#mask" ).fadeOut( 800, function() {
                var style = window.getComputedStyle(body, null);
        
                $("#mask").css("background", style.getPropertyValue('--soft-transp-color'));
                $("#mask .fa-folder-open").hide();
                $("#mask > div" ).hide();
                $("#mask > .fa-circle-o-notch").show();
            });
        }, 900); 

    }, 1); 
   
    setviewmode();

    var hasZoom = readCookie("hasZoom");
    if (hasZoom && hasZoom.length > 0)
        zoom(null, true);
    
    setTimeout(function(){
        $('body').removeClass('notransit'); 
    }, 1400);  

    
    //showSplash();

    //openSearchPopup();
    
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
    document.addEventListener('touchstart', handleTouchStart, false);        
    document.addEventListener('touchmove', handleTouchMove, false);
    document.addEventListener('touchend', handleTouchEnd, false);
    
    
    function getParentObjId(obj) {
        var found = false;
        var currObj = obj;

        if (currObj.hasClass("pobj")) {
    
            if (!currObj.hasClass("body")) {
                return currObj.attr("id");
            }

            return "";
        }

        do {
            currObj = currObj.parent();
    
            if (currObj.hasClass("pobj")) {
    
                if (!currObj.hasClass("body")) {
                    return currObj.attr("id");
                }
    
                return "";
            }
        }
        while (!found);
      }   
    
    
    
    function getTouches(evt) {
      currObjSwipe = getParentObjId($(event.target));
      console.log(2222)
      console.log(currObjSwipe)
      return evt.touches ||             // browser API
             evt.originalEvent.touches; // jQuery
    }                                                     
    
    function handleTouchStart(evt) {
        const firstTouch = getTouches(evt)[0];                                      
        xDown = firstTouch.clientX;                                      
        yDown = firstTouch.clientY;   
        
        dblFlag = false;  
        setTimeout(function() {    
            dblFlag = true; 
            dblClickTimeout = setTimeout(function() {    
                dblFlag = false;  
          }, 110);
        }, 10);                
    };                                                
    
    function handleTouchEnd(evt) {
        if (dblFlag && lastTouch) {                       
           console.log(1111)
           console.log(currObjSwipe)
            if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
                if ( xDiff > 0 ) {
                    executeSwipeFunction(currObjSwipe, "left");
                } else {
                    executeSwipeFunction(currObjSwipe, "right");
                }                       
            } else {
                if ( yDiff > 0 ) {
                    executeSwipeFunction(currObjSwipe, "up");
                } else {
                    executeSwipeFunction(currObjSwipe, "down");
                }                                                                 
            }
        }  
        dblFlag = false;
        xDown = null;
        yDown = null;   
        lastTouch = null;                             
    }; 
    
    
    function executeSwipeFunction(obj, type) {

        switch(obj) {
            case "main":
            case "backdiv":
                processBackdivFuncs(type);
                break;
        
            case "mainmenu":
                processMainmenuFuncs(type);
                break;

            case "mainsettings":
                processMainsettingsFuncs(type);
                break;
            default:
                processLinkFuncs(obj, type);
                break;       
        }
        currObjSwipe = null;
    
    }
    
    function processBackdivFuncs(type) {
        switch(type) {
            case "up":
                openSearchPopup()
                console.log("backdiv up-----------------------------------------------");
                break;
    
            case "down":
                openmenu()
                console.log("backdiv down-----------------------------------------------");
                break;
            case "left":
                openmenu()
                console.log("backdiv left-----------------------------------------------");
                break;
    
            case "right":
                openSearchPopup()
                console.log("backdiv right-----------------------------------------------");
                break;
        }
    }  
    
    function processMainsettingsFuncs(type) {
        switch(type) {
            case "up":
                closeMainSettingsPopup();
                console.log("mainsettings up-----------------------------------------------");
                break;
    
            case "down":
                closeMainSettingsPopup();
                console.log("mainsettings down-----------------------------------------------");
                break;
            case "left":
                closeMainSettingsPopup();
                console.log("mainsettings left-----------------------------------------------");
                break;
    
            case "right":
                closeMainSettingsPopup();
                console.log("mainsettings right-----------------------------------------------");
                break;
        }
    }  
    
    function processMainmenuFuncs(type) {
        switch(type) {
            case "up":
                closeMenuPopup()
                console.log("Mainmenu up-----------------------------------------------");
                break;
    
            case "down":
                closeMenuPopup()
                console.log("Mainmenu down-----------------------------------------------");
                break;
            case "left":
                showMessage("Show Deleted Links Toggled", 2500, null, null, null, null, true, 500);
                $("#showdeleted2").trigger("click");
                $("#showdeleted").trigger("click");
                console.log("Mainmenu left-----------------------------------------------");
                break;
    
            case "right":
                clickmenu('all', 'All Links');
                showMessage("All Links Displayed", 2500, null, null, null, null, true, 500);
                console.log("Mainmenu right-----------------------------------------------");
                break;
        }
    }  

    function processLinkFuncs(idLink, type) {

        if (parseInt(idLink) > -1) {
            switch(type) {
                case "up":
                    //console.log("UP   UP   UP   UP   UP   UP   UP   UP   UP   UP   UP");

                    openSearchPopup()

                    /* 
                    
                    https://stackoverflow.com/questions/22629286/scroll-down-a-webpage-by-constant-speed/22629859
                    
                    setTimeout(function() { 
                        gotop();
                    }, 300); 
                    
                    showMessage("Scrolled to top", 2500, null, null, null, null, true, 500);
                     */
                    break;
        
                case "down":// apagar pesquisa - mantendo os critérios
                    /*console.log("DOWN   DOWN   DOWN   DOWN   DOWN   DOWN   DOWN   DOWN   DOWN   DOWN   ");*/
                    
                    $("#main").empty();
                    $('#moretweets').hide();
                    $('#tweetcount').hide(); 
                    showMessage("Search cleared", 2500, null, null, null, null, true, 500);

                    break;
                case "left": // apagar pesquisa - mantendo os critérios 
                    /*console.log("LEFT   LEFT   LEFT   LEFT   LEFT   LEFT   LEFT   LEFT   LEFT   LEFT   ");*/
                 
                    $('#linkresult').val($('#' + idLink).attr('curl'));
                    $("#linkresult").focus();
                    sleep(100);  
                    $("#linkresult").select();
                    document.execCommand('copy');
                    sleep(100);  
                    $("#linkresult").blur();
                    showMessage("Link Copied To Clipboard", 2500, null, null, null, null, true, 500);

                    break;
        
                case "right": // abrir link
                    //console.log("RIGHT   RIGHT   RIGHT   RIGHT   RIGHT   RIGHT   RIGHT   RIGHT   RIGHT   RIGHT   ");
                    expandCat(null, idLink);
                    break;
            }
        }
    }  
    
    function handleTouchMove(evt) {
        if ( ! xDown || ! yDown ) {
            return;
        }

        if (evt.touches[0] != null)
            lastTouch = evt.touches[0];

        xUp = evt.touches[0].clientX;                                    
        yUp = evt.touches[0].clientY;
    
        xDiff = xDown - xUp;
        yDiff = yDown - yUp; 
        
    };

    
    $( "#showdeleted" ).bind( "click", function( event ) {
        if ($("#showdeleted").is(":checked")) {
            $("#showdeleted2").prop('checked', true);
            setshowdeletedcookie("true");
        }
        else {
            $("#showdeleted2").prop('checked', false);
            setshowdeletedcookie("false");
        }
        countalltweets();
    });


    $( "#showdeleted2" ).bind( "click", function( event ) {
        if ($("#showdeleted2").is(":checked")) {
            $("#showdeleted").prop('checked', true);
            setshowdeletedcookie("true");
        }
        else {
            $("#showdeleted").prop('checked', false);
            setshowdeletedcookie("false");
        }
        countalltweets();
    });

    function setshowdeletedcookie(val) {
        createCookie("showdeleted", val, 99999);  
    }   

    function getshowdeletedcookie(val) {
        return readCookie("showdeleted");  
    }   

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
            createCookie("maxid", parseInt($('#maxidinput').val().trim()));
           
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
            nextid = null;
            try {
                nextid = parseInt(readCookie("maxid"));
            }
            catch(err) {
                console.log("removetmp click - Error parsing next id");
            }
            finally {
                if (nextid) {
                    $("#maxid").val(nextid);
                    console.log("removetmp click - nextid vem do cookie: " + nextid);
                }
                else {
                    nextid = parseInt($("#maxid").val());
                    createCookie("maxid", nextid);
                    console.log("removetmp click - nextid vem do hidden field: " + nextid);
                }
            }

            do {
                createCookie(nextid + "templink", "", 99999);
                nextid = nextid - 1;
            }
            while (nextid > 0);
    
            showMessage("Temp Links Removed");
        } 
    });

    $( "#splashbutton" ).bind( "click", function( event ) {
        if (currentIndex == 0)
            closeSplash(); 
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

      $("#infoinput").keyup(function() {
        infoInputOnKeyup(this);
      });

      $("#filterauthor").keyup(function() {
        filterauthorOnChange(this);
      });
      $("#filterauthor").change(function() {
        filterauthorOnChange(this);
      });

      $("#addtaginput").keyup(function(event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13' && $(this).val().length > 0){
            addTextTag();
        }
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

    $( "#datetoshow" ).click(function() {
        $("#datetoshow").blur();  
        $('#linkChange').css("background", "transparent");
        var otherObj = $('#linkChange').find(".dateinput");
        var date = new Date();
        if (otherObj.val().trim() != "") {
            date.setDate(Number(otherObj.val().substring(6, 8)));
            date.setMonth(Number(otherObj.val().substring(4, 6)) - 1);
            date.setFullYear(Number(otherObj.val().substring(0, 4)));
        }
        openCalendar("linkcreatedate", date);
    });

    
    $("#tagsselect").change(function() {
        // Check input( $( this ).val() ) for validity here
        if ($( this ).val() != "notag") {
            $( "#tagsinput" ).val($( "#tagsinput" ).val() + " " + $( this ).val());
            $(this).val("notag");
            $('#tagsinput').trigger("change");
            removeNonExistentLi();
        
            createNonExistentLi();
        }
      });

      $("#classifselect").change(function() {
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

      $("input, textarea").focus(function(){  
            if ($("#linkChange").css("display") != "none") {
                var innerHeight = window.innerHeight;
                var htmlElem = $("#linkChange > div");
                var maxHeightStyle = "max-height: " + (innerHeight - 125) + "px !important;";

                var top = 1;
                var isLandscape = window.innerWidth < 1200 && window.innerWidth > 700;
                if ($('#linkChange').attr("cid") == "new" && $(this).attr("id") == "infoinput")
                    if (isLandscape)
                        top = -50;
                    else 
                        top = -250;
                    
                if ($('body').hasClass('big')) {
                    maxHeightStyle = "max-height: " + (innerHeight - 137) + "px !important;";
                }
                htmlElem.attr("style", "margin-top: -1px !important;" + maxHeightStyle);     
    
                htmlElem.attr("style", "margin-top: -1px !important;" + maxHeightStyle + "top: " + top + "px !important;"); 
            }
      });
      $("input, textarea").blur( function(){  
            if ($("#linkChange").css("display") != "none") {
                updateTopPosition("linkChange");
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
            
        })
    });

    document.getElementById("addtweet").addEventListener('click', () => {
        navigator.clipboard.readText()
        .then(text => {

            /*
            showSplash();
            */
            $( "#addtweet" ).blur();
            closeallnewlayout();
            $('body, html').css('overflow-y', 'hidden');
            

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
            
        })
    });

});




function showSplash()
{
    $("#splash").fadeIn(800);

    currentIndex = 16;
    $("#splashbutton").removeClass("active");
    $("#splashbutton").hide();
    dblClickTimeout = setTimeout(function() {  
        $("#splashbutton").fadeIn(800);
        updateSplashCounter();
    }, 1498);
}


function updateSplashCounter()
{
    if (currentIndex == 1) {
        $("#splashbutton").html("close");
        $("#splashbutton").addClass("active");
        currentIndex = 0;
        //updateSplashInnerCounter();
    }
    else {
        currentIndex = currentIndex -1;

        $("#splashbutton").text(currentIndex);

        dblClickTimeout = setTimeout(function() {     
            updateSplashCounter();
        }, 998);
    }
}


function closeSplash()
{
    setTimeout(function() {     
        $("#splashbutton").text("15");
        $("#splashbutton").hide();
    }, 998);

    $("#splash").fadeOut(800);
}

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

    putChoosedThemTop();

    document.documentElement.style.setProperty('--high-color', high_color);
    document.documentElement.style.setProperty('--text-color', text_color);
    document.documentElement.style.setProperty('--dark-color', dark_color);
    document.documentElement.style.setProperty('--softdark-color', softdark_color);
    document.documentElement.style.setProperty('--soft-color', soft_color);
    document.documentElement.style.setProperty('--soft-transp-color', soft_transp_color);
}

function putChoosedThemTop() 
{
    var theme = readCookie("currTheme");
    var clonedTheme = null;
    var themes = new Array();
    var counter = 0;

    $("#mainsettings table#theme tr.theme").each( function( index, element ) {
        var currow = $(element);

        if (currow.attr("id") != theme) {
            themes[counter] = currow.clone();
            currow.remove();
            counter = counter + 1;
        }
        else {
            $('#mainsettings .currenttheme').html(currow.find('.themetitle').text()); 
            $(element).find("i").removeClass("gradient-border");
            $(element).find("i").hide();
            $(element).find("td").css("border-bottom", "6px solid #45cae700");
            $(element).find(".themebox").css("border", "3px solid var(--high-color)").css("width", "calc(100% - 4px)");
            $(element).find(".themetitle").css("left", "-3px").css("width", "calc(100% + 6px)");
        }
    });

    for (var i = 0; i < counter; i++) {
        $(themes[i]).find("i").addClass("gradient-border").show();
        $(themes[i]).find("td").css("border-bottom", "0");


        $(themes[i]).find(".themebox").css("border", "1px solid var(--high-color)").css("width", "100%");
        $(themes[i]).find(".themetitle").css("left", "-1px").css("width", "calc(100% + 2px)");


        $("#mainsettings table#theme").append(themes[i]);
    }
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
    

            $('#mainmenu').css('transition', 'transition: all 0.01s');
            $('#mainmenu').css("height", "calc(100%)");

            if ($('body').hasClass('big')) {
                $('#mainmenu').css("top", "-528px");
            }
            else {
                $('#mainmenu').css("top", "-391px");
            }
            
            $('#mainmenu').css("background", "transparent");

            $('#mainmenu').slideDown();

            $('#mainmenu').attr("style", "top: 0px;transition: all 0.8s cubic-bezier(0.01, 0.76, 0.65, 0.96) 0.5s, background 1.1s, height 0.2s;");

            setTimeout(function(){
                $('#mainmenu').css('background', 'var(--soft-transp-color)');
            }, 600);
 
        }
        else {
            closeMenuPopup();
        }
    //}
}

function closeallnewlayout(bj) {
    $('.newLayout').fadeOut(300);
}


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function gotop(e) {
    if (e)
        e.stopPropagation();
    $(window).scrollTop(0);
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
    showMessage("Link Copied To Clipboard"); 
}

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


var clickmenu = function(val, text) {    
    resetFields();

    $('#selectedcat').val(val);
    $('#selectedcattext').val(text);

    if ($('#mainmenu').attr("fromsearch") == "yes") {
        closeMenuPopup();
        var style = window.getComputedStyle(body, null);
        $('#searchpopup').css("background", style.getPropertyValue('--soft-transp-color'));
        $('#titlesearch').html("(" + $('#selectedcattext').val() + ")");
        $('#mainmenu').attr("fromsearch", "");
    }
    else {
        /*if ($(window).width() > 1200) {
            openmenu();
        }
        else {*/
            closeMenuPopup();
        //}
        
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


function showMessage(text, speed, icon, iconstyle, undofunc, undotext, transparent, inicialspeed) {
    var mainDiv = $("#stripmessage");

    var dospeed = 3500;
    if (speed)
      dospeed = speed;

    var doinicialspeed = 900;
    if (inicialspeed)
        doinicialspeed = inicialspeed;

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

    if (transparent) {
        mainDiv.css("background", "rgba(0, 0, 0, 0)");
    }
    else {
        mainDiv.css("background", "rgba(0, 0, 0, 0.6)");
    }

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
        }, doinicialspeed);
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
