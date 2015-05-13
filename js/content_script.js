(function () {
  window.onbeforeunload = function () {
    var isMusicRunning = document.querySelector('[data-id=play-pause]').classList.contains('playing'),
      leaveMessage = 'Hey, you\'re playing music.';

    chrome.runtime.sendMessage({type: 'beforeunload'});

    if (isMusicRunning) {
      chrome.runtime.sendMessage({type: 'prompted'});

      // small hack to detect when users abort unload after the prompt
      // the execution is delayed, so it should not be fired if the user leaves the page after the prompt
      // but it should be fired, if the user stays on the page
      window.setTimeout(function () {
        chrome.runtime.sendMessage({type: 'stayed'});
      }, 1500);
    }

    return isMusicRunning ? leaveMessage : null;
  };
})();
