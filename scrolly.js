function initStories() {
  for (
    var t = document.querySelectorAll(".flourish-embed"), e = 0;
    e < t.length;
    e++
  ) {
    var r = t[e],
      o = r.dataset.src.split("/")[1],
      i = r.getAttribute("data-height"),
      n = last_link_per_story["story-" + o],
      s = commonAncestor(r, n);
    r.id = "story-" + o;
    var l = document.createElement("div");
    l.classList.add("fl-scrolly-section"),
      (l.style.position = "relative"),
      (l.style.paddingBottom = "1px"),
      (l.id = "fl-scrolly-section-" + o),
      s.classList.add("fl-scrolly-parent-" + o);
    var a = document.querySelectorAll(".fl-scrolly-parent-" + o + " > *");
    r.__found_story__ = !1;
    for (var c = 0; c < a.length; c++) {
      var d = a[c];
      if (r.__found_story__) {
        if (
          (l.appendChild(d),
          d.querySelector(".fl-scrolly-last-link-story-" + o))
        )
          break;
      } else {
        var f = d.id == "story-" + o || d.querySelector("#story-" + o);
        f &&
          ((r.__found_story__ = !0),
          (d.style.top = "calc(50vh - " + i + "/2)"),
          d.classList.add("fl-scrolly-sticky"),
          s.insertBefore(l, d),
          l.appendChild(d));
      }
    }
  }
}
function initLinks() {
  for (
    var t = document.getElementsByTagName("change"), e = 0;
    e < t.length;
    e++
  ) {
    var r = t[e],
      o = r.getAttribute("href");
    if (o && o.match(/#story\/\d+/)) {
      var i = o.split("/")[1];
      (last_link_per_story["story-" + i] = r),
        r.classList.add("fl-scrolly-link"),
        r.classList.add("story-" + i),
        r.parentNode.classList.add("fl-scrolly-step"),
        r.addEventListener("click", function (t) {
          t.preventDefault(), updateStoryFromLink(this);
        });
    }
  }
  for (var r in last_link_per_story)
    last_link_per_story[r].classList.add("fl-scrolly-last-link-" + r);
}
function initIntersection() {
  var t = new IntersectionObserver(
    function (t, e) {
      t.forEach(function (t) {
        t.isIntersecting && updateStoryFromLink(t.target);
      });
    },
    { rootMargin: "0px 0px -50% 0px" }
  );
  document.querySelectorAll(".fl-scrolly-link").forEach(function (e) {
    return t.observe(e);
  });
}
function updateStoryFromLink(t) {
  var e = t.getAttribute("href").split("/"),
    r = parseFloat(e[e.length - 1].replace("slide-", "")),
    o = r - 1,
    i = t.parentElement.parentElement.querySelector(".flourish-embed iframe");
  i.src = i.src.replace(/#slide-.*/, "") + "#slide-" + o;
}
function parents(t) {
  for (var e = [t]; t; t = t.parentNode) e.unshift(t);
  return e;
}
function commonAncestor(t, e) {
  var r = parents(t),
    o = parents(e);
  if (r[0] != o[0]) throw "No common ancestor!";
  for (var i = 0; i < r.length; i++) if (r[i] != o[i]) return r[i - 1];
}
function initStyles() {
  var t = document.createElement("style");
  (t.innerHTML =
    ".fl-scrolly-sticky {position: -webkit-sticky;position: sticky;}.fl-scrolly-section .fl-scrolly-step {position: relative;width: 50%;margin: 0 10px 80vh;padding: 1.25em;background: #fff;box-shadow: 3px 3px 5px rgba(0,0,0,0.1);font-family: Helvetica, sans-serif;border-radius: 10px;opacity: 0.95;text-align: center;transform: translate3d(0,0,0); /* Workaround for Safari https://stackoverflow.com/questions/50224855/not-respecting-z-index-on-safari-with-position-sticky */}.fl-scrolly-section .fl-scrolly-step a {color: inherit;}"),
    document.body.appendChild(t);
}
function init() {
  initLinks(), initStories(), initIntersection(), initStyles();
}
var last_link_per_story = {};
init();
