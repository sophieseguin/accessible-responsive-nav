'use strict';

var $               = require('jquery');
var Navigation      = require('./modules/accessible-nav');

$(function() {

    if ( $('[data-behavior="navigation"]').length > 0 ) {

        var navigation = new Navigation({

            context: $('[data-behavior="navigation"]')

        });

        navigation.init();
    }

});
