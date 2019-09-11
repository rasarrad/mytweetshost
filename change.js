
function saveinfo(obj, id) {
    createCookie(id + "info", encodeURIComponent($("#" + id + "info").val()), 99999);
    
    $(obj).parent().parent().find("#expand").addClass("infomodified");
    
    $(obj).parent().find("textarea.info").css("border", "2px solid red");

    if ($("#" + id + "oldinfo").length > 0) {
      $("#" + id + "oldinfo").css("border", "2px solid red");

      $("#" + id + "undoinfo").css("display", "inline-block");
    }
    console.log(1);   
    createCookie("hasChanges", "Yes");
    $("#generate").addClass("haschanges");

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

    console.log(2); 
    createCookie("hasChanges", "Yes");
    $("#generate").addClass("haschanges");

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
            console.log(3); 
            createCookie("hasChanges", "Yes");
            $("#generate").addClass("haschanges");
        }
        else {
            createCookie("hasChanges", "");
            $("#generate").removeClass("haschanges");
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
            console.log(4); 
            createCookie("hasChanges", "Yes");
            $("#generate").addClass("haschanges");
        }
        else {
            createCookie("hasChanges", "");
            $("#generate").removeClass("haschanges");
        }

        showMessage("Information About Link Reverted");
    } 

    hasTweetChanges(callback);
}  


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function removetweet(obj, id) {
    var isdeleted = readCookie(id + "isdeleted");
    if (isdeleted && isdeleted.length > 0) {
        createCookie(id + "isdeleted", "", 99999);
        $(obj).parent().parent().css('background-image', 'linear-gradient(to bottom, #0081cc , #008ada )');

        if (hasTweetChanges()) {
            console.log(5); 
          createCookie("hasChanges", "Yes");
          $("#generate").addClass("haschanges");
        }
        else {
          createCookie("hasChanges", "");
          $("#generate").removeClass("haschanges");
        }
        showMessage("Link Marked To Delete Reverted");
    } 
    else {
        createCookie(id + "isdeleted", "a", 99999);
        $(obj).parent().parent().css('background-image', 'linear-gradient(to bottom, #d60000, #ff2e2e)');
        $("#generate").addClass("haschanges");
        console.log(6); 
        createCookie("hasChanges", "Yes");
        showMessage("Link Marked To Delete");
    }
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

        $("#generate").addClass("haschanges");
        console.log(7); 
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
        console.log(8); 
        createCookie("hasChanges", "Yes");
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
            $('#' + id).find('.tags').css('background-image', 'linear-gradient(to right, #0082cd, #0082cd)');
        }
        if (hasTweetChanges()) {
          $("#generate").addClass("haschanges");
          console.log(9); 
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
          console.log(10); 
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


function generate() {
    resetFields(false);
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
            }
            else {
              createCookie(val.id + "catchanged_bk", "", 99999);
            }
            createCookie(val.id + "catchanged", "", 99999);

            var tag = readCookie(val.id + "tagchanged");
            if (tag && tag.length > 0) {
                val.tags = tag;
                createCookie(val.id + "tagchanged_bk", tag, 99999);
            }
            else {
              createCookie(val.id + "tagchanged_bk", "", 99999);
            }
            createCookie(val.id + "tagchanged", "", 99999);

            var info = readCookie(val.id + "info");
            if (info && info.length > 0) {
                val.info = info;
                createCookie(val.id + "info_bk", info, 99999);
            }
            else {
              createCookie(val.id + "info_bk", "", 99999);
            }
            createCookie(val.id + "info", "", 99999);

            var classif = readCookie(val.id + "classif");
            if (classif && classif.length > 0) {
                val.classif = classif;
                createCookie(val.id + "classif_bk", classif, 99999);
            }
            else {
              createCookie(val.id + "classif_bk", "", 99999);
            }
            createCookie(val.id + "classif", "", 99999);

            var isdeleted = readCookie(val.id + "isdeleted");
            if (isdeleted && isdeleted.length > 0) {
                createCookie(val.id + "isdeleted_bk", "yes", 99999);
                createCookie(val.id + "isdeleted", "", 99999);
            } 
            else {
                createCookie(val.id + "isdeleted", "", 99999);
                createCookie(val.id + "isdeleted_bk", "", 99999);
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
        createCookie("hasChanges", "");
        console.log(11); 
        $("#generate").removeClass("haschanges");

        showMessage("Changes Processed And Copied To Clipboard");
    }); 
} 


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function undogenerate() {
  var path = "./data.json";
  var ind = false;
  resetFields(false);
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
      });

      if (ind) {
        console.log(12); 
        createCookie("hasChanges", "Yes");
        $("#generate").addClass("haschanges");
      }

      showMessage("Processed Changes Were Reverted");
  }); 
} 


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


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