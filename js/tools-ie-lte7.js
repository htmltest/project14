(function($) {

    $(document).ready(function() {
        $('.top ul').append('<span class="after"></span>');

        $('.header-menu ul').append('<span class="after"></span>');
        $('.header-menu ul li a span').append('<sup class="before"></sup><sup class="after"></sup>');

        $('.footer-menu ul').append('<span class="after"></span>');
    });

})(jQuery);