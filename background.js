chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({
    code:"window.location.href='https://mail.google.com/mail/u/0/#inbox?compose=new';"
  });
});

// chrome.tabs.executeScript(tab.id, {
//   code: "document.body.appendChild(document.createElement('script')).src = 'https://cdn.ckeditor.com/ckeditor5/34.1.0/classic/ckeditor.js';",
// });
