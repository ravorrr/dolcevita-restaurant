'use strict';

$(function(){
    $('header a').on('click', function(e){
        e.preventDefault();

        const goToSection = $(this).attr('href');
        // console.log(goToSection);

        $('html, body').animate({
            scrollTop: $(goToSection).offset().top
        }, 800)

        console.log($(goToSection).offset().top);
    });
});