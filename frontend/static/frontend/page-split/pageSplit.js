var leftPane = document.querySelector(".left-pane");
var rightPane = document.querySelector(".right-pane"); 
var paneSep = document.querySelector(".panes-separator");

// The script below constrains the target to move horizontally between a left and a right virtual boundaries.
// - the left limit is positioned at 10% of the screen width
// - the right limit is positioned at 90% of the screen width
var leftLimit = 25;
var rightLimit = 75;

paneSep.sdrag(
    function (el, pageX, startX, pageY, startY, fix) {
        fix.skipX = true;
    
        if (pageX < window.innerWidth * leftLimit / 100) {
            pageX = window.innerWidth * leftLimit / 100;
            fix.pageX = pageX;
        }
        if (pageX > window.innerWidth * rightLimit / 100) {
            pageX = window.innerWidth * rightLimit / 100;
            fix.pageX = pageX;
        }
    
        var cur = pageX / window.innerWidth * 100;
        if (cur < 0) {
            cur = 0;
        }
        if (cur > window.innerWidth) {
            cur = window.innerWidth;
        }
    
        var right = (100-cur-2);
        leftPane.style.width = cur + '%';
        rightPane.style.width = right + '%';
    
    }, null, 'horizontal');