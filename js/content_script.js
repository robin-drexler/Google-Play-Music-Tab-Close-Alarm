(function () {

  var THRESHOLD_MS = 2500;
  // if a user was on the page for the while and decides to close it
  // we now assume, that it was not by accident, so we do not prompt anymore
  var notPromptingThresholdReached = false;
  var thresholdTimer;


  function handleVisibilityChange(event) {
    if (document.webkitHidden) {
      notPromptingThresholdReached = false;
      window.clearTimeout(thresholdTimer);
    } else {
      thresholdTimer = window.setTimeout(function() {
        notPromptingThresholdReached = true;
      }, THRESHOLD_MS)
    }
  }

  document.addEventListener("webkitvisibilitychange", handleVisibilityChange);
  handleVisibilityChange()

  window.onbeforeunload = function () {
    var isMusicRunning = document.querySelector('[data-id=play-pause]').getAttribute('title') == 'Pause',
      leaveMessage = 'Hey, you\'re playing music.';

    chrome.runtime.sendMessage({type: 'beforeunload'});


    if (isMusicRunning) {
        if (notPromptingThresholdReached) {
          chrome.runtime.sendMessage({type: 'threshold-reached'});
          return null;
        }
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
