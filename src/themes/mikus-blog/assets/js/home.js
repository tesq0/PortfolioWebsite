let showStart = true;
let showFooter = false;

function throttle(cb, time) {
  let waiting = false;
  return function () {
    if (!waiting) {
      cb.apply(this, arguments);
      waiting = true;
      setTimeout(
        () => waiting = false,
        time
      );
    }
  };
}

function scrollToContent() {
  document.getElementById('content').scrollIntoView({
    behavior: 'smooth'
  });
}

function onScroll(event) {
  var el = event.target.scrollingElement;
  if ((el.scrollTop - (window.innerHeight / 2)) > (window.innerHeight)) {
    if (showFooter == false) {
      showStart = false;
      showFooter = true;
    }
  }
  else {
    if (showFooter == true) {
      showStart = true;
      showFooter = false;
    }
  }

  document.getElementById('start').style.display = showStart ? null : "none";
  document.getElementById('footer').style.display = showFooter ? null : "none";

}

window.scrollToContent = scrollToContent;
document.addEventListener("scroll", throttle(onScroll, 300));
document.onload = onScroll;
