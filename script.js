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
var isMy = false;
var useSwipes = false;

// START do tema
var currTheme = readCookie("currTheme");
if (currTheme && currTheme.length > 0 && currTheme != 'default') {
     changetheme(currTheme, true);
}  


$( document ).ready(function() { 

    // START mapa categorias
    catsmap.set("tvn", "New/Ongoing");
    catsmap.set("trn", "New / Hot / Trending");
    catsmap.set("tvi", "To Watch");
    catsmap.set("tvl", "Documentaries / Films");
    catsmap.set("tre", "Fast Reading");
    catsmap.set("trl", "Long Reading");
    catsmap.set("tke", "Important / To Keep");
    catsmap.set("imp", "Shocking Truth");
    catsmap.set("cli", "My Tweets");


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
   //setTimeout(function() { 
        //countalltweets(); agora é feito no setTimeout (em cima)
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
    //showSplash();

        
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
        }
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


    // START swip binds
    document.addEventListener('touchstart', handleTouchStart, false);        
    document.addEventListener('touchmove', handleTouchMove, false);
    document.addEventListener('touchend', handleTouchEnd, false);
    

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
    console.log("--------------------------------------------------------------------------");
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

    // DOUBLE TAP and DOUBLE CLICK (icon folderopen da backdiv)
    document.getElementById("folderopen").addEventListener("touchstart", tapHandler);
    document.getElementById("folderopen").addEventListener("click", clickHandler);


    // xyz 

    openMainSettingsPopup();

    /* 
    setTimeout( function() { 
        clickmenu('all', 'All Links');
    }, 1000 );


    var a = {};

    a.aaa = "aaa val";
    a.bbb = "bbb val";

    var ac = {};

    alert(jQuery.isEmptyObject(a));
    
    alert(jQuery.isEmptyObject(ac));
    
    alert("1: " + a.bbb)

    var ccc = JSON.stringify(a, null, " ");
    alert("2: " + ccc)

    var ddd = JSON.parse(ccc)

    alert("3: " + ddd.aaa)
    */



}); // FIM DO ONREADY



/////////////////////////////////////////////////////////////////////////
//                     DOUBLE TAP and DOUBLE CLICK                     //
/////////////////////////////////////////////////////////////////////////


function executeDoubleFunction(obj, type) {
    switch(obj) {
        case "folderopen":
            if (type == "double") {
                alert("Execute double on folderopen");
            }
            else {
                alert("Execute single on folderopen");
            }
            break;     
    }
}

var dblFlagControl = true;
function tapHandler(event) {
    var obj = event.currentTarget.id;
    dblFlagControl = false;
    if(!dblFlag) {
        dblFlag = true;
        dblClickTimeout = setTimeout( function() { 
            dblFlag = false; 
            executeDoubleFunction(obj, "single");
            setTimeout( function() { 
                dblFlagControl = true;
            }, 200 );
        }, 250 );
        return false;
    }
    event.preventDefault();
    clearTimeout(dblClickTimeout);
    dblFlag = false;
    dblFlagControl = true;
    executeDoubleFunction(obj, "double");
 }

 function clickHandler(event) {
    var obj = event.currentTarget.id;

    if (!dblFlagControl) {
        event.preventDefault();
        return false;
    }

    if(!dblFlag) {
        dblFlag = true;
        dblClickTimeout = setTimeout( function() { 
            dblFlag = false; 
            executeDoubleFunction(obj, "single");
        }, 250 );
        return false;
    }
    event.preventDefault();
    
    clearTimeout(dblClickTimeout);
    dblFlag = false;
    executeDoubleFunction(obj, "double");
 }
 


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

            showMessage("Links Successfully Imported"); 

            countalltweets(webLinksMap);

            eraseAllTmpData();
        }
        catch(err) {
            showMessage("Error Importing Links");
            createCookie("maxid", parseInt(currentId)); 
        }
        finally {

        }
    }, 100);      
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
//                               SWIPE                                 //
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
  currObjSwipe = getParentObjId($(event.target));
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
      }, 90);
    }, 10);                
};                                                

function handleTouchEnd(evt) {
    if (useSwipes && dblFlag && lastTouch) {                       
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
            create();
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
            getInformation(false, 2);
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
                */
                setTimeout(function() { 
                    gotop();
                }, 100); 
                
                showMessage("Scrolled to top", 2500, null, null, null, null, true, 500);
                 
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

    var tweetCSS = ".EmbeddedTweet{height:auto !important;background: transparent !important; margin: 0 !important;}.EmbeddedTweet {max-width: none !important;width: 100%;} .Identity-screenName {color: var(--text-color) !important;} .TwitterCardsGrid-col--spacerTop.SummaryCard-destination {color: var(--high-color) !important} .SandboxRoot {color: var(--text-color) !important} .CallToAction-text {color: var(--text-color)} .TweetAuthor-screenName {color: var(--high-color) !important} a {color: var(--high-color) !important} .TweetAuthor-screenName.Identity-screenName {color: var(--text-color) !important} .u-block.TwitterCardsGrid-col--spacerTop SummaryCard-destination {color: var(--text-color) !important} .Icon.Icon--twitter {display: none !important;}.SummaryCard-contentContainer{background: var(--softdark-color) !important;transition: all 0.6s !important;}.SummaryCard-contentContainer:hover{background: var(--soft-color) !important;}.Tweet-card {font-size: 19px !important;background: transparent !important;} .Tweet-card > .QuoteTweet {background: #ffffff38 !important;border-bottom-right-radius: 0 !important;border-bottom-left-radius: 0 !important;border-top-right-radius: 0px !important;border-top-left-radius: 0px !important;margin-top: 19px !important;} .Tweet-body{font-size: 19px !important;}.TweetAuthor-avatar{width: 50px !important;height: 50px !important;}.Avatar:not(.Identity-avatar) {height: 50px !important;width: 50px !important;position: absolute !important;top: -7px !important;}.Avatar.Identity-avatar {width: 20px !important;height: 22px !important;}.TweetAuthor-name {font-size: 18px !important;}.TweetAuthor-screenName {font-size: 15px !important;}.TweetInfo {font-size: 15px !important;}.CallToAction {font-size: 15px !important; padding-top: 0 !important;}.TwitterCard-container {max-width: 10000px!important;}";
      
    if ($('body').hasClass('big')) {
        tweetCSS = ".EmbeddedTweet{height:auto !important; background: transparent !important;border-radius: 0px !important;border: 0px !important; margin: 0 !important;} .Identity-screenName {color: var(--text-color) !important;} .TwitterCardsGrid-col--spacerTop.SummaryCard-destination {color: var(--high-color) !important} .SandboxRoot {color: var(--text-color) !important} .CallToAction-text {color: var(--text-color)} .TweetAuthor-screenName {color: var(--high-color) !important} a {color: var(--high-color) !important} .TweetAuthor-screenName.Identity-screenName {color: var(--text-color) !important} .u-block.TwitterCardsGrid-col--spacerTop SummaryCard-destination {color: var(--text-color) !important} .Icon.Icon--twitter {display: none !important;} .CallToAction{border: 0px !important; padding-top: 0 !important;} .EmbeddedTweet {max-width: none !important;width: 100%;}.SummaryCard-contentContainer{background: var(--softdark-color) !important;transition: all 0.6s !important;}.Tweet-ancestorContents.Tweet-ancestorContents--repliesRefresh > .avatar {left: -8px !important;}.SummaryCard-contentContainer:hover{background: var(--soft-color) !important;}.Tweet-card {font-size: 19px !important;background: transparent !important;}.Tweet-card > .QuoteTweet {background: #ffffff38 !important;border-bottom-right-radius: 0 !important;border-bottom-left-radius: 0 !important;border-top-right-radius: 0px !important;border-top-left-radius: 0px !important;margin-top: 19px !important;} .Tweet-body{font-size: 19px !important;}.TweetAuthor-avatar{width: 50px !important;height: 50px !important;}.Avatar:not(.Identity-avatar) {height: 45px !important; width: 45px !important; position: relative !important; top: -2px !important;min-width: 43px !important;}.Avatar.Identity-avatar {width: 20px !important;height: 22px !important;} .TweetAuthor-avatar--ancestor .Avatar {left: -8px !important;}.TweetAuthor-name {font-size: 18px !important;}.TweetAuthor-screenName {font-size: 15px !important;}.TweetInfo {font-size: 15px !important;}.CallToAction {font-size: 15px !important;}.TwitterCard-container {border: 1px solid var(--soft-color) !important;max-width: 10000px!important;}";
    }
    else {
        tweetCSS = ".EmbeddedTweet{height:auto !important; background: transparent !important;border-radius: 0px !important;border: 0px !important; margin: 0 !important;} .Identity-screenName {color: var(--text-color) !important;} .TwitterCardsGrid-col--spacerTop.SummaryCard-destination {color: var(--high-color) !important} .SandboxRoot {color: var(--text-color) !important} .CallToAction-text {color: var(--text-color)} .TweetAuthor-screenName {color: var(--high-color) !important} a {color: var(--high-color) !important} .TweetAuthor-screenName.Identity-screenName {color: var(--text-color) !important} .u-block.TwitterCardsGrid-col--spacerTop SummaryCard-destination {color: var(--text-color) !important} .Icon.Icon--twitter {display: none !important;} .CallToAction{border: 0px !important; padding-top: 0 !important;} .EmbeddedTweet {max-width: none !important;width: 100%;}.SummaryCard-contentContainer{background: var(--softdark-color) !important;transition: all 0.6s !important;}.SummaryCard-contentContainer:hover{background: var(--soft-color) !important;}.Tweet-card {background: transparent !important;}.Tweet-card > .QuoteTweet {background: #ffffff38 !important;border-bottom-right-radius: 0 !important;border-bottom-left-radius: 0 !important;border-top-right-radius: 0px !important;border-top-left-radius: 0px !important;margin-top: 19px !important;} .TwitterCard-container {border: 1px solid var(--soft-color) !important;max-width: 10000px!important;}.TweetAuthor-name {font-size: 16px !important;}.Avatar:not(.Identity-avatar) {height: 36px !important;width: 36px !important;position: relative !important;min-width: 36px !important;top: 2px !important;}.Avatar.Identity-avatar {width: 16px !important;height: 16px !important;}.TweetAuthor-screenName {font-size: 14px !important;}.Tweet-body{font-size: 16px !important;} .TweetAuthor-avatar--ancestor .Avatar {left: -5px !important;}.TweetInfo {font-size: 12px !important;}.CallToAction {font-size: 13px !important;}.Tweet-card {font-size: 14px !important;}.Tweet-card > .QuoteTweet {background: #ffffff38 !important;border-bottom-right-radius: 0 !important;border-bottom-left-radius: 0 !important;border-top-right-radius: 0px !important;border-top-left-radius: 0px !important;margin-top: 19px !important;} .TweetAuthor-avatar{width: 36px !important;height: 36px !important;}";    
    }

    var i = findFirstLink();
    var j = i;
    var processed = false;

    if (j > -1) {
      do {
        var obj = $("#twitter-widget-" + j);

        if (obj && obj.length > 0) {

          if (forceProcess || obj.attr("processed") != "yes") {
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
              
          } 
        }

        j++;
      }
      while (j < i + searchtotal); 

      if (processed) {
        $('#tweetcount').fadeIn(800);
        $('#mask').fadeOut(1100);
                  
        $('#moretweets').fadeOut(300);
        $('#moretweets').css('opacity', 0);

        setTimeout(function(){
          $("html").scrollTop(0);
          /**/

        }, 1000);  
      }

      return processed;
    }
    else {
      return false;
    }
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


function parseTweet(type) {
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

    setTimeout(function(){
        $('#tweetid').val(nextid);

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
            
            urldirect = "https://www.youtube.com/watch?v=" + text.substring(text.indexOf('embed') + 6, text.indexOf('frameborder') - 2); 

            text = "\"" + ("<iframe " 
                    + text.substring(8)).replace(/"/g, "'")  + "\""; 

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
            
            var urltemp = text.substring(text.indexOf('watch?v=') + 8);

            if (urltemp.indexOf("&t=") > 0) {
                urltemp = urltemp.replace("&t=","?start=");
                urltemp = urltemp.substring(0, urltemp.length -1);
            }

            text = "\"<iframe src='https://www.youtube.com/embed/" 
            + urltemp + "' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>\""; 

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

            text = "\"<iframe src='" 
                    + text + "'></iframe><div style='position: relative;left: 0px;width: 100px;height: 0px;top: -451px;'><div style='position: relative;left: 0px;width: 83px;height: 62vh;top: 0px;'></div></div><div style='position: relative;right: -16px !important;width: 100px;height: 0px;top: -451px;float: right;'><div style='position: relative;left: 0px;width: 83px;height: 62vh;top: 0px;'></div></div>\""; 

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

    if (addType == "T") {
        $('#result').val("{\r\n\"id\": \"" + nextid + "\",\r\n\"creationdate\": \"" + creationdate  + "\",\r\n\"type\": \"" + addType  + "\",\r\n\"url\": \"" + url  + "\",\r\n\"ishidden\": \"" + ishidden  + "\",\r\n\"date\": \"" + $('#date').val() + "\",\r\n\"author\": \"" + origin  + "\",\r\n\"categories\": \"" + cats + "\",\r\n\"tags\": \"" + tags + "\",\r\n\"info\": \"" + resinfo + "\",\r\n\"classif\": \"" + classif + "\",\r\n\"deleted\": \"\",\r\n\"isnew\": \"aaa\",\r\n\"tweet\": " + text + "\r\n},");
    }
    else if (addType == "Y") {
        $('#result').val("{\r\n\"id\": \"" + nextid + "\",\r\n\"creationdate\": \"" + creationdate  + "\",\r\n\"type\": \"" + addType  + "\",\r\n\"url\": \"" + urldirect  + "\",\r\n\"ishidden\": \"" + ishidden  + "\",\r\n\"date\": \"" + $('#date').val() + "\",\r\n\"author\": \"" + $('#postedby').val() + "\",\r\n\"categories\": \"" + cats + "\",\r\n\"tags\": \"" + tags + "\",\r\n\"info\": \"" + resinfo + "\",\r\n\"classif\": \"" + classif + "\",\r\n\"deleted\": \"\",\r\n\"isnew\": \"aaa\",\r\n\"tweet\": " + text + "\r\n},");
    }
    else {
        $('#result').val("{\r\n\"id\": \"" + nextid + "\",\r\n\"creationdate\": \"" + creationdate  + "\",\r\n\"type\": \"" + addType  + "\",\r\n\"url\": \"" + url  + "\",\r\n\"ishidden\": \"" + ishidden  + "\",\r\n\"date\": \"" + $('#date').val() + "\",\r\n\"author\": \"" + $('#postedby').val() + "\",\r\n\"categories\": \"" + cats + "\",\r\n\"tags\": \"" + tags + "\",\r\n\"info\": \"" + resinfo + "\",\r\n\"classif\": \"" + classif + "\",\r\n\"deleted\": \"\",\r\n\"isnew\": \"aaa\",\r\n\"tweet\": " + text + "\r\n},");
    }

    var result = $('#result').val();
    
    $('#linkresult').val(result);
    $("#linkresult").select();

    document.execCommand('copy');

    $("#linkresult").blur();

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
    showMessage("New Link Created And Copied To Clipboard");
    closeSettingsPopup();
    
    //if ($("#preview").is(":checked")) {
        
    eraseLinkTmpData(nextid, true);

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


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


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

 
function saveinfo(obj, id) {
    createCookie(id + "info", encodeURIComponent($("#" + id + "info").val()), 99999);
    
    $(obj).parent().parent().find("#expand").addClass("infomodified");
    
    $(obj).parent().find("textarea.info").css("border", "2px solid red");

    if ($("#" + id + "oldinfo").length > 0) {
      $("#" + id + "oldinfo").css("border", "2px solid red");

      $("#" + id + "undoinfo").css("display", "inline-block");
    }
    createCookie("haschanges", "yes");
    if (showColorsAdv) {
        $("#generateicon").addClass("haschanges");
        if (showColors) {
            $("#settings").addClass("haschanges");
        }
    }  
    showMessage("Information About Link Saved"); 
}   


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function saveclassif(obj, id) {
    createCookie(id + "classif", $("#" + id + "classif").val(), 99999);

    $(obj).parent().parent().parent().find("#expand").addClass("infomodified");

    $(obj).parent().find("#" + id + "classif").css("border", "2px solid red");

    if ($("#" + id + "oldclassif").length > 0) {
        $("#" + id + "oldclassif").show();
        $("#" + id + "oldclassif").css("border", "2px solid red");

        $("#" + id + "undoinfo").css("display", "inline-block");
    }

    createCookie("haschanges", "yes");
    if (showColorsAdv) {
        $("#generateicon").addClass("haschanges");
        if (showColors) {
            $("#settings").addClass("haschanges");
        }
    }  
    showMessage("Link Classification Saved"); 
}  


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function undosaveclassif(obj, id) {
    var oldtext = readCookie(id + "classif");

    //if ($(obj).parent().find(".oldclassif"))
       
    if ($("#" + id + "oldclassif")) {
        oldtext = $("#" + id + "oldclassif").text();
        $(obj).css("display", "none");
        $("#" + id + "oldclassif").remove();
    }

    createCookie(id + "classif", "", 99999);
    
    $(obj).parent().parent().parent().find("#expand").removeClass("infomodified");
    
    $(obj).parent().find("#" + id + "classif").val(oldtext);
    $(obj).parent().find("#" + id + "classif").css("border", "none");

    var callback = function(flag) {      
        if (flag) {
            createCookie("haschanges", "yes");
            if (showColorsAdv) {
                $("#generateicon").addClass("haschanges");
                if (showColors) {
                    $("#settings").addClass("haschanges");
                }
            }  
        }
        else {
            createCookie("haschanges", "");
            $("#settings").removeClass("haschanges");
            $("#generateicon").removeClass("haschanges");
        }

        showMessage("Link Reclassification Reverted");
    } 

    hasTweetChanges(callback);
}  


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function undosaveinfo(obj, id) {
    var oldtext = readCookie(id + "info");

    if ($("#" + id + "oldinfo").length > 0)
        oldtext = encodeURIComponent($("#" + id + "oldinfo").text());

    createCookie(id + "info", "", 99999);

    $(obj).parent().parent().find("#expand").removeClass("infomodified");

    $(obj).parent().find("textarea.info").val(decodeURIComponent(oldtext));
    $(obj).parent().find("textarea.info").css("border", "none");

    $("#" + id + "undoinfo").css("display", "none");

    if ($("#" + id + "oldinfo").length > 0) {
        $("#" + id + "oldinfo").remove();
    }          
    
    var callback = function(flag) {      
        if (flag) {
            createCookie("haschanges", "yes");
            if (showColorsAdv) {
                $("#generateicon").addClass("haschanges");
                if (showColors) {
                    $("#settings").addClass("haschanges");
                }
            }  
        }
        else {
            createCookie("haschanges", "");
            $("#settings").removeClass("haschanges");
            $("#generateicon").removeClass("haschanges");
        }

        showMessage("Information About Link Reverted");
    } 

    hasTweetChanges(callback);
}  


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function removetweet(obj) {
    fixfocus(obj);


    if ($('#linkChange').attr("cid") != "new") {

        var functorun = function(jsonvar) 
        { 
            var isdeleted = readCookie($('#linkChange').attr("cid") + "isdeleted");
            if (jsonvar.deleted != "" || (isdeleted && isdeleted.length > 0)) {
                try {
                    $( "#dialog-confirm-delete" ).dialog({
                        resizable: false,
                        height: "auto",
                        width: 400,
                        modal: true,
                        buttons: {
                          "Yes": function() {
                            jsonvar.deleted = "yes";
                            createCookie(jsonvar.id + "isdeleted", "yes", 99999);
                            updateLinkCookie(jsonvar);
    
                            $("#main").empty();
                            $('#moretweets').hide();
                            $('#tweetcount').hide(); 
    
                            countalltweets();
                            showMessage("Link Deleted Forever");
                            closeSettingsPopup();
                            $("#mask").fadeOut(500);
                            $("#dialog-confirm-delete").parent().fadeOut( 800, function() {
                              $("#dialog-confirm-delete").parent().remove();
                            });
                          },
                          "Restore": function() {
                            createCookie($('#linkChange').attr("cid") + "isdeleted", "", 99999);
            
                            if (hasTweetChanges()) {
                                createCookie("haschanges", "yes");
                                if (showColorsAdv) {
                                    $("#generateicon").addClass("haschanges");
                                    if (showColors) {
                                        $("#settings").addClass("haschanges");
                                    }
                                }  
                            }
                            else {
                              createCookie("haschanges", "");
                              $("#settings").removeClass("haschanges");
                              $("#generateicon").removeClass("haschanges");
                            }
            
                            jsonvar.deleted = "";
                            updateLinkCookie(jsonvar);
                            updateLinkColor(jsonvar);
                            showMessage("Link Marked To Delete Reverted");
                              $("#mask").fadeOut(500);
                              $("#dialog-confirm-delete").parent().fadeOut( 800, function() {
                                $("#dialog-confirm-delete").parent().remove();
                              });
    
                          },
                          Cancel: function() {
                              $("#mask").fadeOut(500);
                              $("#dialog-confirm-delete").parent().fadeOut( 800, function() {
                                $("#dialog-confirm-delete").parent().remove();
                              });
                          }
                        }
                      });
                    } catch (error) {
                        
                    }
                    $("#dialog-confirm-delete").parent().css("top", ((window.innerHeight/2) - 100) + "px")
                    $("#mask").fadeIn(500);
                    $("#dialog-confirm-delete").parent().fadeIn(800);
            } 
            else {
                createCookie($('#linkChange').attr("cid") + "isdeleted", "a", 99999);
                jsonvar.deleted = "a";
                updateLinkCookie(jsonvar);
                updateLinkColor(jsonvar);
                if (showColorsAdv) {
                    $("#generateicon").addClass("haschanges");
                    if (showColors) {
                        $("#settings").addClass("haschanges");
                    }
                }  
                createCookie("haschanges", "yes");
                showMessage("Link Marked To Delete");
            }
        } 
        getJsonbyid($('#linkChange').attr("cid"), functorun);
    }
    else {
        create();
    }
}    

function updateLinkCookie(obj) {
    var link = "{\r\n\"id\": \"" + obj.id + "\",\r\n\"creationdate\": \"" + obj.creationdate  + "\",\r\n\"type\": \"" + obj.type  + "\",\r\n\"url\": \"" + obj.url  + "\",\r\n\"ishidden\": \"" + obj.ishidden  + "\",\r\n\"date\": \"" + obj.date + "\",\r\n\"author\": \"" + obj.author  + "\",\r\n\"categories\": \"" + obj.categories + "\",\r\n\"tags\": \"" + obj.tags + "\",\r\n\"info\": \"" + obj.info.replace(/"/g, "").replace(/(\r\n|\n|\r)/gm, "").trim() + "\",\r\n\"classif\": \"" + obj.classif + "\",\r\n\"deleted\": \"" + obj.deleted + "\",\r\n\"tweet\": \"" + obj.tweet + "\"\r\n},";

    var mlink = encodeURIComponent(JSON.stringify(link));
    
    createCookie(obj.id + "templink", mlink, 99999);
}

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function changetag(obj, id) {

    var text = readCookie(id + "tagchanged");

    $("#changetags").find('span.poptitle').text("Change tags")

    if (text && text.length > 0)
        $("#changetags").find('input').val(text);
    else
        $("#changetags").find('input').val($(obj).attr('tagactual'));

    $("#changetags").attr('currid', id);
    $("#changetags").attr('iscat', "no");

    $("#changetags").fadeIn();
}   


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function acceptTag(obj) {
    var id = $(obj).parent().parent().attr("currid");

    var iscat = $("#changetags").attr('iscat');

    if (iscat && iscat == "yes") { 
        createCookie(id + "catchanged", $(obj).parent().find('input').val());
    
        var text = readCookie(id + "tagchanged");
        if (text && text.length > 0) {
            $('#' + id).find('.tags').css('background-image', 'linear-gradient(to right, rgb(247, 205, 205), rgb(177, 0, 0), rgb(247, 205, 205))');
        }
        else {
            $('#' + id).find('.tags').css('background-image', 'linear-gradient(to left, rgb(177, 0, 0), rgb(247, 205, 205))');
        }

        $('#' + id).find('.newcat').html('<b> New categories </b>' + $(obj).parent().find('input').val());   

        if (showColorsAdv) {
            $("#generateicon").addClass("haschanges");
            if (showColors) {
                $("#settings").addClass("haschanges");
            }
        }  
        createCookie("haschanges", "yes");
        showMessage("Category Marked To Change");
    }
    else {
        createCookie(id + "tagchanged", $(obj).parent().find('input').val());
    
        var text = readCookie(id + "catchanged");
        if (text && text.length > 0) {
            $('#' + id).find('.tags').css('background-image', 'linear-gradient(to right, rgb(247, 205, 205), rgb(177, 0, 0), rgb(247, 205, 205))');
        }
        else {
            $('#' + id).find('.tags').css('background-image', 'linear-gradient(to right, rgb(177, 0, 0), rgb(247, 205, 205))');
        }

        $('#' + id).find('.newtag').html('<b> New tags </b>' + $(obj).parent().find('input').val());

        if (showColorsAdv) {
            $("#generateicon").addClass("haschanges");
            if (showColors) {
                $("#settings").addClass("haschanges");
            }
        }  
        createCookie("haschanges", "yes");
        showMessage("Tag Marked To Change");
    }

    $("#changetags").fadeOut();
}   


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function undotag(obj) {
    var id = $(obj).parent().parent().attr("currid");

    var iscat = $("#changetags").attr('iscat');

    if (iscat && iscat == "yes") {
        eraseCookie(id + "catchanged");

        $(obj).parent().find('input').val($(obj).parent().find('#changecat').attr('catactual'));
        $('#' + id).find('.newcat').html('');

        var text = readCookie(id + "tagchanged");
        if (text && text.length > 0) {
            $('#' + id).find('.tags').css('background-image', 'linear-gradient(to right, rgb(177, 0, 0), rgb(247, 205, 205))');
        }
        else {
            $('#' + id).find('.tags').css('background', '#00000021').css('border-bottom', '1px solid #00000038');
        }
        if (hasTweetChanges()) {
            if (showColorsAdv) {
                $("#generateicon").addClass("haschanges");
                if (showColors) {
                    $("#settings").addClass("haschanges");
                }
            }  
            createCookie("haschanges", "yes");
        }
        else {
          $("#generateicon").removeClass("haschanges");
          $("#settings").removeClass("haschanges");
          createCookie("haschanges", "");
        }
        showMessage("Tag Marked To Change Reverted");
    }
    else {
        eraseCookie(id + "tagchanged");

        $(obj).parent().find('input').val($(obj).parent().find('#changetag').attr('tagactual'));
        $('#' + id).find('.newtag').html('');

        var text = readCookie(id + "catchanged");
        if (text && text.length > 0) {
            $('#' + id).find('.tags').css('background-image', 'linear-gradient(to left, rgb(177, 0, 0), rgb(247, 205, 205))');
        }
        else {
            $('#' + id).find('.tags').css('background', '#00000021').css('border-bottom', '1px solid #00000038');
        }
        if (hasTweetChanges()) {
            if (showColorsAdv) {
                $("#generateicon").addClass("haschanges");
                if (showColors) {
                    $("#settings").addClass("haschanges");
                }
            }  
          createCookie("haschanges", "yes");
        }
        else {
          $("#settings").removeClass("haschanges");
          $("#generateicon").removeClass("haschanges");
          createCookie("haschanges", "");
        }
        showMessage("Category Marked To Change Reverted");
    }

    $("#changetags").fadeOut();
}  


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function changecat(obj, id) {

    var text = readCookie(id + "catchanged");

    $("#changetags").find('span.poptitle').text("Change categories")

    if (text && text.length > 0)
        $("#changetags").find('input').val(text);
    else
        $("#changetags").find('input').val($(obj).attr('catactual'));

    $("#changetags").attr('currid', id);

    $("#changetags").attr('iscat', "yes");

    $("#changetags").fadeIn();
}   


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function countalltweets(webLinksMap) {

    resetFields(false);
    var path = "./data.json";
    var counters = new Map();
    var tagsmap = new Map();
    total = 0;
    var total_y = 0;
    var total_t = 0;
    var total_h = 0;    
    var text = '{"Tweets": [';
    var ind = false;
    var processtmp = true;
    nextid = null;
    try {
        nextid = parseInt(readCookie("maxid"));
    }
    catch(err) {
        console.log("countalltweets - Error parsing next id");
    }
    finally {
        if (nextid) {
            $("#maxid").val(nextid);
            console.log("countalltweets - nextid vem do cookie: " + nextid);
            nextid = nextid - 1;
        }
        else {
            nextid = parseInt($("#maxid").val());
            createCookie("maxid", nextid);
            console.log("countalltweets - nextid vem do hidden field: " + nextid);
            nextid = nextid - 1;
        }
    }
    $.getJSON(path, function(data) 
    {
      $.each(data.Tweets, function(key, val) 
        {
            
            var recordfromdata = val;
            var linkcontent = null;
            var linktmp = null;
            
            do {
                if (processtmp) {
                    linkcontent = readCookie(nextid + "templink");

                    if (linkcontent && linkcontent.length > 0) {
                        
                        linktmp = decodeURIComponent(linkcontent);
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

                    if (webLinksMap) {
                        var linkObj = webLinksMap.get(parseInt(val.id));

                        if (linkObj) {
                            updateWebLink(linkObj, val);
                        }
                    }


                    var doShowDeletedLink = true;  
                    if (!$("#showdeleted").is(":checked")) {
                        if (val.deleted != "" || (isdeleted && isdeleted.length > 0)) {
                            doShowDeletedLink = false; 
                        } 
                    }
    
                    if (doShowDeletedLink) {
    
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
                    }
                }   
            }
            while (processtmp);
          
        });
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

        }
        
        // All Links
        $("#all").text(total);
        $("#all2").text(total);
        $("#all").parent().attr("title", "Twitter: " + total_t + " - Youtube: " + total_y + " - Website: " + total_h);
        $("#all2").parent().attr("title", "Twitter: " + total_t + " - Youtube: " + total_y + " - Website: " + total_h);

        // New/Ongoing
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

        // New / Hot / Trending
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

        // To Watch
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


        // Documentaries / Films
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

        // Fast Reading
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

        // Long Reading
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

        // Important / To Keep
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
        
        dblFlag = false;  

        var paramid = getParameterByName('tweetid');
        if (paramid) {
          getInformationbyid(paramid);   
        }


        /*
        if (dosearchmore) {
            $( "#mask" ).fadeOut( 800, function() {
                var style = window.getComputedStyle(body, null);
        
                $("#mask").css("background", style.getPropertyValue('--soft-transp-color'));
                $("#mask .fa-folder-open").hide();
                $("#mask > div" ).hide();
                $("#mask > .fa-circle-o-notch").show();
            });
        }

         */
    }); 

} 


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function undogenerate(obj) {

    if (obj)
        fixfocus(obj);

    var idF = null;
    
    try {
        idF = parseInt(readCookie("maxid"));
    }
    catch(err) {
    }
    finally {
        if (idF) {
            $("#maxid").val(idF);
            idF = idF - 1;
        }
        else {
            idF = parseInt($("#maxid").val());
            createCookie("maxid", idF);
            idF = idF - 1;
        }
    }
    if (isMy) {
        var r = confirm("Remove all Changes?");
        if (r == true) {
            resetFields(false);
    
            do {
    
                eraseCookie(idF + "templink");
        
                eraseCookie(idF + "isdeleted");
        
                eraseCookie(idF + "catchanged");
        
                eraseCookie(idF + "tagchanged");

                eraseCookie(idF + "datechanged");
                
                eraseCookie(idF + "author");

                eraseCookie(idF + "info");
        
                eraseCookie(idF + "classif");
    
                eraseCookie(idF + "haschanges");
    
                idF = idF - 1;
            }
            while (idF >= 0);        
        
            createCookie("haschanges", "");
            $("#settings").removeClass("haschanges");
            $("#generateicon").removeClass("haschanges");
        
            showMessage("Changes Were Cleaned"); 
        }
    }   
    else {
        do {
    
            eraseCookie(idF + "templink");
    
            eraseCookie(idF + "isdeleted");
    
            eraseCookie(idF + "catchanged");
    
            eraseCookie(idF + "tagchanged");
    
            eraseCookie(idF + "info");
    
            eraseCookie(idF + "classif");
                
            eraseCookie(idF + "datechanged");
            
            eraseCookie(idF + "author");

            eraseCookie(idF + "haschanges");

            idF = idF - 1;
        }
        while (idF >= 100000);        
        createCookie("haschanges", "");
        $("#settings").removeClass("haschanges");
        $("#generateicon").removeClass("haschanges");
    } 
}

function eraseAllTmpData(obj) {

    if (obj)
        fixfocus(obj);

    var idF = null;
    
    try {
        idF = parseInt(readCookie("maxid"));
    }
    catch(err) {
    }
    finally {
        if (idF) {
            $("#maxid").val(idF);
            idF = idF - 1;
        }
        else {
            idF = parseInt($("#maxid").val());
            createCookie("maxid", idF);
            idF = idF - 1;
        }
    }

    do {
        eraseLinkTmpData(idF);

        idF = idF - 1;
    }
    while (idF >= 100000);        

    createCookie("haschanges", "");

    $("#settings").removeClass("haschanges");
    $("#generateicon").removeClass("haschanges");
}

function eraseLinkTmpData(idF, flag) {

    if (flag) {
        eraseCookie(idF + "templink");
    }

    eraseCookie(idF + "isdeleted");

    eraseCookie(idF + "catchanged");

    eraseCookie(idF + "tagchanged");

    eraseCookie(idF + "info");

    eraseCookie(idF + "classif");

    eraseCookie(idF + "author");

    eraseCookie(idF + "datechanged");

    eraseCookie(idF + "isnew");
    
    eraseCookie(idF + "haschanges");
}



/* function undogenerate() {
  var path = "./data.json";
  var ind = false;
  resetFields(false);

  $.getJSON(path, function(data) 
  {
    var processtmp = true;
    nextid = parseInt(readCookie("maxid")) - 1;

    $.each(data.Tweets, function(key, val) 
      {
        var recordfromdata = val;
        var linkcontent = null;
        
        do {
            if (processtmp) {
                linkcontent = readCookie(nextid + "templink_bk");
                if (linkcontent && linkcontent.length > 0) {
                    var linktmp = decodeURIComponent(linkcontent);
                    linktmp = linktmp.replace(/(?:\\[rn])+/g, "\\n");
                    linktmp = linktmp.substring(1, linktmp.length - 2).replace(/(\\n)/gm, ""); 
                    linktmp = linktmp.replace(/(\\)/gm, ""); 
                    linktmp = JSON.parse(linktmp);
                    ind = true;
                    val = linktmp;
                    createCookie(nextid + "templink", linktmp, 99999);
                    createCookie(nextid + "templink_bk", "", 99999);
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

            var cat = readCookie(val.id + "catchanged_bk");
            if (cat && cat.length > 0) {
                ind = true;
                createCookie(val.id + "catchanged_bk", "", 99999);
                createCookie(val.id + "catchanged", cat, 99999);
            }
            else {
                createCookie(val.id + "catchanged", "", 99999);
            }

            var tag = readCookie(val.id + "tagchanged_bk");
            if (tag && tag.length > 0) {
                ind = true;
                val.tags = tag;
                createCookie(val.id + "tagchanged", tag, 99999);
                createCookie(val.id + "tagchanged_bk", "", 99999);
            }
            else {
                createCookie(val.id + "tagchanged", "", 99999);
            }

            var info = readCookie(val.id + "info_bk");
            if (info && info.length > 0) {
                ind = true;
                val.info = info;
                createCookie(val.id + "info", info, 99999);
                createCookie(val.id + "info_bk", "", 99999);
            }
            else {
                createCookie(val.id + "info", "", 99999);
            }

            var classif = readCookie(val.id + "classif_bk");
            if (classif && classif.length > 0) {
                ind = true;
                val.classif = classif;
                createCookie(val.id + "classif", classif, 99999);
                createCookie(val.id + "classif_bk", "", 99999);
            }
            else {
                createCookie(val.id + "classif", "", 99999);
            }

            var isdeleted = readCookie(val.id + "isdeleted_bk");
            if (isdeleted && isdeleted.length > 0) {
                ind = true;
                createCookie(val.id + "isdeleted", "yes", 99999);
                createCookie(val.id + "isdeleted_bk", "", 99999);
            } 
            else {
                createCookie(val.id + "isdeleted", "", 99999);
            }    
        }
        while (processtmp);        
      });

      if (ind) {
        createCookie("haschanges", "yes");
            if (showColorsAdv) {
                $("#generateicon").addClass("haschanges");
                if (showColors) {
                    $("#settings").addClass("haschanges");
                }
            } 
      }

      showMessage("Processed Changes Were Reverted");
  }); 
} */ 


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function hasTweetChanges(callback) {
  var path = "./data.json";
  var ind = false;
  
  $.getJSON(path, function(data) 
  {
    nextid = null;
    try {
        nextid = parseInt(readCookie("maxid"));
    }
    catch(err) {
        console.log("hasTweetChanges - Error parsing next id");
    }
    finally {
        if (nextid) {
            $("#maxid").val(nextid);
            console.log("hasTweetChanges - nextid vem do cookie: " + nextid);
            nextid = nextid - 1;
        }
        else {
            nextid = parseInt($("#maxid").val());
            createCookie("maxid", nextid);
            console.log("hasTweetChanges - nextid vem do hidden field: " + nextid);
            nextid = nextid - 1;
        }
    }

    var processtmp = true;

    $.each(data.Tweets, function(key, val) 
      {
        var recordfromdata = val;
        var linkcontent = null;
        

        do {
            if (processtmp) {
                linkcontent = readCookie(nextid + "templink");
                if (linkcontent && linkcontent.length > 0) {
                    nextid = nextid - 1;
                    
                    ind = true;
                    return false;
                }
                else {
                    val = recordfromdata;
                    processtmp = false;
                }
            }
            else {
                val = recordfromdata;
            }

            var cat = readCookie(val.id + "catchanged");
            if (cat && cat.length > 0) {
                ind = true;
                return false;
            }

            var tag = readCookie(val.id + "tagchanged");
            if (tag && tag.length > 0) {
                ind = true;
                return false;
            }

            var info = readCookie(val.id + "info");
            if (info && info.length > 0) {
                ind = true;
                return false;
            }

            var author = readCookie(val.id + "author");
            if (author && author.length > 0) {
                ind = true;
                return false;
            }

            var datechanged = readCookie(val.id + "datechanged");
            if (datechanged && datechanged.length > 0) {
                ind = true;
                return false;
            }

            var isdeleted = readCookie(val.id + "isdeleted");
            if (val.deleted != "" || (isdeleted && isdeleted.length > 0)) {
                ind = true;
                return false;
            } 
        }
        while (processtmp);
      });

      if (callback)
          callback(ind);

      return ind;
  }); 
  return ind;
} 

function generate(obj) {
    if (obj)
        fixfocus(obj);

    resetFields(false);
    var path = "./data.json";
    var text = '';
    if (isMy) text = '{"Tweets": [';
    else text = '[';

    var ind = false;
    var processtmp = true;
    
    nextid = null;
    try {
        nextid = parseInt(readCookie("maxid"));
    }
    catch(err) {
        console.log("generate - Error parsing next id");
    }
    finally {
        if (nextid) {
            $("#maxid").val(nextid);
            console.log("generate - nextid vem do cookie: " + nextid);
            nextid = nextid - 1;
        }
        else {
            nextid = parseInt($("#maxid").val());
            createCookie("maxid", nextid);
            console.log("generate - nextid vem do hidden field: " + nextid);
            nextid = nextid - 1;
        }
    }

    $.getJSON(path, function(data) 
    {
      $.each(data.Tweets, function(key, val) 
        {
            var recordfromdata = val;
            var linkcontent = null;
            var linktmp = null;

            var fromWeb = true; 

            do {
                if (processtmp) {
                    fromWeb = false; 

                    linkcontent = readCookie(nextid + "templink");

                    if (linkcontent && linkcontent.length > 0) {
                        linktmp = decodeURIComponent(linkcontent);
                        linktmp = linktmp.replace(/(?:\\[rn])+/g, "\\n");
                        linktmp = linktmp.substring(1, linktmp.length - 2).replace(/(\\n)/gm, ""); 
                        linktmp = linktmp.replace(/(\\)/gm, ""); 

                        linktmp = JSON.parse(linktmp);
                        
                        val = linktmp;
                        nextid = nextid - 1;
                    }
                    else {
                        val = recordfromdata;
                        processtmp = false;
                        fromWeb = true; 
                    }
                }
                else {
                    fromWeb = true; 
                    val = recordfromdata;
                }

                if (val.id != "0") {
                    var auxLink = {};

                    var cat = readCookie(val.id + "catchanged");
                    if (cat && cat.length > 0) {
                        alert(cat)
                        val.categories = cat;
                        auxLink.categories = cat;
                    }
        
                    var tag = readCookie(val.id + "tagchanged");
                    if (tag && tag.length > 0) {
                        val.tags = tag;
                        auxLink.tags = tag;
                    }
        
                    var info = readCookie(val.id + "info");
                    if (info && info.length > 0) {
                        val.info = info;
                        auxLink.info = info;
                    }
        
                    var classif = readCookie(val.id + "classif");
                    if (classif && classif.length > 0) {
                        val.classif = classif;
                        auxLink.classif = classif;
                    }
    
                    var datechanged = readCookie(val.id + "datechanged");
                    if (datechanged && datechanged.length > 0) {
                        val.date = datechanged;
                        auxLink.date = datechanged;
                    }
    
                    var author = readCookie(val.id + "author");
                    if (author && author.length > 0) {
                        val.author = author;
                        auxLink.author = author;
                    }
    
                    var isdeleted = readCookie(val.id + "isdeleted");
    
                    if (isMy) {
                        if (isdeleted && isdeleted.length > 0) {
                        } 
                        else {
                            if (ind) {
                                text = text + ",";
                            }
                            else {
                                ind = true;
                            }
                            text = text + JSON.stringify(val, null, " ");  
                        }
                    }
                    else {
                        if (val.deleted != "" || (isdeleted && isdeleted.length > 0)) {
                            if (val.deleted == "yes" || (isdeleted && isdeleted == "yes")) {
                                val.deleted = "yes";
                                auxLink.deleted = "yes";
                            }
                            else {
                                auxLink.deleted = "a";
                                val.deleted = "a";
                            }
    
                        }
                        else {
                            val.deleted = "";
                        }
    
                        if (ind) {
                            text = text + ",";
                        }
                        else {
                            ind = true;
                        }
    
                        if (!fromWeb) {
                            text = text + JSON.stringify(val, null, " ");  
                        }
                        else if (!jQuery.isEmptyObject(auxLink)) {
                            auxLink.id = val.id;
                            
                            text = text + JSON.stringify(auxLink, null, " ");
                        }
                        else {
                            text = text.substring(0, text.length - 1);
                        }
                    } 
                }
            }
            while (processtmp);
          
        });

        if (isMy) {
            text = text + ']}';
            $('#linkresult').val(text);
            $("#linkresult").select();
            document.execCommand('copy'); 
            $("#linkresult").blur();
            showMessage("Changes Processed And Copied To Clipboard");
        }
        else {
            var date = new Date();
            text = text + ']';
            
            download("BookmarksStationLinks_" + formatDate(date) + ".txt", text);
        }
    }); 
} 


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




/////////////////////////////////////////////////////////////////////////
//                             GENERAL                                 //
/////////////////////////////////////////////////////////////////////////

function expandCat(obj, idparam) {

    var id = null;

    if (idparam) {
        id = idparam;
    }
    else {
        id = $(obj).parent().attr("id");
        fixfocus(obj);
    }
    
    var functorun = function(jsonvar) 
    { 
        
        if (jsonvar != null) {
            openSettingsPopup(jsonvar);
        }
    } 
    getJsonbyid(id, functorun);
}

function fixfocus(el)
{
    $(el).clone(el).insertAfter($(el));
    $(el).remove();
}

function zoom(obj, flag) {
    if (obj) fixfocus(obj);
    
    $('body').addClass('notransit');

    if (flag || !$('body').hasClass('big')) {
        $('#zoomin').addClass('fa-search-minus');
        $('#zoomin').removeClass('fa-search-plus');
        $('body').addClass('big');
        customizeTweets(null, true, true);
        createCookie("hasZoom", true);
    }
    else {
        $('#zoomin').addClass('fa-search-plus');
        $('#zoomin').removeClass('fa-search-minus');
        $('body').removeClass('big');
        customizeTweets(null, true, false);
        createCookie("hasZoom", "");
    }

    // create
    var setHeight = "18px";
    var setHeight2 = "18px";
    if ($('body').hasClass('big')) {
        setHeight = "30px";
        setHeight2 = "28px";
    }

    // search
    updateSearchTablesHeight();

    // settings
    $("#mainsettings table#theme")
    .css('max-height', setHeight)
    .find('.sectionedittd i').addClass('fa-angle-down').removeClass('fa-angle-up').show()
    .find('td.el').addClass('ellipsis');

    $(".newLayout table.defaulttablerow").each( function( index, element ) {
        var table = $(element);
        table.css('max-height', setHeight);
    });

    $("#mainmenu.newLayout table.defaulttablerow").each( function( index, element ) {
        var table = $(element);
        
        table.css('max-height', setHeight2);
    });

    if ($('#linkChange').attr("cid") != "new") {
        $('#linkChange').find("table:not(.defaulttablerow):not(.newlinktable)").each( function( index, element ) {
            var table = $(element);
        
            table.css('max-height', setHeight);
            table.find('.sectionedittd i').addClass('fa-angle-down').removeClass('fa-angle-up');
            table.find('td.el').addClass('ellipsis');
        });
    }
    
    setTimeout(function(){
        $('body').removeClass('notransit'); 
    }, 1400);  
}



var openSettingsPopup = function(jsonobj) 
{
    // GENERAL
    var hasChanges = false;

    
    // OTHER SETTINGS
    $('body, html').css('overflow-y', 'hidden');

    if (jsonobj) {
        var setHeight = "18px";

        if ($('body').hasClass('big'))
            setHeight = "30px";
    
        $('#linkChange').find("table:not(.buttonstable)").each( function( index, element ) {
            var table = $(element);

            table.css('max-height', setHeight);
            table.find('.sectionedittd i').addClass('fa-angle-down').removeClass('fa-angle-up').show();
            table.find('td.el').addClass('ellipsis');
        });

        $(".fa-angle-up").show();  

        $('#linktable').hide();

        $('#previewtable').hide();

        $('#linkChange').attr("cid", jsonobj.id);
        $('#linkChange').attr("clink", jsonobj.url);
        $('#linkChange').removeClass("new");
        $('#linktable').hide();
        
        $('#editTags').css('margin-top', '75px');  
        
        $("#linkChange .buttonstable tr:first-child td i.fa").attr('class','').attr('style','margin-right: 9px;font-size: 18px;position: relative;top: 2px;');

        $("#linkChange .buttonstable tr:first-child td i").addClass('fa').addClass('fa-twitter').attr('style','margin-right: 9px;font-size: 18px;position: relative;top: 2px;');
    
        if (jsonobj.type == "H") {
            $("#linkChange .buttonstable tr:first-child td i").addClass('fa').addClass('fa-internet-explorer').attr('style','margin-right: 9px;font-size: 15px;position: relative;top: 1px;');
        }
        else if (jsonobj.type == "Y") {
            $("#linkChange .buttonstable tr:first-child td i").addClass('fa').addClass('fa-youtube-play').attr('style','margin-right: 9px;font-size: 15px;position: relative;top: 1px;');
        }   

            //$("#linkChange .buttonstable tr:first-child td .id").html(jsonobj.id);
        $("#linkChange .buttonstable tr:first-child td .author").show();
        $("#linkChange .buttonstable tr:first-child td .authorinput").hide(); 

        $('#postedby').attr("cauthor", jsonobj.author);
        var authorchanged = readCookie(jsonobj.id + "author");
        if (authorchanged && authorchanged.length > 0) {
            $("#linkChange .buttonstable tr:first-child td .author").html(authorchanged);
            if (showColors && jsonobj.author != authorchanged) {
                $("#linkChange .buttonstable tr:first-child td .author").css('color','#00ff72');
            }
            else {
                $("#linkChange .buttonstable tr:first-child td .author").css('color','');
            }
            $("#linkChange .buttonstable tr:first-child td .authorinput").val(authorchanged);
        } 
        else {
            $("#linkChange .buttonstable tr:first-child td .author").css('color','');

            if (jsonobj.author.length > 0) {
                $("#linkChange .buttonstable tr:first-child td .author").html(jsonobj.author);
                $("#linkChange .buttonstable tr:first-child td .authorinput").val(jsonobj.author);
            }
            else {
                $("#linkChange .buttonstable tr:first-child td .author").html("--");
                $("#linkChange .buttonstable tr:first-child td .authorinput").val("");
            }
        }
        $("#linkChange .buttonstable tr:first-child td .datetoshow").removeClass('extended');
        $("#linkChange .buttonstable tr:first-child td .date").show();
        $("#linkChange .buttonstable tr:first-child td .dateinput").hide(); 
        $("#linkChange .buttonstable tr:first-child td .datetoshow").hide(); 
        
        var datechanged = readCookie(jsonobj.id + "datechanged");
        $('#date').attr("cdate", jsonobj.date);
        if (datechanged && datechanged.length > 0) {
            $("#linkChange .buttonstable tr:first-child td .date").html(formatDateFromNum(datechanged));
            
            if (showColors && jsonobj.date != datechanged) {
                $("#linkChange .buttonstable tr:first-child td .date").css('color','#00ff72');
            }
            else {
                $("#linkChange .buttonstable tr:first-child td .date").css('color','');
            }
            $("#linkChange .buttonstable tr:first-child td .dateinput").val(datechanged);
        } 
        else {
            $("#linkChange .buttonstable tr:first-child td .date").css('color','');
            console.log(44444);
            var date = jsonobj.date.toString();
            if (date.length > 0) {
                console.log(55555);
                $("#linkChange .buttonstable tr:first-child td .date").html(formatDateFromNum(date));
            
                $("#linkChange .buttonstable tr:first-child td .dateinput").val(date);
            }
            else {
                $("#linkChange .buttonstable tr:first-child td .date").html("--");
                $("#linkChange .buttonstable tr:first-child td .dateinput").val("");
            }
        }  
        $("#linkChange #editTags .fa-chevron-down").show();    
        
        $(".buttontdtohide").show();  
        $(".originaltr").show();
        
        $('#removetweetp').attr('class','').addClass('fa').addClass('fa-eraser').addClass('fa-flip-horizontal');

    
        // TAGS

        $('#tagsinput').attr("ctags", jsonobj.tags);

        var tagchanged = readCookie(jsonobj.id + "tagchanged");
        var currenttagdisplay = $('.currenttags');
        
        if (jsonobj.tags.length > 0 && jsonobj.tags != "undefined") {
            $('.originaltags').html(parseTags(jsonobj.tags));  
        }
        else {
            $('.originaltags').html("--");  
        }

        if (tagchanged && tagchanged.length > 0) {
            hasChanges = true;

            if (showColors && jsonobj.tags != tagchanged) {
                currenttagdisplay.css('color','#00ff72');
            }

            if (tagchanged.length > 0)
                currenttagdisplay.html(parseTags(tagchanged));
            else
                currenttagdisplay.html("--");

            $('#tagsinput').val(tagchanged);
            $('#originaltagtd i').show();
        } 
        else {
            currenttagdisplay.css('color',"");
            currenttagdisplay.html(parseTags(jsonobj.tags));
            $('#tagsinput').val(jsonobj.tags);
        }

        removeNonExistentLi();

        createNonExistentLi();

        // CAGTEGORIES

        $('#catsinput').attr("ccats", jsonobj.categories);

        var catchanged = readCookie(jsonobj.id + "catchanged");
        var currentcatdisplay = $('.currentcats');

        if (jsonobj.categories.length > 0 && jsonobj.categories != "undefined") {
            $('.originalcats').html(parseCats(jsonobj.categories));  
        }
        else {
            $('.originalcats').html("--"); 
        }

        if (catchanged && catchanged.length > 0) {
            hasChanges = true;
            
            if (showColors && jsonobj.categories != catchanged) {
                currentcatdisplay.css('color','#00ff72');
            }

            if (catchanged.length > 0)
                currentcatdisplay.html(parseCats(catchanged));
            else
                currentcatdisplay.html("--");
            
            $('#catsinput').val(catchanged);
            $('#originalcattd i').show();
        } 
        else {
            currentcatdisplay.css('color',"");
            currentcatdisplay.html(parseCats(jsonobj.categories));
            $('#catsinput').val(jsonobj.categories);
        }
        
        markCategoriesCheckBoxs();

        // CLASSIFICATION
        $('#classifinput').attr("cclassif", jsonobj.classif);

        var classifchanged = readCookie(jsonobj.id + "classif");
        var currentclassifdisplay = $('.currentclassif');

        if (jsonobj.classif.length > 0 && jsonobj.classif != 0 && jsonobj.classif != "undefined") {
            $('.originalclassif').html(jsonobj.classif); 
        }
        else {
            $('.originalclassif').html("--"); 
        }

        if (classifchanged && classifchanged.length > 0) {
            hasChanges = true;

            if (showColors && jsonobj.classif != classifchanged) {            
                currentclassifdisplay.css('color','#00ff72');
            }

            currentclassifdisplay.html(classifchanged);
            $('#classifinput').val(classifchanged);
            $('#originalclassiftd i').show();
            markClassif(classifchanged);
        } 
        else {
            currentclassifdisplay.css('color',"");
            if (jsonobj.classif.length > 0 && jsonobj.classif != 0 && jsonobj.classif != "undefined") {
                currentclassifdisplay.html(jsonobj.classif);
                $('#classifinput').val(jsonobj.classif);
                markClassif(jsonobj.classif);
            }
            else {
                currentclassifdisplay.html("--");
                $('#classifinput').val(0);
            }

        }

        
        // INFO
        $('#infoinput').attr("cinfo", jsonobj.info);

        var infochanged = readCookie(jsonobj.id + "info");
        var currentinfodisplay = $('.currentinfo');

        if (jsonobj.info.length > 0 && jsonobj.info != "undefined") {
            $('.originalinfo').html(decodeURIComponent(jsonobj.info)); 
        }
        else {
            $('.originalinfo').html("--"); 
        }

        if (infochanged && infochanged.length > 0) {
            hasChanges = true;
            
            if (showColors && jsonobj.info != infochanged) {
                currentinfodisplay.css('color','#00ff72');
            }

            if (infochanged.length > 0)
                currentinfodisplay.html(decodeURIComponent(infochanged));
            else
                currentinfodisplay.html("--");

            $('#infoinput').val(decodeURIComponent(infochanged));
            $('#originalinfotd i').show();
        } 
        else {
            currentinfodisplay.css('color',"");
            if (jsonobj.info.length > 0 && jsonobj.info != "" && jsonobj.info != "undefined") {
                currentinfodisplay.html(decodeURIComponent(jsonobj.info));
                $('#infoinput').val(decodeURIComponent(jsonobj.info));
            }
            else {
                currentinfodisplay.html("--");
                $('#infoinput').val("");
            }
        }

        updateLinkColor(jsonobj);
    }
    else {

        dblFlag = false;

        $('#linkChange').find("table:not(.defaulttablerow):not(.newlinktable)").each( function( index, element ) {
            var table = $(element);

            table.css('transition', 'none !important');
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

            table.find('.sectionedittd i').hide();
        });
        
        var setHeight = "18px";

        if ($('body').hasClass('big'))
            setHeight = "30px";
        
        $('#linktable').css('max-height', setHeight);

        $('#linkChange').attr("cid", "new");
        $('#linkChange').addClass("new");
        $('#editTags').css('margin-top', '6px');  
        $('#linktable').show();

        $('#previewtable').hide();

        $('.currenttags').html("--");  
        $('.currentcats').html("--");  
        $('.currentinfo').html("--");  
        $('.currentclassif').html("--");  

            //$("#linkChange .buttonstable tr:first-child td .id").html(jsonobj.id);
        $("#linkChange .buttonstable tr:first-child td .author").hide();
        $("#linkChange .buttonstable tr:first-child td .authorinput").show(); 

        $("#linkChange .buttonstable tr:first-child td .date").hide();

        $("#linkChange .buttonstable tr:first-child td .datetoshow").addClass('extended');
        $("#linkChange .buttonstable tr:first-child td .datetoshow").show(); 

        $(".buttontdtohide").hide();
        $(".originaltr").hide();
        $('#removetweetp').attr('class','').addClass('fa').addClass('fa-floppy-o');

        $("#linkChange #editTags .fa-chevron-down").show();    
    }

    if (showColors) {
        $(".originaltr").show();
    }
    else {
        $(".originaltr").hide();
    }

    //$('#linkChange').fadeIn(); 

    //updateTopPosition("linkChange"); 
    
    $('#linkChange').css('transition', 'transition: all 0.01s');
    $('#linkChange').css("height", "calc(100%)");


    if ($('#linkChange').hasClass("new")) {
        if ($('body').hasClass('big')) {
            $('#linkChange').css("top", "-815px");
        }
        else {
            $('#linkChange').css("top", "-715px");
        }
    }     
    else {
        if ($('body').hasClass('big')) {
            $('#linkChange').css("top", "-300px");
        }
        else {
            $('#linkChange').css("top", "-233px");
        } 
    }
        
    $('#linkChange').css("background", "transparent");

    $('#linkChange').slideDown();

    $('#linkChange').attr("style", "top: 0px;transition: all 0.8s cubic-bezier(0.01, 0.76, 0.65, 0.96) 0.5s, background 1.1s, height 0.2s;");

    setTimeout(function(){
        $('#linkChange').css('background', 'var(--soft-transp-color)');
    }, 600);
} 

var openMainSettingsPopup = function(jsonobj) 
{
    closeallnewlayout();

    $('body, html').css('overflow-y', 'hidden');

    if (!isMy) {
        $("#mainsettings table.ismy").each( function( index, element ) {
            $(element).css('display', 'none');
        });
    }

    var setHeight = "18px";

    if ($('body').hasClass('big'))
        setHeight = "30px";

    $("#mainsettings table.expd").each( function( index, element ) {
        var table = $(element);

        table.css('max-height', setHeight);
        table.find('.sectionedittd i').addClass('fa-angle-down').removeClass('fa-angle-up').show();
        table.find('td.el').addClass('ellipsis');
    });

    putChoosedThemTop();


    // Show colors
    var value = null;
    if (showColorsAdv) {
        if (showColors) {
            value = "All";
        }
        else {
            value = "Medium";
        }
    }
    else {
        value = "Minimal";
    }

    $("#colordisplay").text(value);

    $('#colorul').find(".litags").each( function( index, element ) {
        if($(element).html().trim() == value) {
            $(element).addClass("selectedtag");
        }
        else {
            $(element).removeClass("selectedtag");
        }
    });


    // Use swipes
    value = null;

    if (useSwipes) {
        value = "Yes";
    }
    else {
        value = "No";
    }

    $("#swipedisplay").text(value);
    
    $('#swipeul').find(".litags").each( function( index, element ) {
        if($(element).html().trim() == value) {
            $(element).addClass("selectedtag");
        }
        else {
            $(element).removeClass("selectedtag");
        }
    });
    
    // See victorywillcome tweets
    value = null;

    if (showAll) {
        value = "Yes";
    }
    else {
        value = "No";
    }

    $("#VWCdisplay").text(value);
    
    $('#VWCul').find(".litags").each( function( index, element ) {
        if($(element).html().trim() == value) {
            $(element).addClass("selectedtag");
        }
        else {
            $(element).removeClass("selectedtag");
        }
    });
    
    $('#mainsettings').css('transition', 'transition: all 0.01s');
    $('#mainsettings').css("height", "calc(100%)");

    if ($('body').hasClass('big')) {
        $('#mainsettings').css("top", "-275px");
    }
    else {
        $('#mainsettings').css("top", "-215px");
    }

    $('#mainsettings').css("background", "transparent");

    $('#mainsettings').slideDown();

    $('#mainsettings').attr("style", "top: 0px;transition: all 0.8s cubic-bezier(0.01, 0.76, 0.65, 0.96) 0.5s, background 1.1s, height 0.2s;");

    setTimeout(function(){
        $('#mainsettings').css('background', 'var(--soft-transp-color)');
    }, 600);

} 


var getLinkColor = function(id) 
{
    var functorun = function(jsonvar) 
    { 
        var isdeleted = readCookie(id + "isdeleted");
        if (jsonvar.deleted != "" || (isdeleted && isdeleted.length > 0)) {
            return "red";
        }
        else {
    
            if (jsonvar.isnew && jsonvar.isnew != "") {
                return "#00dc00";
            }
            else {
                var hasChanges = false;
    
                var tagchanged = readCookie(id + "tagchanged");
                if (tagchanged && tagchanged.length > 0) {
                    hasChanges = true;
                } 
            
                var catchanged = readCookie(id + "catchanged");
                if (catchanged && catchanged.length > 0) {
                    hasChanges = true;
                } 
            
                var classifchanged = readCookie(id + "classif");
                if (classifchanged && classifchanged.length > 0) {
                    hasChanges = true;
                } 
            
                var infochanged = readCookie(id + "info");
                if (infochanged && infochanged.length > 0) {
                    hasChanges = true;
                }
    
                var author = readCookie(id + "author");
                if (author && author.length > 0) {
                    hasChanges = true;
                }

                var datechanged = readCookie(id + "datechanged");
                if (datechanged && datechanged.length > 0) {
                    hasChanges = true;
                }
                
                if (hasChanges) 
                    return "#f18618";
                else 
                   return "";
            }
        }
    } 
    getJsonbyid(id, functorun);
} 


function searchTags(tags, text) {
    var res = text.split(" ");
    for (var i = 0; i < res.length; i++) {
        if (!tags.includes(res[i])) {
            return false;
        }
    }
    return true;
}

function searchInfo(info, tweet, text) {
    var res = text.split(" ");
    var ret = true;
    for (var i = 0; i < res.length; i++) {
        if (!(info.includes(res[i]) || tweet.includes(res[i]))) {
            ret = false;
            return false;
        }
    }
    return ret;
}

function searchClassif(val, selectedclassif, selectedclassiftype) {
    if (selectedclassiftype == "equal") {
        return Number(val) == Number(selectedclassif)
    }
    else if (selectedclassiftype == "greater") {
        return Number(val) > Number(selectedclassif)
    }
    else {
        return Number(val) < Number(selectedclassif)
    }
}



function showAuthor(obj) {
    $(obj).hide();
    var otherObj = $(obj).parent().find(".authorinput");
    otherObj.show();
    otherObj.focus();
}
function saveAuthor(obj) {
    if ($('#linkChange').attr("cid") != "new") {
        $(obj).hide();
        var otherObj = $(obj).parent().find(".author");
        if ($(obj).val().length > 0) {
            if ($(obj).val() != $('#postedby').attr("cauthor")) {
                createCookie($('#linkChange').attr("cid") + "haschanges", "yes");
                createCookie($('#linkChange').attr("cid") + "author", $(obj).val());
                if (showColors) {
                    otherObj.css('color','#00ff72');
                }
            }
            else {
                createCookie($('#linkChange').attr("cid") + "author", "");
            }
            otherObj.html($(obj).val());
        }
        else
            otherObj.html("--"); 

        updateLinkColor(null, $('#linkChange').attr("cid"));

        otherObj.show();
    }
}

function showDate(obj) {
    //$(obj).hide();
    $('#linkChange').css("background", "transparent");
    var otherObj = $('#linkChange').find(".dateinput");
    //otherObj.show();
    //otherObj.focus();
    var date = new Date();
    if (otherObj.val().trim() != "") {
        date.setDate(Number(otherObj.val().substring(6, 8)));
        date.setMonth(Number(otherObj.val().substring(4, 6)) - 1);
        date.setFullYear(Number(otherObj.val().substring(0, 4)));
    }
    openCalendar("linkdate", date);
}

function closeSettingsPopup(obj) {
    if (obj)
        fixfocus(obj);

    $('body, html').css('overflow-y', 'auto');

    $('#linkChange').css('transition', 'all 1.7s');
    $('#linkChange').css('opacity', 0);

    setTimeout(function(){
        $('#linkChange').hide();
        $('#linkChange').css('opacity', 1);

        var setHeight = "18px";

        if ($('body').hasClass('big'))
            setHeight = "30px";
    
        $('#linkChange').find("table:not(.buttonstable)").each( function( index, element ) {
            var table = $(element);
            
            table.css('transition', 'transition: all 0.7s !important');
            table.css('max-height', setHeight);
            table.find('.sectionedittd i').addClass('fa-angle-down').removeClass('fa-angle-up').attr('style', '');
            table.find('td.el').addClass('ellipsis');
        });
    }, 700);

}




function closeMainSettingsPopup(obj) {
    if (obj)
        fixfocus(obj);
    $('body, html').css('overflow-y', 'auto');
    //$('#mainsettings').fadeOut(600);

    $('#mainsettings').css('transition', 'all 1.7s');
    $('#mainsettings').css('opacity', 0);

    setTimeout(function(){
        $('#mainsettings').hide();
        $('#mainsettings').css('opacity', 1);

        var setHeight = "18px";

        if ($('body').hasClass('big'))
            setHeight = "30px";
    
        $('#mainsettings').find("table.sectionexpandable:not(.buttonstable)").each( function( index, element ) {
            var table = $(element);
            
            table.css('transition', 'transition: all 0.7s !important');
            table.css('max-height', setHeight);
            table.find('.sectionedittd i').addClass('fa-angle-down').removeClass('fa-angle-up').attr('style', '');
            table.find('td.el').addClass('ellipsis');
        });
    }, 700);
}





function toggleShowDeleted() {
    if (!$("#showdeleted").is(":checked")) {
        $("#showdeleted").prop('checked', false);
        $("#showdeleted2").prop('checked', false);
        setshowdeletedcookie("false");
    }
    else {
        $("#showdeleted").prop('checked', true);
        $("#showdeleted2").prop('checked', true);
        setshowdeletedcookie("true");
    }
    countalltweets();
}

function toggleShowDeleted2() {

    if (!$("#showdeleted2").is(":checked")) {
        $("#showdeleted").prop('checked', false);
        $("#showdeleted2").prop('checked', false);
        setshowdeletedcookie("false");
    }
    else {
        $("#showdeleted").prop('checked', true);
        $("#showdeleted2").prop('checked', true);
        setshowdeletedcookie("true");
    }
    countalltweets();
}

function toggleShowDeletedAll() {

    if ($("#showdeleted2").is(":checked")) {
        $("#showdeleted").prop('checked', false);
        $("#showdeleted2").prop('checked', false);
        setshowdeletedcookie("false");
    }
    else {
        $("#showdeleted").prop('checked', true);
        $("#showdeleted2").prop('checked', true);
        setshowdeletedcookie("true");
    }
    countalltweets();
}

function setShowDeleted(flag) {

    if (flag == "false") {
        $("#showdeleted").prop('checked', false);
        $("#showdeleted2").prop('checked', false);
        setshowdeletedcookie("false");
    }
    else {
        $("#showdeleted").prop('checked', true);
        $("#showdeleted2").prop('checked', true);
        setshowdeletedcookie("true");
    }
    countalltweets();
}

function closeMenuPopup(obj) {

    if (obj)
        fixfocus(obj);
 
    $('body, html').css('overflow-y', 'auto');

    $('#mainmenu').css('transition', 'all 1.7s');
    $('#mainmenu').css('opacity', 0);

    setTimeout(function(){
        $('#mainmenu').hide();
        $('#mainmenu').css('opacity', 1);
    }, 700);
    /*
        $('body, html').css('overflow-y', 'auto');

    $('#mainmenu').css('transition', 'transition: all 0.01s');

    $('#mainmenu').css("background", "transparent");

    $('#mainmenu').attr("style", "top: -391px;height: 405px;background: transparent;transition: all 0.3s cubic-bezier(0.01, 0.76, 0.65, 0.96) 0.5s;");

    setTimeout(function(){
        $('#mainmenu').hide();
    }, 1100);
    */
}

function editSetting(e, obj, flag) {
    e.stopPropagation();

    if ($('#linkChange').attr("cid") != "new" || flag) {
        var setHeight = "18px";

        if ($('body').hasClass('big'))
            setHeight = "30px";
    
        var table = $(obj).parent().parent();
        if (table.css('max-height') == setHeight) {
            var hasExpanded = false;
            $('#linkChange').find("table:not(.buttonstable)").each( function( index, element ) {
                var table = $(element);
                
                table.css('transition', 'transition: all 0.7s !important');
                table.css('max-height', setHeight);
                table.find('.sectionedittd i').addClass('fa-angle-down').removeClass('fa-angle-up').attr('style', '');
                table.find('td.el').addClass('ellipsis');
            });
            
            table.css('transition', 'transition: all 0.7s !important');
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
            
            if (table.attr("extrastyle")) {
                table.css('overflow-y', "auto");
            }
            else {
                table.css('overflow-y', "hidden");
            }

            if (table.attr('id') != 'editInfo')
                table.find('td.el').removeClass('ellipsis');

            table.find('.sectionedittd i').addClass('fa-angle-up').removeClass('fa-angle-down');
        }
        else {
            table.css('transition', 'transition: all 0.7s !important');
            table.css('overflow-y', "hidden");
            table.css('max-height', setHeight);
            table.find('.sectionedittd i').addClass('fa-angle-down').removeClass('fa-angle-up');
            table.find('td.el').addClass('ellipsis');
        }
    }
    
    updateTopPosition("linkChange"); 
}

function updateTopPosition(obj) { 
    return false;

    setTimeout(function(){
        var isLandscape = window.innerWidth < 1200 && window.innerWidth > 700;
        var innerHeight = window.innerHeight;
        var htmlElem = $("#" + obj + " > div");
        var maxHeightStyle = "max-height: " + (innerHeight - 125) + "px !important;";

        if (obj == "linkChange") {
            if (isLandscape) {

                maxHeightStyle = "margin-top: -1px !important;max-height: " + (innerHeight - 67) + "px !important;";
    
                htmlElem.attr("style", maxHeightStyle);     
    
                htmlElem.attr("style", maxHeightStyle + "top: " + (155 - (htmlElem.height() / 2)) + "px !important;"); 
            }
            else {
    
                if ($('body').hasClass('big')) {
                    maxHeightStyle = "max-height: " + (innerHeight - 137) + "px !important;";
                }
                htmlElem.attr("style", "margin-top: -1px !important;" + maxHeightStyle);     
    
                htmlElem.attr("style", "margin-top: -1px !important;" + maxHeightStyle + "top: " + ((innerHeight / 2) - (htmlElem.height() / 2)) + "px !important;"); 
            }
        }
        else {
            if ($('body').hasClass('big')) {
                maxHeightStyle = "max-height: " + (innerHeight - 137) + "px !important;";
            }
            htmlElem.attr("style", maxHeightStyle);     

            htmlElem.attr("style", maxHeightStyle + "margin-top: " + ((innerHeight / 2) - (htmlElem.height() / 2) - 65) + "px !important;"); 

        }
        
    }, 140);
    
}

/////////////////////////////////////////////////////////////////////////
//                           TAGS SETTINGS                             //
/////////////////////////////////////////////////////////////////////////

function tagsInputOnChange(obj) {
    var oldtags = $(obj).attr("ctags");
    var currenttagdisplay = $('.currenttags'); 
    currenttagdisplay.html(parseTags($(obj).val()));
    
    if (oldtags == $(obj).val()) {
        currenttagdisplay.css('color', '');
        createCookie($('#linkChange').attr("cid") + "tagchanged", "");
        $('#originaltagtd i').hide();
    }
    else {
        currenttagdisplay.css('color','#00ff72');
        createCookie($('#linkChange').attr("cid") + "tagchanged", $(obj).val());
        $('#originaltagtd i').show();
    }
    removeNonExistentLi();

    createNonExistentLi();
    
    updateTagsText($(obj).val(), $('#linkChange').attr("cid"));

    var color = getLinkColor($('#linkChange').attr("cid"));
    if (color == "#f18618")
        createCookie($('#linkChange').attr("cid") + "haschanges", "yes");
    else
        createCookie($('#linkChange').attr("cid") + "haschanges", "");

    updateLinkColor(null, $('#linkChange').attr("cid"));
    
    var callback = function(flag) {      
        if (flag) {
            createCookie("haschanges", "yes");
            if (showColorsAdv) {
                $("#generateicon").addClass("haschanges");
                if (showColors) {
                    $("#settings").addClass("haschanges");
                }
            } 
        }
        else {
            createCookie("haschanges", "");
            $("#settings").removeClass("haschanges");
            $("#generateicon").removeClass("haschanges");
        }
    } 
    hasTweetChanges(callback);
}

 
function updateSettingsColor(color) {
    if (color != "") {
        $('#seticon').css("color", color); 
    }
    else {
        $('#seticon').css("color", ""); 
    }
}

function updateLinkColor(val, id) {
    var functorun = function(val) 
    { 
        var isdeleted = readCookie(val.id + "isdeleted");
        if (val.deleted != "" || (isdeleted && isdeleted.length > 0)) { 
            if (showColors) {
                $("#" + val.id).find("i.linkbar").css("color", "red"); 
                $("#seticon").attr("style", "color: red;");
            }
            else {
                if (showColorsAdv) {
                    $("#seticon").attr("style", "color: red;");
                }
            }
        } 
        else if (showColors) {
            if (val.isnew && val.isnew != "") { 
                $(".tweet#" + val.id).find("i.linkbar").css("color", "#00dc00"); 
                $("#seticon").attr("style", "color: #00dc00;");
            }
            else {
                var hasChanges = readCookie(val.id + "haschanges");
                if (hasChanges && hasChanges.length > 0) { // HAS CHAMGES
                    $(".tweet#" + val.id).find("i.linkbar").css("color", "#f18618"); 
                    $("#seticon").attr("style", "color: #f18618;");
                } 
                else {
                    $(".tweet#" + val.id).find("i.linkbar").css("color", ""); 
                    $("#seticon").css("color", ""); 
                }
            }
        }
        else {
            if (showColorsAdv) {
                if (val.isnew && val.isnew != "") { 
                    $("#seticon").attr("style", "color: #00dc00;");
                }
                else {
                    $(".tweet#" + val.id).find("i.linkbar").css("color", ""); 
                    $("#seticon").css("color", ""); 
                }
            }
            else {
                $(".tweet#" + val.id).find("i.linkbar").css("color", ""); 
                $("#seticon").css("color", ""); 
            }
        }
    } 

    if (id) {
        getJsonbyid(id, functorun);
    }
    else {
        functorun(val);
    }
}


function updateTagsText(text, id) {
    if (text.trim().length > 0 && text != "undefined")
        $(".tweet#" + id).find(".tags").html("<b>Tags: </b>" + text); 
    else
        $(".tweet#" + id).find(".tags").html("<b>Tags: </b>--");     
}


function addTextTag(obj) {
    //fixfocus(obj);
    if ($('#addtaginput').val() != "") {
        $('#tagsinput').val($('#tagsinput').val() + " " + $('#addtaginput').val());
        $('#tagsinput').trigger("change");
        $('#addtaginput').val("");
    }
}


function undoTags(e, obj) {
    e.stopPropagation();
    fixfocus(obj);

    $('#tagsinput').val($('#tagsinput').attr("ctags"));
    $(obj).hide();
    var functorun = function() 
    { 
        
    } 
    $('#tagsinput').trigger("change");
    removeNonExistentLi();

    createNonExistentLi();

    showMessage("Tags reverted", null, "fa-undo", "", null, "undo");
}

/*
function addtag(text) {
    var hasLi = existsLi(text);

    if (hasLi == "") {
        createLi();
    }
    else {
        hasLi.addClass("selectedtag");
    }

    $('#tagsinput').val($('#tagsinput').val() + text + " ");
}
*/
function createLi(text, obj) {
    var objToUse = "tagsul";
    if (obj)
        objToUse = obj;
    $('#'+ objToUse).prepend('<li onclick="javascript: clickLiTag(event, this)" class="litags selectedtag new">' + text + '</li>');
}

function createNonExistentLi(obj, obj2) {
    var objToUse = "tagsul";
    var objToUse2 = "tagsinput";
    if (obj) {
        objToUse = obj;
        objToUse2 = obj2;
    }
           
    var res = $('#' + objToUse2).val().trim().split(" ");

    if (res.length == 1 && res[0].trim() == 0) {
        return false;
    }

    for (var i = res.length; i > 0; i--) {
        var li = existsLi(res[i-1], objToUse);
        if (li == "") {
            createLi(res[i-1], objToUse);
        }
        else {
            li.clone().addClass("selectedtag").prependTo("#"+ objToUse);
            li.remove();
        }
    }
}

function existsLi(text, obj) {
    var objToUse = "tagsul";
    if (obj)
        objToUse = obj;

    var hasLi = "";

    $('#' + objToUse).find(".litags").each( function( index, element ){
        if ($(element).html() == text) {
            hasLi = $(element);
            return false;
        }
    });

    return hasLi;
}

function removeNonExistentLi(obj, obj2) {
    var objToUse = "tagsul";
    var objToUse2 = "tagsinput";
    if (obj) {
        objToUse = obj;
        objToUse2 = obj2;
    }
    var tags = $('#' + objToUse2).val();
    var res = tags.trim().split(" ");

    $('#' + objToUse).find(".litags").each( function( index, element ) {
        $(element).removeClass("selectedtag");

        if ($.inArray( $(element).text().trim(), res ) < 0 && $(element).hasClass("new")) {
            $(element).remove();
        }
    });

}

function parseTags(tags) {
    var result = "";
    var res = tags.trim().split(" ");

    if (res.length == 1 && (res[0].trim() == 0 || res[0].trim() == "undefined")) {
        return "--";
    } 

    for (var i = 0; i < res.length; i++) {
        result = result + res[i] + " - ";
    }

    return result.substring(0, result.length - 3);
}


function clickLiTag(e, obj) {
    e.stopPropagation();

    if ($("#searchpopup").css("display") == "none") {
        if ($(obj).hasClass("selectedtag")) {
            $(obj).removeClass("selectedtag");
            if ($('#tagsinput').val().indexOf($(obj).html() + " ") >= 0) {
                $('#tagsinput').val($('#tagsinput').val().replace($(obj).html() + " ", ""));
            }
            else {
                $('#tagsinput').val($('#tagsinput').val().replace($(obj).html(), "").trim());
            }
            $('#tagsinput').trigger("change");
        }      
        else {
                
            $(obj).attr("class", "litags");
            $(obj).addClass("selectedtag");
            $('#tagsinput').val($('#tagsinput').val().trim() + " " + $(obj).html());
            $('#tagsinput').trigger("change");
        }
    }
    else {
    
        if ($(obj).hasClass("selectedtag")) {
            $(obj).removeClass("selectedtag");
            if ($('#filtertag').val().indexOf($(obj).html() + " ") >= 0) {
                $('#filtertag').val($('#filtertag').val().replace($(obj).html() + " ", ""));
            }
            else {
                $('#filtertag').val($('#filtertag').val().replace($(obj).html(), "").trim());
            }
            $('#filtertag').trigger("change");
        }      
        else {
            $(obj).attr("class", "litags");
            $(obj).addClass("selectedtag");
            $('#filtertag').val(($('#filtertag').val().trim() + " " + $(obj).html()).trim());
            $('#filtertag').trigger("change");
        }

    }
}


/////////////////////////////////////////////////////////////////////////
//                       CATEGORIES SETTINGS                           //
/////////////////////////////////////////////////////////////////////////


function catsInputOnChange(obj) {

    var oldcats = $(obj).attr("ccats");
    var currentcatdisplay = $('.currentcats'); 
    currentcatdisplay.html(parseCats($(obj).val()));
    
    if (oldcats == $(obj).val()) {
        currentcatdisplay.css('color', '');
        createCookie($('#linkChange').attr("cid") + "catchanged", "");
        $('#originalcattd i').hide();
    }
    else {
        currentcatdisplay.css('color','#00ff72');
        createCookie($('#linkChange').attr("cid") + "catchanged", $(obj).val());
        $('#originalcattd i').show();
    }

    markCategoriesCheckBoxs();

    var color = getLinkColor($('#linkChange').attr("cid"));
    if (color == "#f18618")
        createCookie($('#linkChange').attr("cid") + "haschanges", "yes");
    else
        createCookie($('#linkChange').attr("cid") + "haschanges", "");

    updateLinkColor(null, $('#linkChange').attr("cid"));

    var callback = function(flag) {      
        if (flag) {
            createCookie("haschanges", "yes");
            if (showColorsAdv) {
                $("#generateicon").addClass("haschanges");
                if (showColors) {
                    $("#settings").addClass("haschanges");
                }
            } 
        }
        else {
            createCookie("haschanges", "");
            $("#settings").removeClass("haschanges");
            $("#generateicon").removeClass("haschanges");
        }
    } 
    hasTweetChanges(callback);
}

function clickCheckCat(obj, cat) {
    if (!$(obj).prop("checked")) {       
        if ($('#catsinput').val().indexOf(cat + " ") >= 0) {
            $('#catsinput').val($('#catsinput').val().replace(cat + " ", ""));
        }
        else {
            $('#catsinput').val($('#catsinput').val().replace(cat, "").trim());
        }
        
        $('#catsinput').trigger("change");
    }      
    else {
        $('#catsinput').val($('#catsinput').val().trim() + " " + cat);

        $('#catsinput').trigger("change");
    }
}

function markCategoriesCheckBoxs() {
    var currCats = $('#catsinput').val();
    for (let [key, value] of catsmap) { 
        
        if (currCats.indexOf(key) < 0) { 
            $("#cat" + key).prop('checked', false);
        }
        else {  
            $("#cat" + key).prop('checked', true);
        }
    }  

}

function undoCats(e, obj) {
    e.stopPropagation();
    fixfocus(obj);

    $('#catsinput').val($('#catsinput').attr("ccats"));
    $(obj).hide();
    var functorun = function() 
    { 
    } 
    $('#catsinput').trigger("change");

    markCategoriesCheckBoxs();

    showMessage("Categories reverted", null, "fa-undo", "", null, "undo");
}

function parseCats(cats) {
    var result = "";
    var res = cats.trim().split(" ");

    if (res.length == 1 && (res[0].trim() == 0 || res[0].trim() == "undefined")) {
        return "--";
    } 

    for (var i = 0; i < res.length; i++) {
        result = result + catsmap.get(res[i]) + " - ";
    }

    return result.substring(0, result.length - 3);
}

/////////////////////////////////////////////////////////////////////////
//                     CLASSIFICATION SETTINGS                         //
/////////////////////////////////////////////////////////////////////////

function classifInputOnChange(obj) {
    var oldclassif = $(obj).attr("cclassif");
    var currentclassifdisplay = $('.currentclassif'); 
    currentclassifdisplay.html($(obj).val().trim());
    
    if (oldclassif == $(obj).val().trim()) {
        currentclassifdisplay.css('color', '');
        createCookie($('#linkChange').attr("cid") + "classif", "");
        $('#originalclassiftd i').hide();
    }
    else {
        currentclassifdisplay.css('color','#00ff72');
        createCookie($('#linkChange').attr("cid") + "classif", $(obj).val().trim());
        $('#originalclassiftd i').show();
    }
    var color = getLinkColor($('#linkChange').attr("cid"));
    if (color == "#f18618")
    createCookie($('#linkChange').attr("cid") + "haschanges", "yes");
    else
        createCookie($('#linkChange').attr("cid") + "haschanges", "");

    updateLinkColor(null, $('#linkChange').attr("cid"));
    
    var callback = function(flag) {      
        if (flag) {
            createCookie("haschanges", "yes");
            if (showColorsAdv) {
                $("#generateicon").addClass("haschanges");
                if (showColors) {
                    $("#settings").addClass("haschanges");
                }
            } 
        }
        else {
            createCookie("haschanges", "");
            $("#settings").removeClass("haschanges");
            $("#generateicon").removeClass("haschanges");
        }
    } 
    hasTweetChanges(callback);

    markClassif($(obj).val().trim());
}

function markClassif(value) {

    $('#classiful').find(".litags").each( function( index, element ) {
        if($(element).html().trim() == value) {
            $(element).addClass("selectedtag");
        }
        else {
            $(element).removeClass("selectedtag");
        }
    });

}


function clickLiClassif(e, obj) {
    e.stopPropagation();

    if (!$(obj).hasClass("selectedtag")) {
        $('#classifinput').val($(obj).html().trim());

        $('#classifinput').trigger("change");
    }  

}


function undoClassif(e, obj) {
    e.stopPropagation();
    fixfocus(obj);

    $('#classifinput').val($('#classifinput').attr("cclassif"));
    $(obj).hide();
    var functorun = function() 
    { 
    } 
    $('#classifinput').trigger("change");

    showMessage("Classification reverted", null, "fa-undo", "", null, "undo");
}

/////////////////////////////////////////////////////////////////////////
//                            INFO SETTINGS                            //
/////////////////////////////////////////////////////////////////////////

function infoInputOnKeyup(obj) {
    var cid = $("#infoinput").attr("cinfo");
    var val = $("#infoinput").val();
    if (!dblFlag) {
        dblFlag = true;
        setTimeout(function() {     
            var oldinfo = cid;
            var currentinfodisplay = $('.currentinfo'); 
            currentinfodisplay.html(val);
            
            if (oldinfo == val) {
                currentinfodisplay.css('color', '');
                createCookie($('#linkChange').attr("cid") + "info", "");
                $('#originalinfotd i').hide();
            }
            else {
                currentinfodisplay.css('color','#00ff72');
                createCookie($('#linkChange').attr("cid") + "info", val);
                $('#originalinfotd i').show();
            }

            var color = getLinkColor($('#linkChange').attr("cid"));

            if (color == "#f18618")
                createCookie($('#linkChange').attr("cid") + "haschanges", "yes");
            else
                createCookie($('#linkChange').attr("cid") + "haschanges", "");

            updateLinkColor(null, $('#linkChange').attr("cid"));

            var callback = function(flag) {      
                if (flag) {
                    createCookie("haschanges", "yes");
                    if (showColorsAdv) {
                        $("#generateicon").addClass("haschanges");
                        if (showColors) {
                            $("#settings").addClass("haschanges");
                        }
                    } 
                }
                else {
                    createCookie("haschanges", "");
                    $("#settings").removeClass("haschanges");
                    $("#generateicon").removeClass("haschanges");
                }
            } 
            hasTweetChanges(callback);
            dblFlag = false;
        }, 300);
    }
}


function undoInfo(e, obj) {
    e.stopPropagation();
    fixfocus(obj);

    $('#infoinput').val($('#infoinput').attr("cinfo"));
    $(obj).hide();
    var functorun = function() 
    { 
    } 
    $('#infoinput').trigger("keyup");

    showMessage("Information reverted", null, "fa-undo", "", null, "undo");
}



function clickLiColors(e, obj) {
    e.stopPropagation();

    if (!$(obj).hasClass("selectedtag")) {
        var value = $(obj).html().trim();
        $('#colorul').find(".litags").each( function( index, element ) {
            if($(element).html().trim() == value) {
                $(element).addClass("selectedtag");
            }
            else {
                $(element).removeClass("selectedtag");
            }
        });

        if (value == "All") {
            showColors = true;
            showColorsAdv = true;
        }
        else if (value == "Medium") {
            showColors = false;
            showColorsAdv = true;   
        }
        else {
            showColors = false;
            showColorsAdv = false;
        }

        $("#colordisplay").text(value);
        createCookie("colors", value, 99999);

        showMessage("Color Mode Changed To " + value, null, null, null, null, null);
    }  
}


function clickLiSwipes(e, obj) {
    e.stopPropagation();

    if (!$(obj).hasClass("selectedtag")) {
        var value = $(obj).html().trim();
        $('#swipeul').find(".litags").each( function( index, element ) {
            if($(element).html().trim() == value) {
                $(element).addClass("selectedtag");
            }
            else {
                $(element).removeClass("selectedtag");
            }
        });

        if (value == "Yes") {
            showMessage("Swipes turned On", null, null, null, null, null);
            useSwipes = true;
        }
        else {
            showMessage("Swipes turned Off", null, null, null, null, null);
            useSwipes = false;  
        }

        $("#swipedisplay").text(value);
        createCookie("swipes", value, 99999);
    }  
}


function clickLiVWC(e, obj) {
    e.stopPropagation();

    if (!$(obj).hasClass("selectedtag")) {
        var value = $(obj).html().trim();
        $('#VWCul').find(".litags").each( function( index, element ) {
            if($(element).html().trim() == value) {
                $(element).addClass("selectedtag");
            }
            else {
                $(element).removeClass("selectedtag");
            }
        });

        if (value == "Yes") {
            showMessage("VictoryWillCome Tweets Shown", null, null, null, null, null);
            showAll = true;
        }
        else {
            showMessage("VictoryWillCome Tweets Hidden", null, null, null, null, null);
            showAll = false;  
        }

        $("#VWCdisplay").text(value);
        createCookie("vwc", value, 99999);
        countalltweets();
    }  
}

function triggerUpload() {
    $('#files').trigger("click");  
}

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////