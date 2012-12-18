(function() {
    window.onbeforeunload = function() {
        var isMusicRunning =  document.querySelector('#playPause').getAttribute('aria-pressed') === "true",
            leaveMessage = 'Hey, you\'re playing music.'

        return isMusicRunning ? leaveMessage : null;
    }
})()
