/**
 * Accessible and Responsive Drop down navigation
 *
 * $author       Sophie Seguin
 * $email        sseguin@thisiszone.com
 * $url          http://www.thisiszone.com/
 * $copyright    Copyright (c) 2015, thisiszone.com. All rights reserved.
 * $version      1.0
 *
 * $notes        Accessible and Responsive
 *               Drop down navigation
 *               Using ARIA attributes
 *               Allows user to tab through drop down items
 *
 *  1. Detect desktop or mobile
 *  2. Bind click events
 *  3. Add ARIA attributes and show/hide sub nav logic
 */


'use strict';

var $ = require('jquery');


/**
 * Accessible Drop down navigation
 * @param  { Object } options - collection of options to be passed to the module
 * @return { Object } revealing module pattern object with any public functions to be made available
 */
module.exports = function(options) {
    
    // Get the context for the current instance of the module
    var context = options.context;
    var $primaryItems = context.find('.navigation-primary > .list-item');
    var $mobileNavTrigger = context.find('.btn-show-hide-nav');
    var $mobileNavSubNavTrigger = context.find('.btn-show-hide-nav-secondary');
    var onMobile = false;

    /**
     * Detect desktop or mobile
     */
    function detectMobile() {

        if ($('html').hasClass('lt-ie9') || $('html').hasClass('ie9')) {
            bindHover();
            bindFocus();
        } else {
            var mq = window.matchMedia('only screen and (max-width: 820px)');

            // On Load
            if (mq.matches) {
                onMobile = true;
            }
            // Desktop
            else {
                bindHover();
                bindFocus();
            }

            // Track resize
            mq.addListener(function (changed) {

                if (changed.matches) {
                    onMobile = true;
                    addAria();
                    // Unbind Hover and Focus
                    unbindHover();
                    unbindFocus();
                }
                // Desktop
                else {
                    onMobile = false;
                    addAria();
                    // Bind Hover and Focus
                    bindHover();
                    bindFocus();
                }
            });
        }

    }

    /**
     * Bind the Show/hide button for expanding the navigation on mobile
     */
    function bindTriggerNav() {

        $mobileNavTrigger.on('click', function (e) {
            e.preventDefault();
            var btn = $(this);
            var $mainNav = $(btn).next('.navigation-primary');

            // If nav is visible
            if ($mainNav.hasClass('is-visible')) {
                $(btn).removeClass('clicked');
                $mainNav.removeClass('is-visible');
            } else {
                $(btn).addClass('clicked');
                $mainNav.addClass('is-visible');
            }

        });

        $mobileNavSubNavTrigger.on('click', function (e) {
            e.preventDefault();
            var $listItem = $(this).parent().parent('.list-item');
            var $subNav = $(this).parent().next('.navigation-secondary');

            // If sub-nav is visible
            if ($subNav.hasClass('is-visible')) {
                $(this).removeClass('clicked').removeClass('visible-subnav-on-load');
                // Only hide the correspondant sub-nav
                hideSubNav($subNav);
            } else {
                $(this).addClass('clicked');
                showSubNav($listItem);
            }

        });

    }

    /**
     * Add ARIA attributes and show/hide sub nav logic
     */
    function addAria() {

        $.each($primaryItems, function (index) {

            // Declare variables
            var listItem = $(this),
                id = 'navigation-secondary-' + (index + 1), // Position of the element in the nav
                $primaryLinkItem = listItem.find('> .list-item-wrapper [role="menuitem"]'),
                $secondaryNav = listItem.find('.navigation-secondary');

            // Check if sub-nav element exists for each list-item
            if ($secondaryNav.length > 0) {

                $secondaryNav.attr('id', id);

                // Set aria attributes to the primary link item
                $primaryLinkItem.attr('aria-haspopup', 'true');

                /* ----- Active item with sub-nav ----------------------- */
                if (listItem.find('a').hasClass('active')) {

                    /* Detect top-level or sub-level item --------------- */

                    var topLevelItem;

                    if (listItem.find('> [role="menu"] a').hasClass('active')) {
                        topLevelItem = false;
                    } else if (listItem.find('> .list-item-wrapper a').hasClass('active')) {
                        topLevelItem = true;
                    }

                    /* Different behaviors for desktop and mobile ------- */

                    // Desktop
                    if (onMobile === false) {
                        showSubNav(listItem);
                    }
                    // Mobile, sub-level item current page
                    else if (onMobile === true && topLevelItem === false) {

                        showSubNav(listItem);
                        // Turn the arrow icon up
                        listItem.find('.btn-show-hide-nav-secondary').addClass('visible-subnav-on-load');

                    }
                    // Mobile, top-level item current page
                    else if (onMobile === true && topLevelItem === true) {

                        // Hide the correspondant sub-nav
                        hideSubNav($secondaryNav);
                        // Set aria attributes to the button to open/show the sub-nav
                        $primaryLinkItem.next().attr('aria-controls', id);

                    }

                    // This prevents FOUC
                    context.removeClass('nav-prerender');

                }
                /* ----- No active item with sub-nav ----------------------- */
                else {
                    // Hide the correspondant sub-nav
                    hideSubNav($secondaryNav);
                    // Set aria attributes to the button to open/show the sub-nav
                    $primaryLinkItem.next().attr('aria-controls', id);
                }
            }
        });

    }

    /**
     * Show sub navigation
     * @param  { String } listItem - The nav item
     */
    function showSubNav(listItem) {

        var $secondaryNav = listItem.find('.navigation-secondary');
        $secondaryNav.attr('aria-hidden', 'false').addClass('is-visible').attr('aria-expanded', 'true');

    }

    /**
     * Hide sub navigation
     * @param  { String } subNav - The sub nav of the nav item
     */
    function hideSubNav(subNav) {

        subNav.attr('aria-hidden', 'true').removeClass('is-visible').attr('aria-expanded', 'false');

    }

    /**
     * Hide all sub navigations
     */
    function hideAllSubNavs() {

        var $secondaryNav = $('.navigation-main').find('.navigation-secondary');
        $secondaryNav.attr('aria-hidden', 'true').removeClass('is-visible').attr('aria-expanded', 'false');

    }

    /**
     * Bind hover event on navigation
     */
    function bindHover() {

        // Mouseover
        $primaryItems.on('mouseover', function () {

            var _self = $(this);
            var $secondaryNav = _self.find('.navigation-secondary');

            if ($secondaryNav.length > 0) {

                // Hover state
                _self.addClass('hover');

                // Reset nav items
                hideAllSubNavs();

                // Show current item sub-nav
                showSubNav(_self);

            } else {
                hideAllSubNavs();
            }

        });

        // Mouseout
        $primaryItems.on('mouseout', function () {

            // Reset nav items
            hideAllSubNavs();

            // Remove hover state
            $('.navigation-primary').find('.hover').removeClass('hover');

            // Get current page item
            var $subPageNav = $('.navigation-primary > .list-item .active');
            var $activeSubmenuItem = $subPageNav.parent().parent('.list-item');
            showSubNav($activeSubmenuItem);

        });

    }

    /**
     * Bind focus event on navigation
     */
    function bindFocus() {

        // Focus
        $primaryItems.find('> .list-item-wrapper a').on('focus', function () {

            var $listItem = $(this).parent().parent('.list-item');
            var $secondaryNav = $listItem.find('.navigation-secondary');

            // Reset nav items
            hideAllSubNavs();

            // Show sub-nav
            showSubNav($listItem);

            // Focused link has a secondary nav
            if ($secondaryNav.length > 0) {

                // Hover state
                $listItem.addClass('hover');

            }
            // Focused link doesn't have a secondary nav
            else {

                // Remove hover state
                $('.navigation-primary').find('.hover').removeClass('hover');

            }

        });

        // To reset the nav and show the current item when nav looses focus
        $('[role="main"] a:not([role="menuitem"]), [role="main"] input').on('focus', function () {

            // Reset nav items
            hideAllSubNavs();

            // Remove hover state
            $('.navigation-primary').find('.hover').removeClass('hover');

            // Get current page item
            var $subPageNav = $('.navigation-primary > .list-item .active');
            var $activeSubmenuItem = $subPageNav.parent().parent('.list-item');
            showSubNav($activeSubmenuItem);

        });

    }

    /**
     * Unbind hover event on navigation
     */
    function unbindHover() {

        $primaryItems.off('mouseover').off('mouseout');

    }

    /**
     * Unbind focus event on navigation
     */
    function unbindFocus() {

        $primaryItems.find('> .list-item-wrapper a').off('focus').off('blur');

    }

    /**
     * Bind touch event on navigation
     */
    function bindTouch() {

        // Touchstart
        $primaryItems.find('> .list-item-wrapper a').on('touchstart', function (e) {

            var btn = $(this);
            var $listItem = btn.parent().parent('.list-item'),
                $secondaryNav = $listItem.find('.navigation-secondary');

            if ($secondaryNav.length > 0) {

                if (btn.hasClass('touched') || btn.hasClass('active')) {
                    return;
                } else {

                    // Only for Desktop as mobile nav has a button to show/hide sub-nav
                    if (onMobile === false) {

                        e.preventDefault();

                        // Hide all sub-navs
                        hideAllSubNavs();

                        // Remove touched class on previous item clicked
                        context.find('.touched').removeClass('touched');

                        // Add class to the clicked item
                        btn.addClass('touched');

                        // Show sub-nav
                        showSubNav($listItem);

                    }

                }
            }
        });

    }

    /**
     * Init function called by app.js
     */
    function init() {

        detectMobile();
        bindTriggerNav();
        addAria();

        if (Modernizr.touch) {
            bindTouch();
        }

    }

    return {
        init: init
    };

};