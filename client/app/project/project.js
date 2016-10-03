'use strict';

angular.module('cmsWebApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('project', {
        url: '/project',
        template: '<project></project>'
      });
  });
