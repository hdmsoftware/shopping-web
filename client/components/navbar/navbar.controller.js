'use strict';

class NavbarController {
  //end-non-standard

  //start-non-standard
  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }

  $onInit() {

	  var viewModel = this;
	  //viewModel.isSidebarVisible = false;

	  this.handleSidebar = function (visible){

	  	if ( visible === 'true'){
	  		console.log("Iamhere");
	  		viewModel.isSidebarVisible = true;
	  	} else {
	  		viewModel.isSidebarVisible = false;
	  	}
	  }
	    
  }

}

angular.module('cmsWebApp')
  .controller('NavbarController', NavbarController);
