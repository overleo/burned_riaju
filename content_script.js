
$(document).ready(function() {
  $("body").append("<canvas id='src' style='display: none;'></canvas>");
  var canvas = document.getElementById('src');
  var ctx = canvas.getContext('2d');
  var urls = [];

  var existUrl = function(url) {
    var exist = false

    urls.forEach(function(exist_url){ if(exist_url == url) exist = true; });

    return exist;
  }

  var detectFace = function(element) {
    var img = new Image();
    img.crossOrigin = "anonymous";
    img.src = element.src;

    if(existUrl(img.src)) return;

    urls.push(img.src);

    console.log(img.src);

    img.onload = function() {
      var comp = ccv.detect_objects({
        "canvas": ccv.grayscale(ccv.pre(img)),
        "cascade": cascade,
        "interval": 5,
        "min_neighbors": 1
      });

      if(comp.length >= 1) {
        console.log("detect!!: " + img.src);
        console.log("comp size: " + comp.length);

        $(element).after("<img class='fire' src='http://media.giphy.com/media/issHYYSN6OW3K/giphy.gif'></div>")
        $(element).parent().find('.fire')
          .css('position', 'absolute')
          .css('left', 0)
          .css('top', 0)
          .css('width', element.width + 'px')
          .css('height', element.height + 'px')
          .css('z-index', '100');
      };
    };
  };

  $('._5pcb').on('DOMSubtreeModified propertychange', function() {
    console.log('search')
    $('._4ikz').find("img").each(function() { detectFace(this); });
  });
});
