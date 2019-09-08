
function parseTweet() {
    setTimeout(function(){
        nextid = parseInt($('#maxid').val()) + 1;
        $('#tweetid').val(nextid);

        text = $('#tweet').val();
        
        if (text.substring(0,4) == "<blo") {
          addType = "T";
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

          var date = new Date();
          
          $('#date').val(date.getFullYear() + "" + pad((date.getMonth() + 1), 2) + pad(date.getDate(), 2));
        
          url = text; 
        }
        else {
          addType = "Y";

          var date = new Date();
          
          $('#date').val(date.getFullYear() + "" + pad((date.getMonth() + 1), 2) + pad(date.getDate(), 2));
        
          url = text.substring(text.indexOf('https://www.youtube'), text.indexOf('frameborder') - 2); 
          
          url = text.substring(text.indexOf('embed') + 7, text.indexOf('frameborder') - 2); 
          alert("-" + url + "-");
   

        }





        $('#date').focus(function(){
          var that = this;
          setTimeout(function(){ that.selectionStart = that.selectionEnd = 10000; }, 0);
        });
        
        $('#postedby').val(origin);

        $('#categories').focus();

        showMessage("Embebed Tweet Correctly Parsed"); 
      }, 700);
}  