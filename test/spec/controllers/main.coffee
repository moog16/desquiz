'use strict'

describe 'Controller: MainCtrl', () ->

  # load the controller's module
  beforeEach module 'deskQuizApp'

  MainCtrl = {}
  scope = {}

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope, $httpBackend) ->
    mockQuestions = [
      {name: 'Hello'}
    ]
    $httpBackend.when('GET', 'http://localhost:9000/quiz').respond(mockQuestions)

    scope = $rootScope.$new()
    MainCtrl = $controller 'MainCtrl', {
      $scope: scope
    }
    $httpBackend.flush()

  afterEach inject ($httpBackend) ->
     $httpBackend.verifyNoOutstandingExpectation()
     $httpBackend.verifyNoOutstandingRequest()

  it 'should attach a list of awesomeThings to the scope', () ->
    expect(scope.questions.length).toBe 1
  it 'should ', () ->
    

