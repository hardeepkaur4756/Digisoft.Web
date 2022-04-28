


$(function () {
    var url = window.location.pathname,
        urlRegExp = new RegExp(url.replace(/\/$/, '') + "$"); // create regexp to match current url pathname and remove trailing slash if present as it could collide with the link in navigation in case trailing slash wasn't present there
    // now grab every link from the navigation
    var isActive = false;
    $('#navbarSupportedContent a').each(function () {
        // and test its normalized href against the url pathname regexp
        if (urlRegExp.test(this.href.replace(/\/$/, '')) && !isActive) {
            isActive = true;
            $(this).parent().addClass('active');
        }
    });
});

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}




$(document).ready(function () {
    var isFired = false;
    var isFiredTwo = false;

    $(window).scroll(function () {
        //region homepage counter
        if ($("#increase-number").length != 0) {
            var hT = $("#increase-number").offset().top,
                hH = $("#increase-number").outerHeight(),
                wH = $(window).height(),
                wS = $(this).scrollTop();
            if (wS > hT + hH - wH && !isFired) {
                isFired = true;
                (function ($) {
                    $.fn.countTo = function (options) {
                        options = options || {};

                        return $(this).each(function () {
                            // set options for current element
                            var settings = $.extend(
                                {},
                                $.fn.countTo.defaults,
                                {
                                    from: $(this).data("from"),
                                    to: $(this).data("to"),
                                    speed: $(this).data("speed"),
                                    refreshInterval: $(this).data("refresh-interval"),
                                    decimals: $(this).data("decimals"),
                                },
                                options
                            );

                            // how many times to update the value, and how much to increment the value on each update
                            var loops = Math.ceil(
                                settings.speed / settings.refreshInterval
                            ),
                                increment = (settings.to - settings.from) / loops;

                            // references & variables that will change with each update
                            var self = this,
                                $self = $(this),
                                loopCount = 0,
                                value = settings.from,
                                data = $self.data("countTo") || {};

                            $self.data("countTo", data);

                            // if an existing interval can be found, clear it first
                            if (data.interval) {
                                clearInterval(data.interval);
                            }
                            data.interval = setInterval(
                                updateTimer,
                                settings.refreshInterval
                            );

                            // initialize the element with the starting value
                            render(value);

                            function updateTimer() {
                                value += increment;
                                loopCount++;

                                render(value);

                                if (typeof settings.onUpdate == "function") {
                                    settings.onUpdate.call(self, value);
                                }

                                if (loopCount >= loops) {
                                    // remove the interval
                                    $self.removeData("countTo");
                                    clearInterval(data.interval);
                                    value = settings.to;

                                    if (typeof settings.onComplete == "function") {
                                        settings.onComplete.call(self, value);
                                    }
                                }
                            }

                            function render(value) {
                                var formattedValue = settings.formatter.call(
                                    self,
                                    value,
                                    settings
                                );
                                $self.html(formattedValue);
                            }
                        });
                    };

                    $.fn.countTo.defaults = {
                        from: 0, // the number the element should start at
                        to: 0, // the number the element should end at
                        speed: 1000, // how long it should take to count between the target numbers
                        refreshInterval: 100, // how often the element should be updated
                        decimals: 0, // the number of decimal places to show
                        formatter: formatter, // handler for formatting the value before rendering
                        onUpdate: null, // callback method for every time the element is updated
                        onComplete: null, // callback method for when the element finishes updating
                    };

                    function formatter(value, settings) {
                        return value.toFixed(settings.decimals);
                    }
                })(jQuery);

                jQuery(function ($) {
                    // custom formatting example
                    $(".count-number").data("countToOptions", {
                        formatter: function (value, options) {
                            return value
                                .toFixed(options.decimals)
                                .replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
                        },
                    });

                    // start all the timers
                    $(".timer").each(count);

                    function count(options) {
                        var $this = $(this);
                        options = $.extend(
                            {},
                            options || {},
                            $this.data("countToOptions") || {}
                        );
                        $this.countTo(options);
                    }
                });
            }
        }

        //endregion

        //#region back to top buttom
        if ($(this).scrollTop() > 100) {
            $('#scroll-top').fadeIn();
        } else {
            $('#scroll-top').fadeOut();
        }
        //#endregion


        if ($("#clients").length != 0) {
            //#region client section
            var hT = $('#clients').offset().top,
                hH = $('#clients').outerHeight(),
                wH = $(window).height(),
                wS = $(this).scrollTop();
            if (wS > (hT + hH - wH)) {
                var owl = $("#clients .owl-carousel");
                owl.owlCarousel({
                    loop: true, // for looping
                    responsiveClass: true,
                    autoplay: true,
                    autoplayTimeout: 4000,
                    nav: true, // for left right arrow show hide
                    smartSpeed: 700, // carousel smooth speed
                    dots: false,
                    responsive: {
                        0: {
                            items: 1,
                            dots: true,
                            nav: false,
                        },

                        767: {
                            items: 1,
                        },

                        991: {
                            items: 2,
                        },
                    },
                });
                $(".owl-prev").html('<i class="fa fa-angle-left"></i>');
                $(".owl-next").html('<i class="fa fa-angle-right"></i>');
            }
            //#endregion
        }

        if ($("#client-logo").length != 0) {

            //region client logo
            var hT = $('#client-logo').offset().top,
                hH = $('#client-logo').outerHeight(),
                wH = $(window).height(),
                wS = $(this).scrollTop();
            if (wS > (hT + hH - wH)) {
                var owl = $("#client-logo .owl-carousel");
                owl.owlCarousel({
                    loop: true, // for looping
                    responsiveClass: true,
                    autoplay: true,
                    autoplayTimeout: 2000,
                    margin: 30, // for right side margin
                    nav: false, // for left right arrow show hide
                    smartSpeed: 700, // carousel smooth speed
                    dots: false, // for show hide dots
                    responsive: {
                        0: {
                            items: 1,
                            nav: true,

                        },

                        767: {
                            items: 4,
                        },

                        991: {
                            items: 5,
                        },
                    },
                });
                $(".owl-prev").html('<i class="fa fa-angle-left"></i>');
                $(".owl-next").html('<i class="fa fa-angle-right"></i>');
            }

            //regionend

        }

        if ($("#team").length != 0) {
            //region team 
            var hT = $('#team').offset().top,
                hH = $('#team').outerHeight(),
                wH = $(window).height(),
                wS = $(this).scrollTop();
            if (wS > (hT + hH - wH)) {
                var owl = $("#team .owl-carousel");
                owl.owlCarousel({
                    loop: true, // for looping // for autoplay // for autoplay timeout
                    // for autoplay hover pause and play
                    responsiveClass: true,
                    autoplay: true,
                    autoplayTimeout: 2000,
                    margin: 10, // for right side margin
                    nav: false, // for left right arrow show hide
                    dots: true, // for show hide dots
                    smartSpeed: 700,
                    responsive: {
                        0: {
                            items: 1,

                        },

                        767: {
                            items: 3,
                        },

                        991: {
                            items: 4,
                        },
                    },
                });
                $(".owl-prev").html('<i class="fa fa-angle-left"></i>');
                $(".owl-next").html('<i class="fa fa-angle-right"></i>');
            }
            //regionend

        }

        if ($("#case-studies").length != 0) {
            //region case-studies
            var hT = $('#case-studies').offset().top,
                hH = $('#case-studies').outerHeight(),
                wH = $(window).height(),
                wS = $(this).scrollTop();
            if (wS > (hT + hH - wH)) {
                var owl = $("#case-studies .owl-carousel");
                owl.owlCarousel({
                    loop: true, // for looping
                    responsiveClass: true,
                    autoplay: true,
                    autoplayTimeout: 2000,
                    margin: 30, // for right side margin
                    nav: false, // for left right arrow show hide
                    smartSpeed: 700, // carousel smooth speed
                    dots: true, // for show hide dots
                    center: true, // center slider
                    responsive: {
                        0: {
                            items: 1,
                        },

                        767: {
                            items: 2,
                        },

                        991: {
                            items: 2,
                        },

                        1199: {
                            items: 3,
                        },
                    },
                });
                $(".owl-prev").html('<i class="fa fa-angle-left"></i>');
                $(".owl-next").html('<i class="fa fa-angle-right"></i>');
            }

            //endregion

        }

        if ($("#about-points").length != 0) {

            var hT = $("#about-points").offset().top,
                hH = $("#about-points").outerHeight(),
                wH = $(window).height(),
                wS = $(this).scrollTop();
            if (wS > hT + hH - wH && !isFiredTwo) {
                isFiredTwo = true;
                (function ($) {
                    $.fn.countTo = function (options) {
                        options = options || {};

                        return $(this).each(function () {
                            // set options for current element
                            var settings = $.extend(
                                {},
                                $.fn.countTo.defaults,
                                {
                                    from: $(this).data("from"),
                                    to: $(this).data("to"),
                                    speed: $(this).data("speed"),
                                    refreshInterval: $(this).data("refresh-interval"),
                                    decimals: $(this).data("decimals"),
                                },
                                options
                            );

                            // how many times to update the value, and how much to increment the value on each update
                            var loops = Math.ceil(
                                settings.speed / settings.refreshInterval
                            ),
                                increment = (settings.to - settings.from) / loops;

                            // references & variables that will change with each update
                            var self = this,
                                $self = $(this),
                                loopCount = 0,
                                value = settings.from,
                                data = $self.data("countTo") || {};

                            $self.data("countTo", data);

                            // if an existing interval can be found, clear it first
                            if (data.interval) {
                                clearInterval(data.interval);
                            }
                            data.interval = setInterval(
                                updateTimer,
                                settings.refreshInterval
                            );

                            // initialize the element with the starting value
                            render(value);

                            function updateTimer() {
                                value += increment;
                                loopCount++;

                                render(value);

                                if (typeof settings.onUpdate == "function") {
                                    settings.onUpdate.call(self, value);
                                }

                                if (loopCount >= loops) {
                                    // remove the interval
                                    $self.removeData("countTo");
                                    clearInterval(data.interval);
                                    value = settings.to;

                                    if (typeof settings.onComplete == "function") {
                                        settings.onComplete.call(self, value);
                                    }
                                }
                            }

                            function render(value) {
                                var formattedValue = settings.formatter.call(
                                    self,
                                    value,
                                    settings
                                );
                                $self.html(formattedValue);
                            }
                        });
                    };

                    $.fn.countTo.defaults = {
                        from: 0, // the number the element should start at
                        to: 0, // the number the element should end at
                        speed: 1000, // how long it should take to count between the target numbers
                        refreshInterval: 100, // how often the element should be updated
                        decimals: 0, // the number of decimal places to show
                        formatter: formatter, // handler for formatting the value before rendering
                        onUpdate: null, // callback method for every time the element is updated
                        onComplete: null, // callback method for when the element finishes updating
                    };

                    function formatter(value, settings) {
                        return value.toFixed(settings.decimals);
                    }
                })(jQuery);

                jQuery(function ($) {
                    // custom formatting example
                    $(".count-number").data("countToOptions", {
                        formatter: function (value, options) {
                            return value
                                .toFixed(options.decimals)
                                .replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
                        },
                    });

                    // start all the timers
                    $(".timer").each(count);

                    function count(options) {
                        var $this = $(this);
                        options = $.extend(
                            {},
                            options || {},
                            $this.data("countToOptions") || {}
                        );
                        $this.countTo(options);
                    }
                });
            }

        }
    });
});
