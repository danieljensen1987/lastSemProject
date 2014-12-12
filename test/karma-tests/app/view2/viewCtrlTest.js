describe('myAppRename.viewStudent ViewStudentCtrl', function() {

  var scope, httpBackendMock, ctrl;
  var testResponse = {msg : "Test Message"};

  beforeEach(module('myAppRename.viewStudent'));

  beforeEach(inject(function ($httpBackend, $rootScope, $controller) {
    httpBackendMock = $httpBackend;
    httpBackendMock.expectGET('userApi/getMyProfile/vincentpena@maroptic.com').
      respond(testResponse);
    scope = $rootScope.$new();
    ctrl = $controller('ViewStudentCtrl', {$scope: scope});
  }));

  it('Should fetch two names ', function () {
    expect(scope.info).toBeUndefined();
    httpBackendMock.flush();
    expect(scope.info.msg).toEqual("Test Message");
  });

});