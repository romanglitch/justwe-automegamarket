$(function() {
    'use strict';

    /* Global object to store/access data */
    window.GL_APP = {}

    /* Variables */
    GL_APP.variables = {
        fancyBox: {
            modalsOptions: {
                defaultType: 'inline',
                transitionDuration: 366,
                animationEffect: 'zoom-in-out',
                touch: false,
                autoFocus: false
            }
        }
    }

    /* Instances */
    GL_APP.instances = {
        swiper: {},
        ionRange: {},
        rangeMask: {}
    }

    /* Elements */
    GL_APP.elements = {
        $html: $('html'),
        $body: $('body'),
        $main: $('main'),
        $input: $('.main-form-input'),
        $select: $('.main-form-select'),
        $fancyboxModals: $('.js-modals'),
        $fancyboxGallery: $('[data-fancybox]'),
        preloader: $('.preloader'),
        maskInputs: {
            $currency: $('.js-currency-mask'),
            $mileage: $('.js-mileage-mask'),
            $year: $('.js-year-mask'),
            $phone: $('.js-phone-mask'),
            $maskRange: $('.js-mask-range')
        },
        ionRange: {
            $geo: $('.js-geo-range'),
            $reviewRating: $('.js-rev-rating-range'),
            $creditTotal: $('.js-credit-total-range'),
            $creditTerm: $('.js-credit-term-range'),
            $creditFee: $('.js-credit-fee-range')
        },
        hCatalog: {
            element: '.js-h-catalog',
            btn: '.js-h-catalog-btn'
        },
        hMenu: {
            element: '.js-h-menu',
            btn: '.js-h-menu-btn'
        },
        hGeoPopup: {
            element: '.js-h-geo-popup',
            btn: '.js-h-geo-btn'
        },
        hMobileMenu: {
            element: '.js-m-menu',
            btn: '.js-m-menu-btn'
        },
        filterTabs: {
            navItems: '.filter-tabs__nav-item',
            contentItems: '.filter-tabs__content'
        },
        galleryTabs: {
            navItems: '.model-gallery-tabs__nav-item',
            contentItems: '.model-gallery-tabs__content'
        },
        filterToggle: {
            element: '.js-filter-toggle',
            button: '.js-filter-toggle-btn'
        },
        creditFormTabs: {
            navItems: '.js-credit-tabs-nav',
            contentItems: '.js-credit-tabs-content'
        },
        modelDescription: {
            element: '.js-hidden-desc',
            btn: '.js-hidden-desc-btn'
        },
        buyOutTabs: {
            navItems: '.buyout-tabs__nav-item',
            contentItems: '.buyout-tabs__content'
        },
        sitemapTabs: {
            navItems: '.sitemap-tabs-nav__item',
            contentItems: '.sitemap-tabs-content'
        },
        modelComps: '.js-comps-item',
        accSpoilers: '.js-acc-spoiler',
        modelAboutColorPicker: {
            targetSelector: '.js-color-picker-image',
            buttonSelector: '.js-color-picker-item'
        },
        comparisonCarousel: {
            carouselElement: '.comparison-carousel',
            carouselItem: '.comparison-carousel__item',
            carouselPrev: '.comparison-carousel-prev',
            carouselNext: '.comparison-carousel-next'
        },
        comparisonAccordion: '.comparison-acc',
        swiper: {
            mainCarousel: '.carousel',
            reviewsCarousel: '.reviews-carousel',
            dealerGallery: '.dealer-gallery',
            compsItemCarousel: '.comps-item-carousel',
            smNewsCarousel: '.carousel-sm-news'
        }
    }

    /* Components */
    GL_APP.components = {
        // App components
        glHeaderCatalog: ({element, button}) => {
            let elements = {
                $catalog: $(element),
                $button: $(button)
            }

            let timeOut = {
                instance: null,
                time: 500
            }

            let showCatalog = () => {
                clearTimeout(timeOut.instance);

                if ($(GL_APP.elements.hGeoPopup.element).hasClass('js-gl-toggle-target-active')) {
                    $(GL_APP.elements.hGeoPopup.btn).trigger('click')
                }

                elements.$button.addClass('--hover')
                elements.$catalog.addClass('--hover')
                GL_APP.elements.$html.addClass('--catalog-opened')

                return false
            }

            let hideCatalog = () => {
                timeOut.instance = setTimeout(function () {
                    elements.$button.removeClass('--hover')
                    elements.$catalog.removeClass('--hover')
                    GL_APP.elements.$html.removeClass('--catalog-opened')
                }, timeOut.time)

                return false
            }

            elements.$button.on( {
                'mouseover': showCatalog,
                'mouseleave': hideCatalog
            });

            elements.$catalog.on( {
                'mouseover': showCatalog,
                'mouseleave': hideCatalog
            });
        },
        glToggleFilter: ({element, button}) => {
            let elements = {
                $element: $(element),
                $button: $(button)
            }

            elements.$button.on('click', function (e) {
                e.preventDefault()

                let $ths = $(this),
                    $closestElement = $ths.closest(elements.$element)

                $closestElement.toggleClass('--toggled')

                if ($closestElement.hasClass('--toggled')) {
                    $ths.text($ths.attr('data-active-text'))
                } else {
                    $ths.text($ths.attr('data-default-text'))
                }
            })
        },
        glAccordion: (selector, options) => {
            let defaults = {
                openOnlyOne: true,
                animationDuration: 200,
                contentsAttrName: 'data-accordion-content',
                buttonsAttrName: 'data-accordion-target',
                activeAccordionClass: 'js-gl-acc-active',
                activeButtonsClass: 'js-gl-acc-button-active',
                activeContentClass: 'js-gl-acc-content-active',
            }; options = $.extend( {}, defaults, options )

            let elements = {
                $accordionItems: $( selector ),
                $buttonItems: $( selector ).find('[' + options.buttonsAttrName + ']'),
                $contentItems: $( selector ).find('[' + options.contentsAttrName + ']')
            }

            elements.$contentItems.hide()

            elements.$buttonItems.on('click', function (e) {
                e.preventDefault()

                let $thisButton = $( this ),
                    $thisAccordion = $thisButton.closest( elements.$accordionItems ),
                    $thisContent = $thisAccordion.find( '[' + options.contentsAttrName + '="' + $thisButton.attr( options.buttonsAttrName ) + '"]' )

                if ( $thisContent.css('display') === 'none' ) {
                    if (options.openOnlyOne) {
                        elements.$contentItems.slideUp(options.animationDuration).removeClass(options.activeContentClass)
                        elements.$buttonItems.removeClass(options.activeButtonsClass)

                        $thisContent.slideDown(options.animationDuration).addClass(options.activeContentClass)
                        $thisButton.addClass(options.activeButtonsClass)
                    } else {
                        $thisContent.slideDown(options.animationDuration).addClass(options.activeContentClass)
                        $thisButton.addClass(options.activeButtonsClass)
                    }
                } else {
                    $thisContent.slideUp(options.animationDuration).removeClass(options.activeContentClass)
                    $thisButton.removeClass(options.activeButtonsClass)
                }

                let showingContentsLength = $thisAccordion.find('.' + options.activeContentClass).length;

                if ( showingContentsLength > 0 ) {
                    if (options.openOnlyOne) {
                        elements.$accordionItems.not($thisAccordion).removeClass(options.activeAccordionClass);
                    }
                    $thisAccordion.addClass(options.activeAccordionClass)
                } else {
                    $thisAccordion.removeClass(options.activeAccordionClass)
                }
            })
        },
        glTabs: (options) => {
            let defaults = {
                tabNavSelector: null,
                tabContentSelector: null,
                defaultActiveTab: 0,
                activeTabClass: 'js-gl-tab-active',
                activeNavClass: 'js-gl-tab-link-active',
            }; options = $.extend( {}, defaults, options )

            console.log()

            let elements = {
                $navItems: $(options.tabNavSelector),
                $contentItems: $(options.tabContentSelector)
            }

            elements.$contentItems.hide()
            elements.$contentItems.eq(options.defaultActiveTab).show().addClass(options.activeTabClass)
            elements.$navItems.eq(options.defaultActiveTab).addClass(options.activeNavClass).attr('disabled', 'disabled')

            elements.$navItems.on('click', function (e) {
                e.preventDefault()

                let $thisButton = $( this ),
                    $thisIndex = elements.$navItems.index(this),
                    $thisContent = elements.$contentItems.eq($thisIndex);

                elements.$contentItems.hide().removeClass(options.activeTabClass)
                elements.$navItems.removeClass(options.activeNavClass).removeAttr('disabled')

                $thisContent.show().addClass(options.activeTabClass)
                $thisButton.addClass(options.activeNavClass).attr('disabled', 'disabled')
            })

            return false
        },
        glAttrChanger: (options) => {
            let defaults = {
                targetSelector: null,
                buttonSelector: null,
                targetTextSelector: null,
                targetAttrName: null,
                dataAttrName: 'data-attr-value',
                dataTextAttrName: 'data-attr-text',
                activeButtonClass: 'js-gl-attr-active'
            }; options = $.extend( {}, defaults, options )

            let elements = {
                $targetItem: $(options.targetSelector),
                $buttonItems: $(options.buttonSelector),
                $targetTextItems: $(options.targetTextSelector),
                $firstButtonItem: $(options.buttonSelector).first()
            }

            elements.$targetItem.attr(options.targetAttrName, elements.$firstButtonItem.attr(options.dataAttrName))
            elements.$firstButtonItem.addClass(options.activeButtonClass).attr('disabled', 'disabled')

            elements.$targetTextItems.html(elements.$firstButtonItem.attr(options.dataTextAttrName))

            elements.$buttonItems.on('click', function (e) {
                e.preventDefault()

                let $thisButton = $( this ),
                    thisData = $thisButton.attr(options.dataAttrName),
                    thisText = $thisButton.attr(options.dataTextAttrName)

                elements.$buttonItems.removeClass(options.activeButtonClass).removeAttr('disabled')
                elements.$targetItem.attr(options.targetAttrName, thisData)
                elements.$targetTextItems.html(thisText)
                $thisButton.addClass(options.activeButtonClass).attr('disabled', 'disabled')
            })

            return false
        },
        glToggleClass: (options) => {
            let defaults = {
                targetSelector: null,
                buttonSelector: null,
                toggleOnInit: false,
                detectOutsideClick: false,
                toggleFalseOnScroll: false,
                activeTargetClass: 'js-gl-toggle-target-active',
                activeButtonClass: 'js-gl-toggle-button-active',
                on: {
                    changeState: null
                }
            }; options = $.extend( {}, defaults, options )

            let elements = {
                $window: $(window),
                $targetElement: $(options.targetSelector),
                $button: $(options.buttonSelector),
            }

            let changeTargetState = (isToggle) => {
                if (!elements.$targetElement.hasClass(options.activeTargetClass)) {
                    elements.$targetElement.addClass(options.activeTargetClass)
                    elements.$button.addClass(options.activeButtonClass)

                    isToggle = true
                } else {
                    elements.$targetElement.removeClass(options.activeTargetClass)
                    elements.$button.removeClass(options.activeButtonClass)

                    isToggle = false
                }

                if (typeof options.on.changeState == 'function') {
                    options.on.changeState.call(this, elements, isToggle);
                }
            }

            if (options.toggleOnInit) {
                changeTargetState()
            }

            elements.$button.on('click', function (e) {
                e.stopPropagation()
                changeTargetState()
            })

            // DEPRECATED
            if (options.toggleFalseOnScroll) {
                let scrollTimeout = {
                    timeoutInstance: null,
                    timeoutTime: 100
                }

                let scrollOffset = 300

                let thisScrollPosition = $(window).scrollTop(),
                    ScrollPositionMax = thisScrollPosition + scrollOffset,
                    ScrollPositionMin = thisScrollPosition - scrollOffset

                $(window).on('scroll', function () {
                    if (!scrollTimeout.timeoutInstance) {
                        scrollTimeout.timeoutInstance = setTimeout(function () {

                            if ($(this).scrollTop() > ScrollPositionMax || $(this).scrollTop() < ScrollPositionMin) {
                                if (elements.$targetElement.hasClass(options.activeTargetClass)) {
                                    changeTargetState()
                                }
                            }

                            scrollTimeout.timeoutInstance = null;
                        }, scrollTimeout.timeoutTime);
                    }
                });
            }

            if (options.detectOutsideClick) {
                elements.$window.on('click', function (e) {
                    if (elements.$targetElement.hasClass(options.activeTargetClass) && !$(e.target).closest('.select2-dropdown').length) {
                        changeTargetState()
                    }
                })

                elements.$targetElement.on("click",function(e){
                    e.stopPropagation()
                })
            }

            return false
        },
        glCarousel: (selector, options) => {
            let defaults = {
                carouselItem: null,
                navigation: {
                    prev: null,
                    next: null
                },
                itemsPerView: null,
                disabledButtonClass: 'js-gl-carousel-button-disabled',
                transitionDuration: 300,
            }; options = $.extend( {}, defaults, options )

            let elements = {
                $window: $(window),
                $carousel: $(selector),
                $firstCarouselItems: $(selector).first().find(options.carouselItem),
                $carouselItems: $(options.carouselItem),
                $navPrev: $(options.navigation.prev),
                $navNext: $(options.navigation.next)
            }

            let carouselData = {}

            let initCarousel = () => {
                if (options.itemsPerView) {
                    $.each( options.itemsPerView, function( screenWidth, itemsCount ) {
                        if ( elements.$window.width() > screenWidth ) {
                            carouselData.itemsPerView = itemsCount
                            carouselData.itemPercentWidth = 100 / itemsCount
                        }
                    })
                } else {
                    carouselData.itemsPerView = 1
                    carouselData.itemPercentWidth = 100
                }

                elements.$carousel.css({
                    'display': 'flex',
                    'transition': 'transform ' + options.transitionDuration + 'ms'
                })

                elements.$carouselItems.css({
                    'width': carouselData.itemPercentWidth + '%',
                    'min-width': carouselData.itemPercentWidth + '%',
                    'max-width': carouselData.itemPercentWidth + '%'
                })

                if (elements.$firstCarouselItems.length <= carouselData.itemsPerView) {
                    elements.$navPrev.hide()
                    elements.$navNext.hide()
                } else {
                    elements.$navPrev.addClass(options.disabledButtonClass).attr('disabled', 'disabled')
                }

                carouselData.defItemWidth = elements.$firstCarouselItems.first().outerWidth()
                carouselData.itemWidth = elements.$carouselItems.outerWidth()
                carouselData.itemsOverViewWidth = elements.$carouselItems.outerWidth() * (elements.$firstCarouselItems.length - carouselData.itemsPerView)
                carouselData.progress = 0

                return carouselData
            }

            let slideNext = () => {
                if (carouselData.progress < carouselData.itemsOverViewWidth) {
                    carouselData.progress += carouselData.itemWidth
                } else {
                    carouselData.progress = carouselData.itemsOverViewWidth
                }

                if (carouselData.progress >= carouselData.itemsOverViewWidth) {
                    elements.$navNext.addClass(options.disabledButtonClass).attr('disabled', 'disabled')
                }
                elements.$navPrev.removeClass(options.disabledButtonClass).removeAttr('disabled')

                elements.$carousel.css({
                    'transform':'translate(-' + Math.round(carouselData.progress * 100) / 100 + 'px,0)'
                })

                return false
            }

            let slidePrev = () => {
                if (carouselData.progress > carouselData.itemWidth) {
                    carouselData.progress -= carouselData.itemWidth
                } else {
                    carouselData.progress = 0
                }

                if (carouselData.progress <= 0) {
                    elements.$navPrev.addClass(options.disabledButtonClass).attr('disabled', 'disabled')
                }
                elements.$navNext.removeClass(options.disabledButtonClass).removeAttr('disabled')

                elements.$carousel.css({
                    'transform':'translate(-' + Math.round(carouselData.progress * 100) / 100 + 'px,0)'
                })

                return false
            }

            initCarousel()

            elements.$window.on('resize', function () {
                if (carouselData.defItemWidth !== elements.$carouselItems.first().outerWidth()) {
                    initCarousel()
                    slideNext()
                }
            })
            elements.$navNext.on('click', slideNext)
            elements.$navPrev.on('click', slidePrev)

            return false
        },
        glGalleryLimit: () => {
            let $galleryBlock = $('[data-gallery-limit]')

            $galleryBlock.each(function () {
                let $thisBlock = $(this),
                    $galleryItem = $thisBlock.find(`[data-fancybox="${ $thisBlock.data('gallery-name') }"]`)

                let $getHiddenItems = $galleryItem.filter(function() {
                    return $(this).css('display') === 'none';
                });

                let hiddenItemsCount = $getHiddenItems.length,
                    $hiddenFirstItem = $getHiddenItems.first()

                if (hiddenItemsCount) {
                    let galleryButtonHTML = null

                    if ($thisBlock.data('gallery-name') === 'review-gallery') {
                        galleryButtonHTML = `<button class="btn btn_white model-gallery__btn" title="+ ${ hiddenItemsCount } фото" data-gallery-button>+ ${ hiddenItemsCount } фото</button>`
                    } else {
                        galleryButtonHTML = `<button class="btn btn_white model-gallery__btn" title="Посмотреть еще ${ hiddenItemsCount } фото" data-gallery-button>Посмотреть еще ${ hiddenItemsCount } фото</button>`
                    }

                    $thisBlock.append(galleryButtonHTML)
                    $thisBlock.addClass('--limited')

                    let $button = $thisBlock.find('[data-gallery-button]')

                    $button.on('click', function (e) {
                        e.preventDefault()
                        $hiddenFirstItem.trigger('click')
                    })
                }
            })
        },
        glColorsLimit: () => {
            let $colorBlock = $('[data-colors-limit]')

            $colorBlock.each(function () {
                let $thisBlock = $(this),
                    $colorItem = $thisBlock.find($thisBlock.data('colors-limit'))

                let $getHiddenItems = $colorItem.filter(function() {
                    return $(this).css('display') === 'none';
                });

                let hiddenItemsCount = $getHiddenItems.length

                if (hiddenItemsCount) {
                    let colorsButtonHTML = `<button class="colors-list__btn" title="Посмотреть доступыне цвета" data-colors-button>+${ hiddenItemsCount }</button>`

                    $thisBlock.append(colorsButtonHTML)
                    $thisBlock.addClass('--limited')

                    let $button = $thisBlock.find('[data-colors-button]')

                    $button.on('click', function (e) {
                        e.preventDefault()
                        $thisBlock.addClass('--more-colors')
                        $(this).remove()
                    })
                }
            })
        },
        glSpecsLimit: () => {
            let $specsBlock = $('[data-specs-limit]')

            $specsBlock.each(function () {
                let $thisBlock = $(this),
                    $specItem = $thisBlock.find($thisBlock.data('specs-limit'))

                let $getHiddenItems = $specItem.filter(function() {
                    return $(this).css('display') === 'none';
                });

                let hiddenItemsCount = $getHiddenItems.length

                if (hiddenItemsCount) {
                    let specsButtonHTML = `<button class="arrow-link" data-specs-button>Все характеристики</button>`

                    $thisBlock.append(specsButtonHTML)
                    $thisBlock.addClass('--limited')

                    let $button = $thisBlock.find('[data-specs-button]')

                    $button.on('click', function (e) {
                        e.preventDefault()
                        $thisBlock.addClass('--more-specs')
                        $(this).remove()
                    })
                }
            })
        },
        glSendNotify: (nTitle, nText, nIcon) => {
            new Notify ({
                status: 'success',
                title: nTitle,
                text: nText,
                effect: 'fade',
                speed: 600,
                customClass: 'gl-app-notify',
                customIcon: nIcon,
                showIcon: nIcon,
                showCloseButton: true,
                autoclose: true,
                autotimeout: 2000,
                gap: 20,
                distance: 20,
                type: 3,
                position: 'right bottom'
            })
        },
        glSetCallbackTime: () => {
            let elements = {
                $select: $('.js-callback-time-select'),
                $input: $('.js-callback-time-input'),
                $btn: $('.js-callback-time-btn')
            }

            elements.$btn.on('click', function (e) {
                e.preventDefault()

                if (elements.$select.val()) {
                    elements.$input.val(elements.$select.val())

                    $.fancybox.open({
                        src  : '#popup-callback',
                        opts : GL_APP.variables.fancyBox.modalsOptions
                    });
                } else {
                    elements.$select.addClass('--error')
                }
            })
        },
        glComparisonFunctions: () => {
            let elements = {
                $comparisonHeader: $('.comparison-table__header'),
                $itemTitleButton: $('.comparison-table__item__title')
            }

            if (elements.$comparisonHeader.length) {
                $(window).on('scroll', function () {
                    let isSticky = elements.$comparisonHeader.position().top > 0

                    if (isSticky) {
                        elements.$comparisonHeader.addClass('--css-sticky')
                    } else {
                        elements.$comparisonHeader.removeClass('--css-sticky')
                    }
                })

                elements.$itemTitleButton.on('click', function (e) {
                    e.preventDefault()
                    $(this).toggleClass('--content-is-hide')
                })
            }
        },
        glReviewsTextLength: () => {
            let $textItems = $('[data-text-length]'),
                maxTextWidth = Math.max.apply(Math, $textItems.map(function(){ return $(this).width(); }).get());

            $textItems.each(function () {
                let $this = $(this),
                    thisWidth = $(this).width()

                if (thisWidth === maxTextWidth) {
                    $this.addClass('--wide-width')
                }
            }).promise().done( function(){
                $textItems.each(function () {
                    let $this = $(this),
                        thisText = $this.text(),
                        textLength = Number($this.css('--text-length'))

                    if (thisText.length > textLength) {
                        $this.text(thisText.slice(0,textLength) + '...')
                    }
                })
            });
        },
        glComments: () => {
            let $commentsForm = $('.comments__form'),
                $commentsFormHidden = $('.comments__form__hidden'),
                $commentsFormSubmit = $('.comments__form__inputs .btn'),
                $commentItemBtn = $('.comment-item__link')

            $commentsForm.on('click', function () {
                $(this).find($commentsFormHidden).slideDown('fast')
                $(this).find($commentsFormSubmit).slideDown('fast')
                $(this).addClass('--active')
            })

            $commentItemBtn.on('click', function (e) {
                e.preventDefault()

                $(this).next($commentsForm).slideDown('fast')
                $(this).remove()
            })
        },
        glInputFilesCounter: () => {
            let $multipleFilesInput = $('input[type="file"]')

            $multipleFilesInput.on('change', function () {
                let $thisPlaceholder = $(this).next('.main-form-upload__text'),
                    files = $(this)[0].files

                $thisPlaceholder.text(`${files.length} Фото`)
            })
        },

        // Vendor components
        glInitMasks: () => {
            GL_APP.elements.maskInputs.$currency.inputmask({
                alias: 'currency',
                allowMinus: 'false',
                digits: '0',
                groupSeparator: ' ',
                rightAlign: false
            })

            GL_APP.elements.maskInputs.$mileage.inputmask({
                alias: 'currency',
                allowMinus: 'false',
                digits: '0',
                groupSeparator: ' ',
                rightAlign: false
            })

            GL_APP.elements.maskInputs.$year.inputmask({
                alias: 'numeric',
                max: 9999,
                digits: '0',
                allowMinus: 'false',
                rightAlign: false,
                suffix: ' г'
            })

            GL_APP.elements.maskInputs.$phone.inputmask({
                mask: '+7 (*99) 999-99-99',
                definitions: {
                    '*': {
                        validator: "[4,9]",
                    }
                }
            })
        },
        glInitIonRange: () => {
            let defaultOptions = {
                extra_classes: 'main-form-range',
                hide_min_max: true,
                hide_from_to: true,
                grid: true
            }

            // Geo range
            GL_APP.elements.ionRange.$geo.ionRangeSlider(defaultOptions)
            GL_APP.instances.ionRange.geo_range = GL_APP.elements.ionRange.$geo.data('ionRangeSlider')

            // Review rating range
            GL_APP.elements.ionRange.$reviewRating.ionRangeSlider(defaultOptions)
            GL_APP.instances.ionRange.review_rating_range = GL_APP.elements.ionRange.$reviewRating.data('ionRangeSlider')

            // Credit Term range
            GL_APP.elements.ionRange.$creditTerm.ionRangeSlider({
                extra_classes: 'main-form-range',
                hide_min_max: true,
                hide_from_to: true,
                grid: true,
                termValuePostfix: function (value) {
                    let postFixedValue = null

                    if (value < 1) {
                        postFixedValue = `6 месяцев`
                    } else if (value < 2) {
                        postFixedValue = `${value} год`
                    } else if (value < 5) {
                        postFixedValue = `${value} года`
                    } else {
                        postFixedValue = `${value} лет`
                    }

                    return postFixedValue
                },
                onStart: function (data) {
                    let $htmlValue = $(`[data-range-value="${ data.input.attr('name') }"]`)
                    $htmlValue.text(this.termValuePostfix(data.from_value))
                },
                onChange: function (data) {
                    let $htmlValue = $(`[data-range-value="${ data.input.attr('name') }"]`)
                    $htmlValue.text(this.termValuePostfix(data.from_value))
                },
                onUpdate: function (data) {
                    let $htmlValue = $(`[data-range-value="${ data.input.attr('name') }"]`)
                    $htmlValue.text(this.termValuePostfix(data.from_value))
                }
            })
            GL_APP.instances.ionRange.credit_term_range = GL_APP.elements.ionRange.$creditTerm.data('ionRangeSlider')

            // Mask Range Inputs
            GL_APP.elements.maskInputs.$maskRange.each(function () {
                let $input = $(this),
                    inputData = $(this).data()

                let $rangeInput = $(`input[name="${ inputData.rangeName }"]`)

                let setMaskValues = function (rangeValue) {
                    let valueFromPercent = Math.round(inputData.max / inputData.rangeMax * rangeValue)
                    $input.inputmask('setvalue', valueFromPercent)
                }

                $rangeInput.ionRangeSlider({
                    extra_classes: 'main-form-range',
                    hide_min_max: true,
                    hide_from_to: true,
                    grid: true,
                    grid_snap: true,
                    min: inputData.rangeMin ? inputData.rangeMin : inputData.min,
                    max: inputData.rangeMax ? inputData.rangeMax : inputData.max,
                    step: inputData.rangeStep,
                    onChange: function (rData) {
                        setMaskValues(rData.from)
                    }
                })

                let rangeInstance = $rangeInput.data('ionRangeSlider')
                GL_APP.instances.ionRange[inputData.rangeName.replace(/-/g, '_')] = rangeInstance

                $input.inputmask({
                    alias: 'currency',
                    digits: '0',
                    allowMinus: 'false',
                    groupSeparator: ' ',
                    rightAlign: false,
                    min: inputData.min,
                    max: inputData.max,
                    suffix: inputData.postfix ? inputData.postfix : '',
                    oncomplete: function(dataMask) {
                        let $this = $(dataMask.currentTarget),
                            thisValue = $this.inputmask('unmaskedvalue'),
                            percentValue = thisValue / inputData.max * inputData.rangeMax

                        rangeInstance.update({
                            from: percentValue
                        })
                    }
                })

                inputData.updateData = function (newData) {
                    if (newData) {
                        this.min = newData.min ? newData.min : inputData.min
                        this.max = newData.max ? newData.max : inputData.max
                        this.rangeMin = newData.rangeMin ? newData.rangeMin : inputData.rangeMin
                        this.rangeMax = newData.rangeMax ? newData.rangeMax : inputData.rangeMax
                        this.from = newData.from ? newData.from : inputData.min

                        $input.inputmask('option', {
                            min: inputData.min,
                            max: inputData.max
                        })

                        rangeInstance.update({
                            min: inputData.rangeMin,
                            max: inputData.rangeMax
                        })

                        let getPercentValue = inputData.from / inputData.max * inputData.rangeMax

                        rangeInstance.update({
                            from: getPercentValue
                        })

                        $input.inputmask('setvalue', inputData.from)
                    } else {
                        return 'Data not found'
                    }
                }

                if (inputData.from) {
                    inputData.updateData({
                        from: inputData.from
                    })
                } else {
                    inputData.updateData({
                        from: inputData.min
                    })
                }
            })
        },
        glInitLazyLoad: () => {
            GL_APP.instances.lazyLoadInstance = new LazyLoad({
                threshold: 0
            });
        },
        glInitSelect2: () => {
            GL_APP.elements.$select.select2({
                width: '100%',
                templateSelection: function (data, element) {
                    if (data.disabled) {
                        element.addClass('--placeholder')
                    } else {
                        element.removeClass('--placeholder')
                    }

                    return data.text;
                }
            })

            GL_APP.elements.$select.on('select2:select', function (e) {
                $(e.currentTarget).removeClass('--error')
            });
        },
        glInitSwipers: () => {
            GL_APP.instances.swiper.mainCarousel = new Swiper(GL_APP.elements.swiper.mainCarousel , {
                slidesPerView: 4,
                spaceBetween: 20,
                autoHeight: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                breakpoints: {
                    320: {
                        slidesPerView: 1.1,
                        spaceBetween: 10,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    1280: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    }
                }
            })

            GL_APP.instances.swiper.reviewsCarousel = new Swiper(GL_APP.elements.swiper.reviewsCarousel , {
                spaceBetween: 30,
                autoHeight: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }
            })

            GL_APP.instances.swiper.dealerGallery = new Swiper(GL_APP.elements.swiper.dealerGallery , {
                slidesPerView: 'auto',
                spaceBetween: 20,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }
            })

            GL_APP.instances.swiper.compsItemCarousel = new Swiper(GL_APP.elements.swiper.compsItemCarousel, {
                slidesPerView: 4,
                spaceBetween: 20,
                grid: {
                    fill: 'row',
                    rows: 6,
                },
                breakpoints: {
                    320: {
                        slidesPerView: 1.1,
                        spaceBetween: 10,
                        grid: false,
                    },
                    992: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                        grid: {
                            fill: 'row',
                            rows: 6,
                        }
                    },
                    1280: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                        grid: {
                            fill: 'row',
                            rows: 6,
                        }
                    }
                }
            });

            GL_APP.instances.swiper.smNewsCarousel = new Swiper(GL_APP.elements.swiper.smNewsCarousel, {
                slidesPerView: 3,
                spaceBetween: 80,
                autoHeight: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                breakpoints: {
                    320: {
                        slidesPerView: 1.1,
                        spaceBetween: 10
                    },
                    992: {
                        slidesPerView: 3,
                        spaceBetween: 20
                    },
                    1280: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    },
                    1360: {
                        slidesPerView: 3,
                        spaceBetween: 80
                    }
                }
            });
        },
        glInitFancyBox: () => {
            GL_APP.elements.$fancyboxModals.fancybox(GL_APP.variables.fancyBox.modalsOptions)

            GL_APP.elements.$fancyboxGallery.fancybox({
                transitionDuration: 366,
                animationEffect: 'zoom-in-out',
                backFocus: false,
                hash: false
            })
        }
    }

    /* Init component [Header Catalog] */
    GL_APP.components.glHeaderCatalog({
        element: GL_APP.elements.hCatalog.element,
        button: GL_APP.elements.hCatalog.btn
    })

    /* Init component [Header Menu] */
    GL_APP.components.glToggleClass({
        targetSelector: GL_APP.elements.hMenu.element,
        buttonSelector: GL_APP.elements.hMenu.btn,
        detectOutsideClick: true,
        on: {
            changeState: function (data, isToggle) {
                if (isToggle && $(GL_APP.elements.hGeoPopup.element).hasClass('js-gl-toggle-target-active')) {
                    $(GL_APP.elements.hGeoPopup.btn).trigger('click')
                }

                if (isToggle) {
                    GL_APP.elements.$html.addClass('--menu-opened')
                } else {
                    GL_APP.elements.$html.removeClass('--menu-opened')
                }
            }
        }
    })

    /* Init component [Header Geo Popup] */
    GL_APP.components.glToggleClass({
        targetSelector: GL_APP.elements.hGeoPopup.element,
        buttonSelector: GL_APP.elements.hGeoPopup.btn,
        detectOutsideClick: true,
        toggleFalseOnScroll: true,
        on: {
            changeState: function (data, isToggle) {
                if (isToggle && $(GL_APP.elements.hMenu.element).hasClass('js-gl-toggle-target-active')) {
                    $(GL_APP.elements.hMenu.btn).trigger('click')
                }
            }
        }
    })

    /* Init component [Header Mobile menu] */
    GL_APP.components.glToggleClass({
        targetSelector: GL_APP.elements.hMobileMenu.element,
        buttonSelector: GL_APP.elements.hMobileMenu.btn,
        detectOutsideClick: true,
    })

    /* Init component [Filter tabs] */
    GL_APP.components.glTabs({
        tabNavSelector: GL_APP.elements.filterTabs.navItems,
        tabContentSelector: GL_APP.elements.filterTabs.contentItems
    })

    /* Init component [Header Catalog] */
    GL_APP.components.glToggleFilter({
        element: GL_APP.elements.filterToggle.element,
        button: GL_APP.elements.filterToggle.button
    })

    /* Init component [Model page complectations] */
    GL_APP.components.glAccordion(GL_APP.elements.modelComps, {
        animationDuration: 300,
        openOnlyOne: false
    })

    /* Init component [Model description (show hidden content)] */
    GL_APP.components.glToggleClass({
        targetSelector: GL_APP.elements.modelDescription.element,
        buttonSelector: GL_APP.elements.modelDescription.btn,
        detectOutsideClick: true,
    })

    /* Init component [Gallery Tabs] */
    GL_APP.components.glTabs({
        tabNavSelector: GL_APP.elements.galleryTabs.navItems,
        tabContentSelector: GL_APP.elements.galleryTabs.contentItems
    })

    /* Init component [Change color images on about car] */
    GL_APP.components.glAttrChanger({
        targetSelector: GL_APP.elements.modelAboutColorPicker.targetSelector,
        buttonSelector: GL_APP.elements.modelAboutColorPicker.buttonSelector,
        targetAttrName: 'src'
    })

    /* Init component [Acc spoilers] */
    GL_APP.components.glAccordion(GL_APP.elements.accSpoilers, {
        animationDuration: 300
    })

    /* Init component [Buyout tabs] */
    GL_APP.components.glTabs({
        tabNavSelector: GL_APP.elements.buyOutTabs.navItems,
        tabContentSelector: GL_APP.elements.buyOutTabs.contentItems
    })

    /* Init component [Reviews text length] */
    GL_APP.components.glReviewsTextLength()

    /* Init component [Comparison carousel] */
    GL_APP.components.glCarousel(GL_APP.elements.comparisonCarousel.carouselElement, {
        carouselItem: GL_APP.elements.comparisonCarousel.carouselItem,
        navigation: {
            prev: GL_APP.elements.comparisonCarousel.carouselPrev,
            next: GL_APP.elements.comparisonCarousel.carouselNext
        },
        itemsPerView: {
            320: 1,
            992: 3,
            1280: 4
        }
    })

    /* Init component [Comparison functions] */
    GL_APP.components.glComparisonFunctions()

    /* Init component [Comments functions] */
    GL_APP.components.glComments()

    /* Init component [Input files counter] */
    GL_APP.components.glInputFilesCounter()

    /* Init component [Sitemap tabs] */
    GL_APP.components.glTabs({
        tabNavSelector: GL_APP.elements.sitemapTabs.navItems,
        tabContentSelector: GL_APP.elements.sitemapTabs.contentItems
    })

    /* Init component [Set callback time on modal from questions form] */
    GL_APP.components.glSetCallbackTime()

    /* Init component [Limit gallery items] */
    GL_APP.components.glGalleryLimit()

    /* Init component [Limit color items] */
    GL_APP.components.glColorsLimit()

    /* Init component [Limit specs items] */
    GL_APP.components.glSpecsLimit()

    /* Init component [LazyLoad] */
    GL_APP.components.glInitLazyLoad()

    /* Init component [Input masks] */
    GL_APP.components.glInitMasks()

    /* Init component [IonRange Sliders] */
    GL_APP.components.glInitIonRange()

    /* Init component [Credit form tabs] */
    GL_APP.components.glTabs({
        tabNavSelector: GL_APP.elements.creditFormTabs.navItems,
        tabContentSelector: GL_APP.elements.creditFormTabs.contentItems
    })

    /* Init component [select2] */
    GL_APP.components.glInitSelect2()

    /* Init component [Swipers] */
    GL_APP.components.glInitSwipers()

    /* Init component [Fancybox] */
    GL_APP.components.glInitFancyBox()
});
