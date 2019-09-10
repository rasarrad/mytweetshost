
console.log(1111); 

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

$( document ).ready(function() {
    countalltweets();
    var hasChanges = readCookie("hasChanges");
    if (hasChanges && hasChanges.length > 0)
      $("#generate").addClass("haschanges");

    ///////////////////////////////////////

    var paramid = getParameterByName('tweetid');
    if (paramid)
      getInformationbyid(paramid);

    ///////////////////////////////////////

    window.onscroll = function(ev) {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && dosearchmore) {
            dosearchmore = false;
            if ($('#moretweets').attr('doshow') && $('#moretweets').attr('doshow') == 'yes') {
                $('#moretweets').show();
                $('#moretweets').css('opacity', 1);
                
                setTimeout(function() { 
                  $("#moretweets").click();
                  $('#moretweets').attr('doshow', 'no');
                  $('#moretweets').hide();
                }, 1000);
            }
            setTimeout(function() { 
              dosearchmore = true;
            }, 2000);
        }
    };

    ///////////////////////////////////////

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
      
        
    });

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

    $('#filtertext, #filterdate1, #filterdate2, #filterid, #filterauthor, #filtertag').keypress(function(event){
      var keycode = (event.keyCode ? event.keyCode : event.which);
      if(keycode == '13' && $(this).val().length > 0){
        getInformation(false);
      }
    });    


    /*   $("#tweet").on("paste", function() {
        alert(1111222);
        parseTweet();
    }); */

    ///////////////////////////////////////

    $( "#moretweets" ).bind( "click", function( event ) {
        getInformation(true);
    });

    ///////////////////////////////////////

    $( "#btnsearch" ).bind( "click", function( event ) {
      getInformation(false);
    });

    ///////////////////////////////////////

    $( "#btnreset" ).bind( "click", function( event ) {
      resetFields(true);
    });
 
    ///////////////////////////////////////
    
    $( "#generate" ).bind( "click", function( event ) {
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
      }
    });

    ///////////////////////////////////////

    $( "#closepopup" ).bind( "click", function( event ) {
      closePopup();
    });

});


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


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


function expandCat(obj) {
    var jobj = $(obj).parent().find('.categorias');
    if (jobj.is(":visible")) {
        jobj.hide(); 
        $(obj).removeClass("fa-angle-double-up");
        $(obj).addClass("fa-angle-double-down");
    }
    else {
        jobj.show();
        $(obj).removeClass("fa-angle-double-down");
        $(obj).addClass("fa-angle-double-up");
    }
}


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function openmenu() {
    if ($('#menu').css('width') == '0px') {
        $('#menu').css('width', '180px');
    }
    else {
        $('#menu').css('width', '0px');
    }
}


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function gotop() {
    $(window).scrollTop( 0 );
}   


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function internallinkcopy(id) {
    $('#linkresult').val("https://sleepy-mclean-3aea2d.netlify.com/?tweetid=" + id);
    $("#linkresult").select();
    document.execCommand('copy'); 
    showMessage("Internal Link Copied To Clipboard"); 
}


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function externallinkcopy(link, id) {
    $('#linkresult').val(link);
    $("#linkresult").select();
    document.execCommand('copy');
    showMessage("External Link Copied To Clipboard"); 
}


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


var clickmenu = function(val, text) {      
    resetFields();

    $('#selectedcat').val(val);
    $('#selectedcattext').val(text);

    openmenu();
    getInformation(false);

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


function showMessage(text, speed) {
    var dospeed = 3500;
    if (speed)
      dospeed = speed;

    $("#stripmessage").css("transition", "none");
    $("#stripmessage .striptext").css("transition", "none");
    $("#stripmessage").css("top", "0px");
    $("#stripmessage").css("background", "rgba(0, 0, 0, 0.6)");
    $("#stripmessage .striptext").css("top", "calc(50% - 27px)");
    $("#stripmessage .poptitle").text(text);

    $("#stripmessage").fadeIn("slow", function(){
      setTimeout(function() { 
          $("#stripmessage").css("transition", "top 1s");
          $("#stripmessage").css("top", "100%");
          
          $("#stripmessage .striptext").css("transition", "top 1s");
          $("#stripmessage").css("background", "rgba(0, 0, 0, 0)");
          $("#stripmessage .striptext").css("top", "calc(0% - 42px)");
          setTimeout(function() { 
              $("#stripmessage").fadeOut("slow");
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
    if ($(obj).css('top') == "67px") {
        $(obj).css('top', 'calc(100% - 142px)');
    }
    else {
        $(obj).css('top', '67px');
    }
}  
