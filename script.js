var text = "";
var origin = "";
var nextid = "";
var currentIndex = 0;
var currpage = 0;
var dosearchmore = true;
var url = "";
console.log(444); 

$( document ).ready(function() {
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
      setTimeout(function(){
        nextid = parseInt($('#maxid').val()) + 1;
        $('#tweetid').val(nextid);
        
        text = $('#tweet').val();
        text = "\"" + text.replace(/"/g, '').replace('<\/script>', '<&#47;script>') + "\"";
        
        origin = text.substring(text.indexOf('&mdash;') + 8, text.lastIndexOf(' <a href=https')); 

        url = text.substring(text.lastIndexOf('https://twitter'), text.lastIndexOf('?ref_src=')); 

        var date = text.substring(text.lastIndexOf('ref_src=twsrc%5Etfw>') + 20, text.lastIndexOf('</a></blockquote>')); 
        $('#datecap').text(date);

        $('#date').val(date.substring(date.length - 4));

        $('#date').focus(function(){
          var that = this;
          setTimeout(function(){ that.selectionStart = that.selectionEnd = 10000; }, 0);
        });
        
        $('#postedby').text(origin);

        $('#date').focus();
      }, 700);

  });


  $( "#moretweets" ).bind( "click", function( event ) {
    getInformation(true);
  });
  $( "#btnsearch" ).bind( "click", function( event ) {
    getInformation(false);
  });
  $( "#btnreset" ).bind( "click", function( event ) {
    resetFields();
  });
 
  
  $( "#create" ).bind( "click", function( event ) {
    var ishidden = "0";
    if ($("#ishidden").is(":checked")) {

        ishidden = "1";
    } 
  
        $('#result').val("{\r\n\"id\": \"" + nextid + "\",\r\n\"url\": \"" + url  + "\",\r\n\"ishidden\": \"" + ishidden  + "\",\r\n\"date\": \"" + $('#date').val() + "\",\r\n\"author\": \"" + origin  + "\",\r\n\"categories\": \"" + $('#categories').val() + "\",\r\n\"tags\": \"" + $('#tags').val() + "\",\r\n\"tweet\": " + text + "\r\n},");

        $('#maxid').val(nextid);
        $("#result").select();
    document.execCommand('copy');

    resetFieldsPopup();

    if ($("#onemore").is(":checked")) {

        $('#tweet').focus();
    } 
    else {

        $('.addpopup').fadeOut(2000);
    }       
    });


    $( "#addtweet" ).bind( "click", function( event ) {
    openCreatePopup();
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
                tagchanged = '<span class="newtag"><b>New tags </b>' + tagchanged + '</span>';
                catchanged = '<span class="newcat"><b>New categories </b>' + catchanged + '</span>';
              } 
              else {
                if (tagchanged && tagchanged.length > 0) {
                    tagstyle = "background-image: linear-gradient(to right, rgb(177, 0, 0), rgb(247, 205, 205))";
                    tagchanged = '<span class="newtag"><b>New tags </b>' + tagchanged + '</span>';
                    catchanged = '<span class="newcat"></span>';
                }
                else if (catchanged && catchanged.length > 0) {
                    tagstyle = "background-image: linear-gradient(to left, rgb(177, 0, 0), rgb(247, 205, 205))";
                    tagchanged = '<span class="newtag"></span>';
                    catchanged = '<span class="newcat"><b>New categories </b>' + catchanged + '</span>';
                }
                else {
                    tagchanged = '<span class="newtag"></span>';
                    catchanged = '<span class="newcat"></span>';
                }
              }

              $('#moretweets').hide();
              var newtweet = $('#main').append($('<div style="' + isdeleted + '" id="inid" class="tweet"></div>'));
              var newtweetobj = $('#inid');
              newtweetobj.append($('<i onclick="javascript: expandCat(this)" id="expand" class="fa fa-angle-double-down"></i><div class="categorias"><i onclick="javascript: removetweet(this,\'' + val.id + '\')" id="removetweet" class="fa fa-remove"></i><i tagactual="' + val.tags + '" onclick="javascript: changetag(this, \'' + val.id + '\')" id="changetag" class="fa fa-tags"></i><i catactual="' + val.categories + '" onclick="javascript: changecat(\'' + val.id + '\')" id="changecat" class="fa fa-bookmark"></i><b>Id </b>' + val.id + '<b> Categories </b>' + val.categories + catchanged + '</div>'));
              newtweetobj.append($('<div style="' + tagstyle + '" class="tags"><i onclick="javascript: internallinkcopy(\'' + val.id + '\')" id="internallink" class="fa fa-link"></i><i onclick="javascript: externallinkcopy(\'' + val.url + '\', \'' + val.id + '\')" id="externallink" class="fa fa-external-link"></i><b>Tags </b>' + val.tags + tagchanged + '</div>'));
              newtweetobj.append($('<div class="innertweet"></div>'));
              newtweetobj.find('.innertweet').append(val.tweet);
              newtweetobj.attr('id', val.id);

              if (objToFocus < 0) {

                $('#tweetcount').fadeIn(800);

                objToFocus = currentIndex;
                var newtweetobjaction = newtweetobj;
                $('html, body').animate({
                  scrollTop: $(newtweetobjaction).offset().top
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

              return false;
            }
          }
          
          setTimeout(function(){
              $('#mask').fadeOut(300);
            }, 300);

            ind = ind + 1;
        });
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

                return false;
          }
          
          setTimeout(function(){
              $('#mask').fadeOut(300);
            }, 300);
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
  if (jobj.is(":visible"))
    jobj.hide();
  else
    jobj.show();
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
    createCookie(id + "isdeleted", "a", 99999)
    //alert(readCookie("aaa"));
/*   $('#linkresult').val("https://sleepy-mclean-3aea2d.netlify.com/?tweetid=" + id);
  $("#linkresult").select();
  document.execCommand('copy'); */
}

function externallinkcopy(link, id) {

/*   $('#linkresult').val(link);
  $("#linkresult").select();
  document.execCommand('copy'); */
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
      $('#result').val('');  
    }  


  function resetFields() 
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
          $('#result').val('');  
      $('.addpopup').fadeOut();

    }  
  
    var togglecriterions = function() 
    {
      if ($('.toptitle').css('display') == 'none') {
        $('.toptitle').css('display', 'inline');
        $('html').find('.top').each( function( index, element ){
            $(this).css('display', 'none');
        });
      }
      else {
        $('.toptitle').css('display', 'none');
        $('html').find('.top').each( function( index, element ){
          $(this).css('display', 'inline');
        });
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
      $('.addpopup').fadeIn();
      $('#tweet').focus();
      $('#result').val('');  
    }   

    function removetweet(obj, id) {
        var isdeleted = readCookie(id + "isdeleted");
        if (isdeleted && isdeleted.length > 0) {
            createCookie(id + "isdeleted", "", 99999);
            $(obj).parent().parent().css('background-image', 'linear-gradient(to bottom, #0081cc , #008ada )');
        } 
        else {
            createCookie(id + "isdeleted", "a", 99999);
            $(obj).parent().parent().css('background-image', 'linear-gradient(to bottom, #d60000, #ff2e2e)');
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
    
            $('#' + id).find('.newcat').html('<b>New categories </b>' + $(obj).parent().find('input').val());           
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
    
            $('#' + id).find('.newtag').html('<b>New tags </b>' + $(obj).parent().find('input').val());
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
        }

        $("#changetags").fadeOut();
    }   

    function closetagpopup(obj, id) {
        $("#changetags").fadeOut();
    }   

    function changecat(obj, id) {

        var text = readCookie(id + "catchanged");

        $("#changetags").find('span.poptitle').text("Change categories")

        alert($(obj).attr('catactual'));
        if (text && text.length > 0)
            $("#changetags").find('input').val(text);
        else
            $("#changetags").find('input').val($(obj).attr('catactual'));

        $("#changetags").attr('currid', id);

        $("#changetags").attr('iscat', "yes");

        $("#changetags").fadeIn();
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
