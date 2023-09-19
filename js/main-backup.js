

(function ($) {
    'use strict';
    var body = $('body');

    if ($('.has-matchHeight', body).length) {
        $('.has-matchHeight', body).matchHeight();
    }
    if ($('.dropdown-toggle', body).length) {
        $('.dropdown-toggle', body).dropdown();
    }
    $('.open-loss-password', body).click(function (ev) {
        ev.preventDefault();
        $('#st-login-form', body).modal('hide');
        $('#st-register-form', body).modal('hide');
        setTimeout(function () {
            $('#st-forgot-form', body).modal('show');
        }, 500);
    });

    $('.open-login', body).click(function (ev) {
        ev.preventDefault();
        $('#st-register-form', body).modal('hide');
        $('#st-forgot-form', body).modal('hide');
        setTimeout(function () {
            $('#st-login-form', body).modal('show');
        }, 500);
    });

    $('.open-signup', body).click(function (ev) {
        ev.preventDefault();
        $('#st-forgot-form', body).modal('hide');
        $('#st-login-form', body).modal('hide');
        setTimeout(function () {
            $('#st-register-form', body).modal('show');
        }, 500);
    });

    $('[data-toggle="tooltip"]').tooltip();

    $('.toggle-menu').click(function (ev) {
        ev.preventDefault();
        toggleBody($('#st-main-menu'));
        $('#st-main-menu').toggleClass('open');
    });
    $('.back-menu').click(function (ev) {
        ev.preventDefault();
        toggleBody($('#st-main-menu'));
        $('#st-main-menu').toggleClass('open');
    });

    function toggleBody(el) {
        if (el.hasClass('open')) {
            body.css({
                'overflow': ''
            });
        } else {
            body.css({
                'overflow': 'hidden'
            });
        }
    }

    $('#st-main-menu .main-menu .menu-item-has-children .fa').click(function () {
        if (window.matchMedia("(max-width: 991px)").matches) {
            $(this).toggleClass('fa-angle-down fa-angle-up');
            var parent = $(this).parent();
            $('>.menu-dropdown', parent).toggle();
            if ($(this).closest('.menu-item-has-children').hasClass('has-mega-menu')) {
                $('>.mega-menu', $(this).parent().parent()).toggle();
            }
        }
    });

    body.click(function (ev) {
        if ($(ev.target).is('#st-main-menu')) {
            toggleBody($(ev.target));
            $('#st-main-menu').toggleClass('open');
        }
    });

    $(window).on('resize', function () {
        if (window.matchMedia('(min-width: 992px)').matches) {
            $('.st-gallery', body).each(function () {
                var parent = $(this);
                var $fotoramaDiv = $('.fotorama', parent).fotorama({
                    width: parent.data('width'),
                    nav: parent.data('nav'),
                    thumbwidth: '135',
                    thumbheight: '135',
                    allowfullscreen: parent.data('allowfullscreen')
                });
                parent.data('fotorama', $fotoramaDiv.data('fotorama'));
            });
        } else {
            $('.st-gallery', body).each(function () {
                var parent = $(this);
                if (typeof parent.data('fotorama') !== 'undefined') {
                    parent.data('fotorama').destroy();
                }
                var $fotoramaDiv = $('.fotorama', parent).fotorama({
                    width: parent.data('width'),
                    nav: parent.data('nav'),
                    thumbwidth: '80',
                    thumbheight: '80',
                    allowfullscreen: parent.data('allowfullscreen')
                });
                parent.data('fotorama', $fotoramaDiv.data('fotorama'));
            });
        }
        if (window.matchMedia('(min-width: 992px)').matches) {
            $('.full-map').show();
        } else {
            $('.full-map').hide();
        }

        if (window.matchMedia('(max-width: 991px)').matches) {
            $('.as').slideDown();
        }
    }).resize();

    if ($('.dropdown-toggle', body).length) {
        $('.dropdown-toggle', body).dropdown();
    }

    body.on('click', '.toggle-section', function (ev) {
        ev.preventDefault();
        var t = $(this);
        var target = t.data('target');

        $('.fa', t).toggleClass('fa-angle-up fa-angle-down');
        $('[data-toggle-section="' + target + '"]').slideToggle(200);
    });

    var timeout_fixed_item;
    $(window).on('resize', function () {
        clearTimeout(timeout_fixed_item);
        timeout_fixed_item = setTimeout(function () {
            $('.fixed-on-mobile', body).each(function () {
                var t = $(this);
                var screen = t.data('screen');
                var width = t.width(),
                    top = t.offset().top;
                $(window).scroll(function () {
                    if ($(window).scrollTop() >= top && window.matchMedia('(min-width: ' + screen + ')').matches) {
                        if (t.css('position') != 'fixed') {
                            t.css({
                                width: width,
                                position: 'fixed',
                                top: 0 + $('#wpadminbar').height(),
                                'z-index': 9
                            });
                        }
                        if ($('.stoped-scroll-section', body).length) {
                            var room_position = $('.stoped-scroll-section', body).offset().top;
                            if ($(window).scrollTop() >= room_position && t.css('position') == 'fixed') {
                                t.css({
                                    width: width,
                                    position: 'fixed',
                                    top: room_position - $(window).scrollTop(),
                                    'z-index': 9
                                });
                            } else {
                                t.css({
                                    width: width,
                                    position: 'fixed',
                                    top: 0 + $('#wpadminbar').height(),
                                    'z-index': 9
                                });
                            }
                        }
                    } else {
                        t.css({
                            position: '',
                            top: '',
                            width: 'auto',
                            'z-index': ''
                        })
                    }
                });
            });
            $('.hotel-target-book-mobile', body).each(function () {
                var t = $(this);
                $(window).scroll(function () {
                    if ($(window).scrollTop() >= 50 && window.matchMedia('(max-width: 991px)').matches) {
                        t.css('display', 'flex');
                    } else {
                        t.css('display', 'none');
                    }
                });
            });
        }, 1000);
    }).resize();

    $('[data-show-all]', body).each(function () {
        var t = $(this);
        var height = t.data('height');
        t.css('height', height);
    });

    body.on('click', '[data-show-target]', function (ev) {
        ev.preventDefault();
        var target = $(this).data('show-target');
        $('.fa', this).toggleClass('fa-caret-up fa-caret-down');
        if ($('.fa', this).hasClass('fa-caret-up')) {
            $('.text', this).html($(this).data('text-less'));
        } else {
            $('.text', this).html($(this).data('text-more'));
        }
        if ($('[data-show-all="' + target + '"]', body).hasClass('open')) {
            $('[data-show-all="' + target + '"]', body).css({ height: $('[data-show-all="' + target + '"]', body).data('height') });
        } else {
            $('[data-show-all="' + target + '"]', body).css({ height: '' });
        }
        $('[data-show-all="' + target + '"]', body).toggleClass('open');

    });

    $('.hotel-target-book-mobile .btn-mpopup', body).click(function (ev) {
        ev.preventDefault();
        $('.fixed-on-mobile', body).toggleClass('open').fadeToggle(300);
    });

    $('.fixed-on-mobile .close-icon', body).click(function (ev) {
        ev.preventDefault();
        $('.fixed-on-mobile', body).toggleClass('open').fadeToggle(300);
    });

    $('.review-list', body).on('click', '.show-more', function (ev) {
        ev.preventDefault();
        var parent = $(this).closest('.comment');
        $(this).css('display', 'none');
        $('.review', parent).slideDown(200);
        $('.show-less', parent).css('display', 'block');
    });

    $('.review-list', body).on('click', '.show-less', function (ev) {
        ev.preventDefault();
        var parent = $(this).closest('.comment');
        $(this).css('display', 'none');
        $('.review', parent).slideUp(200);
        $('.show-more', parent).css('display', 'block');
    });

    // Availability
    $('.st-availability', body).each(function () {
        var t = $(this);
        var container = $('.st-calendar', t);
        var calendar = $('.calendar_input', container);
        var options = {
            parentEl: container,
            showCalendar: true,
            alwaysShow: true,
            autoUpdateInput: true,
            singleDatePicker: false,
            showTodayButton: false,
            autoApply: true,
            disabledPast: true,
            responSingle: true,
            widthCalendar: 750,
            onlyShowCurrentMonth: true,
            classNotAvailable: ['disabled', 'off'],
            enableLoading: true,
            showEventTooltip: true,
            fetchEvents: function (start, end, el, callback) {
                var events = [];
                if (el.flag_get_events) {
                    return false;
                }
                el.flag_get_events = true;
                el.container.find('.loader-wrapper').show();
                var data = {
                    action: calendar.data('action'),
                    start: start.format('YYYY-MM-DD'),
                    end: end.format('YYYY-MM-DD'),
                    post_id: calendar.data('room-id'),
                    security: st_params._s
                };
                $.post(st_params.ajax_url, data, function (respon) {
                    if (typeof respon === 'object') {
                        if (typeof respon.events === 'object') {
                            events = respon.events;
                        }
                    } else {
                        console.log('Can not get data');
                    }
                    callback(events, el);
                    el.flag_get_events = false;
                    el.container.find('.loader-wrapper').hide();
                }, 'json');
            }
        };
        if (typeof locale_daterangepicker == 'object') {
            options.locale = locale_daterangepicker;
        }
        calendar.daterangepicker(options, function (start, end, label) {

        });
        var dp = calendar.data('daterangepicker');
        dp.show();
    });


    /* Price range */
    $(".price_range").each(function () {
        var min = $(this).data('min');
        var max = $(this).data('max');
        var step = $(this).data('step');

        var value = $(this).val();

        var from = value.split(';');

        var prefix_symbol = $(this).data('symbol');

        var to = from[1];
        from = from[0];

        $(this).ionRangeSlider({
            min: min,
            max: max,
            type: 'double',
            prefix: prefix_symbol,
            prettify: false,
            step: step,
            onFinish: function (data) {
                set_price_range_val(data, $('input[name="price_range"]'));
            },
            from: from,
            to: to,
            force_edges: true
        });
    });

    function set_price_range_val(data, element) {
        var exchange = 1;
        var from = Math.round(parseInt(data.from) / exchange);
        var to = Math.round(parseInt(data.to) / exchange);
        var text = from + ";" + to;
        element.val(text);
    }

    /*Sidebar toggle*/
    if ($('.sidebar-item').length) {
        $('.sidebar-item').each(function () {
            var t = $(this);
            if (t.hasClass('open')) {
                t.find('.item-content').slideUp();
            }
        });
    }
    $('.sidebar-item .item-title').on('click', function () {
        var t = $(this);
        t.parent().toggleClass('open');
        t.parent().find('.item-content').slideToggle();
    });

    /* Clear radio button */
    $('.btn-clear-review-score').on('click', function () {
        var t = $(this);
        var parent = t.closest('ul');
        parent.find('input').prop('checked', false);
    });

    /* Load more checkbox item */
    if ($('.btn-more-item').length) {
        $('.btn-more-item').each(function () {
            var t = $(this);
            var parent = t.closest('.item-content');
            if (parent.find('ul li').length > 3) {
                t.show();
            }
            t.on('click', function () {
                var countLi = parent.find('ul li.hidden').length;
                var max = 3;
                if (countLi < 3) {
                    max = countLi;
                }

                for (var i = 0; i < max; i++) {
                    parent.find('ul li.hidden').eq(0).removeClass('hidden');
                }

                var countLi = parent.find('ul li.hidden').length;
                if (countLi <= 0) {
                    t.hide();
                }
            });
        });
    }

    $('.form-date-search', body).each(function () {
        var parent = $(this),
            date_wrapper = $('.date-wrapper', parent),
            check_in_input = $('.check-in-input', parent),
            check_out_input = $('.check-out-input', parent),
            check_in_out = $('.check-in-out', parent),
            check_in_render = $('.check-in-render', parent),
            check_out_render = $('.check-out-render', parent);
        var timepicker = parent.data('timepicker');
        if (typeof timepicker == 'undefined' || timepicker == '') {
            timepicker = false;
        } else {
            timepicker = true;
        }
        var options = {
            singleDatePicker: false,
            autoApply: true,
            disabledPast: true,
            dateFormat: 'DD/MM/YYYY',
            customClass: '',
            widthSingle: 500,
            onlyShowCurrentMonth: true,
            timePicker: timepicker
        };
        if (typeof locale_daterangepicker == 'object') {
            options.locale = locale_daterangepicker;
        }

        check_in_out.daterangepicker(options,
            function (start, end, label) {
                check_in_input.val(start.format(parent.data('format')));
                check_in_render.html(start.format(parent.data('format')));
                check_out_input.val(end.format(parent.data('format')));
                check_out_render.html(end.format(parent.data('format')));
                check_in_out.trigger('daterangepicker_change', [start, end]);
                if (window.matchMedia('(max-width: 767px)').matches) {
                    $('label', parent).hide();
                    $('.render', parent).show();
                    $('.check-in-wrapper span', parent).show();
                }
            });
        date_wrapper.click(function (e) {
            check_in_out.trigger('click');
        });
    });

    $('.form-date-hotel-room', body).each(function () {
        var parent = $(this),
            date_wrapper = $('.date-wrapper', parent),
            check_in_input = $('.check-in-input', parent),
            check_out_input = $('.check-out-input', parent),
            check_in_out = $('.check-in-out', parent),
            check_in_render = $('.check-in-render', parent),
            check_out_render = $('.check-out-render', parent);

        var minimum = check_in_out.data('minimum-day');
        if (typeof minimum !== 'number') {
            minimum = 0;
        }
        var options = {
            singleDatePicker: false,
            autoApply: true,
            disabledPast: true,
            dateFormat: 'DD/MM/YYYY',
            widthSingle: 500,
            onlyShowCurrentMonth: true,
            minimumCheckin: minimum,
            classNotAvailable: ['disabled', 'off'],
            enableLoading: true,
            showEventTooltip: true,
            fetchEvents: function (start, end, el, callback) {
                var events = [];
                if (el.flag_get_events) {
                    return false;
                }
                el.flag_get_events = true;
                el.container.find('.loader-wrapper').show();
                var data = {
                    action: check_in_out.data('action'),
                    start: start.format('YYYY-MM-DD'),
                    end: end.format('YYYY-MM-DD'),
                    post_id: check_in_out.data('room-id'),
                    security: st_params._s
                };
                $.post(st_params.ajax_url, data, function (respon) {
                    if (typeof respon === 'object') {
                        if (typeof respon.events === 'object') {
                            events = respon.events;
                        }
                    } else {
                        console.log('Can not get data');
                    }
                    callback(events, el);
                    el.flag_get_events = false;
                    el.container.find('.loader-wrapper').hide();
                }, 'json');
            }
        };
        if (typeof locale_daterangepicker == 'object') {
            options.locale = locale_daterangepicker;
        }

        check_in_out.daterangepicker(options,
            function (start, end, label) {
                check_in_input.val(start.format(parent.data('format')));
                check_in_render.html(start.format(parent.data('format')));
                check_out_input.val(end.format(parent.data('format')));
                check_out_render.html(end.format(parent.data('format')));
            });
        date_wrapper.click(function (e) {
            check_in_out.trigger('click');
        });
    });


    $('.form-extra-field').each(function () {
        var parent = $(this);
        $('.dropdown', parent).click(function (e) {
            var dropdown_menu = $('[aria-labelledby="' + $(this).attr('id') + '"]', parent);
            $('.form-extra-field').find('.dropdown-menu').not(dropdown_menu).slideUp(50);
            dropdown_menu.slideToggle(50);
            $('.arrow', parent).toggleClass('fa-angle-up fa-angle-down');
            if ($('.ovscroll').length) {
                $('.ovscroll').getNiceScroll().resize();
            }
        });
        $('input[name="adult_number"]', parent).change(function () {
            var adults = parseInt($(this).val());
            var html = adults;
            if (typeof adults == 'number') {
                if (adults < 2) {
                    html = adults + ' ' + $('.render .adult', parent).data('text');
                } else {
                    html = adults + ' ' + $('.render .adult', parent).data('text-multi');
                }
            }
            $('.render .adult', parent).html(html);
        });

        $('input[name="adult_number"]', parent).trigger('change');

        $('input[name="child_number"]', parent).change(function () {
            var children = parseInt($(this).val());
            var html = children;
            if (typeof children == 'number') {
                if (children < 2) {
                    html = children + ' ' + $('.render .children', parent).data('text');
                } else {
                    html = children + ' ' + $('.render .children', parent).data('text-multi');
                }
            }
            $('.render .children', parent).html(html);
        });
        $('input[name="child_number"]', parent).trigger('change');
    });

    body.click(function (ev) {
        if ($(ev.target).closest('.form-extra-field').length == 0) {
            $('.form-extra-field .dropdown-menu').slideUp(50);
            $('.form-extra-field .arrow').removeClass('fa-angle-up').addClass('fa-angle-down');
        }
    });

    $('.form-more-extra', body).each(function () {
        var t = $(this),
            parent = t.closest('.form-more-extra');
        $('.dropdown', parent).click(function (ev) {
            ev.preventDefault();
            $('.extras', parent).slideToggle(200);
            $('.arrow', parent).toggleClass('fa-caret-up fa-caret-down');
        });
    });
    $('a[data-toggle="tab"][href="#map-tab"]').on('click', function (e) {
        e.preventDefault();
        loadMap('.st-map');
    });

    

    /*Destination selection*/

    $('.field-detination').each(function () {
        var parent = $(this);

        var dropdown_menu = $('.dropdown-menu', parent);

        $('li', dropdown_menu).on('click', function () {
            var target = $(this).closest('ul.dropdown-menu').attr('aria-labelledby');
            var focus = parent.find('#' + target);
            $('.destination', focus).text($(this).find('span').text());
            $('input[name="location_name"]', focus).val($(this).find('span').text());
            $('input.location_name', focus).val($(this).find('span').text());
            $('input[name="location_id"]', focus).val($(this).data('value'));
            $('input.location_id', focus).val($(this).data('value'));
            if (window.matchMedia('(max-width: 767px)').matches) {
                $('label', focus).hide();
                $('.render', focus).show();
            }
            dropdown_menu.slideUp(50);
        });
    });

    /* nicescroll */
    $('.ovscroll').each(function () {
        $(this).niceScroll();
    });

    $('.map-view-popup .col-left-map').each(function () {
        $(this).niceScroll();
    });

    /*Filter mobile click*/
    $('.toolbar-action-mobile .btn-filter').on('click', function (e) {
        e.preventDefault();
        window.scrollTo({
            top: '46',
        });
        $('.sidebar-filter').fadeIn();
        $('.top-filter').fadeIn();
        $('html, body').css({ overflow: 'hidden' });
    });

    $('.toolbar-action-mobile .btn-sort').on('click', function (e) {
        e.preventDefault();
        $('.sort-menu-mobile').fadeIn();
    });
    $('.toolbar-action-mobile .btn-map').on('click', function (e) {
        e.preventDefault();
        window.scrollTo({
            top: '46',
        });
        $('.page-half-map .col-right').show();
        $('.full-map .full-map-item').show();
        $('html, body').css({ overflow: 'hidden' });
    });

    $('.sidebar-filter .close-filter').on('click', function () {
        $(this).closest('.sidebar-filter').fadeOut(function () {
            $('html, body').css({ overflow: 'auto' });
        });
    });

    $('.top-filter .close-filter').on('click', function () {
        $(this).closest('.top-filter').fadeOut(function () {
            $('html, body').css({ overflow: 'auto' });
        });
    });

    $('.sort-menu-mobile .close-filter').on('click', function () {
        $(this).closest('.sort-menu-mobile').fadeOut();
    });

    $('.page-half-map .close-half-map').on('click', function () {
        $(this).closest('.col-right').hide();
        $('html, body').css({ overflow: 'auto' });
        if ($('#btn-show-map-mobile').length) {
            $('#btn-show-map-mobile').prop('checked', false);
        }
    });

    $('.full-map .close-map').on('click', function () {
        $(this).closest('.full-map').hide();
        $('html, body').css({ overflow: 'auto' });
    });

    $(window).resize(function () {
        if (window.matchMedia('(min-width: 768px)').matches) {
            if ($('.full-map-item').length) {
                if (!$('.full-map-item').is(':visible')) {
                    $('.full-map-item').attr('style', '');
                }
            }

            if ($('.st-hotel-result .sidebar-filter').length) {
                if (!$('.st-hotel-result .sidebar-filter').is(':visible')) {
                    $('.st-hotel-result .sidebar-filter').attr('style', '');
                }
            }

            if ($('.st-hotel-result .top-filter').length) {
                if (!$('.st-hotel-result .top-filter').is(':visible')) {
                    $('.st-hotel-result .top-filter').attr('style', '');
                }
            }
        }

        if (window.matchMedia('(min-width: 992px)').matches) {
            if ($('.page-half-map .col-right').length) {
                if (!$('.page-half-map .col-right').is(':visible') && $('#btn-show-map').is(':checked')) {
                    $('.page-half-map .col-right').attr('style', '');
                }
            }
        }

        if (window.matchMedia('(max-width: 991px)').matches) {
            if ($('.page-half-map .col-right').length) {
                if ($('.page-half-map .col-right').is(':visible')) {
                    $('.page-half-map .col-right').attr('style', '');
                }
            }

            if ($('.page-half-map .col-left').length) {
                if ($('.page-half-map .col-left').is(':visible')) {
                    $('.page-half-map .col-left').getNiceScroll().remove();
                }
            }
        }
    });

    /* On/Off map */

    //Check scroll page
    /*$(document).ready(function () {
        if (window.matchMedia('(min-width: 991px)').matches) {
            var c  = 0;
            var c1 = 0;
            $(window).scroll(function (event) {
                if ($('#btn-show-map').is(':checked') && $('.page-half-map').length) {
                    var scroll = $(window).scrollTop();
                    var topEl  = $('.page-half-map').offset().top;
                    var colLeft = $('.page-half-map .col-left').height();
                    var divResult = $('#modern-search-result').height();
                    if (scroll >= topEl - 1 && scroll != 0) {
                        if (c == 0) {
                            if(divResult >= colLeft) {
                                /!*window.scrollTo({
                                    top: topEl,
                                    behavior: 'auto'
                                });*!/
                                $('.page-half-map').addClass('static').find('.col-left').niceScroll();
                            }
                        }
                    } else {
                        $('.page-half-map').removeClass('static');
                        if (c != 2) {
                            c = 0;
                            $('.page-half-map').find('.col-left').getNiceScroll().remove();
                        } else {
                            if (c1 == 0) {
                                if (scroll < topEl - 100) {
                                    c = 0;
                                    $('.page-half-map').find('.col-left').animate({scrollTop: 0});
                                    c1 = 1;
                                }
                            }
                        }
                    }
                }
            });

            $('.page-half-map .col-left').scroll(function (event) {
                if ($('#btn-show-map').is(':checked')) {
                    var t = $(this);
                    if (t.scrollTop() <= 1) {
                        c = 0;
                        if (c == 0) {
                            $('.page-half-map').removeClass('static').find('.col-left').getNiceScroll().remove();
                        }

                    } else if (typeof t.getNiceScroll()[0] != 'undefined') {
                        if (t.getNiceScroll()[0].page.maxh <= t.scrollTop()) {
                            $('.page-half-map').removeClass('static').find('.col-left').getNiceScroll().remove();
                            c  = 2;
                            c1 = 0;
                        }
                    }
                }
            });
        }

    });*/

    if ($('.payment-form .payment-item').length) {
        $('.payment-form .payment-item').eq(0).find('.st-icheck-item input[type="radio"]').prop('checked', true);
        $('.payment-form .payment-item').eq(0).find('.dropdown-menu').slideDown();
    }
    $('.payment-form .payment-item').each(function (l, i) {
        var parent = $(this);
        $('.st-icheck-item input[type="radio"]', parent).change(function () {
            $('.payment-form .payment-item .dropdown-menu').slideUp();
            if ($(this).is(':checked')) {
                if ($('.dropdown-menu', parent).length) {
                    $('.dropdown-menu', parent).slideDown();
                }
            }
        });
    });

    $('.info-section .detail button').on('click', function () {
        var parent = $(this).closest('.detail');
        $('.detail-list', parent).slideToggle();
    });

    /*$('#st-login-form form').submit(function (ev) {
        ev.preventDefault();
        var form    = $(this),
            loader  = form.closest('.modal-content').find('.loader-wrapper'),
            message = $('.message-wrapper', form);
        var data    = form.serializeArray();
        data.push({
            name : 'security',
            value: st_params._s
        });
        message.html('');
        loader.show();
        $.post(st_params.ajax_url, data, function (respon) {
            if (typeof respon == 'object') {
                message.html(respon.message);
                if (respon.status == 1) {
                    setTimeout(function () {
                        window.location.href = respon.redirect;
                    }, 2000);
                }
            }
            loader.hide();
        }, 'json');
    });*/

    /* Taxonomy advance search */
    var advFacilities = [];
    $('.advance-item.facilities input[type="checkbox"]').each(function () {
        var t = $(this);
        if (t.is(':checked')) {
            advFacilities.push(t.val());
        }
    });

    $('.advance-item.facilities input[type="checkbox"]').change(function () {
        var t = $(this);
        if (t.is(':checked')) {
            advFacilities.push(t.val());
        } else {
            var index = advFacilities.indexOf(t.val());
            if (index > -1) {
                advFacilities.splice(index, 1);
            }
        }
        t.closest('.facilities').find('.data_taxonomy').val(advFacilities.join(','));
    });

    $('#st-login-form form', body).submit(function (ev) {
        ev.preventDefault();
        var form = $(this),
            loader = form.closest('.modal-content').find('.loader-wrapper'),
            message = $('.message-wrapper', form);
        var data = form.serializeArray();
        data.push({
            name: 'security',
            value: st_params._s
        });
        message.html('');
        loader.show();
        $.post(st_params.ajax_url, data, function (respon) {
            if (typeof respon == 'object') {
                message.html(respon.message);
                setTimeout(function () {
                    message.html('');
                }, 2000);
                if (respon.status == 1) {
                    setTimeout(function () {
                        window.location.href = respon.redirect;
                    }, 2000);
                }
            }
            loader.hide();
        }, 'json');
    });

    $('#st-register-form form', body).submit(function (ev) {
        ev.preventDefault();
        var form = $(this),
            loader = form.closest('.modal-content').find('.loader-wrapper'),
            message = $('.message-wrapper', form);
        var data = form.serializeArray();
        data.push({
            name: 'security',
            value: st_params._s
        });
        message.html('');
        loader.show();

        $.post(st_params.ajax_url, data, function (respon) {
            loader.hide();
            if (typeof respon == 'object') {
                message.html(respon.message);
                if (respon.status == 1) {
                    swal({
                        type: 'success',
                        title: respon.message,
                        text: respon.sub_message,
                        showConfirmButton: true,
                        confirmButtonText: respon.closeText,
                        onClose: function () {
                            $('#st-login-form', body).modal('show');
                            $('#st-register-form', body).modal('hide');
                        },
                        allowOutsideClick: false
                    });
                } else {
                    message.html(respon.message);
                    setTimeout(function () {
                        message.html('');
                    }, 2000);
                }
            }
        }, 'json');
    });

    body.on('click', '.btn-show-price', function (ev) {
        ev.preventDefault();
        $('.form-check-availability-hotel', body).trigger('submit');
    });

    $('.shares .social-share').click(function (ev) {
        ev.preventDefault();
        $('.shares .share-wrapper').slideToggle(200);
    });

    $(document).on('click', '.btn_add_wishlist', function (event) {
        event.preventDefault();
        var $this = $(this);
        $.ajax({
            url: st_params.ajax_url,
            type: "POST",
            data: { action: "st_add_wishlist", data_id: $(this).data('id'), data_type: $(this).data('type') },
            dataType: "json",
        }).done(function (html) {
            $this.html(html.icon).attr("data-original-title", html.title)
        })
    });

    $('.st-like-review').click(function (e) {
        e.preventDefault();
        var me = $(this);
        var comment_id = me.data('id');
        $.ajax({
            url: st_params.ajax_url,
            type: 'post',
            dataType: 'json',
            data: {
                action: 'like_review',
                comment_ID: comment_id
            },
            success: function (res) {
                if (res.status) {
                    $('i', me).toggleClass('fa-thumbs-o-up fa-thumbs-o-down');
                    if ($('.booking-item-review-rate').length) {
                        $(me).toggleClass('fa-thumbs-o-up fa-thumbs-o-down');
                    }
                    if (typeof res.data.like_count != undefined) {
                        res.data.like_count = parseInt(res.data.like_count);
                        me.parent().find('span').html(res.data.like_count);
                    }
                }
            }
        });
    });

    $('.review-form .review-items .rates .fa').each(function () {
        var list = $(this).parent(),
            listItems = list.children(),
            itemIndex = $(this).index(),
            parentItem = list.parent();

        $(this).hover(function () {
            for (var i = 0; i < listItems.length; i++) {
                if (i <= itemIndex) {
                    $(listItems[i]).addClass('hovered');
                } else {
                    break;
                }
            }
            $(this).click(function () {
                for (var i = 0; i < listItems.length; i++) {
                    if (i <= itemIndex) {
                        $(listItems[i]).addClass('selected');
                    } else {
                        $(listItems[i]).removeClass('selected');
                    }
                }
                ;

                parentItem.children('.st_review_stats').val(itemIndex + 1);

            });
        }, function () {
            listItems.removeClass('hovered');
        });
    });

    $('.review-form .st-stars .fa').each(function () {
        var list = $(this).parent(),
            listItems = list.children(),
            itemIndex = $(this).index(),
            parentItem = list.parent();

        $(this).hover(function () {
            for (var i = 0; i < listItems.length; i++) {
                if (i <= itemIndex) {
                    $(listItems[i]).addClass('hovered');
                } else {
                    break;
                }
            }
            $(this).click(function () {
                for (var i = 0; i < listItems.length; i++) {
                    if (i <= itemIndex) {
                        $(listItems[i]).addClass('selected');
                    } else {
                        $(listItems[i]).removeClass('selected');
                    }
                }

                parentItem.children('.st_review_stats').val(itemIndex + 1);

            });
        }, function () {
            listItems.removeClass('hovered');
        });
    });
    /* Mobile location */
    $('.search-form-mobile .dropdown-menu li').click(function () {
        var t = $(this);
        var parent = t.closest('.dropdown');
        $('input[name="location_id"]', parent).val(t.data('value'));
        $('input[name="location_name"]', parent).val(t.find('span').text());
    });

    $(document).on('click', '.service-add-wishlist.login', function (event) {
        event.preventDefault();
        var t = $(this);
        t.addClass('loading');
        $.ajax({
            url: st_params.ajax_url,
            type: "POST",
            data: { action: "st_add_wishlist", data_id: t.data('id'), data_type: t.data('type') },
            dataType: "json",
        }).done(function (html) {
            if (html.status == 'true') {
                if (html.added == 'true') {
                    t.addClass('added');
                } else {
                    t.removeClass('added');
                }
                t.attr('title', html.title);
            }
            t.removeClass('loading');
        })
    });

    if ($('#contact-map-new').length) {
        initMapContactPage($('#contact-map-new'));
    }

    $('.field-detination .dropdown-menu').each(function () {
        $(this).niceScroll({
            cursorcolor: "#a0a9b2",
        });
    });

    $(document).ready(function () {
        // Tour Package Popup
        if ($('.st-form-package').length) {
            $('.st-form-package').magnificPopup({
                removalDelay: 500,
                closeBtnInside: true,
                callbacks: {
                    beforeOpen: function () {
                        this.st.mainClass = this.st.el.attr('data-effect');
                    }
                },
                midClick: true,
                closeMarkup: '<button title="Close (Esc)" type="button" class="mfp-close"></button>',
            });
        }


        if (window.matchMedia('(max-width: 768px)').matches) {
            $('.as').slideDown();
        }
        if (window.matchMedia('(min-width: 991px)').matches) {
            var c = 0;
            var c1 = 0;

            $(window).scroll(function (event) {
                if ($('#btn-show-map').is(':checked') && $('.page-half-map').length) {
                    var scroll = $(window).scrollTop();
                    var topEl = $('.st-hotel-result').offset().top;
                    var colLeft = $('.page-half-map .col-left').height();
                    var divResult = $('#modern-search-result').height();
                    if (scroll >= topEl) {
                        if (divResult >= colLeft) {
                            if (c == 0) {
                                if ($("body").hasClass('rtl')) {
                                    $('.page-half-map').find('.col-left').niceScroll({ railalign: 'left' });
                                } else {
                                    $('.page-half-map').find('.col-left').niceScroll();
                                }
                                c = 1;
                                $('.as').slideUp();
                            }
                        } else {
                            $('.page-half-map').find('.col-left').getNiceScroll().remove();
                            $('.as').slideDown(50);
                        }
                    } else {
                        $('.as').slideUp();
                        if (c == 1) {
                            $('.page-half-map').find('.col-left').animate({ scrollTop: 0 }).getNiceScroll().remove();
                            c = 0;
                        }
                    }
                }
            });

            $('.page-half-map .col-left').scroll(function (event) {
                var scroll = $(window).scrollTop();
                var topEl = $('.st-hotel-result').offset().top;

                if ($('#btn-show-map').is(':checked')) {
                    var t = $(this);
                    if (t.scrollTop() <= 0) {

                        if (c == 1) {
                            $('.page-half-map').find('.col-left').getNiceScroll().remove();
                            window.scrollTo({
                                top: topEl - 1,
                            });
                            c = 0;
                        }
                    } else if (typeof t.getNiceScroll()[0] != 'undefined') {
                        if (t.getNiceScroll()[0].page.maxh <= t.scrollTop()) {
                            $('.page-half-map').find('.col-left').getNiceScroll().remove();
                            $('.as').slideDown('slow');
                            c = 1;
                        }
                    }
                }
            });
        }

    });

    $('.coupon-section form .btn').click(function (e) {
        e.preventDefault();
        var sform = $(this).closest('form');
        if ($('#field-coupon_code', sform).val() === '') {
            $('#field-coupon_code', sform).addClass('error');
        } else {
            $('#field-coupon_code', sform).removeClass('error');

            $(this).append('<i class="fa fa-spinner fa-spin"></i>');
            var data = {
                'action': 'apply_mdcoupon_function',
                'code': $('#field-coupon_code', sform).val()
            };
            $.post(st_params.ajax_url, data, function (respon, textStatus, xhr) {
                if (respon.status == 1) {
                    sform.submit();
                }
            }, 'json');
        }
    });

    $('.sidebar-widget h4:first-child').each(function () {
        $(this).wrap("<div class='sidebar-title'></div>");
    });

    if ($('#sticky-nav').length && window.matchMedia('(min-width: 991px)').matches) {
        var topElSearch = $('#sticky-nav').offset().top;
        var searchFormHeight = $('#sticky-nav').closest('.search-form-wrapper').outerHeight();

        $(window).resize(function () {
            var topElSearch = $('#sticky-nav').offset().top;
            var searchFormHeight = $('#sticky-nav').closest('.search-form-wrapper').outerHeight();
        });

        $(window).scroll(function (event) {
            var scroll = $(window).scrollTop();
            var top = 0;
            if ($('#wpadminbar').length) {
                top = $('#wpadminbar').height();
            }
            if (scroll > topElSearch - top) {
                $('#sticky-nav').closest('.search-form-wrapper').css({ height: searchFormHeight + 'px' });
                $('#sticky-nav').find('form').addClass('container');
                $('#sticky-nav').css({ top: top + 'px', 'margin-top': '0px' });
                $('#sticky-nav').addClass('sticky');
                $('#sticky-nav .dropdown-menu').getNiceScroll().resize();
                $('#sticky-nav').addClass('small');
            } else {
                $('#sticky-nav').closest('.search-form-wrapper').css({ height: 'auto' });
                $('#sticky-nav').find('form').removeClass('container');
                $('#sticky-nav').css({ top: 'auto', 'margin-top': '50px' });
                $('#sticky-nav').removeClass('sticky');
                $('#sticky-nav .dropdown-menu').getNiceScroll().resize();
                $('#sticky-nav').removeClass('small');
            }
        })
    }

    $('.st-number-wrapper').each(function () {
        var timeOut = 0;
        var t = $(this);
        var input = t.find('.st-input-number');
        var min = input.data('min');
        var max = input.data('max');

        t.find('span').on("click", function () {
        var $button = $(this);
            numberButtonFunc($button);

        });

        t.find('span').on("mousedown touchstart", function () {
            var $button = $(this);
            timeOut = setInterval(function () {
                numberButtonFunc($button);
            }, 150);
        }).bind('mouseup mouseleave touchend', function () {
            clearInterval(timeOut);
        });

        function numberButtonFunc($button) {
            var oldValue = $button.parent().find("input").val();
            var container = $button.closest('.form-guest-search');

            var total = 0;
            $('input[type="text"]', container).each(function () {
                total += parseInt($(this).val());
            });
            var newVal = oldValue;
            if ($button.hasClass('next')) {
                if (total < max) {
                    if (oldValue < max) {
                        newVal = parseFloat(oldValue) + 1;
                    } else {
                        newVal = max;
                    }
                }
            } else {
                if (oldValue > min) {
                    newVal = parseFloat(oldValue) - 1;
                } else {
                    newVal = min;
                }
            }

            $button.parent().find("input").val(newVal);
            $('input[name="' + $button.parent().find("input").attr('name') + '"]', '.search-form').trigger('change');
            $('input[name="' + $button.parent().find("input").attr('name') + '"]', '.form-check-availability-hotel').trigger('change');
            $('input[name="' + $button.parent().find("input").attr('name') + '"]', '.single-room-form').trigger('change');
            if (window.matchMedia('(max-width: 767px)').matches) {
                $('#dropdown-1 label', $button.closest('.field-guest')).hide();
                $('#dropdown-1 .render', $button.closest('.field-guest')).show();
            }
        }
    });
    $('.btn-close-guest-form').on('click', function () {
        $('.field-guest  .dropdown-menu').slideUp(50);
    });

    $('.st-cut-text').each(function () {
        var t = $(this);
        if (t.text().length > 0) {
            var arr = t.text().trim().split(' ');
            console.log(arr);
        }
    });

    $('.booking-item-review-expand-more').on('click', function () {
        var t = $(this);
        t.closest('.booking-item-review-content').find('.booking-item-review-more').fadeIn();
        t.closest('.booking-item-review-content').find('.booking-item-review-expand-less').show();
        t.hide();
    });

    $('.booking-item-review-expand-less').on('click', function () {
        var t = $(this);
        t.closest('.booking-item-review-content').find('.booking-item-review-more').fadeOut();
        t.closest('.booking-item-review-content').find('.booking-item-review-expand-more').show();
        t.hide();
    });


    $(document).ready(function () {
        $('.st-service-slider').each(function () {
            $(this).owlCarousel({
                loop: false,
                items: 4,
                margin: 20,
                responsiveClass: true,
                dots: false,
                responsive: {
                    0: {
                        items: 2,
                        nav: false,
                        margin: 15,
                    },
                    992: {
                        items: 3,
                        nav: true,
                    },
                    1200: {
                        items: 4,
                        nav: true,
                    }
                }
            });
        });

        $('.st-service-rental-slider').each(function () {
            $(this).owlCarousel({
                loop: false,
                items: 3,
                margin: 20,
                responsiveClass: true,
                dots: true,
                responsive: {
                    0: {
                        items: 2,
                        nav: false,
                        margin: 15,
                    },
                    992: {
                        items: 3,
                        nav: true,
                    }
                }
            });
        });

        $('.st-testimonial-slider').each(function () {
            $(this).owlCarousel({
                loop: false,
                items: 4,
                margin: 30,
                responsiveClass: true,
                dots: true,
                nav: false,
                responsive: {
                    0: {
                        items: 1,
                        margin: 15,
                    },
                    575: {
                        items: 2,
                        margin: 15,
                    },
                    992: {
                        items: 3,
                    },
                    1200: {
                        items: 3,
                    }
                }
            });
        });

        $('.owl-tour-program').each(function () {
            var parent = $(this).parent();
            var owl = $(this);
            owl.owlCarousel({
                loop: false,
                items: 3,
                margin: 20,
                responsiveClass: true,
                dots: false,
                nav: false,
                responsive: {
                    0: {
                        items: 1,
                        margin: 15,
                    },
                    992: {
                        items: 2,
                    },
                    1200: {
                        items: 3,
                    }
                }
            });
            $('.next', parent).click(function (ev) {
                ev.preventDefault();
                owl.trigger('next.owl.carousel');
            });
            $('.prev', parent).click(function (ev) {
                ev.preventDefault();
                owl.trigger('prev.owl.carousel');
            });
            owl.on('resized.owl.carousel', function () {
                setTimeout(function () {
                    if ($('.ovscroll').length) {
                        $('.ovscroll').getNiceScroll().resize();
                    }
                }, 1000);
            });
        });

        /* BG Slider */
        if ($('.search-form-wrapper.slider').length) {
            var heightSlider = $('.search-form-wrapper.slider').outerHeight();
            $('.st-bg-slider').fotorama({
                height: heightSlider
            });
        }

        $(window).resize(function () {
            if ($('.search-form-wrapper.slider').length) {
                var heightSlider = $('.search-form-wrapper.slider').outerHeight();
                $('.st-bg-slider').fotorama({
                    height: heightSlider
                });
            }
        });
    });

    var iex = 0;
    $('.st-program-list').each(function () {
        var t = $(this);
        $('.item .header', t).click(function () {
            $('.st-program .expand').text($('.st-program .expand').data('text-more'));
            iex = 0;
            $('.item', t).removeClass('active');
            $(this).parent().toggleClass('active');
        });
    });


    $('.st-program .expand').on('click', function () {
        var t = $(this);
        if (iex == 0) {
            $('.st-program .st-program-list .item').addClass('active');
            t.text(t.data('text-less'));
            iex = 1;
        } else {
            $('.st-program .st-program-list .item').removeClass('active');
            t.text(t.data('text-more'));
            iex = 0;
        }
    });

    $('.st-faq .item').each(function () {
        var t = $(this);
        t.find('.header').click(function () {
            $('.st-faq .item').not(t).removeClass('active');
            t.toggleClass('active');
        });
    });

    $(".st-video-popup").each(function () {
        $(this).magnificPopup({
            type: 'iframe'
        })
    });

    $('.st-gallery-popup').click(function (e) {
        e.preventDefault();
        var gallery = $(this).attr('href');

        $(gallery).magnificPopup({
            delegate: 'a',
            type: 'image',
            gallery: {
                enabled: true
            },
        }).magnificPopup('open');
    });
    //zzz
    $('.st-single-tour .form-date-search', body).each(function () {
        var parent = $(this),
            date_wrapper = $('.date-wrapper', parent),
            check_in_input = $('.check-in-input', parent),
            check_out_input = $('.check-out-input', parent),
            check_in_out_input = $('.check-in-out-input', parent),
            check_in_render = $('.check-in-render', parent),
            check_out_render = $('.check-out-render', parent),
            sts_checkout_label = $('.sts-tour-checkout-label', parent);

        var options = {
            singleDatePicker: true,
            showCalendar: false,
            sameDate: true,
            autoApply: true,
            disabledPast: true,
            dateFormat: 'DD/MM/YYYY',
            enableLoading: true,
            showEventTooltip: true,
            classNotAvailable: ['disabled', 'off'],
            disableHightLight: true,
            fetchEvents: function (start, end, el, callback) {
                var events = [];
                if (el.flag_get_events) {
                    return false;
                }
                el.flag_get_events = true;
                el.container.find('.loader-wrapper').show();
                var data = {
                    action: check_in_out_input.data('action'),
                    start: start.format('YYYY-MM-DD'),
                    end: end.format('YYYY-MM-DD'),
                    tour_id: check_in_out_input.data('tour-id'),
                    security: st_params._s
                };
                $.post(st_params.ajax_url, data, function (respon) {
                    if (typeof respon === 'object') {
                        if (typeof respon.events === 'object') {
                            events = respon.events;
                        }
                    } else {
                        console.log('Can not get data');
                    }
                    callback(events, el);
                    el.flag_get_events = false;
                    el.container.find('.loader-wrapper').hide();
                }, 'json');
            }
        };

        if (typeof locale_daterangepicker == 'object') {
            options.locale = locale_daterangepicker;
        }

        check_in_out_input.daterangepicker(options,
            function (start, end, label, elmDate) {
                check_in_input.val(start.format(parent.data('format')));
                check_out_input.val(end.format(parent.data('format')));
                check_in_render.html(start.format(parent.data('format')));
                check_out_render.html(end.format(parent.data('format')));

                if (start.format(parent.data('format')).toString() == end.format(parent.data('format')).toString()) {
                    sts_checkout_label.hide();
                } else {
                    sts_checkout_label.show();
                }

                if (typeof elmDate !== 'undefined' && elmDate !== false) {
                    if ($('.st-single-tour').length > 0) {
                        if (elmDate.target.classList.contains('has_starttime')) {
                            ajaxSelectStartTime(check_in_out_input.data('tour-id'), start.format(parent.data('format')), end.format(parent.data('format')), '', check_in_out_input.data('posttype'));
                        } else {
                            $('#starttime_tour option').remove();
                            $('#starttime_box').parent().hide();
                        }
                    }
                }
            });
        date_wrapper.click(function (e) {
            check_in_out_input.trigger('click');
        });
    });

    if ($('.logo').length) {
        var logoWidth = $('.logo').width();
        if ($('.has-mega-menu .mega-menu').length) {
            var stMegaWidth = $('.has-mega-menu .mega-menu .st-mega').first().outerWidth();
            $('.has-mega-menu .mega-menu').css({
                left: (logoWidth + 60) + 'px',
                width: stMegaWidth + 'px'
            });
            $('.has-mega-menu .mega-menu .st-mega').css({
                width: '100%'
            });
            $(window).resize(function () {
                var winDowsWidth = $('#header').width();
                if (winDowsWidth < (stMegaWidth + logoWidth + 130)) {
                    var megaWidth = winDowsWidth - (logoWidth + 130);
                    $('.has-mega-menu .mega-menu').css({
                        width: megaWidth + 'px',
                    });
                } else {
                    $('.has-mega-menu .mega-menu').css({
                        width: stMegaWidth + 'px',
                    });
                }
                if (window.matchMedia("(min-width: 992px)").matches) {
                    $('.has-mega-menu .mega-menu').show();
                } else {
                    $('.has-mega-menu .mega-menu').hide();
                }
            });
        }
    }

    var checkExWoo = 0;
    $('.booking-item-review-expand-new').on('click', function (e) {
        e.preventDefault();
        var t = $(this);
        var textMore = t.data('more');
        var textLess = t.data('hide');
        if (t.hasClass('collapsed')) {
            t.html(textLess);
        } else {
            if (checkExWoo == 0) {
                t.html(textLess);
                checkExWoo++;
            } else {
                t.html(textMore);
            }
        }
        t.closest('.booking-item-review-content').find('.booking-item-review-more').slideToggle();
    });

    if (typeof $('.player').YTPlayer === 'function') {
        $('.btn-play-video').click(function (e) {
            e.preventDefault();
            if (typeof player == 'undefined') {
                var player = jQuery(".player").YTPlayer({ align: "center,center" });
            }
            var t = $(this);
            if (t.hasClass('play')) {
                player.playYTP();
                t.removeClass('play')
            } else {
                player.pauseYTP();
                t.addClass('play')
            }
        });
    }

    if ($('#starttime_hidden_load_form').length > 0) {
        $('#starttime_box').each(function () {
            var meS = $(this);
            var st_data_tour_id = $('#starttime_hidden_load_form').data('tourid');
            var st_data_starttime = $('#starttime_hidden_load_form').data('starttime');
            var st_data_checkin = $('#starttime_hidden_load_form').data('checkin');
            var st_data_checkout = $('#starttime_hidden_load_form').data('checkout');
            var st_posttype = $('#starttime_hidden_load_form').data('posttype');

            if (st_data_starttime != "" && typeof st_data_starttime !== 'undefined') {
                ajaxSelectStartTime(st_data_tour_id, st_data_checkin, st_data_checkout, st_data_starttime, st_posttype);
            }
        });
    }

    function ajaxSelectStartTime(tour_id, check_in, check_out, select_starttime, posttype = 'st_tours') {
        var sparent = $('.fixed-on-mobile');
        var overlay = $('.loader-wrapper', sparent);

        var data = {
            check_in: check_in,
            check_out: check_out
        };

        if (posttype === 'st_activity') {
            data['action'] = 'st_get_starttime_activity_frontend';
            data['activity_id'] = tour_id;
        } else {
            data['action'] = 'st_get_starttime_tour_frontend';
            data['tour_id'] = tour_id;
        }
        overlay.hide();
        $.ajax({
            url: st_params.ajax_url,
            dataType: 'json',
            type: 'post',
            data: data,
            beforeSend: function () {
                overlay.show();
            },

            success: function (doc) {
                var i = 0;
                if (doc['data'] != null && doc['data'].length > 0) {
                    $('#starttime_tour option').remove();
                    $('#starttime_box').parent().show();

                    var te = '';
                    for (i = 0; i < doc['data'].length; i++) {
                        var op_disable = '';

                        if (doc['check'][i] == '-1') {
                            if (doc['data'][i] == select_starttime) {
                                te += '<option value="' + doc['data'][i] + '" selected ' + op_disable + '>' + doc['data'][i] + '</option>';
                            } else {
                                te += '<option value="' + doc['data'][i] + '" ' + op_disable + '>' + doc['data'][i] + '</option>';
                            }
                        } else {
                            if (doc['check'][i] == '0') {
                                //op_disable = 'disabled="disabled"';
                                if (doc['data'][i] == select_starttime) {
                                    te += '<option value="' + doc['data'][i] + '" selected ' + op_disable + '>' + doc['data'][i] + ' ( ' + st_params.no_vacancy + ' )' + '</option>';
                                } else {
                                    te += '<option value="' + doc['data'][i] + '" ' + op_disable + '>' + doc['data'][i] + ' ( ' + st_params.no_vacancy + ' )' + '</option>';
                                }
                            } else {
                                if (doc['data'][i] == select_starttime) {
                                    if (doc['check'][i] == '1') {
                                        te += '<option value="' + doc['data'][i] + '" selected ' + op_disable + '>' + doc['data'][i] + ' ( ' + st_params.a_vacancy + ' )' + '</option>';
                                    } else {
                                        if (doc['check'][i] < 0) {
                                            te += '<option value="' + doc['data'][i] + '" selected ' + op_disable + '>' + doc['data'][i] + ' ( ' + st_params.no_vacancy + ' )' + '</option>';
                                        } else {
                                            te += '<option value="' + doc['data'][i] + '" selected ' + op_disable + '>' + doc['data'][i] + ' ( ' + doc['check'][i] + ' ' + st_params.more_vacancy + ' )' + '</option>';
                                        }

                                    }
                                } else {
                                    if (doc['check'][i] == '1') {
                                        te += '<option value="' + doc['data'][i] + '" ' + op_disable + '>' + doc['data'][i] + ' ( ' + st_params.a_vacancy + ' )' + '</option>';
                                    } else {
                                        if (doc['check'][i] < 0) {
                                            te += '<option value="' + doc['data'][i] + '" ' + op_disable + '>' + doc['data'][i] + ' ( ' + st_params.no_vacancy + ' )' + '</option>';
                                        } else {
                                            te += '<option value="' + doc['data'][i] + '" ' + op_disable + '>' + doc['data'][i] + ' ( ' + doc['check'][i] + ' ' + st_params.more_vacancy + ' )' + '</option>';
                                        }
                                    }
                                }
                            }
                        }
                    }
                    $('#starttime_tour option').remove();

                    $('#starttime_tour').append(te);
                    overlay.hide();
                } else {
                    $('#starttime_box').parent().hide();
                    overlay.hide();
                }
            },
        });
    }

    $('.search-form-wrapper.slider a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var slideHeight = $('.search-form-wrapper.slider').outerHeight();
        var ft = $('.st-bg-slider').data('fotorama');
        ft.resize({
            height: slideHeight
        });
    });

    $('.st-list-of-multi-services').each(function () {
        var t = $(this);
        var dataTabShowVal = $('.st-list-dropdown .header', t).data('value');
        $('.multi-service-wrapper .tab-content.' + dataTabShowVal).show();
        $('.has-matchHeight', t).matchHeight({ remove: true });
        $('.has-matchHeight', t).matchHeight();
    });

    $('.st-list-dropdown').each(function () {
        var t = $(this);

        var currentTabList = t.find('.header').data('value');
        $('.list', t).find('li[data-value="' + currentTabList + '"]').hide();

        $('.header').click(function () {
            $('.list', t).toggle();
        });
        $('.list li', t).click(function () {
            var me = $(this);
            $('.list li', t).removeClass('active');
            me.addClass('active');
            var dataS = me.data('value');
            var dataSName = me.text();
            $('.header span', t).text(dataSName);
            $('.header', t).attr('data-value', dataS);
            me.parent().hide();
            $('.multi-service-wrapper .tab-content').hide();
            $('.multi-service-wrapper .tab-content.' + dataS).show();
            setTimeout(function () {
                $('.multi-service-wrapper .tab-content .has-matchHeight').matchHeight({ remove: true });
                $('.multi-service-wrapper .tab-content .has-matchHeight').matchHeight();
            }, 1000);

            $('.list li', t).show();
            $('.list', t).find('li[data-value="' + dataS + '"]').hide();
        })

        $(document).mouseup(function (e) {
            var container = t;
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                container.find('.list').hide();
            }
        });
    });

    if ($('.search-form-wrapper.mix').length > 0) {
        if (window.matchMedia("(max-width: 991px)").matches) {
            var heightTabMix = [];
            $('.search-form-wrapper.mix .tab-content .tab-pane').each(function () {
                var idNameTabMix = $(this).attr('id');
                var tabMixShowEl = document.querySelector('.search-form-wrapper.mix .tab-pane#' + idNameTabMix),
                    tabMixWantedHeight = getHeightHiddenEl(tabMixShowEl);
                heightTabMix.push(tabMixWantedHeight);
            });

            if (heightTabMix.length) {
                var maxHeightTabMix = Math.max.apply(null, heightTabMix);
                var maxHeightPos = heightTabMix.indexOf(maxHeightTabMix);

                $('.search-form-wrapper.mix .tab-content .tab-pane').each(function (i, obj) {
                    if (i === maxHeightPos)
                        $(this).css('height', (maxHeightTabMix - 1) + 'px');
                    else
                        $(this).css('height', maxHeightTabMix + 'px');
                });
            }
        }
    }
})(jQuery);





