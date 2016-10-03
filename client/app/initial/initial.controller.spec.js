'use strict';

describe('Component: InitialComponent', function () {

  // load the controller's module
  beforeEach(module('cmsWebApp'));

  var InitialComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    InitialComponent = $componentController('initial', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
