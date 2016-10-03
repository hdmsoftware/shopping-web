'use strict';
(function(){

class ProjectComponent {
  constructor(Project, $sce, $scope, $q, $uibModal) {
    this.Project = Project;
    this.currentProjects = [];
    this.$sce  = $sce;
    this.$scope = $scope;
    this.$q = $q;
    this.currentProductGroups = [];
    this.currentProjectIndex = null;
    this.$uibModal = $uibModal;
  }

  $onInit() {

	   var viewModel = this;

	   this.Project.getProjects().then(function (response) {
         viewModel.currentProjects = response;
     });

     this.trustSrc = function(src) {
       return this.$sce.trustAsResourceUrl(src);
     }

     this.openProductGroups =  function( productGroupArray, idx, visibility ){

      // reset $index
      if ( visibility === 'hide'){
         this.currentProjectIndex = null;
      }
      else{
        if (productGroupArray.length > 0){

          var productGroups = [];

          angular.forEach(productGroupArray, function(group){  
              productGroups.push(viewModel.Project.getProductGroupsById (group));
          })  

          // get all product groups for this project
          viewModel.$q.all(productGroups).then(function(result) {
              viewModel.currentProductGroups = result;
              viewModel.currentProjectIndex = idx;
          });
        }
       }
      }

       this.deleteItem = function(type, item, index) {
          var newScope = this.$scope.$new();
          newScope.item = item;
          newScope.type = type;
          
          var deleteItemModalInstance = this.$uibModal.open({
            animation: true,
            template: '<div class="modal-dark"><div class="modal-header">'+
              '<h4 class="modal-title"> Delete {{ type }}: {{ item.name }}?</h4>'+
            '</div>'+
            '<div class="modal-footer">'+
              '<p ng-show="error">Error deleting {{ type }}</p>'+
                '<button class="btn btn-danger" type="button" ng-click="ok()">Delete</button>'+
                '<button class="btn btn-warning" type="button" ng-click="cancel()">Cancel</button>'+
            '</div></div>',
            scope: newScope
          });
          newScope.ok = function() {
            console.log('delete item', item);
            if(type === 'project') {
              projectDetailService.deleteProduct(item)
              .success(function() {
                deleteItemModalInstance.close({ type: type, index: index });
              })
              .error(function(err){
                newScope.error = err;
              });
            } else {
              projectDetailService.deleteProductGroup(item)
              .success(function() {
                deleteItemModalInstance.close({ type: type, index: index });
              })
              .error(function(err){
                newScope.error = err;
              });
            }
          };
          newScope.cancel = function() {
            deleteItemModalInstance.dismiss('cancel');
          };
          deleteItemModalInstance.result.then(function (result) {
            if(result.type === 'product') {
              $scope.selectedProductGroup.products.splice(result.index, 1);
            } else {
              $scope.project.productGroupTimeLine.splice(result.index, 1);
            }
            //console.log('delete');
          }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
          });
        };
   }
}

angular.module('cmsWebApp')
  .component('project', {
    templateUrl: 'app/project/project.html',
    controller: ProjectComponent
  });

})();
