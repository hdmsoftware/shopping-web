'use strict';

angular.module('cmsWebApp.auth', ['cmsWebApp.constants', 'cmsWebApp.util', 'ngCookies', 'ui.router'])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
