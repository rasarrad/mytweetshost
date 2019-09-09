
function parseTweet() {
    resetFieldsPopup(); 
    setTimeout(function(){
        nextid = parseInt($('#maxid').val()) + 1;
        $('#tweetid').val(nextid);

        text = $('#tweet').val();
        
        alert($('#tweet').val().substring(0,4));

        alert(text.substring(0,4));

        if (text.substring(0,4) == "<blo") {
          addType = "T";
          $('#typeT').css('border-color', '#00bc00'); 

          alert(1);
          text = "\"" + text.replace(/"/g, '').replace('<\/script>', '<&#47;script>') + "\"";
        
          origin = text.substring(text.indexOf('&mdash;') + 8, text.lastIndexOf(' <a href=https')); 
  
          url = text.substring(text.lastIndexOf('https://twitter'), text.lastIndexOf('?ref_src=')); 
  
          var date = text.substring(text.lastIndexOf('ref_src=twsrc%5Etfw>') + 20, text.lastIndexOf('</a></blockquote>')); 
          
          var year = date.substring(date.length - 4);
          var month = date.substring(0, date.indexOf(' ')); 
          var day = date.substring(date.indexOf(' ') + 1, date.lastIndexOf(' ') -1); 
  
          $('#date').val(year + pad(getMonthFromString(month), 2) + pad(day, 2));
        }
        else if (text.substring(0,4) == "http") {
          addType = "H";
          $('#typeH').css('border-color', '#00bc00'); 

          var date = new Date();
          
          $('#date').val(date.getFullYear() + "" + pad((date.getMonth() + 1), 2) + pad(date.getDate(), 2));
        
          url = text; 
        }
        else {
          addType = "Y";
          $('#typeY').css('border-color', '#00bc00'); 
          alert(2);
          var date = new Date();
          
          $('#date').val(date.getFullYear() + "" + pad((date.getMonth() + 1), 2) + pad(date.getDate(), 2));
        
          url = text.substring(text.indexOf('https://www.youtube'), text.indexOf('frameborder') - 2); 
          
          urldirect = "https://www.youtube.com/watch?v=" + text.substring(text.indexOf('embed') + 6, text.indexOf('frameborder') - 2); 
          
          text = '<iframe style="width: calc(100% - 250px);padding-top: 6px;height: 446px;padding-left: 125px;padding-right: 125px;" ' 
                + text.substring(8); 
        }

        $('#date').focus(function(){
          var that = this;
          setTimeout(function(){ that.selectionStart = that.selectionEnd = 10000; }, 0);
        });
        
        $('#postedby').val(origin);

        $('#categories').focus();

        showMessage("Link Successfully Parsed"); 
    }, 700);
} 


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


$( "#create" ).bind( "click", function( event ) {
    var ishidden = "0";
    if ($("#ishidden").is(":checked")) {
        ishidden = "1";
    } 
    var resinfo = $('#info').val().replace(/"/g, "");
    resinfo = resinfo.replace(/(\r\n|\n|\r)/gm, "");

    if (addType == "T") {
        $('#result').val("{\r\n\"id\": \"" + nextid + "\",\r\n\"url\": \"" + url  + "\",\r\n\"ishidden\": \"" + ishidden  + "\",\r\n\"date\": \"" + $('#date').val() + "\",\r\n\"author\": \"" + origin  + "\",\r\n\"categories\": \"" + $('#categories').val() + "\",\r\n\"tags\": \"" + $('#tags').val() + "\",\r\n\"info\": \"" + resinfo + "\",\r\n\"classif\": \"" + $('#classifpop').val() + "\",\r\n\"tweet\": " + text + "\r\n},");
    }
    else if (addType == "Y") {
        $('#result').val("{\r\n\"id\": \"" + nextid + "\",\r\n\"url\": \"" + urldirect  + "\",\r\n\"ishidden\": \"" + ishidden  + "\",\r\n\"date\": \"" + $('#date').val() + "\",\r\n\"author\": \"" + $('#postedby').val() + "\",\r\n\"categories\": \"" + $('#categories').val() + "\",\r\n\"tags\": \"" + $('#tags').val() + "\",\r\n\"info\": \"" + resinfo + "\",\r\n\"classif\": \"" + $('#classifpop').val() + "\",\r\n\"tweet\": " + text + "\r\n},");
    }
    else {
        $('#result').val("{\r\n\"id\": \"" + nextid + "\",\r\n\"url\": \"" + url  + "\",\r\n\"ishidden\": \"" + ishidden  + "\",\r\n\"date\": \"" + $('#date').val() + "\",\r\n\"author\": \"" + $('#postedby').val() + "\",\r\n\"categories\": \"" + $('#categories').val() + "\",\r\n\"tags\": \"" + $('#tags').val() + "\",\r\n\"info\": \"" + resinfo + "\",\r\n\"classif\": \"" + $('#classifpop').val() + "\",\r\n\"tweet\": " + text + "\r\n},");
    }

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


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


var openCreatePopup = function(flag) 
{
    if (flag) {
        $("#onemore").prop("checked", false);
    }
    else {
        $("#onemore").prop("checked", true);
    }
    $('#tweet').val('');
    $('#date').val('');
    $('#tweetid').val('');
    $('#postedby').val('');
    $('#categories').val('');
    $('#tags').val('');
    $('#info').val('');
    $('.addpopup').fadeIn();
    $('#tweet').focus();
    $('#result').val('');
    $('#typeT').css('border-color', 'white'); 
    $('#typeH').css('border-color', 'white'); 
    $('#typeY').css('border-color', 'white'); 
} 

function resetFieldsPopup() 
{
    $('#tweet').val('');
    $('#date').val('');
    $('#tweetid').val('');
    $('#postedby').val('');
    $('#categories').val('');
    $('#tags').val('');
    $('#info').val('');
    $('#result').val('');    
    $('#typeT').css('border-color', 'white'); 
    $('#typeH').css('border-color', 'white'); 
    $('#typeY').css('border-color', 'white');   
}  

var closePopup = function() 
{
    $('#tweet').val('');
    $('#date').val('');
    $('#tweetid').val('');
    $('#postedby').val('');
    $('#categories').val('');
    $('#tags').val('');
    $('#info').val('');
    $('#result').val('');  
    $('.addpopup').fadeOut();
    $('#typeT').css('border-color', 'white'); 
    $('#typeH').css('border-color', 'white'); 
    $('#typeY').css('border-color', 'white');  
}  