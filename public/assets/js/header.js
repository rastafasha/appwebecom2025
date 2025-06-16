$(document).ready(function() {


    $(window).scroll(function() {
        if ($(this).scrollTop() > 0) {
            $('.header').addClass('header2');
        } else {
            $('.header').removeClass('header2');
        }
    });

    $(window).scroll(function() {
        if ($(this).width() < 700) {
            $('header').addClass('header4');
            $('header').removeClass('header2');
        }
    });
});