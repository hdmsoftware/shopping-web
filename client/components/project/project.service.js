'use strict';


(function() {
	function ProjectService($http, $q) {

		var apiRoot = 'https://shoppable-cms.herokuapp.com/api/';

		var Project = {

			/**
			 * Gets all available projects
			 *   (synchronous|asynchronous)
			 *
			 * @param  {Function|*} callback - optional, funciton(user)
			 * @return {Object|Promise}
			 */
			getProjects() {
				var deferred = $q.defer();

				var requestUrl = apiRoot + 'projects';

				$http.get(requestUrl, {cache:true})
					.then(function successCallback(response) {
						deferred.resolve(response.data);
					}, function errorCallback(err) {
						deferred.reject(err);
					});

				return deferred.promise;

			},

			getProductGroupsById( id ) {

				var requestUrl = apiRoot + 'productgroups/' + id;
				
				var deferred = $q.defer();

				$http.get(requestUrl, {cache:true})
					.then(function successCallback(response) {
						deferred.resolve(response.data);
					}, function errorCallback(err) {
						deferred.reject(err);
					});

				return deferred.promise;

			},

			getProductsById( id ) {

				var requestUrl = apiRoot + 'products/' + id;

				var deferred = $q.defer();

				$http.get(requestUrl)
					.then(function successCallback(response) {
						deferred.resolve(response.data);
					}, function errorCallback(err) {
						deferred.reject(err);
					});

				return deferred.promise;

			},

			deleteProjectById( id ) {

				var requestUrl = apiRoot + 'projects/' + id;
				
				var deferred = $q.defer();

				$http.delete( requestUrl )
					.then(function successCallback(response) {
						deferred.resolve(response.data);
					}, function errorCallback(err) {
						deferred.reject(err);
					});

				return deferred.promise;

			}
		};

		return Project;
	}

	angular.module('cmsWebApp.project')
		.factory('Project', ProjectService);
})();