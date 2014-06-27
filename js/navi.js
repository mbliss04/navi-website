$(document).ready(function(){

    menu_buttons = $('.button-menu a');
    menu_icons = $('.button-menu .button-icon');
    menu_text = $('.button-menu .button-text');
    nav_bottom = $('.main-menu').height();
    feature_icons = $('.feature-icon');
    discover_section = $('#discover').offset().top;

    $('#app').waypoint(function(direction) {
        if (direction == 'down') {
            menu_icons.animate({opacity:0}, 400);
            menu_text.animate({opacity:0}, 200);
            menu_buttons.animate({height:30}, 400, function(){
                menu_icons.addClass('no-display');
            });
            menu_text.animate({opacity:1}, 800);
        }
        else {
            menu_icons.removeClass('no-display');
            menu_buttons.animate({height:150}, 400);
            menu_icons.animate({opacity:1}, 400);
        }
    }, { offset: nav_bottom });

    /* set the sections to be window height */

    function resizeSections() {
        $('section').css('height', screen.height);
    }

    resizeSections();

    $(window).resize(function(){
        resizeSections()
    });

    /* animate the feature icons */

    $(window).bind('scroll',function(e){
        parallaxScroll();
    });

    function parallaxScroll(){
        var scrolled = $(window).scrollTop();
        $('#app').css('top', (0-(scrolled*.25))+'px');
        $('#iphone-app').css('top', (0-(scrolled*.75))+'px');
        $('#disc-icons').css('top', (0-(scrolled*.75)) +'px');
        $('#parallax-bg2').css('top',(0-(scrolled*.5))+'px');
        $('#discover').css('top', (0-(scrolled*.25))+'px');
    }

    /* On scroll functionality */

    $(window).scroll(function(){
        updateArrow();
    });

    /* Change the arrow picture based on scroll location */
    function updateArrow() {
        up_arrow = $('.arrow .arrow-up');
        down_arrow = $('.arrow .arrow-down');
        if ($(window).scrollTop() + $(window).height() > 
            $(document).height() - $(window).height() &&
            up_arrow.hasClass('hidden')) {
            down_arrow.addClass('hidden');
            up_arrow.removeClass('hidden');
        }
        else if (down_arrow.hasClass('hidden')) {
            down_arrow.removeClass('hidden');
            up_arrow.addClass('hidden');
        }
    }


    /* scrolling functionality */

    $("a[href='#home']").click(function() {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    }); 

    $(".button-menu a").each(function(){
        link = "a[href='" + $(this).attr('href') + "']";
        $(link).click(function() {
            $("html, body").animate({ scrollTop: $($(this).attr('href')).offset().top - 95}, "slow");
            return false;
        });
    });

    /* Arrow hover & click event handlers */

    $('.arrow').hover(function() {
        $(this).animate({
            opacity: 0.15,
            bottom: "+=7",
          }, 500);
    }, function() {
        $(this).animate({
            opacity: 0.3,
            bottom: "-=7",
          }, 500);
    });

    $('.arrow').click(function() {
        var nextSection = $(this).next("section");
        $("html, body").animate({ scrollTop: nextSection.offset().top}, "slow");
        return false;
    });

});