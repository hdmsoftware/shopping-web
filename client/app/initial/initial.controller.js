'use strict';

(function(){

class InitialComponent {
  constructor(Project, $sce) {
    this.message = 'Hello';
    this.Project = Project;
    this.currentProjects = [];
    this.$sce = $sce;
  }

  $onInit() {

	   var viewModel = this;

	   this.Project.getProjects().then(function (response) {
         viewModel.currentProjects = response;
     	});

     	this.trustSrc = function(src) {
     	  return this.$sce.trustAsResourceUrl(src);
     	}
	}
}

angular.module('cmsWebApp')
  .component('initial', {
    templateUrl: 'app/initial/initial.html',
    controller: InitialComponent//,
 //   controllerAs: Initial
  });

})();
