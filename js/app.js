$( document ).ready(function() {
 
    var navHeight = 215;
    var condensedHeight = 95;
    var featureTrigger = 400;

    // Navbar module
    var navbar = (function() {

        var el = $('nav');
        var currentSection = '#home';
 
        scrollToSection = function(section) {
            section = '#' + section;
            currentSection = section;
            $("html, body").animate({scrollTop: $(currentSection).offset().top - condensedHeight}, "slow");
        },

        scrollToHome = function() {
            this.scrollToSection('home');
        }

        toggleNav = function(options) {
            (options.style == 'condensed') ? condenseNav() : expandNav();
        },

        condenseNav = function() {
            el.addClass('condensed');
        },

        expandNav = function() {
            el.removeClass('condensed');
        }, 

        getCurrentSection = function() {
            return currentSection;
        }, 

        setCurrentSection = function(cur_section) {
            currentSection = cur_section;
            return true;
        }
 
        return {
            scrollToSection: scrollToSection,
            scrollToHome: scrollToHome,
            toggleNav: toggleNav, 
            getCurrentSection: getCurrentSection, 
            setCurrentSection: setCurrentSection
        };
 
    })();

    $("a[href='#home']").on('click', function(e){
        navbar.scrollToHome();
        e.preventDefault();
    });

    $('nav li').on('click', function(e){
        navbar.scrollToSection(this.className);
        e.preventDefault();
    });

    // show or hide nav bar based on waypoint
    $('#app').waypoint(function(direction) {
        (direction == 'down') ? navbar.toggleNav({ style : 'condensed' }) 
                              : navbar.toggleNav({ style : 'expanded' });
    }, { offset: navHeight });

    // Video show and hide on click
    var video = $('#discover-video');
    $('#js-show-video').click(function(){
        video.removeClass('hidden').fadeIn(500);
        $('#bgvid').get(0).pause();
    });
    video.click(function(){
        video.fadeOut(500);
        $('#bgvid').get(0).play();
        setTimeout(function(){
          video.addClass('hidden')
        }, 3000);
    });

    // Features Icon module
    var features = (function() {
        var $el = $('#features-animated');
        var tagName = 'li';
        var $featureDescription = $('.feature-desc-wrapper');
        var description = {
            "weather" : { "txt" : "Takes into account whether there is sun, rain, or shine so you can make the most of your day."}, 
            "time" : { "txt" : "Gives appropriate suggestions for whatever time of day: morning, afternoon, or those wee hours of the night."},
            "location" : { "txt" : "No matter where you are or where you want to go, Navi will let you know what's around."}, 
            "mood" : { "txt" : "Feeling inspired? Different moods call for different activities."}, 
            "price" : { "txt" : "Let your wallet be as big as you want with customizable price options for activities."},
            "occasion" : { "txt" : "Celebrating something? Navi knows the events that will make the most sense with what you have in mind."}
        };

        initializeFeatures = function() {
            $el.find(tagName).animate({
                'margin-top':'0', 
                'opacity': '1'
            }, 1000, function(){
                $el.addClass('showing');
            });
        }, 

        toggleFeatureDescription = function(feature, show) {
            if (show) {
                feature = $(feature).find('label').text().toLowerCase();
                $featureDescription.find('#feature-description').html(description[feature].txt);
                $featureDescription.fadeIn();
            } else {
                $featureDescription.fadeOut();
            }
        },

        isShowing = function() {
            return $el.hasClass('showing') ? true : false;
        }

        return {
            initializeFeatures: initializeFeatures, 
            toggleFeatureDescription: toggleFeatureDescription,
            isShowing: isShowing, 
            getCurrentSection: getCurrentSection
        };

    })();

    // show features once reach discover section of the page
    // $('#discover').waypoint(function() {
    //     if (features.isShowing() == false) {
    //         features.initializeFeatures();
    //     }
    // }, { offset: featureTrigger });
 
    // $('#features-animated li').mouseover(function(){
    //     features.toggleFeatureDescription(this, "show");
    //     console.log('showing: ' + this.className)
    // }).mouseout(function(){
    //     console.log('hiding: ' + this.className)
    //     features.toggleFeatureDescription(this);
    // });

    var arrow = (function(navbar){
        var $el = $('footer .arrow');

        toggleArrow = function() {
            if ($el.hasClass('arrow-down')) {
                $el.removeClass('arrow-down');
                $el.addClass('arrow-up');
            } else {
                $el.removeClass('arrow-up');
                $el.addClass('arrow-down');                
            }
        }, 

        navigateToSection = function(navbar) {
            if ($el.hasClass('arrow-up')) {
                $("html, body").animate({ scrollTop: 0 }, "slow");
                navbar.setCurrentSection('#home');
            }
            else {
                var cur_section = navbar.getCurrentSection();
                var next_section = $(cur_section).next('section').attr('id');
                navbar.scrollToSection(next_section);
            }
        }

        return {
            toggleArrow: toggleArrow,
            navigateToSection: navigateToSection
        }
    })();

    // Once reaches the last page, switch the arrow direction
    $('#contact').waypoint(function() {
        arrow.toggleArrow();
    }, { offset: navHeight });

    $('.arrow').click(function(){
        navigateToSection(navbar);
    });

    // Post the signup form user email
    $('#signup-form').submit(function(e){
        var that = this;
        var emailval = document.getElementById('signup-email');
        var data = {email: emailval.value};
        $.post("signup.php", data, function(response){
            console.log(response);
            showSuccess(that);
        });
        e.preventDefault();
    });

    // Submit the form after submitting a contact request
    $('#contact-form').submit(function(e){
        var that = this;
        $.post("contact.php", $(that).serialize()).done(function(data){
            $(that).append("<span class='signup-success'>Thank you! We'll get back to you asap!</span>");
        });
        e.preventDefault();
    });

    // Submit the email after someone hits enter
    function showSuccess(that) {
        $('#signup-email').val("");
        var $signup = $(that).find('.signup-success');
        if ($signup.length) {
            $signup.fadeIn();
        } else {
            $(that).append("<span class='signup-success'>Thank you! You'll be added to the list.</span>");
            $signup = $(that).find('.signup-success');
        }
        setTimeout(function(){
            $signup.fadeOut();
        }, 1500);
    }
 
});