var speedSlider     = 1000; // скорость смены слайда на главной странице
var periodSlider    = 3000; // период автоматической смены слайда на главной странице (0 - автоматическая смена отключена)

var timerSlider     = null;

(function($) {

    $(document).ready(function() {

        // слайдер на главной странице
        $('.slider-content').each(function() {
            var curSlider = $(this);
            if (curSlider.find('li').length > 1) {
                curSlider.data('curIndex', 0);
                curSlider.data('disableAnimate', false);

                var newHTML = '<ul>';
                var i = 1;
                curSlider.find('li').each(function() {
                    newHTML += '<li><a href="#">' + i + '</a></li>';
                    i++;
                });
                newHTML += '</ul>';
                $('.slider-ctrl').html(newHTML);
                $('.slider-ctrl li:first').addClass('active');

                $('.slider-ctrl a').click(function() {
                    var curSlider = $('.slider-content');
                    if (!curSlider.data('disableAnimate')) {
                        window.clearTimeout(timerSlider);
                        timerSlider = null;

                        curSlider.data('disableAnimate', true);

                        var curIndex = curSlider.data('curIndex');
                        var newIndex = $('.slider-ctrl a').index($(this));

                        $('.slider-ctrl li.active').removeClass('active');
                        $('.slider-ctrl li').eq(newIndex).addClass('active');

                        curSlider.find('li').eq(curIndex).fadeOut(speedSlider / 2, function() {
                            curSlider.find('li').eq(newIndex).fadeIn(speedSlider / 2, function() {
                                curSlider.data('curIndex', newIndex);
                                curSlider.data('disableAnimate', false);
                                if (periodSlider > 0) {
                                    timerSlider = window.setTimeout(sliderNext, periodSlider);
                                }
                            });
                        });
                    }
                    return false;
                });

                if (periodSlider > 0) {
                    timerSlider = window.setTimeout(sliderNext, periodSlider);
                }
            }
        });

        // года на главной
        $('.main-company-year-item').mouseover(function() {
            if ($(this).find('div:visible').length == 0) {
                $('.main-company-info-item').stop(true, true);
                $('.main-company-year-item div').stop(true, true);
                $('.main-company-year-item div:visible').fadeOut();
                $(this).find('div').fadeIn();
                var curIndex = $('.main-company-year-item').index($(this));
                $('.main-company-info-item:visible').fadeOut(function() {
                    $('.main-company-info-item').eq(curIndex).fadeIn();
                });
            }
        });

        $('.resume-link').click(function() {
            $('.overlay').show();
            $('#window-resume').show();
            $('#window-resume').css({'margin-top': -$('#window-resume').height() / 2});
            return false;
        });

        $('.overlay').click(function() {
            $('.window').hide();
            $('.overlay').hide();
        });

        $('body').bind('keypress keydown', function(e) {
            if (e.keyCode == 27) {
                $('.window').hide();
                $('.overlay').hide();
            }
        });

        $('.window-resume-file-input input').change(function() {
            $(this).parent().parent().find('.window-resume-file-hint').hide();
            $(this).parent().parent().find('.window-resume-file-name').html($(this).val());
            $(this).parent().parent().find('.window-resume-file-name').show();
        });

    });

    $(window).load(function() {
        // каталог на главной странице
        $('.main-catalogue').each(function() {
            var curMax  = 0;
            var curMax2 = 0;
            $('.main-catalogue-text').each(function() {
                if (curMax < $(this).height()) {
                    curMax = $(this).height();
                }
            });
            $('.main-catalogue-data').each(function() {
                if (curMax2 < $(this).height()) {
                    curMax2 = $(this).height();
                }
            });
            $('.main-catalogue-text').height(curMax);
            $('.main-catalogue-data').height(curMax2);
        });
    });

    // переход к следующему слайду на главной странице
    function sliderNext() {
        var curSlider = $('.slider-content');
        if (!curSlider.data('disableAnimate')) {
            window.clearTimeout(timerSlider);
            timerSlider = null;

            curSlider.data('disableAnimate', true);

            var curIndex = curSlider.data('curIndex');
            var newIndex = curIndex + 1;
            if (newIndex == curSlider.find('li').length) {
                newIndex = 0;
            }

            $('.slider-ctrl li.active').removeClass('active');
            $('.slider-ctrl li').eq(newIndex).addClass('active');

            curSlider.find('li').eq(curIndex).fadeOut(speedSlider / 2, function() {
                curSlider.find('li').eq(newIndex).fadeIn(speedSlider / 2, function() {
                    curSlider.data('curIndex', newIndex);
                    curSlider.data('disableAnimate', false);
                    if (periodSlider > 0) {
                        timerSlider = window.setTimeout(sliderNext, periodSlider);
                    }
                });
            });
        }
    }

})(jQuery);