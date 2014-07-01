(function () {
  window.onbeforeunload = function () {
    var isMusicRunning = document.querySelector('[data-id=play-pause]').getAttribute('title') == 'Pause',
      leaveMessage = 'Hey, you\'re playing music.';

    chrome.runtime.sendMessage({type: 'beforeunload'});

    if (isMusicRunning) {
      chrome.runtime.sendMessage({type: 'prompted'});
    }

    return isMusicRunning ? leaveMessage : null;
  };
})();
