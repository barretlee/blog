document.onclick = function(e) {
  if (e.target.tagName == "title") {
    open(e.target.nextSibling.nextSibling.childNodes[0].data);
  }
};
onload = function() {
  var i, o, v, s = document.getElementsByTagName("pubDate");
  for (i = 0; i < s.length; i++)
  o = s[i].childNodes[0], v = new Date(o.data), o.data = [v.getFullYear(), v.getMonth() + 1, v.getDate()].join("-").replace(/\b\d\b/g, "0$&");
  var ctts = document.getElementsByTagName("description");
  for(i = 1; i < ctts.length; i++) {
    var item = ctts[i].nextElementSibling;
    item.textContent = item.textContent.replace(/<[^>]*?>/gmi, "");
  }
};
