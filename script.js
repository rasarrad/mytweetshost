

 
 $( document ).ready(function() {
    $( "#create" ).bind( "click", function( event ) {
         $('#result').val("{\r\n\"id\": \"" + nextid + "\",\r\n\"url\": \"" + url  + "\",\r\n\"date\": \"" + $('#date').val() + "\",\r\n\"author\": \"" + origin  + "\",\r\n\"categories\": \"" + $('#categories').val() + "\",\r\n\"tags\": \"" + $('#tags').val() + "\",\r\n\"tweet\": " + text + "\r\n},");

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
