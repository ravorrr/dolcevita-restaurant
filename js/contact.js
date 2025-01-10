'use strict';

$(function(){
    $('form').on('submit', (e) => {
        e.preventDefault();
        
        const mail = $('#mail').val();
        const subject = $('#subject').val();
        const message = $('#message').val();
        const captchaG = grecaptcha.getResponse();

        $.ajax({
            type: $('form').attr('method'),
            url: $('form').attr('action'),
            data: {
                mail,
                subject,
                message,
                captchaG
            },
            success: (response) => {

                const lab1 = $('label:eq(0)');
                const lab2 = $('label:eq(1)');
                const lab3 = $('label:eq(2)');
                const lab4 = $('label:eq(3)');

                $('label').removeClass('alert-danger');

                // $('label').removeClass();
                // $('label').addClass('form__label');

                lab1.html('Podaj Twój e-mail');
                lab2.html('Podaj Temat wiadomości');
                lab3.html('Podaj Treść wiadomości');
                lab4.html('');
                
                if('success' in response) {
                    $('.col span').addClass('alert-ok').html(response.success).fadeIn(500).delay(4000).fadeOut(500);
                    $('input, textarea').val('');
                } else { 
                    if('mail' in response) {
                        lab1.hide().addClass('alert-danger').fadeIn(500).html(response.mail);
                    }
                    if('subject' in response) {
                        lab2.hide().addClass('alert-danger').fadeIn(500).html(response.subject);
                    }
                    if('message' in response) {
                        lab3.hide().addClass('alert-danger').fadeIn(500).html(response.message);
                    }
                    if('captcha' in response) {
                        lab4.hide().addClass('alert-danger').fadeIn(500).html(response.captcha);
                    }
                }
            }
        });
    });
});