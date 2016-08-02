'use strict';

angular.module('core.allstar')

.factory('Allstar', [

    '$resource',

    function($resource) {
        return $resource('json/allstarfull.json', {}, {
            query: {
                method: 'GET',
                params: {},
                isArray: false
            }
        });
    }]);
