$(document).ready(function(){

    menu_buttons = $('.button-menu a');
    menu_icons = $('.button-menu .button-icon');
    menu_text = $('.button-menu .button-text');
    nav_bottom = $('.main-menu').height();
    feature_icons = $('.feature-icon');
    discover_section = $('#discover').offset().top;
    sections = $('.page-section');
    section_index = 0;

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

    /* animate feature section */

    $('#discover').waypoint(function() {
        animateFeatureIcon(feature_icons);
    }, { offset: nav_bottom });    

    function animateFeatureIcon(icon) {
        icon.animate({
            'margin-top':'30px', 
            'opacity': '1'
        }, 1000, function(){
            if (icon.id != 'occasion-icon') {
                animateFeatureIcon(icon.next('.feature_icon'));
            }
        });
    }

    feature_icons.hover(function() {
        $(this).animate({
            'margin-top': "+=20",
          }, 500);
    }, function() {
        $(this).animate({
            'margin-top': "-=20",
          }, 500);
    });

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

    /* Bind scrolling functionality */

    $("a[href='#home']").click(function() {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    }); 

    $(".button-menu a").each(function(){
        link = "a[href='" + $(this).attr('href') + "']";
        $(link).click(function() {
            $("html, body").animate({ scrollTop: $($(this).attr('href')).offset().top - 95}, "slow");
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
        section_index = (section_index + 1) % sections.length;
        var nextSectionTop = sections.eq(section_index).offset().top - 95;
        $("html, body").animate({ scrollTop: nextSectionTop}, "slow");
        return false;
    });

    /* form submit */

    $(document).on('submit', '.email-form', function(e) {
         $.ajax({
            url: $(this).attr('action'),
            type: $(this).attr('method'),
            data: $(this).serialize(),
            success: function(html) {
                // show success message
                $(".email-form").fadeOut();
                $('#email-success').fadeIn();
            }
        });
        e.preventDefault();
    });

});