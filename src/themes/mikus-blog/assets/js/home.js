function scrollToContent() {
  document.getElementById('content').scrollIntoView({
    behavior: 'smooth'
  });
}

window.scrollToContent = scrollToContent;
