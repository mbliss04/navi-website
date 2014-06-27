$(document).ready({
        // update background gradient based on time of day
        day = new Date();
        time = day.getHours();
        if((time >= 22 && time < 24) || (time >= 0 && time < 4)) { // 10 PM to 4 AM
           //document.body.style.backgroundImage = "url(images/midnight.jpg)";
           document.write('<style type="text/css">body{background: white url(images/background/midnight.jpg) center;}"></style>')
        } else if(time >= 4 && time < 10) { // 4 AM to 10 AM
           //document.body.style.backgroundImage = "url(images/sunrise.jpg)";
           document.write('<style type="text/css">body{background: white url(images/background/sunrise.jpg) center;}</style>')
        } else if(time >= 10 && time < 13) { // 10 AM to 1 PM
           //document.body.style.backgroundImage = "url(images/morning.jpg)";
           document.write('<style type="text/css">body{background: white url(images/background/morn.jpg) top;}</style>')
        } else if (time >= 13 && time < 17) { // 1 PM to 5 PM
           //document.body.style.backgroundImage = "url(images/afternoon.jpg)";
           document.write('<style type="text/css">body{background: white url(images/background/afternoon.jpg) center;}</style>')
        } else if (time >= 17 && time < 22) { // 5 PM to 10 PM
           //document.body.style.backgroundImage = "url(images/sunset.jpg)";
           document.write('<style type="text/css">body{background: white url(images/background/sunset.jpg) center;}</style>')
        }
});