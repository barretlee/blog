/**
 * Writer
 * @type {{go: Function}}
 */
var Writer = {
  go: function (){
    var code = $(".writerBox textarea").val();
    var $codeBox = $(".writerBox code");
    $codeBox.removeAttr("class").text(code);
    hljs.highlightBlock($codeBox[0]);
    $(".writerBox").height($codeBox.height() + 50);
    $(".words-counter").text(code.length + "字");
  },
  parser: function(){
    return marked($(".writerBox textarea").val());
  }
};

$(document).ready(function() {
  set_tab_indent_for_textareas();
  $(".writerBox textarea").on("keyup change keydown", function(){
    Writer.go();
  }).trigger("change");
  $(".preview").on("click", function(){
    if($(this).hasClass("edit")) {
      $(this).removeClass("edit");
      $(".post-content").html(Writer.parser()).show();
      $(".post-content pre code").each(function(){
        hljs.highlightBlock($(this).get(0));
      });
      $(".writerBox").hide();
    } else {
      $(this).addClass("edit");
      $(".post-content").hide();
      $(".writerBox").show();
    }
  });
  $(document).on("click", ".hljs-link_url", function(evt){
    evt.preventDefault();
    if(window.altDown) {
      $(".mask").addClass("mask-show");
      $(".uploadImg").addClass("uploadImg-show")[0].target = $(this);
    }
  });
  window.altDown = false;
  $(window).on("keydown", function(evt){
     //console.log(evt.which);
    if(evt.which == 83 && (evt.metaKey || evt.ctrlKey)) {
      evt.preventDefault();
      $(".save").trigger("click");
    }
    if(evt.which == 69 && (evt.metaKey || evt.ctrlKey)) {
      evt.preventDefault();
      $(".preview").trigger("click");
    }
    if(evt.which == 18){
      window.altDown = true;
      $(".writerBox textarea").addClass("hide");
    }
    if(evt.which == 27){
      $(".mask").removeClass("mask-show");
      $(".uploadImg").removeClass("uploadImg-show")[0].target = null;
    }
  }).on("keyup", function(evt){
    if(evt.which == 18){
      window.altDown = false;
      $(".writerBox textarea").removeClass("hide");
    }
  }).on("paste", function(evt){
    //if(!$(".uploadImg-show").size()) return;
    var evt = evt.originalEvent;
    var clipboardData = evt.clipboardData;
    var items = clipboardData && clipboardData.items;
    var item = items && items[0];
    if(item && /^image/i.test(item.type)) {
      item = item.getAsFile();
      uploadImage(item);
    } else {
      window.console && window.console.log("仅支持图片");
    }
    //return false;
  });
  $(".uploadImg input").on("change", function(evt){
    var $this = $(this).get(0);
    var files = $this.files;
    if(files && files[0] && /image/i.test(files[0].type)) {
      uploadImage(files[0]);
    } else {
      window.console && window.console.log("仅支持图片");
    }
  }).on("drop", function(evt){
    evt.preventDefault();
    var evt = evt.originalEvent;
    var files = evt.dataTransfer.files;
    if(files && files[0] && /image/i.test(files[0].type)) {
      uploadImage(files[0]);
    } else {
      window.console && window.console.log("仅支持图片");
    }
    $(".uploadImg").css('opacity', 1);
  }).on("dragover", function(evt){
    evt.preventDefault();
    var evt = evt.originalEvent;
    evt.dataTransfer.dragEffect = 'copy';
    $(".uploadImg").css('opacity', 0.6);
  }).on("dragend dragleave", function(){
    $(".uploadImg").css('opacity', 1);
  });
  $(".save").on("click", function(evt){
    evt.preventDefault();
    $.ajax({
      type: "post",
      url: "/save",
      data: {
        md: $(".writerBox textarea").val()
      },
      success: function(data){
        if(data && data.code == 200){
          $(".save").text("成功!");
          setTimeout(function(){
            $(".save").text("");
          }, 1000);
        }
      },
      error: function(e){
        console.log(e);
        $(".save").text("失败!");
        setTimeout(function(){
          $(".save").text("");
        }, 1000);
      }
    });
  });
  setInterval(function(){
    $(".save").trigger("click");
  }, 10 * 1000);

  window.onbeforeunload = function(){
    $(".save").trigger("click");
  };
});

function uploadImage(imgData){
  var formData = new FormData();
  formData.append("img", imgData);
  formData.append("needsy", $("#needsy")[0].checked ? "on" : "off");
  $.ajax({
    type: "post",
    url: "/img",
    data: formData,
    processData: false,
    contentType: false,
    success: function(data){
      if(data && data.code == 200){
        $(".mask").removeClass("mask-show");
        var target = $(".uploadImg").removeClass("uploadImg-show")[0].target;
        $(target).text(data.path);
        var $code = $(".writerBox code");
        var code = $code.text();
        var $codeBox = $(".writerBox textarea");
        $codeBox.val(code);
        $(".writerBox").height($code.height() + 50);
        target = null;
      }
    },
    error: function(e){
      console.log(e)
    }
  });
}


// insert tab
function insertAtCursor(obj, txt) {
  obj.focus();
  //IE support
  if (document.selection) {
    sel = document.selection.createRange();
    sel.text = txt;
  }
  //MOZILLA/NETSCAPE support
  else {
    var startPos = obj.selectionStart;
    var scrollTop = obj.scrollTop;
    var endPos = obj.selectionEnd;
    obj.value = obj.value.substring(0, startPos) + txt + obj.value.substring(endPos, obj.value.length);
    startPos += txt.length;
    obj.setSelectionRange(startPos, startPos);
    obj.scrollTop = scrollTop;
  }
}
function getCaretPos(ctrl) {
  var caretPos = 0;
  if (document.selection) {
    // IE Support
    var range = document.selection.createRange();
    // We'll use this as a 'dummy'
    var stored_range = range.duplicate();
    // Select all text
    stored_range.moveToElementText(ctrl);
    // Now move 'dummy' end point to end point of original range
    stored_range.setEndPoint('EndToEnd', range);
    // Now we can calculate start and end points
    ctrl.selectionStart = stored_range.text.length - range.text.length;
    ctrl.selectionEnd = ctrl.selectionStart + range.text.length;
    caretPos = ctrl.selectionStart;
  } else if (ctrl.selectionStart || ctrl.selectionStart == '0')
  // Firefox support
    caretPos = ctrl.selectionStart;
  return (caretPos);
}

function getCurrentLineBlanks(obj) {
  var pos = getCaretPos(obj);
  var str = obj.value;
  var i = pos - 1;
  while (i >= 0) {
    if (str.charAt(i) == '\n')
      break;
    i--;
  }
  i++;
  var blanks = "";
  while (i < str.length) {
    var c = str.charAt(i);
    if (c == ' ' || c == '\t')
      blanks += c;
    else
      break;
    i++;
  }
  return blanks;
}

function set_tab_indent_for_textareas() {
  /* set all the tab indent for all the text areas */
  $("textarea").each(function() {
    $(this).keydown(function(eve) {
      if (eve.target != this) return;
      if (eve.keyCode == 13)
        last_blanks = getCurrentLineBlanks(this);
      else if (eve.keyCode == 9) {
        eve.preventDefault();
        insertAtCursor(this, "    ");
        this.returnValue = false;
      }
    }).keyup(function(eve) {
      if (eve.target == this && eve.keyCode == 13)
        insertAtCursor(this, last_blanks);
    });
  });
}