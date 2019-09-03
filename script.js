var text = "";
var origin = "";
var nextid = "";
var currentIndex = 0;
var currpage = 0;
var dosearchmore = true;
var url = "";
var dblFlag = false;
var dblClickTimeout = null;
console.log(1111); 

$( document ).ready(function() {
  var hasChanges = readCookie("hasChanges");

  if (hasChanges && hasChanges.length > 0)
    $("#generate").addClass("haschanges");

  var paramid = getParameterByName('tweetid');
  if (paramid)
    getInformationbyid(paramid);

  window.onscroll = function(ev) {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && dosearchmore) {
    dosearchmore = false;
    if ($('#moretweets').css('display') == 'inline-block') {
        $("#moretweets").click();
    }
    setTimeout(function() { 
      dosearchmore = true;
    }, 2000);

  }
};

  $(window).scroll(function (event) {
  var scroll = $(window).scrollTop();
  if (scroll > 200) {
    $('#gotop').fadeIn(700); 
  }
  else {
    $('#gotop').fadeOut(700);
  }
});
  $('#filtertext, #filterdate1, #filterdate2, #filterid, #filterauthor, #filtertag').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13' && $(this).val().length > 0){
      getInformation(false);
    }
  });    

  $("#tweet").on("paste", function() {

    parseTweet();
  });


  $( "#moretweets" ).bind( "click", function( event ) {
    getInformation(true);
  });
  $( "#btnsearch" ).bind( "click", function( event ) {
    getInformation(false);
  });
  $( "#btnreset" ).bind( "click", function( event ) {
    resetFields(true);
  });
 
  
  $( "#create" ).bind( "click", function( event ) {
    var ishidden = "0";
    if ($("#ishidden").is(":checked")) {

        ishidden = "1";
    } 
  
    $('#result').val("{\r\n\"id\": \"" + nextid + "\",\r\n\"url\": \"" + url  + "\",\r\n\"ishidden\": \"" + ishidden  + "\",\r\n\"date\": \"" + $('#date').val() + "\",\r\n\"author\": \"" + origin  + "\",\r\n\"categories\": \"" + $('#categories').val() + "\",\r\n\"tags\": \"" + $('#tags').val() + "\",\r\n\"info\": \"" + $('#info').val() + "\",\r\n\"tweet\": " + text + "\r\n},");

    $('#maxid').val(nextid);
    $("#result").select();

    document.execCommand('copy');

    resetFieldsPopup();

    if ($("#onemore").is(":checked")) {
        showMessage("New Tweet Created And Copied To Clipboard. You Can Add One More Now");
        $('#tweet').focus();
    } 
    else {
        showMessage("New Tweet Created And Copied To Clipboard");
        $('.addpopup').fadeOut(2000);
    }       
    });

    $( "#addtweet" ).bind( "click", function( event ) {
        openCreatePopup();
    });
    
    
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

    $( "#closepopup" ).bind( "click", function( event ) {
    closePopup();
    });
});

  var getInformation = function(ismoretweets) 
{
    $('#mask').fadeIn(300);  
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

    $('#moretweets').hide();
    if (!ismoretweets) {
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
              if (hasinfo && hasinfo.length > 0) {
                if (val.info && val.info.length > 0) {
                    textareaExtraStyle = "border: 2px solid red;";
                    expandclass = "infomodified";
                    val.info = '<div class="oldinfo" style="width: 562px;height: 163px;position: relative;left: calc(50% - 282px);z-index: 11;font-size: 14px;background: #0000002e;text-align: left;display: block;border: 2px solid red;">' + val.info + '</div>';
                }
                else {
                    val.info = "";
                }
              } 
              else {
                if (val.info && val.info.length > 0) {
                    hasinfo = decodeURIComponent(val.info);
                }
                else {
                    hasinfo = "";
                }
                val.info = "";
              }

              $('#moretweets').hide();
              var newtweet = $('#main').append($('<div style="' + isdeleted + '" id="inid" class="tweet"></div>'));
              var newtweetobj = $('#inid');
              newtweetobj.append($('<i onclick="javascript: expandCat(this)" id="expand" class="fa fa-angle-double-down ' + expandclass + '"></i><div class="categorias"><i onclick="javascript: removetweet(this,\'' + val.id + '\')" id="removetweet" class="fa fa-remove"></i><i tagactual="' + val.tags + '" onclick="javascript: changetag(this, \'' + val.id + '\')" id="changetag" class="fa fa-tags"></i><i catactual="' + val.categories + '" onclick="javascript: changecat(this,\'' + val.id + '\')" id="changecat" class="fa fa-bookmark"></i><b>Id </b>' + val.id + '<b> Categories </b>' + val.categories + catchanged + '<textarea class="info" style="width: 558px;height: 216px;position: relative;left: calc(50% - 282px);z-index: 11;display: block;' + textareaExtraStyle + '" id="' + val.id + 'info" type="text">' + hasinfo + '</textarea>' + val.info + '<i onclick="javascript: saveinfo(this,\'' + val.id + '\')" class="fa fa-check" style="position: absolute;left: calc(50% + 300px);top: 89px;cursor: pointer; background: white; color: #0082cd; padding: 3px 6px;font-size: 21px;border-radius: 4px;"></i><i onclick="javascript: undosaveinfo(this,\'' + val.id + '\')" class="fa fa-undo" style="position: absolute;left: calc(50% + 300px);top: 129px;cursor: pointer; background: white; color: #0082cd; padding: 3px 6px;font-size: 21px;border-radius: 4px;"></i></div>'));
              newtweetobj.append($('<div style="' + tagstyle + '" class="tags"><i onclick="javascript: internallinkcopy(\'' + val.id + '\')" id="internallink" class="fa fa-link"></i><i onclick="javascript: externallinkcopy(\'' + val.url + '\', \'' + val.id + '\')" id="externallink" class="fa fa-external-link"></i><b>Tags </b>' + val.tags + tagchanged + '</div>'));
              newtweetobj.append($('<div class="innertweet"></div>'));
              newtweetobj.find('.innertweet').append(val.tweet);
              newtweetobj.attr('id', val.id);

              if (objToFocus < 0) {

                $('#tweetcount').fadeIn(800);

                objToFocus = currentIndex;
                var newtweetobjaction = newtweetobj;
                $('html, body').animate({
                  scrollTop: $(newtweetobjaction).offset().top - 60 
                }, 700);

              }
              currentIndex = currentIndex + 1;
            }   
          }
          else {
            if (currentIndex >= endIndex) {
              $('#moretweets').show();
              
              setTimeout(function(){
                $('#mask').fadeOut(300);
              }, 300);
              showMessage("Search Finished");
              return false;
            }
          }
          
          setTimeout(function(){
              $('#mask').fadeOut(300);
            }, 300);

            ind = ind + 1;
        });

        showMessage("Search Finished");
    }); 
}




var getInformationbyid = function(id) 
{
    $('#mask').fadeIn(300);  
    var path = "./data.json";
    var objToFocus = -1;
    

    $.getJSON(path, function(data) 
    {
      $.each(data.Tweets, function(key, val) 
        {
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

                showMessage("Tweet Loaded"); 

                return false;
          }
        
        });
    }); 
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
function openmenu() {
  if ($('#menu').css('width') == '0px') {
    $('#menu').css('width', '180px');
  }
  else {
    $('#menu').css('width', '0px');
  }

}
function gotop() {
  $(window).scrollTop( 0 );
}   

function internallinkcopy(id) {
  $('#linkresult').val("https://sleepy-mclean-3aea2d.netlify.com/?tweetid=" + id);
  $("#linkresult").select();
  document.execCommand('copy'); 
  showMessage("Internal Link Copied To Clipboard"); 
}

function externallinkcopy(link, id) {
  $('#linkresult').val(link);
  $("#linkresult").select();
  document.execCommand('copy');
  showMessage("External Link Copied To Clipboard"); 
}



  function resetFieldsPopup() 
    {
      $('#tweet').val('');
      $('#date').val('');
      $('#datecap').text('');
      $('#tweetid').val('');
      $('#postedby').text('');
      $('#categories').val('');
      $('#tags').val('');
      $('#info').val('');
      $('#result').val('');  
    }  


  function resetFields(flag) 
    {

      $("#main").empty();
      $('#moretweets').hide();
      $('#selectedcat').val('all');
      $('#selectedcattext').val('All Tweets');
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

  var clickmenu = function(val, text) 
    {      
      resetFields();

      $('#selectedcat').val(val);
      $('#selectedcattext').val(text);


      openmenu();
      getInformation(false);

    }  


  var closePopup = function() 
    {
      $('#tweet').val('');
          $('#date').val('');
          $('#datecap').text('');
          $('#tweetid').val('');
          $('#postedby').text('');
          $('#categories').val('');
          $('#tags').val('');
          $('#info').val('');
          $('#result').val('');  
      $('.addpopup').fadeOut();

    }  
  
    var togglecriterions = function() 
    {
      if ($('.toptitle').css('display') == 'none') {
        $(".top").css("transition", "opacity 0.7s");
        $('.top').css('opacity', '0');
        
        setTimeout(function(){
          $('html').find('.top').each( function( index, element ){
              $(this).css('display', 'none');
          });
          
          $(".toptitle").css("transition", "none");
          $('.toptitle').css('opacity', '0');
          $('.toptitle').css('display', 'inline');
          $(".toptitle").css("transition", "opacity 0.7s");
          $('.toptitle').css('opacity', '1');
        }, 400);
      }
      else {
        $(".toptitle").css("transition", "opacity 0.7s");
        $('.toptitle').css('opacity', '0');
        setTimeout(function(){
          $('.toptitle').css('display', 'none');
          $(".top").css("transition", "none");
          $('.top').css('opacity', '0');
          $('html').find('.top').each( function( index, element ){
            $(this).css('display', 'inline');
          });
          $(".top").css("transition", "opacity 0.7s");
          $('.top').css('opacity', '1');
        }, 400);
      } 
    }   

    
    var openCreatePopup = function() 
    {
        $('#tweet').val('');
        $('#date').val('');
        $('#datecap').text('');
        $('#tweetid').val('');
        $('#postedby').text('');
        $('#categories').val('');
        $('#tags').val('');
        $('#info').val('');
    $('.addpopup').fadeIn();
    $('#tweet').focus();
    $('#result').val(''); 
      
    }   

    function pad (str, max) {
        str = str.toString();
        return str.length < max ? pad("0" + str, max) : str;
    }

      
    function getMonthFromString(mon){
        return new Date(Date.parse(mon +" 1, 2012")).getMonth()+1
     }

    function saveinfo(obj, id) {
        createCookie(id + "info", encodeURIComponent($("#" + id + "info").val()), 99999);
        
        $(obj).parent().parent().find("#expand").addClass("infomodified");
        
        
        $(obj).parent().find("textarea.info").css("border", "2px solid red");

        if ($(obj).parent().find(".oldinfo"))
          $(obj).parent().find(".oldinfo").css("border", "2px solid red");

        createCookie("hasChanges", "Yes");
        $("#generate").addClass("haschanges");

        showMessage("Information About Tweet Saved"); 
    }   

    function undosaveinfo(obj, id) {
      var oldtext = readCookie(id + "info");

      if ($(obj).parent().find(".oldinfo"))
           oldtext = $(obj).parent().find(".oldinfo").text();

      createCookie(id + "info", "", 99999);
      
      $(obj).parent().parent().find("#expand").removeClass("infomodified");
      
      $(obj).parent().find("textarea.info").val(oldtext);
      $(obj).parent().find("textarea.info").css("border", "none");

      if ($(obj).parent().find(".oldinfo"))
         $(obj).parent().find(".oldinfo").remove();


      var callback = function(flag) 
      {      
        if (flag) {
          createCookie("hasChanges", "Yes");
          $("#generate").addClass("haschanges");
        }
        else {
          createCookie("hasChanges", "");
          $("#generate").removeClass("haschanges");
        }

        showMessage("Information About Tweet Reverted");
      } 

      hasTweetChanges(callback);
  }  

    function removetweet(obj, id) {

        var isdeleted = readCookie(id + "isdeleted");
        if (isdeleted && isdeleted.length > 0) {
            createCookie(id + "isdeleted", "", 99999);
            $(obj).parent().parent().css('background-image', 'linear-gradient(to bottom, #0081cc , #008ada )');

            if (hasTweetChanges()) {
              createCookie("hasChanges", "Yes");
              $("#generate").addClass("haschanges");
            }
            else {
              createCookie("hasChanges", "");
              $("#generate").removeClass("haschanges");
            }
            showMessage("Tweet Marked To Delete Reverted");
        } 
        else {
            createCookie(id + "isdeleted", "a", 99999);
            $(obj).parent().parent().css('background-image', 'linear-gradient(to bottom, #d60000, #ff2e2e)');
            $("#generate").addClass("haschanges");
            createCookie("hasChanges", "Yes");
            showMessage("Tweet Marked To Delete");
        }
    }    

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

            $("#generate").addClass("haschanges");
            createCookie("hasChanges", "Yes");
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

            $("#generate").addClass("haschanges");
            createCookie("hasChanges", "Yes");
            showMessage("Tag Marked To Change");
        }

        $("#changetags").fadeOut();
    }   

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
                $('#' + id).find('.tags').css('background-image', 'linear-gradient(to right, #0082cd, #0082cd)');
            }
            if (hasTweetChanges()) {
              $("#generate").addClass("haschanges");
              createCookie("hasChanges", "Yes");
            }
            else {
              $("#generate").removeClass("haschanges");
              createCookie("hasChanges", "");
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
                $('#' + id).find('.tags').css('background-image', 'linear-gradient(to right, #0082cd, #0082cd)');
            }
            if (hasTweetChanges()) {
              $("#generate").addClass("haschanges");
              createCookie("hasChanges", "Yes");
            }
            else {
              $("#generate").removeClass("haschanges");
              createCookie("hasChanges", "");
            }
            showMessage("Category Marked To Change Reverted");
        }

        $("#changetags").fadeOut();
    }   

    function closetagpopup(obj, id) {
        $("#changetags").fadeOut();
    }   

    
    function showMessage(text) {
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
                  }, 3500);
              }, 900);
            
        });
    }   

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
 
    function generate() {
        var path = "./data.json";
        var text = '{"Tweets": [';
        var ind = false;
        $.getJSON(path, function(data) 
        {
          $.each(data.Tweets, function(key, val) 
            {
                var cat = readCookie(val.id + "catchanged");

                if (cat && cat.length > 0) {
                    val.categories = cat;
                    createCookie(val.id + "catchanged_bk", cat, 99999);
                    createCookie(val.id + "catchanged", "", 99999);
                }

                var tag = readCookie(val.id + "tagchanged");

                if (tag && tag.length > 0) {
                    val.tags = tag;
                    createCookie(val.id + "tagchanged_bk", tag, 99999);
                    createCookie(val.id + "tagchanged", "", 99999);
                }

                var info = readCookie(val.id + "info");

                if (info && info.length > 0) {
                    val.info = info;
                    createCookie(val.id + "info_bk", info, 99999);
                    createCookie(val.id + "info", "", 99999);
                }

                var isdeleted = readCookie(val.id + "isdeleted");

                if (isdeleted && isdeleted.length > 0) {
                    createCookie(val.id + "isdeleted_bk", "yes", 99999);
                    createCookie(val.id + "isdeleted", "", 99999);
                } 
                else {
                    
                    if (ind) {
                        text = text + ",";
                    }
                    else {
                        ind = true;
                    }
                    text = text + JSON.stringify(this, null, " ");  
                }
              
            });

            text = text + ']}';
            $('#linkresult').val(text);
            $("#linkresult").select();
            document.execCommand('copy'); 
            createCookie("hasChanges", "Yes");
            $("#generate").removeClass("haschanges");

            showMessage("Changes Processed And Copied To Clipboard");
        }); 
    } 

    function undogenerate() {
      var path = "./data.json";
      var ind = false;

      $.getJSON(path, function(data) 
      {
        $.each(data.Tweets, function(key, val) 
          {
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

              var isdeleted = readCookie(val.id + "isdeleted_bk");
              if (isdeleted && isdeleted.length > 0) {
                  ind = true;
                  createCookie(val.id + "isdeleted", "yes", 99999);
                  createCookie(val.id + "isdeleted_bk", "", 99999);
              } 
              else {
                  createCookie(val.id + "isdeleted", "", 99999);
              }            
          });

          if (ind) {
            createCookie("hasChanges", "Yes");
            $("#generate").addClass("haschanges");
          }

          showMessage("Processed Changes Were Reverted");
      }); 
  } 

    function hasTweetChanges(callback) {
      var path = "./data.json";
      var ind = false;
      $.getJSON(path, function(data) 
      {
        $.each(data.Tweets, function(key, val) 
          {
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

              var isdeleted = readCookie(val.id + "isdeleted");
              if (isdeleted && isdeleted.length > 0) {
                ind = true;
                return false;
              } 
          });

          if (callback)
              callback(ind);

          return ind;
      }); 
      return ind;
  } 

/*  COOCKIES -----------------------------------   */

    function createCookie(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        }
        else var expires = "";               

        document.cookie = name + "=" + value + expires + "; path=/";
    }

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

    function eraseCookie(name) {
        createCookie(name, "", -1);
    }  
    
    
    function parseTweet() {
        setTimeout(function(){
            nextid = parseInt($('#maxid').val()) + 1;
            $('#tweetid').val(nextid);
            
            text = $('#tweet').val();
            text = "\"" + text.replace(/"/g, '').replace('<\/script>', '<&#47;script>') + "\"";
            
            origin = text.substring(text.indexOf('&mdash;') + 8, text.lastIndexOf(' <a href=https')); 
    
            url = text.substring(text.lastIndexOf('https://twitter'), text.lastIndexOf('?ref_src=')); 
    
            var date = text.substring(text.lastIndexOf('ref_src=twsrc%5Etfw>') + 20, text.lastIndexOf('</a></blockquote>')); 
            
            var year = date.substring(date.length - 4);
            var month = date.substring(0, date.indexOf(' ')); 
            var day = date.substring(date.indexOf(' ') + 1, date.lastIndexOf(' ') -1); 

            $('#datecap').text(date);
    
            $('#date').val(year + pad(getMonthFromString(month), 2) + pad(day, 2));
    
            $('#date').focus(function(){
              var that = this;
              setTimeout(function(){ that.selectionStart = that.selectionEnd = 10000; }, 0);
            });
            
            $('#postedby').text(origin);
    
            $('#categories').focus();

            showMessage("Embebed Tweet Correctly Parsed"); 
          }, 700);
    }  
    
    var ctrlDown = false,
    ctrlKey = 17,
    vKey = 86;

$(document).keydown(function(e) {
    if (e.keyCode == ctrlKey) ctrlDown = true;
}).keyup(function(e) {
    if (e.keyCode == ctrlKey) ctrlDown = false;
});

// Document Ctrl + C/V 
$(document).keydown(function(e) {
    if (ctrlDown && (e.keyCode == vKey)) {
        navigator.clipboard.readText()
  .then(text => {
    openCreatePopup();
    setTimeout(function() { 
        $('#tweet').val(text);
        parseTweet();
      }, 300);
    
  })
  .catch(err => {
    console.error('Failed to read clipboard contents: ', err);
  });
    } 
});

function aaaas() {
  alert('double click');
}  
