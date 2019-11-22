$(document).ready(function() {

  $('.new-form__text input').focus(function(){
    $(this).next("label").addClass('focus');
  });

  $('.menu-content-item').each(function(){

    $(this).click(function(){
      $('.menu-content-item').removeClass('active');
      $(this).addClass('active');

      if($(this).hasClass('home')){
        $('.canvas .meetings').show();
        $('.canvas .new').hide();
        $('.new-form__text input').each(function(){
          $(this).next("label").removeClass('focus');
        });
      }else if($(this).hasClass('new')){
        $('.canvas .new').show();
        $('.canvas .meetings').hide();
      }

    });
  });
});

