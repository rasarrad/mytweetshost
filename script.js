var text = "";  
var origin = "";
var nextid = "";
var currentIndex = 0;
var youtubeId = "";
var hasProcessedDescription = false;
var url = "";
var urldirect = "";
var dblFlag = false;
var dblClickTimeout = null;
var addType = "T";
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
var showAll = false;
var showColors = false;
var showColorsAdv = false;
var isMy = true;
var useSwipes = false;
var ceec = 0; 
var funcg = null;
var isMobile = null;
var rendermap = new Map();
var rendermapindex = 0;
var rendermapcurr = 0;
var scrollcurr = 0;
var totalrenderedtweets = 0;
var currrenderedtweets = 0;
var renderTimeout = null;

/* 
    xyz startcode
    xyz fakepass
    xyz splash
*/
var w;

function startWorker() {
    if (typeof(Worker) !== "undefined") {
      if (typeof(w) == "undefined") {
        w = new Worker("worker.js");
      }
      w.onmessage = function(event) {
        
        if (currrenderedtweets > 4) {
            if ($("#twitter-widget-" + totalrenderedtweets) && $("#twitter-widget-" + totalrenderedtweets).length > 0) {
                if ($("#twitter-widget-" + totalrenderedtweets).attr("processed") != "yes") {
                    customizeSingleTweet();
                }
                currrenderedtweets++;
            }
            else {
                console.log("NO");
            }
        }
        else {
            if ($('#mask').is(":visible")) {
                closeMenuPopup();
                $('#mask').fadeOut(600);  
                $('#tweetcount').fadeOut(800);
            }

            renderTimeout = setTimeout(function() {     
                if ($("#twitter-widget-" + totalrenderedtweets) && $("#twitter-widget-" + totalrenderedtweets).length > 0) {
                    if ($("#twitter-widget-" + totalrenderedtweets).attr("processed") != "yes") {
                        customizeSingleTweet();
                    }
                    currrenderedtweets++;
                }
                else {
                    console.log("NO OTHER");
                }
            }, 500);
        }


          //console.log("data: " + event.data);
          /* 
          renderTimeout = setTimeout(function() {     
            if (!isRendering) {
                var val = rendermap.get(rendermapcurr);
            
                rendermapcurr = rendermapcurr + 1;
    
                if (val) {
                    isRendering = true;
                    
                    renderLink(val, true);
                }
            }
        }, 100);
        */
      };
    } 
  }
  
function stopWorker() {
    w.terminate();
    w = undefined;
}


// START do tema
var currTheme = readCookie("currTheme");
if (currTheme && currTheme.length > 0 && currTheme != 'default') {
     changetheme(currTheme, true);
}  

$( document ).ready(function() { 
    
    isMobile = window.mobileAndTabletCheck();

    // START do texto das categorias
    var catschanged = readCookie("cat-cli");

    if (catschanged && catschanged.length > 0 ) {
        catsmap.set("cli", catschanged);
        $(".cat-cli").text(catschanged);

        catsmap.set("tvn", "New / Ongoing");
        catsmap.set("trn", "Hot / Trending");
        catsmap.set("tvi", "To Watch");
        catsmap.set("tvl", "Documentaries / Films");
        catsmap.set("tre", "Fast Reading");
        catsmap.set("trl", "Long Reading");
        catsmap.set("tke", "Important / To Keep");
        catsmap.set("imp", "Shocking Truth");
        catsmap.set("all", "All");
    }
    else {
        catsmap.set("tvn", "New / Ongoing");
        catsmap.set("trn", "Hot / Trending");
        catsmap.set("tvi", "To Watch");
        catsmap.set("tvl", "Documentaries / Films");
        catsmap.set("tre", "Fast Reading");
        catsmap.set("trl", "Long Reading");
        catsmap.set("tke", "Important / To Keep");
        catsmap.set("imp", "Shocking Truth");
        catsmap.set("cli", "My Tweets");
        catsmap.set("all", "All");
    }

    // START remover speckcheks
    $( "input, textarea" ).each( function( index, element ){
        $(element).attr("spellcheck", "false");
        $(element).attr("autocomplete", "none");
        $(element).attr("additionalAttributes", "{autocomplete: 'none'}");
    });

    // START da variavel setShowDeleted
    var showDeleted = getshowdeletedcookie();
    setShowDeleted(showDeleted, true); // faz o count all tweets


    // START do mascara cinzenta inicial
    // setTimeout(function() { 
    //      countalltweets(); agora é feito no showDeleted (em cima)

    setTimeout(function(){
        $( "#mask" ).fadeOut( 800, function() {
            var style = window.getComputedStyle(body, null);
    
            $("#mask").css("background", style.getPropertyValue('--soft-transp-color'));
            $("#mask .fa-folder-open").hide();
            $("#mask > div" ).hide();
            $("#mask > .fa-circle-o-notch").show();
        });
    }, 340); 
    //}, 1); 


    // START do zoom
    var hasZoom = readCookie("hasZoom");
    if (hasZoom && hasZoom.length > 0)
        zoom(null, true);
    setTimeout(function(){
        $('body').removeClass('notransit'); 
    }, 1400);  


    // START do splash screen
    /* xyz splash
    createCookie("eec", "sss", 99999);
    if (!dunl())
        showSplash();
    */
    // showSplash();
    //////////////
        
    // START das colos
    var valueColor = readCookie("colors");
    if (valueColor && valueColor.length > 0) {
        if (valueColor == "All") {
            showColors = true;
            showColorsAdv = true;
        }
        else if (valueColor == "Medium") {
            showColors = false;
            showColorsAdv = true;   
        }
    }


    // START dos swipes
    var valueSwipe = readCookie("swipes");
    if (valueSwipe && valueSwipe.length > 0) {
        if (valueSwipe == "Yes") {
            useSwipes = true;

            if (isMobile) {
                // START swip binds
                document.addEventListener('touchstart', handleTouchStart, false);        
                document.addEventListener('touchmove', handleTouchMove, false);
                document.addEventListener('touchend', handleTouchEnd, false);
            }
        }
    }
    

    // START da help
    var value = readCookie("help");
    if (value && value.length > 0) {
        $( ".fa-question-circle:not(.ashow)" ).each( function( index, element ){
            $(element).css("display", "none");
        });
    }


    // START victorywillcome tweets
    var valueVWC = readCookie("vwc");
    if (valueVWC && valueVWC.length > 0) {
        if (valueVWC == "Yes") {
            showAll = true;
        }
    }


    // START da cor caso haja alteracoes
    var hasChanges = readCookie("haschanges");
    if (hasChanges && hasChanges.length > 0) {
        if (showColorsAdv) {
            $("#generateicon").addClass("haschanges");
            if (showColors) {
                $("#settings").addClass("haschanges");
            }
        } 
    }
    

    // START filechoser
    var dropZone = document.getElementById('filedrop');
    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', handleFileSelectDragDrop, false);
    document.getElementById('files').addEventListener('change', handleFileSelectInput, false);

    // START do view mode (O QUE FAZ?????)    
    setviewmode();


    // TEST CODE
    /*
    window.mobileAndTabletcheck = function() {
        var check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
      };
    */

    /* 
    console.log("----window.innerWidth-----window.innerHeight------navigator.userAgent-----");
    console.log(window.innerWidth + " - " + window.innerHeight + " - " + navigator.userAgent);
    */

    /*
    nextid = parseInt(readCookie("maxid"));

    do {
        createCookie(nextid + "templink", "", 99999);
        nextid = nextid - 1;
    }
    while (nextid > 0);

    nextid = parseInt(readCookie("maxid"));

    function visibilityHandler() {
        var hash = '#bg';
        if (document.hidden && !window.location.hash) {
        window.history.replaceState(null, null, window.location + hash);
        } else if (!document.hidden && window.location.hash == hash) {
        var l = '' + window.location;
        window.history.replaceState(null, null, l.substr(0, l.length - hash.length));
        }
    };
    document.addEventListener('visibilitychange', visibilityHandler, false);
    visibilityHandler();

    */  
    /*
    <script src="./js/FileSaver.js"></script>

        var blob = new Blob(["Welcome to Websparrow.org."],
            { type: "text/plain;charset=utf-8" });
        saveAs(blob, "static.txt");
    */
   



/////////////////////////////////////////////////////////////////////////
//                           BINDS ON READY                            //
/////////////////////////////////////////////////////////////////////////

    window.onscroll = function(ev) {
        clearTimeout(renderTimeout);
        var scroll = $(window).scrollTop();
        if (scroll > 200) {
          $('#gotop').fadeIn(700); 
        }
        else {
          $('#gotop').fadeOut(700);
        }

        /*
        if (window.scrollY > scrollcurr + 600) {
            renderTimeout2 = setTimeout(function() {     
            
                if (!isRendering) {
                    scrollcurr = window.scrollY;

                    var val = rendermap.get(rendermapcurr);
                
                    rendermapcurr = rendermapcurr + 1;
        
                    if (val) {
                        isRendering = true;
                        
                        renderLink(val, true);
                    }
                }
            }, 100);
        }
         */
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
        getInformation(1);

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


    ///////////////////////////////////////

    $( "#btnsearch" ).bind( "click", function( event ) {
      getInformation(1);
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
            while (nextid > 99999);
    
            showMessage("Temp Links Removed");
        } 
    });

    $( "#splashbutton" ).bind( "click", function( event ) {
        if (currentIndex == 0) {
            closeSplash(); 
            if ($("#splashbutton").attr("ceec") == "yes") {
                $("#splashbutton").attr("ceec", "");
                funcg();
                funcg = null;
            }
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
      /*
      $("input, textarea").blur( function(){  
            if ($("#linkChange").css("display") != "none") {
                updateTopPosition("linkChange");
            }
      });
        */

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

 
    // xyz startcode
    
    //clickmenu('all');

    //closeSplash(); 


    
    /* CATEGORIES RENAMING

    catschanged = readCookie("cat-tvn")
    catsmap.set("tvn", catschanged);
    $(".cat-tvn").text(catschanged);

    catschanged = readCookie("cat-trn")
    catsmap.set("trn", catschanged);
    $(".cat-trn").text(catschanged);

    catschanged = readCookie("cat-tvi")
    catsmap.set("tvi", catschanged);
    $(".cat-tvi").text(catschanged);

    catschanged = readCookie("cat-tvl")
    catsmap.set("tvl", catschanged);
    $(".cat-tvl").text(catschanged);
    
    catschanged = readCookie("cat-tre")
    catsmap.set("tre", catschanged);
    $(".cat-tre").text(catschanged);

    catschanged = readCookie("cat-trl")
    catsmap.set("trl", catschanged);
    $(".cat-trl").text(catschanged);

    catschanged = readCookie("cat-tke")
    catsmap.set("tke", catschanged);
    $(".cat-tke").text(catschanged);

    catschanged = readCookie("cat-imp")
    catsmap.set("imp", catschanged);
    $(".cat-imp").text(catschanged);

    catschanged = readCookie("cat-cli")
    catsmap.set("cli", catschanged);
    $(".cat-cli").text(catschanged);

    createCookie("cat-tvn", "New / Ongoing 2222", 99999);
    createCookie("cat-trn", "Hot / Trending 2222", 99999);
    createCookie("cat-tvi", "To Watch 2222", 99999);
    createCookie("cat-tvl", "Documentaries / Films 2222", 99999);
    createCookie("cat-tre", "Fast Reading 2222", 99999);
    createCookie("cat-trl", "Long Reading 2222", 99999);
    createCookie("cat-tke", "Important / To Keep 2222", 99999);
    createCookie("cat-imp", "Shocking Truth 2222", 99999);
    createCookie("cat-cli", "My Tweets 2222", 99999);
    */


    /* FILE SAVE
    window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;

    navigator.webkitPersistentStorage.requestQuota(1024*1024, function() {
        window.webkitRequestFileSystem(window.PERSISTENT , 1024*1024, SaveDatFileBro);
      });

    window.requestFileSystem(window.PERSISTENT, 1024*1024, onInitFs, errorHandler);
    */

}); // FIM DO ONREADY


 

/////////////////////////////////////////////////////////////////////////
//                          FILE READ/WRITE                            //
/////////////////////////////////////////////////////////////////////////

function SaveDatFileBro(localstorage) {
    localstorage.root.getFile("info.txt", {create: true}, function(DatFile) {
      DatFile.createWriter(function(DatContent) {
        var blob = new Blob(["Lorem Ipsum 2222"], {type: "text/plain"});
        DatContent.write(blob);
      });
    });
  }
  function errorHandler(e) {
    var msg = '';
  
    switch (e.code) {
        /*
      case FileError.QUOTA_EXCEEDED_ERR:
        msg = 'QUOTA_EXCEEDED_ERR';
        break;
      case FileError.NOT_FOUND_ERR:
        msg = 'NOT_FOUND_ERR';
        break;
      case FileError.SECURITY_ERR:
        msg = 'SECURITY_ERR';
        break;
      case FileError.INVALID_MODIFICATION_ERR:
        msg = 'INVALID_MODIFICATION_ERR';
        break;
      case FileError.INVALID_STATE_ERR:
        msg = 'INVALID_STATE_ERR';
        break; */
      default:
        msg = 'Unknown Error';
        break;
    };
  
  }

  function onInitFs(fs) {
    fs.root.getFile('info.txt', {}, function(fileEntry) {

      // Get a File object representing the file,
      // then use FileReader to read its contents.
      fileEntry.file(function(file) {
         var reader = new FileReader();
  
         reader.onloadend = function(e) {
            
         };
  
         reader.readAsText(file);
      }, errorHandler);
  
    }, errorHandler);
  }


/////////////////////////////////////////////////////////////////////////
//                              FULSCREEN                              //
/////////////////////////////////////////////////////////////////////////

window.openLinkOutside = function(id) {
    window.open($("#" + id).attr("curl"));
};

window.openLinkInside = function(id) {
    //if ($("#fsPopup iframe").attr("cid") == id && $("#fsPopup iframe").attr("cerror") != "yes") {
    //    $("#fsPopup").fadeIn(500);
    //}
    //else {
        //$("#fsPopup iframe").attr("cerror", "");
        var obj = $("#" + id);

        if (!obj.hasClass("yt") && !obj.hasClass("html"))
            return false;

        $('body, html').css('overflow-y', 'hidden');

        $("#fsPopup iframe").attr("cid", id);

        var value = readCookie("maximumfs");

        if (value && value.length > 0) {
            $("#fsPopup").addClass("full");
        }
        else {
            $("#fsPopup").removeClass("full");
        }

        var timer = 1500;

        if (obj.hasClass("yt")) {
            $("#fsPopup").addClass("yt");
            timer = 1;
        }
        else {
            $("#fsPopup").removeClass("yt");
        }

        var url = generateUrl(obj.attr("curl"))

        $("#fsPopup iframe").attr("src", url);
        $("#fsPopup").fadeIn(1600);
        dblFlag = true;  
    
        setTimeout(function() {    
            dblFlag = false; 
        }, timer);  
   // }
};


window.openLinkInline = function(id) {

    var obj = $("#" + id);

    var url = generateUrl(obj.attr("curl"));

    $("#contentin" + id).prepend("<iframe src='" + url + "' id='contentiniframe" + id + "' onload='iframeloadFunc(this)' scrolling='yes' frameborder='0' allowtransparency='true' style='border: 0px solid;margin-top: 0px !important;width: 100% !important;transform: translate(-50%, -50%) !important; display: none;'></iframe>");
    $("#contentiniframe" + id).attr("cid", id);
    dblFlag = true; 

    var timer = 1500;
    if (obj.hasClass("yt"))
        timer = 1;

    setTimeout(function() {    
        dblFlag = false; 
    }, timer); 

    $("#contentiniframe" + id).fadeIn(1900);
 
};

function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
  }

function iframeloadFunc(obj) {
    if (dblFlag) {
        window.open($(obj).attr("src"));

        var element = document.getElementById($(obj).attr("cid"));
        
        showFreeTooltip(getOffset(element).left, getOffset(element).top, "This link can't be open inside the app.");

        $("#contentiniframe" + $(obj).attr("cid")).fadeOut(800);
    }
} 

function generateUrl(url) {
    if (url.indexOf('watch?v=') >= 0) {
        url = url.substring(url.indexOf('watch?v=') + 8);

        if (url.indexOf("&t=") > 0) {
            url = url.replace("&t=","?start=");
            url = url.substring(0, url.length -1);
        }
        url = "https://www.youtube.com/embed/" + url + "?autoplay=1";
    }
    return url;
} 


function closeFSPopup(obj) {
    $('body, html').css('overflow-y', 'auto');
    $("#fsPopup iframe").attr("src", "");
    $("#fsPopup").fadeOut(700);
} 

function moveFSPopup(obj) {
    if ($(obj).hasClass('fa-arrow-circle-up')) {
        $(obj).removeClass('fa-arrow-circle-up');
        $(obj).addClass('fa-arrow-circle-down');
        $("#fsPopup").addClass('up');
    }
    else {
        $(obj).addClass('fa-arrow-circle-up');
        $(obj).removeClass('fa-arrow-circle-down');
        $("#fsPopup").removeClass('up');
    }
}

function iframeFSloadFunc(obj) {
    if ($(obj).attr("cid") == "none")
        return false;
    
    if (dblFlag) {
        //$(obj).attr("cerror", "yes");
 
        window.open($(obj).attr("src"));

        var element = document.getElementById($(obj).attr("cid"));
        
        showFreeTooltip(getOffset(element).left, getOffset(element).top, "This link can't be open inside the app.");


        closeFSPopup();
    }
} 


window.mobileAndTabletCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

/////////////////////////////////////////////////////////////////////////
//                              FILE CHOSER                            //
/////////////////////////////////////////////////////////////////////////

function handleFileSelectInput(evt) {

    var files = evt.target.files;

    uploadFiles(files);
}

function handleFileSelectDragDrop(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; 

    uploadFiles(files);
  }

  function uploadFiles(files) {
    try {
        $( "#dialog-confirm-upload" ).dialog({
            resizable: false,
            height: "auto",
            width: 400,
            modal: true,
            buttons: {
            "Yes": function() {
                var reader=new FileReader();
                reader.onload = function(e) {}
                reader.readAsText(files[0]);
            
                setTimeout(function(){
                    var currentId = readCookie("maxid");
                    try {
                        var resultParsed = JSON.parse(reader.result);
            
                        var webLinksMap = new Map();
                        var hasTemp = false;
            
                        for (var x = 0; x < resultParsed.length; x++) {
            
                            if (parseInt(resultParsed[x].id) >= 100000) {
                                hasTemp = true;
            
                                var link = "{\r\n\"id\": \"" + resultParsed[x].id + "\",\r\n\"creationdate\": \"" + resultParsed[x].creationdate  + "\",\r\n\"type\": \"" + resultParsed[x].type  + "\",\r\n\"url\": \"" + resultParsed[x].url  + "\",\r\n\"ishidden\": \"" + resultParsed[x].ishidden  + "\",\r\n\"date\": \"" + resultParsed[x].date + "\",\r\n\"author\": \"" + resultParsed[x].author  + "\",\r\n\"categories\": \"" + resultParsed[x].categories + "\",\r\n\"tags\": \"" + resultParsed[x].tags + "\",\r\n\"info\": \"" + resultParsed[x].info.replace(/"/g, "").replace(/(\r\n|\n|\r)/gm, "").trim() + "\",\r\n\"classif\": \"" + resultParsed[x].classif + "\",\r\n\"isnew\": \"\",\r\n\"deleted\": \"" + resultParsed[x].deleted + "\",\r\n\"tweet\": \"" + resultParsed[x].tweet + "\"\r\n},";
            
                                var mlink = encodeURIComponent(JSON.stringify(link));
                
                                createCookie(resultParsed[x].id + "templink", mlink, 99999);
                            }
                            else {
                                webLinksMap.set(parseInt(resultParsed[0].id), resultParsed[x]);
                            }
                        }
            
                        if (hasTemp)
                            createCookie("maxid", parseInt(resultParsed[0].id) + 1);
                        else 
                            createCookie("maxid", 100000);
            
                        $("#mask").fadeOut(500);
                        $("#dialog-confirm-upload").parent().fadeOut( 800, function() {
                            $("#dialog-confirm-upload").parent().remove();
                        });

                        setTimeout(function(){
                            showMessage("Links Successfully Imported"); 
            
                            countalltweets(webLinksMap);
                
                            eraseAllTmpData(); 

                            document.getElementById("files").value = "";
                        }, 600); 
                    }
                    catch(err) {
                        showMessage("Error Importing Links");
                        createCookie("maxid", parseInt(currentId)); 
                    }
                    finally {
            
                    }
                }, 100);  
            },
            Cancel: function() {
                $("#mask").fadeOut(500);
                $("#dialog-confirm-upload").parent().fadeOut( 800, function() {
                    $("#dialog-confirm-upload").parent().remove();
                });
                document.getElementById("files").value = "";
                }
            }
        });
    } catch (error) {
                        
    }
    $("#dialog-confirm-upload").parent().addClass("uploaddialog");
    
    $("#dialog-confirm-upload").parent().css("top", ((window.innerHeight/2) - 100) + "px")
    $("#mask").fadeIn(500);
    $("#dialog-confirm-upload").parent().fadeIn(800);    
  }


  function updateWebLink(obj, webObj) {

    eraseLinkTmpData(obj.id, true)

    if(obj.hasOwnProperty("date") && obj.date != webObj.date) {
        createCookie(obj.id + "date", obj.date, 99999);
    }

    if(obj.hasOwnProperty("author") && obj.author != webObj.author) {
        createCookie(obj.id + "author", obj.author, 99999);
    }

    if(obj.hasOwnProperty("categories") && obj.categories != webObj.categories) {
        createCookie(obj.id + "catchanged", obj.categories, 99999);
    }

    if(obj.hasOwnProperty("tags") && obj.tags != webObj.tags) {
        createCookie(obj.id + "tagchanged", obj.tags, 99999);
    }

    if(obj.hasOwnProperty("info") && obj.info != webObj.info) {
        createCookie(obj.id + "info", obj.info, 99999);
    }

    if(obj.hasOwnProperty("deleted")) {
        createCookie(obj.id + "isdeleted", obj.deleted, 99999);
    }

    if(obj.hasOwnProperty("classif") && obj.classif != webObj.classif) {
        createCookie(obj.id + "classif", obj.classif, 99999);
    }
  }


  function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

  function readTextFile(file, callback) {
      var rawFile = new XMLHttpRequest();
      rawFile.overrideMimeType("application/json");
      rawFile.open("GET", file, true);
      rawFile.onreadystatechange = function() {
          if (rawFile.readyState === 4 && rawFile.status == "200") {
              callback(rawFile.responseText);
          }
      }
      rawFile.send(null);
  }
  
  function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }



/////////////////////////////////////////////////////////////////////////
//                         CLICK AND DOUBLE CLICK                      //
/////////////////////////////////////////////////////////////////////////


var dblTapFlagControl = true;
var dblTapFlag = false;
var dblTapTimeout = null;

function clickHandler(event) {
    var obj = event.currentTarget.id;
    dblTapFlagControl = false;
    if(!dblTapFlag) {
        dblTapFlag = true;
        dblTapTimeout = setTimeout( function() { 
            dblTapFlag = false; 
            executeSingleDoubleFunction(obj, "single");
            setTimeout( function() { 
                dblTapFlagControl = true;
            }, 200 );
        }, 350 );
        return false;
    }
    event.preventDefault();
    clearTimeout(dblTapTimeout);
    dblTapFlag = false;
    dblTapFlagControl = true;
    executeSingleDoubleFunction(obj, "double");
 }




/////////////////////////////////////////////////////////////////////////
//                     SWIPE TOUCH E LONG TOUCH                        //
/////////////////////////////////////////////////////////////////////////

    
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
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     

//var allowScroll = false;
var datet = null;

function handleTouchStart(evt) {
    datet = new Date();
    currObjSwipe = getParentObjId($(event.target));

    //$('body, html').css('overflow', 'hidden');
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;   
    
    //allowScroll = false;
    dblFlag = false;  
    setTimeout(function() {    
        //allowScroll = true;
        dblFlag = true;
         
        dblClickTimeout = setTimeout(function() {    
            dblFlag = false;
        }, 180);
    }, 80);                
};                                                


function handleTouchMove(evt) {
    //if (!dblFlag && allowScroll)
    //    $('body, html').css('overflow', 'auto');

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

function handleTouchEnd(evt) {
    if (lastTouch) {
        if (useSwipes && dblFlag && lastTouch) {                       
            if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
                if ( xDiff > 0 ) {
                    console.log("left: " + currObjSwipe);
                    //executeSwipeFunction(currObjSwipe, "left");
                } else {
                    console.log("right: " + currObjSwipe);
                    //executeSwipeFunction(currObjSwipe, "right");
                }                       
            } else {
                if ( yDiff > 0 ) {
                    console.log("up: " + currObjSwipe);
                    //executeSwipeFunction(currObjSwipe, "up");
                } else {
                    console.log("down: " + currObjSwipe);
                    //executeSwipeFunction(currObjSwipe, "down");
                }                                                                 
            }
        }      
    }
    else {
        if (new Date().getTime() - datet.getTime() < 300) {
            executeSingleDoubleFunction(currObjSwipe, "single");
        }
        // FOR LONG AND VERY LONG
        //else if (new Date().getTime() - datet.getTime() < 800) { 
        //    executeSingleDoubleFunction(currObjSwipe, "double");
        //}
        else {
            executeSingleDoubleFunction(currObjSwipe, "double");
        }
    }
    dblFlag = false;
    xDown = null;
    yDown = null;   
    lastTouch = null;                  
}; 

// xyzdouble 
function executeSingleDoubleFunction(obj, type) {
    switch(obj.substring(0, 9)) {

        case "contentin":
            var value = readCookie("doublefs");
            if (value && value.length > 0) {
                if (type == "double")
                    type = "single";
                else 
                    type = "double";
            }
            if (type == "double") { // Execute double/long touch
                value = readCookie("linksinside");

                if (value && value.length > 0) {
                    openLinkInside(obj.substring(9));
                }
                else {
                    openLinkOutside(obj.substring(9));
                }
                console.log("Execute double/long touch:" + obj);
            }
            else { // Execute single/touch
                openLinkInline(obj.substring(9));
                console.log("Execute single/touch:" + obj);
            }

            break;  

    }
}
function executeSwipeFunction(obj, type) {

    switch(obj) {
        case "main":
        case "backdiv":
            processBackdivFuncs(type);
            break;
        case "helppop":
            processHelpDivFuncs(type);
            break;
        case "mainmenu":
            processMainmenuFuncs(type);
            break;

        case "linkChange":
            processLinkChangeFuncs(type);
            break;
    
        case "searchpopup":
            processSearchFuncs(type);
            break;
            
        case "calendardiv":
            processCalendarFuncs(type);
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

function processHelpDivFuncs(type) {
    closeHelpPopup();
    console.log("help all-----------------------------------------------");
} 

function processLinkChangeFuncs(type) {
    switch(type) {
        case "up":
            closeSettingsPopup()
            console.log("linkChange up-----------------------------------------------");
            break;

        case "down":
            closeSettingsPopup()
            console.log("linkChange down-----------------------------------------------");
            break;
        case "left":
            closeSettingsPopup()
            console.log("linkChange left-----------------------------------------------");
            break;

        case "right":
            closeSettingsPopup();
            console.log("linkChange right-----------------------------------------------");
            break;
    }
}  

function processSearchFuncs(type) {
    switch(type) {
        case "up":
            closeSearchPopup()
            console.log("searchpopup up-----------------------------------------------");
            break;

        case "down":
            closeSearchPopup()
            console.log("searchpopup down-----------------------------------------------");
            break;
        case "left":
            resetFields(true)
            console.log("searchpopup left-----------------------------------------------");
            break;

        case "right":
            getInformation(2);
            console.log("searchpopup right-----------------------------------------------");
            break;
    }
}  

function processCalendarFuncs(type) {
    switch(type) {
        case "up":
            closeCalendarPopup()
            console.log("calendardiv up-----------------------------------------------");
            break;

        case "down":
            closeCalendarPopup()
            console.log("calendardiv down-----------------------------------------------");
            break;
        case "left":
            $("button[data-calendar-toggle=previous]").trigger("click");
            console.log("calendardiv left-----------------------------------------------");
            break;

        case "right":
            $("button[data-calendar-toggle=next]").trigger("click");
            console.log("calendardiv right-----------------------------------------------");
            break;
    }
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

            toggleShowDeletedAll();

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
                /*
                openSearchPopup()
                https://stackoverflow.com/questions/22629286/scroll-down-a-webpage-by-constant-speed/22629859
       
                setTimeout(function() { 
                    gotop();
                }, 100); 
                
                showMessage("Scrolled to top", 2500, null, null, null, null, true, 500);
                         */ 
                break;
    
            case "down":// apagar pesquisa - mantendo os critérios
                /*console.log("DOWN   DOWN   DOWN   DOWN   DOWN   DOWN   DOWN   DOWN   DOWN   DOWN   ");
                
                $("#main").empty();
                $('#tweetcount').hide(); 
                showMessage("Search cleared", 2500, null, null, null, null, true, 500);
*/
                break;
            case "left": // apagar pesquisa - mantendo os critérios 
                /*console.log("LEFT   LEFT   LEFT   LEFT   LEFT   LEFT   LEFT   LEFT   LEFT   LEFT   ");
             
                $('#linkresult').val($('#' + idLink).attr('curl'));
                $("#linkresult").focus();
                sleep(100);  
                $("#linkresult").select();
                document.execCommand('copy');
                sleep(100);  
                $("#linkresult").blur();
                showMessage("Link Copied To Clipboard", 2500, null, null, null, null, true, 500);
*/
                openLinkInside(idLink);

                break;
    
            case "right": // abrir link
                //console.log("RIGHT   RIGHT   RIGHT   RIGHT   RIGHT   RIGHT   RIGHT   RIGHT   RIGHT   RIGHT   ");
                expandCat(null, idLink);
                break;
        }
    }
}  






/////////////////////////////////////////////////////////////////////////
//                              TRATAR                                 //
/////////////////////////////////////////////////////////////////////////




function setshowdeletedcookie(val) {
    createCookie("showdeleted", val, 99999);  
}   

function getshowdeletedcookie(val) {
    return readCookie("showdeleted");  
}   

function showSplash()
{
    $("#splash").fadeIn(800);

    currentIndex = 10;
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

    if ($('#mainmenu').css("display") == "none") {
        var setHeight = "26px";
        if ($('body').hasClass('big')) {
            setHeight = "36px";
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

}

function closeallnewlayout(bj) {
    $('.newLayout').fadeOut(300);
}


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function gotop(e) {
    if (e)
        e.stopPropagation();
    $("html").scrollTop(0);
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

function externallinkopenPre() {
    externallinkopen(null, $("#" + $("#fsPopup iframe").attr("cid")).attr("curl"));
}
function externallinkopen(obj, link) {
    if (obj)
        fixfocus(obj);

    var linkToOpen = ""; 
    if (link)
        linkToOpen = link;
    else
        linkToOpen = $('#linkChange').attr('clink');

    var win = window.open(linkToOpen, '_blank');
    win.focus();
    //showMessage("External Link Copied To Clipboard"); 
}


function externallinkCopyPre() {
    externallinkcopy(null, $("#" + $("#fsPopup iframe").attr("cid")).attr("curl"));
}


function externallinkcopy(obj, link) {
    if (obj)
        fixfocus(obj);

    if (link)
        $('#linkresult').val(link);
    else
        $('#linkresult').val($('#linkChange').attr('clink'));
    
        $("#linkresult").select();
        
    document.execCommand('copy');
    $("#linkresult").blur();
    showMessage("Link Copied To Clipboard"); 
}

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


var clickmenu = function(val) {    
    resetFields();

    $('#selectedcat').val(val);
    $('#selectedcattext').val(catsmap.get(val));

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
            
        //}
        
        getInformation(2);
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
    createCookie(name, "", -1);
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


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function customizeTweets(flag, forceProcess, big, dopostcode) {
    var isChromium = window.chrome;
    var winNav = window.navigator;
    var vendorName = winNav.vendor;
    var isOpera = typeof window.opr !== "undefined";
    var isIEedge = winNav.userAgent.indexOf("Edge") > -1;
    var isIOSChrome = winNav.userAgent.match("CriOS");
    var isSafari6Plus = !!navigator.userAgent.match(/safari/i) && !navigator.userAgent.match(/chrome/i) && typeof document.body.style.webkitFilter !== "undefined";
    var ua = navigator.userAgent.toLowerCase();
    var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");

    var tweetCSS = ".EmbeddedTweet{height:auto !important;background: transparent !important; margin: 0 !important;}.EmbeddedTweet {max-width: none !important;width: 100%;padding-bottom: 25px !important;} .Identity-screenName {color: var(--text-color) !important;} .TwitterCardsGrid-col--spacerTop.SummaryCard-destination {color: var(--high-color) !important} .SandboxRoot {color: var(--text-color) !important} .CallToAction-text {color: var(--text-color)} .TweetAuthor-screenName {color: var(--high-color) !important} a {color: var(--high-color) !important} .TweetAuthor-screenName.Identity-screenName {color: var(--text-color) !important} .u-block.TwitterCardsGrid-col--spacerTop SummaryCard-destination {color: var(--text-color) !important} .Icon.Icon--twitter {display: none !important;}.SummaryCard-contentContainer{background: var(--softdark-color) !important;transition: all 0.6s !important;}.SummaryCard-contentContainer:hover{background: var(--soft-color) !important;}.Tweet-card {font-size: 19px !important;background: transparent !important;} .Tweet-card > .QuoteTweet {background: #ffffff38 !important;border-bottom-right-radius: 0 !important;border-bottom-left-radius: 0 !important;border-top-right-radius: 0px !important;border-top-left-radius: 0px !important;margin-top: 19px !important;} .Tweet-body{font-size: 19px !important;}.TweetAuthor-avatar{width: 50px !important;height: 50px !important;}.Avatar:not(.Identity-avatar) {height: 50px !important;width: 50px !important;position: absolute !important;top: -7px !important;}.Avatar.Identity-avatar {width: 20px !important;height: 22px !important;}.TweetAuthor-name {font-size: 18px !important;}.TweetAuthor-screenName {font-size: 15px !important;}.TweetInfo {font-size: 15px !important;}.CallToAction {font-size: 15px !important; padding-top: 0 !important;}.TwitterCard-container {max-width: 10000px!important;}";
      
    if ($('body').hasClass('big')) {
        tweetCSS = ".EmbeddedTweet{height:auto !important; background: transparent !important;border-radius: 0px !important;border: 0px !important; margin: 0 !important;padding-bottom: 25px !important;} .Identity-screenName {color: var(--text-color) !important;} .TwitterCardsGrid-col--spacerTop.SummaryCard-destination {color: var(--high-color) !important} .SandboxRoot {color: var(--text-color) !important} .CallToAction-text {color: var(--text-color)} .TweetAuthor-screenName {color: var(--high-color) !important} a {color: var(--high-color) !important} .TweetAuthor-screenName.Identity-screenName {color: var(--text-color) !important} .u-block.TwitterCardsGrid-col--spacerTop SummaryCard-destination {color: var(--text-color) !important} .Icon.Icon--twitter {display: none !important;} .CallToAction{border: 0px !important; padding-top: 0 !important;} .EmbeddedTweet {max-width: none !important;width: 100%;}.SummaryCard-contentContainer{background: var(--softdark-color) !important;transition: all 0.6s !important;}.Tweet-ancestorContents.Tweet-ancestorContents--repliesRefresh > .avatar {left: -8px !important;}.SummaryCard-contentContainer:hover{background: var(--soft-color) !important;}.Tweet-card {font-size: 19px !important;background: transparent !important;}.Tweet-card > .QuoteTweet {background: #ffffff38 !important;border-bottom-right-radius: 0 !important;border-bottom-left-radius: 0 !important;border-top-right-radius: 0px !important;border-top-left-radius: 0px !important;margin-top: 19px !important;} .Tweet-body{font-size: 19px !important;}.TweetAuthor-avatar{width: 50px !important;height: 50px !important;}.Avatar:not(.Identity-avatar) {height: 45px !important; width: 45px !important; position: relative !important; top: -2px !important;min-width: 43px !important;}.Avatar.Identity-avatar {width: 20px !important;height: 22px !important;} .TweetAuthor-avatar--ancestor .Avatar {left: -8px !important;}.TweetAuthor-name {font-size: 18px !important;}.TweetAuthor-screenName {font-size: 15px !important;}.TweetInfo {font-size: 15px !important;}.CallToAction {font-size: 15px !important;}.TwitterCard-container {border: 1px solid var(--soft-color) !important;max-width: 10000px!important;}";
    }
    else {
        tweetCSS = ".EmbeddedTweet{height:auto !important; background: transparent !important;border-radius: 0px !important;border: 0px !important; margin: 0 !important;padding-bottom: 25px !important;} .Identity-screenName {color: var(--text-color) !important;} .TwitterCardsGrid-col--spacerTop.SummaryCard-destination {color: var(--high-color) !important} .SandboxRoot {color: var(--text-color) !important} .CallToAction-text {color: var(--text-color)} .TweetAuthor-screenName {color: var(--high-color) !important} a {color: var(--high-color) !important} .TweetAuthor-screenName.Identity-screenName {color: var(--text-color) !important} .u-block.TwitterCardsGrid-col--spacerTop SummaryCard-destination {color: var(--text-color) !important} .Icon.Icon--twitter {display: none !important;} .CallToAction{border: 0px !important; padding-top: 0 !important;} .EmbeddedTweet {max-width: none !important;width: 100%;}.SummaryCard-contentContainer{background: var(--softdark-color) !important;transition: all 0.6s !important;}.SummaryCard-contentContainer:hover{background: var(--soft-color) !important;}.Tweet-card {background: transparent !important;}.Tweet-card > .QuoteTweet {background: #ffffff38 !important;border-bottom-right-radius: 0 !important;border-bottom-left-radius: 0 !important;border-top-right-radius: 0px !important;border-top-left-radius: 0px !important;margin-top: 19px !important;} .TwitterCard-container {border: 1px solid var(--soft-color) !important;max-width: 10000px!important;}.TweetAuthor-name {font-size: 16px !important;}.Avatar:not(.Identity-avatar) {height: 36px !important;width: 36px !important;position: relative !important;min-width: 36px !important;top: 2px !important;}.Avatar.Identity-avatar {width: 16px !important;height: 16px !important;}.TweetAuthor-screenName {font-size: 14px !important;}.Tweet-body{font-size: 16px !important;} .TweetAuthor-avatar--ancestor .Avatar {left: -5px !important;}.TweetInfo {font-size: 12px !important;}.CallToAction {font-size: 13px !important;}.Tweet-card {font-size: 14px !important;}.Tweet-card > .QuoteTweet {background: #ffffff38 !important;border-bottom-right-radius: 0 !important;border-bottom-left-radius: 0 !important;border-top-right-radius: 0px !important;border-top-left-radius: 0px !important;margin-top: 19px !important;} .TweetAuthor-avatar{width: 36px !important;height: 36px !important;}";    
    }

    var j = totalrenderedtweets - 1;
    var processed = false;

    if (j > -2) {
      do {
        var obj = $("#twitter-widget-" + j);

        if (obj && obj.length > 0 && (forceProcess || obj.attr("processed") != "yes")) {
            processed = true;
              obj.attr("processed", "yes");

              var tweetStyle = document.createElement("style");

              tweetStyle.setAttribute("id", "tweet-style-" + j);
              tweetStyle.innerHTML = tweetCSS;
              tweetStyle.type = "text/css";

              //if (isAndroid || (isIOSChrome) || (isChromium !== null && typeof isChromium !== "undefined" && vendorName === "Google Inc." && isIEedge === false) || (isOpera === true) || (isSafari6Plus)) {
                  var styleTag = document.getElementById("twitter-widget-" + j).shadowRoot;
                  insertAfter(tweetStyle, styleTag.childNodes[0]);

              //} else {
              //    var tweetWidget = document.getElementById("twitter-widget-" + j).contentDocument;
              //    $(tweetWidget.head).prepend(tweetStyle);
              //} 

              totalrenderedtweets = totalrenderedtweets + 1;
        }
        j++;
      }
      while (j < totalrenderedtweets + searchtotal); 

      if (processed) {
        $('#tweetcount').fadeIn(800);
        $('#mask').fadeOut(1100);

        /*
        setTimeout(function(){
          $("html").scrollTop(0);
        }, 1000);
        
        */
      }

      return processed;
    }
    else {
      return false;
    }
}


function customizeSingleTweet() {
    var isChromium = window.chrome;
    var winNav = window.navigator;
    var vendorName = winNav.vendor;
    var isOpera = typeof window.opr !== "undefined";
    var isIEedge = winNav.userAgent.indexOf("Edge") > -1;
    var isIOSChrome = winNav.userAgent.match("CriOS");
    var isSafari6Plus = !!navigator.userAgent.match(/safari/i) && !navigator.userAgent.match(/chrome/i) && typeof document.body.style.webkitFilter !== "undefined";
    var ua = navigator.userAgent.toLowerCase();
    var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");

    var tweetCSS = ".EmbeddedTweet{height:auto !important;background: transparent !important; margin: 0 !important;}.EmbeddedTweet {max-width: none !important;width: 100%;padding-bottom: 25px !important;} .Identity-screenName {color: var(--text-color) !important;} .TwitterCardsGrid-col--spacerTop.SummaryCard-destination {color: var(--high-color) !important} .SandboxRoot {color: var(--text-color) !important} .CallToAction-text {color: var(--text-color)} .TweetAuthor-screenName {color: var(--high-color) !important} a {color: var(--high-color) !important} .TweetAuthor-screenName.Identity-screenName {color: var(--text-color) !important} .u-block.TwitterCardsGrid-col--spacerTop SummaryCard-destination {color: var(--text-color) !important} .Icon.Icon--twitter {display: none !important;}.SummaryCard-contentContainer{background: var(--softdark-color) !important;transition: all 0.6s !important;}.SummaryCard-contentContainer:hover{background: var(--soft-color) !important;}.Tweet-card {font-size: 19px !important;background: transparent !important;} .Tweet-card > .QuoteTweet {background: #ffffff38 !important;border-bottom-right-radius: 0 !important;border-bottom-left-radius: 0 !important;border-top-right-radius: 0px !important;border-top-left-radius: 0px !important;margin-top: 19px !important;} .Tweet-body{font-size: 19px !important;}.TweetAuthor-avatar{width: 50px !important;height: 50px !important;}.Avatar:not(.Identity-avatar) {height: 50px !important;width: 50px !important;position: absolute !important;top: -7px !important;}.Avatar.Identity-avatar {width: 20px !important;height: 22px !important;}.TweetAuthor-name {font-size: 18px !important;}.TweetAuthor-screenName {font-size: 15px !important;}.TweetInfo {font-size: 15px !important;}.CallToAction {font-size: 15px !important; padding-top: 0 !important;}.TwitterCard-container {max-width: 10000px!important;}";
      
    if ($('body').hasClass('big')) {
        tweetCSS = ".EmbeddedTweet{height:auto !important; background: transparent !important;border-radius: 0px !important;border: 0px !important; margin: 0 !important;padding-bottom: 25px !important;} .Identity-screenName {color: var(--text-color) !important;} .TwitterCardsGrid-col--spacerTop.SummaryCard-destination {color: var(--high-color) !important} .SandboxRoot {color: var(--text-color) !important} .CallToAction-text {color: var(--text-color)} .TweetAuthor-screenName {color: var(--high-color) !important} a {color: var(--high-color) !important} .TweetAuthor-screenName.Identity-screenName {color: var(--text-color) !important} .u-block.TwitterCardsGrid-col--spacerTop SummaryCard-destination {color: var(--text-color) !important} .Icon.Icon--twitter {display: none !important;} .CallToAction{border: 0px !important; padding-top: 0 !important;} .EmbeddedTweet {max-width: none !important;width: 100%;}.SummaryCard-contentContainer{background: var(--softdark-color) !important;transition: all 0.6s !important;}.Tweet-ancestorContents.Tweet-ancestorContents--repliesRefresh > .avatar {left: -8px !important;}.SummaryCard-contentContainer:hover{background: var(--soft-color) !important;}.Tweet-card {font-size: 19px !important;background: transparent !important;}.Tweet-card > .QuoteTweet {background: #ffffff38 !important;border-bottom-right-radius: 0 !important;border-bottom-left-radius: 0 !important;border-top-right-radius: 0px !important;border-top-left-radius: 0px !important;margin-top: 19px !important;} .Tweet-body{font-size: 19px !important;}.TweetAuthor-avatar{width: 50px !important;height: 50px !important;}.Avatar:not(.Identity-avatar) {height: 45px !important; width: 45px !important; position: relative !important; top: -2px !important;min-width: 43px !important;}.Avatar.Identity-avatar {width: 20px !important;height: 22px !important;} .TweetAuthor-avatar--ancestor .Avatar {left: -8px !important;}.TweetAuthor-name {font-size: 18px !important;}.TweetAuthor-screenName {font-size: 15px !important;}.TweetInfo {font-size: 15px !important;}.CallToAction {font-size: 15px !important;}.TwitterCard-container {border: 1px solid var(--soft-color) !important;max-width: 10000px!important;}";
    }
    else {
        tweetCSS = ".EmbeddedTweet{height:auto !important; background: transparent !important;border-radius: 0px !important;border: 0px !important; margin: 0 !important;padding-bottom: 25px !important;} .Identity-screenName {color: var(--text-color) !important;} .TwitterCardsGrid-col--spacerTop.SummaryCard-destination {color: var(--high-color) !important} .SandboxRoot {color: var(--text-color) !important} .CallToAction-text {color: var(--text-color)} .TweetAuthor-screenName {color: var(--high-color) !important} a {color: var(--high-color) !important} .TweetAuthor-screenName.Identity-screenName {color: var(--text-color) !important} .u-block.TwitterCardsGrid-col--spacerTop SummaryCard-destination {color: var(--text-color) !important} .Icon.Icon--twitter {display: none !important;} .CallToAction{border: 0px !important; padding-top: 0 !important;} .EmbeddedTweet {max-width: none !important;width: 100%;}.SummaryCard-contentContainer{background: var(--softdark-color) !important;transition: all 0.6s !important;}.SummaryCard-contentContainer:hover{background: var(--soft-color) !important;}.Tweet-card {background: transparent !important;}.Tweet-card > .QuoteTweet {background: #ffffff38 !important;border-bottom-right-radius: 0 !important;border-bottom-left-radius: 0 !important;border-top-right-radius: 0px !important;border-top-left-radius: 0px !important;margin-top: 19px !important;} .TwitterCard-container {border: 1px solid var(--soft-color) !important;max-width: 10000px!important;}.TweetAuthor-name {font-size: 16px !important;}.Avatar:not(.Identity-avatar) {height: 36px !important;width: 36px !important;position: relative !important;min-width: 36px !important;top: 2px !important;}.Avatar.Identity-avatar {width: 16px !important;height: 16px !important;}.TweetAuthor-screenName {font-size: 14px !important;}.Tweet-body{font-size: 16px !important;} .TweetAuthor-avatar--ancestor .Avatar {left: -5px !important;}.TweetInfo {font-size: 12px !important;}.CallToAction {font-size: 13px !important;}.Tweet-card {font-size: 14px !important;}.Tweet-card > .QuoteTweet {background: #ffffff38 !important;border-bottom-right-radius: 0 !important;border-bottom-left-radius: 0 !important;border-top-right-radius: 0px !important;border-top-left-radius: 0px !important;margin-top: 19px !important;} .TweetAuthor-avatar{width: 36px !important;height: 36px !important;}";    
    }

    console.log("-" + totalrenderedtweets + "-");
    var obj = $("#twitter-widget-" + totalrenderedtweets);

    console.log(obj.parent().parent());
    obj.attr("processed", "yes");
    var tweetStyle = document.createElement("style");

    tweetStyle.setAttribute("id", "tweet-style-" + totalrenderedtweets);
    tweetStyle.innerHTML = tweetCSS;
    tweetStyle.type = "text/css"; 

    //if (isAndroid || (isIOSChrome) || (isChromium !== null && typeof isChromium !== "undefined" && vendorName === "Google Inc." && isIEedge === false) || (isOpera === true) || (isSafari6Plus)) {
        var styleTag = document.getElementById("twitter-widget-" + totalrenderedtweets).shadowRoot;
        insertAfter(tweetStyle, styleTag.childNodes[0]);

    //} else {
    //    var tweetWidget = document.getElementById("twitter-widget-" + j).contentDocument;
    //    $(tweetWidget.head).prepend(tweetStyle);
    //} 
    
    totalrenderedtweets = totalrenderedtweets + 1;
    obj.parent().parent().appendTo($("#main")).fadeIn(1000);
}


function findFirstLink() {
var notFound = true;
var i = -1;
do {
  i = i + 1;
  var obj = $("#twitter-widget-" + i);

  if (obj && obj.length > 0) {
    notFound = false;
  }         
}
while (i < 10000 && notFound); 

return i;
}

function sleep(seconds) 
{
var e = new Date().getTime() + (seconds);
while (new Date().getTime() <= e) {}
}


function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.previousSibling);
}



/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


    
function showTooltip(event, obj) {
    var $element = $(obj);

    if (hasOverflow(obj)) {
        var tooltip = $("#tooltip");
        tooltip.text($element.text())
    

        tooltip.css("top", (event.pageY - 70) + "px");
        tooltip.css("left", getTooltipPosition(event.pageX) + "px");
    
        tooltip.fadeIn(700);

        setTimeout(function(){
            closeTooltip();
        }, 4000);
    }
}

function showFreeTooltip(x, y, text) {
    var tooltip = $("#tooltip");
    tooltip.text(text);

    tooltip.css("top", (y + 70) + "px");
    tooltip.css("left",  (x + 70) + "px");

    tooltip.fadeIn(700);
}


function getTooltipPosition(pageX) {
    var size = 500;
    if (window.innerWidth < 481) {
        size = 251;
    } 
    else if (window.innerWidth < 1000) {
        size = 387;
    }

    size = window.innerWidth - pageX - size;

    if (size < 0)
        pageX = pageX + size - 40;

    return pageX;
}

function closeTooltip() {
    $("#tooltip").fadeOut(700);
}

function hasOverflow(obj) {
    var $element = $(obj);
    
    var $c = $element
           .clone()
           .css({display: 'inline', width: 'auto', visibility: 'hidden'})
           .appendTo('body');

    if( $c.width() > $element.width() ) {
        $c.remove();
        return true;
    }
    else {
        $c.remove();
        return false;
    }
}




/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////



//getWebsiteData2('https://smallwarsjournal.com/jrnl/art/victimization-narrative-thematic-analysis-iranian-history-and-strategy')
function getWebsiteData2(url) {

    $.ajax({
        url: 'https://cors-anywhere.herokuapp.com/' + url
      }).then(function(data) {
        console.log('---------------WEBSITE ' + url + ' ----------------');
        // titulo - checar se é vazia
        
        
        var title = data.substring(data.indexOf("<title") + 7, data.indexOf("</title>"));
        title = title.substring(title.indexOf(">") + 1, data.indexOf("</title>"));
        
        var html = $(data);
        // descricao - checar se é vazia
        console.log("Descricao: " + getMetaContent(html, 'description') );

        console.log(data)

      });

}

function getMetaContent(html, name) {
  return html.filter((index, tag) => tag && tag.name && tag.name == name).attr('content');
}


//hasAvailableImage('45', 'https://cors-anywhere.herokuapp.com/https://s.wordpress.com/mshots/v1/https://zzzsmallwarsjournal.com/jrnl/art/victimization-narrative-thematic-analysis-iranian-history-and-strategy/')


    