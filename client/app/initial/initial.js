'use strict';

angular.module('cmsWebApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('initial', {
        url: '/',
        template: '<initial></initial>'
      });
  });
