//= require lib/chosen
//= require lib/spin
//= require lib/jquery.spin
// = require lib/swiper
// $.extend(jQuery.validator.messages, {
//     required: "*"
// });
// $.validator.setDefaults({ ignore: ":hidden:not(select)" })

"use strict";
$(function() {
  $("#hidden_1").slideUp();
    $("#open1").click(function(){

        $("#hidden_1").slideToggle();
        $(this).toggleClass('open1');
    });

  $('.banner-card').on('click', function(e){
    e.stopPropagation();
  })

  $('.share-open div').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
  })
  $('.banner-share').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
  })


  var resizeTimeout,
  isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
  $window = $(window),
  $spinerHolder = $('.spiner-holder');

  var $show = $('.show-button');

  function display(){
    $('.close').next('.item__program-holder').slideUp('0.1');
    $(document).on('click', '.close', function(){
      $(this).addClass('open').next('.item__program-holder').slideDown('fast');
      $(this).removeClass('close');
    });

    $(document).on('click', '.open', function(){
      $(this).addClass('close').next('.item__program-holder').slideUp('fast');
      $(this).removeClass('open');
    })
  }
  display();

  $('.js__select').chosen({
    disable_search: true
  });


  resizeChosen();
  jQuery(window).on('resize', resizeChosen);


  var $linkScroll = $('.nav_anim_link');
  $linkScroll.on('click', function(e) {
    var offset = $($(this).attr('href')).offset().top - 90;
    e.preventDefault();
    $('html, body').stop().animate({
      scrollTop: offset
    }, 700)
  })



    $spinerHolder.slideUp();

  var spinnerOpts = {
      lines: 17, // The number of lines to draw
      length: 0, // The length of each line
      width: 9, // The line thickness
      radius: 84, // The radius of the inner circle
      scale: 0.50, // Scales overall size of the spinner
      corners: 1, // Corner roundness (0..1)
      color: '#000', // #rgb or #rrggbb or array of colors
      opacity: 0.25, // Opacity of the lines
      rotate: 0, // The rotation offset
      direction: 1, // 1: clockwise, -1: counterclockwise
      speed: 1, // Rounds per second
      trail: 30, // Afterglow percentage
      fps: 20, // Frames per second when using setTimeout() as a fallback for CSS
      zIndex: 2e9, // The z-index (defaults to 2000000000)
      className: 'spinner', // The CSS class to assign to the spinner
      top: '50%', // Top position relative to parent
      left: '50%', // Left position relative to parent
      shadow: false, // Whether to render a shadow
      hwaccel: false, // Whether to use hardware acceleration
      position: 'absolute' // Element positioning
    },
    spinner;

  function resizeChosen() {
    $(".chosen-container").each(function() {
      $(this).attr('style', 'width: 100%');
    });
  }

  var $popUP = $('.popUp'),
      $popUpForm = $('.pop-up-holder'),
      $form = $popUpForm.find('.popup-container'),
      $formAjax = $('#ajaxform'),
      $ok = $('.__ok'),
      $error = $('.__error'),
      $close__popUp = $('.close__popUp'),
      $PPH = $('.pop-up-holder');

  $formAjax.slideUp();

  $close__popUp.on('click', function(e) {
    $PPH.slideUp();
  });

  $popUP.on('click', function(e) {

    $('.__ok, .__error').addClass('hide');
    $('.popup-container').removeClass('ok-popUp error-popUp');

    if ($(this).data('class')) {
      $('.design').addClass("not-select");
      $('.comm').addClass("not-select");
    }

    $($(this).data('class')).removeClass("not-select");
    $(".js__select").trigger("chosen:updated");
    $PPH.slideDown();
    $formAjax.slideDown();



    $formAjax.find('select').val($($formAjax.find('option').not('.not-select')[0]).attr('value')).trigger('chosen:updated');

    $popUpForm.on('click', function(e) {
      if (!$form.is(e.target) && $form.has(e.target).length === 0) {
        $PPH.slideUp();
      }
    });
  });



  $formAjax.submit(function(e){
    e.preventDefault();
    $formAjax.slideDown();


    var formdata = $(this).serialize(),
        url = $(this).prop('action');


    var a = $('.popup-container').height()
    $spinerHolder.height(a);
    $spinerHolder.spin(spinnerOpts);
    $spinerHolder.slideDown("100");

    $.ajax({
      url: url,
      data: formdata,
      type: 'post',
      success: function(respond){
        $('.popup-container').addClass('ok-popUp');

        setTimeout(function () {$formAjax.slideUp()}, 200);
        $ok.removeClass('hide');
        $('.cancel-ok').on('click', function(e) {
          e.preventDefault();
          $PPH.slideUp();
        });
        $spinerHolder.spin(false);
        $spinerHolder.slideUp("100");
      },
      error: function(){
        $('.popup-container').addClass('error-popUp');
        setTimeout(function () {$formAjax.slideUp()}, 200);
        $error.removeClass('hide');
        $('.cancel').on('click', function(e) {
          e.preventDefault();
          $PPH.slideUp();
        });
        $spinerHolder.spin(false);
        $spinerHolder.slideUp("100");
      }
    });
  });

  $('.hse-menu-list-title-action').on('click', function(e){
    e.preventDefault();
    var $myList = $(this).parent().find('.hse-menu-list'),
    $cover = $('.hse-menu-cover');
    


    var stopFunc = false,
        getTimeout = false;
    if ($(this).hasClass('active')){
      stopFunc = true;
    }

    if ($(this).parent().parent().find('.hse-menu-list.active').length){
      getTimeout = true;
      $('.hse-menu-list').removeClass('show-item');
      $('.hse-menu-list-title-action').removeClass('active');
 
      setTimeout(function () {

        $cover.stop().animate({'height': 0}, 200, function(){
          $('.hse-menu-list').removeClass('active');
          $cover.stop().removeClass('active');


        })

      }, 200);
    }

    if (stopFunc) {
      return;
    }

    var elem = this;
    var openFunc = function(elem) {

      $(elem).addClass('active')
    

      $myList.addClass('active');
      var $myListHeight = $myList.height();
      
      $cover.stop().addClass('active').animate({'height': $myListHeight + 40}, 200, function(){
        $myList.addClass('show-item');
      })

    } 


    if (getTimeout) {
      setTimeout(function () { openFunc(elem) }, 200);

    }
    else {
      openFunc(elem)
    }



  })
  var $coverHseMenuWhite = $('.hse-menu-cover')
  $window.resize(function(){
    var heightListHseMenuWhite = $('.hse-menu-list.show-item').height()
    if ($('.hse-menu-list').is('.show-item')){
      $coverHseMenuWhite.height(heightListHseMenuWhite+30);
    }
    
  });

    var $socIcons = $('.soc-icons'),
  swiper1 = new Swiper('.swiper-1', {
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    slidesPerView: 1,
    paginationClickable: true,
    spaceBetween: 0,
    loop: true,
    autoplay: false,
    speed: 800
  })


  $socIcons.click(function( event ) {
    event.preventDefault();
  });






  var $quoteItems = $('.qu-slider').find('.quote')
  var $quoteMainItems = $('.qu-main-slider').find('.quote')

  var maxHeightQuoteItems = Math.max.apply(null, $quoteItems.map(function () {
        return $(this).height();
    }).get());

  var maxHeightQuoteMainItems = Math.max.apply(null, $quoteMainItems.map(function () {
        return $(this).height();
    }).get());

  $quoteItems.each(function(){
    $(this).css('height', maxHeightQuoteItems);
  })
   $quoteMainItems.each(function(){
    $(this).css('height', maxHeightQuoteMainItems);
   })





  $('.th-slider').height($('.th-slider').width()/(1440/760));
  $('.ss-slider').height($('.ss-slider').width()/(1200/500));
  $('.swiper-navi').height($('.ss-slider').width()/(1200/500));


  $window.resize(function(){


    $('.th-slider').height($('.th-slider').width()/(1440/760));
    $('.ss-slider').height($('.ss-slider').width()/(1200/500));
    $('.swiper-navi').height($('.ss-slider').width()/(1200/500));
    
    maxHeightQuoteItems = Math.max.apply(null, $quoteItems.map(function () {
        return $(this).height();
    }).get());
    
    maxHeightQuoteMainItems = Math.max.apply(null, $quoteMainItems.map(function () {
        return $(this).height();
    }).get());


    $quoteItems.each(function(){
      $(this).css('height', maxHeightQuoteItems);
    })

    $quoteMainItems.each(function(){
      $(this).css('height', maxHeightQuoteMainItems);
    })


  });








  var $teacherSlider = $('.th-slider'),
      $quoteSlider = $('.qu-slider'),
      $studentSlider = $('.ss-slider'),
      $quoteMainSlider = $('.qu-main-slider');

  var mySwiper3 = new Swiper ($teacherSlider, {
    loop: true,
    lazyLoading: true,
    simulateTouch: false,
    nextButton: $teacherSlider.find('.swiper-button-next')
  });

  var mySwiper5 = new Swiper ($studentSlider, {
    loop: true,
    lazyLoading: true,
    simulateTouch: false,
    nextButton: $('.swiper-ss-button-next'),
    prevButton: $('.swiper-ss-button-prev')

  });

var mySwiper4 = new Swiper ($quoteSlider, {
    loop: true,
    lazyLoading: true,
    simulateTouch: false,
    effect: 'fade',
    fade: {
      crossFade: false
    },
    nextButton: $('.swiper-ss-button-next'),
    prevButton: $('.swiper-ss-button-prev')
  });


var mySwiper6 = new Swiper ($quoteMainSlider, {
    loop: true,
    lazyLoading: true,
    simulateTouch: false,
    effect: 'fade',
    fade: {
      crossFade: false
    },
    nextButton: $teacherSlider.find('.swiper-button-next')
  });
    
  if (mySwiper3.slides.length < 4) {
    $teacherSlider.find('.swiper-button-next').css('opacity', 0);
  }


    $frame = $('.frame');
  function frame(){
    if ($(window).width() > 1446) {
      $frame.each(function(){
        var $frame = $(this),
            parentWidth = $frame.parent().width();

        $frame.css({
          'width' : parentWidth + 'px',
          'height' : parseInt(parentWidth)/16*9 + 'px'
        })


      });
    }
    else if ($(window).width() < 1446 && $(window).width() > 1200) {
        $frame.each(function(){
        var $frame = $(this),
            parentWidth = $frame.parent().width();

        $frame.css({
          'width' : parentWidth + 'px',
          'height' : parseInt(parentWidth)/10*16 + 'px'
        })


      });
      }
    else if ($(window).width() < 1200  && $(window).width() > 992) {
        $frame.each(function(){
        var $frame = $(this),
            parentWidth = $frame.parent().width();
        $frame.css({
          'width' : parentWidth + 'px',
          'height' : parseInt(parentWidth)/10*21 + 'px'
        })


      });
      }
      else if ($(window).width() < 992) {
        $frame.each(function(){
        var $frame = $(this),
            parentWidth = $frame.parent().width();

        $frame.css({
          'width' : parentWidth + 'px',
          'height' : parseInt(parentWidth) + 'px'
        })


      });
      }
  }

  frame();

  $(window).resize(function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout( frame(), display(), 500);
  });







});

