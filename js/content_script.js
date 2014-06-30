(function() {
    window.onbeforeunload = function() {
        var isMusicRunning =  document.querySelector('[data-id=play-pause]').getAttribute('title') == 'Pause',
            leaveMessage = 'Hey, you\'re playing music.'

        return isMusicRunning ? leaveMessage : null;
    }
})()
